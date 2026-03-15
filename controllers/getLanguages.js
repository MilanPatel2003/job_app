import db from "../config/db.js";

const getLanguages = async (req,res) => {
    const [rows] = await db.query(`SELECT language_id, language_name FROM languages`)
    return rows
}

export default getLanguages;