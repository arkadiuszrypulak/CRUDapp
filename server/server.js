const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

let corsOptions = {
  origin: "http://localhost:4200",
};

const adminCredentials = [{ username: "admin", password: "admin" }];

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/questions", async (req, res) => {
  try {
    const response = await axios.get("https://the-trivia-api.com/v2/questions");
    const questions = response.data;
    res.json(questions);
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send("Error during fetch data");
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const isAdmin = adminCredentials.find(
    (user) => user.username === username && user.password === password
  );

  if (isAdmin) {
    res.json(true);
  } else {
    res.json(false);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
