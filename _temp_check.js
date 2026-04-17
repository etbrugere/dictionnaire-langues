
// ─── DONNÉES INITIALES (issues de tes captures Notion) ───────────────────────
const INITIAL_DATA = [
  // JAPONAIS
  {
    id: "ja_ju_ni", lang: "ja", niveau: "Nouveau",
    word: "十二",
    reading: "じゅうに",
    roman: "jū ni",
    translation: "twelve", category: "nom",
    phrase: "時計は十二時八分前を指しています。",
    phrase_reading: "とけいはじゅうにじはっぷんまえをさしています。",
    phrase_roman: "Tokei wa jū ni-ji ha-ppun mae o sashite imasu.",
    phrase_fr: "The clock reads eight minutes to twelve.",
    audio_word: "audio/ja/ju_ni.mp3", audio_phrase: "audio/ja/ju_ni_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '十二':
  // phrase_2: "一年は十二ヶ月あります。" | reading: "いちねんはじゅうにかげつあります。" | roman: "Ichi-nen wa jū ni-kagetsu arimasu." | transl: "There are twelve months in a year." | audio: "audio/ja/ju_ni_phrase_2.mp3"
  // phrase_3: "数字の十二" | reading: "すうじのじゅうに" | roman: "sūji no jū ni" | transl: "number twelve" | audio: "audio/ja/ju_ni_phrase_3.mp3"
  // phrase_4: "十二時" | reading: "じゅうにじ" | roman: "jū ni-ji" | transl: "twelve o'clock" | audio: "audio/ja/ju_ni_phrase_4.mp3"
  {
    id: "ja_niju_ni", lang: "ja", niveau: "Nouveau",
    word: "二十二",
    reading: "にじゅうに",
    roman: "ni-jū ni",
    translation: "twenty-two", category: "nom",
    phrase: "数字の二十二が地面に描いてある。",
    phrase_reading: "すうじのにじゅうにがじめんにかいてある。",
    phrase_roman: "Sūji no ni-jū ni ga jimen ni kaite aru.",
    phrase_fr: "The number twenty-two is painted on the ground.",
    audio_word: "audio/ja/niju_ni.mp3", audio_phrase: "audio/ja/niju_ni_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '二十二':
  // phrase_2: "数字の二十二" | reading: "すうじのにじゅうに" | roman: "sūji no ni-jū ni" | transl: "number twenty-two" | audio: "audio/ja/niju_ni_phrase_2.mp3"
  {
    id: "ja_taikutsu_shita", lang: "ja", niveau: "Nouveau",
    word: "退屈した",
    reading: "たいくつした",
    roman: "taikutsu shita",
    translation: "bored", category: "expression",
    phrase: "その集団の人たちは、ひどく退屈している。",
    phrase_reading: "そのしゅうだんのひとたちは、ひどくたいくつしている。",
    phrase_roman: "Sono shūdan no hito-tachi wa, hidoku taikutsu shite iru.",
    phrase_fr: "The group of people are extremely bored.",
    audio_word: "audio/ja/taikutsu_shita.mp3", audio_phrase: "audio/ja/taikutsu_shita_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '退屈した':
  // phrase_2: "ひどく退屈した" | reading: "ひどくたいくつした" | roman: "hidoku taikutsu shita" | transl: "extremely bored" | audio: "audio/ja/taikutsu_shita_phrase_2.mp3"
  {
    id: "ja_iku", lang: "ja", niveau: "Nouveau",
    word: "行く",
    reading: "いく",
    roman: "iku",
    translation: "go", category: "verbe",
    phrase: "歩いて、学校に行きます。",
    phrase_reading: "あるいて、がっこうにいきます。",
    phrase_roman: "Aruite, gakkō ni ikimasu.",
    phrase_fr: "I go to school on foot.",
    audio_word: "audio/ja/iku.mp3", audio_phrase: "audio/ja/iku_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '行く':
  // phrase_2: "もう、私の姉妹が空港に行く時間です。" | reading: "もう、わたしのしまいがくうこうにいくじかんです。" | roman: "Mō, watashi no shimai ga kūkō ni iku jikan desu." | transl: "It's time for my sister to go to the airport." | audio: "audio/ja/iku_phrase_2.mp3"
  // phrase_3: "わたしは、町の学校に行っています。" | reading: "わたしは、まちのがっこうにいっています。" | roman: "Watashi wa, machi no gakkō ni itte imasu." | transl: "I go to school in the city." | audio: "audio/ja/iku_phrase_3.mp3"
  // phrase_4: "学校に行く" | reading: "がっこうにいく" | roman: "gakkō ni iku" | transl: " I go to school" | audio: "audio/ja/iku_phrase_4.mp3"
  // phrase_5: "真っすぐ前に行く" | reading: "まっすぐまえにいく" | roman: "massugu mae ni iku" | transl: "go straight ahead" | audio: "audio/ja/iku_phrase_5.mp3"
  // phrase_6: "公園に行く" | reading: "こうえんにいく" | roman: "kōen ni iku" | transl: "go to the park" | audio: "audio/ja/iku_phrase_6.mp3"
  // phrase_7: "行くところが無い" | reading: "いくところがない" | roman: "iku tokoro ga nai" | transl: "nowhere to go" | audio: "audio/ja/iku_phrase_7.mp3"
  {
    id: "ja_ju_ni", lang: "ja", niveau: "Nouveau",
    word: "十二",
    reading: "じゅうに",
    roman: "jū ni",
    translation: "twelve", category: "nom",
    phrase: "時計は十二時八分前を指しています。",
    phrase_reading: "とけいはじゅうにじはっぷんまえをさしています。",
    phrase_roman: "Tokei wa jū ni-ji ha-ppun mae o sashite imasu.",
    phrase_fr: "The clock reads eight minutes to twelve.",
    audio_word: "audio/ja/ju_ni.mp3", audio_phrase: "audio/ja/ju_ni_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '十二':
  // phrase_2: "一年は十二ヶ月あります。" | reading: "いちねんはじゅうにかげつあります。" | roman: "Ichi-nen wa jū ni-kagetsu arimasu." | transl: "There are twelve months in a year." | audio: "audio/ja/ju_ni_phrase_2.mp3"
  // phrase_3: "数字の十二" | reading: "すうじのじゅうに" | roman: "sūji no jū ni" | transl: "number twelve" | audio: "audio/ja/ju_ni_phrase_3.mp3"
  // phrase_4: "十二時" | reading: "じゅうにじ" | roman: "jū ni-ji" | transl: "twelve o'clock" | audio: "audio/ja/ju_ni_phrase_4.mp3"
  {
    id: "ja_banana", lang: "ja", niveau: "Nouveau",
    word: "バナナ",
    reading: "バナナ",
    roman: "banana",
    translation: "banana", category: "nom",
    phrase: "バナナはカリウムが豊富です。",
    phrase_reading: "バナナはカリウムがほうふです。",
    phrase_roman: "Banana wa kariumu ga hōfu desu.",
    phrase_fr: "Bananas are rich in potassium.",
    audio_word: "audio/ja/banana.mp3", audio_phrase: "audio/ja/banana_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'バナナ':
  // phrase_2: "バナナはプディングやケーキなどの料理に使っても良いが、私は生のバナナが一番好きです。" | reading: "バナナはプディングやケーキなどのりょうりにつかってもよいが、わたしはなまのバナナがいちばんすきです。" | roman: "Banana wa pudingu ya kēki nado no ryōri ni tsukatte mo yoi ga, watashi wa nama no banana ga ichi-ban suki desu." | transl: "Bananas are good cooked, in puddings, or in cakes, but I like raw bananas best." | audio: "audio/ja/banana_phrase_2.mp3"
  // phrase_3: "バナナは南国で育てられるが、世界中の人が食べます。" | reading: "バナナはなんごくでそだてられるが、せかいじゅうのひとがたべます。" | roman: "Banana wa nangoku de sodaterareru ga, sekaijū no hito ga tabemasu." | transl: "Bananas are grown in the tropics, but people throughout the world eat them." | audio: "audio/ja/banana_phrase_3.mp3"
  // phrase_4: "熟したバナナと腐ったバナナ" | reading: "じゅくしたバナナとくさったバナナ" | roman: "jukushita banana to kusatta banana" | transl: "a ripe banana and a rotten banana" | audio: "audio/ja/banana_phrase_4.mp3"
  // phrase_5: "バナナブレッド" | reading: "バナナブレッド" | roman: "banana bureddo" | transl: "banana bread" | audio: "audio/ja/banana_phrase_5.mp3"
  // phrase_6: "皮をむいたバナナ" | reading: "かわをむいたバナナ" | roman: "kawa o muita banana" | transl: "peeled banana" | audio: "audio/ja/banana_phrase_6.mp3"
  // phrase_7: "バナナの皮" | reading: "バナナのかわ" | roman: "banana no kawa" | transl: "banana peel" | audio: "audio/ja/banana_phrase_7.mp3"
  
  {
    id: "ja_001", lang: "ja", niveau: "Maîtrisé",
    word: "ギター", reading: "ギター", roman: "gitā",
    translation: "Guitare", category: "Nom",
    phrase: "彼は、ロックバンドでエレキギターを弾いていた。",
    phrase_reading: "かれは、ロックバンドでエレキギターをひいていた。",
    phrase_roman: "Kare wa, rokku bando de erekigitā o hiite ita.",
    phrase_fr: "Il jouait de la guitare électrique dans un groupe de rock.",
    audio_word: "audio/ja/gita.mp3", audio_phrase: "audio/ja/gita_phrase.mp3", notes: ""
  },
  {
    id: "ja_002", lang: "ja", niveau: "Nouveau",
    word: "地下鉄", reading: "がっこう", roman: "chikatetsu",
    translation: "Métro", category: "Nom",
    phrase: "ここから一番近い地下鉄の駅はどこですか？",
    phrase_reading: "ここからいちばんちかいちかてつのえきはどこですか？",
    phrase_roman: "Koko kara ichi-ban chikai chikatetsu no eki wa doko desu ka?",
    phrase_fr: "Quelle est la station de métro la plus proche d'ici ?",
    audio_word: "audio/ja/chikatetsu.mp3", audio_phrase: "audio/ja/chikatetsu_phrase.mp3", notes: ""
  },
  {
    id: "ja_003", lang: "ja", niveau: "En cours",
    word: "水着", reading: "わかる", roman: "mizugi",
    translation: "Maillot de bain", category: "Nom",
    phrase: "ビーチで水着を着るつもりだ。",
    phrase_reading: "にほんごがわかりますか？",
    phrase_roman: "Bīchi de mizugi o kiru tsumori da.",
    phrase_fr: "J'ai l'intention de mettre mon maillot de bain à la plage.",
    audio_word: "audio/ja/mizugi.mp3", audio_phrase: "audio/ja/mizugi_phrase.mp3", notes: ""
  },
  {
    id: "ja_004", lang: "ja", niveau: "Nouveau",
    word: "にわとり", reading: "にわとり", roman: "niwatori",
    translation: "Poule", category: "Nom",
    phrase: "ニワトリとヒヨコが食べ物をついばんでいる。",
    phrase_reading: "ニワトリとヒヨコがたべものをついばんでいる。",
    phrase_roman: "Niwatori to hiyoko ga tabemono o tsuibande iru.",
    phrase_fr: "Une poule et des poussins picorent de la nourriture.",
    audio_word: "audio/ja/niwatori.mp3", audio_phrase: "audio/ja/niwatori_phrase.mp3", notes: ""
  },
  {
    id: "ja_005", lang: "ja", niveau: "Nouveau",
    word: "美術", reading: "びじゅつ    ", roman: "bijutsu",
    translation: "Art, Beaux-Arts", category: "Nom",
    phrase: "私は美術専攻です。",
    phrase_reading: "わたしはびじゅつせんこうです。",
    phrase_roman: "Watashi wa bijutsu senkō desu.",
    phrase_fr: "Je suis étudiant en Beaux-Arts.",
    audio_word: "audio/ja/bijutsu.mp3", audio_phrase: "audio/ja/bijutsu_phrase.mp3", notes: ""
  },
  {
    id: "ja_006", lang: "ja", niveau: "Nouveau",
    word: "庭", reading: "にわ", roman: "niwa",
    translation: "Jardin", category: "Nom",
    phrase: "私は庭付きの家が買いたいです。",
    phrase_reading: "わたしはにわつきのいえがかいたいです。",
    phrase_roman: "Watashi wa niwa tsuki no ie ga kaitai desu.",
    phrase_fr: "Je veux acheter une maison avec un jardin",
    audio_word: "audio/ja/niwa.mp3", audio_phrase: "audio/ja/niwa_phrase.mp3", notes: ""
  },
    {
    id: "ja_006", lang: "ja", niveau: "Nouveau",
    word: "山脈", reading: "さんみゃく", roman: "sanmyaku",
    translation: "Chaîne de montagnes", category: "Nom", 
    phrase: "世界最大の山脈は、実は大西洋のど真ん中にある。",
    phrase_reading: "せかいさいだいのさんみゃくは、じつはたいせいようのどまんなかにある。",
    phrase_roman: "Sekai saidai no sanmyaku wa, jitsu wa Taiseiyō no do-mannaka ni aru.",
    phrase_fr: "La plus grande chaîne de montagnes du monde se trouve en fait en plein milieu de l'océan Atlantique.",
    audio_word: "audio/ja/sanmyaku.mp3", audio_phrase: "audio/ja/sanmyaku_phrase.mp3", notes: ""
  },
   {
    id: "ja_007", lang: "ja", niveau: "Nouveau",
    word: "夜", reading: "よる", roman: "yoru",
    translation: "Nuit", category: "Nom", 
    phrase: "もう夜です。",
    phrase_reading: "もうよるです。",
    phrase_roman: "Mō yoru desu.",
    phrase_fr: "C'est déjà la nuit.",
    audio_word: "audio/ja/yoru.mp3", audio_phrase: "audio/ja/yoru_phrase.mp3", notes: ""
  },
   {
    id: "ja_008", lang: "ja", niveau: "Nouveau",
    word: "雷雨", reading: "らいう", roman: "raiu",
    translation: "Forêt", category: "Nom", 
    phrase: "雷雨が暗い森を照らしている。",
    phrase_reading: "らいうがくらいもりをてらしている。",
    phrase_roman: "Raiu ga kurai mori o terashite iru.",
    phrase_fr: "L'orage illumine la forêt sombre.",
    audio_word: "audio/ja/raiu.mp3", audio_phrase: "audio/ja/raiu_phrase.mp3", notes: ""
  },
    {
    id: "ja_009", lang: "ja", niveau: "Nouveau",
    word: "ねずみ", reading: "ねずみ", roman: "nezumi",
    translation: "Souris", category: "Nom", 
    phrase: "ねずみがぶどうを食べている。",
    phrase_reading: "ねずみがぶどうをたべている。",
    phrase_roman: "Nezumi ga budō o tabete iru.",
    phrase_fr: "Une souris est en train de manger du raisin.",
    audio_word: "audio/ja/nezumi.mp3", audio_phrase: "audio/ja/nezumi_phrase.mp3", notes: ""
  },
     {
    id: "ja_010", lang: "ja", niveau: "Nouveau",
    word: "パン", reading: "ねずみ", roman: "pan",
    translation: "Pain", category: "Nom", 
    phrase: "私は、湖でアヒルに古くなったパンをやる。",
    phrase_reading: "わたしは、みずうみでアヒルにふるくなったパンをやる。",
    phrase_roman: "Watashi wa, mizūmi de ahiru ni furuku natta pan o yaru.",
    phrase_fr: "Je donne du pain rassis aux canards au bord du lac.",
    audio_word: "audio/ja/pan.mp3", audio_phrase: "audio/ja/pan_phrase.mp3", notes: ""
  },
  // MANDARIN
  {
    id: "zh_shehuixue", lang: "zh", niveau: "Nouveau",
    word: "社会学",
    trad: "社會學",
    roman: "shèhuìxué",
    ton: "Ton 4", ton_symbol: "\\",
    translation: "sociology", category: "nom",
    phrase: "社会学是关于人类社会结构和行为的研究。",
    phrase_roman: "Shèhuìxué shì guānyú rénlèi shèhuì jiégòu hé xíngwéi de yánjiū.",
    phrase_trad: "社會學是關於人類社會結構和行為的研究。",
    phrase_fr: "Sociology is the study of human social structure and activity.",
    audio_word: "audio/zh/shehuixue.mp3", audio_phrase: "audio/zh/shehuixue_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '社会学':
  // phrase_2: "社会学研究" | roman: "shèhuìxué yánjiū" | trad: "社會學研究" | transl: "study of sociology" | audio: "audio/zh/shehuixue_phrase_2.mp3"
  {
    id: "zh_t_xu_shan", lang: "zh", niveau: "Nouveau",
    word: "T恤衫",
    trad: "T恤衫",
    roman: "T xù shān",
    ton: "Ton 0+4+1", ton_symbol: "·\\—",
    translation: "T-shirt", category: "nom",
    phrase: "那个蓝色衬衫是棉的。",
    phrase_roman: "Nà ge lánsè chènshān shì mián de.",
    phrase_trad: "那個藍色襯衫是棉的。",
    phrase_fr: "The blue T-shirt is made from cotton.",
    audio_word: "audio/zh/t_xu_shan.mp3", audio_phrase: "audio/zh/t_xu_shan_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'T恤衫':
  // phrase_2: "蓝色T恤" | roman: "lánsè Txù " | trad: "藍色T恤" | transl: "blue T-shirt" | audio: "audio/zh/t_xu_shan_phrase_2.mp3"
  // phrase_3: "棉T-恤衫" | roman: "mián T-xùshān" | trad: "mián T-xùshān" | transl: "cotton T-shirt" | audio: "audio/zh/t_xu_shan_phrase_3.mp3"
  {
    id: "zh_xiangshou", lang: "zh", niveau: "Nouveau",
    word: "享受",
    trad: "享受",
    roman: "xiǎngshòu",
    ton: "Ton 3", ton_symbol: "v",
    translation: "enjoy", category: "verbe",
    phrase: "家人正在享受假日聚餐。",
    phrase_roman: "Jiārén zhèngzài xiǎngshòu jiàrì jùcān.",
    phrase_fr: "The family is enjoying a holiday meal.",
    audio_word: "audio/zh/xiangshou.mp3", audio_phrase: "audio/zh/xiangshou_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '享受':
  // phrase_2: "享受好天气" | roman: "xiǎngshòu hǎo tiānqì" | trad: "享受好天氣" | transl: "enjoy the fine weather" | audio: "audio/zh/xiangshou_phrase_2.mp3"
  // phrase_3: "享用晚餐" | roman: "xiǎngyòng wǎncān" | transl: "enjoy dinner" | audio: "audio/zh/xiangshou_phrase_3.mp3"
  {
    id: "zh_xiaoshuo", lang: "zh", niveau: "Nouveau",
    word: "小说",
    trad: "小說",
    roman: "xiǎoshuō",
    ton: "Ton 3", ton_symbol: "v",
    translation: "novel", category: "nom",
    phrase: "我喜欢悬疑小说。",
    phrase_roman: "Wǒ xǐhuān xuányí xiǎoshuō.",
    phrase_trad: "我喜歡懸疑小說。",
    phrase_fr: "I like suspense novels.",
    audio_word: "audio/zh/xiaoshuo.mp3", audio_phrase: "audio/zh/xiaoshuo_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '小说':
  // phrase_2: "她的最新小说是来自18世纪的浪漫神话。" | roman: "Tā de zuì xīn xiǎoshuō shì láizì shíbā shìjì de làngmàn shénhuà." | trad: "她的最新小說是來自18世紀的浪漫神話。" | transl: "Her new novel is a romance mystery from the 18th century." | audio: "audio/zh/xiaoshuo_phrase_2.mp3"
  // phrase_3: "经典小说" | roman: "jīngdiǎn xiǎoshuō" | trad: "經典小說" | transl: "classic novel" | audio: "audio/zh/xiaoshuo_phrase_3.mp3"
  {
    id: "zh_xiaotiqin", lang: "zh", niveau: "Nouveau",
    word: "小提琴",
    trad: "小提琴",
    roman: "xiǎotíqín",
    ton: "Ton 3", ton_symbol: "v",
    translation: "violin", category: "nom",
    phrase: "小提琴和琴弓",
    phrase_roman: "xiǎotíqín hé qíngōng",
    phrase_fr: "violin and bow",
    audio_word: "audio/zh/xiaotiqin.mp3", audio_phrase: "audio/zh/xiaotiqin_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '小提琴':
  // phrase_2: "小提琴琴弓" | roman: "xiǎotíqín qíngōng" | transl: "violin bow" | audio: "audio/zh/xiaotiqin_phrase_2.mp3"
  {
    id: "zh_toudengcang", lang: "zh", niveau: "Nouveau",
    word: "头等舱",
    trad: "頭等艙",
    roman: "tóuděngcāng",
    ton: "Ton 2", ton_symbol: "/",
    translation: "first class", category: "nom",
    phrase: "飞机的头等舱是最贵的。",
    phrase_roman: "Fēijī de tóuděngcāng shì zuì guì de.",
    phrase_trad: "飛機的頭等艙是最貴的。",
    phrase_fr: "First class seats on an airplane are the most expensive.",
    audio_word: "audio/zh/toudengcang.mp3", audio_phrase: "audio/zh/toudengcang_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '头等舱':
  // phrase_2: "坐头等舱旅行很舒服。" | roman: "Zuò tóuděngcāng lǚxíng hěn shūfú." | trad: "坐頭等艙旅行很舒服。" | transl: "Traveling first class can be very comfortable." | audio: "audio/zh/toudengcang_phrase_2.mp3"
  // phrase_3: "头等舱座位" | roman: "tóuděngcāng zuòwèi" | trad: "頭等艙座位" | transl: "first class seat" | audio: "audio/zh/toudengcang_phrase_3.mp3"
  // phrase_4: "头等舱" | roman: "tóuděngcāng" | trad: "頭等艙" | transl: "first class cabin" | audio: "audio/zh/toudengcang_phrase_4.mp3"
  // phrase_5: "头等舱机票" | roman: "tóuděngcāng jīpiào" | trad: "頭等艙機票" | transl: "first class ticket" | audio: "audio/zh/toudengcang_phrase_5.mp3"
  // phrase_6: "坐头等舱" | roman: "zuò tóuděngcāng" | trad: "坐頭等艙" | transl: "first class travel" | audio: "audio/zh/toudengcang_phrase_6.mp3"
  {
    id: "zh_zhai", lang: "zh", niveau: "Nouveau",
    word: "窄",
    trad: "窄",
    roman: "zhǎi",
    ton: "Ton 3", ton_symbol: "v",
    translation: "narrow", category: "adjectif",
    phrase: "他在一条狭窄的道路上走。",
    phrase_roman: "Tā zài yì tiáo xiázhǎi de dàolù shàng zǒu.",
    phrase_trad: "他在一條狹窄的道路上走。",
    phrase_fr: "The man is hiking on a narrow path.",
    audio_word: "audio/zh/zhai.mp3", audio_phrase: "audio/zh/zhai_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '窄':
  // phrase_2: "这个海峡对游艇来说太窄了。" | roman: "Zhège hǎixiá duì yóutǐng láishuō tài zhǎi le." | trad: "這個海峽對游艇來說太窄了。" | transl: "The straits were too narrow for the cruise ship." | audio: "audio/zh/zhai_phrase_2.mp3"
  // phrase_3: "狭窄的通道" | roman: "xiázhǎi de tōngdào " | trad: "狹窄的通道" | transl: "narrow pass" | audio: "audio/zh/zhai_phrase_3.mp3"
  // phrase_4: "狭窄的海峡" | roman: "xiázhǎi de hǎixiá" | trad: "狹窄的海峽" | transl: "narrow straits" | audio: "audio/zh/zhai_phrase_4.mp3"
  {
    id: "zh_ruanyin", lang: "zh", niveau: "Nouveau",
    word: "软饮",
    trad: "軟飲",
    roman: "ruǎnyǐn",
    ton: "Ton 3", ton_symbol: "v",
    translation: "soft drink", category: "nom",
    phrase: "常见的软饮有可乐、苏打水、冰茶和汽水。",
    phrase_roman: "Chángjiàn de ruǎnyǐn yǒu kělè, sūdǎshuǐ, bīngchá hé qìshuǐ.",
    phrase_trad: "常見的軟飲有可樂、蘇打水、冰茶和汽水。",
    phrase_fr: "Some common soft drinks are colas, sodas, iced tea and flavored water.",
    audio_word: "audio/zh/ruanyin.mp3", audio_phrase: "audio/zh/ruanyin_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '软饮':
  // phrase_2: "软饮不含酒精，它们通常是冰的碳酸饮料。" | roman: "Ruǎnyǐn bù hán jiǔjīng, tāmen tōngcháng shì bīng de tànsuān yǐnliào." | trad: "軟飲不含酒精，它們通常是冰的碳酸飲料。" | transl: "Soft drinks don't contain alcohol, and are usually carbonated and served cold." | audio: "audio/zh/ruanyin_phrase_2.mp3"
  // phrase_3: "加冰的软饮料" | roman: "jiā bīng de ruǎnyǐn" | trad: "加冰的軟飲料" | transl: "soft drink with ice" | audio: "audio/zh/ruanyin_phrase_3.mp3"
  // phrase_4: "碳酸软饮" | roman: "tànsuān ruǎnyǐn" | trad: "碳酸軟飲" | transl: "carbonated soft drink" | audio: "audio/zh/ruanyin_phrase_4.mp3"
  {
    id: "zh_daoyou", lang: "zh", niveau: "Nouveau",
    word: "导游",
    trad: "導游",
    roman: "dǎoyóu",
    ton: "Ton 3", ton_symbol: "v",
    translation: "guide", category: "nom",
    phrase: "导游正在引导大家旅行。",
    phrase_roman: "Dǎoyóu zhèngzài yǐndǎo dàjiā lǚxíng.",
    phrase_trad: "導游正在引導大家旅行。",
    phrase_fr: "The tour guide is conducting a tour.",
    audio_word: "audio/zh/daoyou.mp3", audio_phrase: "audio/zh/daoyou_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '导游':
  // phrase_2: "导游知道很多有趣的信息，可以让您旅途愉快。" | roman: "Dǎoyóu zhīdào hěn duō yǒuqù de xìnxī, kěyǐ ràng nín lǚtú yúkuài." | trad: "導游知道很多有趣的信息，可以讓您旅途愉快。" | transl: "A tour guide will know interesting information that will help you enjoy the trip." | audio: "audio/zh/daoyou_phrase_2.mp3"
  // phrase_3: "雇一个导游" | roman: "gù yí gè dǎoyóu" | trad: "雇一個導游" | transl: "hire a tour guide" | audio: "audio/zh/daoyou_phrase_3.mp3"
  // phrase_4: "知识渊博的导游" | roman: "zhīshí yuānbó de dǎoyóu" | trad: "知識淵博的導游" | transl: "knowledgeable tour guide" | audio: "audio/zh/daoyou_phrase_4.mp3"
  {
    id: "zh_kezhuo", lang: "zh", niveau: "Nouveau",
    word: "课桌",
    trad: "課桌",
    roman: "kèzhuō",
    ton: "Ton 4", ton_symbol: "\\",
    translation: "school desk", category: "nom",
    phrase: "椅子和课桌是连在一起的。",
    phrase_roman: "Yǐzi hé kèzhuō shì liánzài yīqǐ de .",
    phrase_trad: "椅子和課桌是連在一起的 。",
    phrase_fr: "The chair is attached to the school desk.",
    audio_word: "audio/zh/kezhuo.mp3", audio_phrase: "audio/zh/kezhuo_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '课桌':
  // phrase_2: "附带有椅子的课桌" | roman: "fùdài yǒu yǐzi de kèzhuō" | trad: "附帶有椅子的課桌" | transl: "school desk with attached chair" | audio: "audio/zh/kezhuo_phrase_2.mp3"
  {
    id: "zh_motian_dalou", lang: "zh", niveau: "Nouveau",
    word: "摩天大楼",
    trad: "摩天大樓",
    roman: "mótiān dàlóu",
    ton: "Ton 2+4", ton_symbol: "/\\",
    translation: "skyscraper", category: "nom",
    phrase: "并排而立的摩天大楼",
    phrase_roman: "bìngpái érlì de mótiān dàlóu",
    phrase_trad: "並排而立的摩天大樓",
    phrase_fr: "Skyscrapers standing side-by-side.",
    audio_word: "audio/zh/motian_dalou.mp3", audio_phrase: "audio/zh/motian_dalou_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '摩天大楼':
  // phrase_2: "西尔斯大厦是美国最高的摩天大楼。" | roman: "Xī'ěrsī dàshà shì Měiguó zuìgāo de mótiān dàlóu." | trad: "西爾斯大廈是美國最高的摩天大樓。" | transl: "The Sears Tower is the tallest skyscraper in the United States." | audio: "audio/zh/motian_dalou_phrase_2.mp3"
  // phrase_3: "高耸的摩天大楼" | roman: "gāosǒng de mótiān dàlóu" | trad: "高聳的摩天大樓" | transl: "tall skyscraper" | audio: "audio/zh/motian_dalou_phrase_3.mp3"
  {
    id: "zh_shamo", lang: "zh", niveau: "Nouveau",
    word: "沙漠",
    trad: "沙漠",
    roman: "shāmò",
    ton: "Ton 1", ton_symbol: "—",
    translation: "desert", category: "nom",
    phrase: "骆驼在沙漠里走。",
    phrase_roman: "Luòtuo zài shāmò lǐ zǒu.",
    phrase_trad: "駱駝在沙漠裏走。",
    phrase_fr: "The camels are walking in the desert.",
    audio_word: "audio/zh/shamo.mp3", audio_phrase: "audio/zh/shamo_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '沙漠':
  // phrase_2: "沙漠的沙" | roman: "shāmò de shā" | transl: "desert sand" | audio: "audio/zh/shamo_phrase_2.mp3"
  // phrase_3: "热带沙漠" | roman: "rèdài shāmò" | trad: "熱帶沙漠" | transl: "hot desert" | audio: "audio/zh/shamo_phrase_3.mp3"
  {
    id: "zh_shuzhuangtai", lang: "zh", niveau: "Nouveau",
    word: "梳妆台",
    trad: "梳妝台",
    roman: "shūzhuāngtái",
    ton: "Ton 1", ton_symbol: "—",
    translation: "dresser", category: "nom",
    phrase: "那个木质的梳妆台是个古董。",
    phrase_roman: "Nà ge mùzhì de shūzhuāngtái shì ge gǔdǒng.",
    phrase_trad: "那個木質的梳妝台是個古董。",
    phrase_fr: "The wooden dresser is an antique.",
    audio_word: "audio/zh/shuzhuangtai.mp3", audio_phrase: "audio/zh/shuzhuangtai_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '梳妆台':
  // phrase_2: "我的袜子和内衣在我梳妆台最上面的抽屉里。" | roman: "Wǒ de wàzi hé nèiyī zài wǒ shūzhuāngtái zuì shàngmian de chōutì lǐ." | trad: "我的襪子和內衣在我梳妝台最上面的抽屜裏。" | transl: "My socks and underwear are in the top drawer of my dresser." | audio: "audio/zh/shuzhuangtai_phrase_2.mp3"
  // phrase_3: "梳妆台抽屉" | roman: "shūzhuāngtái chōutì" | trad: "梳妝台抽屜" | transl: "dresser drawers" | audio: "audio/zh/shuzhuangtai_phrase_3.mp3"
  // phrase_4: "古老的梳妆台" | roman: "gǔlǎo de shūzhuāngtái" | trad: "古老的梳妝台" | transl: "antique dresser" | audio: "audio/zh/shuzhuangtai_phrase_4.mp3"
  {
    id: "zh_jianzi", lang: "zh", niveau: "Nouveau",
    word: "剪子",
    trad: "剪子",
    roman: "jiǎnzi",
    ton: "Ton 3", ton_symbol: "v",
    translation: "scissors", category: "nom",
    phrase: "理发师正在用剪刀剪头发。",
    phrase_roman: "Lǐfàshī zhèngzài yòng jiǎndāo jiǎn tóufà.",
    phrase_trad: "理髮師正在用剪刀剪頭髮。",
    phrase_fr: "The hair dresser is cutting the hair with scissors.",
    audio_word: "audio/zh/jianzi.mp3", audio_phrase: "audio/zh/jianzi_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '剪子':
  // phrase_2: "用剪刀剪图片。" | roman: "Yòng jiǎndāo jiǎn túpiàn." | trad: "用剪刀剪圖片。" | transl: "Use scissors to cut out the pictures." | audio: "audio/zh/jianzi_phrase_2.mp3"
  // phrase_3: "一把剪刀" | roman: "yì bǎ jiǎndāo" | transl: "pair of scissors" | audio: "audio/zh/jianzi_phrase_3.mp3"
  // phrase_4: "锋利的剪刀" | roman: "fēnglì de jiǎndāo" | trad: "鋒利的剪刀" | transl: "sharp scissors" | audio: "audio/zh/jianzi_phrase_4.mp3"
  {
    id: "zh_weibolu", lang: "zh", niveau: "Nouveau",
    word: "微波炉",
    trad: "微波爐",
    roman: "wēibōlú",
    ton: "Ton 1", ton_symbol: "—",
    translation: "microwave oven", category: "nom",
    phrase: "厨房最方便的设备是微波炉。",
    phrase_roman: "Chúfáng zuì fāngbiàn de shèbèi shì wēibōlú.",
    phrase_trad: "廚房最方便的設備是微波爐。",
    phrase_fr: "The most convenient kitchen appliance is the microwave oven.",
    audio_word: "audio/zh/weibolu.mp3", audio_phrase: "audio/zh/weibolu_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '微波炉':
  // phrase_2: "不锈钢微波炉" | roman: "bùxiùgāng wēibōlú" | trad: "不鏽鋼微波爐" | transl: "stainless steel microwave oven" | audio: "audio/zh/weibolu_phrase_2.mp3"
  {
    id: "zh_qiang", lang: "zh", niveau: "Nouveau",
    word: "墙",
    trad: "牆",
    roman: "qiáng",
    ton: "Ton 2", ton_symbol: "/",
    translation: "wall", category: "nom",
    phrase: "我们的墙上挂着很多幅画。",
    phrase_roman: "Wǒmen de qiáng shàng guàzhe hěn duō fú huà.",
    phrase_trad: "我們的牆上掛著很多幅畫。",
    phrase_fr: "There are a lot of pictures hanging on our walls.",
    audio_word: "audio/zh/qiang.mp3", audio_phrase: "audio/zh/qiang_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '墙':
  // phrase_2: "砖墙" | roman: "zhuānqiáng" | trad: "磚牆" | transl: "brick wall" | audio: "audio/zh/qiang_phrase_2.mp3"
  // phrase_3: "橘色的墙" | roman: "júsè de qiáng " | trad: "橘色的牆" | transl: "orange wall" | audio: "audio/zh/qiang_phrase_3.mp3"
  {
    id: "zh_kafei_ting", lang: "zh", niveau: "Nouveau",
    word: "咖啡厅",
    trad: "咖啡廳",
    roman: "kāfēi tīng",
    ton: "Ton 1+1", ton_symbol: "——",
    translation: "café", category: "nom",
    phrase: "女人们正在室外咖啡厅聊天。",
    phrase_roman: "Nǚrénmen zhèngzài shìwài kāfēitīng liáotiān.",
    phrase_trad: "女人們正在室外咖啡廳聊天。",
    phrase_fr: "The women are talking at the outdoor cafe.",
    audio_word: "audio/zh/kafei_ting.mp3", audio_phrase: "audio/zh/kafei_ting_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour '咖啡厅':
  // phrase_2: "室外咖啡厅" | roman: "shìwài kāfēitīng" | trad: "室外咖啡廳" | transl: "outdoor cafe" | audio: "audio/zh/kafei_ting_phrase_2.mp3"
  
  {
    id: "zh_001", lang: "zh", niveau: "Nouveau",
    word: "吃", roman: "chī",
    ton: "Ton 1", ton_symbol: "—",
    translation: "Manger", category: "Verbe",
    phrase: "我每天吃早饭。",
    phrase_roman: "Wǒ měitiān chī zǎofàn.",
    phrase_fr: "Je mange le petit-déjeuner tous les jours.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "zh_002", lang: "zh", niveau: "Maîtrisé",
    word: "你好", roman: "nǐ hǎo",
    ton: "Ton 3+3", ton_symbol: "vv",
    translation: "Bonjour", category: "Salutation",
    phrase: "你好，我叫小明。",
    phrase_roman: "Nǐ hǎo, wǒ jiào Xiǎomíng.",
    phrase_fr: "Bonjour, je m'appelle Xiaoming.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "zh_003", lang: "zh", niveau: "En cours",
    word: "学习", roman: "xuéxí",
    ton: "Ton 2+2", ton_symbol: "//",
    translation: "Étudier", category: "Verbe",
    phrase: "我每天学习中文。",
    phrase_roman: "Wǒ měitiān xuéxí Zhōngwén.",
    phrase_fr: "J'étudie le chinois tous les jours.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "zh_004", lang: "zh", niveau: "Nouveau",
    word: "工作", roman: "gōngzuò",
    ton: "Ton 1+4", ton_symbol: "—\\",
    translation: "Travailler", category: "Verbe",
    phrase: "我在公司工作。",
    phrase_roman: "Wǒ zài gōngsī gōngzuò.",
    phrase_fr: "Je travaille dans une entreprise.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "zh_005", lang: "zh", niveau: "Nouveau",
    word: "朋友", roman: "péngyou",
    ton: "Ton 2", ton_symbol: "/",
    translation: "Ami(e)", category: "Nom",
    phrase: "她是我最好的朋友。",
    phrase_roman: "Tā shì wǒ zuì hǎo de péngyou.",
    phrase_fr: "Elle est ma meilleure amie.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "zh_006", lang: "zh", niveau: "Nouveau",
    word: "去", roman: "qù",
    ton: "Ton 4", ton_symbol: "\\",
    translation: "Aller", category: "Verbe",
    phrase: "我去超市买东西。",
    phrase_roman: "Wǒ qù chāoshì mǎi dōngxi.",
    phrase_fr: "Je vais au supermarché faire des courses.",
    audio_word: "", audio_phrase: "", notes: ""
  },
   {
    id: "zh_007", lang: "zh", niveau: "Nouveau",
    word: "数学", roman: "shùxué",
    ton: "Ton 2+4", ton_symbol: "/\\",
    translation: "Mathématiques", category: "Nom",
    phrase: "我上学时最喜欢的科目是数学。",
    phrase_roman: "Wǒ shàngxué shí zuì xǐhuān de kēmù shì shùxué .",
    phrase_fr: "À l'école, ma matière préférée était les mathématiques.",
    audio_word: "audio/zh/shuxue.mp3", audio_phrase: "audio/zh/shuxue_phrase.mp3", notes: ""
  },
  // RUSSE
  {
    id: "ru_zmeya", lang: "ru", niveau: "Nouveau",
    word: "змея",
    roman: "zmeya",
    genre: "féminin",
    translation: "snake", category: "nom",
    phrase: "Морская змея плавает возле кораллового рифа.",
    phrase_roman: "Morskaya zmeya plavayet vozle korallovogo rifa.",
    phrase_fr: "The sea snake is swimming near the coral reef.",
    audio_word: "audio/ru/zmeya.mp3", audio_phrase: "audio/ru/zmeya_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'змея':
  // phrase_2: "Гремучая змея свернулась в кольцо и готова напасть." | roman: "Gremuchaya zmeya svernulas' v kol'tso i gotova napast'." | transl: "The rattlesnake is coiled, and ready to strike." | audio: "audio/ru/zmeya_phrase_2.mp3"
  // phrase_3: "Я боюсь змей, потому что они могут быть ядовиты." | roman: "Ya boyus' zmey, potomu chto oni mogut byt' yadovity." | transl: "I am afraid of snakes, because they may be poisonous." | audio: "audio/ru/zmeya_phrase_3.mp3"
  // phrase_4: "свернувшаяся в кольцо гремучая змея" | roman: "svernuvshayasya v kol'tso gremuchaya zmeya" | transl: "coiled rattlesnake" | audio: "audio/ru/zmeya_phrase_4.mp3"
  // phrase_5: "скользкая змея" | roman: "skol'zkaya zmeya" | transl: "slithering snake" | audio: "audio/ru/zmeya_phrase_5.mp3"
  // phrase_6: "змея, свернувшаяся в кольцо" | roman: "zmeya, svernuvshayasya v kol'tso" | transl: "coiled snake" | audio: "audio/ru/zmeya_phrase_6.mp3"
  // phrase_7: "ядовитая змея" | roman: "yadovitaya zmeya" | transl: "poisonous snake" | audio: "audio/ru/zmeya_phrase_7.mp3"
  {
    id: "ru_scheka", lang: "ru", niveau: "Nouveau",
    word: "щека",
    roman: "scheka",
    genre: "féminin",
    translation: "cheek", category: "nom",
    phrase: "Щёки ребенка красные.",
    phrase_roman: "Shchoki rebenka krasnyye.",
    phrase_fr: "The child's cheeks are red.",
    audio_word: "audio/ru/scheka.mp3", audio_phrase: "audio/ru/scheka_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'щека':
  // phrase_2: "У женщины красивые щёки." | roman: "U zhenshchiny krasivyye shchoki." | transl: "The woman has beautiful cheeks." | audio: "audio/ru/scheka_phrase_2.mp3"
  // phrase_3: "веснушки на щеках" | roman: "vesnushki na shchekakh" | transl: "freckles on a cheek" | audio: "audio/ru/scheka_phrase_3.mp3"
  {
    id: "ru_zarplata", lang: "ru", niveau: "Nouveau",
    word: "зарплата",
    roman: "zarplata",
    genre: "féminin",
    translation: "salary", category: "nom",
    phrase: "Какая зарплата?",
    phrase_roman: "Kakaya zarplata?",
    phrase_fr: "How much is the salary?",
    audio_word: "audio/ru/zarplata.mp3", audio_phrase: "audio/ru/zarplata_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'зарплата':
  // phrase_2: "Я получаю небольшую зарплату плюс комиссионные каждый месяц." | roman: "Ya poluchayu nebol'shuyu zarplatu plyus komissionnyye kazhdyy mesyats." | transl: "I receive a small salary plus commissions each month." | audio: "audio/ru/zarplata_phrase_2.mp3"
  // phrase_3: "зарплата наличными" | roman: "zarplata nalichnymi" | transl: "cash salary" | audio: "audio/ru/zarplata_phrase_3.mp3"
  // phrase_4: "месячная зарплата" | roman: "mesyachnaya zarplata" | transl: "monthly salary" | audio: "audio/ru/zarplata_phrase_4.mp3"
  {
    id: "ru_bolen", lang: "ru", niveau: "Nouveau",
    word: "болен",
    roman: "bolen",
    translation: "sick", category: "adverbe",
    phrase: "заболеть гриппом",
    phrase_roman: "bol'noy grippom",
    phrase_fr: "get sick with the flu",
    audio_word: "audio/ru/bolen.mp3", audio_phrase: "audio/ru/bolen_phrase_1.mp3",
    notes: ""
  },
  {
    id: "ru_pochtalon", lang: "ru", niveau: "Nouveau",
    word: "почтальон",
    roman: "pochtal'on",
    genre: "masculin",
    translation: "mailman", category: "nom",
    phrase: "Почтальон доставляет почту.",
    phrase_roman: "Pochtal'on dostavlyayet pochtu.",
    phrase_fr: "The mailman is delivering the mail.",
    audio_word: "audio/ru/pochtalon.mp3", audio_phrase: "audio/ru/pochtalon_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'почтальон':
  // phrase_2: "почтальон в униформе" | roman: "pochtal'on v uniforme" | transl: "mailman in uniform" | audio: "audio/ru/pochtalon_phrase_2.mp3"
  {
    id: "ru_biblioteka", lang: "ru", niveau: "Nouveau",
    word: "библиотека",
    roman: "biblioteka",
    genre: "féminin",
    translation: "library", category: "nom",
    phrase: "Я занимаюсь в библиотеке.",
    phrase_roman: "Ya zanimayus' v biblioteke.",
    phrase_fr: "I am studying at the library.",
    audio_word: "audio/ru/biblioteka.mp3", audio_phrase: "audio/ru/biblioteka_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'библиотека':
  // phrase_2: "Вы можете взять на время книги, CD- или DVD- диски в библиотеке." | roman: "Vy mozhete vzyat' na vremya knigi, CD- ili DVD- diski v biblioteke." | transl: "You can borrow books, CDs, and DVDs from the library." | audio: "audio/ru/biblioteka_phrase_2.mp3"
  // phrase_3: "зал библиотеки со столами" | roman: "zal biblioteki so stolami" | transl: "library room with desks" | audio: "audio/ru/biblioteka_phrase_3.mp3"
  // phrase_4: "библиотечные ресурсы" | roman: "bibliotechnyye resursy" | transl: "library resources" | audio: "audio/ru/biblioteka_phrase_4.mp3"
  {
    id: "ru_nizhneye_belyo", lang: "ru", niveau: "Nouveau",
    word: "нижнее бельё",
    roman: "nizhneye bel'yo",
    genre: "neutre",
    translation: "underwear", category: "expression",
    phrase: "Мои носки и нижнее бельё лежат в верхнем ящике  комода.",
    phrase_roman: "Moi noski i nizhneye bel'yo lezhat v verkhnem yashchike komoda.",
    phrase_fr: "My socks and underwear are in the top drawer of my dresser.",
    audio_word: "audio/ru/nizhneye_belyo.mp3", audio_phrase: "audio/ru/nizhneye_belyo_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'нижнее бельё':
  // phrase_2: "Некоторые люди ходят по дому в нижнем белье." | roman: "Nekotoryye lyudi khodyat po domu v nizhnem bel'ye." | transl: "Some people walk around their homes in their underwear." | audio: "audio/ru/nizhneye_belyo_phrase_2.mp3"
  // phrase_3: "белое нижнее бельё" | roman: "beloye nizhneye bel'yo" | transl: "white underwear" | audio: "audio/ru/nizhneye_belyo_phrase_3.mp3"
  {
    id: "ru_medved", lang: "ru", niveau: "Nouveau",
    word: "медведь",
    roman: "medved'",
    genre: "masculin",
    translation: "bear", category: "nom",
    phrase: "Медведь гризли бежит по реке.",
    phrase_roman: "Medved' grizli bezhit po reke.",
    phrase_fr: "The grizzly bear is running in the river.",
    audio_word: "audio/ru/medved.mp3", audio_phrase: "audio/ru/medved_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'медведь':
  // phrase_2: "Бурый медведь бежит по реке." | roman: "Buryy medved' bezhit po reke." | transl: "The brown bear is running in the river." | audio: "audio/ru/medved_phrase_2.mp3"
  // phrase_3: "Медведи это сильные животные." | roman: "Medvedi eto sil'nyye zhivotnyye." | transl: "Bears are strong animals." | audio: "audio/ru/medved_phrase_3.mp3"
  // phrase_4: "большой бурый медведь" | roman: "bol'shoy buryy medved'" | transl: "big brown bear" | audio: "audio/ru/medved_phrase_4.mp3"
  // phrase_5: "белый полярный медведь" | roman: "belyy polyarnyy medved'" | transl: "white polar bear" | audio: "audio/ru/medved_phrase_5.mp3"
  {
    id: "ru_koza", lang: "ru", niveau: "Nouveau",
    word: "коза",
    roman: "koza",
    genre: "féminin",
    translation: "goat", category: "nom",
    phrase: "Коза на лугу.",
    phrase_roman: "Koza na lugu.",
    phrase_fr: "The goat is in the meadow.",
    audio_word: "audio/ru/koza.mp3", audio_phrase: "audio/ru/koza_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'коза':
  // phrase_2: "Козы играют на ферме." | roman: "Kozy igrayut na ferme." | transl: "The goats are playing on the farm." | audio: "audio/ru/koza_phrase_2.mp3"
  // phrase_3: "белая коза" | roman: "belaya koza" | transl: "white goat" | audio: "audio/ru/koza_phrase_3.mp3"
  {
    id: "ru_tumbochka", lang: "ru", niveau: "Nouveau",
    word: "тумбочка",
    roman: "tumbochka",
    genre: "féminin",
    translation: "nightstand", category: "nom",
    phrase: "Фотография моей жены всегда стоит на моей тумбочке.",
    phrase_roman: "Fotografiya moyey zheny vsegda stoit na moyey tumbochke.",
    phrase_fr: "I keep a picture of my wife on my nightstand.",
    audio_word: "audio/ru/tumbochka.mp3", audio_phrase: "audio/ru/tumbochka_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'тумбочка':
  // phrase_2: "деревянная тумбочка" | roman: "derevyannaya tumbochka" | transl: "wooden nightstand" | audio: "audio/ru/tumbochka_phrase_2.mp3"
  // phrase_3: "лампа на тумбочке" | roman: "lampa na tumbochke" | transl: "nightstand lamp" | audio: "audio/ru/tumbochka_phrase_3.mp3"
  {
    id: "ru_odinnadtsat", lang: "ru", niveau: "Nouveau",
    word: "одиннадцать",
    roman: "odinnadtsat'",
    translation: "eleven", category: "numeral",
    phrase: "Мне одиннадцать  лет.",
    phrase_roman: "Mne odinnadtsat'  let.",
    phrase_fr: "I'm eleven years old.",
    audio_word: "audio/ru/odinnadtsat.mp3", audio_phrase: "audio/ru/odinnadtsat_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'одиннадцать':
  // phrase_2: "число одиннадцать" | roman: "chislo odinnadtsat'" | transl: "number eleven" | audio: "audio/ru/odinnadtsat_phrase_2.mp3"
  // phrase_3: "одиннадцать" | roman: "odinnadtsat'" | transl: "11" | audio: "audio/ru/odinnadtsat_phrase_3.mp3"
  // phrase_4: "одиннадцать свечей" | roman: "odinnadtsat' svechey" | transl: "eleven candles" | audio: "audio/ru/odinnadtsat_phrase_4.mp3"
  {
    id: "ru_sotovyy_telefon", lang: "ru", niveau: "Nouveau",
    word: "сотовый телефон",
    roman: "sotovyy telefon",
    genre: "masculin",
    translation: "cellular phone", category: "expression",
    phrase: "С сотовым телефоном вы можете звонить почти отовсюду.",
    phrase_roman: "S sotovym telefonom vy mozhete zvonit' pochti otovsyudu.",
    phrase_fr: "With a cellular phone, you can make calls from almost anywhere.",
    audio_word: "audio/ru/sotovyy_telefon.mp3", audio_phrase: "audio/ru/sotovyy_telefon_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'сотовый телефон':
  // phrase_2: "счёт за сотовый телефон" | roman: "schot za sotovyy telefon" | transl: "cellular phone bill" | audio: "audio/ru/sotovyy_telefon_phrase_2.mp3"
  // phrase_3: "сотовый телефон с внутренней антенной" | roman: "sotovyy telefon s vnutrenney antennoy" | transl: "cellular phone with an internal antenna" | audio: "audio/ru/sotovyy_telefon_phrase_3.mp3"
  // phrase_4: "сотовый телефон" | roman: "sotovyy telefon" | transl: "cell phone" | audio: "audio/ru/sotovyy_telefon_phrase_4.mp3"
  {
    id: "ru_tsunami", lang: "ru", niveau: "Nouveau",
    word: "цунами",
    roman: "tsunami",
    genre: "neutre",
    translation: "tsunami", category: "nom",
    phrase: "Цунами накрыло город.",
    phrase_roman: "Tsunami nakrylo gorod.",
    phrase_fr: "The tsunami hit the city.",
    audio_word: "audio/ru/tsunami.mp3", audio_phrase: "audio/ru/tsunami_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'цунами':
  // phrase_2: "накрытый цунами" | roman: "nakrytyy tsunami" | transl: "hit by tsunami" | audio: "audio/ru/tsunami_phrase_2.mp3"
  {
    id: "ru_koza", lang: "ru", niveau: "Nouveau",
    word: "коза",
    roman: "koza",
    genre: "féminin",
    translation: "goat", category: "nom",
    phrase: "Коза на лугу.",
    phrase_roman: "Koza na lugu.",
    phrase_fr: "The goat is in the meadow.",
    audio_word: "audio/ru/koza.mp3", audio_phrase: "audio/ru/koza_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'коза':
  // phrase_2: "Козы играют на ферме." | roman: "Kozy igrayut na ferme." | transl: "The goats are playing on the farm." | audio: "audio/ru/koza_phrase_2.mp3"
  // phrase_3: "белая коза" | roman: "belaya koza" | transl: "white goat" | audio: "audio/ru/koza_phrase_3.mp3"
  {
    id: "ru_predplechye", lang: "ru", niveau: "Nouveau",
    word: "предплечье",
    roman: "predplech'ye",
    genre: "neutre",
    translation: "forearm", category: "nom",
    phrase: "У меня есть татуировка в виде сердца на предплечье прямо над запястьем.",
    phrase_roman: "U menya yest' tatuirovka v vide serdtsa na predplech'ye pryamo nad zapyast'yem.",
    phrase_fr: "I have a heart tattooed on my forearm just above the wrist.",
    audio_word: "audio/ru/predplechye.mp3", audio_phrase: "audio/ru/predplechye_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'предплечье':
  // phrase_2: "предплечье и кулак" | roman: "predplech'ye i kulak" | transl: "forearm and fist" | audio: "audio/ru/predplechye_phrase_2.mp3"
  
  {
    id: "ru_konvert", lang: "ru", niveau: "Nouveau",
    word: "конверт",
    roman: "konvert",
    genre: "masculin",
    translation: "envelope", category: "nom",
    phrase: "В конверте, который я получил сегодня, были деньги.",
    phrase_roman: "V konverte, kotoryy ya poluchil segodnya, byli den'gi.",
    phrase_fr: "There was money in the envelope I received today.",
    audio_word: "audio/ru/konvert.mp3", audio_phrase: "audio/ru/konvert_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'конверт':
  // phrase_2: "красный конверт" | roman: "krasnyy konvert" | transl: "red envelope" | audio: "audio/ru/konvert_phrase_2.mp3"
  // phrase_3: "получить конверт" | roman: "poluchit' konvert" | transl: "to receive an envelope" | audio: "audio/ru/konvert_phrase_3.mp3"
  {
    id: "ru_lebed", lang: "ru", niveau: "Nouveau",
    word: "лебедь",
    roman: "lebed'",
    genre: "masculin",
    translation: "swan", category: "nom",
    phrase: "Лебеди плавают на воде.",
    phrase_roman: "Lebedi plavayut na vode.",
    phrase_fr: "The swans are swimming in the water.",
    audio_word: "audio/ru/lebed.mp3", audio_phrase: "audio/ru/lebed_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'лебедь':
  // phrase_2: "Лебеди плавают на озере." | roman: "Lebedi plavayut na ozere." | transl: "The swan is swimming in the lake." | audio: "audio/ru/lebed_phrase_2.mp3"
  // phrase_3: "плывущий лебедь" | roman: "plyvushchiy lebed'" | transl: "swimming swan" | audio: "audio/ru/lebed_phrase_3.mp3"
  // phrase_4: "лебедь с длинной шеей" | roman: "lebed' s dlinnoy sheyey" | transl: "long neck swan" | audio: "audio/ru/lebed_phrase_4.mp3"
  {
    id: "ru_ispuganniy", lang: "ru", niveau: "Nouveau",
    word: "испуганный",
    roman: "ispuganniy",
    translation: "scared", category: "adjectif",
    phrase: "Испуганная женщина защищает своего ребёнка.",
    phrase_roman: "Ispugannaya zhenshchina zashchishchayet svoyego rebyonka.",
    phrase_fr: "The scared woman is protecting her baby.",
    audio_word: "audio/ru/ispuganniy.mp3", audio_phrase: "audio/ru/ispuganniy_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'испуганный':
  // phrase_2: "Девочка напугана." | roman: "Devochka napugana." | transl: "The young girl is scared." | audio: "audio/ru/ispuganniy_phrase_2.mp3"
  // phrase_3: "очень испугаться" | roman: "ochen' ispugat'sya" | transl: "very scared" | audio: "audio/ru/ispuganniy_phrase_3.mp3"
  {
    id: "ru_metropoliten", lang: "ru", niveau: "Nouveau",
    word: "метрополитен",
    roman: "metropoliten",
    genre: "masculin",
    translation: "subway", category: "nom",
    phrase: "Я езжу в офис на метро.",
    phrase_roman: "Ya yezzhu v ofis na metro.",
    phrase_fr: "I take the subway to the office.",
    audio_word: "audio/ru/metropoliten.mp3", audio_phrase: "audio/ru/metropoliten_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'метрополитен':
  // phrase_2: "Я могу объехать на метро под землёй весь город." | roman: "Ya mogu ob\"yekhat' na metro pod zemloy ves' gorod." | transl: "I can ride the subway underground all over the city." | audio: "audio/ru/metropoliten_phrase_2.mp3"
  // phrase_3: "линия метро" | roman: "liniya metro" | transl: "subway line" | audio: "audio/ru/metropoliten_phrase_3.mp3"
  // phrase_4: "вагон метро" | roman: "vagon metro" | transl: "subway car" | audio: "audio/ru/metropoliten_phrase_4.mp3"
  {
    id: "ru_vodopad", lang: "ru", niveau: "Nouveau",
    word: "водопад",
    roman: "vodopad",
    genre: "masculin",
    translation: "waterfall", category: "nom",
    phrase: "Водопад красивый.",
    phrase_roman: "Vodopad krasivyy.",
    phrase_fr: "The waterfall is beautiful.",
    audio_word: "audio/ru/vodopad.mp3", audio_phrase: "audio/ru/vodopad_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'водопад':
  // phrase_2: "водопад в тропическом лесу" | roman: "vodopad v tropicheskom lesu" | transl: "waterfall in a rainforest" | audio: "audio/ru/vodopad_phrase_2.mp3"
  // phrase_3: "ниспадающий водопад" | roman: "nispadayushchiy vodopad" | transl: "flowing waterfall" | audio: "audio/ru/vodopad_phrase_3.mp3"
  
  {
    id: "ru_001", lang: "ru", niveau: "Nouveau",
    word: "говорить", roman: "govorit'",
    translation: "Parler", category: "Verbe",
    phrase: "Я говорю по-французски.",
    phrase_roman: "Ya govoryu po-frantsuzski.",
    phrase_fr: "Je parle français.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "ru_002", lang: "ru", niveau: "Maîtrisé",
    word: "привет", roman: "privet",
    translation: "Salut / Bonjour", category: "Salutation",
    phrase: "Привет, как дела?",
    phrase_roman: "Privet, kak dela?",
    phrase_fr: "Salut, comment ça va ?",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "ru_003", lang: "ru", niveau: "En cours",
    word: "работа", roman: "rabota",
    translation: "Travail", category: "Nom",
    phrase: "Моя работа очень интересная.",
    phrase_roman: "Moya rabota ochen' interesnaya.",
    phrase_fr: "Mon travail est très intéressant.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "ru_004", lang: "ru", niveau: "Nouveau",
    word: "есть", roman: "yest'",
    translation: "Manger / Il y a", category: "Verbe",
    phrase: "Я хочу есть пиццу.",
    phrase_roman: "Ya khochu yest' pitstsu.",
    phrase_fr: "Je veux manger une pizza.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "ru_005", lang: "ru", niveau: "Nouveau",
    word: "красивый", roman: "krasivyy",
    translation: "Beau / Belle", category: "Adjectif",
    phrase: "Это очень красивый город.",
    phrase_roman: "Eto ochen' krasivyy gorod.",
    phrase_fr: "C'est une très belle ville.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "ru_006", lang: "ru", niveau: "Nouveau",
    word: "понимать", roman: "ponimat'",
    translation: "Comprendre", category: "Verbe",
    phrase: "Я не понимаю по-русски.",
    phrase_roman: "Ya ne ponimayu po-russki.",
    phrase_fr: "Je ne comprends pas le russe.",
    audio_word: "", audio_phrase: "", notes: ""
  },
    {
    id: "ru_007", lang: "ru", niveau: "Nouveau",
    word: "песчаная буря", roman: "peschanaya burya",
    translation: "Tempête de sable", category: "Nom", genre: "féminin",
    phrase: "Опустилась песчаная буря.",
    phrase_roman: "Opustilas' peschanaya burya.",
    phrase_fr: "Une tempête de sable s'est abattue.",
    audio_word: "audio/ru/peschanaya_burya.mp3", audio_phrase: "audio/ru/peschanaya_burya_phrase.mp3", notes: ""
  },
  // POLONAIS
  {
    id: "pl_klasowka", lang: "pl", niveau: "Nouveau",
    word: "klasówka",
    genre: "féminin",
    translation: "test", category: "nom",
    phrase: "Klasówka w środę będzie trudna.",
    phrase_fr: "Wednesday's test will be difficult.",
    audio_word: "audio/pl/klasowka.mp3", audio_phrase: "audio/pl/klasowka_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'klasówka':
  // phrase_2: "zaliczyć klasówkę" | transl: "pass a test" | audio: "audio/pl/klasowka_phrase_2.mp3"
  // phrase_3: "pisać klasówkę" | transl: "take a test" | audio: "audio/pl/klasowka_phrase_3.mp3"
  {
    id: "pl_kanapa", lang: "pl", niveau: "Nouveau",
    word: "kanapa",
    genre: "féminin",
    translation: "sofa", category: "nom",
    phrase: "Ta kanapa jest bardzo wygodna.",
    phrase_fr: "This sofa is very comfortable.",
    audio_word: "audio/pl/kanapa.mp3", audio_phrase: "audio/pl/kanapa_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'kanapa':
  // phrase_2: "czerwona kanapa" | transl: "red sofa" | audio: "audio/pl/kanapa_phrase_2.mp3"
  // phrase_3: "kanapa do salonu" | transl: "living room sofa" | audio: "audio/pl/kanapa_phrase_3.mp3"
  {
    id: "pl_pracownik", lang: "pl", niveau: "Nouveau",
    word: "pracownik",
    genre: "masculin",
    translation: "employee", category: "nom",
    phrase: "pracownica",
    phrase_fr: "female employee",
    audio_word: "audio/pl/pracownik.mp3", audio_phrase: "audio/pl/pracownik_phrase_1.mp3",
    notes: ""
  },
  {
    id: "pl_taksowka", lang: "pl", niveau: "Nouveau",
    word: "taksówka",
    genre: "féminin",
    translation: "taxi", category: "nom",
    phrase: "Kobieta wsiada do taksówki.",
    phrase_fr: "The woman is getting in a taxi.",
    audio_word: "audio/pl/taksowka.mp3", audio_phrase: "audio/pl/taksowka_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'taksówka':
  // phrase_2: "wziąć taksówkę" | transl: "take a taxi" | audio: "audio/pl/taksowka_phrase_2.mp3"
  // phrase_3: "wsiadać do taksówki" | transl: "get in a taxi" | audio: "audio/pl/taksowka_phrase_3.mp3"
  // phrase_4: "żółta taksówka" | transl: "yellow taxi" | audio: "audio/pl/taksowka_phrase_4.mp3"
  {
    id: "pl_sobota", lang: "pl", niveau: "Nouveau",
    word: "sobota",
    genre: "féminin",
    translation: "Saturday", category: "nom",
    phrase: "Dziś jest sobota, dziesiąty września.",
    phrase_fr: "Today is Saturday, September 10th.",
    audio_word: "audio/pl/sobota.mp3", audio_phrase: "audio/pl/sobota_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'sobota':
  // phrase_2: "W każdą sobotę przez pięć godzin robię porządki." | transl: "I do housework every Saturday for five hours." | audio: "audio/pl/sobota_phrase_2.mp3"
  // phrase_3: "żadnych planów na sobotę" | transl: "no plans for Saturday" | audio: "audio/pl/sobota_phrase_3.mp3"
  // phrase_4: "sobotnia noc" | transl: "Saturday night" | audio: "audio/pl/sobota_phrase_4.mp3"
  {
    id: "pl_kalendarz", lang: "pl", niveau: "Nouveau",
    word: "kalendarz",
    genre: "masculin",
    translation: "calendar", category: "nom",
    phrase: "Zaznaczyłam naszą rocznicę w kalendarzu.",
    phrase_fr: "I marked our anniversary on the calendar.",
    audio_word: "audio/pl/kalendarz.mp3", audio_phrase: "audio/pl/kalendarz_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'kalendarz':
  // phrase_2: "Zapisz w kalendarzu plany na piątek." | transl: "Write the plans for Friday on the calendar." | audio: "audio/pl/kalendarz_phrase_2.mp3"
  // phrase_3: "kalendarz dzienny" | transl: "day calendar" | audio: "audio/pl/kalendarz_phrase_3.mp3"
  {
    id: "pl_trudny", lang: "pl", niveau: "Nouveau",
    word: "trudny",
    translation: "difficult", category: "adjectif",
    phrase: "Angielski jest trudny.",
    phrase_fr: "English is difficult.",
    audio_word: "audio/pl/trudny.mp3", audio_phrase: "audio/pl/trudny_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'trudny':
  // phrase_2: "Klasówka w środę będzie trudna." | transl: "Wednesday's test will be difficult." | audio: "audio/pl/trudny_phrase_2.mp3"
  // phrase_3: "trudne zadanie" | transl: "difficult problem" | audio: "audio/pl/trudny_phrase_3.mp3"
  // phrase_4: "trudna praca" | transl: "difficult job" | audio: "audio/pl/trudny_phrase_4.mp3"
  // phrase_5: "bardzo trudny" | transl: "very difficult" | audio: "audio/pl/trudny_phrase_5.mp3"
  {
    id: "pl_okulary_przeciwsłoneczne", lang: "pl", niveau: "Nouveau",
    word: "okulary przeciwsłoneczne",
    translation: "sunglasses", category: "expression",
    phrase: "Te okulary są nowe.",
    phrase_fr: "These sunglasses are new.",
    audio_word: "audio/pl/okulary_przeciwsłoneczne.mp3", audio_phrase: "audio/pl/okulary_przeciwsłoneczne_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'okulary przeciwsłoneczne':
  // phrase_2: "tanie okulary przeciwsłoneczne" | transl: "cheap sunglasses" | audio: "audio/pl/okulary_przeciwsłoneczne_phrase_2.mp3"
  {
    id: "pl_ziemia", lang: "pl", niveau: "Nouveau",
    word: "ziemia",
    genre: "féminin",
    translation: "dirt", category: "nom",
    phrase: "Dżdżownice wiją się w ziemi.",
    phrase_fr: "The worms are squirming in the dirt.",
    audio_word: "audio/pl/ziemia.mp3", audio_phrase: "audio/pl/ziemia_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'ziemia':
  // phrase_2: "dżdżownice w ziemi" | transl: "worms in dirt" | audio: "audio/pl/ziemia_phrase_2.mp3"
  
  {
    id: "pl_001", lang: "pl", niveau: "Nouveau",
    word: "pracować", roman: "Pra-tsu-yé v byu-jé od lat.",
    translation: "Travailler", category: "Verbe",
    phrase: "Pracuję w biurze od lat.",
    phrase_roman: "Pra-tsu-yé v byu-jé od lat.",
    phrase_fr: "Je travaille dans un bureau depuis des années.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pl_002", lang: "pl", niveau: "Maîtrisé",
    word: "dziękuję", roman: "djén-ku-yé",
    translation: "Merci", category: "Salutation",
    phrase: "Bardzo dziękuję za pomoc!",
    phrase_roman: "Bard-zo djén-ku-yé za po-mots!",
    phrase_fr: "Merci beaucoup pour l'aide !",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pl_003", lang: "pl", niveau: "En cours",
    word: "rozumieć", roman: "ro-zu-myétch",
    translation: "Comprendre", category: "Verbe",
    phrase: "Nie rozumiem po polsku.",
    phrase_roman: "Nyé ro-zu-myem po pol-sku.",
    phrase_fr: "Je ne comprends pas le polonais.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pl_004", lang: "pl", niveau: "Nouveau",
    word: "przyjaciel", roman: "pshi-ya-tchel",
    translation: "Ami", category: "Nom", genre: "masculin",
    phrase: "To jest mój najlepszy przyjaciel.",
    phrase_roman: "To yest mouy nay-lep-chi pshi-ya-tchel.",
    phrase_fr: "C'est mon meilleur ami.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pl_005", lang: "pl", niveau: "Maîtrisé",
    word: "jeść", roman: "yéchtch",
    translation: "Manger", category: "Verbe",
    phrase: "Lubię jeść polskie jedzenie.",
    phrase_roman: "Lou-byé yéchtch pol-skiè yed-zé-nyé.",
    phrase_fr: "J'aime manger la cuisine polonaise.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pl_006", lang: "pl", niveau: "Nouveau",
    word: "piękny", roman: "pyenk-né",
    translation: "Beau / Belle", category: "Adjectif",
    phrase: "To jest bardzo piękne miasto.",
    phrase_roman: "To yest bard-zo pyenk-né myas-to.",
    phrase_fr: "C'est une très belle ville.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  // PORTUGAIS
  {
    id: "pt_sobrancelha", lang: "pt", niveau: "Nouveau",
    word: "sobrancelha",
    genre: "féminin",
    translation: "eyebrow", category: "nom",
    phrase: "Mulheres normalmente tiram os pelos da sobrancelha.",
    phrase_fr: "Women often pluck their eyebrow hairs.",
    audio_word: "audio/pt/sobrancelha.mp3", audio_phrase: "audio/pt/sobrancelha_phrase_1.mp3",
    notes: ""
  },
  // ── Autres phrases pour 'sobrancelha':
  // phrase_2: "sobrancelha e cílio" | transl: "eyebrow and eyelash" | audio: "audio/pt/sobrancelha_phrase_2.mp3"
  // phrase_3: "sobrancelha grossa" | transl: "thick eyebrows" | audio: "audio/pt/sobrancelha_phrase_3.mp3"
   BR
  {
    id: "pt_001", lang: "pt", niveau: "En cours",
    word: "Embora", roman: "",
    translation: "Bien que / Malgré", category: "Conjonction",
    phrase: "Embora esteja cansada, vou treinar.",
    phrase_roman: "",
    phrase_fr: "Bien que je sois fatiguée, je vais m'entraîner.",
    audio_word: "", audio_phrase: "", notes: "Suivi du subjonctif."
  },
  {
    id: "pt_002", lang: "pt", niveau: "Nouveau",
    word: "Conseguir", roman: "",
    translation: "Réussir / Arriver à", category: "Verbe",
    phrase: "Você consegue fazer isso!",
    phrase_roman: "",
    phrase_fr: "Tu peux y arriver !",
   audio_word: "audio/pt/conseguir.mp3", audio_phrase: "audio/pt/conseguir_phrase.mp3", notes: ""
  },
  {
    id: "pt_003", lang: "pt", niveau: "Maîtrisé",
    word: "Depender", roman: "",
    translation: "Dépendre", category: "Verbe",
    phrase: "Tudo depende da sua atitude.",
    phrase_roman: "",
    phrase_fr: "Tout dépend de ton attitude.",
    audio_word: "", audio_phrase: "", notes: ""
  },
  {
    id: "pt_004", lang: "pt", niveau: "Maîtrisé",
    word: "Cedo", roman: "",
    translation: "Tôt", category: "Expression",
    phrase: "Eu acordo cedo todos os dias.",
    phrase_roman: "",
    phrase_fr: "Je me lève tôt tous les jours.",
    audio_word: "", audio_phrase: "", notes: ""
  }
];

// ─── CATEGORIES PAR LANGUE ────────────────────────────────────────────────────
const CATEGORIES = {
  ja: ['Verbe (ichidan)', 'Verbe (godan)', 'Verbe (irrégulier)', 'Nom', 'Adjectif (い)', 'Adjectif (な)', 'Adverbe', 'Particule', 'Compteur', 'Conjonction', 'Salutation', 'Expression'],
  zh: ['Verbe', 'Nom', 'Adjectif', 'Adverbe', 'Préposition', 'Particule', 'Mesure', 'Conjonction', 'Salutation', 'Expression'],
  ru: ['Verbe', 'Nom', 'Adjectif', 'Adverbe', 'Conjonction', 'Préposition', 'Expression', 'Salutation'],
  pl: ['Verbe', 'Nom', 'Adjectif', 'Adverbe', 'Conjonction', 'Préposition', 'Expression', 'Salutation'],
  pt: ['Verbe', 'Nom', 'Adjectif', 'Adverbe', 'Conjonction', 'Préposition', 'Expression', 'Salutation'],
};

function updateCategorySelect(lang) {
  const sel = document.getElementById('f_category');
  const cats = CATEGORIES[lang] || CATEGORIES.pt;
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

// ─── STORAGE ─────────────────────────────────────────────────────────────────
function loadData() {
  try {
    const saved = localStorage.getItem('langdict_v1');
    return saved ? JSON.parse(saved) : [...INITIAL_DATA];
  } catch { return [...INITIAL_DATA]; }
}

function saveData(data) {
  try { localStorage.setItem('langdict_v1', JSON.stringify(data)); } catch {}
}

// ─── STATE ────────────────────────────────────────────────────────────────────
let words = loadData();
let filterLang = 'all';
let filterNiv = 'all';
let searchQuery = '';

// ─── RENDER ───────────────────────────────────────────────────────────────────
const LANG_NAMES = { ja: '日本語', zh: '中文', ru: 'Русский', pl: 'Polski', pt: 'Português BR' };

function catClass(cat) {
  const c = (cat||'').toLowerCase();
  if (c.includes('verbe')) return 'cat-verbe';
  if (c.includes('nom')) return 'cat-nom';
  if (c.includes('adjectif')) return 'cat-adjectif';
  if (c.includes('salutation')) return 'cat-salutation';
  if (c.includes('conjonction')) return 'cat-conjonction';
  if (c.includes('expression')) return 'cat-expression';
  if (c.includes('adverbe')) return 'cat-adverbe';
  if (c.includes('particule')) return 'cat-particule';
  if (c.includes('préposition') || c.includes('preposition')) return 'cat-preposition';
  if (c.includes('compteur')) return 'cat-compteur';
  if (c.includes('mesure')) return 'cat-mesure';
  return 'cat-nom';
}

function renderAudioBtn(path, label) {
  if (!path) return `<button class="audio-btn" onclick="event.stopPropagation(); playAudioDemo(this, '${label}')" title="Pas d'audio disponible">
    <svg viewBox="0 0 10 10"><polygon points="1,1 9,5 1,9"/></svg>${label}
  </button>`;
  return `<button class="audio-btn" onclick="event.stopPropagation(); playAudio(this, '${path}')">
    <svg viewBox="0 0 10 10"><polygon points="1,1 9,5 1,9"/></svg>${label}
  </button>`;
}

function renderCard(w) {
  let topLine = `<span class="word-main">${w.word}</span>`;
  if (w.reading) topLine += `<span class="word-reading">${w.reading}</span>`;
  if (w.roman) topLine += `<span class="word-roman">${w.roman}</span>`;

  let extraBadge = '';
  if (w.lang === 'zh' && w.ton) {
    extraBadge = `<span class="ton-badge">${w.ton} ${w.ton_symbol||''}</span>`;
  }
  if (w.lang === 'ja' && w.subcat) {
    extraBadge = `<span class="ton-badge">${w.subcat}</span>`;
  }
  if ((w.lang === 'pl' || w.lang === 'ru' || w.lang === 'pt') && w.genre) {
    extraBadge = `<span class="ton-badge">${w.genre}</span>`;
  }

  const nivClass = 'niv-' + (w.niveau||'Nouveau').replace(' ', '.');

  let phraseBlock = '';
  if (w.phrase) {
    phraseBlock = `
      <div class="phrase-block">
        <div class="phrase-label">Phrase exemple</div>
        <div class="phrase-text">${w.phrase}</div>
        ${w.phrase_reading ? `<div class="phrase-roman">${w.phrase_reading}</div>` : ''}
        ${w.phrase_roman && w.phrase_roman !== w.phrase_reading ? `<div class="phrase-roman">${w.phrase_roman}</div>` : ''}
        ${w.phrase_fr ? `<div class="phrase-fr">${w.phrase_fr}</div>` : ''}
      </div>`;
  }

  let audioRow = `<div class="audio-row">
    ${renderAudioBtn(w.audio_word, 'Mot')}
    ${renderAudioBtn(w.audio_phrase, 'Phrase')}
  </div>`;

  let notesBlock = '';
  if (w.notes) {
    notesBlock = `<div class="notes-block">${w.notes}</div>`;
  }

  return `
  <div class="word-card" data-id="${w.id}" onclick="toggleCard(this)">
    <div class="lang-dot ${w.lang}"></div>
    <div class="card-content">
      <div class="card-top">${topLine}</div>
      <div class="card-meta">
        <span class="translation">${w.translation}</span>
        <span class="category-tag ${catClass(w.category)}">${w.category}</span>
        ${extraBadge}
        <span class="niveau-badge ${nivClass}">${w.niveau||'Nouveau'}</span>
      </div>
      <div class="card-expanded">
        ${audioRow}
        ${phraseBlock}
        ${notesBlock}
      </div>
    </div>
  </div>`;
}

function filteredWords() {
  return words.filter(w => {
    if (filterLang !== 'all' && w.lang !== filterLang) return false;
    if (filterNiv !== 'all' && w.niveau !== filterNiv) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (w.word||'').toLowerCase().includes(q)
        || (w.translation||'').toLowerCase().includes(q)
        || (w.roman||'').toLowerCase().includes(q)
        || (w.reading||'').includes(q)
        || (w.phrase||'').toLowerCase().includes(q);
    }
    return true;
  });
}

function render() {
  const list = filteredWords();
  const container = document.getElementById('wordList');
  document.getElementById('entryCount').textContent = `${words.length} entrée${words.length > 1 ? 's' : ''}`;

  if (list.length === 0) {
    container.innerHTML = '<div class="empty">Aucune entrée trouvée.</div>';
    return;
  }

  // Group by language
  const groups = {};
  list.forEach(w => { if (!groups[w.lang]) groups[w.lang] = []; groups[w.lang].push(w); });

  const langOrder = filterLang === 'all' ? ['ja','zh','ru','pl','pt'] : [filterLang];
  container.innerHTML = langOrder
    .filter(l => groups[l])
    .map(l => groups[l].map(renderCard).join(''))
    .join('');
}

// ─── INTERACTIONS ─────────────────────────────────────────────────────────────
function toggleCard(el) {
  const expanded = el.querySelector('.card-expanded');
  if (!expanded) return;
  el.classList.toggle('open');
}

let currentAudio = null;
let currentBtn = null;

function playAudio(btn, path) {
  // Si on reclique sur le même bouton en cours de lecture → pause
  if (currentBtn === btn && currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    btn.classList.remove('playing');
    return;
  }
  // Si on reclique sur le même bouton en pause → reprise
  if (currentBtn === btn && currentAudio && currentAudio.paused) {
    currentAudio.play().catch(() => {});
    btn.classList.add('playing');
    return;
  }
  // Sinon : stop l'audio précédent, lance le nouveau
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentBtn) currentBtn.classList.remove('playing');
  }
  currentAudio = new Audio(path);
  currentBtn = btn;
  btn.classList.add('playing');
  currentAudio.play().catch(() => {});
  currentAudio.onended = () => {
    btn.classList.remove('playing');
    currentAudio = null;
    currentBtn = null;
  };
}

function playAudioDemo(btn, label) {
  btn.classList.add('playing');
  setTimeout(() => btn.classList.remove('playing'), 800);
}

// FILTERS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterLang = btn.dataset.lang;
    render();
    // Ouvre la fiche de référence de la langue filtrée
    document.querySelectorAll('.ref-fiche').forEach(f => {
      if (filterLang === 'all') {
        f.removeAttribute('open');
      } else {
        f.dataset.lang === filterLang ? f.setAttribute('open', '') : f.removeAttribute('open');
      }
    });
  });
});

document.querySelectorAll('.niv-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.niv-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterNiv = btn.dataset.niv;
    render();
  });
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  render();
});

// MODAL
document.getElementById('addBtn').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.add('open');
});
document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('open');
});
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// Lang-specific fields toggle
document.getElementById('f_lang').addEventListener('change', function() {
  document.querySelectorAll('.lang-fields').forEach(f => f.classList.remove('visible'));
  const el = document.getElementById('fields_' + this.value);
  if (el) el.classList.add('visible');
  updateCategorySelect(this.value);
});
// Init
document.getElementById('fields_ja').classList.add('visible');
updateCategorySelect('ja');

document.getElementById('saveBtn').addEventListener('click', () => {
  const lang = document.getElementById('f_lang').value;
  const word = document.getElementById('f_word').value.trim();
  if (!word) { alert('Le mot est requis.'); return; }

  const entry = {
    id: lang + '_' + Date.now(),
    lang,
    niveau: document.getElementById('f_niveau').value,
    word,
    roman: document.getElementById('f_roman').value.trim(),
    translation: document.getElementById('f_translation').value.trim(),
    category: document.getElementById('f_category').value,
    phrase: document.getElementById('f_phrase').value.trim(),
    phrase_roman: document.getElementById('f_phrase_roman').value.trim(),
    phrase_fr: document.getElementById('f_phrase_fr').value.trim(),
    audio_word: document.getElementById('f_audio_word').value.trim(),
    audio_phrase: document.getElementById('f_audio_phrase').value.trim(),
    notes: document.getElementById('f_notes').value.trim(),
  };

  if (lang === 'ja') {
    entry.reading = document.getElementById('f_ja_hira').value.trim();
    entry.subcat = document.getElementById('f_ja_subcat').value.trim();
  }
  if (lang === 'zh') {
    entry.ton = document.getElementById('f_zh_ton').value.trim();
    entry.ton_symbol = document.getElementById('f_zh_ton_symbol').value.trim();
  }
  if (lang === 'pl') {
    entry.genre = document.getElementById('f_pl_genre').value;
  }
  if (lang === 'ru') {
    entry.genre = document.getElementById('f_ru_genre').value;
  }
  if (lang === 'pt') {
    entry.genre = document.getElementById('f_pt_genre').value;
  }

  words.unshift(entry);
  saveData(words);
  document.getElementById('modalOverlay').classList.remove('open');
  // Reset form
  ['f_word','f_roman','f_translation','f_phrase','f_phrase_roman','f_phrase_fr',
   'f_audio_word','f_audio_phrase','f_notes','f_ja_hira','f_ja_subcat',
   'f_zh_ton','f_zh_ton_symbol','f_ru_decl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  render();
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
render();
