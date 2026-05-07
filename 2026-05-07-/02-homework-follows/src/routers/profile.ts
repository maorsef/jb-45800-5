import { json, Router } from "express";
import { createPost, deletePost, getPost, getProfile } from "../controllers/profile/controller";

const profileRouter = Router()

profileRouter.get('/', getProfile)
profileRouter.get('/:postId', getPost)
profileRouter.delete('/:postId', deletePost)
profileRouter.post('/', json(), createPost)

export default profileRouter;