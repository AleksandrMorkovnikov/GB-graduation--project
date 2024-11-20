const eventCreate = document.querySelector(".events-list");

fetch("data-json/events-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных: " + response.statusText);
    }
    return response.json();
  })
  .then((eventsData) => {
    eventsData.forEach((event) => {
      const eventSection = document.createElement("section");
      eventSection.classList.add("events-list__item");

      eventSection.innerHTML = `
        <div class="events-list__item-box">
          <article class="item-text__text">
            <img width="280" height="auto" class="item-text__pic" src="${event.src}" alt="${event.alt || ""}" />
            <h1 class="item-text__heading">${event.name}</h1>
            <p class="item-text__paragraph">${event.caption}</p>
          </article>
          <div class="item-text__item-button">
            <p class="item-text__button-date">Пройдет ${event.date}</p>
            ${event.href ? `<button class="item-text__button"><a class="event-button__text" href="${event.href}">Хочу посетить!</a></button>` : ""}
          </div>
        </div>
      `;

      eventCreate.appendChild(eventSection);
    });
  })
  .catch((error) => console.error("Ошибка загрузки JSON-данных:", error));