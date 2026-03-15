import db from "../config/db.js";

const getMaritualStatus = async (req, res) => {
  const [rows] = await db.query(
    `SELECT marital_status_id, marital_status_name FROM marital_statuses`,
  );
  return rows;
};

export default getMaritualStatus;
