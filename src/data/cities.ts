/**
 * City data for the Karvon homepage.
 *
 * Picking a city re-themes the whole page: hero image, accent hue, quick facts,
 * packages, experiences, testimonial and CTA copy. The Uzbek copy is taken
 * verbatim from the design handoff and is meant to move to a CMS later.
 *
 * NOTE: every price, testimonial and name below is a PLACEHOLDER from the
 * handoff and must be replaced with real content before launch.
 */

export type CityKey = 'rim' | 'dubai' | 'istanbul' | 'paris' | 'tokyo' | 'newyork';

export type Package = {
  title: string;
  days: string;
  /** Placeholder price — replace before launch. */
  price: string;
  desc: string;
};

export type Experience = {
  title: string;
  desc: string;
};

export type City = {
  key: CityKey;
  name: string;
  country: string;
  /** OKLCH hue that drives the accent colour for this city. */
  hue: number;
  /** Flight time shown in the hero city list. */
  from: string;
  img: string;
  /** Optional second image for the Packages section; falls back to `img`. */
  img2?: string;
  /** `object-position` for the hero image. */
  pos: string;
  tagline: string;

  season: string;
  visa: string;
  tz: string;
  flight: string;

  packages: [Package, Package, Package];
  experiences: [Experience, Experience, Experience, Experience];
  /** Placeholder testimonial — replace before launch. */
  quote: { text: string; author: string };
};

