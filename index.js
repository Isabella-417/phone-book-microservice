const express = require("express");
let people = require("./people.json");
const utils = require("./utils");
const morgan = require("morgan");

const app = express();
app.use(express.json());

morgan.token("request-body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] :request-body - :response-time ms"
  )
);

app.get("/info", (req, res) => {
  const date = new Date();
  const message = `Phonebook has info for ${people.length} <br/> ${date}`;
  res.send(message);
});

app.get("/api/persons", (req, res) => {
  res.json(people);
});

app.get("/api/persons/:id", (req, res) => {
  const idPerson = Number(req.params.id);
  const person = people.find((person) => person.id === idPerson);
  if (!person) {
    return res.status(404).end();
  }
  return res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const idPerson = Number(req.params.id);
  const userList = people.filter((person) => person.id !== idPerson);
  if (!userList) {
    return res.status(404);
  }
  return res.json(userList);
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  person.id = utils.generateId(100, 1);
  const errors = utils.validateParams(person, people);
  if (errors.errors.length !== 0) {
    return res.status(400).json(errors);
  }
  people = people.concat(person);
  res.json(people);
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Running`);
});
