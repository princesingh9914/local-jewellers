import crypto from "crypto";
import fs from "fs";
import path from "path";

// Super Admin secure credentials from environment or defaults
const SUPER_ADMIN_PHONE = (process.env.SUPER_ADMIN_PHONE || "5520101791").trim();
const SUPER_ADMIN_PASSWORD = (process.env.SUPER_ADMIN_PASSWORD || "munabhai79").trim();
const SUPER_ADMIN_PIN = (process.env.SUPER_ADMIN_PIN || "0794").trim();

export interface VendorCredential {
  vendorId: string;
  vendorName: string;
  phone: string;
  passwordHash: string; // SHA-256 hash with salt
  pinHash: string;      // SHA-256 hash with salt
  salt: string;
  updatedAt: string;
}

// In-memory active session tokens store
const activeSuperAdminSessions = new Map<string, { createdAt: number; expiresAt: number }>();
const activeVendorSessions = new Map<string, { vendorId: string; vendorName: string; createdAt: number; expiresAt: number }>();

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// File-based secure storage for vendor credentials
const DATA_DIR = path.join(process.cwd(), ".secure_data");
const CREDENTIALS_FILE = path.join(DATA_DIR, "vendor_credentials.json");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("Failed to create secure data dir:", err);
  }
}

function hashValue(val: string, salt: string): string {
  return crypto.createHash("sha256").update(val + salt).digest("hex");
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

function loadVendorCredentials(): VendorCredential[] {
  ensureDataDir();
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const data = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading vendor credentials file:", err);
  }

  // Seed default vendor credentials if file doesn't exist
  const defaultVendors: Array<{ vendorId: string; vendorName: string; phone: string; passwordPlain: string; pinPlain: string }> = [
    {
      vendorId: "vendor_rajwada",
      vendorName: "Rajwada Palace Jewellers",
      phone: "7087033009",
      passwordPlain: "rajwada@password",
      pinPlain: "1234",
    },
    {
      vendorId: "vendor_rajwada",
      vendorName: "Rajwada Palace Jewellers (Alt)",
      phone: "9829012345",
      passwordPlain: "rajwada@password",
      pinPlain: "1234",
    },
    {
      vendorId: "vendor_surya",
      vendorName: "Shree Surya Gold & Diamond",
      phone: "9415012345",
      passwordPlain: "surya@password",
      pinPlain: "2345",
    },
    {
      vendorId: "vendor_meenakshi",
      vendorName: "Meenakshi Solitaires & Polki",
      phone: "9820012345",
      passwordPlain: "meenakshi@password",
      pinPlain: "3456",
    },
  ];

  const seeded: VendorCredential[] = defaultVendors.map((item) => {
    const salt = generateSalt();
    return {
      vendorId: item.vendorId,
      vendorName: item.vendorName,
      phone: item.phone.replace(/\D/g, ""),
      passwordHash: hashValue(item.passwordPlain, salt),
      pinHash: hashValue(item.pinPlain, salt),
      salt,
      updatedAt: new Date().toISOString(),
    };
  });

  saveVendorCredentials(seeded);
  return seeded;
}

function saveVendorCredentials(creds: VendorCredential[]) {
  ensureDataDir();
  try {
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing vendor credentials:", err);
  }
}

// ----------------------------------------------------
// Super Admin Verification (Phone + Password + PIN)
// ----------------------------------------------------
export function verifySuperAdmin(phoneInput?: string, passwordInput?: string, pinInput?: string): { success: boolean; token?: string; error?: string } {
  if (!phoneInput || !passwordInput || !pinInput) {
    return {
      success: false,
      error: "Phone Number, Password, and PIN are all required.",
    };
  }

  const cleanInputPhone = String(phoneInput).replace(/\D/g, "");
  const cleanExpectedPhone = SUPER_ADMIN_PHONE.replace(/\D/g, "");

  const isPhoneMatch = cleanInputPhone === cleanExpectedPhone;
  const isPasswordMatch = String(passwordInput).trim() === SUPER_ADMIN_PASSWORD;
  const isPinMatch = String(pinInput).trim() === SUPER_ADMIN_PIN;

  // Strict Rule: Ek bhi credential incorrect hone par login reject ho!
  if (!isPhoneMatch || !isPasswordMatch || !isPinMatch) {
    return {
      success: false,
      error: "Invalid Super Admin credentials. Phone Number, Password, and PIN must all match exactly.",
    };
  }

  // Generate secure token
  const token = `sa_${crypto.randomBytes(32).toString("hex")}`;
  const now = Date.now();
  activeSuperAdminSessions.set(token, {
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });

  return {
    success: true,
    token,
  };
}

