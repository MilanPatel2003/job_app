import express from "express"
import getCourseType from "../controllers/getCourseType.js"
import getLanguages from "../controllers/getLanguages.js"
import getMaritualStatus from "../controllers/getMaritualStatus.js"
import getProficiencyLevels from "../controllers/getProficiencyLevels.js"
import getReferenceRelationships from "../controllers/getReferenceRelationships.js"
import getGender from "../controllers/getGender.js"
import getCities from "../controllers/getCities.js"
const router = express.Router()




//controll routes
router.get("/gender", getGender)
router.get("/course", getCourseType)
router.get("/language", getLanguages)
router.get("/maritualstatus", getMaritualStatus)
router.get("/proficiency", getProficiencyLevels)
router.get("/referencerelation", getReferenceRelationships)
router.get("/city/:stateId", getCities); 




export default router