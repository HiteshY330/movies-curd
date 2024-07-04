const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const items = require("./routers/index");

app.use(bodyParser.json());
mongoose
  .connect("mongodb://0.0.0.0:27017/crud-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", items);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
