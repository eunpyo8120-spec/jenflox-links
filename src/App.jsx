import { useState, useMemo } from "react";

// ── 팔레트 데이터 ─────────────────────────────────────────
const PALETTE = [
  { id:"all",    label:"전체",     bg:"#1B2D4F", blob:"#16253F" },
  { id:"coord",  label:"코디조합", bg:"#F9E4A0", blob:"#F0D070" },
  { id:"outer",  label:"아우터",   bg:"#A8D8B9", blob:"#7EC8A0" },
  { id:"top",    label:"상의",     bg:"#F4B8C1", blob:"#EE9AAA" },
  { id:"bottom", label:"하의/신발",bg:"#B8D0F0", blob:"#90B8E8" },
  { id:"deal",   label:"특가꿀템", bg:"#A8E6E0", blob:"#78D4CC" },
  { id:"season", label:"시즌/행사",bg:"#C8B8E8", blob:"#A898D0" },
  { id:"age",    label:"나이대별", bg:"#F0C8A0", blob:"#E0A870" },
  { id:"etc",    label:"기타",     bg:"#C8C8C8", blob:"#A8A8A8" },
];

const BLOBS = [
  "M50,14 C72,6 90,22 87,47 C84,72 68,88 43,84 C18,80 5,62 8,38 C11,14 28,22 50,14Z",
  "M48,12 C72,7 91,28 84,53 C77,78 56,90 32,81 C8,72 5,50 13,27 C21,4 24,17 48,12Z",
  "M53,17 C76,9 89,32 82,56 C75,80 54,89 30,80 C6,71 7,47 15,26 C23,5 30,25 53,17Z",
  "M45,11 C68,5 90,24 87,50 C84,76 63,91 38,84 C13,77 5,55 10,31 C15,7 22,17 45,11Z",
  "M56,13 C79,7 92,30 85,55 C78,80 57,91 33,82 C9,73 6,51 14,28 C22,5 33,19 56,13Z",
  "M49,11 C73,5 91,25 85,51 C79,77 57,89 33,82 C9,75 5,51 12,26 C19,1 25,17 49,11Z",
  "M47,15 C71,7 90,27 83,53 C76,79 54,91 30,82 C6,73 5,49 13,26 C21,3 23,23 47,15Z",
  "M54,12 C77,6 92,28 85,54 C78,80 56,90 32,81 C8,72 6,48 14,25 C22,2 31,18 54,12Z",
  "M49,14 C73,6 91,26 84,52 C77,78 55,90 31,81 C7,72 5,48 13,25 C21,2 25,22 49,14Z",
];

function PaintBlob({ palette, isOn, onClick, size = 72, delay = 0 }) {
  const idx = PALETTE.indexOf(palette);
  const blobPath = BLOBS[idx % BLOBS.length];
  const [hov, setHov] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isAll = palette.id === "all";

  function handleClick() {
    setClicked(true);
    setTimeout(() => setClicked(false), 350);
    onClick();
  }

  return (
    <button onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:"none", border:"none", cursor:"pointer", padding:0,
        width:size, height:size, position:"relative",
        animation:`blobPopIn 0.5s ${delay}s cubic-bezier(0.34,1.56,0.64,1) both`,
        transform: clicked ? "scale(0.86)" : isOn ? "scale(1.38)" : hov ? "scale(1.10)" : "scale(1)",
        transition: clicked ? "transform 0.1s" : "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        filter: "none",
      }}
    >
      {clicked && (
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:palette.bg,
          animation:"blobRipple 0.35s ease-out forwards", pointerEvents:"none", zIndex:10 }}/>
      )}
      <svg width={size} height={size} viewBox="0 0 100 100"
        style={{ animation: isOn ? "blobWiggle 3s ease-in-out infinite" : "none" }}>
        <path d={blobPath} fill={isAll && !isOn ? "#1B2D4F" : palette.bg}/>
        {hov && !isOn && <path d={blobPath} fill="white" opacity="0.2"/>}
        <text x="50" y="53" textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: palette.label.length > 4 ? "10px" : "12px",
            fontWeight:800, fill: isAll ? "#fff" : "#1B2D4F",
            fontFamily:"'Pretendard',sans-serif", letterSpacing:"-0.5px" }}>
          {palette.label}
        </text>
      </svg>
    </button>
  );
}


const CATEGORIES = [
  { id: "all",    label: "전체",      emoji: "✦" },
  { id: "coord",  label: "코디 조합법", emoji: "👗" },
  { id: "outer",  label: "아우터",    emoji: "🧥" },
  { id: "top",    label: "상의",      emoji: "👕" },
  { id: "bottom", label: "하의/신발", emoji: "👖" },
  { id: "deal",   label: "특가/꿀템", emoji: "🎁" },
  { id: "season", label: "시즌/행사", emoji: "🎄" },
  { id: "age",    label: "나이대별",  emoji: "👤" },
  { id: "etc",    label: "기타/정보", emoji: "📌" },
];

