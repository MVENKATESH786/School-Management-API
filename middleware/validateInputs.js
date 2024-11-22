module.exports = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return res.status(400).json({
      error:
        "Invalid input data. Name, address, latitude, and longitude are required, and latitude/longitude must be valid geographical coordinates.",
    });
  }

  next();
};
