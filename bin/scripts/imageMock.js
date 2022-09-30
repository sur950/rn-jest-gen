const { promises: Fs } = require("fs");
const fsPromises = require("fs/promises");
const Path = require("path");

async function exists(path) {
  try {
    await Fs.access(path);
    return true;
  } catch {
    return false;
  }
}

const addImageMockFile = async (dirPath) => {
  const configPath = Path.join(`${dirPath}/__mocks__`, "/ImageMock.js");

  await Fs.mkdir(Path.join(dirPath, "/__mocks__"), { recursive: true });
  await Fs.writeFile(configPath, "")
    .then(async (_) => {
      try {
        await fsPromises
          .appendFile(
            configPath,
            `export default '';
             // module.exports = 'SvgMock';
             // module.exports.ReactComponent = 'SvgMock';
            `,
            "utf-8"
          )
          .then((_) => {
            console.log("🚀 Added Image Mock File");
          });
      } catch (err) {
        console.log("Error appending data to file", err);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
};

const checkMockExists = async (dirPath) => {
  const configPath = await Path.join(dirPath, "/__mocks__/ImageMock.js");
  const configExistsRes = await exists(configPath);

  if (!configExistsRes) {
    try {
      await addImageMockFile(dirPath);
    } catch (err) {
      console.log("error", err);
    }
  } else {
    console.log("📝 ImageMock.js already exists");
  }
};

module.exports = { checkMockExists };
