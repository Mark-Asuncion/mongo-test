const express = require('express');
const _db = require("./internal/db.js");
const app = express();
const syllabus = require("./internal/syllabus.js");

app.use("/syllabus", syllabus);
const PORT = process.env.PORT;
app.listen(PORT);
console.log("Server listening on Port",PORT);
