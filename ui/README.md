# You can update your code to Git using git token 

This project is build for pushing your chanegs to your repo.
you can upload zip file form ui
as of now older code needs to be removed from repo and than upload new zip file which will replace older code.

## HOW to use
call like this 

const uploadFile = async () => {
    let formData = {
        owner:'you github user',
        repo:'github repo name',
        token :'github token with write access', 
        commitMessage:'any message for commit',// optional
        email:"email id of user" // optional,
        files "" // zip file uploaded from from
    }
    try {
        const headers = {
            'content-type': 'multipart/form-data'
        };
        let response = await axios.post("https://commit-to-github.onrender.com/upload", formData, { headers });
        return response ? response.data : null;
    } catch (e) {
        console.log('error');
    } 
}

