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
    
    
    res.render("newInsertForm", {
        genders, languages, courseTypes, referenceRelationships, maritalStatuses,proficiencyLevels, technologies
    })
})


//controll routes
router.post("/add", insertData)
router.get("/display", getData)



export default router