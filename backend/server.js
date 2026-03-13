const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/ratings", require("./routes/ratings"));

app.listen(3000, () => {
    console.log("后端运行在 http://localhost:3000");
});