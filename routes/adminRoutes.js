import adminController from "../controllers/adminController.js";
import express from "express";
import getLanguages from "../controllers/getLanguages.js";
import getGender from "../controllers/getGender.js";
import getCourseType from "../controllers/getCourseType.js";
import getReferenceRelationships from "../controllers/getReferenceRelationships.js";
import getMaritualStatus from "../controllers/getMaritualStatus.js";
import getProficiencyLevels from "../controllers/getProficiencyLevels.js";
import getTechnologies from "../controllers/getTechnologies.js";
import getState from "../controllers/getStates.js";
const router = express.Router();

router.get("/form", async (req, res) => {
  const genders = await getGender();
  const languages = await getLanguages();
  const courseTypes = await getCourseType();
  const referenceRelationships = await getReferenceRelationships();
  const maritalStatuses = await getMaritualStatus();
  const proficiencyLevels = await getProficiencyLevels();
  const technologies = await getTechnologies();

  const states = await getState();
  // const cities = await getCities()

  res.render("admin", {
    genders,
    languages,
    courseTypes,
    referenceRelationships,
    maritalStatuses,
    proficiencyLevels,
    technologies,
    states,
  });
});

//gender
router.post("/gender/add", adminController.addGender);
router.post("/gender/edit/:id", adminController.editGender);
router.post("/gender/delete/:id", adminController.deleteGender);

//state
router.post("/state/add", adminController.addState);
router.post("/state/delete/:id", adminController.deleteState);

//city
router.post("/city/add", adminController.addCity);
router.post("city/edit/:id", adminController.editCity);
router.post("city/delete/:id", adminController.deleteCity);

//maritual Status
router.post("/maritualstatus/add", adminController.addMaritualStatus);
router.post("/maritualstatus/edit/:id", adminController.editMaritualStatus);
router.post("/maritualstatus/delete/:id", adminController.deleteMaritualStatus);

//course type
router.post("/course/add", adminController.addCourseType);
router.post("/course/edit/:id", adminController.editCourseType);
router.post("/course/delete/:id", adminController.deleteCourseType);

//language
router.post("/language/add", adminController.addLanguage);
router.post("/language/edit:id", adminController.editLanguage);
router.post("language/delete/:id", adminController.deleteLanguage);

//Proficiency
router.post("/proficiency/add", adminController.addProficiency);
router.post("/proficiency/edit/:id", adminController.editProficiency);
router.post("/proficiency/delete/:id", adminController.deleteProficiency);

//Technology
router.post("/technology/add", adminController.addTechnology);
router.post("/technology/edit/:id", adminController.editTechnology);
router.post("/technology/delete/:id", adminController.deleteTechnology);

//relations
router.post("/relations/add", adminController.addReferenceRelationships);
router.post("/relations/edit/:id", adminController.editReferenceRelationships);
router.post(
  "relation/delete/:id",
  adminController.deleteReferenceRelationships,
);

export default router;
