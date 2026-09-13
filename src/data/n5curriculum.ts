export interface N5PromptItem {
  italian: string;
  kanji: string;
  kana: string;
  romaji: string;
  grammarFocus: string;
  hint?: string;
}

export interface N5Topic {
  id: string;
  nameIt: string;
  nameJp: string;
  iconName: string;
  description: string;
  initialPrompt: string;
  sampleFlow: string[];
  prompts: N5PromptItem[];
}

export const ALL_THEMES_ID = 'tutti_i_temi';

export const N5_TOPICS: N5Topic[] = [
  {
    id: 'presentarsi',
    nameIt: '1. Presentarsi e Conoscersi',
    nameJp: '自己紹介 (Presentazione e persone)',
    iconName: 'UserCheck',
    description: 'Nome, nazionalità, lavoro, età, formule di cortesia e copula です / じゃありません.',
    initialPrompt: 'Piacere di conoscerti. Mi chiamo Mario e sono uno studente.',
    sampleFlow: [
      'Piacere di conoscerti. Mi chiamo Mario e sono uno studente.',
      'Di dove sei?',
      'Vengo dall\'Italia.',
      'Qual è il tuo lavoro?',
      'Quanti anni hai?',
      'Il signor Tanaka è un impiegato d\'azienda.',
      'Non sono un medico, sono un insegnante di inglese.',
      'Molto piacere di fare la tua conoscenza.'
    ],
    prompts: [
      {
        italian: 'Piacere di conoscerti. Mi chiamo Mario e sono uno studente.',
        kanji: '初めまして。マリオです。学生です。',
        kana: 'はじめまして。まりおです。がくせいです。',
        romaji: 'Hajimemashite. Mario desu. Gakusei desu.',
        grammarFocus: 'Formule di presentazione 初めまして e copula です',
        hint: 'Inizia con はじめまして e usa です per il nome e la professione.'
      },
      {
        italian: 'Di dove sei?',
        kanji: 'ご出身はどちらですか。（出身はどこですか）',
        kana: 'ごしゅっしんはどちらですか。',
        romaji: 'Goshusshin wa dochira desu ka?',
        grammarFocus: 'Pronomi interrogativi di provenienza どこ / どちら e particella は',
        hint: 'Usa 出身 (shusshin) con la particella は e どこですか (o どちらですか).'
      },
      {
        italian: 'Vengo dall\'Italia. Sono italiano.',
        kanji: 'イタリアから来ました。イタリア人です。',
        kana: 'イタリアからきました。イタリアじんです。',
        romaji: 'Itaria kara kimashita. Itariajin desu.',
        grammarFocus: 'Particella から (provenienza) e suffisso 人 (nazionalità)',
        hint: 'Aggiungi 人 (jin) al nome del paese per la nazionalità.'
      },
      {
        italian: 'Il signor Tanaka è un impiegato?',
        kanji: '田中さんは会社員ですか。',
        kana: 'たなかさんはかいしゃいんですか。',
        romaji: 'Tanaka-san wa kaishain desu ka?',
        grammarFocus: 'Suffisso onorifico さん, professione 会社員 e particella interrogativa か',
        hint: 'Usa il suffisso さん dopo il cognome e 会社員 (kaishain).'
      },
      {
        italian: 'No, non sono un medico, sono un insegnante.',
        kanji: 'いいえ、医者じゃありません。先生です。',
        kana: 'いいえ、いしゃじゃありません。せんせいです。',
        romaji: 'Iie, isha ja arimasen. Sensei desu.',
        grammarFocus: 'Negazione della copula con 〜じゃありません (o 〜ではありません)',
        hint: 'Usa 医者 (isha) seguito da じゃありません e 先生 (sensei) です.'
      },
      {
        italian: 'Quanti anni hai?',
        kanji: '何歳ですか。（おいくつですか）',
        kana: 'なんさいですか。（おいくつですか）',
        romaji: 'Nansai desu ka? (Oikutsu desu ka?)',
        grammarFocus: 'Contatore dell\'età 歳 (sai) con il pronome 何',
        hint: 'Chiedi con 何歳 (nansai) ですか.'
      }
    ]
  },
  {
    id: 'routine',
    nameIt: '2. Routine Quotidiana e Orari',
    nameJp: '毎日の生活と時間 (Vita e orari)',
    iconName: 'Clock',
    description: 'Orari precisi, svegliarsi, dormire, azioni abituali e particelle に, で, を.',
    initialPrompt: 'A che ora ti svegli ogni mattina?',
    sampleFlow: [
      'A che ora ti svegli ogni mattina?',
      'Ogni mattina mi sveglio alle sette.',
      'Fai colazione a casa verso le sette e mezza?',
      'Bevo il caffè e mangio il pane.',
      'A che ora esci di casa la mattina?',
      'Vado a dormire alle undici di sera.',
      'La mattina leggo sempre il giornale.'
    ],
    prompts: [
      {
        italian: 'A che ora ti svegli ogni mattina?',
        kanji: '毎朝何時に起きますか。',
        kana: 'まいあさなんじにおきますか。',
        romaji: 'Maiasa nanji ni okimasu ka?',
        grammarFocus: 'Orari con 何時 (nanji), particella に per orario preciso e forma 〜ますか',
        hint: 'Usa 毎朝 (maiasa), 何時に (nanji ni) e il verbo 起きます (okimasu).'
      },
      {
        italian: 'Ogni mattina mi sveglio alle sette.',
        kanji: '毎朝七時に起きます。',
        kana: 'まいあさしちじにおきます。',
        romaji: 'Maiasa shichiji ni okimasu.',
        grammarFocus: 'Particella に per orario determinato (七時に)',
        hint: 'Ricorda che 7:00 si legge しちじ (shichiji).'
      },
      {
        italian: 'Fai colazione a casa verso le sette e mezza?',
        kanji: '七時半ごろ、家で朝ご飯を食べますか。',
        kana: 'しちじはんごろ、いえであさごはんをたべますか。',
        romaji: 'Shichijihan goro, ie de asagohan o tabemasu ka?',
        grammarFocus: 'Suffisso 半 (e mezza), ごろ (verso/circa), で (luogo d\'azione) e を (oggetto)',
        hint: 'Usa 家で (ie de) per il luogo e 朝ご飯を食べます (asagohan o tabemasu).'
      },
      {
        italian: 'A che ora vai a dormire la sera?',
        kanji: '毎晩何時に寝ますか。',
        kana: 'まいばんなんじにねますか。',
        romaji: 'Maiban nanji ni nemasu ka?',
        grammarFocus: 'Avverbio di tempo 毎晩 (maiban) e verbo 寝ます (nemasu)',
        hint: 'Usa 毎晩 (maiban) e il verbo 寝ます (nemasu) con la particella interrogativa か.'
      },
      {
        italian: 'Di solito esco di casa alle otto.',
        kanji: 'たいてい八時に家を出ます。',
        kana: 'たいていはちじにいえをでます。',
        romaji: 'Taitei hachiji ni ie o demasu.',
        grammarFocus: 'Frequenza たいてい, orario 八時に e verbo 出ます (uscire)',
        hint: 'Usa 八時に (hachiji ni) e 家を出ます (ie o demasu).'
      }
    ]
  },
  {
    id: 'cibo',
    nameIt: '3. Cibo, Bevande e Ristorante',
    nameJp: '食べ物とレストラン (Cibo e gusti)',
    iconName: 'Utensils',
    description: 'Ordinare pietanze, esprimere preferenze (好き / 嫌い), particelle を, で e が.',
    initialPrompt: 'Cosa ti piace mangiare?',
    sampleFlow: [
      'Cosa ti piace mangiare?',
      'Mi piace molto il ramen giapponese.',
      'Non mi piace molto il pesce crudo.',
      'Oggi mangiamo insieme in quel ristorante?',
      'Un bicchiere d\'acqua e due birre, per favore.',
      'Questo piatto è davvero delizioso!',
      'Mangio con le bacchette.'
    ],
    prompts: [
      {
        italian: 'Cosa ti piace mangiare?',
        kanji: 'どんな食べ物が好きですか。（何が好きですか）',
        kana: 'どんなたべものがすきですか。',
        romaji: 'Donna tabemono ga suki desu ka?',
        grammarFocus: 'Aggettivo in -na 好き con particella が (e non を)',
        hint: 'Con 好き si usa sempre la particella が: 食べ物が好きですか.'
      },
      {
        italian: 'Mi piace molto il ramen giapponese.',
        kanji: '日本のラーメンがとても好きです。',
        kana: 'にほんのらーめんがとてもすきです。',
        romaji: 'Nihon no raamen ga totemo suki desu.',
        grammarFocus: 'Avverbio とても (molto) e aggettivo 好き con particella が',
        hint: 'ラーメンがとても好きです.'
      },
      {
        italian: 'Prendo un caffè e un panino, per favore.',
        kanji: 'コーヒーとサンドイッチをください。',
        kana: 'こーひーとさんどいっちをください。',
        romaji: 'Koohii to sandoitchi o kudasai.',
        grammarFocus: 'Particella と (congiunzione "e") e richiesta 〜をください',
        hint: 'Usa と per unire due sostantivi e をください per ordinare.'
      },
      {
        italian: 'Questo piatto è delizioso ma un po\' piccante.',
        kanji: 'この料理はとても美味しいですが、少し辛いです。',
        kana: 'このりょうりはとてもおいしいですが、すこしからいです。',
        romaji: 'Kono ryouri wa totemo oishii desu ga, sukoshi karai desu.',
        grammarFocus: 'Aggettivi in -i 美味しい (delizioso), 辛い (piccante) e congiunzione が (ma)',
        hint: 'Usa 美味しいですが (è buono ma) e 少し (un po\').'
      },
      {
        italian: 'Mangio il riso con le bacchette.',
        kanji: '箸でご飯を食べます。',
        kana: 'はしでごはんをたべます。',
        romaji: 'Hashi de gohan o tabemasu.',
        grammarFocus: 'Particella で (mezzo o strumento con cui si compie l\'azione)',
        hint: 'Bacchette si dice 箸 (hashi) con la particella で (hashi de).'
      }
    ]
  },
  {
    id: 'acquisti',
    nameIt: '4. Acquisti, Negozi e Contatori',
    nameJp: '買い物・値段・助数詞 (Shopping)',
    iconName: 'ShoppingBag',
    description: 'Prezzi (いくら), dimostrativi (これ/それ/あれ), contatori N5 (つ, 本, 枚, 人, 円).',
    initialPrompt: 'Quanto costa questo ombrello?',
    sampleFlow: [
      'Quanto costa questo ombrello?',
      'Quell\'ombrello laggiù costa tremila yen.',
      'Vorrei comprare tre mele e due bottiglie d\'acqua.',
      'Questo vestito è molto bello ma è caro.',
      'Mi dia due biglietti per favore.'
    ],
    prompts: [
      {
        italian: 'Quanto costa questo ombrello?',
        kanji: 'この傘はいくらですか。',
        kana: 'このかさはいくらですか。',
        romaji: 'Kono kasa wa ikura desu ka?',
        grammarFocus: 'Dimostrativo この + sostantivo e domanda sul prezzo いくらですか',
        hint: 'Usa この傘 (kono kasa) e いくらですか (ikura desu ka).'
      },
      {
        italian: 'Quello laggiù costa tremila yen.',
        kanji: 'あれは三千円です。',
        kana: 'あれはさんぜんえんです。',
        romaji: 'Are wa sanzen-en desu.',
        grammarFocus: 'Pronome dimostrativo lontano あれ e numeri con 円 (sanzen-en)',
        hint: 'あれ (are) indica qualcosa lontano da entrambi, 3000 yen è 三千円 (sanzen-en).'
      },
      {
        italian: 'Vorrei tre mele, per favore.',
        kanji: 'りんごを三つください。',
        kana: 'りんごをみっつください。',
        romaji: 'Ringo o mittsu kudasai.',
        grammarFocus: 'Contatore generico giapponese 三つ (mittsu) e richiesta をください',
        hint: 'Tre oggetti generici si contano con 三つ (mittsu).'
      },
      {
        italian: 'Vorrei due bottiglie di birra e un succo.',
        kanji: 'ビールを二本とジュースを一つください。',
        kana: 'びーるをにほんとじゅーすをひとつください。',
        romaji: 'Biiru o nihon to juusu o hitotsu kudasai.',
        grammarFocus: 'Contatore per oggetti cilindrici e bottiglie 本 (hon/bon/pon)',
        hint: 'Due bottiglie è 二本 (nihon), succo è ジュース (juusu).'
      },
      {
        italian: 'Questa borsa è bella ma un po\' costosa.',
        kanji: 'この鞄はいいですが、少し高いです。',
        kana: 'このかばんはいいですが、すこしたかいです。',
        romaji: 'Kono kaban wa ii desu ga, sukoshi takai desu.',
        grammarFocus: 'Aggettivi in -i e congiunzione avversativa 〜が (ma)',
        hint: 'Borsa è 鞄 (kaban), costoso è 高い (takai).'
      }
    ]
  },
  {
    id: 'casa_oggetti',
    nameIt: '5. Casa, Stanze e Posizioni',
    nameJp: '家と位置 (Posizioni ed esistenza)',
    iconName: 'Home',
    description: 'Esistenza inanimata (あります) vs animata (います), posizioni relative (上, 下, 中, 隣, 間).',
    initialPrompt: 'C\'è un libro sopra la scrivania.',
    sampleFlow: [
      'C\'è un libro sopra la scrivania.',
      'Dov\'è il gatto adesso?',
      'Il gatto è sotto la sedia.',
      'C\'è un supermercato davanti alla stazione.',
      'Tra la banca e la posta c\'è un parco.'
    ],
    prompts: [
      {
        italian: 'C\'è un libro sopra la scrivania.',
        kanji: '机の上に本があります。',
        kana: 'つくえのうえにほんがあります。',
        romaji: 'Tsukue no ue ni hon ga arimasu.',
        grammarFocus: 'Esistenza inanimata con あります, posizione の 上 に',
        hint: 'Scrivania è 机 (tsukue), sopra è 上 (ue), per il libro si usa あります.'
      },
      {
        italian: 'Dov\'è il gatto?',
        kanji: '猫はどこにいますか。',
        kana: 'ねこはどこにいますか。',
        romaji: 'Neko wa doko ni imasu ka?',
        grammarFocus: 'Esistenza animata con います per gli animali e persone',
        hint: 'Per il gatto (animale vivente) si usa います (imasu), mai あります.'
      },
      {
        italian: 'Il gatto è sotto la sedia.',
        kanji: '猫は椅子の下にいます。',
        kana: 'ねこはいすのしたにいます。',
        romaji: 'Neko wa isu no shita ni imasu.',
        grammarFocus: 'Posizione の 下 に (sotto) ed esistenza animata います',
        hint: 'Sedia è 椅子 (isu), sotto è 下 (shita).'
      },
      {
        italian: 'Nella mia stanza non c\'è la televisione.',
        kanji: '私の部屋にテレビはありません。',
        kana: 'わたしのへやにてれびはありません。',
        romaji: 'Watashi no heya ni terebi wa arimasen.',
        grammarFocus: 'Negazione dell\'esistenza inanimata ありません',
        hint: 'Stanza è 部屋 (heya), televisione è テレビ (terebi).'
      },
      {
        italian: 'C\'è una farmacia accanto alla stazione.',
        kanji: '駅の隣に薬屋があります。',
        kana: 'えきのとなりにくすりやがあります。',
        romaji: 'Eki no tonari ni kusuriya ga arimasu.',
        grammarFocus: 'Posizione di adiacenza 隣 (tonari) con particelle の e に',
        hint: 'Accanto si dice 隣 (tonari), stazione è 駅 (eki).'
      }
    ]
  },
  {
    id: 'famiglia',
    nameIt: '6. Famiglia e Relazioni',
    nameJp: '家族と人間関係 (Famiglia)',
    iconName: 'Users',
    description: 'Termini umili vs cortesi (父/お父さん, 母/お母さん), contatore persone (〜人, ひとり, ふたり).',
    initialPrompt: 'Quante persone ci sono nella tua famiglia?',
    sampleFlow: [
      'Quante persone ci sono nella tua famiglia?',
      'Siamo in quattro: padre, madre, una sorella maggiore e io.',
      'Mio padre è un insegnante di scuola.',
      'Tuo fratello minore quanti anni ha?',
      'Mia madre cucina molto bene.'
    ],
    prompts: [
      {
        italian: 'Quante persone ci sono nella tua famiglia?',
        kanji: 'ご家族は何人ですか。',
        kana: 'ごかぞくはなんにんですか。',
        romaji: 'Gokazoku wa nannin desu ka?',
        grammarFocus: 'Contatore delle persone 何人 (nannin) e forma cortese ご家族',
        hint: 'Per la famiglia dell\'interlocutore si dice ご家族 (gokazoku).'
      },
      {
        italian: 'La mia famiglia è composta da quattro persone.',
        kanji: '家族は四人です。',
        kana: 'かぞくはよにんです. ',
        romaji: 'Kazoku wa yonin desu.',
        grammarFocus: 'Pronuncia speciale del contatore 人: 四人 è よにん (yonin)',
        hint: '4 persone si legge よにん (yonin), non yon-nin.'
      },
      {
        italian: 'Mio padre è gentile e mia madre è allegra.',
        kanji: '父は親切で、母は明るいです。',
        kana: 'ちちはしんせつで、はははあかるいです。',
        romaji: 'Chichi wa shinsetsu de, haha wa akarui desu.',
        grammarFocus: 'Termini umili per la propria famiglia 父 (chichi) e 母 (haha)',
        hint: 'Quando parli dei tuoi genitori ad altri, usa 父 (chichi) e 母 (haha).'
      },
      {
        italian: 'Ho due fratelli minori.',
        kanji: '弟が二人います。',
        kana: 'おとうとがふたりいます。',
        romaji: 'Otouto ga futari imasu.',
        grammarFocus: 'Irregolarità del contatore persone: 二人 è ふたり (futari) ed esistenza います',
        hint: 'Due persone si dice 二人 (futari), fratello minore è 弟 (otouto).'
      }
    ]
  },
  {
    id: 'scuola_studio',
    nameIt: '7. Scuola, Studio e Lingue',
    nameJp: '学校・勉強・言語 (Scuola e lingue)',
    iconName: 'GraduationCap',
    description: 'Materie scolastiche, studiare (勉強します), lingua e strumenti con で (日本語で).',
    initialPrompt: 'Studi giapponese ogni giorno?',
    sampleFlow: [
      'Studi giapponese ogni giorno?',
      'Sì, studio giapponese per due ore ogni sera.',
      'Scrivo le lettere con la matita.',
      'Parli in inglese con il professore?',
      'Domani abbiamo un esame difficile.'
    ],
    prompts: [
      {
        italian: 'Studi giapponese ogni giorno?',
        kanji: '毎日日本語を勉強しますか。',
        kana: 'まいにちにほんごをべんきょうしますか。',
        romaji: 'Mainichi nihongo o benkyou shimasu ka?',
        grammarFocus: 'Oggetto con を e verbo suru al cortese 勉強します (studiare)',
        hint: 'Usa 毎日 (mainichi), 日本語を (nihongo o) e 勉強しますか.'
      },
      {
        italian: 'Ogni sera studio per due ore a casa.',
        kanji: '毎晩家で二時間勉強します。',
        kana: 'まいばんいえでにじかんべんきょうします。',
        romaji: 'Maiban ie de nijikan benkyou shimasu.',
        grammarFocus: 'Durata del tempo con 時間 (jikan) e luogo d\'azione con で',
        hint: 'Per la durata di 2 ore si dice 二時間 (nijikan).'
      },
      {
        italian: 'Scrivo questa lettera in giapponese con la penna.',
        kanji: 'ペンで日本語の手紙を書きます。',
        kana: 'ぺんでにほんごのてがみをかきます。',
        romaji: 'Pen de nihongo no tegami o kakimasu.',
        grammarFocus: 'Strumento con で (ペンで) e verbo transitivo 書きます (scrivere)',
        hint: 'Penna è ペン (pen) con la particella で, lettera è 手紙 (tegami).'
      },
      {
        italian: 'L\'esame di domani è molto difficile?',
        kanji: '明日のテストはとても難しいですか。',
        kana: 'あしたのてすとはとてもむずかしいですか。',
        romaji: 'Ashita no tesuto wa totemo muzukashii desu ka?',
        grammarFocus: 'Aggettivo in -i 難しい (muzukashii) e avverbio とても',
        hint: 'Domani è 明日 (ashita), difficile è 難しい (muzukashii).'
      }
    ]
  },
  {
    id: 'lavoro_ufficio',
    nameIt: '8. Lavoro, Ufficio e Professioni',
    nameJp: '仕事と会社 (Lavoro e professioni)',
    iconName: 'Briefcase',
    description: 'Luoghi di lavoro (会社, 銀行, 病院), lavorare (働きます), da... a... (から... まで).',
    initialPrompt: 'Dove lavori di solito?',
    sampleFlow: [
      'Dove lavori di solito?',
      'Lavoro in una banca a Tokyo.',
      'Da che ora a che ora lavori ogni giorno?',
      'Lavoro dalle nove del mattino alle sei di sera.',
      'Oggi ho molto lavoro quindi sono occupato.'
    ],
    prompts: [
      {
        italian: 'Dove lavori di solito?',
        kanji: 'どこで働いていますか。（どこで働きますか）',
        kana: 'どこではたらいていますか。',
        romaji: 'Doko de hataraite imasu ka?',
        grammarFocus: 'Particella で (luogo d\'azione) con il verbo 働きます (lavorare)',
        hint: 'Lavorare si dice 働きます (hatarakimasu) con la particella で.'
      },
      {
        italian: 'Lavoro in una banca dalle nove alle diciotto.',
        kanji: '銀行で九時から六時まで働きます。',
        kana: 'ぎんこうできゅうじからろくじまではたらきます。',
        romaji: 'Ginkou de kyuuji kara rokuji made hatarakimasu.',
        grammarFocus: 'Correlazione から ... まで (dalle ... alle ...) e particella で',
        hint: 'Banca è 銀行 (ginkou), usa から (dalle) e まで (alle).'
      },
      {
        italian: 'Oggi sono molto occupato con il lavoro.',
        kanji: '今日は仕事でとても忙しいです。',
        kana: 'きょうはしごとでとてもいそがしいです。',
        romaji: 'Kyou wa shigoto de totemo isogashii desu.',
        grammarFocus: 'Aggettivo in -i 忙しい (isogashii = occupato/indaffarato)',
        hint: 'Lavoro è 仕事 (shigoto), occupato è 忙しい (isogashii).'
      }
    ]
  },
  {
    id: 'tempo_libero',
    nameIt: '9. Tempo Libero, Hobby e Sport',
    nameJp: '週末と趣味 (Weekend e hobby)',
    iconName: 'Film',
    description: 'Attività ricreative, cinema, musica, sport e avverbi di frequenza (よく, たまに, あまり).',
    initialPrompt: 'Cosa fai di solito durante il fine settimana?',
    sampleFlow: [
      'Cosa fai di solito durante il fine settimana?',
      'Sabato guardo un film con un amico.',
      'Ascolti spesso la musica giapponese?',
      'Non pratico molto lo sport.',
      'La domenica non faccio niente e riposo a casa.'
    ],
    prompts: [
      {
        italian: 'Cosa fai di solito durante il fine settimana?',
        kanji: '週末、たいてい何をしますか。',
        kana: 'しゅうまつ、たいていなにをしますか。',
        romaji: 'Shuumatsu, taitei nani o shimasu ka?',
        grammarFocus: '週末 (fine settimana), pronome 何 (cosa) e verbo します (fare)',
        hint: 'Fine settimana è 週末 (shuumatsu), cosa fai è 何をしますか.'
      },
      {
        italian: 'Sabato guardo un film insieme a un amico.',
        kanji: '土曜日に友達と一緒に映画を見ます。',
        kana: 'どようびにともだちといっしょにえいがをみます。',
        romaji: 'Doyoubi ni tomodachi to issho ni eiga o mimasu.',
        grammarFocus: 'Particella と (compagnia: "insieme a") e verbo 見ます (guardare)',
        hint: 'Usa 友達と一緒に (tomodachi to issho ni) e 映画を見ます.'
      },
      {
        italian: 'Ascolti spesso la musica giapponese?',
        kanji: 'よく日本の音楽を聞きますか。',
        kana: 'よくにほんのおんがくをききますか。',
        romaji: 'Yoku Nihon no ongaku o kikimasu ka?',
        grammarFocus: 'Avverbio di frequenza よく (spesso) e verbo 聞きます (ascoltare)',
        hint: 'Spesso si dice よく (yoku), musica è 音楽 (ongaku).'
      },
      {
        italian: 'Non guardo quasi mai la televisione.',
        kanji: 'あまりテレビを見ません。',
        kana: 'あまりてれびをみません。',
        romaji: 'Amari terebi o mimasen.',
        grammarFocus: 'Avverbio あまり con verbo alla forma negativa cortese 〜ません',
        hint: 'あまり (amari) si costruisce obbligatoriamente con il verbo al negativo (見ません).'
      }
    ]
  },
  {
    id: 'trasporti_viaggi',
    nameIt: '10. Mezzi di Trasporto e Spostamenti',
    nameJp: '交通と旅行 (Mezzi e viaggi)',
    iconName: 'Train',
    description: 'Mezzi con で (電車で, バスで), verbi di moto (行きます, 来ます, 帰ります con へ / に), a piedi (歩いて).',
    initialPrompt: 'Come vai all\'università ogni mattina?',
    sampleFlow: [
      'Come vai all\'università ogni mattina?',
      'Vado in metropolitana, ci vogliono venti minuti.',
      'Vado a scuola a piedi perché è vicina.',
      'La prossima settimana vado a Tokyo con il treno ad alta velocità.',
      'A che ora torni a casa la sera?'
    ],
    prompts: [
      {
        italian: 'Come vai all\'università ogni mattina?',
        kanji: '毎朝、どうやって大学へ行きますか。',
        kana: 'まいあさ、どうやってだいがくへいきますか。',
        romaji: 'Maiasa, douyatte daigaku e ikimasu ka?',
        grammarFocus: 'Espressione どうやって (in che modo/come) e direzione へ 行きます',
        hint: 'Come si dice どうやって (douyatte), università è 大学 (daigaku).'
      },
      {
        italian: 'Vado a scuola in treno.',
        kanji: '電車で学校へ行きます。',
        kana: 'でんしゃでがっこうへいきます。',
        romaji: 'Densha de gakkou e ikimasu.',
        grammarFocus: 'Particella で per mezzo di trasporto e へ/に per destinazione',
        hint: 'Treno è 電車 (densha) con particella で, scuola è 学校 (gakkou).'
      },
      {
        italian: 'Vado alla stazione a piedi.',
        kanji: '歩いて駅へ行きます。',
        kana: 'あるいてえきへいきます。',
        romaji: 'Aruite eki e ikimasu.',
        grammarFocus: 'Forma speciale "a piedi" 歩いて (senza particella で!)',
        hint: 'Attenzione: "a piedi" è 歩いて (aruite) e non vuole la particella で!'
      },
      {
        italian: 'Il mese prossimo andrò a Kyoto con lo Shinkansen.',
        kanji: '来月、新幹線で京都へ行きます。',
        kana: 'らいげつ、しんかんせんできょうとへいきます。',
        romaji: 'Raigetsu, shinkansen de Kyouto e ikimasu.',
        grammarFocus: 'Tempo 来月 (mese prossimo) e mezzo 新幹線で',
        hint: 'Il mese prossimo è 来月 (raigetsu).'
      }
    ]
  },
  {
    id: 'meteo_stagioni',
    nameIt: '11. Meteo, Clima e Stagioni',
    nameJp: '天気と季節 (Meteo e stagioni)',
    iconName: 'CloudSun',
    description: 'Condizioni del tempo (雨, 雪, 晴れ), temperature (暑い, 寒い), stagioni (春, 夏, 秋, 冬).',
    initialPrompt: 'Com\'è il tempo oggi?',
    sampleFlow: [
      'Com\'è il tempo oggi?',
      'Oggi è una bella giornata e fa caldo.',
      'Ieri pioveva molto.',
      'D\'inverno in Giappone fa molto freddo?',
      'Quale stagione ti piace di più tra le quattro?'
    ],
    prompts: [
      {
        italian: 'Com\'è il tempo oggi?',
        kanji: '今日の天気はどうですか。',
        kana: 'きょうのてんきはどうですか。',
        romaji: 'Kyou no tenki wa dou desu ka?',
        grammarFocus: 'Meteo 天気 (tenki) e interrogativo di stato どうですか (com\'è?)',
        hint: 'Meteo si dice 天気 (tenki), com\'è si dice どうですか.'
      },
      {
        italian: 'Oggi fa bel tempo e fa caldo.',
        kanji: '今日はいい天気で、暑いです。',
        kana: 'きょうはいいてんきで、あついです。',
        romaji: 'Kyou wa ii tenki de, atsui desu.',
        grammarFocus: 'Forma sospensiva per nomi/aggettivi in -na (で) e aggettivo 暑い (caldo)',
        hint: 'Bel tempo è いい天気 (ii tenki), caldo (meteo) è 暑い (atsui).'
      },
      {
        italian: 'Ieri pioveva e faceva freddo.',
        kanji: '昨日は雨が降って、寒かったです。',
        kana: 'きのうはあめがふって、さむかったです。',
        romaji: 'Kinou wa ame ga futte, samukatta desu.',
        grammarFocus: 'Passato degli aggettivi in -i: 寒い -> 寒かったです',
        hint: 'Il passato di 寒い (freddo) è 寒かったです (samukatta desu).'
      },
      {
        italian: 'La primavera è la stagione che preferisco.',
        kanji: '春が一番好きです。',
        kana: 'はるがいちばんすきです。',
        romaji: 'Haru ga ichiban suki desu.',
        grammarFocus: 'Superlativo 一番 (il più / preferito) e stagione 春 (haru)',
        hint: 'Primavera è 春 (haru), "il più" è 一番 (ichiban).'
      }
    ]
  },
  {
    id: 'aggettivi_descrizioni',
    nameIt: '12. Aggettivi e Descrizioni (い e な)',
    nameJp: '形容詞と描写 (Aggettivi)',
    iconName: 'Palette',
    description: 'Aggettivi in -i (negativo 〜くない, passato 〜かった) e aggettivi in -na (〜な, 〜じゃない, 〜でした).',
    initialPrompt: 'Questa stanza è molto spaziosa e luminosa.',
    sampleFlow: [
      'Questa stanza è molto spaziosa e luminosa.',
      'Quel film non era affatto interessante.',
      'La biblioteca del campus è molto silenziosa.',
      'Quella macchina nuova non è costosa.',
      'Tokyo è una città molto vivace e famosa.'
    ],
    prompts: [
      {
        italian: 'Questa stanza è molto spaziosa e pulita.',
        kanji: 'この部屋はとても広くて綺麗です。',
        kana: 'このへやはとてもひろくてきれいです。',
        romaji: 'Kono heya wa totemo hirokute kirei desu.',
        grammarFocus: 'Forma di collegamento degli aggettivi in -i: 広い -> 広くて',
        hint: 'Per collegare due aggettivi, l\'aggettivo in -i trasforma la -i in -くて (広くて).'
      },
      {
        italian: 'Quel libro non era interessante.',
        kanji: 'あの本は面白くなかったです。',
        kana: 'あのほんはおもしろくなかったです。',
        romaji: 'Ano hon wa omoshirokunakatta desu.',
        grammarFocus: 'Passato negativo degli aggettivi in -i: 〜くなかったです',
        hint: 'Il passato negativo di 面白い è 面白くなかったです.'
      },
      {
        italian: 'La biblioteca è un posto molto tranquillo.',
        kanji: '図書館はとても静かな所です。',
        kana: 'としょかんはとてもしずかなところです。',
        romaji: 'Toshokan wa totemo shizuka na tokoro desu.',
        grammarFocus: 'Aggettivo in -na che modifica un nome: 静かな + sostantivo',
        hint: 'Davanti a un nome, l\'aggettivo in -na richiede la sillaba な (静かな所).'
      },
      {
        italian: 'Il test di ieri non era facile.',
        kanji: '昨日のテストは簡単じゃありませんでした。',
        kana: 'きのうのてすとはかんたんじゃありませんでした。',
        romaji: 'Kinou no tesuto wa kantan ja arimasen deshita.',
        grammarFocus: 'Passato negativo degli aggettivi in -na: 〜じゃありませんでした',
        hint: 'Facile/semplice è 簡単 (kantan), al passato negativo: 簡単じゃありませんでした.'
      }
    ]
  },
  {
    id: 'date_calendario',
    nameIt: '13. Date, Calendario e Compleanni',
    nameJp: '日付・曜日・カレンダー (Date e giorni)',
    iconName: 'Calendar',
    description: 'Giorni della settimana (月〜日), mesi (1月〜12月), giorni del mese (ついたち, ふつか), compleanni.',
    initialPrompt: 'Che giorno della settimana è oggi?',
    sampleFlow: [
      'Che giorno della settimana è oggi?',
      'Oggi è mercoledì, e domani è giovedì.',
      'Quando è il tuo compleanno?',
      'Il mio compleanno è il quindici maggio.',
      'Lunedì prossimo andiamo insieme a Osaka?'
    ],
    prompts: [
      {
        italian: 'Che giorno della settimana è oggi?',
        kanji: '今日は何曜日ですか。',
        kana: 'きょうはなんようびですか。',
        romaji: 'Kyou wa nanyoubi desu ka?',
        grammarFocus: 'Interrogativo del giorno della settimana 何曜日 (nanyoubi)',
        hint: 'Usa 何曜日 (nanyoubi) ですか.'
      },
      {
        italian: 'Oggi è mercoledì.',
        kanji: '今日は水曜日です。',
        kana: 'きょうはすいようびです。',
        romaji: 'Kyou wa suiyoubi desu.',
        grammarFocus: 'Giorni della settimana N5: 水曜日 (mercoledì)',
        hint: 'Mercoledì è 水曜日 (suiyoubi).'
      },
      {
        italian: 'Quando è il tuo compleanno?',
        kanji: '誕生日はいつですか。',
        kana: 'たんじょうびはいつですか。',
        romaji: 'Tanjoubi wa itsu desu ka?',
        grammarFocus: 'Pronome interrogativo temporale いつ (quando) e sostantivo 誕生日',
        hint: 'Compleanno è 誕生日 (tanjoubi), quando è いつ (itsu).'
      },
      {
        italian: 'Il mio compleanno è il cinque maggio.',
        kanji: '私の誕生日は五月五日です。',
        kana: 'わたしのたんじょうびはごがついつかです。',
        romaji: 'Watashi no tanjoubi wa gogatsu itsuka desu.',
        grammarFocus: 'Mesi (五月 = gogatsu) e lettura irregolare del quinto giorno (五日 = いつか)',
        hint: 'Il 5 del mese si pronuncia いつか (itsuka)!'
      }
    ]
  },
  {
    id: 'inviti_proposte',
    nameIt: '14. Inviti, Proposte e Richieste',
    nameJp: '誘い・提案・依頼 (Inviti e richieste)',
    iconName: 'Coffee',
    description: 'Invitare con 〜ませんか, proporre con 〜ましょう / 〜ましょうか, richieste gentili con 〜てください.',
    initialPrompt: 'Non andiamo insieme a bere un caffè?',
    sampleFlow: [
      'Non andiamo insieme a bere un caffè?',
      'Sì, andiamo!',
      'Mangiamo ramen insieme a pranzo!',
      'Per favore, aspetta un momento qui.',
      'Per favore, ripeti ancora una volta lentamente.'
    ],
    prompts: [
      {
        italian: 'Non andiamo insieme a bere un caffè?',
        kanji: '一緒にコーヒーを飲みに行きませんか。',
        kana: 'いっしょにこーひーをのみにいきませんか。',
        romaji: 'Issho ni koohii o nomi ni ikimasen ka?',
        grammarFocus: 'Forma d\'invito cortese 〜ませんか con scopo di moto (飲みに行きます)',
        hint: 'Insieme è 一緒に (issho ni), l\'invito negativo cortese termina in 〜ませんか.'
      },
      {
        italian: 'Mangiamo ramen insieme a mezzogiorno!',
        kanji: 'お昼に一緒にラーメンを食べましょう！',
        kana: 'おひるにいっしょにらーめんをたべましょう！',
        romaji: 'Ohiru ni issho ni raamen o tabemashou!',
        grammarFocus: 'Forma volitiva/propositiva cortese 〜ましょう (facciamo...!)',
        hint: 'Per proporre "facciamo/mangiamo" si usa la desinenza 〜ましょう (tabemashou).'
      },
      {
        italian: 'Per favore, aspetta un momento.',
        kanji: 'ちょっと待ってください。',
        kana: 'ちょっとまってください。',
        romaji: 'Chotto matte kudasai.',
        grammarFocus: 'Richiesta di cortesia con forma in -te + ください (待つ -> 待って)',
        hint: 'Un momento è ちょっと (chotto), aspettare è 待ってください (matte kudasai).'
      },
      {
        italian: 'Per favore, parla un po\' più lentamente.',
        kanji: 'もう少しゆっくり話してください。',
        kana: 'もうすこしゆっくりはなしてください。',
        romaji: 'Mou sukoshi yukkuri hanashite kudasai.',
        grammarFocus: 'Avverbio ゆっくり (lentamente) e forma in -te + ください (話してください)',
        hint: 'Lentamente è ゆっくり (yukkuri), parla per favore è 話してください.'
      }
    ]
  },
  {
    id: 'citta_indicazioni',
    nameIt: '15. Città, Edifici e Indicazioni Stradali',
    nameJp: '街と道案内 (Città e indicazioni)',
    iconName: 'MapPin',
    description: 'Edifici (駅, 郵便局, 銀行, 公園), direzioni (右, 左, まっすぐ), svoltare (曲がります).',
    initialPrompt: 'Dov\'è l\'ufficio postale?',
    sampleFlow: [
      'Dov\'è l\'ufficio postale?',
      'Gira a destra al prossimo incrocio.',
      'La banca è di fronte alla stazione.',
      'Vai dritto per questa strada per cento metri.',
      'C\'è un parco tranquillo vicino al tempio.'
    ],
    prompts: [
      {
        italian: 'Dov\'è l\'ufficio postale?',
        kanji: '郵便局はどこですか。',
        kana: 'ゆうびんきょくはどこですか。',
        romaji: 'Yuubinkyoku wa doko desu ka?',
        grammarFocus: 'Ufficio postale 郵便局 (yuubinkyoku) e pronome interrogativo どこ',
        hint: 'Ufficio postale si dice 郵便局 (yuubinkyoku).'
      },
      {
        italian: 'Gira a destra al prossimo incrocio.',
        kanji: '次の交差点を右へ曲がってください。',
        kana: 'つぎのこうさてんをみぎへまがってください。',
        romaji: 'Tsugi no kousaten o migi e magatte kudasai.',
        grammarFocus: 'Oggetto di attraversamento con を, direzione へ e verbo 曲がります (girare)',
        hint: 'Prossimo è 次の (tsugi no), incrocio è 交差点 (kousaten), destra è 右 (migi).'
      },
      {
        italian: 'La banca è proprio di fronte alla stazione.',
        kanji: '銀行は駅の前にあります。',
        kana: 'ぎんこうはえきのまえにあります。',
        romaji: 'Ginkou wa eki no mae ni arimasu.',
        grammarFocus: 'Posizione 前 (davanti/di fronte) ed esistenza inanimata あります',
        hint: 'Di fronte si dice 前に (mae ni), stazione è 駅 (eki).'
      },
      {
        italian: 'Per favore, vada sempre dritto.',
        kanji: 'まっすぐ行ってください。',
        kana: 'まっすぐいってください。',
        romaji: 'Massugu itte kudasai.',
        grammarFocus: 'Avverbio di direzione まっすぐ (dritto) e forma in -te 行ってください',
        hint: 'Dritto si dice まっすぐ (massugu).'
      }
    ]
  },
  {
    id: 'salute_corpo',
    nameIt: '16. Salute, Corpo e Benessere',
    nameJp: '健康・体・気分 (Salute e corpo)',
    iconName: 'HeartPulse',
    description: 'Parti del corpo (頭, 目, お腹), sensazioni (痛いです), salute (風邪, 熱), formule (お大事に).',
    initialPrompt: 'Oggi ho un forte mal di testa.',
    sampleFlow: [
      'Oggi ho un forte mal di testa.',
      'Hai la febbre? Riposati bene.',
      'Ieri ho preso il raffreddore, quindi non sono andato a scuola.',
      'Mi fa male la gola da stamattina.',
      'Abbi cura di te! (Guarisci presto!)'
    ],
    prompts: [
      {
        italian: 'Oggi mi fa male la testa.',
        kanji: '今日は頭が痛いです。',
        kana: 'きょうはあたまがいたいです。',
        romaji: 'Kyou wa atama ga itai desu.',
        grammarFocus: 'Parte del corpo + が + aggettivo 痛い (itai = doloroso/fa male)',
        hint: 'Testa è 頭 (atama), fa male è 痛いです (itai desu).'
      },
      {
        italian: 'Hai la febbre?',
        kanji: '熱がありますか。',
        kana: 'ねつがありますか。',
        romaji: 'Netsu ga arimasu ka?',
        grammarFocus: 'Avere la febbre: 熱があります (netsu ga arimasu)',
        hint: 'Febbre si dice 熱 (netsu).'
      },
      {
        italian: 'Ho preso il raffreddore, quindi oggi resto a casa.',
        kanji: '風邪をひきましたから、今日家で休みます。',
        kana: 'かぜをひきましたから、きょういえでやすみます。',
        romaji: 'Kaze o hikimashita kara, kyou ie de yasumimasu.',
        grammarFocus: 'Espressione idiomatica 風邪をひきます e congiunzione causale から (perché/quindi)',
        hint: 'Prendere il raffreddore è 風邪をひきました (kaze o hikimashita).'
      },
      {
        italian: 'Riposati e abbi cura di te!',
        kanji: 'ゆっくり休んで、お大事に。',
        kana: 'ゆっくりやすんで、おだいじに。',
        romaji: 'Yukkuri yasunde, odaiji ni.',
        grammarFocus: 'Formula di augurio ai malati お大事に (odaiji ni)',
        hint: 'La tipica formula giapponese per "guarisci presto" è お大事に (odaiji ni).'
      }
    ]
  }
];

