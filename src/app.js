import express from "express";
//express기반으로 만들겠습니다.
import mongoose from "mongoose";
//데이터베이스는 NoSQL인 mongoDB를 쓸 것이며
//mongoose는 node.js에서 mongoDB를 사용할 수 있게 해주는 라이브러리입니다.
import userRouter from "../src/routes/userRouter.js";
// import passport from "passport";
// import passportConfig from "./passport.js";

const app = express();
//정확히는 모르겠지만 express기반으로 만들겠다는 뜻인것 같습니다.
const port = 3001;
//port는 3001번을 쓸 겁니다.

app.use(express.json());

app.listen(port, () => {
  console.log("Express server has started on port " + port);
});
//app.listen()함수는 지정된 호스트 및 포트에서 연결을
//바인딩하고 수신하는 데 사용됩니다.
//http.Server.listen()메소드와 동일합니다.

//DB연결
try {
  //mongodb://localhost:27017의 how에 우리의 데이터가 저장될것이다.
  mongoose.connect("mongodb://localhost:27017/how", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error); //에러가 발생하면 에러를 보여준다.
  db.once("open", function () {
    //DB에 연결되면
    console.log("Connection to mongod server");
  }); //위 문장이 터미널에 뜬다.
} catch (error) {
  console.log("mongo connect error : ", error);
} //에러를 잡아준다.

app.get("/", (req, res) => {
  //localhost:3001/에 들어가면 Hello World가 뜬다.
  res.send("Hello World");
});
app.use("/api/v1/users", userRouter);
// /api/v1/users 저 요청들은 userRouter로 간다.

// app.use(passport.initialize());
// passportConfig();
