import db from "../config/db.js";

const insertData = async (req, res) => {
  const {
    first_name,
    middle_name,
    surname,
    email,
    phone_number,
    date_of_birth,
    gender_id,
    marital_status_id,
    country,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    current_designation,
    total_experience_years,
  } = req.body;

  console.log(req.body);

  let conn;

  try {
    conn = await db.getConnection();

    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO applicants
(first_name,middle_name,surname,email,phone_number,date_of_birth,
gender_id,marital_status_id,country,address_line1,address_line2,
city,state,postal_code,current_designation,total_experience_years)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        first_name,
        middle_name,
        surname,
        email,
        phone_number,
        date_of_birth,
        gender_id,
        marital_status_id,
        country,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        current_designation,
        total_experience_years,
      ],
    );

    const applicantId = result.insertId;

    // EDUCATION
    for (const edu of req.body.education) {
      if (!edu.board_or_uni) continue;

      await conn.query(
        `INSERT INTO applicant_educations
(applicant_id,course_type_id,board_or_university,passing_year,percentage)
VALUES (?,?,?,?,?)`,
        [
          applicantId,
          edu.course_type_id,
          edu.board_or_uni,
          edu.year,
          edu.percentage,
        ],
      );
    }

    // WORK
    for (const work of req.body.work) {
      if (!work.company_name) continue;

      await conn.query(
        `INSERT INTO applicant_work_experiences
(applicant_id,company_name,designation,start_date,end_date)
VALUES (?,?,?,?,?)`,
        [
          applicantId,
          work.company_name,
          work.designation,
          work.start_date,
          work.end_date,
        ],
      );
    }

    // LANGUAGES
    for (const lang of req.body.languages) {
      await conn.query(
        `INSERT INTO applicant_languages
(applicant_id,language_id,can_read,can_write,can_speak)
VALUES (?,?,?,?,?)`,
        [
          applicantId,
          lang.language_id,
          lang.read ? 1 : 0,
          lang.write ? 1 : 0,
          lang.speak ? 1 : 0,
        ],
      );
    } 

    // TECHNOLOGIES
    for (const tech of req.body.technologies) {
      if (!tech.proficiency_level_id) continue;

      await conn.query(
        `INSERT INTO applicant_technologies
(applicant_id,technology_id,proficiency_level_id)
VALUES (?,?,?)`,
        [applicantId, tech.technology_id, tech.proficiency_level_id],
      );
    }

    // REFERENCES
    for (const ref of req.body.references) {
      if (!ref.name) continue;

      await conn.query(
        `INSERT INTO applicant_references
(applicant_id,reference_name,company_name,designation,phone_number,email,reference_relationship_id)
VALUES (?,?,?,?,?,?,?)`,
        [
          applicantId,
          ref.name,
          ref.company,
          ref.designation,
          ref.phone,
          ref.email,
          ref.relationship_id,
        ],
      );
    }

    await conn.commit();

    res.send("Application saved");
  } catch (err) {
    if (conn) await conn.rollback();

    console.log(err);

    res.status(500).send("Error saving application");
  } finally {
    if (conn) conn.release();
  }
};

export default insertData;
