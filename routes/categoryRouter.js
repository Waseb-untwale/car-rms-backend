const router = require("express").Router();
const categoryctrl = require("../controllers/categoryCtrl");
const Auth = require("../middleware/auth");
const AuthAdmin = require("../middleware/authAdmin");
router.get("/category", categoryctrl.getCategories);
router.post("/category", Auth, AuthAdmin, categoryctrl.createCategories);
router.delete("/category/:id", Auth, AuthAdmin, categoryctrl.deleteCategories);

router.put("/category/:id", categoryctrl.updateCategory);
module.exports = router;
