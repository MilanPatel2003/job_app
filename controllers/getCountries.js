import db from "../config/db.js"

const getCountries = async (req,res) => {
    const [row] =await db.query("SELECT * FROM countries")
    return row
}

export default getCountries