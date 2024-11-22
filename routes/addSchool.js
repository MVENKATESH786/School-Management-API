const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the database connection
const validateInputs = require("../middleware/validateInputs"); // Middleware for validation

// Route to add a school
router.post("/addSchool", validateInputs, (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // SQL query to insert a new school
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  // Execute the query
  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
        details: err.message,
      });
    }

    // Successful insertion response
    res.status(201).json({
      message: "School added successfully",
      schoolId: results.insertId,
    });
  });
});

module.exports = router;
