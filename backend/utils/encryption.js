import CryptoJS from "crypto-js";

// ✅ Read key INSIDE functions — never at module load time.
//    If read at the top level, dotenv may not have run yet → SECRET_KEY = undefined → encrypt crashes.

const getKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }
  return key;
};

// 🔐 ENCRYPT
export const encrypt = (text) => {
  if (!text) return "";
  return CryptoJS.AES.encrypt(String(text), getKey()).toString();
};

// 🔓 DECRYPT
export const decrypt = (cipher) => {
  if (!cipher) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, getKey());
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "[decryption failed]";
  }
};