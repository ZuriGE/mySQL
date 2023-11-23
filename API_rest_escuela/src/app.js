const express = require("express");
const cors = require("cors");
const studentsRouters = require("./routers/students.routers");
const subjectsRouters = require("./routers/subjects.routers");
const errorHandling = require("./error/errorHandling");

const app = express();

app.set("port", process.env.POST || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(studentsRouters);
app.use(subjectsRouters);
app.use((req, res, next) => {
	res.status(404).json({ error: true, code: 404, message: "Endpoint not found" });
});

app.use(errorHandling);

module.exports = app;
