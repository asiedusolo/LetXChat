const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
const chatRoomRouter = require("./routes/chatRooms");
const fs = require('fs')
const AWS = require('aws-sdk')

require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const multer = require("multer");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1'
})


app.use(
  express.urlencoded({
    limit: '500mb',
    extended: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
const publicPath = path.join(__dirname, "public/images")
app.use("/images", express.static(publicPath));

if(!fs.existsSync(publicPath)){
  fs.mkdirSync(publicPath, { recursive: true });
  console.log('File structure exists!!!!')
}

console.log({origin: process.env.CORS_ORIGIN})

// // Debugging middleware
// app.use((req, res, next) => {
//   console.log('Incoming request:', {
//     method: req.method,
//     path: req.path,
//     origin: req.headers.origin
//   });
//   next();
// });

// // Enhanced CORS configuration
// const corsOptions = {
//   origin: [
//     'http://ec2-13-61-184-107.eu-north-1.compute.amazonaws.com',
//     'http://localhost:3000'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };


app.use(cors({
  origin: 'http://ec2-13-61-184-107.eu-north-1.compute.amazonaws.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Explicit OPTIONS handler
// app.options('*', cors(corsOptions));


app.use(express.json({ limit: '500mb' }));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.mimetype.substring(0, 5) +
//         "--" +
//         Date.now() +
//         "--" +
//         file.originalname
//     );
//   }
// });

const acceptedMimetypes = ["image", "audio", "video"];

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!acceptedMimetypes.includes(file.mimetype.substring(0, 5))) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json(req.file);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileExtension = req.file.originalname.split('.').pop();
    const key = `uploads/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    const params = {
      Bucket: 'backupstoryblok',
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const data = await s3.upload(params).promise();
    
    // Return public URL and key for database storage
    res.status(200).json({
      url: data.Location,
      key: data.Key,
      filename: req.file.originalname
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
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
