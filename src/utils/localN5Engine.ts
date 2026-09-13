import { EvaluationResult, EvaluationStatus } from '../types';
import { N5_TOPICS, getDiversePromptForTopic, ALL_THEMES_ID } from '../data/n5curriculum';

export interface N5Scenario {
  id?: string;
  topicId: string;
  promptPatterns: string[];
  canonicalKanji: string;
  canonicalKana: string;
  canonicalRomaji: string;
  italianTranslation: string;
  expectedParticles: string[];
  expectedVerbForms: string[];
  isQuestion: boolean;
  isInanimateExistence?: boolean;
  isAnimateExistence?: boolean;
  keyWords: { word: string; kana: string; kanji?: string }[];
  commonMistakes?: { trigger: RegExp; explanation: string }[];
  grammarFocus: string;
  nextExercises: string[];
}

export const N5_DATABASE: N5Scenario[] = [
  // 1. PRESENTARSI E CONOSCERSI
  {
    topicId: 'presentarsi',
    promptPatterns: ['piacere di conoscerti', 'mi chiamo mario', 'sono uno studente'],
    canonicalKanji: '初めまして。マリオです。学生です。',
    canonicalKana: 'はじめまして。まりおです。がくせいです。',
    canonicalRomaji: 'Hajimemashite. Mario desu. Gakusei desu.',
    italianTranslation: 'Piacere di conoscerti. Sono Mario. Sono uno studente.',
    expectedParticles: [],
    expectedVerbForms: ['です'],
    isQuestion: false,
    keyWords: [
      { word: 'hajimemashite', kana: 'はじめまして', kanji: '初めまして' },
      { word: 'gakusei', kana: 'がくせい', kanji: '学生' },
      { word: 'desu', kana: 'です' },
    ],
    grammarFocus: 'Formule di saluto 初めまして e copula です',
    nextExercises: [
      'Di dove sei?',
      'Vieni dall\'Italia?',
      'Quanti anni hai?',
      'Qual è il tuo lavoro?'
    ]
  },
  {
    topicId: 'presentarsi',
    promptPatterns: ['di dove sei', 'da dove vieni'],
    canonicalKanji: '出身はどこですか。（どちらですか）',
    canonicalKana: 'しゅっしんはどこですか。',
    canonicalRomaji: 'Shusshin wa doko desu ka?',
    italianTranslation: 'Di dove sei?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'shusshin', kana: 'しゅっしん', kanji: '出身' },
      { word: 'doko', kana: 'どこ' },
    ],
    grammarFocus: 'Pronome interrogativo どこ e tema con は',
    nextExercises: [
      'Vengo dall\'Italia. Sono italiano.',
      'Il signor Tanaka è un impiegato?',
      'Abito a Roma adesso.'
    ]
  },
  {
    topicId: 'presentarsi',
    promptPatterns: ['vengo dall\'italia', 'sono italiano', 'italia'],
    canonicalKanji: 'イタリアから来ました。イタリア人です。',
    canonicalKana: 'いたりあからきました。いたりあじんです。',
    canonicalRomaji: 'Itaria kara kimashita. Itariajin desu.',
    italianTranslation: 'Vengo dall\'Italia. Sono italiano.',
    expectedParticles: ['から'],
    expectedVerbForms: ['来ました', 'きました', 'です'],
    isQuestion: false,
    keyWords: [
      { word: 'itaria', kana: 'イタリア' },
      { word: 'kara', kana: 'から' },
      { word: 'kimashita', kana: 'きました', kanji: '来ました' },
      { word: 'jin', kana: 'じん', kanji: '人' },
    ],
    grammarFocus: 'Particella から (provenienza) e suffisso 人 (nazionalità)',
    nextExercises: [
      'Il signor Tanaka è un impiegato?',
      'Quanti anni hai?',
      'Studi la lingua giapponese?'
    ]
  },
  {
    topicId: 'presentarsi',
    promptPatterns: ['non sono un medico', 'sono un insegnante'],
    canonicalKanji: 'いいえ、医者じゃありません。先生です。',
    canonicalKana: 'いいえ、いしゃじゃありません。せんせいです。',
    canonicalRomaji: 'Iie, isha ja arimasen. Sensei desu.',
    italianTranslation: 'No, non sono un medico, sono un insegnante.',
    expectedParticles: [],
    expectedVerbForms: ['じゃありません', 'ではありません', 'です'],
    isQuestion: false,
    keyWords: [
      { word: 'isha', kana: 'いしゃ', kanji: '医者' },
      { word: 'sensei', kana: 'せんせい', kanji: '先生' },
    ],
    grammarFocus: 'Negazione della copula con 〜じゃありません',
    nextExercises: [
      'Quanti anni hai?',
      'A che ora ti svegli ogni mattina?',
      'Cosa ti piace mangiare?'
    ]
  },
  {
    topicId: 'presentarsi',
    promptPatterns: ['quanti anni hai', 'età'],
    canonicalKanji: '何歳ですか。（おいくつですか）',
    canonicalKana: 'なんさいですか。',
    canonicalRomaji: 'Nansai desu ka?',
    italianTranslation: 'Quanti anni hai?',
    expectedParticles: ['か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'nansai', kana: 'なんさい', kanji: '何歳' },
      { word: 'oikutsu', kana: 'おいくつ' },
    ],
    grammarFocus: 'Contatore dell\'età 歳 (sai) e domanda 何歳ですか',
    nextExercises: [
      'A che ora ti svegli ogni mattina?',
      'Cosa fai di solito durante il fine settimana?'
    ]
  },

  // 2. ROUTINE QUOTIDIANA E ORARI
  {
    topicId: 'routine',
    promptPatterns: ['svegli ogni mattina', 'a che ora ti svegli', 'ora ti svegli'],
    canonicalKanji: '毎朝何時に起きますか。',
    canonicalKana: 'まいあさなんじにおきますか。',
    canonicalRomaji: 'Maiasa nanji ni okimasu ka?',
    italianTranslation: 'A che ora ti svegli ogni mattina?',
    expectedParticles: ['に', 'か'],
    expectedVerbForms: ['起きますか', 'おきますか'],
    isQuestion: true,
    keyWords: [
      { word: 'maiasa', kana: 'まいあさ', kanji: '毎朝' },
      { word: 'nanji', kana: 'なんじ', kanji: '何時' },
      { word: 'okimasu', kana: 'おきます', kanji: '起きます' },
    ],
    commonMistakes: [
      {
        trigger: /で/,
        explanation: '❌ Per indicare un orario preciso serve la particella に (es. 何時に), non で.',
      },
    ],
    grammarFocus: 'Particella に per orari determinati e forma interrogativa 〜ますか',
    nextExercises: [
      'Ogni mattina mi sveglio alle sette.',
      'Fai colazione a casa verso le sette e mezza?',
      'A che ora vai a dormire la sera?'
    ]
  },
  {
    topicId: 'routine',
    promptPatterns: ['sveglio alle sette', 'sette della mattina'],
    canonicalKanji: '毎朝七時に起きます。',
    canonicalKana: 'まいあさしちじにおきます。',
    canonicalRomaji: 'Maiasa shichiji ni okimasu.',
    italianTranslation: 'Ogni mattina mi sveglio alle sette.',
    expectedParticles: ['に'],
    expectedVerbForms: ['起きます', 'おきます'],
    isQuestion: false,
    keyWords: [
      { word: 'shichiji', kana: 'しちじ', kanji: '七時' },
      { word: 'okimasu', kana: 'おきます', kanji: '起きます' },
    ],
    grammarFocus: 'Orari precisi con に (七時に) e verbo 起きます',
    nextExercises: [
      'Fai colazione a casa verso le sette e mezza?',
      'Bevo il caffè e mangio il pane.',
      'A che ora esci di casa la mattina?'
    ]
  },
  {
    topicId: 'routine',
    promptPatterns: ['colazione a casa', 'sette e mezza'],
    canonicalKanji: '七時半ごろ、家で朝ご飯を食べますか。',
    canonicalKana: 'しちじはんごろ、いえであさごはんをたべますか。',
    canonicalRomaji: 'Shichijihan goro, ie de asagohan o tabemasu ka?',
    italianTranslation: 'Fai colazione a casa verso le sette e mezza?',
    expectedParticles: ['で', 'を'],
    expectedVerbForms: ['食べます', 'たべます'],
    isQuestion: true,
    keyWords: [
      { word: 'shichijihan', kana: 'しちじはん', kanji: '七時半' },
      { word: 'ie', kana: 'いえ', kanji: '家' },
      { word: 'asagohan', kana: 'あさごはん', kanji: '朝ご飯' },
      { word: 'tabemasu', kana: 'たべます', kanji: '食べます' },
    ],
    commonMistakes: [
      {
        trigger: /に.*(食べ|たべ)/,
        explanation: '❌ Il luogo in cui si svolge un\'azione (mangiare a casa) richiede で, non に.',
      },
    ],
    grammarFocus: 'Particella で per luogo d\'azione e を per il complemento oggetto',
    nextExercises: [
      'Bevo il caffè e mangio il pane.',
      'A che ora vai a dormire la sera?',
      'Come vai all\'università ogni mattina?'
    ]
  },
  {
    topicId: 'routine',
    promptPatterns: ['bevo il caffè e mangio il pane', 'caffè e pane'],
    canonicalKanji: 'コーヒーを飲んで、パンを食べます。',
    canonicalKana: 'こーひーをのんで、ぱんをたべます。',
    canonicalRomaji: 'Koohii o nonde, pan o tabemasu.',
    italianTranslation: 'Bevo il caffè e mangio il pane.',
    expectedParticles: ['を'],
    expectedVerbForms: ['飲みます', 'のみます', '飲んで', 'のんで', '食べます', 'たべます'],
    isQuestion: false,
    keyWords: [
      { word: 'koohii', kana: 'コーヒー' },
      { word: 'nomimasu', kana: 'のみます', kanji: '飲みます' },
      { word: 'pan', kana: 'パン' },
      { word: 'tabemasu', kana: 'たべます', kanji: '食べます' },
    ],
    grammarFocus: 'Coordinazione o forma 〜て (飲んで) con oggetto を',
    nextExercises: [
      'A che ora vai a dormire la sera?',
      'Di solito esco di casa alle otto.'
    ]
  },
  {
    topicId: 'routine',
    promptPatterns: ['dormire la sera', 'a che ora vai a dormire', 'vai a dormire'],
    canonicalKanji: '毎晩何時に寝ますか。',
    canonicalKana: 'まいばんなんじにねますか。',
    canonicalRomaji: 'Maiban nanji ni nemasu ka?',
    italianTranslation: 'A che ora vai a dormire la sera?',
    expectedParticles: ['に', 'か'],
    expectedVerbForms: ['寝ますか', 'ねますか'],
    isQuestion: true,
    keyWords: [
      { word: 'maiban', kana: 'まいばん', kanji: '毎晩' },
      { word: 'nemasu', kana: 'ねます', kanji: '寝ます' },
    ],
    grammarFocus: 'Verbo 寝ます (dormire) e tempo 毎晩 (ogni sera)',
    nextExercises: [
      'Cosa ti piace mangiare?',
      'Cosa fai di solito durante il fine settimana?'
    ]
  },

  // 3. CIBO, BEVANDE E RISTORANTE
  {
    topicId: 'cibo',
    promptPatterns: ['cosa ti piace mangiare', 'cosa ti piace', 'cibo preferito'],
    canonicalKanji: 'どんな食べ物が好きですか。（何が好きですか）',
    canonicalKana: 'どんなたべものがすきですか。',
    canonicalRomaji: 'Donna tabemono ga suki desu ka?',
    italianTranslation: 'Cosa ti piace mangiare?',
    expectedParticles: ['が', 'か'],
    expectedVerbForms: ['好きですか', 'すきですか'],
    isQuestion: true,
    keyWords: [
      { word: 'tabemono', kana: 'たべもの', kanji: '食べ物' },
      { word: 'suki', kana: 'すき', kanji: '好き' },
    ],
    commonMistakes: [
      {
        trigger: /を.*(好き|すき)/,
        explanation: '❌ Con l\'aggettivo in -na 好き (piacere) si usa la particella が, mai を (es. ラーメンが好きです).',
      },
    ],
    grammarFocus: 'Costruzione con 好き + particella が',
    nextExercises: [
      'Mi piace molto il ramen giapponese.',
      'Prendo un caffè e un panino, per favore.',
      'Questo piatto è delizioso ma un po\' piccante.'
    ]
  },
  {
    topicId: 'cibo',
    promptPatterns: ['piace molto il ramen', 'ramen giapponese'],
    canonicalKanji: '日本のラーメンがとても好きです。',
    canonicalKana: 'にほんのらーめんがとてもすきです。',
    canonicalRomaji: 'Nihon no raamen ga totemo suki desu.',
    italianTranslation: 'Mi piace molto il ramen giapponese.',
    expectedParticles: ['が'],
    expectedVerbForms: ['好きです', 'すきです'],
    isQuestion: false,
    keyWords: [
      { word: 'raamen', kana: 'ラーメン' },
      { word: 'totemo', kana: 'とても' },
      { word: 'suki', kana: 'すき', kanji: '好き' },
    ],
    grammarFocus: 'Uso di とても (molto) e aggettivo 好き',
    nextExercises: [
      'Prendo un caffè e un panino, per favore.',
      'Questo piatto è delizioso ma un po\' piccante.',
      'Mangio il riso con le bacchette.'
    ]
  },
  {
    topicId: 'cibo',
    promptPatterns: ['caffè e un panino', 'prendo un caffè', 'per favore'],
    canonicalKanji: 'コーヒーとサンドイッチをください。',
    canonicalKana: 'こーひーとさんどいっちをください。',
    canonicalRomaji: 'Koohii to sandoitchi o kudasai.',
    italianTranslation: 'Prendo un caffè e un panino, per favore.',
    expectedParticles: ['と', 'を'],
    expectedVerbForms: ['ください'],
    isQuestion: false,
    keyWords: [
      { word: 'koohii', kana: 'コーヒー' },
      { word: 'sandoitchi', kana: 'サンドイッチ' },
      { word: 'kudasai', kana: 'ください' },
    ],
    grammarFocus: 'Richiesta formale con 〜をください e congiunzione と',
    nextExercises: [
      'Questo piatto è delizioso ma un po\' piccante.',
      'Mangio il riso con le bacchette.',
      'Quanto costa questo ombrello?'
    ]
  },
  {
    topicId: 'cibo',
    promptPatterns: ['bacchette', 'mangio il riso con le bacchette'],
    canonicalKanji: '箸でご飯を食べます。',
    canonicalKana: 'はしでごはんをたべます。',
    canonicalRomaji: 'Hashi de gohan o tabemasu.',
    italianTranslation: 'Mangio il riso con le bacchette.',
    expectedParticles: ['で', 'を'],
    expectedVerbForms: ['食べます', 'たべます'],
    isQuestion: false,
    keyWords: [
      { word: 'hashi', kana: 'はし', kanji: '箸' },
      { word: 'gohan', kana: 'ごはん', kanji: 'ご飯' },
      { word: 'tabemasu', kana: 'たべます', kanji: '食べます' },
    ],
    grammarFocus: 'Particella で per strumento o mezzo (箸で)',
    nextExercises: [
      'Quanto costa questo ombrello?',
      'C\'è un libro sopra la scrivania.'
    ]
  },

  // 4. ACQUISTI, NEGOZI E CONTATORI
  {
    topicId: 'acquisti',
    promptPatterns: ['quanto costa questo ombrello', 'quanto costa', 'costa questo'],
    canonicalKanji: 'この傘はいくらですか。',
    canonicalKana: 'このかさはいくらですか。',
    canonicalRomaji: 'Kono kasa wa ikura desu ka?',
    italianTranslation: 'Quanto costa questo ombrello?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'kono', kana: 'この' },
      { word: 'kasa', kana: 'かさ', kanji: '傘' },
      { word: 'ikura', kana: 'いくら' },
    ],
    grammarFocus: 'Dimostrativo この + sostantivo e domanda di prezzo いくらですか',
    nextExercises: [
      'Quello laggiù costa tremila yen.',
      'Vorrei tre mele, per favore.',
      'Vorrei due bottiglie di birra e un succo.'
    ]
  },
  {
    topicId: 'acquisti',
    promptPatterns: ['laggiù costa tremila yen', 'tremila yen'],
    canonicalKanji: 'あれは三千円です。',
    canonicalKana: 'あれはさんぜんえんです。',
    canonicalRomaji: 'Are wa sanzen-en desu.',
    italianTranslation: 'Quello laggiù costa tremila yen.',
    expectedParticles: ['は'],
    expectedVerbForms: ['です'],
    isQuestion: false,
    keyWords: [
      { word: 'are', kana: 'あれ' },
      { word: 'sanzen', kana: 'さんぜん', kanji: '三千' },
      { word: 'en', kana: 'えん', kanji: '円' },
    ],
    grammarFocus: 'Pronome dimostrativo あれ e valuta giapponese 円',
    nextExercises: [
      'Vorrei tre mele, per favore.',
      'Vorrei due bottiglie di birra e un succo.'
    ]
  },
  {
    topicId: 'acquisti',
    promptPatterns: ['tre mele', 'vorrei tre mele'],
    canonicalKanji: 'りんごを三つください。',
    canonicalKana: 'りんごをみっつください。',
    canonicalRomaji: 'Ringo o mittsu kudasai.',
    italianTranslation: 'Vorrei tre mele, per favore.',
    expectedParticles: ['を'],
    expectedVerbForms: ['ください'],
    isQuestion: false,
    keyWords: [
      { word: 'ringo', kana: 'りんご' },
      { word: 'mittsu', kana: 'みっつ', kanji: '三つ' },
      { word: 'kudasai', kana: 'ください' },
    ],
    grammarFocus: 'Contatore generico N5 三つ (mittsu) e formula 〜をください',
    nextExercises: [
      'Vorrei due bottiglie di birra e un succo.',
      'Questa borsa è bella ma un po\' costosa.',
      'C\'è un libro sopra la scrivania.'
    ]
  },
  {
    topicId: 'acquisti',
    promptPatterns: ['due bottiglie di birra', 'bottiglie'],
    canonicalKanji: 'ビールを二本とジュースを一つください。',
    canonicalKana: 'びーるをにほんとじゅーすをひとつください。',
    canonicalRomaji: 'Biiru o nihon to juusu o hitotsu kudasai.',
    italianTranslation: 'Vorrei due bottiglie di birra e un succo.',
    expectedParticles: ['を', 'と'],
    expectedVerbForms: ['ください'],
    isQuestion: false,
    keyWords: [
      { word: 'biiru', kana: 'ビール' },
      { word: 'nihon', kana: 'にほん', kanji: '二本' },
      { word: 'juusu', kana: 'ジュース' },
      { word: 'hitotsu', kana: 'ひとつ', kanji: '一つ' },
    ],
    grammarFocus: 'Contatore per bottiglie/oggetti cilindrici 本 (hon/nihon)',
    nextExercises: [
      'Questa borsa è bella ma un po\' costosa.',
      'C\'è un libro sopra la scrivania.'
    ]
  },

  // 5. CASA, STANZE E POSIZIONI
  {
    topicId: 'casa_oggetti',
    promptPatterns: ['libro sopra la scrivania', 'c\'è un libro'],
    canonicalKanji: '机の上に本があります。',
    canonicalKana: 'つくえのうえにほんがあります。',
    canonicalRomaji: 'Tsukue no ue ni hon ga arimasu.',
    italianTranslation: 'C\'è un libro sopra la scrivania.',
    expectedParticles: ['の', 'に', 'が'],
    expectedVerbForms: ['あります'],
    isInanimateExistence: true,
    isQuestion: false,
    keyWords: [
      { word: 'tsukue', kana: 'つくえ', kanji: '机' },
      { word: 'ue', kana: 'うえ', kanji: '上' },
      { word: 'hon', kana: 'ほん', kanji: '本' },
      { word: 'arimasu', kana: 'あります' },
    ],
    commonMistakes: [
      {
        trigger: /います/,
        explanation: '❌ Il libro è un oggetto inanimato: si usa あります, mentre います è solo per persone e animali.',
      },
    ],
    grammarFocus: 'Esistenza inanimata あります e posizioni relative (の 上 に)',
    nextExercises: [
      'Dov\'è il gatto?',
      'Il gatto è sotto la sedia.',
      'Nella mia stanza non c\'è la televisione.'
    ]
  },
  {
    topicId: 'casa_oggetti',
    promptPatterns: ['dov\'è il gatto', 'il gatto'],
    canonicalKanji: '猫はどこにいますか。',
    canonicalKana: 'ねこはどこにいますか。',
    canonicalRomaji: 'Neko wa doko ni imasu ka?',
    italianTranslation: 'Dov\'è il gatto?',
    expectedParticles: ['は', 'に', 'か'],
    expectedVerbForms: ['いますか'],
    isAnimateExistence: true,
    isQuestion: true,
    keyWords: [
      { word: 'neko', kana: 'ねこ', kanji: '猫' },
      { word: 'doko', kana: 'どこ' },
      { word: 'imasu', kana: 'います' },
    ],
    commonMistakes: [
      {
        trigger: /あります/,
        explanation: '❌ Il gatto è un essere vivente (animale): serve il verbo います (imasu), mai あります.',
      },
    ],
    grammarFocus: 'Esistenza animata con います per gli animali',
    nextExercises: [
      'Il gatto è sotto la sedia.',
      'Nella mia stanza non c\'è la televisione.',
      'Quante persone ci sono nella tua famiglia?'
    ]
  },
  {
    topicId: 'casa_oggetti',
    promptPatterns: ['gatto è sotto la sedia', 'sotto la sedia'],
    canonicalKanji: '猫は椅子の下にいます。',
    canonicalKana: 'ねこはいすのしたにいます。',
    canonicalRomaji: 'Neko wa isu no shita ni imasu.',
    italianTranslation: 'Il gatto è sotto la sedia.',
    expectedParticles: ['は', 'の', 'に'],
    expectedVerbForms: ['います'],
    isAnimateExistence: true,
    isQuestion: false,
    keyWords: [
      { word: 'neko', kana: 'ねこ', kanji: '猫' },
      { word: 'isu', kana: 'いす', kanji: '椅子' },
      { word: 'shita', kana: 'した', kanji: '下' },
      { word: 'imasu', kana: 'います' },
    ],
    grammarFocus: 'Posizione の 下 に (sotto) ed esistenza animata います',
    nextExercises: [
      'Nella mia stanza non c\'è la televisione.',
      'C\'è una farmacia accanto alla stazione.',
      'Quante persone ci sono nella tua famiglia?'
    ]
  },

  // 6. FAMIGLIA E RELAZIONI
  {
    topicId: 'famiglia',
    promptPatterns: ['quante persone ci sono nella tua famiglia', 'famiglia quante persone'],
    canonicalKanji: 'ご家族は何人ですか。',
    canonicalKana: 'ごかぞくはなんにんですか。',
    canonicalRomaji: 'Gokazoku wa nannin desu ka?',
    italianTranslation: 'Quante persone ci sono nella tua famiglia?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'gokazoku', kana: 'ごかぞく', kanji: 'ご家族' },
      { word: 'nannin', kana: 'なんにん', kanji: '何人' },
    ],
    grammarFocus: 'Contatore delle persone 何人 (nannin) e prefisso di cortesia ご家族',
    nextExercises: [
      'La mia famiglia è composta da quattro persone.',
      'Mio padre è gentile e mia madre è allegra.',
      'Ho due fratelli minori.'
    ]
  },
  {
    topicId: 'famiglia',
    promptPatterns: ['famiglia è composta da quattro persone', 'quattro persone'],
    canonicalKanji: '家族は四人です。',
    canonicalKana: 'かぞくはよにんです。',
    canonicalRomaji: 'Kazoku wa yonin desu.',
    italianTranslation: 'La mia famiglia è composta da quattro persone.',
    expectedParticles: ['は'],
    expectedVerbForms: ['です'],
    isQuestion: false,
    keyWords: [
      { word: 'kazoku', kana: 'かぞく', kanji: '家族' },
      { word: 'yonin', kana: 'よにん', kanji: '四人' },
    ],
    grammarFocus: 'Lettura del numero quattro di persone: 四人 è よにん (yonin)',
    nextExercises: [
      'Mio padre è gentile e mia madre è allegra.',
      'Ho due fratelli minori.',
      'Studi giapponese ogni giorno?'
    ]
  },
  {
    topicId: 'famiglia',
    promptPatterns: ['ho due fratelli minori', 'due fratelli minori'],
    canonicalKanji: '弟が二人います。',
    canonicalKana: 'おとうとがふたりいます。',
    canonicalRomaji: 'Otouto ga futari imasu.',
    italianTranslation: 'Ho due fratelli minori.',
    expectedParticles: ['が'],
    expectedVerbForms: ['います'],
    isAnimateExistence: true,
    isQuestion: false,
    keyWords: [
      { word: 'otouto', kana: 'おとうと', kanji: '弟' },
      { word: 'futari', kana: 'ふたり', kanji: '二人' },
      { word: 'imasu', kana: 'います' },
    ],
    grammarFocus: 'Contatore irregolare per due persone 二人 (futari) ed esistenza います',
    nextExercises: [
      'Studi giapponese ogni giorno?',
      'Dove lavori di solito?'
    ]
  },

  // 7. SCUOLA, STUDIO E LINGUE
  {
    topicId: 'scuola_studio',
    promptPatterns: ['studi giapponese ogni giorno', 'studi giapponese'],
    canonicalKanji: '毎日日本語を勉強しますか。',
    canonicalKana: 'まいにちにほんごをべんきょうしますか。',
    canonicalRomaji: 'Mainichi nihongo o benkyou shimasu ka?',
    italianTranslation: 'Studi giapponese ogni giorno?',
    expectedParticles: ['を', 'か'],
    expectedVerbForms: ['勉強しますか', 'べんきょうしますか'],
    isQuestion: true,
    keyWords: [
      { word: 'mainichi', kana: 'まいにち', kanji: '毎日' },
      { word: 'nihongo', kana: 'にほんご', kanji: '日本語' },
      { word: 'benkyou', kana: 'べんきょう', kanji: '勉強' },
    ],
    grammarFocus: 'Verbo suru 勉強します e oggetto diretto con を',
    nextExercises: [
      'Ogni sera studio per due ore a casa.',
      'Scrivo questa lettera in giapponese con la penna.',
      'L\'esame di domani è molto difficile?'
    ]
  },
  {
    topicId: 'scuola_studio',
    promptPatterns: ['lettera in giapponese con la penna', 'con la penna'],
    canonicalKanji: 'ペンで日本語の手紙を書きます。',
    canonicalKana: 'ぺんでにほんごのてがみをかきます。',
    canonicalRomaji: 'Pen de nihongo no tegami o kakimasu.',
    italianTranslation: 'Scrivo questa lettera in giapponese con la penna.',
    expectedParticles: ['で', 'の', 'を'],
    expectedVerbForms: ['書きます', 'かきます'],
    isQuestion: false,
    keyWords: [
      { word: 'pen', kana: 'ペン' },
      { word: 'tegami', kana: 'てがみ', kanji: '手紙' },
      { word: 'kakimasu', kana: 'かきます', kanji: '書きます' },
    ],
    grammarFocus: 'Strumento con で (ペンで) e verbo 書きます',
    nextExercises: [
      'Dove lavori di solito?',
      'Cosa fai di solito durante il fine settimana?'
    ]
  },

  // 8. LAVORO, UFFICIO E PROFESSIONI
  {
    topicId: 'lavoro_ufficio',
    promptPatterns: ['dove lavori di solito', 'dove lavori'],
    canonicalKanji: 'どこで働いていますか。（どこで働きますか）',
    canonicalKana: 'どこではたらいていますか。',
    canonicalRomaji: 'Doko de hataraite imasu ka?',
    italianTranslation: 'Dove lavori di solito?',
    expectedParticles: ['で', 'か'],
    expectedVerbForms: ['働きますか', 'はたらきますか', '働いていますか', 'はたらいていますか'],
    isQuestion: true,
    keyWords: [
      { word: 'doko', kana: 'どこ' },
      { word: 'hatarakimasu', kana: 'はたらきます', kanji: '働きます' },
    ],
    grammarFocus: 'Particella で con verbo 働きます (lavorare)',
    nextExercises: [
      'Lavoro in una banca dalle nove alle diciotto.',
      'Oggi sono molto occupato con il lavoro.'
    ]
  },
  {
    topicId: 'lavoro_ufficio',
    promptPatterns: ['lavoro in una banca', 'dalle nove alle diciotto', 'dalle nove alle sei'],
    canonicalKanji: '銀行で九時から六時まで働きます。',
    canonicalKana: 'ぎんこうできゅうじからろくじまではたらきます。',
    canonicalRomaji: 'Ginkou de kyuuji kara rokuji made hatarakimasu.',
    italianTranslation: 'Lavoro in una banca dalle nove alle diciotto.',
    expectedParticles: ['で', 'から', 'まで'],
    expectedVerbForms: ['働きます', 'はたらきます'],
    isQuestion: false,
    keyWords: [
      { word: 'ginkou', kana: 'ぎんこう', kanji: '銀行' },
      { word: 'kyuuji', kana: 'きゅうじ', kanji: '九時' },
      { word: 'rokuji', kana: 'ろくじ', kanji: '六時' },
    ],
    grammarFocus: 'Correlazione から ... まで e luogo d\'azione で',
    nextExercises: [
      'Cosa fai di solito durante il fine settimana?',
      'Come vai all\'università ogni mattina?'
    ]
  },

  // 9. TEMPO LIBERO, HOBBY E SPORT
  {
    topicId: 'tempo_libero',
    promptPatterns: ['fine settimana', 'cosa fai di solito durante il fine settimana'],
    canonicalKanji: '週末、たいてい何をしますか。',
    canonicalKana: 'しゅうまつ、たいていなにをしますか。',
    canonicalRomaji: 'Shuumatsu, taitei nani o shimasu ka?',
    italianTranslation: 'Cosa fai di solito durante il fine settimana?',
    expectedParticles: ['を', 'か'],
    expectedVerbForms: ['しますか'],
    isQuestion: true,
    keyWords: [
      { word: 'shuumatsu', kana: 'しゅうまつ', kanji: '週末' },
      { word: 'taitei', kana: 'たいてい' },
      { word: 'nani', kana: 'なに', kanji: '何' },
    ],
    grammarFocus: 'Tempo 週末 e domanda 何をしますか',
    nextExercises: [
      'Sabato guardo un film insieme a un amico.',
      'Ascolti spesso la musica giapponese?',
      'Non guardo quasi mai la televisione.'
    ]
  },
  {
    topicId: 'tempo_libero',
    promptPatterns: ['guardo un film insieme a un amico', 'guardo un film con un amico'],
    canonicalKanji: '土曜日に友達と一緒に映画を見ます。',
    canonicalKana: 'どようびにともだちといっしょにえいがをみます。',
    canonicalRomaji: 'Doyoubi ni tomodachi to issho ni eiga o mimasu.',
    italianTranslation: 'Sabato guardo un film insieme a un amico.',
    expectedParticles: ['に', 'と', 'を'],
    expectedVerbForms: ['見ます', 'みます'],
    isQuestion: false,
    keyWords: [
      { word: 'doyoubi', kana: 'どようび', kanji: '土曜日' },
      { word: 'tomodachi', kana: 'ともだち', kanji: '友達' },
      { word: 'issho', kana: 'いっしょ', kanji: '一緒' },
      { word: 'eiga', kana: 'えいが', kanji: '映画' },
      { word: 'mimasu', kana: 'みます', kanji: '見ます' },
    ],
    grammarFocus: 'Particella と per compagnia (友達と一緒に) e verbo 見ます',
    nextExercises: [
      'Ascolti spesso la musica giapponese?',
      'Come vai all\'università ogni mattina?'
    ]
  },

  // 10. TRASPORTI E SPOSTAMENTI
  {
    topicId: 'trasporti_viaggi',
    promptPatterns: ['come vai all\'università', 'come vai a scuola'],
    canonicalKanji: '毎朝、どうやって大学へ行きますか。',
    canonicalKana: 'まいあさ、どうやってだいがくへいきますか。',
    canonicalRomaji: 'Maiasa, douyatte daigaku e ikimasu ka?',
    italianTranslation: 'Come vai all\'università ogni mattina?',
    expectedParticles: ['へ', 'に', 'か'],
    expectedVerbForms: ['行きますか', 'いきますか'],
    isQuestion: true,
    keyWords: [
      { word: 'douyatte', kana: 'どうやって' },
      { word: 'daigaku', kana: 'だいがく', kanji: '大学' },
      { word: 'ikimasu', kana: 'いきます', kanji: '行きます' },
    ],
    grammarFocus: 'Come (どうやって) e direzione へ 行きます',
    nextExercises: [
      'Vado a scuola in treno.',
      'Vado alla stazione a piedi.',
      'Com\'è il tempo oggi?'
    ]
  },
  {
    topicId: 'trasporti_viaggi',
    promptPatterns: ['vado a scuola in treno', 'in treno'],
    canonicalKanji: '電車で学校へ行きます。',
    canonicalKana: 'でんしゃでがっこうへいきます。',
    canonicalRomaji: 'Densha de gakkou e ikimasu.',
    italianTranslation: 'Vado a scuola in treno.',
    expectedParticles: ['で', 'へ', 'に'],
    expectedVerbForms: ['行きます', 'いきます'],
    isQuestion: false,
    keyWords: [
      { word: 'densha', kana: 'でんしゃ', kanji: '電車' },
      { word: 'gakkou', kana: 'がっこう', kanji: '学校' },
      { word: 'ikimasu', kana: 'いきます', kanji: '行きます' },
    ],
    grammarFocus: 'Mezzo di trasporto con で (電車で) e destinazione へ',
    nextExercises: [
      'Vado alla stazione a piedi.',
      'Il mese prossimo andrò a Kyoto con lo Shinkansen.',
      'Com\'è il tempo oggi?'
    ]
  },
  {
    topicId: 'trasporti_viaggi',
    promptPatterns: ['stazione a piedi', 'a piedi'],
    canonicalKanji: '歩いて駅へ行きます。',
    canonicalKana: 'あるいてえきへいきます。',
    canonicalRomaji: 'Aruite eki e ikimasu.',
    italianTranslation: 'Vado alla stazione a piedi.',
    expectedParticles: ['へ', 'に'],
    expectedVerbForms: ['行きます', 'いきます'],
    isQuestion: false,
    keyWords: [
      { word: 'aruite', kana: 'あるいて', kanji: '歩いて' },
      { word: 'eki', kana: 'えき', kanji: '駅' },
    ],
    commonMistakes: [
      {
        trigger: /歩いてで/,
        explanation: '❌ "A piedi" si esprime unicamente con 歩いて (aruite) senza la particella で!',
      },
    ],
    grammarFocus: 'Forma speciale 歩いて (a piedi, senza particella で)',
    nextExercises: [
      'Com\'è il tempo oggi?',
      'Questa stanza è molto spaziosa e pulita.'
    ]
  },

  // 11. METEO, CLIMA E STAGIONI
  {
    topicId: 'meteo_stagioni',
    promptPatterns: ['com\'è il tempo oggi', 'tempo oggi'],
    canonicalKanji: '今日の天気はどうですか。',
    canonicalKana: 'きょうのてんきはどうですか。',
    canonicalRomaji: 'Kyou no tenki wa dou desu ka?',
    italianTranslation: 'Com\'è il tempo oggi?',
    expectedParticles: ['の', 'は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'tenki', kana: 'てんき', kanji: '天気' },
      { word: 'dou', kana: 'どう' },
    ],
    grammarFocus: 'Sostantivo 天気 (meteo) e interrogativo どうですか (com\'è?)',
    nextExercises: [
      'Oggi fa bel tempo e fa caldo.',
      'Ieri pioveva e faceva freddo.',
      'La primavera è la stagione che preferisco.'
    ]
  },
  {
    topicId: 'meteo_stagioni',
    promptPatterns: ['bel tempo e fa caldo', 'fa caldo oggi'],
    canonicalKanji: '今日はいい天気で、暑いです。',
    canonicalKana: 'きょうはいいてんきで、あついです。',
    canonicalRomaji: 'Kyou wa ii tenki de, atsui desu.',
    italianTranslation: 'Oggi fa bel tempo e fa caldo.',
    expectedParticles: ['は', 'で'],
    expectedVerbForms: ['です'],
    isQuestion: false,
    keyWords: [
      { word: 'iitenki', kana: 'いいてんき', kanji: 'いい天気' },
      { word: 'atsui', kana: 'あつい', kanji: '暑い' },
    ],
    grammarFocus: 'Collegamento con で e aggettivo atmosferico 暑い (caldo)',
    nextExercises: [
      'Ieri pioveva e faceva freddo.',
      'La primavera è la stagione che preferisco.',
      'Questa stanza è molto spaziosa e pulita.'
    ]
  },
  {
    topicId: 'meteo_stagioni',
    promptPatterns: ['pioveva e faceva freddo', 'ieri pioveva'],
    canonicalKanji: '昨日は雨が降って、寒かったです。',
    canonicalKana: 'きのうはあめがふって、さむかったです。',
    canonicalRomaji: 'Kinou wa ame ga futte, samukatta desu.',
    italianTranslation: 'Ieri pioveva e faceva freddo.',
    expectedParticles: ['は', 'が'],
    expectedVerbForms: ['寒かったです', 'さむかったです'],
    isQuestion: false,
    keyWords: [
      { word: 'kinou', kana: 'きのう', kanji: '昨日' },
      { word: 'ame', kana: 'あめ', kanji: '雨' },
      { word: 'samukatta', kana: 'さむかった', kanji: '寒かった' },
    ],
    grammarFocus: 'Passato degli aggettivi in -i: 寒い -> 寒かったです',
    nextExercises: [
      'Questa stanza è molto spaziosa e pulita.',
      'Che giorno della settimana è oggi?'
    ]
  },

  // 12. AGGETTIVI E DESCRIZIONI
  {
    topicId: 'aggettivi_descrizioni',
    promptPatterns: ['stanza è molto spaziosa e pulita', 'spaziosa e luminosa', 'spaziosa'],
    canonicalKanji: 'この部屋はとても広くて綺麗です。',
    canonicalKana: 'このへやはとてもひろくてきれいです。',
    canonicalRomaji: 'Kono heya wa totemo hirokute kirei desu.',
    italianTranslation: 'Questa stanza è molto spaziosa e pulita.',
    expectedParticles: ['は'],
    expectedVerbForms: ['です'],
    isQuestion: false,
    keyWords: [
      { word: 'heya', kana: 'へや', kanji: '部屋' },
      { word: 'hirokute', kana: 'ひろくて', kanji: '広くて' },
      { word: 'kirei', kana: 'きれい', kanji: '綺麗' },
    ],
    grammarFocus: 'Forma di collegamento degli aggettivi in -i: 広い -> 広くて',
    nextExercises: [
      'Quel libro non era interessante.',
      'La biblioteca è un posto molto tranquillo.',
      'Che giorno della settimana è oggi?'
    ]
  },
  {
    topicId: 'aggettivi_descrizioni',
    promptPatterns: ['quel libro non era interessante', 'non era affatto interessante'],
    canonicalKanji: 'あの本は面白くなかったです。',
    canonicalKana: 'あのほんはおもしろくなかったです。',
    canonicalRomaji: 'Ano hon wa omoshirokunakatta desu.',
    italianTranslation: 'Quel libro non era interessante.',
    expectedParticles: ['は'],
    expectedVerbForms: ['面白くなかったです', 'おもしろくなかったです'],
    isQuestion: false,
    keyWords: [
      { word: 'ano', kana: 'あの' },
      { word: 'hon', kana: 'ほん', kanji: '本' },
      { word: 'omoshirokunakatta', kana: 'おもしろくなかった', kanji: '面白くなかった' },
    ],
    grammarFocus: 'Passato negativo degli aggettivi in -i: 〜くなかったです',
    nextExercises: [
      'Che giorno della settimana è oggi?',
      'Non andiamo insieme a bere un caffè?'
    ]
  },

  // 13. DATE, CALENDARIO E COMPLEANNI
  {
    topicId: 'date_calendario',
    promptPatterns: ['che giorno della settimana è oggi', 'giorno della settimana'],
    canonicalKanji: '今日は何曜日ですか。',
    canonicalKana: 'きょうはなんようびですか。',
    canonicalRomaji: 'Kyou wa nanyoubi desu ka?',
    italianTranslation: 'Che giorno della settimana è oggi?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'kyou', kana: 'きょう', kanji: '今日' },
      { word: 'nanyoubi', kana: 'なんようび', kanji: '何曜日' },
    ],
    grammarFocus: 'Interrogativo per i giorni della settimana 何曜日 (nanyoubi)',
    nextExercises: [
      'Oggi è mercoledì.',
      'Quando è il tuo compleanno?',
      'Il mio compleanno è il cinque maggio.'
    ]
  },
  {
    topicId: 'date_calendario',
    promptPatterns: ['quando è il tuo compleanno', 'compleanno'],
    canonicalKanji: '誕生日はいつですか。',
    canonicalKana: 'たんじょうびはいつですか。',
    canonicalRomaji: 'Tanjoubi wa itsu desu ka?',
    italianTranslation: 'Quando è il tuo compleanno?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'tanjoubi', kana: 'たんじょうび', kanji: '誕生日' },
      { word: 'itsu', kana: 'いつ' },
    ],
    grammarFocus: 'Pronome interrogativo temporale いつ (quando)',
    nextExercises: [
      'Il mio compleanno è il cinque maggio.',
      'Non andiamo insieme a bere un caffè?'
    ]
  },

  // 14. INVITI, PROPOSTE E RICHIESTE
  {
    topicId: 'inviti_proposte',
    promptPatterns: ['non andiamo insieme a bere un caffè', 'bere un caffè', 'andiamo insieme'],
    canonicalKanji: '一緒にコーヒーを飲みに行きませんか。',
    canonicalKana: 'いっしょにこーひーをのみにいきませんか。',
    canonicalRomaji: 'Issho ni koohii o nomi ni ikimasen ka?',
    italianTranslation: 'Non andiamo insieme a bere un caffè?',
    expectedParticles: ['に', 'か'],
    expectedVerbForms: ['行きませんか', 'いきませんか'],
    isQuestion: true,
    keyWords: [
      { word: 'isshoni', kana: 'いっしょに', kanji: '一緒に' },
      { word: 'koohii', kana: 'コーヒー' },
      { word: 'ikimasenka', kana: 'いきませんか', kanji: '行きませんか' },
    ],
    grammarFocus: 'Forma d\'invito cortese 〜ませんか con scopo di moto (飲みに行く)',
    nextExercises: [
      'Mangiamo ramen insieme a mezzogiorno!',
      'Per favore, aspetta un momento.',
      'Per favore, parla un po\' più lentamente.'
    ]
  },
  {
    topicId: 'inviti_proposte',
    promptPatterns: ['aspetta un momento', 'per favore aspetta'],
    canonicalKanji: 'ちょっと待ってください。',
    canonicalKana: 'ちょっとまってください。',
    canonicalRomaji: 'Chotto matte kudasai.',
    italianTranslation: 'Per favore, aspetta un momento.',
    expectedParticles: [],
    expectedVerbForms: ['待ってください', 'まってください'],
    isQuestion: false,
    keyWords: [
      { word: 'chotto', kana: 'ちょっと' },
      { word: 'mattekudasai', kana: 'まってください', kanji: '待ってください' },
    ],
    grammarFocus: 'Forma in -te + ください (richiesta di cortesia)',
    nextExercises: [
      'Dov\'è l\'ufficio postale?',
      'Oggi mi fa male la testa.'
    ]
  },

  // 15. CITTA, EDIFICI E INDICAZIONI STRADALI
  {
    topicId: 'citta_indicazioni',
    promptPatterns: ['dov\'è l\'ufficio postale', 'ufficio postale'],
    canonicalKanji: '郵便局はどこですか。',
    canonicalKana: 'ゆうびんきょくはどこですか。',
    canonicalRomaji: 'Yuubinkyoku wa doko desu ka?',
    italianTranslation: 'Dov\'è l\'ufficio postale?',
    expectedParticles: ['は', 'か'],
    expectedVerbForms: ['ですか'],
    isQuestion: true,
    keyWords: [
      { word: 'yuubinkyoku', kana: 'ゆうびんきょく', kanji: '郵便局' },
      { word: 'doko', kana: 'どこ' },
    ],
    grammarFocus: 'Nome di edificio 郵便局 e interrogativo どこ',
    nextExercises: [
      'Gira a destra al prossimo incrocio.',
      'La banca è proprio di fronte alla stazione.',
      'Per favore, vada sempre dritto.'
    ]
  },
  {
    topicId: 'citta_indicazioni',
    promptPatterns: ['gira a destra al prossimo incrocio', 'prossimo incrocio', 'gira a destra'],
    canonicalKanji: '次の交差点を右へ曲がってください。',
    canonicalKana: 'つぎのこうさてんをみぎへまがってください。',
    canonicalRomaji: 'Tsugi no kousaten o migi e magatte kudasai.',
    italianTranslation: 'Gira a destra al prossimo incrocio.',
    expectedParticles: ['を', 'へ', 'に'],
    expectedVerbForms: ['曲がってください', 'まがってください'],
    isQuestion: false,
    keyWords: [
      { word: 'tsugi', kana: 'つぎ', kanji: '次' },
      { word: 'kousaten', kana: 'こうさてん', kanji: '交差点' },
      { word: 'migi', kana: 'みぎ', kanji: '右' },
      { word: 'magatte', kana: 'まがって', kanji: '曲がって' },
    ],
    grammarFocus: 'Punto di attraversamento con を e direzione con へ/に',
    nextExercises: [
      'La banca è proprio di fronte alla stazione.',
      'Oggi mi fa male la testa.'
    ]
  },

  // 16. SALUTE, CORPO E BENESSERE
  {
    topicId: 'salute_corpo',
    promptPatterns: ['male la testa', 'mal di testa', 'testa'],
    canonicalKanji: '今日は頭が痛いです。',
    canonicalKana: 'きょうはあたまがいたいです。',
    canonicalRomaji: 'Kyou wa atama ga itai desu.',
    italianTranslation: 'Oggi mi fa male la testa.',
    expectedParticles: ['は', 'が'],
    expectedVerbForms: ['痛いです', 'いたいです'],
    isQuestion: false,
    keyWords: [
      { word: 'atama', kana: 'あたま', kanji: '頭' },
      { word: 'itai', kana: 'いたい', kanji: '痛い' },
    ],
    grammarFocus: 'Parte del corpo con particella が e aggettivo 痛い (doloroso)',
    nextExercises: [
      'Hai la febbre?',
      'Ho preso il raffreddore, quindi oggi resto a casa.',
      'Riposati e abbi cura di te!'
    ]
  },
  {
    topicId: 'salute_corpo',
    promptPatterns: ['hai la febbre', 'febbre'],
    canonicalKanji: '熱がありますか。',
    canonicalKana: 'ねつがありますか。',
    canonicalRomaji: 'Netsu ga arimasu ka?',
    italianTranslation: 'Hai la febbre?',
    expectedParticles: ['が', 'か'],
    expectedVerbForms: ['ありますか'],
    isQuestion: true,
    keyWords: [
      { word: 'netsu', kana: 'ねつ', kanji: '熱' },
      { word: 'arimasu', kana: 'あります' },
    ],
    grammarFocus: 'Sintomo 熱 (febbre) ed esistenza あります',
    nextExercises: [
      'Riposati e abbi cura di te!',
      'Piacere di conoscerti. Mi chiamo Mario e sono uno studente.'
    ]
  }
];