const ITEMS = [
  { id:1,  cat:"coord",  title:"하의 컬러별 신발 색조합",                      desc:"하의 색상에 맞는 신발 컬러 완전 정복",         tag:"코디 조합법", href:"#" },
  { id:2,  cat:"coord",  title:"상의 컬러별 하의 필승 조합 (봄.ver)",           desc:"봄 시즌 상하의 컬러 조합 가이드",             tag:"코디 조합법", href:"#" },
  { id:3,  cat:"coord",  title:"아우터 컬러별 하의 필승조합 1",                 desc:"아우터 색상별 베스트 하의 매칭",              tag:"코디 조합법", href:"#" },
  { id:4,  cat:"coord",  title:"남자코디 필승조합 2",                           desc:"실패 없는 남자 코디 공식 2탄",               tag:"코디 조합법", href:"#" },
  { id:5,  cat:"coord",  title:"남자코디 필승조합 1",                           desc:"실패 없는 남자 코디 공식 1탄",               tag:"코디 조합법", href:"#" },
  { id:6,  cat:"coord",  title:"봄코디 필승조합 추천 (꽃놀이)",                 desc:"꽃놀이 나들이 코디 완벽 가이드",             tag:"코디 조합법", href:"#" },
  { id:7,  cat:"coord",  title:"아우터별 하의 필승 조합 1",                     desc:"아우터 종류별 하의 매칭법",                  tag:"코디 조합법", href:"#" },
  { id:8,  cat:"coord",  title:"상의 컬러별 색조합법",                          desc:"상의 색상에 따른 코디 조합 마스터",           tag:"코디 조합법", href:"#" },

  { id:9,  cat:"outer",  title:"품절전에 챙겨둘 아디다스 후드집업",             desc:"아디다스 인기 후드집업 구매 전 필독",         tag:"아우터", href:"#" },
  { id:10, cat:"outer",  title:"아디다스 데님 트랙탑 블루 링크",                desc:"블루 컬러 아디다스 데님 트랙탑",              tag:"아우터", href:"#" },
  { id:11, cat:"outer",  title:"아디다스 데님 트랙탑 블랙 링크",                desc:"블랙 컬러 아디다스 데님 트랙탑",              tag:"아우터", href:"#" },
  { id:12, cat:"outer",  title:"소신추천) 신칠라맛 플리스 풀오버",              desc:"가성비 최강 플리스 풀오버 픽",               tag:"아우터", href:"#" },
  { id:13, cat:"outer",  title:"올 겨울을 책임질 필살 올 블루종",               desc:"겨울 필수템 블루종 추천",                   tag:"아우터", href:"#" },
  { id:14, cat:"outer",  title:"티어별 겨울아우터 총정리",                      desc:"예산별 겨울 아우터 완벽 분석",               tag:"아우터", href:"#" },

  { id:15, cat:"top",    title:"넣임 없이도 예쁜 크롭반팔티 총정리",            desc:"터킹 없이 입어도 예쁜 크롭티 모음",          tag:"상의", href:"#" },
  { id:16, cat:"top",    title:"여름 반팔 상의 총정리 1.0",                     desc:"여름 반팔티 전체 큐레이션",                 tag:"상의", href:"#" },
  { id:17, cat:"top",    title:"현시점 제일 예쁜 후드티 200가지",               desc:"지금 당장 살 수 있는 후드티 200",           tag:"상의", href:"#" },
  { id:18, cat:"top",    title:"현시점 제일 예쁜 후드집업 200가지",             desc:"지금 당장 살 수 있는 후드집업 200",         tag:"상의", href:"#" },
  { id:19, cat:"top",    title:"뽕뽑게 입을 수 있는 0티어 기본 롱슬리브",       desc:"가성비 최강 기본 롱슬리브 픽",              tag:"상의", href:"#" },

  { id:20, cat:"bottom", title:"무신사 티어별 패딩 추천리스트",                 desc:"예산대별 무신사 패딩 완벽 정리",             tag:"하의/신발", href:"#" },
  { id:21, cat:"bottom", title:"티어별 코트 추천리스트",                        desc:"가격대별 코트 추천 총망라",                 tag:"하의/신발", href:"#" },

  { id:22, cat:"deal",   title:"무신사 킥스 페스티벌 꿀템 정리",                desc:"킥스 페스티벌 놓치면 안 될 템",             tag:"특가/꿀템", href:"#" },
  { id:23, cat:"deal",   title:"현시점 개이득 신발 5+n가지",                    desc:"지금 당장 사야 할 신발 모음",               tag:"특가/꿀템", href:"#" },
  { id:24, cat:"deal",   title:"현시점 무신사 꿀템 4+n가지",                    desc:"무신사 현재 가성비 최강 템",                tag:"특가/꿀템", href:"#" },
  { id:25, cat:"deal",   title:"현시점 개이득 신발 6+n가지",                    desc:"업데이트된 개이득 신발 리스트",              tag:"특가/꿀템", href:"#" },
  { id:26, cat:"deal",   title:"현시점 무신사 꿀템 5+n가지 (12월 3째주)",       desc:"12월 3째주 무신사 꿀템 모음",               tag:"특가/꿀템", href:"#" },
  { id:27, cat:"deal",   title:"소신 추천 아이템 모음",                         desc:"젠플록스 개인 픽 소신 추천템",              tag:"특가/꿀템", href:"#" },

  { id:28, cat:"season", title:"연말연초 패딩 코디조합 32가지",                 desc:"연말/연초 패딩 코디 완전판",                tag:"시즌/행사", href:"#" },
  { id:29, cat:"season", title:"나이대별 연말룩 코디조합 48가지",               desc:"나이대별 연말 파티룩 48가지",               tag:"시즌/행사", href:"#" },
  { id:30, cat:"season", title:"연말대비 패턴 니트&가디건 추천리스트",          desc:"연말 시즌 니트·가디건 큐레이션",            tag:"시즌/행사", href:"#" },
  { id:31, cat:"season", title:"나이대별 하객룩 꿀조합(1)",                     desc:"결혼식 하객룩 나이대별 가이드",             tag:"시즌/행사", href:"#" },

  { id:32, cat:"age",    title:"나이대별 봄 기본템 총정리",                     desc:"봄 시즌 나이대별 기본 아이템 정리",         tag:"나이대별", href:"#" },
  { id:33, cat:"age",    title:"나이대별 기본템 총정리 : 30대 중반 이상",        desc:"30대 중반 이상을 위한 기본템 가이드",       tag:"나이대별", href:"#" },
  { id:34, cat:"age",    title:"나이대별 기본템 총정리 : 20대 중반~30대 초반",   desc:"20중반~30초반 기본템 큐레이션",            tag:"나이대별", href:"#" },
  { id:35, cat:"age",    title:"나이대별 기본템 총정리 : 10대~20대 초반",        desc:"10대~20초반 가성비 기본템 픽",             tag:"나이대별", href:"#" },
  { id:36, cat:"age",    title:"나이대별 기본템 총정리 (All in One)",            desc:"전 나이대 기본템 한눈에 보기",             tag:"나이대별", href:"#" },
  { id:37, cat:"age",    title:"학생&사초생들을 위한 가성비 코디 30가지",        desc:"학생·사회초년생 예산별 코디 30선",         tag:"나이대별", href:"#" },

  { id:38, cat:"etc",    title:"스투시 가품 구별 (가품 리포트)",                desc:"스투시 정품 vs 가품 완벽 구별법",          tag:"기타/정보", href:"#" },
];

