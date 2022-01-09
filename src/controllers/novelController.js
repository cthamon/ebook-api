const { Novel, NovelType, NovelTypeMap, Episode, Paragraph, User } = require('../models');
const { cloudUpload, cloudDelete } = require('../services/cloudinary');

exports.health = async (req, res) => {
    const { id } = req.body;
    const url = "https://res.cloudinary.com/daqov2l6u/image/upload/v1641538973/novel/cover/yneu9xcydgseufv7vf1c.jpg";
    // const result = await User.findAll({ where: { id: 2 }, include: [{ model: User, as: "follower", through: ["UserFollow"] }] });
    const type = await NovelTypeMap.findAll({ where: { novelId: id } });
    // type.destroy();
    return res.json(url.split("/")[9]);
};

exports.getOneNovel = async (req, res, next) => {
    try {
        const { novelId } = req.params;
        const novel = await Novel.findAll({ where: { id: novelId }, include: [{ model: NovelType }] });
        const result = novel.map(
            ({ id, title, description, coverImg, price, status, createdAt, updatedAt, NovelTypes, User }) =>
            ({
                id, title, description, coverImg, price, status, createdAt, updatedAt,
                novelType: NovelTypes.map((item) => item.novelType)
            })
        );
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getNovel = async (req, res, next) => {
    try {
        const novels = await Novel.findAll({ include: [{ model: User }, { model: NovelType }] });
        const result = novels.map(
            ({ id, title, description, coverImg, price, status, createdAt, updatedAt, NovelTypes, User }) =>
            ({
                id, title, description, coverImg, price, status, createdAt, updatedAt,
                novelType: NovelTypes.map((item) => item.novelType), writer: { userId: User.id, name: User.writerName }
            })
        );
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getMyNovel = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const novels = await Novel.findAll({ where: { userId }, include: [{ model: User }, { model: NovelType }] });
        const result = novels.map(
            ({ id, title, description, coverImg, price, status, createdAt, updatedAt, NovelTypes, User }) =>
            ({
                id, title, description, coverImg, price, status, createdAt, updatedAt,
                novelType: NovelTypes.map((item) => ({ name: item.novelType, novelTypeId: item.id })), writer: { userId: User.id, name: User.writerName }
            })
        );
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.createNovel = async (req, res, next) => {
    try {
        const { title, description, novelTypes, price } = req.body;
        const file = req.file;
        const { id: userId } = req.user;
        // cloud image upload
        const coverImg = await cloudUpload(file);
        // create Novel
        const result = await Novel.create({ title, description, price, status: false, coverImg, userId });
        // map NovelType
        JSON.parse(novelTypes).forEach(async (novelType) => {
            const { id: novelTypeId } = await NovelType.findOne({ where: { novelType } });
            await NovelTypeMap.create({ novelTypeId, novelId: result.id });
        });
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

exports.updateNovel = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { novelId } = req.params;
        const { title, description, novelTypes, price } = req.body;
        const file = req.file;
        // validate
        const foundNovel = await Novel.findOne({ where: { id: novelId } });
        if (foundNovel.userId !== userId) throw new Error("unauthorized");
        if (!foundNovel) throw new Error("novel does not exist");
        // update NovelType
        if (novelTypes) {
            await NovelTypeMap.destroy({ where: { novelId } });
            JSON.parse(novelTypes).forEach(async (novelType) => {
                const { id: novelTypeId } = await NovelType.findOne({ where: { novelType } });
                await NovelTypeMap.create({ novelTypeId, novelId });
            });
        }
        // update Novel
        if (file) {
            await cloudDelete(foundNovel.coverImg);
            const coverImg = await cloudUpload(file);
            const result = await foundNovel.update({ title, description, price, coverImg });
            return res.status(200).json(result);
        }
        const result = await foundNovel.update({ title, description, price });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteNovel = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { novelId } = req.params;
        // validate
        const foundNovel = await Novel.findOne({ where: { id: novelId } });
        if (foundNovel.userId !== userId) throw new Error("unauthorized");
        if (!foundNovel) throw new Error("novel does not exist");
        // delete Paragraph, Episode
        const foundEpisode = await Episode.findAll({ where: { novelId } });
        foundEpisode.forEach(async (episode) => {
            await Paragraph.destroy({ where: { episodeId: episode.id } });
            await Episode.destroy({ where: { id: episode.id } });
        });
        // delete NovelType
        await NovelTypeMap.destroy({ where: { novelId } });
        // delete cloudimage
        if (foundNovel.coverImg) await cloudDelete(foundNovel.coverImg);
        // delete Novel
        await foundNovel.destroy();
        return res.status(200).json({ message: `${foundNovel.title} is successfully deleted` });
    } catch (error) {
        next(error);
    }
};