import './App.css';
import React, { useState } from 'react'
import uploadFile from './upload-service';


function App() {
  let [form, setForm] = useState({});

  const changeFile = (e) => {
    setForm({ ...form, file: e.target.files[0] })
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (form.owner && form.repo && form.token && form.file) {
      if (form.file.type !== 'application/zip') {
        alert("Only .zip file is supported");
        return;
      }
      const formData = new FormData();
      formData.append('owner', form.owner);
      formData.append('repo', form.repo);
      formData.append('token',form.token);
      formData.append('file',form.file);
      uploadFile('',formData)
      
    } else {
      alert("All Fields are mendatory!");
    }
  }
  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <div className='form-control'>
          <label htmlFor="owner"> Owner (username)</label>
          <input type="text" name='owner'
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })} />
        </div>
        <div className='form-control'>
          <label htmlFor="repo"> Repo name (repo)</label>
          <input type="text" name='repo'
            value={form.repo}
            onChange={(e) => setForm({ ...form, repo: e.target.value })} />
        </div>
        <div className='form-control'>
          <label htmlFor="token"> Github Token </label>
          <input type="text" name='token'
            value={form.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
          />
        </div>
        <div className='form-control'>
          <label htmlFor="file"> Select file  </label>
          <input id="file" type="file" name='zip folder'
            onChange={(e) => changeFile(e)} />
        </div>
        <div>
          <button type='submit'>Submit </button>
        </div>
      </form>
    </div>
  );
}

export default App;
