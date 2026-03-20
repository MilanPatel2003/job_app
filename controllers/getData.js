import db from "../config/db.js";

const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

const result = [];
let start = 0;
const symbols = ["$", "^", "/", "_"];

for (let i = 0; i <= search.length; i++) {
  if (symbols.includes(search[i]) || i == search.length) {
    let str = search.substring(start, i);
    if (str) result.push(str); 
    start = i;
  }
}

    const [countResult] = await db.query(
      `SELECT COUNT(*) AS TOTAL FROM applicants`,
    );
    const totalRows = countResult[0].TOTAL;
    const totalPages = Math.ceil(totalRows / limit);

    const [rows, fields] = await db.query(
      `SELECT * FROM applicants LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    // console.log(rows);

    res.render("displayAll", {
      rows,
      fields,
      currentPage: page,
      totalPages,
      search,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export default getData;
