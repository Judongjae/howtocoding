import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";

export const signup = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const re_userEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const re_userPassword = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/;

  if (userEmail.search(re_userEmail) == -1) {
    return res.status(400).send({
      errorMessage: "이메일의 형식이 일치하지 않습니다.",
    });
  } else if (userPassword.search(re_userPassword) == -1) {
    return res.status(400).send({
      errorMessage: "비밀번호의 형식이 일치하지 않습니다.",
    });
  }
  try {
    const isemailExisting = await User.find({ userEmail }); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
    if (isemailExisting.length) {
      //둘중 하나라도 존재하면 1이상의 값이 나오므로 true로 처리해서 아래 값을 return
      return res.status(400).send({
        result: "failure",
        msg: "이미 가입한 이메일이 있습니다.",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 5);
    const newUser = {
      userEmail,
      userPassword: hashedPassword,
    };
    await User.create(newUser);
    return res
      .status(200)
      .send({ result: "success", msg: "회원가입에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
};
//
