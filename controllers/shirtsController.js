const express = require("express");
const router = express.Router();
const {
  getAllShirts,
  getShirtById,
  createShirt,
  deleteShirtById,
  updateShirtById,
} = require("../queries/shirts");
const { checkImage, checkBoolean, checkName, checkPrice, checkStore } = require("../validations/checkShirts")

router.get("/", async (req, res) => {
  const allShirts = await getAllShirts();

  if (Array.isArray(allShirts)) {
    res.json(allShirts);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const shirt = await getShirtById(id);
  if (shirt.length === 0) {
    res.status(404).json({ error: "Shirt not found" });
  } else {
    res.json(shirt[0]);
  }
});

router.post("/", checkImage, checkBoolean, checkName, checkPrice, checkStore, async (req, res) => {
  try {
    const imageUrl = req.body.image
      ? req.body.art
      : "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C51Q6Wb%2BEakL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679._SX._UX._SY._UY_.png";

    const shirtData = {
      ...req.body,
      image: imageUrl,
    };

    const shirt = await createShirt(shirtData);
    res.json(shirt);
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedShirt = await deleteShirtById(id);
  if (deletedShirt.length === 0) {
    res.status(404).json({ error: "Shirt not found" });
  } else {
    res.json(deletedShirt[0]);
  }
});

router.put(
  "/:id",
  checkImage,
  checkBoolean,
  checkName,
  checkPrice,
  checkStore,
  async (req, res) => {
    try {
      const { id } = req.params;
      const imageUrl = req.body.image
        ? req.body.image
        : "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C51Q6Wb%2BEakL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679._SX._UX._SY._UY_.png";

      const updatedShirtData = {
        ...req.body,
        image: imageUrl,
      };

      const updatedShirt = await updateShirtById(id, updatedShirtData);
      if (updatedShirt.length === 0) {
        res.status(404).json({ error: "Shirt not found" });
      } else {
        res.json(updatedShirt[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
