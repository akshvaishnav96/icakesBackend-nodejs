import mongoose, { mongo } from "mongoose";
import { CakeTier } from "../modules/cakeTier.js"

const showTier = async (req, res) => {
    try {
        const data = await CakeTier.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
};



const uplodeTier = async (req, res) => {

    try {


        let { tier } = req.body;

        tier = parseInt(tier);


        const alreadtExist = await CakeTier.find({ tier });

        if (alreadtExist.length > 0) {
            res.status(200).json({ msg: "Tier already exists" });
            return;
        }

        const newTier = await CakeTier.create({ tier });
        res.status(201).json({ newTier, msg: "Tier added" });


    } catch (error) {
        res.status(400).json(error)
    }

}

const editTier = async (req, res) => {


    try {
        const _id = req.params.id;

        const data = await CakeTier.findById({ _id });

        if (data) {

            res.status(200).json(data);
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error, msg: "no tier found" })
    }

}

const updateTier = async (req, res) => {
    try {

        const _id = req.params.id;

        let { tier } = req.body;

        const data = await CakeTier.findById({ _id });

        if (data) {

            tier = parseInt(tier);
            data.tier = tier;
            await data.save();
            res.status(200).json(data);

        }


    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const deleteTier = async (req, res) => {

    try {
        const _id = req.params.id;



        const data = await CakeTier.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'Tier successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}




export { showTier, uplodeTier, updateTier, editTier, deleteTier }