fetch("data-json/socio-data.json") 
  .then((response) => response.json())
  .then((data) => {
    function createSocioMenu(socioMenu, mainList) {
      mainList.innerHTML = "";

      socioMenu.forEach((soc) => {
        const socioItem = document.createElement("li");
        if (soc.id) {
          socioItem.classList.add(`socio-sublist__${soc.id}`);
        }
        const socioTilte = document.createElement("a");
        socioTilte.classList.add("socio-sublist__link");
        socioTilte.href = soc.href;
        socioTilte.textContent = soc.text;
        socioItem.appendChild(socioTilte);
        mainList.appendChild(socioItem);
      });
    }

    data.forEach((section) => {
      const socSectionName = Object.keys(section)[0];
      const socSectionData = section[socSectionName];

      document.querySelectorAll(`.socio__item[socio-menu="${socSectionName}"]`).forEach((socioMenuItem) => {
        const socioDropdown = socioMenuItem.querySelector(".socio__sublist");
        if (socioDropdown) {
          createSocioMenu(socSectionData, socioDropdown);
        }
      });
    });
  })
  .catch((error) => console.error("Ошибка загрузки данных JSON", error));

function initializeSocioMenus() {
  document.querySelectorAll(".socio__item").forEach((socioItem) => {
    const socioDropdown = socioItem.querySelector(".socio__sublist");

    if (socioDropdown) {
      socioItem.addEventListener("mouseover", () => {
        socioDropdown.style.display = "flex";
      });

      socioItem.addEventListener("mouseout", () => {
        socioDropdown.style.display = "none";
      });
    }
  });
}

initializeSocioMenus();

document.getElementById("copyLinkButton").addEventListener("click", () => {
    const pageUrl = window.location.href; 

    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        const icoClick = document.getElementById("ico-link");
        icoClick.classList.remove("share-ico__visible");
        icoClick.classList.add("share-ico__hidden");
        const icoShow = document.getElementById("ico-comp");
        icoShow.classList.add("share-ico__visible");
        icoShow.classList.remove("share-ico__hidden");
      })
      .catch((error) => {
        console.error("Ошибка при копировании ссылки:", error);
      });
  });
