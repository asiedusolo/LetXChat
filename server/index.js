const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
const chatRoomRouter = require("./routes/chatRooms");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const multer = require("multer");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const acceptedMimetypes = ["image", "audio", "video"];

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!acceptedMimetypes.includes(file.mimetype.substring(0, 5))) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  }
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req.file);
    return res.status(200).json(req.file);
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chatRooms", chatRoomRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connection established");
    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
