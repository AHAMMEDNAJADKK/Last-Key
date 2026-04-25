import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ── Validate credentials exist ──────────────────────────────────────────────
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("❌ Cloudinary credentials missing in .env");
  throw new Error("Cloudinary configuration missing in .env");
}

// Log config (excluding secret for security)
console.log("--- [DEBUG] CLOUDINARY CONFIG CHECK ---");
console.log(`Cloud Name: [${CLOUDINARY_CLOUD_NAME}] (Length: ${CLOUDINARY_CLOUD_NAME?.length})`);
console.log(`API Key:    [${CLOUDINARY_API_KEY?.substring(0, 4)}...${CLOUDINARY_API_KEY?.slice(-3)}] (Length: ${CLOUDINARY_API_KEY?.length})`);
console.log(`API Secret: [${CLOUDINARY_API_SECRET?.substring(0, 3)}...${CLOUDINARY_API_SECRET?.slice(-3)}] (Length: ${CLOUDINARY_API_SECRET?.length})`);

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME.trim(),
  api_key:    CLOUDINARY_API_KEY.trim(),
  api_secret: CLOUDINARY_API_SECRET.trim(),
  secure:     true,
});

// ── Verify Connection ───────────────────────────────────────────────────────
cloudinary.api.ping()
  .then(() => console.log(`✅ Cloudinary connected successfully [Cloud: ${CLOUDINARY_CLOUD_NAME}]`))
  .catch((err) => {
    console.error("❌ Cloudinary connection failed!");
    console.error("Error Detail:", err.message || err);
    console.log("--- TROUBLESHOOTING ---");
    console.log("1. Check if 'cloud_name', 'api_key', and 'api_secret' are EXACTLY as shown in Cloudinary Dashboard.");
    console.log("2. 403 Forbidden usually means the API Key or Secret is wrong for this Cloud Name.");
    console.log("3. Ensure there are no extra spaces in your .env file.");
  });


export default cloudinary;