export const profile = {
  name: "이서준",
  nameEn: "LEE SEOJUN",
  studentId: "20242548",
  role: "영상 제작자",
  email: "sky8913kk@naver.com",
};

export const education = [
  { date: "24.02", title: "치악고등학교 졸업" },
  { date: "24.03", title: "한림대학교 입학" },
];

export const awards = [
  {
    date: "26.06",
    title: "디지털인문예술전공 전시회 우수상",
    url: "https://26-1-dah-exhibition.vercel.app/projects/052",
  },
];

export const videoWorks = [
  {
    id: "hVa2DscZLh0",
    title: "고등래퍼2 '이로한'",
    description: "키네틱 타이포그래피",
    tag: "KINETIC TYPOGRAPHY",
  },
  {
    id: "Zt4ey7QUmA0",
    title: "iyowa — 1000년을 살고있어",
    description: "서브컬쳐 타이포그래피",
    tag: "SUBCULTURE TYPO",
  },
  {
    id: "EUhpl9ri2Mw",
    title: "유튜버 '키로' 영상 제작",
    description: "1.7만 구독자 채널 유튜브 영상 제작",
    tag: "YOUTUBE",
  },
  {
    id: "yfSOworOKTY",
    title: "AI 스터디앱 '스터디오'",
    description: "가상 광고 영상 제작",
    tag: "AD FILM",
  },
];

export const toyProjects = [
  {
    name: "Pastelette",
    url: "https://pastelette.vercel.app/",
    // 한 줄 요약 (카드에 노출)
    tagline: "단어를 분석해 어울리는 색조합을 알려주는 사이트",
    details: [
      "Pastel + Palette의 합성어로, Claude CLI를 이용하여 처음으로 만든 웹사이트입니다.",
      "단어를 제공하면 AI가 그 단어에 어울리는 색조합을 제시합니다.",
    ],
    // 사용 기술 태그 (선택) — 추후 작성
    stack: [],
    // 썸네일 이미지 경로. /public/thumbnails 에 파일을 넣으면 자동 노출,
    // 없으면 아래 gradient 가 fallback 으로 표시됩니다.
    thumbnail: "/thumbnails/pastelette.jpg",
    gradient: "from-pink-400 via-violet-400 to-cyan-300",
  },
  {
    name: "Shoichi Simulator",
    url: "https://shoichi.kr/",
    tagline: "게임 '이터널리턴'의 캐릭터 '쇼이치'를 웹에 구현한 연습 사이트",
    details: [
      "게임 '이터널리턴'의 캐릭터 중 하나인 '쇼이치'를 사이트 내에 그대로 구현했습니다.",
      "기능 소개 영상이 5일 만에 2만 조회수를 달성할 정도로 파급력이 컸던 프로젝트이며, 현재도 많은 인기를 얻고 있습니다.",
    ],
    stack: [],
    thumbnail: "/thumbnails/shoichi.jpg",
    videoUrl: "https://www.youtube.com/watch?v=HXw_l20CWBU",
    gradient: "from-red-500 via-orange-400 to-amber-300",
  },
];
