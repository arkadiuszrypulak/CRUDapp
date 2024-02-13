const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

let corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/test", async (req, res) => {
  try {
    const response = await axios.get("https://the-trivia-api.com/v2/questions");
    const questions = response.data;
    res.json(questions);
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send("Error during fetch data");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
