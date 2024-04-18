import mongoose, { mongo } from "mongoose";
import { CakeSize } from "../modules/cakeSize.js"

const showSize = async (req, res) => {
    try {
        const data = await CakeSize.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
};



const uplodeSize = async (req, res) => {

    try {


        const { cakesize, serving } = req.body;




        const alreadtExist = await CakeSize.findOne({ cakesize });


        if (alreadtExist.cakesize === cakesize && alreadtExist.serving === serving) {
            res.status(200).json({ msg: "Size already exists" });
            return;
        }

        const newSize = await CakeSize.create({ cakesize, serving: serving || undefined });
        res.status(201).json({ newSize, msg: "Size added" });


    } catch (error) {
        res.status(400).json(error)
    }

}

const editSize = async (req, res) => {


    try {
        const _id = req.params.id;

        const data = await CakeSize.findById({ _id });

        if (data) {

            res.status(200).json(data);
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error, msg: "no Size found" })
    }

}

const updateSize = async (req, res) => {
    try {

        const _id = req.params.id;

        const { cakesize, serving } = req.body


        const data = await CakeSize.findById({ _id });

        const matchData = await CakeSize.find({ cakesize, serving });

        if (matchData.length > 0) {
            res.status(200).json({ msg: "Size already exists" });
            return;
        }



        if (data) {



            if (cakesize) {
                data.cakesize = cakesize
            }

            if (serving) {
                data.serving = serving
            }


            await data.save();
            res.status(200).json(data);

        }


    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const deleteSize = async (req, res) => {

    try {
        const _id = req.params.id;



        const data = await CakeSize.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'Size successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}




export { showSize, uplodeSize, updateSize, editSize, deleteSize }