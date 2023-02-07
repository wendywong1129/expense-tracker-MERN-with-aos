const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");

dotenv.config();
dbConnect();

const app = express();

const PORT = process.env.PORT || 5005;

app.use(express.json());

app.use("/api/users/", usersRoute);
app.use("/api/transactions/", transactionsRoute);

app.listen(PORT, () => console.log(`Server is running at port:${PORT}...`));
