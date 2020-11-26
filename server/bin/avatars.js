const fs = require('fs').promises;
const path = require('path');

/* https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j */

async function walk(dir) {
  let files = await fs.readdir(dir);
  files = await Promise.all(files.map(async (file) => {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) return walk(filePath);
    if (stats.isFile()) return filePath;
  }));

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

module.exports = { walk };
