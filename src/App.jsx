import React, { useState } from "react";
import DropZone from "./components/DropZone";
import ExtractedView from "./components/ExtractedView";
import Suggestions from "./components/Suggestions";

// ✅ correct paths
import { extractTextFromPDF } from "./lib/pdf";
import { extractTextFromImage } from "./lib/ocr";
import { analyzeText } from "./lib/analyze";

export default function App() {
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);

  const handleFiles = async (files) => {
    let texts = [];

    for (const file of files) {
      if (file.type === "application/pdf") {
        const text = await extractTextFromPDF(file);
        texts.push({ name: file.name, text });
      } else if (file.type.startsWith("image/")) {
        const text = await extractTextFromImage(file);
        texts.push({ name: file.name, text });
      }
    }

    setItems(texts);

    if (texts.length) {
      // ✅ use your real analyzer here
      setResult(analyzeText(texts.map((t) => t.text).join("\n")));
    }
  };

  return (
    <div className="app">
      <h1>Social Media Content Analyzer</h1>
      <DropZone onFiles={handleFiles} />
      <ExtractedView items={items} />
      <Suggestions result={result} />
    </div>
  );
}
