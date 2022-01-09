const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, UserFollow, Session } = require('../models');
const { cloudUpload, cloudDelete } = require('../services/cloudinary');

exports.userInfo = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await User.findOne({ where: { id } });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const { email, password, writerName, firstName, lastName, description, address, phoneNumber } = req.body;
        // cloud image upload
        const file = req.file;
        let profileImg = null;
        if (file) profileImg = await cloudUpload(file);
        // bcrypt hash
        const hashedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
        // create User
        const result = await User.create({ email, password: hashedPassword, writerName, firstName, lastName, description, address, phoneNumber, profileImg });
        // create Session
        await Session.create({ userId: result.id, valid: true, userAgent: req.get("user-agent") });
        // create jwt
        const payload = { id: result.id, email: result.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED });
        return res
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .status(200)
            .json(result);
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // validate
        const foundUser = await User.findOne({ where: { email } });
        if (!foundUser) throw new Error("e-mail or password incorrect");
        const comparePassword = await bcrypt.compare(password, foundUser.password);
        // create Session
        await Session.create({ userId: foundUser.id, valid: comparePassword, userAgent: req.get("user-agent") });
        if (!comparePassword) throw new Error("e-mail or password incorrect");
        // create Jwt
        const payload = { id: foundUser.id, email: foundUser.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED });
        return res
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .status(200)
            .json(foundUser);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { writerName, firstName, lastName, description, address, phoneNumber } = req.body;
        const file = req.file;
        const foundUser = await User.findOne({ where: id });
        // cloud image upload
        if (file) {
            await cloudDelete(foundUser.profileImg);
            profileImg = await cloudUpload(file);
            const result = await foundUser.update({ writerName, firstName, lastName, description, address, phoneNumber, profileImg });
            return res.status(200).json(result);
        }
        // update User
        const result = await foundUser.update({ writerName, firstName, lastName, description, address, phoneNumber });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.signout = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        await Session.destroy({ where: { [Op.and]: [{ userId }, { userAgent: (req.get("user-agent")) }] } });
        res.status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({ message: "sign out" });
    } catch (error) {
        next(error);
    }
};

exports.followWriter = async (req, res, next) => {
    try {
        const { id: followerId } = req.user;
        const { followingId } = req.params;
        // validate
        if (followerId === +followingId) throw new Error("self-following is not allowed");
        const foundUser = await User.findOne({ where: { id: followingId } });
        if (!foundUser) throw new Error("user does not exist");
        const foundFollow = await UserFollow.findOne({ where: { [Op.and]: [{ followingId }, { followerId }] } });
        if (foundFollow) throw new Error("user has already been followed");
        // create UserFollow
        const result = await UserFollow.create({ followingId: +followingId, followerId: req.user.id });
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.unFollowWriter = async (req, res, next) => {
    try {
        const { id: followerId } = req.user;
        const { followingId } = req.params;
        // validate
        const foundUser = await User.findOne({ where: { id: followingId } });
        if (!foundUser) throw new Error("user does not exist");
        const foundFollow = await UserFollow.findOne({ where: { [Op.and]: [{ followingId }, { followerId }] }, include: User });
        if (!foundFollow) throw new Error("user has already been unfollowed");
        // delete UserFollow
        await foundFollow.destroy();
        return res.status(200).json({ message: `${foundUser.writerName} is unfollow` });
    } catch (err) {
        next(err);
    }
};