import db from "../config/db.js";

const getTechnologies = async (req, res) => {
  const [rows] = await db.query(
    `SELECT technology_id, technology_name FROM technologies`,
  );
  return rows;
};

export default getTechnologies;
