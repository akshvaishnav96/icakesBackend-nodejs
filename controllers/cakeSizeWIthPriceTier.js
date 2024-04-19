
import mongoose from 'mongoose';
import { ServingSizeWithPriceTier } from '../modules/servingSizeWIthPriceTier.js';
import { CakeSize } from "../modules/cakeSize.js"
import { CakeTier } from '../modules/cakeTier.js';


const showCakeSizeWithPrice = async (req, res) => {

    try {


        const cakeAllTiers = await CakeTier.find({});
        const cakeAllSizes = await CakeSize.find({});

        const data = await ServingSizeWithPriceTier.aggregate([


            {
                $lookup: {
                    from: "cakesizes",
                    localField: "size",
                    foreignField: "_id",
                    as: "size_detail",
                }
            },
            {
                $lookup: {
                    from: "caketiers",
                    localField: "tier",
                    foreignField: "_id",
                    as: "tier_detail",
                }
            },
            {
                $project: {
                    price: 1,
                    _id: 1,
                    size_detail: {
                        $first: "$size_detail"
                    },
                    tier_detail: {
                        $first: "$tier_detail"
                    }
                }
            }
        ])

        res.status(200).json({ data, cakeAllSizes, cakeAllTiers })
    } catch (error) {
        console.log(error);
    }

}
const uplodeCakeSizeWithPrice = async (req, res) => {
    try {


        let { size, tier, price } = req.body;

        if (!size || !tier) {
            throw new Error("Size and tier are required.");
        }

        const intprice = parseInt(price);

        const existdata = await ServingSizeWithPriceTier.find({ tier: new mongoose.Types.ObjectId(tier), size: new mongoose.Types.ObjectId(size), price: intprice });

        if (existdata && existdata.length > 0) {
            throw new Error("Cake size with price already exists");
        };



        const newFlavor = await ServingSizeWithPriceTier.create({
            tier: new mongoose.Types.ObjectId(tier),
            size: new mongoose.Types.ObjectId(size),
            price
        });

        if (newFlavor) {
            res.status(200).json(newFlavor);
        }



    } catch (error) {
        res.status(400).json({ error, msg: error.message })
    }
}
const editCakeSizeWithPrice = async (req, res) => {
    try {

        const _id = req.params.id;
        const cakeAllTiers = await CakeTier.find({});
        const cakeAllSizes = await CakeSize.find({});

        const data = await ServingSizeWithPriceTier.findById({ _id });

        if (data) {



            res.status(200).json({ data, cakeAllTiers, cakeAllSizes });
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error, msg: "flavor with price not found" })
    }
}
const updateCakeSizeWithPrice = async (req, res) => {

    const _id = req.params.id;
    const { price, size, tier } = req.body;
    const tierId = new mongoose.Types.ObjectId(tier)
    const sizeId = new mongoose.Types.ObjectId(size)

    const intprice = parseInt(price);


    try {
        const cakeAllTiers = await CakeTier.find({});
        const cakeAllSizes = await CakeSize.find({});

        const data = await ServingSizeWithPriceTier.findById({ _id });





        if (data) {

            if (price && tier && size) {
                const alreadyExist = await ServingSizeWithPriceTier.findOne({ price: intprice, tier: tierId, size: sizeId });

                if (alreadyExist) {
                    throw new Error(`Caka size with price already exists`)
                }
            }




            if (price) {
                data.price = intprice;
            }

            if (size) {
                data.size = size;
            }

            if (tier) {
                data.tier = tier;
            }

            await data.save();

            res.status(200).json({ data, cakeAllSizes, cakeAllTiers, msg: "Cake size with price updated successfully" });
            return;
        }






    } catch (error) {
        res.status(400).json({ error: error, msg: error.message })
    }
}
const deleteCakeSizeWithPrice = async (req, res) => {
    try {
        const _id = req.params.id;



        const data = await ServingSizeWithPriceTier.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'Cake size with price successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}


export { showCakeSizeWithPrice, uplodeCakeSizeWithPrice, editCakeSizeWithPrice, updateCakeSizeWithPrice, deleteCakeSizeWithPrice }