export const N5_PARTICLES_HELP = [
  { particle: 'は (wa)', role: 'Tema principale della frase (parlando di...)' },
  { particle: 'が (ga)', role: 'Soggetto specifico / elemento che risponde a "chi?" o "cosa?" e con 好き/上手' },
  { particle: 'を (o)', role: 'Oggetto diretto di un\'azione transitiva (es. ご飯を食べる)' },
  { particle: 'に (ni)', role: 'Orario preciso, destinazione di moto, luogo di esistenza con あります/います' },
  { particle: 'で (de)', role: 'Luogo in cui si svolge un\'azione, o mezzo/strumento con cui si compie' },
  { particle: 'へ (e)', role: 'Direzione del movimento verso un luogo (es. 日本へ行きます)' },
  { particle: 'と (to)', role: 'Unione completa ("e" tra nomi) o compagnia ("insieme a qualcuno")' },
  { particle: 'も (mo)', role: 'Anche, pure ("anch\'io", "anche questo")' },
  { particle: 'の (no)', role: 'Possesso, specifica o modificatore tra due nomi ("il libro di...")' },
  { particle: 'から / まで', role: 'Da ... a ... (punto di partenza e di arrivo nello spazio o nel tempo)' }
];

/**
 * Returns a random prompt from a topic, preferably avoiding already seen prompts.
 */
