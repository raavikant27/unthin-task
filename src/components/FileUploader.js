import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleFilePick = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      className={`file-uploader ${dragging ? 'dragging' : ''}`}
      style={styles.container}
    >
      <p style={styles.text}>Drag & drop your file here, or click to browse</p>
      <input
        type="file"
        accept="application/pdf, image/*"
        onChange={handleFilePick}
        id="file-input"
        style={styles.input}
      />
      <label htmlFor="file-input" style={styles.browseLabel}>Browse Files</label>
    </div>
  );
};

const styles = {
  container: {
    width: '60vw', // 60% of the viewport width
    height: '60vh', // 60% of the viewport height for consistency
    margin: '20px auto', // Center the container
    padding: '30px',
    backgroundColor: '#f9f9f9', // Lighter background for contrast
    borderRadius: '12px', // Rounded corners
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  text: {
    fontSize: '16px', // Consistent font size for the text
    fontWeight: '600',
    color: '#555555',
  },
  input: {
    display: 'none',
  },
  browseLabel: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default FileUploader;
