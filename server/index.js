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
const { deleteHomework } = require("./controller");
const { editHomework } = require("./controller");
const { getSearch } = require("./controller");
const { editNote } = require("./controller");
const { addNote } = require("./controller");
const { getAllNotes } = require("./controller");
const { deleteNote } = require("./controller");
const { getSynonyms } = require("./controller");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const faker = require("faker");

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

//homework
app.post("/api/students", addStudent);
app.post("/api/homework", addHomework);
app.get("/api/homework/all", getAllHomework);
app.get("/api/homework/:id", getOneHomework);
app.delete("/api/homework/:id", deleteHomework);
app.put("/api/homework/edit/:id", editHomework);

//search
app.post("/api/search", getSearch);
app.post("/api/search/synonyms", getSynonyms);

//chat
app.post("/api/chat/note", addNote);
app.put("/api/chat/note/:id", editNote);
app.get("/api/notes/all/:id", getAllNotes);
app.delete("/api/notes/:id", deleteNote);

//twilio chat
app.get("/token", function(req, res) {
  let identity = faker.name.findName();

  let token = new AccessToken(
    process.env.TWILIO_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_SECRET
  );

  token.identity = identity;

  const grant = new VideoGrant();
  token.addGrant(grant);

  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));
