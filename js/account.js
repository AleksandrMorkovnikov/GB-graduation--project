function createUserProfile() {
  const loggedInEmail = localStorage.getItem("email");

  if (!loggedInEmail) {
    console.error("Пользователь не залогинен!");
    return;
  }

  fetch("data-json/users-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных пользователей");
      }
      return response.json();
    })
    .then((users) => {
      const user = users.find((u) => u.username === loggedInEmail);

      if (!user) {
        console.error("Пользователь не найден в базе данных!");
        return;
      }

      const profileHTML = `
        <div class="user-profile">
          <h2 class="user-profile__heading">Профиль пользователя</h2>
          <img class="user-profile__pic" src="${user.src}"/>
          <p class="user-profile__name">Имя: ${user.name}</p>
          <p class="user-profile__email">Email: ${user.username}</p>
          <p>Курс: ${user.course}</p>
          <p>Группа: ${user.group}</p>
          <h3 class="user-profile__events-heading">Мои мероприятия</h3>
          <ul class="user-profile__events" id="events-list">
            ${user.events
              .map(
                (event) => `
                  <li class="user-profile__event">
                    <span class="event-name">${event["event-name"]},</span> 
                    Дата: <span class="event-date">${event.date} </span> 
                    <button class="remove-event" data-event-name="${event["event-name"]}">Отменить запись</button>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      `;

      const profileContainer = document.querySelector(".account");
      if (profileContainer) {
        profileContainer.innerHTML = profileHTML;

        document.querySelectorAll(".remove-event").forEach((button) => {
          button.addEventListener("click", (e) => {
            const eventName = e.target.getAttribute("data-event-name");
            const eventElement = e.target.closest(".user-profile__event");
            const eventDate = eventElement
              .querySelector(".event-date")
              .textContent.trim();

            if (button.textContent === "Отменить запись") {
              removeEventFromServer(user.username, eventName);
              button.textContent = "Восстановить запись";
            } else {
              restoreEventOnServer(
                user.username,
                eventName,
                eventDate,
              );
              button.textContent = "Отменить запись";
            }
          });
        });
      } else {
        console.error("Контейнер для профиля не найден!");
      }
    })
    .catch((error) => console.error("Ошибка:", error));
}

function removeEventFromServer(email, eventName) {
  fetch(
    `/users/${encodeURIComponent(email)}/events/${encodeURIComponent(
      eventName
    )}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при удалении события с сервера");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => console.error("Ошибка:", error));
}

function restoreEventOnServer(email, eventName, eventDate, eventStatus) {
  fetch(`/users/${encodeURIComponent(email)}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "event-name": eventName,
      status: eventStatus,
      date: eventDate,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при восстановлении мероприятия");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => console.error("Ошибка:", error));
}

window.addEventListener("load", createUserProfile);
