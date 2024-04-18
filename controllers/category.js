import { Category } from "../modules/mainCategory.js"


const showCategory = async (req, res) => {


    try {
        const data = await Category.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }

}



const uplodeCategory = async (req, res) => {

    const { category } = req.body;


    try {

        const existCategory = await Category.find({ category });

        if (existCategory.length > 0) {
            res.status(200).json({ msg: "category already exists" });
            return;
        }



        const newCategory = await Category.create({
            category
        })

        res.status(200).json({ msg: "category successfully added", data: newCategory })




    } catch (error) {
        res.status(404).json({ error: error })
    }


}

const updateCategory = async (req, res) => {
    try {
        const _id = req.params.id;

        const data = await Category.findById({ _id });

        if (data) {

            res.status(200).json(data);
            return;
        }

    } catch (error) {
        res.status(400).json({ error: error })
    }
}


const editCategory = async (req, res) => {
    try {

        const _id = req.params.id;

        const data = await Category.findById({ _id });

        if (data) {
            data.category = req.body.category;
            await data.save();
            res.status(200).json(data);

        }


    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const deleteCategory = async (req, res) => {

    try {
        const _id = req.params.id;



        const data = await Category.findByIdAndDelete({ _id });

        res.status(200).json({ msg: 'category successfully Deleted', data });


    } catch (error) {
        res.status(400).json({ error: error })
    }

}

export { showCategory, uplodeCategory, updateCategory, editCategory, deleteCategory }