import db from "../config/db.js";

const getReferenceRelationships = async (req, res) => {
  const [rows] = await db.query(
    `SELECT reference_relationship_id, relationship_name FROM reference_relationships`,
  );
  return rows;
};

export default getReferenceRelationships;
