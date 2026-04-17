import { useState } from "react";

// ── 콘텐츠 데이터 ──────────────────────────────────────────
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
    icon: "📋",
    title: "콘텐츠 링크 모음",
    desc: "코디 조합법, 아이템 추천, 나이대별 총정리 등",
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
    id: "openchat",
    icon: "💬",
    title: "실시간 꿀템 공유 비밀공지방",
    desc: "카카오톡 오픈채팅 · 꿀템 실시간 공유",
    href: "https://open.kakao.com/o/g422DW1h",
    accent: "#FFD700",
    bgAccent: "rgba(255,215,0,0.07)",
    borderAccent: "rgba(255,215,0,0.22)",
  },
  {
    id: "fleamarket",
    icon: "🛍️",
    title: "4.11 플리마켓 전용공지방",
    desc: "카카오톡 오픈채팅 · 플리마켓 전용",
    href: "https://open.kakao.com/o/gDk4uRoi",
    accent: "#C8955A",
    bgAccent: "rgba(200,149,90,0.08)",
    borderAccent: "rgba(200,149,90,0.22)",
  },
  {
    id: "instagram",
    icon: "📸",
    title: "Instagram",
    desc: "@maison_jenflox",
    href: "https://instagram.com/maison_jenflox",
    accent: "#D4A56A",
    bgAccent: "rgba(212,165,106,0.08)",
    borderAccent: "rgba(212,165,106,0.22)",
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

// ── 공통 배경 Shell ───────────────────────────────────────
function Shell({ children }) {
  return (
    <div style={{
      minHeight:"100vh", background:"#0F0A06",
      fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif",
      color:"#F2EBE0", position:"relative", overflowX:"hidden",
    }}>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 70% 50% at 80% 10%,rgba(139,94,60,0.10) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 10% 90%,rgba(92,61,30,0.12) 0%,transparent 70%)",
      }}/>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.03,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"256px",
      }}/>
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        ::-webkit-scrollbar{display:none}
        input::placeholder{color:rgba(139,94,60,0.4)}
        *{-webkit-tap-highlight-color:transparent; box-sizing:border-box;}
      `}</style>
    </div>
  );
}

// ── 메인 홈 페이지 ────────────────────────────────────────
function HomePage({ onEnterContents }) {
  const [hov, setHov] = useState(null);

  return (
    <Shell>
      <div style={{ maxWidth:480, margin:"0 auto", padding:"0 18px 80px" }}>

        {/* 프로필 */}
        <div style={{ paddingTop:56, paddingBottom:40, textAlign:"center", animation:"fadeUp 0.5s both" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            width:84, height:84, borderRadius:"50%", marginBottom:20,
            background:"linear-gradient(135deg,#5C3D1E 0%,#8B5E3C 50%,#C8955A 100%)",
            fontSize:34, boxShadow:"0 0 0 3px rgba(139,94,60,0.25),0 8px 32px rgba(92,61,30,0.4)",
          }}>✦</div>

          <div style={{ fontSize:11, letterSpacing:"0.25em", color:"#8B6A48", textTransform:"uppercase", marginBottom:10, fontWeight:500 }}>
            Men's Fashion Creator
          </div>

          <h1 style={{
            fontSize:"clamp(26px,7vw,34px)", fontWeight:900, letterSpacing:"-0.03em", margin:"0 0 4px",
            background:"linear-gradient(135deg,#F2EBE0 30%,#C8955A 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.2,
          }}>
            젠현표 <span style={{fontWeight:400,fontSize:"0.9em",opacity:0.5}}>·</span> 젠플록스
          </h1>

          <div style={{ fontSize:13, color:"#8B6A48", letterSpacing:"0.08em", marginBottom:14 }}>@maison_jenflox</div>

          <p style={{ fontSize:14, color:"rgba(242,235,224,0.5)", lineHeight:1.85, maxWidth:280, margin:"0 auto 20px", fontWeight:300 }}>
            남성 패션 가성비 큐레이터<br/>
            <span style={{color:"#C8955A"}}>"느낌 좋은 템"</span> 추천 채널
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:12, maxWidth:180, margin:"0 auto" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(139,94,60,0.4))" }}/>
            <span style={{ color:"#5C3D1E", fontSize:12 }}>✦</span>
            <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(139,94,60,0.4))" }}/>
          </div>
        </div>

        {/* 링크 카드 */}
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
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
                    ? (isSpecial ? "rgba(200,149,90,0.18)" : "rgba(92,61,30,0.18)")
                    : (isSpecial ? link.bgAccent : "rgba(92,61,30,0.09)"),
                  border:`1px solid ${isHov ? link.borderAccent : (isSpecial ? "rgba(200,149,90,0.25)" : "rgba(139,94,60,0.14)")}`,
                  borderRadius: isSpecial ? 18 : 14,
                  cursor:"pointer", transition:"all 0.22s ease",
                  transform: isHov ? "translateY(-3px)" : "none",
                  boxShadow: isHov ? "0 10px 28px rgba(92,61,30,0.22)" : (isSpecial ? "0 2px 14px rgba(200,149,90,0.07)" : "none"),
                  animation:`fadeUp 0.45s ${0.05+i*0.06}s both`,
                }}
              >
                {/* 아이콘 */}
                <div style={{
                  width: isSpecial ? 48 : 42, height: isSpecial ? 48 : 42,
                  borderRadius: isSpecial ? 14 : 12,
                  background: link.bgAccent, border:`1px solid ${link.borderAccent}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: isSpecial ? 22 : 18, flexShrink:0, color:link.accent,
                }}>
                  {link.icon}
                </div>

                {/* 텍스트 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontSize: isSpecial ? 15.5 : 14,
                    fontWeight: isSpecial ? 700 : 600,
                    color: isHov ? "#F2EBE0" : "#D9CFC3",
                    marginBottom:2, letterSpacing:"-0.01em", transition:"color 0.2s",
                  }}>{link.title}</div>
                  <div style={{ fontSize:12, color:"rgba(242,235,224,0.35)", fontWeight:300, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {link.desc}
                  </div>
                </div>

                {/* 배지 */}
                {link.badge && (
                  <div style={{
                    padding:"3px 9px", borderRadius:999, flexShrink:0,
                    background: link.id==="contents" ? "rgba(200,149,90,0.2)" : "rgba(232,160,64,0.18)",
                    border:`1px solid ${link.id==="contents" ? "rgba(200,149,90,0.35)" : "rgba(232,160,64,0.35)"}`,
                    color:link.accent, fontSize:11, fontWeight:600, letterSpacing:"0.03em",
                  }}>{link.badge}</div>
                )}

                {/* 화살표 */}
                <div style={{
                  color: isHov ? link.accent : "rgba(139,94,60,0.35)",
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
          onClick={() => window.open("https://www.youtube.com/@jenflox", "_blank")}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(255,0,0,0.22)"; e.currentTarget.style.borderColor="rgba(255,68,68,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 24px rgba(255,0,0,0.10)"; e.currentTarget.style.borderColor="rgba(255,68,68,0.22)"; }}
          style={{
            marginTop:20, cursor:"pointer", borderRadius:20,
            border:"1px solid rgba(255,68,68,0.22)",
            background:"linear-gradient(135deg, rgba(255,0,0,0.10) 0%, rgba(30,8,8,0.80) 60%, rgba(15,10,6,0.95) 100%)",
            boxShadow:"0 4px 24px rgba(255,0,0,0.10)",
            overflow:"hidden", position:"relative",
            transition:"all 0.25s ease",
            animation:"fadeUp 0.45s 0.55s both",
          }}
        >
          {/* 배경 글로우 */}
          <div style={{
            position:"absolute", top:-40, right:-40,
            width:200, height:200, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,0,0,0.18) 0%, transparent 70%)",
            pointerEvents:"none",
          }}/>

          <div style={{ padding:"24px 26px", display:"flex", alignItems:"center", gap:20 }}>
            {/* 유튜브 로고 SVG */}
            <div style={{ flexShrink:0 }}>
              <svg width="62" height="44" viewBox="0 0 62 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="62" height="44" rx="12" fill="#FF0000"/>
                {/* 재생 삼각형 */}
                <polygon points="25,13 25,31 43,22" fill="white"/>
              </svg>
            </div>

            {/* 텍스트 */}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, letterSpacing:"0.18em", color:"rgba(255,120,120,0.7)", textTransform:"uppercase", fontWeight:500, marginBottom:5 }}>
                YouTube Channel
              </div>
              <div style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.02em", color:"#F2EBE0", marginBottom:4, lineHeight:1.2 }}>
                젠플록스
              </div>
              <div style={{ fontSize:12.5, color:"rgba(242,235,224,0.45)", fontWeight:300 }}>
                @jenflox · 남성 패션 가성비 큐레이터
              </div>
            </div>

            {/* 구독 버튼 느낌 */}
            <div style={{
              flexShrink:0,
              padding:"8px 14px", borderRadius:999,
              background:"#FF0000",
              color:"#fff", fontSize:12, fontWeight:700,
              letterSpacing:"0.02em",
              boxShadow:"0 4px 14px rgba(255,0,0,0.35)",
            }}>
              구독 ▶
            </div>
          </div>

          {/* 하단 구독자 수 바 */}
          <div style={{
            borderTop:"1px solid rgba(255,68,68,0.12)",
            padding:"10px 26px",
            display:"flex", alignItems:"center", gap:6,
            background:"rgba(0,0,0,0.15)",
          }}>
            <span style={{ fontSize:11, color:"rgba(255,120,120,0.5)", letterSpacing:"0.05em" }}>▶</span>
            <span style={{ fontSize:11, color:"rgba(242,235,224,0.3)", fontWeight:300 }}>
              코디 조합법 · 아이템 추천 · 가성비 큐레이션
            </span>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{ textAlign:"center", marginTop:44, fontSize:12, color:"rgba(139,94,60,0.3)", lineHeight:2.2 }}>
          <div style={{ fontSize:16, marginBottom:6 }}>✦</div>
          젠플록스(jenflox)
        </div>
      </div>
    </Shell>
  );
}

