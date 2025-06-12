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
    extended: true
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


app.use(cors({
  origin: ['http://ec2-13-61-184-107.eu-north-1.compute.amazonaws.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))



app.use(express.json({ limit: '500mb' }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.mimetype.substring(0, 5) +
        "--" +
        Date.now() +
        "--" +
        file.originalname
    );
  }
});

const dynamicStorage = (req, file, cb) => {
  if (process.env.NODE_ENV === 'development') {
    return storage._handleFile(req, file, cb);
  } else {
    // For production, use memory storage
    const memoryStorage = multer.memoryStorage();
    return memoryStorage._handleFile(req, file, cb);
  }
};

const acceptedMimetypes = ["image", "audio", "video"];

const upload = multer({
  storage: { _handleFile: dynamicStorage },
  fileFilter: (req, file, cb) => {
    console.log({ mimeType: file.mimetype })
    if (!acceptedMimetypes.includes(file.mimetype.substring(0, 5))) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});


app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (process.env.NODE_ENV === 'development') {
      // For development, return the file info with the correct path
      const fileInfo = {
        ...req.file,
        path: path.join(__dirname, 'public/images', req.file.filename),
        url: `/images/${req.file.filename}`
      };
      return res.status(200).json(fileInfo);
    }

    // Production - S3 upload
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    const mimeType = req.file.mimetype.substring(0,5);
    const key = `uploads/${Date.now()}-${mimeType}.${fileExtension}`;

    const params = {
      Bucket: 'backupstoryblok',
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const data = await s3.upload(params).promise();
    
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
