import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import FileUploader from "./components/FileUploader"; // Corrected the path

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
    <div className="App">
      <h1>Document Upload & Text Extraction</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {fileName && <h2>Selected File: {fileName}</h2>}

      {loading ? (
        <p>Extracting text...</p>
      ) : (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
