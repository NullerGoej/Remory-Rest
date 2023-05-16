const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const db = require("./app/models");

db.sequelize.sync();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to remory API" });
});

require("./app/routes/task.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});