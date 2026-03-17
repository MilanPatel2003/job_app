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

    const educationDetailsQuery = `SELECT 
    e.applicant_education_id, 
    e.applicant_id, 
    c.course_type_id,
    c.course_type_name,
    e.board_or_university,
    e.passing_year,
    e.percentage 
FROM applicant_educations e
JOIN course_types c ON e.course_type_id = c.course_type_id
WHERE e.applicant_id = ?;`;
    const [educationDetails] = await conn.query(educationDetailsQuery, [
      applicantId,
    ]);
    console.log(educationDetails);

    const workQuery = `SELECT 
    w.applicant_work_experience_id, 
    w.applicant_id, 
    w.company_name,
    w.designation,
    w.start_date,
    w.end_date 
FROM applicant_work_experiences w
JOIN applicants a ON a.applicant_id = w.applicant_id
WHERE a.applicant_id = 1;`;

    const [workDetails] = await conn.query(workQuery, [applicantId]);
    console.log(workDetails);

    const languageQuery = `SELECT 
    al.applicant_language_id, 
    al.applicant_id, 
    al.language_id,
    l.language_name,
    al.can_read,
    al.can_speak,
    al.can_write 
FROM applicant_languages al
JOIN languages l ON l.language_id = al.language_id
WHERE al.applicant_id = 1;`;

    const [languageDetails] = await conn.query(languageQuery, [applicantId]);

    console.log(languageDetails);

    const technologyQuery = `SELECT at.applicant_id,
 t.technology_name,
 p.proficiency_level_name
 FROM applicant_technologies at
 JOIN technologies t
 ON t.technology_id = at.technology_id
 JOIN proficiency_levels p 
 ON p.proficiency_level_id=at.proficiency_level_id
 WHERE at.applicant_id = 1;`;

    const [technologyDetails] = await conn.query(technologyQuery, [
      applicantId,
    ]);
    console.log(technologyDetails);
    const referenceQuery = `
 SELECT r.reference_name,
 r.company_name,
 r.designation,
 r.phone_number,
 r.email,
 rr.relationship_name 
 FROM applicant_references r
 JOIN reference_relationships rr
 ON rr.reference_relationship_id=r.reference_relationship_id;
 `
    const [referenceDetails] = await conn.query(referenceQuery, [
      applicantId,
    ]);


    await conn.commit();

    res.render("applicantDetails", {
      basicDetails,
      educationDetails,
      technologyDetails,
      workDetails,
      languageDetails,
      referenceDetails
    });
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