const TAG_COLORS = {
  "코디 조합법": { bg:"rgba(92,61,30,0.18)",   text:"#C8955A", border:"rgba(139,94,60,0.3)" },
  "아우터":      { bg:"rgba(60,40,20,0.22)",   text:"#B07840", border:"rgba(176,120,64,0.3)" },
  "상의":        { bg:"rgba(100,70,30,0.18)",  text:"#D4A56A", border:"rgba(212,165,106,0.3)" },
  "하의/신발":   { bg:"rgba(70,50,25,0.22)",   text:"#C08A4A", border:"rgba(192,138,74,0.3)" },
  "특가/꿀템":   { bg:"rgba(180,100,30,0.15)", text:"#E8A040", border:"rgba(232,160,64,0.3)" },
  "시즌/행사":   { bg:"rgba(80,55,30,0.2)",    text:"#C89050", border:"rgba(200,144,80,0.3)" },
  "나이대별":    { bg:"rgba(110,75,35,0.18)",  text:"#D8A060", border:"rgba(216,160,96,0.3)" },
  "기타/정보":   { bg:"rgba(60,45,28,0.2)",    text:"#A87840", border:"rgba(168,120,64,0.3)" },
};

// ── 메인 링크 데이터 ──────────────────────────────────────
const MAIN_LINKS = [
  {
    id: "contents",
    icon: "🔍",
    title: "아이템 검색",
    desc: "팔레트 필터로 코디 조합, 추천 아이템 탐색",
    isInternal: true,
    accent: "#C8955A",
    bgAccent: "rgba(200,149,90,0.12)",
    borderAccent: "rgba(200,149,90,0.35)",
    badge: `${ITEMS.length}개`,
  },
  {
    id: "deal",
    icon: "⚡",
    title: "한정기간 특가템",
    desc: "기간 한정 할인 & 핫딜 모음",
    href: "https://linktr.ee/jenflox",
    accent: "#E8A040",
    bgAccent: "rgba(232,160,64,0.10)",
    borderAccent: "rgba(232,160,64,0.28)",
    badge: "HOT",
  },
  {
    id: "shop",
    icon: "🏬",
    title: "젠플록스 셀렉샵",
    desc: "jenflox.co.kr · 직접 선별한 아이템",
    href: "https://jenflox.co.kr",
    accent: "#B07840",
    bgAccent: "rgba(176,120,64,0.10)",
    borderAccent: "rgba(176,120,64,0.28)",
  },
  {
    id: "musinsa",
    icon: "✦",
    title: "가심비 기본템 3신기",
    desc: "무신사 큐레이션 · 젠플록스 셀렉",
    href: "https://musinsa.com/curator/shop/dqugUZ?curationId=01KM588XP86P8B6QEV602MJKTG",
    accent: "#8B5E3C",
    bgAccent: "rgba(139,94,60,0.10)",
    borderAccent: "rgba(139,94,60,0.25)",
  },
];

