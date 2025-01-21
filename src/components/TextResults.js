import React from 'react';

const TextResults = ({ text }) => {
  const words = text.split(' '); // Split the extracted text by spaces into words

  // Generate 4 items per row (4 words per row in this example)
  const rows = [];
  for (let i = 0; i < words.length; i += 4) {
    rows.push(words.slice(i, i + 4));
  }

  return (
    <div className="text-results" style={styles.container}>
      <h2 style={styles.heading}>Extracted Text:</h2>
      <div style={styles.grid}>
        {rows.map((row, index) => (
          <div key={index} style={styles.row}>
            {row.map((word, wordIndex) => (
              <span key={wordIndex} style={styles.word}>{word}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '60vw', // 60% of the viewport width
    height: '60vh', // 60% of the viewport height for consistency
    margin: '20px auto', // Center the container
    padding: '20px',
    backgroundColor: '#f0f4f8', // Lighter background for contrast
    borderRadius: '12px', // Rounded corners
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '24px', // Adjusted font size for consistency
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333', // Darker text for better contrast
    fontFamily: "'Roboto', sans-serif", // Clean font
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
    gap: '16px', // Space between items
    padding: '0 20px',
    height: '100%',
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  word: {
    fontSize: '16px', // Consistent font size
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px', // Rounded corners for each word
    textAlign: 'center',
    backgroundColor: '#ffffff', // White background for each word
    color: '#333', // Dark text for better contrast
    fontWeight: '500',
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: '100%', // Ensure the word takes up full space
    minHeight: '50px',
  },
};

export default TextResults;
