function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const email = emailInput.value;
  const password = passwordInput.value;
  const errorMessage = document.getElementById("error-message");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Введите корректный email";
    errorMessage.style.display = "block";
    return;
  }

  if (password.length < 8) {
    errorMessage.textContent = "Пароль должен быть не менее 8 символов";
    errorMessage.style.display = "block";
    return;
  }

  fetch("data-json/users-data.json")
    .then((response) => response.json())
    .then((usersDB) => {
      const user = usersDB.find(
        (u) => u.username === email && u.password === password
      );

      if (user) {
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.username);  
        localStorage.setItem("group", user.group);  
        localStorage.setItem("course", user.course);  
        localStorage.setItem("events", JSON.stringify(user.events));  
        localStorage.setItem("isLoggedIn", "true");

        const loginBtn = document.getElementById("open-login-modal");
        loginBtn.textContent = user.name;

        document.getElementById("login-modal").style.display = "none";
      } else {
        errorMessage.textContent = "Неверный логин или пароль!";
        errorMessage.style.display = "block";
      }
    })
    .catch((error) =>
      console.error("Ошибка при проверке пользователя:", error)
    );
}

document.getElementById("login-form").addEventListener("submit", handleLogin);

window.addEventListener("load", () => {
  const savedUsername = localStorage.getItem("name");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn && savedUsername) {
    const loginBtn = document.getElementById("open-login-modal");
    loginBtn.textContent = savedUsername;
    loginBtn.setAttribute("id", "logged");
  }
});

window.addEventListener("load", () => {
  const goAccount = document.getElementById("logged");

  if (goAccount) {
    goAccount.addEventListener("click", () => {
      window.location.href = "/account";
    });
  }
});