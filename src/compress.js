// src/compress.js

import { AppData } from "./models.js";
import { u8aToBase64, base64ToU8A } from "./buffer.js";

// Conversion between base64 and base64url
function b64ToB64url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ",");
}

function b64urlToB64(base64url) {
  return base64url.replace(/-/g, "+").replace(/_/g, "/").replace(/,/g, "=");
}

export function compressAppData(appData) {
  const encodedProto = AppData.encode(appData).finish();
  const base64 = u8aToBase64(Uint8Array.from(encodedProto));
  return b64ToB64url(base64);
}

export function decompressAppData(base64url) {
  const base64 = b64urlToB64(base64url);
  const buf = base64ToU8A(base64);
  return AppData.decode(buf);
}
