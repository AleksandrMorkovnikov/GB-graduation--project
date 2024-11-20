function createForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "form-container";
  formContainer.className = "form-box";

  const form = document.createElement("form");
  form.id = "application-form";
  form.className = "form-box";

  const nameBox = document.createElement("div");
  nameBox.className = "form-box__name";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Имя: ";
  nameLabel.htmlFor = "name";
  nameLabel.className = "form-box__name__label";
  nameBox.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.name = "name";
  nameInput.required = true;
  nameInput.className = "form-box__name__input";
  nameBox.appendChild(nameInput);

  const emailBox = document.createElement("div");
  emailBox.className = "form-box__email";

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Электронная почта для связи: ";
  emailLabel.htmlFor = "email";
  emailLabel.className = "form-box__email__label";
  emailBox.appendChild(emailLabel);

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.name = "email";
  emailInput.required = true;
  emailInput.className = "form-box__email__input";
  emailBox.appendChild(emailInput);

  const textBox = document.createElement("div");
  textBox.className = "form-box__suggestion";

  const textLabel = document.createElement("label");
  textLabel.textContent = "Кратко опишите предлагаемое вами мероприятие";
  textLabel.htmlFor = "message";
  textLabel.className = "form-box__suggestion__label";
  textBox.appendChild(textLabel);

  const messageInput = document.createElement("textarea");
  messageInput.id = "message";
  messageInput.name = "message";
  messageInput.required = true;
  messageInput.className = "form-box__suggestion__input";
  textBox.appendChild(messageInput);

  const checkboxBox = document.createElement("div");
  checkboxBox.className = "form-box__check";

  const checkboxLabel = document.createElement("label");
  checkboxLabel.textContent =
    "Согласен с правилами обработки персональных данных";
  checkboxLabel.className = "form-box__check__label";
  const checkboxInput = document.createElement("input");
  checkboxInput.className = "form-box__check__input";
  checkboxInput.type = "checkbox";
  checkboxInput.id = "agreement";
  checkboxInput.name = "agreement";
  checkboxInput.required = true;
  checkboxLabel.appendChild(checkboxInput);
  checkboxBox.appendChild(checkboxLabel);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Отправить";
  submitButton.className = "form-box__button";

  form.appendChild(nameBox);
  form.appendChild(emailBox);
  form.appendChild(textBox);
  form.appendChild(checkboxBox);
  form.appendChild(submitButton);

  const formFieldSection = document.getElementById("form-field");
  formFieldSection.appendChild(form);

  const username = localStorage.getItem("name");

  if (username) {
    nameInput.value = username;
    nameInput.disabled = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const isAgreed = checkboxInput.checked;

    if (!name || !email || !message || !isAgreed) {
      alert("Пожалуйста, заполните все поля и согласитесь с правилами.");
      return;
    }

    formFieldSection.innerHTML = "<h2>Заявка успешно отправлена!</h2>";

    localStorage.setItem(
      "form-submission",
      JSON.stringify({
        name: name,
        email: email,
        message: message,
      })
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createForm();
});
