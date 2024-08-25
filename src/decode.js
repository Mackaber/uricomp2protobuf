// src/decode.js

export function decodeURIComponentToFileStructure(uriComponent) {
  // Step 1: Decode the URI component
  const decodedString = decodeURIComponent(uriComponent);

  // Step 2: Parse the JSON string into an object
  let parsedObject;
  try {
    parsedObject = JSON.parse(decodedString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }

  // Step 3: Transform the object into the file structure
  const fileStructure = {};
  for (const filename in parsedObject) {
    const fileData = parsedObject[filename];
    fileStructure[filename] = {
      contents: fileData.contents,
    };
  }

  return fileStructure;
}
