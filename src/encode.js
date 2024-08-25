// src/encode.js

import * as protobuf from "protobufjs";

// Define the Protobuf schema for AppData
const root = protobuf.Root.fromJSON({
  nested: {
    FileContent: {
      oneofs: {
        content: { oneof: ["data", "text"] },
      },
      fields: {
        data: { type: "bytes", id: 1 },
        text: { type: "string", id: 2 },
      },
    },
    AppData: {
      fields: {
        entrypoint: { type: "string", id: 1 },
        requirements: { rule: "repeated", type: "string", id: 2 },
        files: {
          keyType: "string",
          type: "FileContent",
          id: 3,
        },
      },
    },
  },
});

const AppData = root.lookupType("AppData");

export function encodeAppData(appData) {
  // Verify the payload if needed
  const errMsg = AppData.verify(appData);
  if (errMsg) throw Error(errMsg);

  // Encode a message to an Uint8Array (buffer)
  const message = AppData.create(appData);
  const buffer = AppData.encode(message).finish();
  return buffer;
}

export function base64Encode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
