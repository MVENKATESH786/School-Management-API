const express = require("express");
const router = express.Router();
const db = require("../db"); // Database connection
const calculateDistance = require("../utils/calculateDistance"); // Utility for distance calculation

// Route to list schools based on proximity
router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate query parameters
  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "Latitude and longitude are required.",
    });
  }

  // Parse latitude and longitude
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({
      error: "Latitude and longitude must be valid numbers.",
    });
  }

  // Query to fetch all schools
  const query = "SELECT id, name, address, latitude, longitude FROM schools";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error.",
        details: err.message,
      });
    }

    // Calculate distance for each school and sort by proximity
    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    // Return the sorted list of schools
    res.status(200).json(sortedSchools);
  });
});

module.exports = router;
