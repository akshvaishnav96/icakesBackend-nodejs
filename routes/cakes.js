import { Router } from "express";
import { deleteCategory, editCategory, showCategory, updateCategory, uplodeCategory } from "../controllers/category.js";
import { deleteSubCategory, editSubCategory, showSubCategory, updateSubCategory, uplodeSubCategory } from "../controllers/subcategory.js";
import { deleteTier, editTier, showTier, updateTier, uplodeTier } from "../controllers/tier.js";
import { deleteSize, editSize, showSize, updateSize, uplodeSize } from "../controllers/size.js";
import { deleteFlavor, editFlavor, showFlavor, updateFlavor, uplodeFlavor } from "../controllers/flavor.js";
import { upload } from "../middleware/multer.js";
import { deleteFlavorWithPrice, editFlavorWithPrice, showFlavorWithPrice, updateFlavorWithPrice, uplodeFlavorWithPrice } from "../controllers/cakeFlavorWithPrice.js";
import { deleteCakeSizeWithPrice, editCakeSizeWithPrice, showCakeSizeWithPrice, updateCakeSizeWithPrice, uplodeCakeSizeWithPrice } from "../controllers/cakeSizeWIthPriceTier.js";
import { deletecake, editcake, showcake, updatecake, uplodecake } from "../controllers/cakes.js";

const cakeRouter = Router();



cakeRouter.route("/category").get(showCategory);
cakeRouter.route("/category").post(uplodeCategory);
cakeRouter.route("/category/edit/:id").get(updateCategory);
cakeRouter.route("/category/edit/:id").patch(editCategory);
cakeRouter.route("/category/delete/:id").delete(deleteCategory);



cakeRouter.route("/subcategory").get(showSubCategory);
cakeRouter.route("/subcategory").post(uplodeSubCategory);
cakeRouter.route("/subcategory/edit/:id").get(editSubCategory);
cakeRouter.route("/subcategory/edit/:id").patch(updateSubCategory);
cakeRouter.route("/subcategory/delete/:id").delete(deleteSubCategory);



cakeRouter.route("/tier").get(showTier);
cakeRouter.route("/tier").post(uplodeTier);
cakeRouter.route("/tier/edit/:id").get(editTier);
cakeRouter.route("/tier/edit/:id").patch(updateTier);
cakeRouter.route("/tier/delete/:id").delete(deleteTier);



cakeRouter.route("/size").get(showSize);
cakeRouter.route("/size").post(uplodeSize);
cakeRouter.route("/size/edit/:id").get(editSize);
cakeRouter.route("/size/edit/:id").patch(updateSize);
cakeRouter.route("/size/delete/:id").delete(deleteSize);



cakeRouter.route("/flavor").get(showFlavor);
cakeRouter.route("/flavor").post(upload.single('image'), uplodeFlavor);
cakeRouter.route("/flavor/edit/:id").get(editFlavor);
cakeRouter.route("/flavor/edit/:id").patch(upload.single('image'), updateFlavor);
cakeRouter.route("/flavor/delete/:id").delete(deleteFlavor);



cakeRouter.route("/flavorwithprice").get(showFlavorWithPrice);
cakeRouter.route("/flavorwithprice").post(uplodeFlavorWithPrice);
cakeRouter.route("/flavorwithprice/edit/:id").get(editFlavorWithPrice);
cakeRouter.route("/flavorwithprice/edit/:id").patch(updateFlavorWithPrice);
cakeRouter.route("/flavorwithprice/delete/:id").delete(deleteFlavorWithPrice);



cakeRouter.route("/cakeSizewithprice").get(showCakeSizeWithPrice);
cakeRouter.route("/cakeSizewithprice").post(uplodeCakeSizeWithPrice);
cakeRouter.route("/cakeSizewithprice/edit/:id").get(editCakeSizeWithPrice);
cakeRouter.route("/cakeSizewithprice/edit/:id").patch(updateCakeSizeWithPrice);
cakeRouter.route("/cakeSizewithprice/delete/:id").delete(deleteCakeSizeWithPrice);



cakeRouter.route("/cake").get(showcake);
cakeRouter.route("/cake").post(uplodecake);
cakeRouter.route("/cake/edit/:id").get(updatecake);
cakeRouter.route("/cake/edit/:id").patch(editcake);
cakeRouter.route("/cake/delete/:id").delete(deletecake);


export { cakeRouter };