// ── 카카오톡 배너 (오픈채팅 선택 모달 포함) ──────────────
function KakaoBanner() {
  const [open, setOpen] = useState(false);

  const rooms = [
    { label:"실시간 꿀템 공유 비밀공지방", desc:"꿀템 실시간 공유", href:"https://open.kakao.com/o/g422DW1h" },
    { label:"4.11 플리마켓 전용공지방",   desc:"플리마켓 전용",    href:"https://open.kakao.com/o/gDk4uRoi" },
  ];

  return (
    <>
      {/* 카카오 배너 */}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(254,229,0,0.22)"; e.currentTarget.style.borderColor="rgba(254,229,0,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 3px 16px rgba(254,229,0,0.10)"; e.currentTarget.style.borderColor="rgba(254,229,0,0.25)"; }}
        style={{
          marginTop:12, cursor:"pointer", borderRadius:20,
          border:"1.5px solid rgba(254,229,0,0.25)",
          background:"linear-gradient(135deg,#FFFEF0 0%,#FFFDE0 40%,#FFFEF5 100%)",
          boxShadow:"0 3px 16px rgba(254,229,0,0.10)",
          overflow:"hidden", position:"relative",
          transition:"all 0.25s ease",
          animation:"fadeUp 0.45s 0.75s both",
        }}
      >
        <div style={{ position:"absolute", top:-30, right:-30, width:160, height:160, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(254,229,0,0.12) 0%,transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ padding:"22px 24px", display:"flex", alignItems:"center", gap:18 }}>
          {/* 카카오 로고 */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="13" fill="#FEE500"/>
            <path d="M24 10C16.268 10 10 14.925 10 21.012C10 24.875 12.494 28.294 16.312 30.369L14.75 36.5C14.7 36.7 14.912 36.869 15.087 36.756L22.362 31.912C22.9 31.969 23.444 32 24 32C31.732 32 38 27.075 38 21.012C38 14.925 31.732 10 24 10Z" fill="#3A1D1D"/>
          </svg>

          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, letterSpacing:"0.18em", color:"rgba(100,70,0,0.5)", textTransform:"uppercase", fontWeight:600, marginBottom:4 }}>KakaoTalk Open Chat</div>
            <div style={{ fontSize:17, fontWeight:800, letterSpacing:"-0.02em", color:"#2A1A00", marginBottom:3, lineHeight:1.2 }}>카카오 오픈채팅</div>
            <div style={{ fontSize:12, color:"rgba(42,26,0,0.4)", fontWeight:300 }}>공지방 · 꿀템 공유 · 플리마켓</div>
          </div>

          <div style={{ flexShrink:0, padding:"7px 13px", borderRadius:999,
            background:"#FEE500", color:"#3A1D1D", fontSize:12, fontWeight:700 }}>
            입장 →
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(254,229,0,0.15)", padding:"9px 24px",
          display:"flex", alignItems:"center", gap:6, background:"rgba(254,229,0,0.04)" }}>
          <span style={{ fontSize:11, color:"rgba(42,26,0,0.3)", fontWeight:300 }}>💬 오픈채팅방 선택 후 입장</span>
        </div>
      </div>

      {/* 선택 모달 */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position:"fixed", inset:0, zIndex:999,
            background:"rgba(0,0,0,0.35)", backdropFilter:"blur(4px)",
            display:"flex", alignItems:"flex-end", justifyContent:"center",
            animation:"fadeIn 0.2s both",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width:"100%", maxWidth:480,
              background:"#FFFDF7", borderRadius:"24px 24px 0 0",
              padding:"28px 20px 40px",
              animation:"slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {/* 핸들 바 */}
            <div style={{ width:40, height:4, borderRadius:999, background:"rgba(184,144,42,0.2)", margin:"0 auto 24px" }}/>

            <div style={{ fontSize:11, letterSpacing:"0.15em", color:"rgba(184,144,42,0.55)", textTransform:"uppercase", fontWeight:600, marginBottom:6 }}>KakaoTalk Open Chat</div>
            <div style={{ fontSize:20, fontWeight:800, color:"#2A1A00", letterSpacing:"-0.03em", marginBottom:20 }}>입장할 채팅방을 선택하세요</div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {rooms.map((room, i) => (
                <div key={i} onClick={() => { window.open(room.href, "_blank"); setOpen(false); }}
                  style={{
                    display:"flex", alignItems:"center", gap:14, padding:"16px 18px",
                    background:"#FFF9E6", border:"1.5px solid rgba(254,229,0,0.3)",
                    borderRadius:14, cursor:"pointer", transition:"all 0.18s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#FFF5CC"; e.currentTarget.style.borderColor="rgba(254,229,0,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#FFF9E6"; e.currentTarget.style.borderColor="rgba(254,229,0,0.3)"; }}
                >
                  <div style={{ width:40, height:40, borderRadius:12, background:"#FEE500",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                    💬
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"#2A1A00", marginBottom:2 }}>{room.label}</div>
                    <div style={{ fontSize:12, color:"rgba(42,26,0,0.4)" }}>{room.desc}</div>
                  </div>
                  <span style={{ fontSize:16, color:"rgba(42,26,0,0.3)" }}>›</span>
                </div>
              ))}
            </div>

            <button onClick={() => setOpen(false)} style={{
              width:"100%", marginTop:16, padding:"13px",
              border:"1.5px solid rgba(184,144,42,0.2)", borderRadius:12,
              background:"transparent", color:"rgba(184,144,42,0.6)",
              fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
            }}>닫기</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── 공통 배경 Shell ───────────────────────────────────────
function Shell({ children }) {
  return (
    <div style={{
      minHeight:"100vh",
      background:"#FFFDF7",
      fontFamily:"'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      color:"#1A1208", position:"relative", overflowX:"hidden",
    }}>
      {/* 골드 그레인 배경 */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 70% 50% at 75% 5%, rgba(212,175,55,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(184,144,30,0.08) 0%, transparent 65%)",
      }}/>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.025,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"256px",
      }}/>
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes blobPopIn {
          0%   { opacity:0; transform:scale(0.6) translateY(8px); }
          70%  { transform:scale(1.1) translateY(-2px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes blobWiggle {
          0%,100% { transform:scale(1) rotate(0deg); }
          25%     { transform:scale(1.05) rotate(-2deg); }
          75%     { transform:scale(1.03) rotate(2deg); }
        }
        @keyframes blobRipple {
          0%   { transform:scale(0.8); opacity:0.5; }
          100% { transform:scale(2.4); opacity:0; }
        }
        @keyframes threadSlide {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes sidebarGrow {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes badgePop {
          0%   { transform:scale(0); opacity:0; }
          65%  { transform:scale(1.18); }
          100% { transform:scale(1); opacity:1; }
        }
        ::-webkit-scrollbar{display:none}
        input::placeholder{color:rgba(180,144,60,0.45)}
        *{-webkit-tap-highlight-color:transparent; box-sizing:border-box;}
      `}</style>
    </div>
  );
}

// ── 메인 홈 페이지 ────────────────────────────────────────
const GOLD = "#B8902A";
const GOLD_LIGHT = "#F5E6B0";
const NAVY_DARK = "#1B2D4F";

function HomePage({ onEnterContents }) {
  const [hov, setHov] = useState(null);

  return (
    <Shell>
      <div style={{ maxWidth:480, margin:"0 auto", padding:"0 18px 80px" }}>

        {/* 프로필 */}
        <div style={{ paddingTop:52, paddingBottom:36, textAlign:"center", animation:"fadeUp 0.5s both" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            width:84, height:84, borderRadius:"50%", marginBottom:20,
            background:"linear-gradient(135deg,#C8A020 0%,#E8C84A 50%,#F5E6A0 100%)",
            fontSize:34,
            boxShadow:"0 0 0 3px rgba(184,144,42,0.2), 0 8px 32px rgba(184,144,42,0.25)",
          }}>✦</div>

          <div style={{ fontSize:10, letterSpacing:"0.25em", color:"#B8902A", textTransform:"uppercase", marginBottom:10, fontWeight:700 }}>
            Men's Fashion Creator
          </div>

          <h1 style={{
            fontSize:"clamp(26px,7vw,34px)", fontWeight:900, letterSpacing:"-0.03em", margin:"0 0 4px",
            background:"linear-gradient(135deg,#1A1208 30%,#B8902A 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.2,
          }}>
            젠현표 <span style={{fontWeight:400,fontSize:"0.9em",opacity:0.35}}>·</span> 젠플록스
          </h1>

          <div style={{ fontSize:13, color:"#B8902A", letterSpacing:"0.08em", marginBottom:14, opacity:0.7 }}>@maison_jenflox</div>

          <p style={{ fontSize:14, color:"rgba(26,18,8,0.45)", lineHeight:1.85, maxWidth:280, margin:"0 auto 20px", fontWeight:300 }}>
            남성 패션 가성비 크리에이터<br/>
            <span style={{color:"#B8902A", fontWeight:600}}>"느낌 좋은 템"</span> 추천 채널
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:12, maxWidth:180, margin:"0 auto" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(184,144,42,0.3))" }}/>
            <span style={{ color:"#D4A830", fontSize:12 }}>✦</span>
            <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(184,144,42,0.3))" }}/>
          </div>
        </div>

        {/* 링크 카드 */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {MAIN_LINKS.map((link, i) => {
            const isHov     = hov === link.id;
            const isSpecial = link.id === "contents";
            return (
              <div
                key={link.id}
                onClick={() => link.isInternal ? onEnterContents() : window.open(link.href, "_blank")}
                onMouseEnter={() => setHov(link.id)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:"flex", alignItems:"center", gap:15,
                  padding: isSpecial ? "20px 22px" : "15px 19px",
                  background: isHov
                    ? (isSpecial ? "rgba(184,144,42,0.12)" : "rgba(184,144,42,0.07)")
                    : (isSpecial ? "rgba(245,230,176,0.35)" : "#fff"),
                  border:`1.5px solid ${isHov
                    ? (isSpecial ? "rgba(184,144,42,0.5)" : "rgba(184,144,42,0.3)")
                    : (isSpecial ? "rgba(184,144,42,0.35)" : "rgba(184,144,42,0.15)")}`,
                  borderRadius: isSpecial ? 18 : 14,
                  cursor:"pointer", transition:"all 0.22s ease",
                  transform: isHov ? "translateY(-3px)" : "none",
                  boxShadow: isHov
                    ? "0 10px 28px rgba(184,144,42,0.15)"
                    : (isSpecial ? "0 2px 14px rgba(184,144,42,0.08)" : "0 1px 4px rgba(0,0,0,0.04)"),
                  animation:`fadeUp 0.45s ${0.05+i*0.06}s both`,
                }}
              >
                <div style={{
                  width: isSpecial ? 48 : 42, height: isSpecial ? 48 : 42,
                  borderRadius: isSpecial ? 14 : 12,
                  background: isSpecial ? "rgba(184,144,42,0.15)" : "rgba(184,144,42,0.08)",
                  border:`1px solid rgba(184,144,42,0.2)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: isSpecial ? 22 : 18, flexShrink:0,
                }}>
                  {link.icon}
                </div>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontSize: isSpecial ? 15.5 : 14,
                    fontWeight: isSpecial ? 700 : 600,
                    color: isHov ? "#1A1208" : "#2A1E08",
                    marginBottom:2, letterSpacing:"-0.01em", transition:"color 0.2s",
                  }}>{link.title}</div>
                  <div style={{ fontSize:12, color:"rgba(26,18,8,0.38)", fontWeight:300, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {link.desc}
                  </div>
                </div>

                {link.badge && (
                  <div style={{
                    padding:"3px 9px", borderRadius:999, flexShrink:0,
                    background: link.id==="contents" ? "rgba(184,144,42,0.15)" : "rgba(184,144,42,0.12)",
                    border:`1px solid rgba(184,144,42,0.3)`,
                    color:"#B8902A", fontSize:11, fontWeight:700,
                  }}>{link.badge}</div>
                )}

                <div style={{
                  color: isHov ? "#B8902A" : "rgba(184,144,42,0.4)",
                  fontSize:17, transition:"all 0.2s", flexShrink:0,
                  transform: isHov ? "translate(2px,-2px)" : "none",
                }}>
                  {link.isInternal ? "›" : "↗"}
                </div>
              </div>
            );
          })}
        </div>

        {/* 유튜브 배너 */}
        <div
          onClick={() => window.open("https://www.youtube.com/@maison_jenflox", "_blank")}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(255,0,0,0.18)"; e.currentTarget.style.borderColor="rgba(255,68,68,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 3px 16px rgba(255,0,0,0.08)"; e.currentTarget.style.borderColor="rgba(255,68,68,0.18)"; }}
          style={{
            marginTop:18, cursor:"pointer", borderRadius:20,
            border:"1.5px solid rgba(255,68,68,0.18)",
            background:"linear-gradient(135deg,#FFF5F5 0%,#FFF0F0 40%,#FFF8F8 100%)",
            boxShadow:"0 3px 16px rgba(255,0,0,0.08)",
            overflow:"hidden", position:"relative",
            transition:"all 0.25s ease",
            animation:"fadeUp 0.45s 0.55s both",
          }}
        >
          <div style={{ position:"absolute", top:-30, right:-30, width:160, height:160, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(255,0,0,0.08) 0%,transparent 70%)", pointerEvents:"none" }}/>

          <div style={{ padding:"22px 24px", display:"flex", alignItems:"center", gap:18 }}>
            <svg width="58" height="41" viewBox="0 0 58 41" fill="none">
              <rect width="58" height="41" rx="11" fill="#FF0000"/>
              <polygon points="23,12 23,29 40,20.5" fill="white"/>
            </svg>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, letterSpacing:"0.18em", color:"rgba(255,80,80,0.6)", textTransform:"uppercase", fontWeight:600, marginBottom:4 }}>YouTube Channel</div>
              <div style={{ fontSize:17, fontWeight:800, letterSpacing:"-0.02em", color:"#1A0808", marginBottom:3, lineHeight:1.2 }}>젠플록스</div>
              <div style={{ fontSize:12, color:"rgba(26,8,8,0.4)", fontWeight:300 }}>@maison_jenflox · 남성 패션 크리에이터</div>
            </div>
            <div style={{ flexShrink:0, padding:"7px 13px", borderRadius:999, background:"#FF0000",
              color:"#fff", fontSize:12, fontWeight:700, boxShadow:"0 3px 10px rgba(255,0,0,0.3)" }}>
              구독 ▶
            </div>
          </div>

          <div style={{ borderTop:"1px solid rgba(255,68,68,0.08)", padding:"9px 24px",
            display:"flex", alignItems:"center", gap:6, background:"rgba(255,0,0,0.02)" }}>
            <span style={{ fontSize:10, color:"rgba(255,80,80,0.4)" }}>▶</span>
            <span style={{ fontSize:11, color:"rgba(26,8,8,0.3)", fontWeight:300 }}>코디 조합법 · 아이템 추천 · 가성비 큐레이션</span>
          </div>
        </div>

        {/* 인스타 배너 */}
        <div
          onClick={() => window.open("https://www.instagram.com/maison_jenflox", "_blank")}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(193,53,132,0.16)"; e.currentTarget.style.borderColor="rgba(193,53,132,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 3px 16px rgba(193,53,132,0.07)"; e.currentTarget.style.borderColor="rgba(193,53,132,0.18)"; }}
          style={{
            marginTop:12, cursor:"pointer", borderRadius:20,
            border:"1.5px solid rgba(193,53,132,0.18)",
            background:"linear-gradient(135deg,#FFF5FC 0%,#FFF0F8 40%,#FFF5FA 100%)",
            boxShadow:"0 3px 16px rgba(193,53,132,0.07)",
            overflow:"hidden", position:"relative",
            transition:"all 0.25s ease",
            animation:"fadeUp 0.45s 0.65s both",
          }}
        >
          <div style={{ position:"absolute", top:-30, right:-30, width:160, height:160, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(193,53,132,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>

          <div style={{ padding:"22px 24px", display:"flex", alignItems:"center", gap:18 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="13" fill="url(#ig_home)"/>
              <defs>
                <linearGradient id="ig_home" x1="0" y1="48" x2="48" y2="0">
                  <stop offset="0%" stopColor="#FFDC80"/>
                  <stop offset="25%" stopColor="#FCAF45"/>
                  <stop offset="50%" stopColor="#F77737"/>
                  <stop offset="75%" stopColor="#C13584"/>
                  <stop offset="100%" stopColor="#833AB4"/>
                </linearGradient>
              </defs>
              <rect x="12" y="12" width="24" height="24" rx="6.5" stroke="white" strokeWidth="2.2" fill="none"/>
              <circle cx="24" cy="24" r="6.5" stroke="white" strokeWidth="2.2" fill="none"/>
              <circle cx="32" cy="16" r="1.6" fill="white"/>
            </svg>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, letterSpacing:"0.18em", color:"rgba(193,53,132,0.55)", textTransform:"uppercase", fontWeight:600, marginBottom:4 }}>Instagram</div>
              <div style={{ fontSize:17, fontWeight:800, letterSpacing:"-0.02em", color:"#1A0814", marginBottom:3, lineHeight:1.2 }}>maison_jenflox</div>
              <div style={{ fontSize:12, color:"rgba(26,8,20,0.4)", fontWeight:300 }}>@maison_jenflox · 패션 · 스타일링</div>
            </div>
            <div style={{ flexShrink:0, padding:"7px 13px", borderRadius:999,
              background:"linear-gradient(135deg,#C13584,#833AB4)",
              color:"#fff", fontSize:12, fontWeight:700, boxShadow:"0 3px 10px rgba(193,53,132,0.28)" }}>
              팔로우
            </div>
          </div>

          <div style={{ borderTop:"1px solid rgba(193,53,132,0.07)", padding:"9px 24px",
            display:"flex", alignItems:"center", gap:6, background:"rgba(193,53,132,0.02)" }}>
            <span style={{ fontSize:10, color:"rgba(193,53,132,0.35)" }}>📸</span>
            <span style={{ fontSize:11, color:"rgba(26,8,20,0.3)", fontWeight:300 }}>코디 · 스타일링 · 일상</span>
          </div>
        </div>

        {/* 카카오톡 배너 */}
        <KakaoBanner />

        {/* 푸터 */}
        <div style={{ textAlign:"center", marginTop:44, fontSize:12, color:"rgba(184,144,42,0.35)", lineHeight:2.2 }}>
          <div style={{ fontSize:16, marginBottom:6 }}>✦</div>
          젠플록스(jenflox)
        </div>
      </div>
    </Shell>
  );
}

// ── 콘텐츠 목록 페이지 (팔레트 필터 + 검색 + 스레드 피드) ──
function ContentsPage({ onBack }) {
  const [selected, setSelected] = useState(["all"]);
  const [search,   setSearch]   = useState("");
  const [hov,      setHov]      = useState(null);
  const [sFocus,   setSFocus]   = useState(false);

  function togglePalette(id) {
    if (id === "all") { setSelected(["all"]); return; }
    setSelected(prev => {
      const next = prev.filter(x => x !== "all");
      if (next.includes(id)) {
        const after = next.filter(x => x !== id);
        return after.length ? after : ["all"];
      }
      return [...next, id];
    });
  }

  const filtered = useMemo(() => ITEMS.filter(item => {
    const matchCat    = selected.includes("all") || selected.includes(item.cat);
    const matchSearch = item.title.includes(search) || item.desc.includes(search);
    return matchCat && matchSearch;
  }), [selected, search]);

  const isFiltered  = !selected.includes("all") || !!search;
  const activePals  = PALETTE.filter(p => selected.includes(p.id));
  const cats        = PALETTE.slice(1);
  const CENTER      = 160;
  const CIRCLE_R    = 100;

  return (
    <Shell>
      <div style={{ maxWidth:480, margin:"0 auto", padding:"0 0 80px" }}>

        {/* ── 헤더 ── */}
        <div style={{ padding:"22px 20px 16px", display:"flex", alignItems:"center", gap:14, animation:"fadeIn 0.3s both" }}>
          <button onClick={onBack} style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            width:38, height:38, borderRadius:11,
            background:"rgba(184,144,42,0.10)", border:"1px solid rgba(184,144,42,0.25)",
            color:"#B8902A", fontSize:20, cursor:"pointer", transition:"all 0.2s", flexShrink:0,
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(184,144,42,0.18)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(184,144,42,0.10)";}}
          >‹</button>
          <div>
            <div style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.02em", color:"#1A1208" }}>아이템 검색</div>
            <div style={{ fontSize:11, color:"rgba(184,144,42,0.55)", fontWeight:400 }}>물감을 눌러 카테고리 탐색</div>
          </div>
        </div>

        {/* ── 팔레트 원 ── */}
        <div style={{ padding:"8px 20px 20px" }}>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:320, height:320 }}>

              {/* 트레이 배경 SVG */}
              <svg width="320" height="320" style={{ position:"absolute", top:0, left:0, pointerEvents:"none" }}>
                {/* 바깥 테두리 원만 */}
                <circle cx="160" cy="160" r="154" fill="rgba(184,144,42,0.04)" stroke="rgba(184,144,42,0.2)" strokeWidth="1.5"/>
              </svg>

              {/* 중앙 전체 */}
              <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:2 }}>
                <PaintBlob palette={PALETTE[0]} isOn={selected.includes("all")} onClick={()=>togglePalette("all")} size={68} delay={0}/>
              </div>

              {/* 8개 카테고리 - 중앙 가깝게 */}
              {[
                {x:160,y:62},{x:245,y:95},{x:278,y:166},{x:242,y:240},
                {x:160,y:272},{x:80,y:240},{x:44,y:166},{x:78,y:95},
              ].map((pos, i) => (
                <div key={cats[i].id} style={{ position:"absolute", left:pos.x-34, top:pos.y-34, zIndex:1 }}>
                  <PaintBlob palette={cats[i]} isOn={selected.includes(cats[i].id)}
                    onClick={()=>togglePalette(cats[i].id)} size={68} delay={0.06+i*0.07}/>
                </div>
              ))}
            </div>
          </div>

          {/* 선택 태그 */}
          {!selected.includes("all") && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:14, justifyContent:"center" }}>
              {activePals.map(p => (
                <button key={p.id} onClick={()=>togglePalette(p.id)} style={{
                  display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:999,
                  background:p.bg, border:"1.5px solid rgba(27,45,79,0.2)",
                  fontSize:11, fontWeight:700, color:"#1B2D4F", cursor:"pointer", fontFamily:"inherit",
                }}>{p.label} ×</button>
              ))}
              <button onClick={()=>setSelected(["all"])} style={{
                padding:"4px 10px", borderRadius:999, border:"1px solid rgba(184,144,42,0.25)",
                background:"rgba(184,144,42,0.06)", fontSize:11, color:"rgba(184,144,42,0.6)",
                cursor:"pointer", fontFamily:"inherit",
              }}>전체보기</button>
            </div>
          )}
        </div>

        {/* ── 검색창 (sticky) ── */}
        <div style={{
          position:"sticky", top:0, zIndex:100,
          background:"rgba(255,253,247,0.95)", backdropFilter:"blur(12px)",
          padding:"10px 20px 8px",
          borderBottom:"1px solid rgba(184,144,42,0.12)",
          boxShadow: sFocus ? "0 4px 20px rgba(184,144,42,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition:"box-shadow 0.2s",
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:10,
            border:`1.5px solid ${sFocus ? "rgba(184,144,42,0.5)" : "rgba(184,144,42,0.2)"}`,
            borderRadius:10, padding:"9px 13px", transition:"border-color 0.2s",
            background: sFocus ? "#fff" : "rgba(184,144,42,0.04)",
          }}>
            <svg width="14" height="14" fill="none" stroke={sFocus?"#B8902A":"rgba(184,144,42,0.4)"} strokeWidth="2" viewBox="0 0 24 24" style={{flexShrink:0}}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              onFocus={()=>setSFocus(true)} onBlur={()=>setSFocus(false)}
              placeholder="아이템 검색..."
              style={{ flex:1, border:"none", fontSize:13.5, color:"#1A1208", fontFamily:"inherit", background:"transparent" }}
            />
            {search && <button onClick={()=>setSearch("")} style={{ border:"none", background:"none", cursor:"pointer", color:"rgba(184,144,42,0.5)", fontSize:18, padding:0 }}>×</button>}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:7 }}>
            <span style={{ fontSize:11, color: isFiltered ? "#B8902A" : "rgba(184,144,42,0.45)", fontWeight: isFiltered ? 700 : 400 }}>
              {isFiltered ? `필터 적용 · ${filtered.length}개` : `총 ${ITEMS.length}개`}
            </span>
            {isFiltered && (
              <button onClick={()=>{setSelected(["all"]);setSearch("");}}
                style={{ fontSize:11, color:"rgba(184,144,42,0.5)", border:"none", background:"none", cursor:"pointer", fontFamily:"inherit" }}>
                초기화 ×
              </button>
            )}
          </div>
        </div>

        {/* ── 스레드 피드 ── */}
        <div style={{ padding:"8px 0" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", animation:"fadeUp 0.4s both" }}>
              <div style={{ fontSize:34, marginBottom:10 }}>😢</div>
              <div style={{ fontSize:14, fontWeight:700, color:"rgba(242,235,224,0.6)" }}>해당하는 아이템이 없어요</div>
              <div style={{ fontSize:12, color:"rgba(139,94,60,0.4)", marginTop:6 }}>다른 물감을 눌러보세요</div>
            </div>
          ) : filtered.map((item, i) => {
            const pal     = PALETTE.find(p => p.id === item.cat);
            const isH     = hov === item.id;
            const hasLink = item.href !== "#";
            const delay   = `${Math.min(i*0.03, 0.4)}s`;
            return (
              <div key={item.id}
                onClick={() => hasLink && window.open(item.href, "_blank")}
                onMouseEnter={() => setHov(item.id)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:"flex", alignItems:"stretch",
                  borderBottom:"1px solid rgba(184,144,42,0.10)",
                  cursor: hasLink ? "pointer" : "default",
                  background: isH ? "rgba(184,144,42,0.05)" : "transparent",
                  transform: isH ? "translateX(4px)" : "translateX(0)",
                  boxShadow: isH ? `-4px 0 0 ${pal?.bg||"#B8902A"}` : "none",
                  transition:"background 0.18s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s",
                  animation:`threadSlide 0.32s ${delay} ease both`,
                }}
              >
                {/* 컬러 사이드바 */}
                <div style={{
                  width: isH ? 5 : 3, flexShrink:0,
                  background: pal?.bg || "#B8902A",
                  opacity: isH ? 1 : 0.5,
                  transition:"width 0.2s, opacity 0.2s",
                  transformOrigin:"top",
                  animation:`sidebarGrow 0.35s ${delay} ease both`,
                }}/>

                <div style={{ flex:1, padding:"15px 18px" }}>
                  {/* 뱃지 + 화살표 */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:7 }}>
                    <span style={{
                      fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:999,
                      background: pal?.bg || "#F5E6B0",
                      color:"#1B2D4F",
                      display:"inline-block",
                      animation:`badgePop 0.38s ${delay} cubic-bezier(0.34,1.56,0.64,1) both`,
                    }}>{pal?.label}</span>
                    {!hasLink
                      ? <span style={{ fontSize:10, color:"#CCC", border:"1px solid #EEE", padding:"2px 7px", borderRadius:999 }}>준비중</span>
                      : <span style={{
                          fontSize:15, color: isH ? "#B8902A" : "rgba(184,144,42,0.3)",
                          transition:"transform 0.2s, color 0.15s", display:"inline-block",
                          transform: isH ? "translate(2px,-2px)" : "none",
                        }}>↗</span>
                    }
                  </div>

                  {/* 제목 */}
                  <div style={{
                    fontSize:15, fontWeight:700,
                    color: isH ? "#1A1208" : "#2A2010",
                    lineHeight:1.5, letterSpacing:"-0.02em", marginBottom:5,
                    transition:"color 0.15s",
                  }}>{item.title}</div>

                  {/* 설명 — hover 시 펼쳐짐 */}
                  <div style={{
                    fontSize:12.5, color:"rgba(26,18,8,0.38)", lineHeight:1.65,
                    maxHeight: isH ? "80px" : "0px",
                    opacity: isH ? 1 : 0,
                    overflow:"hidden",
                    transition:"max-height 0.28s ease, opacity 0.22s ease",
                  }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

// ── 루트 ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  if (page === "contents") return <ContentsPage onBack={() => setPage("home")} />;
  return <HomePage onEnterContents={() => setPage("contents")} />;
}
