// Реальные фото заказчика (Google Drive, 91 файл). n — номер файла: /img/wNN.jpg
export type WorkCat = "kitchen" | "bath" | "living" | "hall" | "commercial" | "detail";

export const WORK_CATS: { id: WorkCat | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "kitchen", label: "Кухни" },
  { id: "bath", label: "Санузлы" },
  { id: "living", label: "Спальни и гостиные" },
  { id: "hall", label: "Прихожие" },
  { id: "commercial", label: "Коммерция" },
  { id: "detail", label: "Детали" },
];

export const WORKS: { n: number; cat: WorkCat; w: number; h: number }[] = [
  { n: 0, cat: "kitchen", w: 640, h: 480 },
  { n: 1, cat: "hall", w: 640, h: 853 },
  { n: 2, cat: "kitchen", w: 640, h: 853 },
  { n: 3, cat: "kitchen", w: 640, h: 480 },
  { n: 4, cat: "bath", w: 640, h: 853 },
  { n: 5, cat: "hall", w: 640, h: 853 },
  { n: 6, cat: "detail", w: 640, h: 954 },
  { n: 7, cat: "kitchen", w: 640, h: 428 },
  { n: 8, cat: "living", w: 640, h: 853 },
  { n: 9, cat: "bath", w: 640, h: 853 },
  { n: 10, cat: "kitchen", w: 586, h: 1040 },
  { n: 11, cat: "bath", w: 640, h: 960 },
  { n: 12, cat: "kitchen", w: 585, h: 1040 },
  { n: 13, cat: "kitchen", w: 640, h: 853 },
  { n: 14, cat: "kitchen", w: 640, h: 853 },
  { n: 15, cat: "kitchen", w: 640, h: 853 },
  { n: 16, cat: "kitchen", w: 640, h: 853 },
  { n: 17, cat: "living", w: 640, h: 853 },
  { n: 18, cat: "detail", w: 640, h: 853 },
  { n: 19, cat: "bath", w: 640, h: 853 },
  { n: 20, cat: "detail", w: 640, h: 853 },
  { n: 21, cat: "commercial", w: 585, h: 1040 },
  { n: 22, cat: "commercial", w: 585, h: 1040 },
  { n: 23, cat: "commercial", w: 585, h: 1040 },
  { n: 24, cat: "bath", w: 640, h: 853 },
  { n: 25, cat: "bath", w: 640, h: 853 },
  { n: 26, cat: "bath", w: 640, h: 853 },
  { n: 27, cat: "living", w: 640, h: 853 },
  { n: 28, cat: "living", w: 640, h: 853 },
  { n: 29, cat: "bath", w: 640, h: 853 },
  { n: 30, cat: "bath", w: 640, h: 853 },
  { n: 31, cat: "bath", w: 640, h: 853 },
  { n: 32, cat: "bath", w: 640, h: 853 },
  { n: 33, cat: "bath", w: 640, h: 853 },
  { n: 34, cat: "bath", w: 640, h: 853 },
  { n: 35, cat: "bath", w: 640, h: 853 },
  { n: 36, cat: "detail", w: 640, h: 853 },
  { n: 37, cat: "detail", w: 640, h: 853 },
  { n: 38, cat: "bath", w: 640, h: 853 },
  { n: 39, cat: "bath", w: 640, h: 853 },
  { n: 40, cat: "bath", w: 640, h: 853 },
  { n: 41, cat: "bath", w: 640, h: 853 },
  { n: 42, cat: "bath", w: 640, h: 853 },
  { n: 43, cat: "detail", w: 640, h: 853 },
  { n: 44, cat: "bath", w: 640, h: 853 },
  { n: 45, cat: "bath", w: 640, h: 853 },
  { n: 46, cat: "bath", w: 640, h: 853 },
  { n: 47, cat: "bath", w: 640, h: 853 },
  { n: 48, cat: "bath", w: 640, h: 853 },
  { n: 49, cat: "bath", w: 640, h: 853 },
  { n: 50, cat: "bath", w: 640, h: 853 },
  { n: 51, cat: "bath", w: 640, h: 853 },
  { n: 52, cat: "bath", w: 640, h: 853 },
  { n: 53, cat: "bath", w: 640, h: 853 },
  { n: 54, cat: "bath", w: 640, h: 853 },
  { n: 55, cat: "bath", w: 640, h: 853 },
  { n: 56, cat: "bath", w: 640, h: 853 },
  { n: 57, cat: "bath", w: 640, h: 853 },
  { n: 58, cat: "bath", w: 640, h: 853 },
  { n: 59, cat: "bath", w: 640, h: 853 },
  { n: 60, cat: "bath", w: 640, h: 853 },
  { n: 61, cat: "kitchen", w: 640, h: 853 },
  { n: 62, cat: "detail", w: 640, h: 853 },
  { n: 63, cat: "bath", w: 640, h: 853 },
  { n: 64, cat: "kitchen", w: 640, h: 480 },
  { n: 65, cat: "bath", w: 640, h: 853 },
  { n: 66, cat: "bath", w: 640, h: 853 },
  { n: 67, cat: "bath", w: 640, h: 853 },
  { n: 68, cat: "bath", w: 640, h: 853 },
  { n: 69, cat: "bath", w: 640, h: 853 },
  { n: 70, cat: "bath", w: 640, h: 853 },
  { n: 71, cat: "bath", w: 640, h: 853 },
  { n: 72, cat: "detail", w: 640, h: 853 },
  { n: 73, cat: "detail", w: 640, h: 853 },
  { n: 74, cat: "bath", w: 640, h: 853 },
  { n: 75, cat: "bath", w: 640, h: 853 },
  { n: 76, cat: "bath", w: 640, h: 853 },
  { n: 77, cat: "bath", w: 640, h: 853 },
  { n: 78, cat: "detail", w: 640, h: 853 },
  { n: 79, cat: "detail", w: 640, h: 853 },
  { n: 80, cat: "bath", w: 640, h: 853 },
  { n: 81, cat: "bath", w: 640, h: 853 },
  { n: 82, cat: "bath", w: 640, h: 480 },
  { n: 83, cat: "hall", w: 640, h: 480 },
  { n: 84, cat: "hall", w: 640, h: 480 },
  { n: 85, cat: "living", w: 640, h: 960 },
  { n: 86, cat: "bath", w: 640, h: 960 },
  { n: 87, cat: "living", w: 640, h: 960 },
  { n: 88, cat: "living", w: 640, h: 960 },
  { n: 89, cat: "kitchen", w: 640, h: 960 },
  { n: 90, cat: "bath", w: 640, h: 960 },
];

