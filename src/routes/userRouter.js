import express from "express";
//express를 사용합니다.
import { signup } from "../controllers/userController.js";
//controller.js의 signup을 사용합니다.
const userRouter = express.Router();
//userRouter를 express.Router로 정의합니다.
userRouter.post("/signup", signup);
//signup은 post입니다.
export default userRouter;
//userRouter를 보냅니다.
//app.js에서 사용하기 위함입니다.
