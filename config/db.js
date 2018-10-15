const mongoose = require("mongoose");
require("dotenv").config();

/* Connect to MongoDB
Check for db connection
Check for errors, print errors */
const db = mongoose.connection;
mongoose.connect(
	`${process.env.MONGO_DB_URI}`,
	{ useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
db.on("connected", () => {
	console.log("Connected to database");
});
db.on("error", err => {
	console.log("Error while connecting to database:" + err);
});

module.exports = db;
