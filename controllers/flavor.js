import { CakeFlavor } from "../modules/cakeFlavor.js";
import fs from "fs";


const showFlavor = async (req, res) => {

    try {
        const data = await CakeFlavor.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }

}

const uplodeFlavor = async (req, res) => {

    const { cakeFlavor, description, ingredients } = req.body;
    let image = req.file?.path;




    try {


        const alreadyExist = await CakeFlavor.find({ cakeFlavor });

        if (alreadyExist.length > 0) {
            throw new Error("Flavor already exists");

        }


        const data = await CakeFlavor.create({ description, ingredients, cakeFlavor, image });


        return res.status(201).json(data);
    } catch (error) {
        if (error) {
            const exist = fs.existsSync(image);
            if (exist) {
                fs.unlinkSync(image);
            }
        }
        console.log(error.message);
        return res.status(400).json({ error, msg: error.message });
    }
}


const editFlavor = async (req, res) => {

    try {
        const _id = req.params.id;

        const data = await CakeFlavor.findById({ _id });


        if (data) {

            res.status(200).json(data);
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error, msg: "no Flavor found" })
    }

}

const updateFlavor = async (req, res) => {
    const _id = req.params.id;

    const { cakeFlavor, description, ingredients } = req.body
    const imagepath = req.file?.path;







    try {


        const alreadyExist = await CakeFlavor.findById({ _id });


        if (alreadyExist) {

            if (cakeFlavor) {
                alreadyExist.cakeFlavor = cakeFlavor;

            }
            if (description) {
                alreadyExist.description = description;

            }

            if (ingredients) {
                alreadyExist.ingredients = ingredients;

            }

            if (imagepath) {

                const oldImage = alreadyExist.image;

                alreadyExist.image = imagepath;

                fs.unlinkSync(oldImage);

            }

            await alreadyExist.save();

            return res.status(200).json({ msg: "Flavor updated", data: alreadyExist });
        } else {
            throw new Error('no flavor found')
        }





    } catch (error) {

        if (error) {

            const exist = fs.existsSync(imagepath);
            if (exist) {
                fs.unlinkSync(imagepath);
            }

        }
        res.status(400).json({ error: error, msg: error.message })

    }


}

const deleteFlavor = async (req, res) => {
    try {
        const _id = req.params.id;



        const data = await CakeFlavor.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'Flavor successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}


export { showFlavor, uplodeFlavor, editFlavor, updateFlavor, deleteFlavor }