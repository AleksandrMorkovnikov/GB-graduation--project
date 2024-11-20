
fetch("data-json/menu-data.json")
  .then((response) => response.json())
  .then((data) => {
    function createDropdownMenu(menuData) {
      const mainList = document.createElement("ul");
      mainList.classList.add("dropdown__box");

      menuData.forEach((item) => {
        const listItem = document.createElement("li");
        if (item.id) {
          listItem.classList.add(`dropdown-item__${item.id}`);
        }
        const itemTitle = document.createElement("p");
        itemTitle.classList.add("dropdown-item__paragraph");
        itemTitle.textContent = item.text;
        listItem.appendChild(itemTitle);

        if (item.children && item.children.length > 0) {
          const subList = document.createElement("ul");
          subList.classList.add("sub-list");
          item.children.forEach((subItem) => {
            const subListItem = document.createElement("li");
            subListItem.classList.add("sub-list__item");

            const subListLink = document.createElement("a");
            subListLink.classList.add("sub-list__link");
            subListLink.textContent = subItem.text;
            subListLink.href = subItem.href;

            subList.appendChild(subListItem);
            subListItem.appendChild(subListLink);
          });
          listItem.appendChild(subList);
        }
        mainList.appendChild(listItem);
      });

      return mainList;
    }

    data.forEach((section) => {
      const sectionName = Object.keys(section)[0];
      const sectionData = section[sectionName];

      
      const menuItem = document.querySelector(
        `.header-nav__item[data-menu="${sectionName}"]`
      );
      if (menuItem) {
        const dropdown = menuItem.querySelector(".header-nav__dropdown");
        dropdown.appendChild(createDropdownMenu(sectionData));
      }
    });
  })
  .catch((error) => console.error("Ошибка загрузки JSON-данных:", error));

const headerLink = document.querySelector(".header__link");
const dropdown = document.querySelector(".header-nav__dropdown");

headerLink.addEventListener("mouseover", () => {
  dropdown.style.display = "block";
});

headerLink.addEventListener("mouseout", () => {
  dropdown.style.display = "none";
});

dropdown.addEventListener("mouseover", () => {
  dropdown.style.display = "block";
});

dropdown.addEventListener("mouseout", () => {
  dropdown.style.display = "none";
});
