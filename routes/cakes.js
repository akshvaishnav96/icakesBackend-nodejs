import { Router } from "express";
import { showCakes } from "../controllers/cakes.js";
import { deleteCategory, editCategory, showCategory, updateCategory, uplodeCategory } from "../controllers/category.js";
import { deleteSubCategory, editSubCategory, showSubCategory, updateSubCategory, uplodeSubCategory } from "../controllers/subcategory.js";
import { deleteTier, editTier, showTier, updateTier, uplodeTier } from "../controllers/tier.js";
import { deleteSize, editSize, showSize, updateSize, uplodeSize } from "../controllers/size.js";

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





export { cakeRouter };