const router = require('express').Router();

const upload = require('../services/upload');
const { protect } = require('../middlewares/jwtProtect');
const novelController = require('../controllers/novelController');

router.post("/test", protect, novelController.health);
router.get("/", novelController.getNovel);
router.get("/mynovel", protect, novelController.getMyNovel);
router.get("/:novelId", novelController.getOneNovel);
router.post("/create", protect, upload.single("coverImg"), novelController.createNovel);
router.patch("/:novelId", protect, upload.single("coverImg"), novelController.updateNovel);
router.delete("/:novelId", protect, novelController.deleteNovel);

module.exports = router;