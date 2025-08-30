import React, { useRef, useState } from 'react'


export default function DropZone({ onFiles }) {
const inputRef = useRef(null)
const [drag, setDrag] = useState(false)


const onDrop = e => {
e.preventDefault(); setDrag(false)
const files = Array.from(e.dataTransfer.files || [])
if (files.length) onFiles(files)
}


return (
<div
className={`dropzone ${drag ? 'drag' : ''}`}
onDragOver={e => { e.preventDefault(); setDrag(true) }}
onDragLeave={() => setDrag(false)}
onDrop={onDrop}
>
<p><strong>Drag & drop</strong> PDFs or images here</p>
<p className="hint">or</p>
<button className="button" onClick={() => inputRef.current?.click()}>Pick files</button>
<input
ref={inputRef}
type="file"
multiple
accept="application/pdf,image/*"
style={{ display: 'none' }}
onChange={e => onFiles(Array.from(e.target.files || []))}
/>
<p className="hint small">Supported: PDF, JPG, PNG, WEBP (OCR). Max ~25MB each (browser memory bound).</p>
</div>
)
}