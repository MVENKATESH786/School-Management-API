module.exports = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res
      .status(400)
      .json({
        error:
          "Invalid input data. Name, address, latitude, and longitude are required.",
      });
  }
  next();
};
