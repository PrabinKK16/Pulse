import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toString(),
  });
});

export default router;
