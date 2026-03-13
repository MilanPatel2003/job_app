import express from "express"
import insertData from "../controllers/insertData.js"
import getData from "../controllers/getData.js"
import getGender from "../controllers/getGender.js"
const router = express.Router()

// ejs routes
router.get("/addform", async (req,res)=>{
    const gender = await getGender()
    console.log(gender);
    
    res.render("insertForm")
})


//controll routes
router.post("/add", insertData)
router.get("/display", getData)



export default router