export const CITIES: City[] = [
  {
    key: 'rim',
    name: 'Rim',
    country: 'Italiya',
    hue: 225,
    from: '6 soat',
    img: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=2000&q=80',
    pos: 'center 50%',
    tagline: "Kolizey soyasida ikki ming yillik tosh ko'chalar va kechki espresso.",
    season: 'Aprel – Iyun, Sentabr – Oktabr',
    visa: 'Shengen vizasi',
    tz: '−4 soat',
    flight: "6 soat, 1 to'xtash",
    packages: [
      {
        title: 'Abadiy shahar',
        days: '4 kun',
        price: '$2 300',
        desc: "Ispan zinapoyasi yonidagi butik mehmonxona, Kolizey va Forum bo'ylab xususiy gid.",
      },
      {
        title: 'Vatikan va Toskana',
        days: '6 kun',
        price: '$3 600',
        desc: 'Vatikan muzeylari ochilishidan oldin, keyin Toskana uzumzorlarida ikki kun.',
      },
      {
        title: "Rim ta'mi",
        days: '3 kun',
        price: '$1 700',
        desc: 'Trastevere oshxonalari, pasta darsi va Rim tomlarida kechki ovqat.',
      },
    ],
    experiences: [
      { title: 'Kolizey yer osti', desc: "Gladiatorlar yo'laklari bo'ylab yopiq tur" },
      { title: 'Sikstin kapellasi', desc: 'Olomonsiz erta tongdagi tashrif' },
      { title: 'Vespa sayri', desc: "Yetti tepalik bo'ylab gid bilan" },
      { title: 'Pasta darsi', desc: "Rimlik oshpaz bilan qo'lda pasta tayyorlash" },
    ],
    quote: {
      text: "Sikstin kapellasida deyarli yolg'iz qoldik. Bunday tongni boshqa hech qayerda ko'rmaganmiz.",
      author: 'Malika va Javlon, Toshkent',
    },
  },
  {
    key: 'dubai',
    name: 'Dubay',
    country: 'BAA',
    hue: 70,
    from: '3 soat',
    img: 'https://images.unsplash.com/photo-1566972638537-8c04edd6aa4d?w=2000&q=80',
    pos: 'center 60%',
    tagline: "Cho'l sukunati va osmono'par minoralar orasidagi oltin oqshomlar.",
    season: 'Noyabr – Mart',
    visa: 'Elektron viza',
    tz: '−1 soat',
    flight: "3 soat to'g'ridan-to'g'ri",
    packages: [
      {
        title: "Oltin cho'l",
        days: '4 kun',
        price: '$1 450',
        desc: "Cho'l kurortida tunash, quyosh botishida tuya safari va yulduzli kechki ovqat.",
      },
      {
        title: 'Osmon ostida',
        days: '3 kun',
        price: '$1 120',
        desc: "Burj Xalifa 148-qavat, Marina bo'ylab yaxta va mualliflik restoranlari.",
      },
      {
        title: 'Oilaviy hafta',
        days: '6 kun',
        price: '$2 300',
        desc: 'Palm Jumeyra kurorti, akvapark va bolalar uchun alohida dastur.',
      },
    ],
    experiences: [
      { title: 'Yaxtada kechki ovqat', desc: 'Marina chiroqlari ostida xususiy yaxta' },
      { title: "Cho'l safari", desc: 'Qumtepalar orasida 4x4 va badaviy lager' },
      { title: 'Oltin bozor', desc: 'Deyra bozorida shaxsiy xarid maslahatchisi' },
      { title: 'Havo shari', desc: "Tongda cho'l uzra parvoz" },
    ],
    quote: {
      text: "Har bir transfer o'z vaqtida, har bir stol oldindan band qilingan edi. Biz faqat dam oldik.",
      author: 'Sardor Rahimov, Samarqand',
    },
  },
  {
    key: 'istanbul',
    name: 'Istanbul',
    country: 'Turkiya',
    hue: 35,
    from: '4 soat',
    img: 'https://images.pexels.com/photos/19161622/pexels-photo-19161622.jpeg?auto=compress&cs=tinysrgb&w=2000',
    pos: 'center 55%',
    tagline: "Ikki qit'a tutashgan joyda Bosfor ustidagi azon va choy hidi.",
    season: 'Aprel – May, Sentabr – Oktabr',
    visa: 'Kerak emas',
    tz: '−2 soat',
    flight: "4 soat to'g'ridan-to'g'ri",
    packages: [
      {
        title: 'Bosfor oqshomi',
        days: '3 kun',
        price: '$780',
        desc: "Bosfor bo'yidagi tarixiy mehmonxona, xususiy qayiq va Sultonahmad bo'ylab gid.",
      },
      {
        title: "Ikki qit'a",
        days: '5 kun',
        price: '$1 190',
        desc: "Yevropa va Osiyo qirg'oqlari, Kapadokiya havo shari bilan.",
      },
      {
        title: "Ta'm sayohati",
        days: '2 kun',
        price: '$540',
        desc: "Qadiqo'y bozori, baliq restoranlari va turk qahvasi ustaxonasi.",
      },
    ],
    experiences: [
      { title: 'Xususiy qayiq', desc: "Quyosh botishida Bosfor bo'ylab" },
      { title: 'Hammom', desc: "Tarixiy hammomda an'anaviy marosim" },
      { title: 'Katta bozor', desc: 'Gilam va mis ustalari bilan uchrashuv' },
      { title: 'Kapadokiya', desc: 'Tongda havo sharida parvoz' },
    ],
    quote: {
      text: "Ayasofiyani olomonsiz ko'rish uchun gid ertalab soat yettida kutib turgan edi.",
      author: 'Dilnoza Karimova, Toshkent',
    },
  },
  {
    key: 'paris',
    name: 'Parij',
    country: 'Fransiya',
    hue: 300,
    from: '7 soat',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2000&q=80',
    pos: 'center 50%',
    tagline: "Sena qirg'og'ida sekin tong, galereyalar va mualliflik oshxonasi.",
    season: 'May – Iyun, Sentabr',
    visa: 'Shengen viza',
    tz: '−3 soat',
    flight: "7 soat, 1 to'xtash",
    packages: [
      {
        title: "Sena bo'yida",
        days: '4 kun',
        price: '$2 100',
        desc: "Saint-Germain'dagi butik mehmonxona, Luvr xususiy turi va kechki kruiz.",
      },
      {
        title: 'Atir va sharob',
        days: '6 kun',
        price: '$3 400',
        desc: 'Parij, Grass atir ustaxonasi va Burgundiya uzumzorlari.',
      },
      {
        title: 'Moda haftasi',
        days: '3 kun',
        price: '$1 850',
        desc: 'Shaxsiy stilist bilan butiklar va Galeries Lafayette tomidan manzara.',
      },
    ],
    experiences: [
      { title: 'Luvr kechasi', desc: 'Muzey yopilgandan keyin xususiy tur' },
      { title: 'Shef stoli', desc: 'Michelin restoranida oshxona yonidagi stol' },
      { title: 'Monmartr', desc: 'Rassomlar mahallasida tonggi sayr' },
      { title: 'Versal', desc: "Bog'lar bo'ylab velosiped va piknik" },
    ],
    quote: {
      text: 'Viza hujjatlaridan tortib restoran bandlovigacha hammasini Karvon hal qildi.',
      author: 'Aziza va Bekzod, Namangan',
    },
  },
  {
    key: 'tokyo',
    name: 'Tokio',
    country: 'Yaponiya',
    hue: 350,
    from: '9 soat',
    img: 'https://images.unsplash.com/photo-1770752609290-264c53dc54a3?w=2000&q=80',
    pos: 'center 65%',
    tagline: "Neon ko'chalar va ming yillik ibodatxonalar sukunati bir shaharda.",
    season: 'Mart – Aprel, Oktabr – Noyabr',
    visa: 'Elektron viza',
    tz: '+4 soat',
    flight: "9 soat, 1 to'xtash",
    packages: [
      {
        title: 'Sakura fasli',
        days: '6 kun',
        price: '$3 200',
        desc: 'Gullagan olcha ostida Tokio va Kioto, sinkansen va riokan mehmonxonasi.',
      },
      {
        title: 'Neon va sukunat',
        days: '4 kun',
        price: '$2 450',
        desc: 'Shibuya, Shinjuku tunlari va Nikko ibodatxonalariga safar.',
      },
      {
        title: "Oshxona yo'li",
        days: '3 kun',
        price: '$1 900',
        desc: 'Tsukiji bozori, omakase kechki ovqat va sake ustaxonasi.',
      },
    ],
    experiences: [
      { title: 'Choy marosimi', desc: "Kiotoda usta bilan an'anaviy choy" },
      { title: 'Omakase', desc: "Sushi ustasining sakkiz o'rinli stoli" },
      { title: 'Onsen', desc: "Fudzi ko'rinadigan issiq buloq" },
      { title: 'Tungi Tokio', desc: "Gid bilan izakaya ko'chalari" },
    ],
    quote: {
      text: "Kiotodagi riokanda tunash safarning eng yodda qolgan kuni bo'ldi.",
      author: 'Javohir Tursunov, Toshkent',
    },
  },
  {
    key: 'newyork',
    name: 'Nyu-York',
    country: 'AQSH',
    hue: 95,
    from: '13 soat',
    img: 'https://images.pexels.com/photos/14426200/pexels-photo-14426200.jpeg?auto=compress&cs=tinysrgb&w=2000',
    pos: 'center 50%',
    tagline: "Manxetten tomlaridan ko'rinadigan, hech qachon uxlamaydigan shahar.",
    season: 'Aprel – Iyun, Sentabr – Dekabr',
    visa: 'AQSH vizasi',
    tz: '−10 soat',
    flight: "13 soat, 1 to'xtash",
    packages: [
      {
        title: 'Manxetten klassikasi',
        days: '5 kun',
        price: '$3 600',
        desc: 'Central Park yonidagi mehmonxona, Brodvey shousi va vertolyot parvozi.',
      },
      {
        title: 'Bayram Nyu-Yorki',
        days: '4 kun',
        price: '$3 100',
        desc: 'Dekabr chiroqlari, Rokfeller muz maydoni va bayram bozorlari.',
      },
      {
        title: "San'at va jaz",
        days: '3 kun',
        price: '$2 200',
        desc: 'MoMA va Met xususiy turi, Garlemda jaz kechasi.',
      },
    ],
    experiences: [
      { title: 'Vertolyot', desc: 'Gudzon daryosi uzra 20 daqiqa' },
      { title: 'Brodvey', desc: "Eng yaxshi o'rinlar va sahna ortiga tashrif" },
      { title: 'Tomdagi kechki ovqat', desc: "Manxetten chiroqlari ko'rinadigan stol" },
      { title: 'Bruklin', desc: 'Mahalliy gid bilan sayr va kofe' },
    ],
    quote: {
      text: "Birinchi marta Amerikaga borayotgan edik. Karvon viza intervyusiga ham tayyorladi.",
      author: "Shahzoda Ergasheva, Farg'ona",
    },
  },
];

/** The image used in the Packages section — `img2` when set, otherwise the hero image. */
export const secondImage = (city: City): string => city.img2 ?? city.img;

/** The accent colour for a city, as used throughout the page. */
export const accentFor = (city: City): string => `oklch(0.80 0.11 ${city.hue})`;
