

let endPoint = " /repos/joshirakesh165/Music/contents/";
import { Octokit } from "octokit";


const generatePayload = (owner, repo, path, commitMsg, email, content) => {
    return {
        owner: owner,
        repo: repo,
        path: path,
        message: commitMsg || 'Code pushed from Api',
        committer: {
            name: owner,
            email: email || 'testing@gmail.com'
        },
        content: content,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }

}

const postData = async (owner, repo, token, path, commitMsg, email, content) => {
    try {
        const octokit = new Octokit({ auth: token });
        let payload = generatePayload(owner, repo, path, commitMsg, email, content)
        let finalPath = 'PUT' + endPoint + path;
        let result = await octokit.request(finalPath, payload);
        return  result;
    } catch (err) {
        return err;;
    }
}


const pushLocalChanges = async(owner, repo, token, commitMessage, email, files) => {
    let results = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let filePath = file.name.split("temp/")[1];
        let result =  await postData(owner, repo, token, filePath, commitMessage, email, file.content);

        if(result instanceof Error) {
            return 'Not able to upload files';
        }
        results.push(result);
        if (results.length == files.length) {
            console.log('result', results.length)
            return "Code uploaded succsefully";
        }
    }
}


export default pushLocalChanges;
