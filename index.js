import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));

const yourUsername = "divyagrawal29";
const yourPassword = "qwert";
const yourAPIKey = "e69c203d-51e9-46de-80f2-a00903972f7a";
const yourBearerToken = "10b83674-9d95-4c02-9dd1-21d23f684ed1";
const configToken = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`,
  },
};
const configBasic = {
  auth: {
    username: yourUsername,
    password: yourPassword,
  },
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=2`, configBasic);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: {
        score: 7,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(401).send(err.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/42`, configToken);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
