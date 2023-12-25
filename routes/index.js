import express from 'express';
import { validateURL } from "../middlewares/urlMiddleware.js"
import { shortURL, redirecToURL } from "../controllers/urlController.js"

const router = express.Router();

router.post("/short-url", validateURL, shortURL);

export default router;