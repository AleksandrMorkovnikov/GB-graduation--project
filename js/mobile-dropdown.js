fetch("data-json/menu-data.json")
  .then((response) => response.json())
  .then((data) => {
    function createDropdownMenu(menuData) {
      const mainList = document.createElement("ul");
      mainList.classList.add("burger-head__dropdown__box");

      menuData.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("burger-nav__dropdown-item");

        if (item.id) {
          listItem.classList.add(`burger-nav__dropdown-item__${item.id}`);
        }

        const itemTitle = document.createElement("p");
        itemTitle.classList.add("burger-nav__dropdown-item__paragraph");
        itemTitle.textContent = item.text;
        listItem.appendChild(itemTitle);

        if (item.children && item.children.length > 0) {
          const subList = document.createElement("ul");
          subList.classList.add("burger-nav__sub-list");

          item.children.forEach((subItem) => {
            const subListItem = document.createElement("li");
            subListItem.classList.add("burger-nav__sub-list__item");

            const subListLink = document.createElement("a");
            subListLink.classList.add("burger-nav__sub-list__link");
            subListLink.textContent = subItem.text;
            subListLink.href = subItem.href;

            subListItem.appendChild(subListLink);
            subList.appendChild(subListItem);
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
        `.burger-head__nav-item[data-menu="${sectionName}"]`
      );

      if (menuItem) {
        const dropdown = menuItem.querySelector(
          ".burger-head__nav__dropdown"
        );
        dropdown.appendChild(createDropdownMenu(sectionData));
      }
    });
  })
  .catch((error) => console.error("Error loading JSON data:", error));

const headerLinks = document.querySelectorAll(".burger-head__link");

headerLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const dropdown = link.nextElementSibling;

    if (
      dropdown &&
      dropdown.classList.contains("burger-head__nav__dropdown")
    ) {
      const isVisible = dropdown.style.display === "block";

      document
        .querySelectorAll(".burger-head__nav__dropdown")
        .forEach((dd) => {
          dd.style.display = "none";
        });


      dropdown.style.display = isVisible ? "none" : "block";
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".burger-head__nav-item")) {
    document
      .querySelectorAll(".burger-head__nav__dropdown")
      .forEach((dropdown) => {
        dropdown.style.display = "none";
      });
  }
});

const closeMenuButton = document.querySelector(".burger-menu__close");
const burgerIcon = document.querySelector(".burger-menu__ico");
const mobileMenu = document.getElementById("nav-content");
const fixedHead = document.querySelector("body");

burgerIcon.addEventListener("click", () => {
    mobileMenu.style.visibility = "visible";
    closeMenuButton.style.display = "block";
    burgerIcon.style.display = "none";
    closeMenuButton.style.display = "flex";
    fixedHead.classList.add("fixed-position");
});

closeMenuButton.addEventListener("click", () => {
  mobileMenu.style.visibility = "hidden";
  closeMenuButton.style.display = "none";
  burgerIcon.style.display = "block";
  document.body.style.overflow = "";
  fixedHead.classList.remove("fixed-position");
});
