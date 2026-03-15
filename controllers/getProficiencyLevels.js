import db from "../config/db.js";

const getProficiencyLevels = async (req, res) => {
  const [rows] = await db.query(
    `SELECT proficiency_level_id, proficiency_level_name FROM proficiency_levels`,
  );
  return rows;
};

export default getProficiencyLevels;
