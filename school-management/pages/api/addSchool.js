import fs from "fs";
import path from "path";
import multer from "multer";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../lib/mongodb";   // ✅ FIXED PATH

// Ensure target folder exists
const imagesDir = path.join(process.cwd(), "public", "schoolImages");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${unique}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;

  // Basic server-side validations
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_id)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const file = req.file;
  let imagePath = "";

  if (file) {
    imagePath = `/schoolImages/${file.filename}`;
  }

  const { db } = await connectToDatabase();
  await db.collection("schools").insertOne({
    name,
    address,
    city,
    state,
    contact,
    email_id,
    image: imagePath,
    createdAt: new Date(),
  });

  return res.status(200).json({ message: "School added successfully" });
});

export const config = {
  api: {
    bodyParser: false, // Required for multer
  },
};

export default apiRoute;
