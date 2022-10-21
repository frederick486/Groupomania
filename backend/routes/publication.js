const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publications")
// const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


// router.post("/", auth, multer, publicationCtrl.createPublication);
router.post("/", multer, publicationCtrl.createPublication);
router.get("/", multer,  publicationCtrl.getAllPublication);


module.exports = router;

//---------------------------------------------------------
// Piquantes
// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

// const saucesCtrl = require("../controllers/sauces");

// router.get("/", auth, saucesCtrl.getAllSauces);
// router.post("/", auth, multer, saucesCtrl.createSauce);
// router.get("/:id", auth, saucesCtrl.getOneSauce);
// router.put("/:id", auth, multer, saucesCtrl.modifySauce);
// router.delete("/:id", auth, saucesCtrl.deleteSauce);
// router.post("/:id/like", auth, saucesCtrl.likeSauce);

// module.exports = router;
//---------------------------------------------------------