// ── 콘텐츠 목록 페이지 ────────────────────────────────────
function ContentsPage({ onBack }) {
  const [active,  setActive]  = useState("all");
  const [search,  setSearch]  = useState("");
  const [hov,     setHov]     = useState(null);

  const filtered = ITEMS.filter(item => {
    const matchCat    = active === "all" || item.cat === active;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Shell>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"0 16px 80px" }}>

        {/* 헤더 */}
        <div style={{ padding:"24px 0 20px", display:"flex", alignItems:"center", gap:14, animation:"fadeIn 0.3s both" }}>
          <button
            onClick={onBack}
            style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              width:38, height:38, borderRadius:11,
              background:"rgba(92,61,30,0.12)", border:"1px solid rgba(139,94,60,0.2)",
              color:"#C8955A", fontSize:20, cursor:"pointer", transition:"all 0.2s", flexShrink:0,
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(92,61,30,0.22)";e.currentTarget.style.borderColor="rgba(139,94,60,0.4)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(92,61,30,0.12)";e.currentTarget.style.borderColor="rgba(139,94,60,0.2)"}}
          >‹</button>
          <div>
            <div style={{ fontSize:17, fontWeight:700, letterSpacing:"-0.02em", color:"#D9CFC3" }}>콘텐츠 링크 모음</div>
            <div style={{ fontSize:12, color:"rgba(242,235,224,0.33)", fontWeight:300 }}>젠플록스 큐레이션 전체보기</div>
          </div>
        </div>

        {/* 검색 */}
        <div style={{ marginBottom:16, position:"relative" }}>
          <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, opacity:0.35, pointerEvents:"none" }}>🔍</div>
          <input
            value={search} onChange={e=>setSearch(e.target.value)} placeholder="콘텐츠 검색..."
            style={{
              width:"100%", background:"rgba(92,61,30,0.10)", border:"1px solid rgba(139,94,60,0.18)",
              borderRadius:12, padding:"12px 14px 12px 40px",
              color:"#F2EBE0", fontSize:14, outline:"none", transition:"border-color 0.2s",
            }}
            onFocus={e=>e.target.style.borderColor="rgba(139,94,60,0.45)"}
            onBlur={e=>e.target.style.borderColor="rgba(139,94,60,0.18)"}
          />
        </div>

        {/* 탭 */}
        <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:4, marginBottom:22, scrollbarWidth:"none", WebkitOverflowScrolling:"touch" }}>
          {CATEGORIES.map(cat => {
            const on = active === cat.id;
            return (
              <button key={cat.id} onClick={()=>setActive(cat.id)} style={{
                flexShrink:0, padding:"7px 13px", borderRadius:999,
                border: on ? "1px solid rgba(200,149,90,0.55)" : "1px solid rgba(139,94,60,0.16)",
                background: on ? "linear-gradient(135deg,#5C3D1E,#8B5E3C)" : "rgba(92,61,30,0.07)",
                color: on ? "#F2EBE0" : "#8B6A48", fontSize:12, fontWeight: on ? 600 : 400,
                cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap",
                boxShadow: on ? "0 4px 14px rgba(92,61,30,0.3)" : "none",
              }}>
                {cat.emoji} {cat.label}
              </button>
            );
          })}
        </div>

        {/* 결과 수 */}
        <div style={{ fontSize:12, color:"#6B5040", marginBottom:14, letterSpacing:"0.04em" }}>{filtered.length}개의 콘텐츠</div>

        {/* 카드 그리드 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr))", gap:11 }}>
          {filtered.map((item, i) => {
            const ts  = TAG_COLORS[item.tag] || TAG_COLORS["기타/정보"];
            const isH = hov === item.id;
            return (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                onMouseEnter={()=>setHov(item.id)} onMouseLeave={()=>setHov(null)}
                style={{
                  display:"flex", flexDirection:"column", gap:9, padding:"17px 19px",
                  background: isH ? "rgba(92,61,30,0.20)" : "rgba(92,61,30,0.09)",
                  border:`1px solid ${isH ? "rgba(139,94,60,0.42)" : "rgba(139,94,60,0.13)"}`,
                  borderRadius:15, textDecoration:"none", color:"inherit", cursor:"pointer",
                  transition:"all 0.22s ease",
                  transform: isH ? "translateY(-3px)" : "none",
                  boxShadow: isH ? "0 10px 28px rgba(92,61,30,0.22)" : "none",
                  animation:`fadeUp 0.4s ${Math.min(i*0.04,0.4)}s both`,
                }}
              >
                <div style={{
                  display:"inline-flex", alignItems:"center", alignSelf:"flex-start",
                  padding:"3px 9px", borderRadius:999,
                  background:ts.bg, border:`1px solid ${ts.border}`,
                  color:ts.text, fontSize:11, fontWeight:500, letterSpacing:"0.03em",
                }}>
                  {CATEGORIES.find(c=>c.id===item.cat)?.emoji} {item.tag}
                </div>
                <div style={{ fontSize:14.5, fontWeight:700, lineHeight:1.45, color: isH ? "#F2EBE0" : "#D9CFC3", transition:"color 0.2s", letterSpacing:"-0.01em" }}>
                  {item.title}
                </div>
                <div style={{ fontSize:12, color:"rgba(242,235,224,0.35)", lineHeight:1.6, fontWeight:300 }}>
                  {item.desc}
                </div>
                <div style={{
                  marginTop:2, display:"flex", justifyContent:"flex-end",
                  color: isH ? "#C8955A" : "rgba(139,94,60,0.38)",
                  fontSize:15, transition:"all 0.2s",
                  transform: isH ? "translate(2px,-2px)" : "none",
                }}>↗</div>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(139,94,60,0.38)" }}>
            <div style={{ fontSize:30, marginBottom:10 }}>🔍</div>
            <div style={{ fontSize:14 }}>검색 결과가 없어요</div>
          </div>
        )}
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
