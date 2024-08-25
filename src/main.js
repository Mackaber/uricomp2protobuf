// src/main.js

import { decodeURIComponentToFileStructure } from "./decode.js";
import { transformToAppData } from "./appData.js";
import { encodeAppData, base64Encode } from "./encode.js";

document.addEventListener("DOMContentLoaded", () => {
  const pythonScript = `
import streamlit as st

st.title("Thing!")
  `;

  const encodedUriComponent = encodeURIComponent(
    JSON.stringify({
      "streamlit_app.py": {
        type: "CODE",
        contents: pythonScript,
      },
    })
  );

  console.log("Encoded URI Component:", encodedUriComponent);

  const fileStructure = decodeURIComponentToFileStructure(encodedUriComponent);
  console.log("File Structure:", fileStructure);

  const appData = transformToAppData(fileStructure);
  console.log("AppData:", appData);

  // Encode the AppData to Protobuf
  const encodedProtobuf = encodeAppData(appData);
  console.log("Encoded Protobuf:", encodedProtobuf);

  // Convert the Uint8Array to a base64 string for easier handling
  const base64Protobuf = base64Encode(encodedProtobuf);
  console.log("Base64 Encoded Protobuf:", base64Protobuf);
});
