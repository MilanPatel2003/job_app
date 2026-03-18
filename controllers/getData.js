import db from "../config/db.js";

const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const offset = (page - 1) * limit;

    const [countResult] = await db.query(`SELECT COUNT(*) AS TOTAL FROM applicants`)
    const totalRows = countResult[0].TOTAL;
    const totalPages = Math.ceil(totalRows/limit)

    const [rows,fields] = await db.query(`SELECT * FROM applicants LIMIT ? OFFSET ?`,[limit,offset])
    console.log(rows);

    
    res.render("displayAll",{rows,fields,currentPage:page,totalPages})
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export default getData;