export function verifySuperAdminToken(token?: string): boolean {
  if (!token) return false;
  const session = activeSuperAdminSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSuperAdminSessions.delete(token);
    return false;
  }
  return true;
}

export function revokeSuperAdminToken(token?: string): boolean {
  if (!token) return false;
  return activeSuperAdminSessions.delete(token);
}

// ----------------------------------------------------
// Vendor Verification (Unique Phone + Password + PIN)
// ----------------------------------------------------
export function verifyVendor(phoneInput?: string, passwordInput?: string, pinInput?: string): { 
  success: boolean; 
  token?: string; 
  vendorId?: string; 
  vendorName?: string; 
  error?: string 
} {
  if (!phoneInput || !passwordInput || !pinInput) {
    return {
      success: false,
      error: "Phone Number, Password, and PIN are all required.",
    };
  }

  const cleanInputPhone = String(phoneInput).replace(/\D/g, "");
  const creds = loadVendorCredentials();

  // Find vendor by matching phone number
  const matching = creds.find((c) => c.phone === cleanInputPhone);
  if (!matching) {
    return {
      success: false,
      error: "No registered jeweller found with this Phone Number.",
    };
  }

  // Check password and pin hashes
  const computedPasswordHash = hashValue(String(passwordInput).trim(), matching.salt);
  const computedPinHash = hashValue(String(pinInput).trim(), matching.salt);

  const isPasswordMatch = computedPasswordHash === matching.passwordHash;
  const isPinMatch = computedPinHash === matching.pinHash;

  // Strict Rule: All three must match
  if (!isPasswordMatch || !isPinMatch) {
    return {
      success: false,
      error: "Invalid Vendor Password or PIN. Please check your credentials.",
    };
  }

  const token = `vn_${crypto.randomBytes(32).toString("hex")}`;
  const now = Date.now();
  activeVendorSessions.set(token, {
    vendorId: matching.vendorId,
    vendorName: matching.vendorName,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });

  return {
    success: true,
    token,
    vendorId: matching.vendorId,
    vendorName: matching.vendorName,
  };
}

export function verifyVendorToken(token?: string): { valid: boolean; vendorId?: string; vendorName?: string } {
  if (!token) return { valid: false };
  const session = activeVendorSessions.get(token);
  if (!session) return { valid: false };
  if (Date.now() > session.expiresAt) {
    activeVendorSessions.delete(token);
    return { valid: false };
  }
  return { valid: true, vendorId: session.vendorId, vendorName: session.vendorName };
}

export function revokeVendorToken(token?: string): boolean {
  if (!token) return false;
  return activeVendorSessions.delete(token);
}

// Register or update vendor credentials
export function registerVendorCredentials(
  vendorId: string,
  vendorName: string,
  phone: string,
  passwordPlain: string,
  pinPlain: string
): { success: boolean; error?: string } {
  if (!vendorId || !phone || !passwordPlain || !pinPlain) {
    return { success: false, error: "Missing required vendor credential fields" };
  }

  const cleanPhone = String(phone).replace(/\D/g, "");
  const creds = loadVendorCredentials();
  const salt = generateSalt();

  const newCred: VendorCredential = {
    vendorId,
    vendorName,
    phone: cleanPhone,
    passwordHash: hashValue(passwordPlain.trim(), salt),
    pinHash: hashValue(pinPlain.trim(), salt),
    salt,
    updatedAt: new Date().toISOString(),
  };

  // Remove existing entry for this vendorId or phone
  const filtered = creds.filter((c) => c.vendorId !== vendorId && c.phone !== cleanPhone);
  filtered.push(newCred);
  saveVendorCredentials(filtered);

  return { success: true };
}

// Get public list of registered vendor phones for convenient testing hints
export function getVendorLoginHints(): Array<{ vendorId: string; vendorName: string; phone: string }> {
  const creds = loadVendorCredentials();
  return creds.map((c) => ({
    vendorId: c.vendorId,
    vendorName: c.vendorName,
    phone: c.phone,
  }));
}
