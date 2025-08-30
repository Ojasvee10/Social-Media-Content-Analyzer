import React from 'react'

function Tag({ level, children }) {
  const cls = level === 'good' ? 'tag good' : level === 'bad' ? 'tag bad' : 'tag warn'
  return <span className={cls}>{children}</span>
}

export default function Suggestions({ result }) {
  if (!result) return null
  const { summary, suggestions } = result
  return (
    <div className="card">
      <div className="card-inner">
        <h3>Engagement Analysis</h3>
        <div className="row" style={{marginBottom:12}}>
          <div className="kpi"><span className="val">{summary.characters}</span><span className="hint">Characters</span></div>
          <div className="kpi"><span className="val">{summary.words}</span><span className="hint">Words</span></div>
          <div className="kpi"><span className="val">{summary.hashtags}</span><span className="hint">Hashtags</span></div>
          <div className="kpi"><span className="val">{summary.mentions}</span><span className="hint">Mentions</span></div>
          <div className="kpi"><span className="val">{summary.urls}</span><span className="hint">Links</span></div>
          <div className="kpi"><span className="val">{summary.avgWordsPerSentence}</span><span className="hint">Avg W/S</span></div>
        </div>

        <ul>
          {suggestions.map((s, i) => (
            <li key={i} style={{margin:'8px 0', display:'flex', alignItems:'center', gap:8}}>
              <Tag level={s.level}>{s.level.toUpperCase()}</Tag>
              <span style={{marginLeft:8}}>{s.msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