/**
 * Evaluates student answer fully offline using the local N5 database and grammatical rules.
 */
export function evaluateWithLocalEngine(
  studentAnswer: string,
  italianPrompt: string,
  conversationTopic: string,
  seenPrompts: string[] = []
): EvaluationResult {
  const cleanAnswer = studentAnswer.trim();
  const lowerPrompt = italianPrompt.toLowerCase();

  // 1. Look for matching scenario in N5_DATABASE
  let scenario = N5_DATABASE.find((s) =>
    s.promptPatterns.some((pattern) => lowerPrompt.includes(pattern.toLowerCase()))
  );

  // If not found in static database, find corresponding topic in curriculum
  if (!scenario) {
    // Check if any prompt in N5_TOPICS matches
    for (const topic of N5_TOPICS) {
      const match = topic.prompts.find((p) => p.italian.toLowerCase() === lowerPrompt || lowerPrompt.includes(p.italian.toLowerCase().slice(0, 15)));
      if (match) {
        scenario = {
          topicId: topic.id,
          promptPatterns: [match.italian.toLowerCase()],
          canonicalKanji: match.kanji,
          canonicalKana: match.kana,
          canonicalRomaji: match.romaji,
          italianTranslation: match.italian,
          expectedParticles: [],
          expectedVerbForms: ['です', 'ます'],
          isQuestion: match.italian.includes('?'),
          keyWords: [],
          grammarFocus: match.grammarFocus,
          nextExercises: topic.prompts.filter((p) => p.italian !== match.italian).map((p) => p.italian),
        };
        break;
      }
    }
  }

  // Fallback scenario if still unmatched
  if (!scenario) {
    scenario = N5_DATABASE[0];
  }

  // If student wrote empty string
  if (!cleanAnswer) {
    return {
      evaluation: 'incorrect',
      evaluationLabel: '❌ Da correggere',
      studentSentence: '(Nessuna risposta)',
      correction: {
        kanji: scenario.canonicalKanji,
        kana: scenario.canonicalKana,
        romaji: scenario.canonicalRomaji,
      },
      whatToCorrect: 'Non hai inserito alcuna risposta. Prova a scrivere la traduzione in hiragana, kanji o romaji.',
      italianTranslation: scenario.italianTranslation,
      nextExercise: getDiversePromptForTopic(scenario.topicId, [italianPrompt, ...seenPrompts]).prompt,
      conversationTopic,
      grammarFocus: scenario.grammarFocus,
    };
  }

  // Grammar & Linguistic verification
  const errors: string[] = [];
  let isAlmostCorrect = false;

  // Check specific mistake triggers
  if (scenario.commonMistakes) {
    for (const mistake of scenario.commonMistakes) {
      if (mistake.trigger.test(cleanAnswer)) {
        errors.push(mistake.explanation);
      }
    }
  }

  // Check question mark particle か
  const isItalianQuestion = italianPrompt.includes('?') || scenario.isQuestion;
  if (isItalianQuestion) {
    const endsWithKa =
      cleanAnswer.endsWith('か') ||
      cleanAnswer.endsWith('か。') ||
      cleanAnswer.endsWith('か？') ||
      cleanAnswer.toLowerCase().endsWith('ka') ||
      cleanAnswer.toLowerCase().endsWith('ka?');

    if (!endsWithKa && !errors.some((e) => e.includes('domanda') || e.includes('か'))) {
      errors.push('⚠️ La frase italiana è una domanda: in giapponese le domande cortesi al livello N5 terminano di norma con la particella interrogativa か (es. 〜ますか / 〜ですか).');
      isAlmostCorrect = true;
    }
  }

  // Check polite forms (です / ます / でした / ません / たい / ましょう / ませんか)
  const hasPoliteForm =
    cleanAnswer.includes('ます') ||
    cleanAnswer.includes('です') ||
    cleanAnswer.includes('ました') ||
    cleanAnswer.includes('ません') ||
    cleanAnswer.includes('たい') ||
    cleanAnswer.includes('ましょう') ||
    cleanAnswer.includes('ませんか') ||
    cleanAnswer.includes('ください') ||
    cleanAnswer.includes('お大事に') ||
    cleanAnswer.includes('初めまして') ||
    cleanAnswer.includes('はじめまして') ||
    cleanAnswer.toLowerCase().includes('masu') ||
    cleanAnswer.toLowerCase().includes('desu') ||
    cleanAnswer.toLowerCase().includes('kudasai');

  if (!hasPoliteForm) {
    errors.push('❌ Al livello JLPT N5 è raccomandato utilizzare lo stile cortese con 〜です o con i verbi in 〜ます / 〜てください.');
  }

  // Kanji encouraging note
  let kanjiNote: string | undefined = undefined;
  const isAllKana = /^[\u3040-\u309F\u30A0-\u30FF\s、。？！]+$/.test(cleanAnswer);
  if (isAllKana && cleanAnswer.length > 5) {
    kanjiNote = '✓ Ottimo! Scrivere in hiragana è pienamente corretto a livello N5. Quando vorrai, potrai iniziare ad inserire anche i kanji fondamentali.';
  }

  // Status computation
  let status: EvaluationStatus = 'correct';
  let label = '✅ Corretta';

  if (errors.length > 0) {
    const hasFatal = errors.some((e) => e.startsWith('❌'));
    if (hasFatal) {
      status = 'incorrect';
      label = '❌ Da correggere';
    } else {
      status = 'almost_correct';
      label = '⚠️ Quasi corretta';
    }
  }

  const whatToCorrect =
    errors.length > 0
      ? errors.join('\n\n')
      : 'Ottimo lavoro! La struttura della frase, le particelle e la coniugazione verbale rispettano fedelmente le regole di livello JLPT N5.';

  // Select a DIVERSE next exercise (not seen recently)
  const currentTopicId = scenario.topicId;
  const nextExercise = getDiversePromptForTopic(
    currentTopicId,
    [italianPrompt, ...seenPrompts]
  ).prompt;

  return {
    evaluation: status,
    evaluationLabel: label,
    studentSentence: cleanAnswer,
    correction: {
      kanji: scenario.canonicalKanji,
      kana: scenario.canonicalKana,
      romaji: scenario.canonicalRomaji,
    },
    whatToCorrect,
    italianTranslation: scenario.italianTranslation,
    kanjiNotes: kanjiNote,
    nextExercise,
    conversationTopic: conversationTopic || 'JLPT N5',
    grammarFocus: scenario.grammarFocus,
    difficultyLevel: 'medio',
  };
}
