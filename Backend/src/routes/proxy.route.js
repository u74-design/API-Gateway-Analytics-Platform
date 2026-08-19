import express from "express";
import { handleProxyRequest } from "../controllers/proxy.controller.js";

const router = express.Router();

router.all('/:proxyId', handleProxyRequest);
router.all('/:proxyId/*path', handleProxyRequest);

export default router;
