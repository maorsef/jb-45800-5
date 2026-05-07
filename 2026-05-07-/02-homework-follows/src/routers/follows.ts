import { Router } from "express";
import { getFollowers, getFollowing } from "../controllers/follows/controller";

const followsRouter = Router()

followsRouter.get('/followers', getFollowers)
followsRouter.get('/following', getFollowing)

export default followsRouter