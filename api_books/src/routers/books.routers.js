const { Router } = require("express");
const router = Router();
const booksCtrl = require("../controller/books.controller");

///reto 3
router.get("/books", booksCtrl.getBooksById);
// router.get("/books", booksCtrl.getAllBooks);
router.post("/books", booksCtrl.addBooks);
router.put("/books", booksCtrl.putBooksById);
router.delete("/books", booksCtrl.delBooksById);

module.exports = router;
