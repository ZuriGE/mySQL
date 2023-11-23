const { Router } = require("express");
const router = Router();
const subjectCtrl = require("../controller/subjects.controller");

router.get("/marks", subjectCtrl.getMarks);
router.get("/signedup", subjectCtrl.getSignedUp);
router.get("/teach", subjectCtrl.getTeacherSubject);

module.exports = router;
