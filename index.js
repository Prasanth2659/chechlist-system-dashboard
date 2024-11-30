const express = require("express");
const axios = require("axios");
const checklistRules = require("./config/checklistRules");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// API URL
const API_URL = "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";

// Fetch data and evaluate rules
const evaluateChecklist = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    // Evaluate each rule
    const results = checklistRules.map((rule) => ({
      id: rule.id,
      description: rule.description,
      passed: rule.evaluate(data),
    }));

    return results;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

// Dashboard route
app.get("/", async (req, res) => {
  const results = await evaluateChecklist();
  res.render("dashboard", { results });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
