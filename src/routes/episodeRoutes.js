const router = require('express').Router();

const { protect } = require('../middlewares/jwtProtect');
const episodeController = require('../controllers/episodeController');

router.get("/test", protect, episodeController.test);
router.get("/:novelId/:episodeNumber", protect, episodeController.getEpisode);
router.get("/:novelId", protect, episodeController.getEpisodes);
router.post("/:novelId", protect, episodeController.createEpisode);
router.patch("/:novelId/:episodeNumber", protect, episodeController.updateEpisode);
router.delete("/:episodeId", protect, episodeController.deleteEpisode);

module.exports = router;