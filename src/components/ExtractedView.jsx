export default function ExtractedView({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="extracted-view">
      <h2>Extracted Content</h2>
      {items.map((item, idx) => (
        <div key={idx} className="file-block">
          <h3>{item.name}</h3>
          <pre className="file-text">{item.text || "No text found"}</pre>
        </div>
      ))}
    </div>
  );
}
