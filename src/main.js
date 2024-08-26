// src/main.js

import { decodeURIComponentToFileStructure } from "./decode.js";
import { transformToAppData } from "./appData.js";
import { compressAppData, decompressAppData } from "./compress.js";

document.addEventListener("DOMContentLoaded", () => {

  const appData = {
    entrypoint: "streamlit_app.py",
    files: {
      "streamlit_app.py": {
        content: {
          $case: "text",
          text: `
import streamlit as st

st.write("Your mon!!!")`,
        },
      },
    },
    requirements: [],
  };

  deco

  console.log("AppData before compression:", appData); // Log AppData before encoding

  // Compress the AppData to a base64url string
  const base64urlString = compressAppData(appData);
  console.log("Base64 URL String:", base64urlString);

  // Decompress the base64url string back to AppData
  const decodedAppData = decompressAppData(base64urlString);
  console.log("Decoded AppData:", decodedAppData);

  // Check if text content is properly restored
  console.log(
    "Decoded text content:",
    decodedAppData.files["streamlit_app.py"].content.text
  );
});
