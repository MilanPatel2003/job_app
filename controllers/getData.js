import db from "../config/db.js";
import { generateQuery } from "../utils/searchLogic.js";

const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const offset = (page - 1) * limit;
    const search = req.query.search || ""

    const where = await generateQuery(search)
    console.log(where);
    

    const [countResult] = await db.query(`SELECT COUNT(*) AS TOTAL FROM applicants ${where}`)
    const totalRows = countResult[0].TOTAL;
    const totalPages = Math.ceil(totalRows/limit)

    const [rows,fields] = await db.query(`SELECT * FROM applicants ${where} LIMIT ? OFFSET ?`,[limit,offset])

    
    res.render("displayAll",{rows,fields,currentPage:page,totalPages, search})
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export default getData;