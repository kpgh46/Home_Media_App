const express = require("express");
const routes = require("./backend/routes/routes");
const path = require("path");
const app = express();

// Set up the view engine
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "frontend/views"));

// Set up static files

app.use(express.static(path.join(__dirname, "frontend/public")));

app.use("/", routes);

// Start the server
const port = 3000;

app.listen(port, "127.0.0.1", () => {
	console.log(`App listening at http://127.0.0.1:${port}`);
});
