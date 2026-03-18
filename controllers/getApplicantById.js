// import db from "../config/db.js";

// export const getApplicationById = async (req, res) => {
//   const editApplicantId = req.params.editApplicantId;
//   const conn = await db.getConnection();
  
//   try {
//     // 1. Fetch Applicant Data
//     const [basicRows] = await conn.query(
//       `SELECT * FROM applicants WHERE applicant_id=?`,
//       [editApplicantId],
//     );
    
//     // Check if applicant exists
//     if (basicRows.length === 0) {
//       return res.status(404).send("Applicant not found");
//     }
//     const basic = basicRows[0]; // Get the single object

//     const [work] = await conn.query(
//       `SELECT * FROM applicant_work_experiences WHERE applicant_id=?`,
//       [editApplicantId],
//     );

//     const [education] = await conn.query(
//       `SELECT * FROM applicant_educations WHERE applicant_id=?`,
//       [editApplicantId],
//     );

//     const [languages] = await conn.query(
//       `SELECT * FROM applicant_languages WHERE applicant_id=?`,
//       [editApplicantId],
//     );

//     const [technologies] = await conn.query(
//       `SELECT * FROM applicant_technologies WHERE applicant_id=?`,
//       [editApplicantId],
//     );

//     const [references] = await conn.query(
//       `SELECT * FROM applicant_references WHERE applicant_id=?`,
//       [editApplicantId],
//     );

//     // 2. Fetch Dropdown Options
//     const [genders] = await conn.query(`SELECT * FROM genders`);
//     const [maritalStatuses] = await conn.query(`SELECT * FROM marital_statuses`);
//     const [states] = await conn.query(`SELECT * FROM states`);
//     const [courseTypes] = await conn.query(`SELECT * FROM course_types`);
//     const [allLanguages] = await conn.query(`SELECT * FROM languages`);
//     const [proficiencyLevels] = await conn.query(`SELECT * FROM proficiency_levels`);
//     const [allTechnologies] = await conn.query(`SELECT * FROM technologies`);
//     const [referenceRelationships] = await conn.query(`SELECT * FROM reference_relationships`);

//     // 3. Render View with Consistent Names
//     res.render("updateForm", {
//       basic,                      // Single object now
//       work,                       // Array
//       education,                  // Array
//       applicant_languages: languages, // Renamed for clarity in view
//       applicant_technologies: technologies, // Renamed for clarity
//       applicant_references: references,   // Renamed for clarity
      
//       // Dropdown Lists
//       genders,
//       maritalStatuses,
//       states,
//       courseTypes,
//       allLanguages,               // List of ALL languages
//       proficiencyLevels,
//       technologies: allTechnologies, // List of ALL technologies
//       referenceRelationships
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   } finally {
//     conn.release();
//   }
// };

import db from "../config/db.js";

export const getApplicationById = async (req, res) => {
  const editApplicantId = req.params.editApplicantId;
  const conn = await db.getConnection();

  try {
    // 1. Get Basic Info
    const [rows] = await conn.query("SELECT * FROM applicants WHERE applicant_id=?", [editApplicantId]);
    if (rows.length === 0) return res.status(404).send("Not Found");
    
    // We take the first row as 'basic' (a single object)
    const basic = rows[0]; 

    // 2. Get Lists (Arrays)
    const [work] = await conn.query("SELECT * FROM applicant_work_experiences WHERE applicant_id=?", [editApplicantId]);
    const [education] = await conn.query("SELECT * FROM applicant_educations WHERE applicant_id=?", [editApplicantId]);
    const [applicant_languages] = await conn.query("SELECT * FROM applicant_languages WHERE applicant_id=?", [editApplicantId]);
    const [applicant_technologies] = await conn.query("SELECT * FROM applicant_technologies WHERE applicant_id=?", [editApplicantId]);
    const [applicant_references] = await conn.query("SELECT * FROM applicant_references WHERE applicant_id=?", [editApplicantId]);

    // 3. Get Dropdown Options
    const [genders] = await conn.query("SELECT * FROM genders");
    const [maritalStatuses] = await conn.query("SELECT * FROM marital_statuses");
    const [states] = await conn.query("SELECT * FROM states");
    const [courseTypes] = await conn.query("SELECT * FROM course_types");
    const [languages] = await conn.query("SELECT * FROM languages");
    const [proficiencyLevels] = await conn.query("SELECT * FROM proficiency_levels");
    const [technologies] = await conn.query("SELECT * FROM technologies");
    const [referenceRelationships] = await conn.query("SELECT * FROM reference_relationships");

    // 4. Send to View
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
      referenceRelationships
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  } finally {
    conn.release();
  }
};