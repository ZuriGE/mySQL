const { Router } = require("express");
const router = Router();
const studentsCtrl = require("../controller/students.controller");

router.get("/students", studentsCtrl.getStudent);
router.post("/students", studentsCtrl.postStudent);
router.put("/students", studentsCtrl.putStudent);
router.delete("/students", studentsCtrl.delStudent);

module.exports = router;
