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

export const AppData = root.lookupType("AppData");

export function encodeAppData(appData) {
  // Verify the payload to ensure it adheres to the schema
  const errMsg = AppData.verify(appData);
  if (errMsg) throw Error(errMsg);

  // Create and encode the message to an Uint8Array (buffer)
  const message = AppData.create(appData);
  console.log("Message before encoding:", message); // Add a log to check the message before encoding
  const buffer = AppData.encode(message).finish();
  return buffer;
}

export function decodeAppData(buffer) {
  // Decode the buffer back into an AppData object
  const message = AppData.decode(buffer);
  console.log("Message after decoding:", message); // Add a log to check the message after decoding
  // Convert the message to a plain JavaScript object with default settings
  return AppData.toObject(message, {
    longs: String,
    enums: String,
    bytes: String, // Keep bytes as strings for simplicity
  });
}
