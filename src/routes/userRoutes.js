const router = require('express').Router();

const upload = require('../services/upload');
const { protect } = require('../middlewares/jwtProtect');
const userController = require('../controllers/userController');

router.get("/info", protect, userController.userInfo);
router.post("/signup", upload.single("profileImg"), userController.signup);
router.post("/signin", userController.signin);
router.patch("/profile", protect, upload.single("profileImg"), userController.update);
// router.patch("/password", protect);
router.post("/follow/:followingId", protect, userController.followWriter);
router.delete("/follow/:followingId", protect, userController.unFollowWriter);
router.delete("/signout", protect, userController.signout);

module.exports = router;