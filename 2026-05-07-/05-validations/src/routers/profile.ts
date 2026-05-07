import { json, Router } from "express";
import { createPost, deletePost, getPost, getProfile } from "../controllers/profile/controller";
import { newPostValidator } from "../controllers/profile/validator";
import bodyValidation from "../middlewares/body-validation";

const profileRouter = Router()

profileRouter.get('/', getProfile)
profileRouter.get('/:postId', getPost)
profileRouter.delete('/:postId', deletePost)
profileRouter.post('/', json(), bodyValidation(newPostValidator), createPost)
// profileRouter.patch('/', json(), validation(updatePostValidator), updatePost)

export default profileRouter;