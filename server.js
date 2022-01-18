const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./mysql/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const activityRoutes = require("./routes/activityRoutes");
const managerRoutes = require("./routes/managerRoutes");
const MySQLstore = require("express-mysql-session")(session);
const resTimes = require("./middleware/resTime");
const app = express();

require("dotenv").config();

let sessionStore = new MySQLstore({}, db);
let corsoptions = {
  origin: [
    "http://123.193.90.36:8080",
    "http://140.124.73.173:8080",
    "http://localhost:8080",
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(
  session({
    name: "uid",
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: true,
    },
  })
);

//use middleware
app.use(cors(corsoptions));
app.use(bodyParser.json());
app.use(resTimes());

//set use api host
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/manager", managerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
