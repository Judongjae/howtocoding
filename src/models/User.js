import mongoose from "mongoose";
//mongoDB를 사용합니다.
const { Schema } = mongoose;
//mongoDB의 스키마를 사용합니다. 스키마를 정의합니다.
const userSchema = new Schema({
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
});
//위 모양으로 저장합니다.
const User = mongoose.model("User", userSchema);
//User는 mongoDB의 모델입니다.
export default User;
//User 모델을 내보냅니다. 이로써 다른 파일에서 사용할 수 있습니다.
