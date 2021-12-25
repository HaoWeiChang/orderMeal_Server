const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./mysql/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const activityRoutes = require("./routes/activityRoutes");
const MySQLstore = require("express-mysql-session")(session);
const app = express();

require("dotenv").config();

let sessionStore = new MySQLstore(
  {
    expiration: 5 * 60 * 1000,
    checkExpirationInterval: 60 * 60 * 1000,
    clearExpired: true,
  },
  db
);
let corsoptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(
  session({
    name: "uid",
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

//use middleware
app.use(cors(corsoptions));
app.use(bodyParser.json());

//set use api host
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/activity", activityRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
