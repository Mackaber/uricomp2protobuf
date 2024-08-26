// src/buffer.js

export function u8aToBase64(buf) {
  let str = "";
  const nChunks = Math.ceil(buf.length / 2 ** 16);
  for (let i = 0; i < nChunks; ++i) {
    const offset = 2 ** 16 * i;
    const chunk = buf.slice(offset, offset + 2 ** 16);
    str += String.fromCharCode.apply(null, chunk);
  }
  return window.btoa(str);
}

export function base64ToU8A(base64) {
  const str = window.atob(base64);
  const len = str.length;
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
}
