import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import formidable from 'express-formidable'
import extractFolderAndGetData from './fs.js';
import pushLocalChanges from './githubAPI.js';

var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));

const SERVICE_PORT = process.env.SERVICE_PORT || 8000

app.use(bodyParser.json());
app.use(formidable())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/upload', async function (req, res) {
    let { owner, repo, token, commitMessage, email } = req.fields;
    let files = extractFolderAndGetData(req.files.file.path);
    let message = await pushLocalChanges(owner, repo, token, commitMessage, email, files);
    res.status(message);
});



app.listen(SERVICE_PORT, () => {
    console.log('server running on ', SERVICE_PORT)
});



