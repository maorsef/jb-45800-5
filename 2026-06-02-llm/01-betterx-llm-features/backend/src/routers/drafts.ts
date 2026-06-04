import { Router } from "express";
import bodyValidation from "../middlewares/body-validation";
import { generatePic, improve, userImprove } from "../controllers/drafts/controller";
import { generatePicValidator, improveDraftValidator, userImproveDraftValidator } from "../controllers/drafts/validator";

const draftsRouter = Router()

draftsRouter.post('/improve', bodyValidation(improveDraftValidator), improve)
draftsRouter.post('/user-improve', bodyValidation(userImproveDraftValidator), userImprove)
draftsRouter.post('/pic', bodyValidation(generatePicValidator), generatePic)

export default draftsRouter

