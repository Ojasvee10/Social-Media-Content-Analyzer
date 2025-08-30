// src/utils/ocr.js
import Tesseract from "tesseract.js";

export const extractTextFromImage = async (file) => {
  try {
    const { data: { text } } = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m), // progress logs
    });
    return text;
  } catch (err) {
    console.error("Error extracting text from image:", err);
    return "Error extracting text from image.";
  }
};
