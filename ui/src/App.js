import './App.css';
import React, { useState } from 'react'
import uploadFile from './upload-service';
import UploadForm from './UploadForm/UploadForm';


function App() {
  return (
    <>
      <header className='header'>
        <img src="https://rakeshj.netlify.app/assets/github.png" height={50} alt="Github logo" />
        <div className='heading'>
          <h3>Upload files to Github</h3>
          <p>( Push code directly to github using github token and zip folder )</p>
        </div>
      </header>
      <UploadForm />
    </>

  );
}

export default App;
