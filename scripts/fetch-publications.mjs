// Fetches your publications from the Royal Danish Academy research portal (Pure)
// and writes them to publications.js, which the website reads.
// Run automatically by .github/workflows/update-publications.yml — you don't need to touch this.

import { writeFileSync } from 'node:fs';

const FEED = 'https://adk.elsevierpure.com/en/persons/otis-sloan-wood/publications/?format=rss';

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return String(s)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in ENT ? ENT[n.toLowerCase()] : m));
}
const strip = (h) => decode(String(h).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (html, cls) => {
  const m = html.match(new RegExp('<span class="' + cls + '">([\\s\\S]*?)</span>(?!</span>)'));
  if (!m) return '';
  // a double space in Pure's output stands for a lost "&" (e.g. "Cities  Health")
  return decode(m[1].replace(/<[^>]+>/g, '')).trim().replace(/ {2,}/g, ' & ').replace(/\s+/g, ' ');
};

const TYPE_MAP = [
  [/contribution to journal/i, 'Journal article'],
  [/contribution to conference/i, 'Conference'],
  [/thesis/i, 'Thesis'],
  [/book|anthology|chapter/i, 'Book'],
  [/non-textual|exhibition/i, 'Exhibition'],
];

// "Wood, O. S., Knudsen, J. B. & Saleh, F." -> "O. S. Wood, J. B. Knudsen, F. Saleh"
function formatAuthors(raw) {
  const out = [];
  const re = /([^,&]+?),\s*((?:\p{Lu}\p{Ll}?\.\s?-?\s?)+)\s*(\([^)]*\))?/gu;
  let m;
  while ((m = re.exec(raw))) out.push((m[2].trim() + ' ' + m[1].trim()).replace(/\s+/g, ' '));
  return out.length ? out.join(', ') : raw;
}

export function parseRss(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  return items.map((it) => {
    const link = strip((it.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '');
    const html = decode((it.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '');
    const title = strip((html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '').replace(/\.\s*$/, '');
    const afterTitle = html.split('</h3>')[1] || '';
    const authorsRaw = strip(afterTitle.split('<span class="date">')[0]).replace(/,\s*$/, '');
    const date = grab(html, 'date');
    const year = (date.match(/\d{4}/) || [''])[0];
    const journal = grab(html, 'journal').replace(/^In:\s*/, '').replace(/\.\s*$/, '');
    const vol = grab(html, 'volume'), num = grab(html, 'journalnumber'), pages = grab(html, 'pages');
    let venue = journal;
    if (venue && vol) venue += ', ' + vol + (num ? '(' + num + ')' : '');
    if (venue && pages) venue += ', ' + pages.replace(/^p\.\s*/, '').replace('-', '–');
    const parent = strip((html.match(/type_classification_parent">([\s\S]*?)<span class="type_parent_sep/) || [])[1] || '');
    const sub = strip((html.match(/<span class="type_classification">([^<]*)/) || [])[1] || '');
    let type = 'Other';
    for (const [re, t] of TYPE_MAP) if (re.test(parent + ' ' + sub)) { type = t; break; }
    if (!venue && type !== 'Exhibition') {
      // text after the date, e.g. ", Udemy."
      const tail = strip((html.split(/<span class="date">[^<]*<\/span>/)[1] || '').split('<p class="type"')[0])
        .replace(/^[,.\s]+|[,.\s]+$/g, '').replace(/\d+ p\.?$/, '').trim();
      venue = tail && !/^p\.\s*\d/.test(tail) ? tail : '';
    }
    if (!venue && type === 'Conference') {
      venue = /abstract/i.test(sub) ? 'Conference abstract' : /paper/i.test(sub) ? 'Conference paper' : sub;
    }
    return { year, title, authors: formatAuthors(authorsRaw), venue, type, link, award: '' };
  }).filter((p) => p.title);
}

async function main() {
  const all = [], seen = new Set();
  for (let page = 0; page < 10; page++) {
    const url = FEED + (page ? '&page=' + page : '');
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (personal website publication sync)' } });
    if (!res.ok) {
      if (page > 0) break; // no further pages (the portal answers 403 here)
      throw new Error('Portal returned ' + res.status + ' for ' + url);
    }
    const items = parseRss(await res.text());
    const fresh = items.filter((p) => !seen.has(p.link));
    if (!fresh.length) break;
    fresh.forEach((p) => { seen.add(p.link); all.push(p); });
  }
  if (!all.length) throw new Error('No publications found — keeping the old list.');
  all.sort((a, b) => (b.year || '').localeCompare(a.year || ''));
  const js = '// AUTOMATICALLY GENERATED from your research portal profile. Do not edit —\n' +
    '// changes here are overwritten. Add extra items or fixes in content.js instead.\n' +
    '// Last updated: ' + new Date().toISOString().slice(0, 10) + '\n' +
    'window.PORTAL_PUBLICATIONS = ' + JSON.stringify(all, null, 2) + ';\n';
  writeFileSync(new URL('../publications.js', import.meta.url), js);
  console.log('Wrote ' + all.length + ' publications.');
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e.message); process.exit(1); });
