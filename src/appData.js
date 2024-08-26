// src/appData.js

export function transformToAppData(fileStructure) {
  const filenames = Object.keys(fileStructure);
  if (filenames.length === 0) {
    console.error("File structure is empty.");
    return null;
  }

  const filename = filenames[0];
  const fileContents = fileStructure[filename].contents;

  const appData = {
    entrypoint: filename,
    requirements: [],
    files: {
      [filename]: {
        content: {
          $case: "text",
          text: fileContents, // Ensure text is being properly assigned here
        },
      },
    },
  };

  return appData;
}
