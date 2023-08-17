const db = require("../db/dbConfig");

const getAllShirts = async () => {
  try {
    const allShirts = await db.any("SELECT * FROM shirts");

    return allShirts;
  } catch (error) {
    return error;
  }
};

async function getShirtById(id) {
  try {
    const foundShirt = await db.any(`SELECT * FROM shirts WHERE id = $1`, id);

    return foundShirt;
  } catch (error) {
    return error;
  }
}

const createShirt = async (data) => {
  try {
    const newShirt = await db.one(
      "INSERT INTO shirts (name, color, size, price, store, is_favorite, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data.name,
        data.color,
        data.size,
        data.price,
        data.store,
        data.is_favorite,
        data.image,
      ]
    );

    return { status: "successful!", data: newShirt };
  } catch (error) {
    return error;
  }
};

const deleteShirtById = async (id) => {
  try {
    const deletedShirt = await db.any(
      "DELETE FROM shirts WHERE id = $1 RETURNING *",
      [id]
    );

    return { status: "successful!", data: deletedShirt };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

const updateShirtById = async (id, data) => {
  try {
    const originalShirt = await db.any("SELECT * FROM shirts WHERE id = $1", [
      id,
    ]);

    let combinedShirt = {
      ...originalShirt[0],
      ...data,
    };

    const updatedShirt = await db.one(
      "UPDATE shirts SET name = $1, color = $2, size = $3, price = $4, store = $5, is_favorite = $6, image = $7 WHERE id = $8 RETURNING *",
      [
        combinedShirt.name,
        combinedShirt.color,
        combinedShirt.size,
        combinedShirt.price,
        combinedShirt.store,
        combinedShirt.is_favorite,
        combinedShirt.image,
        id,
      ]
    );

    return { status: "successful!", data: updatedShirt };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

module.exports = {
  getAllShirts,
  getShirtById,
  createShirt,
  deleteShirtById,
  updateShirtById,
};
