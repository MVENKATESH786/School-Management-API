const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the database connection

// Helper function to calculate distance between two geographical points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Route to list schools sorted by proximity
router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      error: "Invalid or missing latitude and longitude in query parameters",
    });
  }

  // Fetch all schools from the database
  const query = "SELECT id, name, address, latitude, longitude FROM schools";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
        details: err.message,
      });
    }

    // Calculate distances and sort schools
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

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

    res.status(200).json(sortedSchools);
  });
});

module.exports = router;
