import db from "../config/db.js";

export const updateApplication = async (req, res) => {
  const applicantId = req.params.id;

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

  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    await conn.query(
      `UPDATE applicants SET
        first_name=?, middle_name=?, surname=?, email=?, phone_number=?,
        date_of_birth=?, gender_id=?, marital_status_id=?, country=?,
        address_line1=?, address_line2=?, city=?, state=?, postal_code=?,
        current_designation=?, total_experience_years=?
       WHERE applicant_id=?`,
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
        applicantId,
      ]
    );


    await conn.query("DELETE FROM applicant_educations WHERE applicant_id=?", [applicantId]);
    await conn.query("DELETE FROM applicant_work_experiences WHERE applicant_id=?", [applicantId]);
    await conn.query("DELETE FROM applicant_languages WHERE applicant_id=?", [applicantId]);
    await conn.query("DELETE FROM applicant_technologies WHERE applicant_id=?", [applicantId]);
    await conn.query("DELETE FROM applicant_references WHERE applicant_id=?", [applicantId]);


    if (req.body.education) {
      for (const edu of req.body.education) {
        if (!edu.board_or_uni) continue;

        await conn.query(
          `INSERT INTO applicant_educations
          (applicant_id, course_type_id, board_or_university, passing_year, percentage)
          VALUES (?, ?, ?, ?, ?)`,
          [
            applicantId,
            edu.course_type_id,
            edu.board_or_uni,
            edu.year,
            edu.percentage || null,
          ]
        );
      }
    }


    if (req.body.work) {
      for (const work of req.body.work) {
        if (!work.company_name) continue;

        await conn.query(
          `INSERT INTO applicant_work_experiences
          (applicant_id, company_name, designation, start_date, end_date)
          VALUES (?, ?, ?, ?, ?)`,
          [
            applicantId,
            work.company_name,
            work.designation,
            work.start_date,
            work.end_date || null,
          ]
        );
      }
    }


    if (req.body.languages) {
      for (const lang of req.body.languages) {
        await conn.query(
          `INSERT INTO applicant_languages
          (applicant_id, language_id, can_read, can_write, can_speak)
          VALUES (?, ?, ?, ?, ?)`,
          [
            applicantId,
            lang.language_id,
            lang.read ? 1 : 0,
            lang.write ? 1 : 0,
            lang.speak ? 1 : 0,
          ]
        );
      }
    }


    if (req.body.technologies) {
      for (const tech of req.body.technologies) {
        if (!tech.proficiency_level_id) continue;

        await conn.query(
          `INSERT INTO applicant_technologies
          (applicant_id, technology_id, proficiency_level_id)
          VALUES (?, ?, ?)`,
          [applicantId, tech.technology_id, tech.proficiency_level_id]
        );
      }
    }


    if (req.body.references) {
      for (const ref of req.body.references) {
        if (!ref.name) continue;

        await conn.query(
          `INSERT INTO applicant_references
          (applicant_id, reference_name, company_name, designation, phone_number, email, reference_relationship_id)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            applicantId,
            ref.name,
            ref.company || null,
            ref.designation || null,
            ref.phone || null,
            ref.email || null,
            ref.relationship_id,
          ]
        );
      }
    }


    await conn.commit();

    res.redirect(`/display/${applicantId}`);
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Update Error:", err);   
    res.status(500).send("Error updating application");
  } finally {
    if (conn) conn.release();
  }
};