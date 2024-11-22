const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const addSchoolRoute = require("./routes/addSchool");
const listSchoolsRoute = require("./routes/listSchools");

dotenv.config();
const app = express();

app.use(bodyParser.json());

// Routes
app.use("/api", addSchoolRoute);
app.use("/api", listSchoolsRoute);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
