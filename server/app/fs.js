import fs from 'fs';
import AdmZip from "adm-zip"

const filesToSkip = ["node", "node_modules", ".git", "package-lock.json", ".DS_Store", "__MACOSX","._.DS_Store", ".zip"];


const createFodler =  () => {
  console.log('creating folder');
  deleteFolder("./temp");

  const folderName = './temp';
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log('created folder')

    }
  } catch (err) {
    console.error(err);
  }
}

const extractFolder = (path) => {
  console.log('extracting folder')
  var zip = new AdmZip(path);
  zip.extractAllTo("./temp");
  let dir = './temp';
  let files = getFiles(dir);
  return files;
}

const deleteFolder = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true }, err => {
    if (err) {
      throw err;
    }
    console.log(`${dir} is deleted!`);
  });
}
const extractFolderAndGetData = (path) => {
  deleteFolder("./temp");
  createFodler();
  let files = extractFolder(path);
  console.log('file after extract going to delete now...',files.length);
  deleteFolder("./temp");
  return files;
}

// Recursive function to get files
function getFiles(dir, files = []) {

  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;

    let nameChars = name.split("/");
    let fileName = nameChars[nameChars.length - 1];

    if ((!fileName.includes('.zip')) && (!fileName.includes('__MACOSX')) && (!filesToSkip.includes(fileName))) {
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files)
      } else {
        files.push({ name: name, content: fs.readFileSync(name, { 'encoding': 'base64' }) })
      }
    }
  }

  return files;
}

export default extractFolderAndGetData;