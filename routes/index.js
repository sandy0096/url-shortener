import express from 'express';
import { validateURL } from "../middlewares/urlMiddleware.js"
import { shortURL, redirecToURL, redirectToPrivacyPolicy, redirectToHome, redirectToTerms } from "../controllers/urlController.js"

const router = express.Router();

router.get("/", redirectToHome);

router.get("/[a-zA-Z]{5}", redirecToURL);

router.get("/privacy-policy", redirectToPrivacyPolicy);

router.get("/terms-and-conditions", redirectToTerms);

router.post("/short-url", validateURL, shortURL);

export default router;