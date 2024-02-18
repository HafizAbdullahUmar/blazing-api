import { deploy } from "controllers/automation/deploy";
import { Router } from "express";


const router = Router();

router.get("/deploy",  deploy);

export default router;
