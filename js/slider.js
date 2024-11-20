let videosData = [];
let currentSlide = 0;

function updateSlide() {
  const slideContainer = document.getElementById("slideContainer");
  const videoElement = slideContainer.querySelector(".slide__video");
  const captionElement = slideContainer.querySelector(".slide__caption");

  videoElement.src = videosData[currentSlide].src;
  captionElement.textContent = videosData[currentSlide].caption;
}

function moveSlide(direction) {
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = videosData.length - 1;
  } else if (currentSlide >= videosData.length) {
    currentSlide = 0;
  }

  updateSlide();
}

fetch("data-json/videos-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    videosData = data;
    updateSlide();
  })
  .catch((error) => {
    console.error("Ошибка загрузки JSON-данных:", error);
  });

document.querySelector(".slider__button-left").addEventListener("click", () => moveSlide(-1));
document.querySelector(".slider__button-right").addEventListener("click", () => moveSlide(1));

let attendeesCount = parseInt(localStorage.getItem("attendeesCount")) || 0;

function updateAttendeesDisplay() {
  document.getElementById("attendeesCount").textContent = `Уже ${attendeesCount} человек хотят посетить!`;
}

function addEventToUserDatabase(eventName, eventDate) {
  const loggedInEmail = localStorage.getItem("email");

  if (!loggedInEmail) {
    console.error("Пользователь не залогинен!");
    return;
  }

  fetch(`/users/${encodeURIComponent(loggedInEmail)}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "event-name": eventName,
      date: eventDate
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка добавления события в базу данных");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => console.error("Ошибка:", error));
}

document.getElementById("attendButton").addEventListener("click", () => {
  attendeesCount += 1;
  localStorage.setItem("attendeesCount", attendeesCount);
  updateAttendeesDisplay();

  let visible = document.querySelector(".event__hidden");
  visible.classList.add("event__visible");
  let hidden = document.querySelector(".event__button");
  hidden.classList.add("event__hidden");

  const eventName = "Калейдоскоп культур";
  const eventDate = "01.02.2025";мероприятия
  addEventToUserDatabase(eventName, eventDate);
});

updateAttendeesDisplay();

