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

  const styles = {
    container: {
      width: '50vw',
      height: '50vh',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: dragging ? '#f0fbff' : '#f9f9f9',
      border: `2px dashed ${dragging ? '#007bff' : '#d1d1d1'}`,
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    text: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: dragging ? '#007bff' : '#555555',
      marginBottom: '15px',
      transition: 'color 0.3s ease',
    },
    icon: {
      fontSize: '48px',
      color: dragging ? '#007bff' : '#999999',
      marginBottom: '20px',
    },
    input: {
      display: 'none',
    },
    browseLabel: {
      padding: '12px 25px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      boxShadow: '0 4px 15px rgba(0, 123, 255, 0.2)',
    },
    browseLabelHover: {
      backgroundColor: '#0056b3',
    },
    browseLabelActive: {
      transform: 'scale(0.95)',
    },
    mediaQueries: {
      '@media (max-width: 768px)': {
        container: {
          width: '85vw',
          height: '40vh',
        },
        text: {
          fontSize: '16px',
        },
        browseLabel: {
          fontSize: '14px',
        },
      },
    },
  };

  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      style={styles.container}
    >
      <i className="fas fa-cloud-upload-alt" style={styles.icon}></i> {/* File upload icon */}
      <p style={styles.text}>
        {dragging ? 'Release your file here' : 'Drag & drop your file here, or click to browse'}
      </p>
      <input
        type="file"
        accept="application/pdf, image/*"
        onChange={handleFilePick}
        id="file-input"
        style={styles.input}
      />
      <label
        htmlFor="file-input"
        style={{
          ...styles.browseLabel,
          ...(dragging ? styles.browseLabelHover : {}),
        }}
        onMouseDown={(e) => (e.target.style.transform = styles.browseLabelActive.transform)}
        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Browse Files
      </label>
    </div>
  );
};

export default FileUploader;
