import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import FileUploader from "./components/FileUploader"; // Assuming the correct path

// Set the worker for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const App = () => {
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle file upload
  const handleFileUpload = (file) => {
    setFileName(file.name);
    setExtractedText(""); // Clear previous text extraction
    if (file.type === "application/pdf") {
      extractTextFromPDF(file);
    } else if (file.type.startsWith("image")) {
      extractTextFromImage(file);
    }
  };

  // Function to extract text from PDF
  const extractTextFromPDF = async (file) => {
    setLoading(true);
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdfDocument = await pdfjsLib.getDocument(pdfData).promise;
        let fullText = "";
        const numPages = pdfDocument.numPages;

        // Extract text page by page and concatenate
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(" ");
          fullText += pageText + "\n";
        }

        setExtractedText(fullText);
        setLoading(false);
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setLoading(false);
    }
  };

  // Function to extract text from image using Tesseract.js
  const extractTextFromImage = (file) => {
    setLoading(true);
    Tesseract.recognize(
      file,
      "eng",
      { logger: (m) => console.log(m) } // Logging progress
    )
      .then(({ data: { text } }) => {
        setExtractedText(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("OCR Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>Document Upload & Text Extraction</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {fileName && <h2 style={styles.fileName}>Selected File: {fileName}</h2>}

      {loading ? (
        <p style={styles.loadingText}>Extracting text...</p>
      ) : (
        extractedText && (
          <div style={styles.textContainer}>
            <h3>Extracted Text:</h3>
            <pre style={styles.extractedText}>{extractedText}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default App;

// Basic styles for better UI
const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
  },
  fileName: {
    fontSize: '20px',
    color: '#555',
    margin: '15px 0',
  },
  loadingText: {
    fontSize: '18px',
    color: '#007bff',
    marginTop: '20px',
  },
  textContainer: {
    marginTop: '30px',
    textAlign: 'left',
    padding: '15px',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxHeight: '400px',
    overflowY: 'auto', // Enable scrolling for large content
  },
  extractedText: {
    whiteSpace: 'pre-wrap', // Ensures line breaks and spaces are preserved
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.5',
    overflowWrap: 'break-word',
  },
};
