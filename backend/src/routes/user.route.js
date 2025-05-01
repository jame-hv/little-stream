import express from "express";

import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protectedRoute);
