

import db from "../config/db.js";

export const getApplicationById = async (req, res) => {
  const editApplicantId = req.params.editApplicantId;
  const conn = await db.getConnection();

  try {
    const [rows] = await conn.query("SELECT * FROM applicants WHERE applicant_id=?", [editApplicantId]);
    if (rows.length === 0) return res.status(404).send("Not Found");
    
    const basic = rows[0]; 

    const [work] = await conn.query("SELECT * FROM applicant_work_experiences WHERE applicant_id=?", [editApplicantId]);
    const [education] = await conn.query("SELECT * FROM applicant_educations WHERE applicant_id=?", [editApplicantId]);
    const [applicant_languages] = await conn.query("SELECT * FROM applicant_languages WHERE applicant_id=?", [editApplicantId]);
    const [applicant_technologies] = await conn.query("SELECT * FROM applicant_technologies WHERE applicant_id=?", [editApplicantId]);
    const [applicant_references] = await conn.query("SELECT * FROM applicant_references WHERE applicant_id=?", [editApplicantId]);

    const [genders] = await conn.query("SELECT * FROM genders");
    const [maritalStatuses] = await conn.query("SELECT * FROM marital_statuses");
    const [states] = await conn.query("SELECT * FROM states");
    const [courseTypes] = await conn.query("SELECT * FROM course_types");
    const [languages] = await conn.query("SELECT * FROM languages");
    const [proficiencyLevels] = await conn.query("SELECT * FROM proficiency_levels");
    const [technologies] = await conn.query("SELECT * FROM technologies");
    const [referenceRelationships] = await conn.query("SELECT * FROM reference_relationships");
    const [countries] = await conn.query("SELECT * FROM countries")

    res.render("updateForm", {
      basic,
      work,
      education,
      applicant_languages,
      applicant_technologies,
      applicant_references,
      genders,
      maritalStatuses,
      states,
      courseTypes,
      languages,
      proficiencyLevels,
      technologies,
      referenceRelationships,
      countries
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  } finally {
    conn.release();
  }
};