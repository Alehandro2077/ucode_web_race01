import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import Post from "./Post.js";
import router from "./router.js";

const PORT = 6060;
const DB_URL =
  "mongodb+srv://aboba228:ZXC_Igor@cluster0.xerdfq7.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(
      DB_URL,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
