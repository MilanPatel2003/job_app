import express from "express"
import insertData from "../controllers/insertData.js"
import getData from "../controllers/getData.js"
import getGender from "../controllers/getGender.js"
import getLanguages from "../controllers/getLanguages.js"
import getCourseType from "../controllers/getCourseType.js"
import getReferenceRelationships from "../controllers/getReferenceRelationships.js"
import getMaritualStatus from "../controllers/getMaritualStatus.js"
import getProficiencyLevels from "../controllers/getProficiencyLevels.js"
import getTechnologies from "../controllers/getTechnologies.js"
import getState from "../controllers/getStates.js"
import getCities from "../controllers/getCities.js"
import getApplicantDetails from "../controllers/getApplicantDetails.js"
import deleteApplicant from "../controllers/deleteApplicant.js"
import { getApplicationById } from "../controllers/getApplicantById.js"
import { updateApplication } from "../controllers/updateApplicant.js"
const router = express.Router()

// ejs routes
router.get("/addform", async (req,res)=>{
    const genders = await getGender()
    const languages = await getLanguages()
    const courseTypes = await getCourseType()
    const referenceRelationships = await getReferenceRelationships()
    const maritalStatuses = await getMaritualStatus()
    const proficiencyLevels = await getProficiencyLevels()
    const technologies = await getTechnologies()
    const states = await getState()
    // const cities = await getCities()
    
    res.render("newInsertForm", {
        genders, languages, courseTypes, referenceRelationships, maritalStatuses,proficiencyLevels, technologies, states
    })
})


//controll routes
router.post("/add", insertData)
router.get("/display/:applicantId",getApplicantDetails)
router.get("/edit/:editApplicantId",getApplicationById)
router.post("/update/:id", updateApplication);
router.get("/", getData)
router.get("/delete/:applicantId", deleteApplicant)



export default router