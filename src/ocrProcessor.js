import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

// Set the workerSrc to the correct path. This uses the PDF.js worker bundled with pdfjs-dist.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`; // Ensure this points to the correct worker

export const extractTextFromPDF = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (e) => {
      const arrayBuffer = e.target.result;

      try {
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let text = '';

        // Loop through all pages of the PDF and extract text
        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n\n';
        }

        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsArrayBuffer(file);
  });
};

export const processImageOCR = (file) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m), // Optional: log progress
      }
    ).then(({ data: { text } }) => {
      resolve(text);
    }).catch((error) => {
      reject(error);
    });
  });
};
