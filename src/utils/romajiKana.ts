/**
 * Helper to convert Romaji to Hiragana for learners who don't have a Japanese IME.
 */
const ROMAJI_MAP: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', n: 'ん',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  // double consonants (sokuon っ)
  kk: 'っk', tt: 'っt', ss: 'っs', pp: 'っp',
  '-': 'ー', '.': '。', ',': '、', '?': '？', '!': '！',
};

export function romajiToHiragana(text: string): string {
  let result = '';
  let i = 0;
  const lower = text.toLowerCase();

  while (i < lower.length) {
    // Check 4-letter combos
    // Check 3-letter combos
    const sub3 = lower.slice(i, i + 3);
    if (ROMAJI_MAP[sub3]) {
      result += ROMAJI_MAP[sub3];
      i += 3;
      continue;
    }

    // Check double consonant (e.g. "kk", "tt")
    if (
      sub3.length >= 2 &&
      sub3[0] === sub3[1] &&
      !['a', 'i', 'u', 'e', 'o', 'n'].includes(sub3[0])
    ) {
      result += 'っ';
      i += 1;
      continue;
    }

    // Check 2-letter combos
    const sub2 = lower.slice(i, i + 2);
    if (ROMAJI_MAP[sub2]) {
      result += ROMAJI_MAP[sub2];
      i += 2;
      continue;
    }

    // Single 'n' before vowel vs consonant
    if (lower[i] === 'n' && i + 1 < lower.length && !['a', 'i', 'u', 'e', 'o', 'y'].includes(lower[i + 1])) {
      result += 'ん';
      i += 1;
      continue;
    }

    // Check 1-letter
    const sub1 = lower.slice(i, i + 1);
    if (ROMAJI_MAP[sub1]) {
      result += ROMAJI_MAP[sub1];
      i += 1;
      continue;
    }

    // Keep character as is (e.g. space or already Japanese)
    result += text[i];
    i += 1;
  }

  return result;
}
