import db from "../config/db.js"

const getState = async (req,res) => {
    const [row] =await db.query("SELECT * FROM states")
    return row
}

export default getState