const { Op } = require('sequelize');

const { Novel, Episode, Paragraph } = require('../models');

exports.getEpisodes = async (req, res, next) => {
    try {
        const { novelId } = req.params;
        const result = await Episode.findAll({ where: { novelId } });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getEpisode = async (req, res, next) => {
    try {
        const { novelId, episodeNumber } = req.params;
        const { id: episodeId, episodeTitle } = await Episode.findOne({ where: { [Op.and]: [{ novelId }, { episodeNumber }] } });
        const result = await Paragraph.findAll({ where: { episodeId } });
        return res.status(200).json({ episodeTitle, paragraphs: result.map((item) => item.paragraph) });
    } catch (error) {
        next(error);
    }
};

exports.createEpisode = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { novelId } = req.params;
        const { episodeTitle, price, paragraphs } = req.body;
        // validate
        const foundNovel = await Novel.findOne({ where: { id: novelId } });
        if (!foundNovel) throw new Error("novel does not exist");
        if (foundNovel.userId !== userId) throw new Error("unauthorized");
        // create Episode
        let episodeNumber = 1;
        const foundEpisode = await Episode.findAll({ where: { novelId } });
        if (foundEpisode.length > 0) episodeNumber = foundEpisode[foundEpisode.length - 1].episodeNumber + 1;
        const episode = await Episode.create({ episodeNumber, episodeTitle, price: foundNovel.price > 0 ? 0 : price, status: false, novelId });
        // create Paragraph
        const paragraph = await Paragraph.bulkCreate(paragraphs.map((paragraph) => ({ paragraph, episodeId: episode.id })));
        return res.status(201).json({ episode, paragraph });
    } catch (error) {
        next(error);
    }
};

exports.updateEpisode = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { novelId, episodeNumber } = req.params;
        const { episodeTitle, price, paragraphs } = req.body;
        // validate
        const foundNovel = await Novel.findOne({ where: { id: novelId } });
        if (!foundNovel) throw new Error("novel does not exist");
        if (foundNovel.userId !== userId) throw new Error("unauthorized");
        // create Episode
        const foundEpisode = await Episode.findOne({ where: { [Op.and]: [{ novelId }, { episodeNumber }] } });
        const episode = await foundEpisode.update({ episodeTitle, price });
        // delete Paragraph
        await Paragraph.destroy({ where: { episodeId: foundEpisode.id } });
        // create Paragraph
        const paragraph = await Paragraph.bulkCreate(paragraphs.map((paragraph) => ({ paragraph, episodeId: episode.id })));
        return res.status(200).json({ episode, paragraph });
    } catch (error) {
        next(error);
    }
};

exports.deleteEpisode = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { episodeId } = req.params;
        // validate
        const foundEpisode = await Episode.findOne({ where: { id: episodeId }, include: Novel });
        if (foundEpisode.Novel.userId !== userId) throw new Error("unauthorized");
        if (!foundEpisode) throw new Error("episode doest not exist");
        // delete Paragraph
        await Paragraph.destroy({ where: { episodeId } });
        // delete Episode
        await foundEpisode.destroy();
        // update Episode episodeNumber
        const allEpisode = await Episode.findAll({ where: { novelId: foundEpisode.Novel.id } });
        const array = JSON.parse(JSON.stringify(allEpisode));
        for (let ele of array) {
            if (foundEpisode.episodeNumber < ele.episodeNumber) {
                let episodeNumber = ele.episodeNumber - 1;
                await Episode.update({ episodeNumber }, { where: { id: ele.id } });
            }
        }
        return res.status(200).json({ message: `${foundEpisode.episodeTitle} is successfully deleted` });
    } catch (error) {
        next(error);
    }
};

exports.test = async (req, res, next) => {
    try {
        const episodeId = 20;
        const foundEpisode = await Episode.findOne({ where: { id: episodeId }, include: Novel });
        const allEpisode = await Episode.findAll({ where: { novelId: foundEpisode.Novel.id } });
        const array = JSON.parse(JSON.stringify(allEpisode));
        for (let ele of array) {
            if (foundEpisode.episodeNumber < ele.episodeNumber) {
                const episodeNumber = ele.episodeNumber - 1;
                console.log(episodeNumber);
                // await Episode.update({ episodeNumber }, { where: { id: ele.id } });
            }
        }
        return res.json(array);
    } catch (error) {
        next(error);
    }
};