
import mongoose from "mongoose";
import { CakeFlavorWithPrice } from "../modules/cakeFlavorWithPrice.js"
import { CakeFlavor } from "../modules/cakeFlavor.js"


const showFlavorWithPrice = async (req, res) => {


    try {


        const cakeAllFlavors = await CakeFlavor.find({});

        const data = await CakeFlavorWithPrice.aggregate([


            {
                $lookup: {
                    from: "cakeflavors",
                    localField: "flavor",
                    foreignField: "_id",
                    as: "flavor_detail",
                }
            },
            {
                $project: {
                    price: 1,
                    _id: 1,
                    flavor_detail: {
                        $first: "$flavor_detail"
                    }
                }
            }
        ])

        res.status(200).json({ data, cakeAllFlavors })
    } catch (error) {
        console.log(error);
    }



}

const uplodeFlavorWithPrice = async (req, res) => {

    try {


        let { flavor, price } = req.body;

        const intprice = parseInt(price);

        const existdata = await CakeFlavorWithPrice.find({ flavor: new mongoose.Types.ObjectId(flavor), price });



        if (existdata && existdata.length > 0) {
            throw new Error("Flavor with price already exists");
        };



        const newFlavor = await CakeFlavorWithPrice.create({ flavor, price });

        if (newFlavor) {
            res.status(200).json(newFlavor);
        }



    } catch (error) {
        res.status(400).json({ error, msg: error.message })
    }



    // const data = await CakeFlavorWithPrice.aggregate([

    //     {
    //         $match:
    //         {
    //             flavor: new mongoose.Types.ObjectId(flavor)
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "cakeflavors",
    //             localField: "flavor",
    //             foreignField: "_id",
    //             as: "flavor_name",
    //         }
    //     }
    // ])


}
const editFlavorWithPrice = async (req, res) => {




    try {

        const _id = req.params.id;
        const cakeAllFlavors = await CakeFlavor.find({});
        const data = await CakeFlavorWithPrice.findById({ _id });

        if (data) {



            res.status(200).json({ data, cakeAllFlavors });
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error, msg: "flavor with price not found" })
    }

}
const updateFlavorWithPrice = async (req, res) => {

    const _id = req.params.id;
    const { price, flavor } = req.body;
    const flavorId = new mongoose.Types.ObjectId(flavor)

    const intprice = parseInt(price);



    try {

        const data = await CakeFlavorWithPrice.findById({ _id });




        const cakeAllFlavors = await CakeFlavor.find({});

        if (data) {

            if (price && flavor) {
                const alreadyExist = await CakeFlavorWithPrice.findOne({ price: intprice, flavor: flavorId });

                if (alreadyExist) {
                    throw new Error(`Flavor with price already exists`)
                }
            }

            


            if (price) {
                data.price = intprice;
            }

            if (flavor) {
                data.flavor = flavor;
            }
            await data.save();

            res.status(200).json({ data, cakeAllFlavors, msg: "flavor with price updated successfully" });
            return;
        }






    } catch (error) {
        res.status(400).json({ error: error, msg: error.message })
    }
}
const deleteFlavorWithPrice = async (req, res) => {
    try {
        const _id = req.params.id;



        const data = await CakeFlavorWithPrice.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'Cake size with price successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export {
    showFlavorWithPrice,
    uplodeFlavorWithPrice,
    editFlavorWithPrice,
    updateFlavorWithPrice,
    deleteFlavorWithPrice
}