export function getDiversePromptForTopic(topicId: string, seenPrompts: string[] = []): { prompt: string; topic: N5Topic } {
  let targetTopic: N5Topic;

  if (topicId === ALL_THEMES_ID) {
    // Choose a random topic from all 16
    targetTopic = N5_TOPICS[Math.floor(Math.random() * N5_TOPICS.length)];
  } else {
    targetTopic = N5_TOPICS.find((t) => t.id === topicId) || N5_TOPICS[0];
  }

  // All available prompts for this topic
  const allPrompts = [
    ...targetTopic.prompts.map((p) => p.italian),
    ...targetTopic.sampleFlow
  ];

  // Filter out seen prompts
  const unseen = allPrompts.filter((p) => !seenPrompts.includes(p));
  const pool = unseen.length > 0 ? unseen : allPrompts;

  const chosenPrompt = pool[Math.floor(Math.random() * pool.length)];

  return {
    prompt: chosenPrompt,
    topic: targetTopic
  };
}

/**
 * Pick a completely diverse next exercise across all N5 topics or within the current topic.
 */
export function getNextExercisePrompt(currentTopicId: string, seenPrompts: string[] = []): string {
  const { prompt } = getDiversePromptForTopic(currentTopicId, seenPrompts);
  return prompt;
}
