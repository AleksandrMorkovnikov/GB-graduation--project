function createLoginModal() {
  const modal = document.createElement("div");
  modal.id = "login-modal";
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";
  closeBtn.className = "modal-content__close";

  const heading = document.createElement("h2");
  heading.textContent = "Авторизация";
  heading.className = "modal-content__heading";

  const form = document.createElement("form");
  form.id = "login-form";
  form.className = "modal-content__form";

  const emailBox = document.createElement("div");
  emailBox.className = "modal-form__email-box";

  const emailLabel = document.createElement("label");
  emailLabel.htmlFor = "login-email";
  emailLabel.textContent = "Email: ";
  emailLabel.className = "email-box__email";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "login-email";
  emailInput.name = "email";
  emailInput.required = true;
  emailInput.className = "email-box__input";

  const passwordBox = document.createElement("div");
  passwordBox.className = "modal-form__password-box";

  const passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "login-password";
  passwordLabel.textContent = "Пароль: ";
  passwordLabel.className = "password-box__pass";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "login-password";
  passwordInput.name = "password";
  passwordInput.required = true;
  passwordInput.className = "password-box__input";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Войти";
  submitButton.className = "modal-form__enter-button";

  const errorMessage = document.createElement("p");
  errorMessage.id = "error-message";
  errorMessage.style.color = "red";
  errorMessage.style.display = "none";
  passwordLabel.className = "modal-form__error";

  form.appendChild(emailBox);
  form.appendChild(passwordBox);
  emailBox.appendChild(emailLabel);
  emailBox.appendChild(emailInput);
  passwordBox.appendChild(passwordLabel);
  passwordBox.appendChild(passwordInput);
  form.appendChild(submitButton);
  form.appendChild(errorMessage);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(heading);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.getElementById("open-login-modal").addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      document.getElementById("login-modal").style.display = "flex";
    } else {
      window.location.href = "/account.html";
    }
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

createLoginModal();
