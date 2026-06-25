const SALT = 'trdefi-polymarket-v1';
const ITERATIONS = 100000;

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function sha256(data: Uint8Array): Promise<Uint8Array> {
  const buffer = new ArrayBuffer(data.length);
  const view = new Uint8Array(buffer);
  view.set(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return new Uint8Array(hashBuffer);
}

/**
 * Derive a deterministic wallet address from email
 * Uses SHA-256 with email as key material
 */
export async function deriveAddressFromEmail(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email + SALT);
  const hash = await sha256(data);
  const addressBytes = hash.slice(0, 20);
  return '0x' + bytesToHex(addressBytes);
}

/**
 * Encrypt private key with password using PBKDF2 + AES-GCM
 */
export async function encryptPrivateKey(
  privateKey: string,
  password: string
): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(privateKey)
  );

  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);

  return bytesToHex(result);
}

/**
 * Decrypt private key with password
 */
export async function decryptPrivateKey(
  encryptedHex: string,
  password: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = hexToBytes(encryptedHex);

  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const encrypted = data.slice(28);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Generate a random wallet address (for non-deterministic wallets)
 */
export function generateRandomAddress(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  return '0x' + bytesToHex(bytes);
}
