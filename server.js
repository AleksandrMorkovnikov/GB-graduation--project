const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5500;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/data-json', express.static(path.join(__dirname, 'data-json')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

app.get('/suggest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'suggest.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

const DATA_FILE_PATH = path.join(__dirname, "data-json", "users-data.json");

app.get("/users", (req, res) => {
  fs.readFile(DATA_FILE_PATH, (err, data) => {
    if (err) {
      return res.status(500).send("Ошибка чтения файла");
    }
    res.json(JSON.parse(data));
  });
});

app.delete("/users/:email/events/:eventName", (req, res) => {
  const { email, eventName } = req.params;

  fs.readFile(DATA_FILE_PATH, (err, data) => {
    if (err) {
      return res.status(500).send("Ошибка чтения файла");
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.username === email);

    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }

    user.events = user.events.filter(
      (event) => event["event-name"] !== decodeURIComponent(eventName)
    );

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Ошибка записи файла");
      }
      res.send({ message: "Мероприятие удалено" });
    });
  });
});

app.post("/users/:email/events", (req, res) => {
  const { email } = req.params;
  const { "event-name": eventName, status, date } = req.body;

  fs.readFile(DATA_FILE_PATH, (err, data) => {
    if (err) {
      return res.status(500).send("Ошибка чтения файла");
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.username === email);

    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }

    const existingEvent = user.events.find((event) => event["event-name"] === eventName);
    if (existingEvent) {
      return res.status(400).send("Мероприятие уже существует");
    }

    user.events.push({
      "event-name": eventName,
      status,
      date,
    });

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Ошибка записи файла");
      }
      res.send({ message: "Мероприятие восстановлено" });
    });
  });
});

app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});