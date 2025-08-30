// Lightweight engagement analyzer using heuristics

const CTA_WORDS = [
  'follow','share','comment','like','subscribe','retweet','dm','save','join',
  'learn more','sign up','register','buy','shop','download','try','watch'
]

const POSITIVE = new Set(['great','amazing','love','excited','win','happy','growth','boost','best','wow','super','thank'])
const NEGATIVE = new Set(['bad','hate','angry','slow','bug','issue','problem','worst','fail'])

/**
 * Analyze raw text and return summary + suggestions
 */
export function analyzeText(raw) {
  const text = (raw || '').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(/\s+/) : []
  const sentences = text ? text.split(/[.!?]+\s/).filter(Boolean) : []
  const hashtags = (text.match(/#[\p{L}\d_]+/gu) || []).length
  const mentions = (text.match(/@[A-Za-z0-9_.-]+/g) || []).length
  const urls = (text.match(/https?:\/\/\S+/g) || []).length
  const emojis = (text.match(/[\p{Emoji}\u263a-\u2764\u2600-\u26FF]/gu) || []).length
  const avgWordsPerSentence = sentences.length ? (words.length / sentences.length) : (words.length || 0)

  // sentiment proxy
  let sentiment = 0
  for (const w of words.map(w => w.toLowerCase().replace(/[^\p{L}\d]/gu, ''))) {
    if (POSITIVE.has(w)) sentiment += 1
    if (NEGATIVE.has(w)) sentiment -= 1
  }

  const hasCTA = CTA_WORDS.some(kw => text.toLowerCase().includes(kw))

  const summary = {
    characters: text.length,
    words: words.length,
    sentences: sentences.length || (text ? 1 : 0),
    hashtags,
    mentions,
    urls,
    emojis,
    avgWordsPerSentence: Number(avgWordsPerSentence.toFixed(1)),
    sentiment
  }

  const suggestions = []

  if (summary.characters > 280) {
    suggestions.push({ level: 'warn', msg: 'Your copy is long. Aim for 70–150 chars for short posts, or ~138–150 for strong LinkedIn hooks.' })
  } else if (summary.characters > 0 && summary.characters < 40) {
    suggestions.push({ level: 'warn', msg: 'Very short. Add context or a hook to increase engagement.' })
  }

  if (hashtags === 0) suggestions.push({ level: 'good', msg: 'Add 1–3 relevant hashtags to improve reach.' })
  if (mentions === 0) suggestions.push({ level: 'good', msg: 'Mention collaborators or brands to encourage reshares.' })
  if (!hasCTA && summary.words > 3) suggestions.push({ level: 'good', msg: 'Include a clear call-to-action (e.g., “Comment your thoughts”).' })
  if (emojis === 0 && summary.words > 8) suggestions.push({ level: 'good', msg: 'A tasteful emoji can increase skim-ability (avoid overuse).' })
  if (urls > 1) suggestions.push({ level: 'warn', msg: 'Too many links can reduce click-through. Keep one primary link.' })
  if (summary.avgWordsPerSentence > 25) suggestions.push({ level: 'bad', msg: 'Sentences are long. Break into shorter lines for mobile readability.' })
  if (summary.sentiment < 0) suggestions.push({ level: 'warn', msg: 'Tone reads negative. Reframe to benefits or learnings if appropriate.' })

  if (text.length === 0) {
    suggestions.push({ level: 'warn', msg: 'No text extracted. If your PDF is scanned, upload an image or ensure OCR is enabled.' })
  }

  return { summary, suggestions }
}