export const workSrc = (n: number) => `/img/w${String(n).padStart(2, "0")}.jpg`;

// Объекты: фото сгруппированы по сериям съёмки. Описания (задача, исходные данные, что сделали,
// особенности, результат) заказчик пока не прислал — заполните поля, и они появятся в карточке кейса.
export type WorkObject = {
  id: string;
  title: string;
  rooms: string;
  cover: number;
  photos: number[];
  task?: string;
  input?: string;
  done?: string;
  features?: string;
  result?: string;
};

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const DETAILS_TRAVERTINE = [72, 73, 78, 79];

export const OBJECTS: WorkObject[] = [
  { id: "graphite", title: "Квартира в графитовых тонах с терракотовыми акцентами", rooms: "Гостиная, кухня-столовая, спальня, санузлы", cover: 87, photos: [87, 88, 89, 85, 86, 90] },
  {
    id: "travertine",
    title: "Мастер-ванная и гостевой санузел",
    rooms: "Ванная, душевая, гостевой санузел",
    cover: 76,
    photos: [76, 77, 44, 45, 46, 47, 48, ...range(49, 60), 63, ...range(65, 81).filter((n) => !DETAILS_TRAVERTINE.includes(n) && n !== 76 && n !== 77), ...DETAILS_TRAVERTINE, 62, ...range(30, 43)],
  },
  { id: "loft", title: "Квартира с бетонным потолком и кухней в стеклянном кубе", rooms: "Кухня-столовая, спальня, ванная", cover: 13, photos: range(13, 20) },
  { id: "island", title: "Квартира с кухней-островом и реечным потолком", rooms: "Кухня-гостиная, коридор, гардеробная, санузел", cover: 3, photos: [3, 1, 2, 4, 5] },
  { id: "white-kitchen", title: "Светлая кухня с чёрным стеклом", rooms: "Кухня", cover: 64, photos: [64, 61, 7, 10] },
  { id: "restaurant", title: "Ресторан", rooms: "Коммерческое помещение", cover: 22, photos: [22, 21, 23] },
  { id: "terracotta", title: "Санузел в терракоте и детская", rooms: "Санузел, детская", cover: 25, photos: [25, 24, 26, 27] },
  { id: "dark-wood", title: "Спальня с тёмным деревом", rooms: "Спальня, санузел", cover: 8, photos: [8, 9] },
  { id: "birch", title: "Спальня с фотообоями и светлый санузел", rooms: "Спальня, санузел", cover: 28, photos: [28, 29] },
  { id: "light", title: "Квартира в светлых тонах", rooms: "Санузел, коридор, прихожая", cover: 82, photos: [82, 83, 84] },
  { id: "classic-kitchen", title: "Классическая светлая кухня", rooms: "Кухня", cover: 0, photos: [0] },
  { id: "chevron", title: "Санузел с акцентной плиткой", rooms: "Санузел, кухня, детали", cover: 11, photos: [11, 12, 6] },
];
