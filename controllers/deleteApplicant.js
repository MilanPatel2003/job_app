import db from "../config/db.js"

const deleteApplicant = async (req,res) => {
    const applicantId = req.params.applicantId
    const [result] =await db.query(`DELETE FROM applicants WHERE applicant_id=?`,[applicantId])
    console.log(`applciant ID: ${applicantId} DELETED `);
    
    res.redirect("/")
}

export default deleteApplicant 