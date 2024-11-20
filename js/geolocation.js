async function findNearestCity(lat, lon) {
  try {
    const response = await fetch("data-json/cities.json");
    const cities = await response.json();

    let nearestCity = null;
    let minDistance = Infinity;

    cities.forEach((city) => {
      const distance = Math.abs(lat - city.lat) + Math.abs(lon - city.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city.name;
      }
    });

    return nearestCity;
  } catch (error) {
    console.error("Ошибка загрузки данных о городах:", error);
    return "Не удалось определить ближайший город.";
  }
}
 
function getLocation() {
  const nearestCityElement = document.getElementById("nearest-city");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const city = await findNearestCity(lat, lon);
        nearestCityElement.textContent = city;
      },
      (error) => {
        console.error("Ошибка геолокации:", error);
        nearestCityElement.textContent = "Геолокация недоступна.";
      }
    );
  } else {
    nearestCityElement.textContent = "Ваш браузер не поддерживает геолокацию.";
  }
}

getLocation();
