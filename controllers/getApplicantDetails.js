import db from "../config/db.js";

const getApplicantDetails = async (req, res) => {
  let conn;
  try {
    const applicantId = req.params.applicantId;

    conn = await db.getConnection();
    await conn.beginTransaction();
    const basicDetailsQuery = `SELECT 
    a.applicant_id,
    a.first_name,
    a.middle_name,
    a.surname,
    g.gender_name,
    a.date_of_birth,
    ms.marital_status_name AS marital_status,
    a.address_line1,
    a.address_line2,
    c.city_name,
    s.state_name,
    a.postal_code,
    a.country,
    a.phone_number,
    a.email,
    a.current_designation,
    a.total_experience_years,
    a.created_at
FROM applicants a
JOIN genders g 
    ON a.gender_id = g.gender_id
JOIN marital_statuses ms 
    ON a.marital_status_id = ms.marital_status_id
JOIN cities c 
    ON a.city = c.city_id
JOIN states s 
    ON a.state = s.state_id
WHERE a.applicant_id = ?`;
    const [basicDetails] = await conn.query(basicDetailsQuery, [applicantId]);
    console.log(basicDetails[0]);
    await conn.commit();

    res.render("applicantDetails",{
        basicDetails
    })
  } catch (err) {
    if (conn) {
      await conn.rollback();
    }
    console.error("Database Error:", err);
    res.status(500).send(err.message);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
export default getApplicantDetails;
