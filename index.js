import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "divyagrawal29";
const yourPassword = "qwert";
const yourAPIKey = "e69c203d-51e9-46de-80f2-a00903972f7a";
const yourBearerToken = "10b83674-9d95-4c02-9dd1-21d23f684ed1";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const response = await axios.get(`${API_URL}/random`);
  // console.log(response.data);
  const contentString = JSON.stringify(response.data);
  // res.redirect("/");
  //The data you get back should be sent to the ejs file as "content"
  res.render("index.ejs", { content: contentString });
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  const response = await axios.get(`${API_URL}/all?page=2`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const response = await axios.get(
      `${API_URL}/filter?score=5&apiKey=${yourAPIKey}`
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
    // res.send("Okay");
  } catch (error) {
    console.log(error.message);
    res.send("Error");
  }
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  try {
    const response = await axios.get(`${API_URL}/secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    console.log(err.message);
    res.send("Error");
  }
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
