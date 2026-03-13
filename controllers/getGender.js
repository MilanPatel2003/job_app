import db from "../config/db.js";

const getGender = async (req,res) => {
 const [rows] = await db.query(`SELECT gender_id, gender_name FROM genders ORDER BY gender_name`)   
 return rows
}

export default getGender;