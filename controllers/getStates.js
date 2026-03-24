import db from "../config/db.js"

const getState = async (req,res) => {
    const countryId  = req.params.countryId;
    const [row] =await db.query("SELECT * FROM states WHERE country_id=?",[countryId])
    
       res.send(row)
}

export default getState