const { Router } = require("express");
const router = Router();
const bookCtrl = require("../controller/book.controller");

///reto 2
router.get("/book", bookCtrl.getBook);
router.delete("/book", bookCtrl.delBook);
router.post("/book", bookCtrl.postBook);
router.put("/book", bookCtrl.putBook);

module.exports = router;
