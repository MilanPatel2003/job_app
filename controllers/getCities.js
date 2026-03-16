import db from "../config/db.js"

const getCities = async (req,res) => {
    const { stateId } = req.params;

        const [rows] = await db.query(`SELECT * FROM cities WHERE state_id = ?`, [stateId]);

       res.send(rows)
}

export default getCities