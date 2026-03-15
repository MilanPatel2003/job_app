import db from "../config/db.js";

const getCourseType = async (req, res) => {
  const [rows] = await db.query(
    `SELECT course_type_id, course_type_name FROM course_types`,
  );
  return rows;
};

export default getCourseType;
