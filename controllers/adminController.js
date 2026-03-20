import db from "../config/db.js";

const addGender = async (req, res) => {
  const genderName = req.body.addGender;
  try {
    const [result] = await db.query(`INSERT INTO genders (gender_name) VALUES (?)`, [genderName]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editGender = async (req, res) => {
  const id = req.params.id;
  const genderName = req.body.genderName;
  try {
    const [result] = await db.query(
      `UPDATE genders SET gender_name=? WHERE gender_id=?`,
      [genderName, id],
    );
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteGender = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(`DELETE FROM genders WHERE gender_id=?`, [id]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addState = async (req, res) => {
  const stateName = req.body.stateName; 
  try {
    await db.query(`INSERT INTO states (state_name) VALUES (?)`, [stateName]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteState = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM states WHERE state_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addCity = async (req, res) => {
  const cityName = req.body.cityName;
  const stateId = req.body.stateId; 
  try {
    await db.query(`INSERT INTO cities (city_name, state_id) VALUES (?, ?)`, [cityName, stateId]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editCity = async (req, res) => {
  const id = req.params.id;
  const cityName = req.body.cityName;
  const stateId = req.body.stateId;
  try {
    await db.query(
      `UPDATE cities SET city_name=?, state_id=? WHERE city_id=?`,
      [cityName, stateId, id],
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteCity = async (req, res) => { 
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM cities WHERE city_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addMaritualStatus = async (req, res) => {
  const statusName = req.body.addMaritalStatusName;
  try {
    await db.query(`INSERT INTO marital_statuses (marital_status_name) VALUES (?)`, [statusName]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editMaritualStatus = async (req, res) => {
  const id = req.params.id;
  const statusName = req.body.maritalStatusName;
  try {
    await db.query(
      `UPDATE marital_statuses SET marital_status_name=? WHERE marital_status_id=?`,
      [statusName, id],
    );
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteMaritualStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM marital_statuses WHERE marital_status_id=?`, [id]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addCourseType = async (req, res) => {
  const typeName = req.body.addCourseTypeName;
  try {
    await db.query(`INSERT INTO course_types (course_type_name) VALUES (?)`, [typeName]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editCourseType = async (req, res) => {
  const id = req.params.id;
  const typeName = req.body.courseTypeName;
  try {
    await db.query(
      `UPDATE course_types SET course_type_name=? WHERE course_type_id=?`,
      [typeName, id],
    );
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteCourseType = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM course_types WHERE course_type_id=?`, [id]);
    res.redirect("/admin/form");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addLanguage = async (req, res) => {
  const languageName = req.body.languageName;
  try {
    await db.query(`INSERT INTO languages (language_name) VALUES (?)`, [languageName]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editLanguage = async (req, res) => {
  const id = req.params.id;
  const languageName = req.body.languageName;
  try {
    await db.query(
      `UPDATE languages SET language_name=? WHERE language_id=?`,
      [languageName, id],
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteLanguage = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM languages WHERE language_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addProficiency = async (req, res) => {
  const levelName = req.body.proficiencyLevel;
  try {
    await db.query(`INSERT INTO proficiencies (level_name) VALUES (?)`, [levelName]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editProficiency = async (req, res) => {
  const id = req.params.id;
  const levelName = req.body.proficiencyLevel;
  try {
    await db.query(
      `UPDATE proficiencies SET level_name=? WHERE level_id=?`,
      [levelName, id],
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteProficiency = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM proficiencies WHERE level_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addTechnology = async (req, res) => {
  const techName = req.body.technologyName;
  try {
    await db.query(`INSERT INTO technologies (tech_name) VALUES (?)`, [techName]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editTechnology = async (req, res) => {
  const id = req.params.id;
  const techName = req.body.technologyName;
  try {
    await db.query(
      `UPDATE technologies SET tech_name=? WHERE tech_id=?`,
      [techName, id],
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTechnology = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM technologies WHERE tech_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addReferenceRelationships = async (req, res) => {
  const relationName = req.body.relationshipName;
  try {
    await db.query(`INSERT INTO reference_relationships (relation_name) VALUES (?)`, [relationName]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editReferenceRelationships = async (req, res) => {
  const id = req.params.id;
  const relationName = req.body.relationshipName;
  try {
    await db.query(
      `UPDATE reference_relationships SET relation_name=? WHERE relation_id=?`,
      [relationName, id],
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteReferenceRelationships = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM reference_relationships WHERE relation_id=?`, [id]);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  addGender,
  editGender,
  deleteGender,
  addState,
  deleteState,
  addCity,
  editCity,
  deleteCity, 
  addMaritualStatus,
  editMaritualStatus,
  deleteMaritualStatus,
  addCourseType,
  editCourseType,
  deleteCourseType,
  addLanguage,
  editLanguage,
  deleteLanguage,
  addProficiency,
  editProficiency,
  deleteProficiency,
  addTechnology,
  editTechnology,
  deleteTechnology,
  addReferenceRelationships,
  editReferenceRelationships,
  deleteReferenceRelationships,
};