// src/appData.js

export function transformToAppData(fileStructure) {
  // Extract the filename (assuming there's only one file for simplicity)
  const filenames = Object.keys(fileStructure);
  if (filenames.length === 0) {
    console.error("File structure is empty.");
    return null;
  }

  const filename = filenames[0];
  const fileContents = fileStructure[filename].contents;

  // Create the AppData object with the correct structure
  const appData = {
    entrypoint: filename,
    requirements: [],
    files: {
      [filename]: {
        content: {
          $case: "data",
          data: new TextEncoder().encode(fileContents), // Encode the file contents into a Uint8Array
        },
      },
    },
  };

  return appData;
}
