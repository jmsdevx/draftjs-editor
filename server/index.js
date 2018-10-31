require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const massive = require("massive");
const app = express();
const cors = require("cors");
app.use(json());
app.use(cors());
const port = 3005;
const { addStudent } = require("./controller");
const { addHomework } = require("./controller");
const { getAllHomework } = require("./controller");
const { getOneHomework } = require("./controller");

massive(process.env.STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);

    // dbInstance
    //   .create_table()
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

app.post("/api/students", addStudent);
app.post("/api/homework", addHomework);
app.get("/api/homework/all", getAllHomework);
app.get("/api/homework/:id", getOneHomework);

app.listen(port, () => console.log(`Listening on ${port}`));
