const checkPrice = (req, res, next) => {
  const price = req.body.price;
  if (price < 0) {
    res.status(400).json({ error: "Invalid price." });
  } else {
    next();
  }
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

const checkImage = (req, res, next) => {
  const imageUrl = req.body.image;

  if (!imageUrl || isValidUrl(imageUrl)) {
    next();
  } else {
    res.status(400).json({ error: "Invalid image URL." });
  }
};

const checkBoolean = (req, res, next) => {
  if (typeof req.body.is_favorite !== "boolean") {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  } else {
    next();
  }
};

const checkName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Name is required" });
  } else {
    next();
  }
};

module.exports = { checkBoolean, checkName, checkPrice, checkImage };

