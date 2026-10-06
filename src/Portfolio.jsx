import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, ArrowUp,
  Car, Route, Bell, User, Battery, Signal, Wifi, Gauge, FileDown,
} from "lucide-react";

/* ==================================================================
   Rashmi Rani — Android / KMP developer portfolio
   Light-first. Verdigris accent. Two surface tones:
     .zone-page  white   — where the reading happens
     .zone-band  bone    — hero, marquee, footer
   The phone frame and code block stay dark on purpose: real devices
   are dark, code blocks are dark, and they give the page its contrast.

   All colour lives in the token block at the top of the <style>.
================================================================== */

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.developer.ev2z";
const APP_STORE = "https://apps.apple.com/in/app/eva2z-connect/id6760705704";
const EMAIL = "rashmirani25012003@gmail.com";
const RESUME = "/Rashmi_Rani_Android_Developer_CV.pdf";

const MARQUEE = [
  "Kotlin", "Jetpack Compose", "Compose Multiplatform", "Kotlin Multiplatform",
  "Ktor Client", "Coroutines", "StateFlow", "MVVM", "Clean Architecture",
  "Retrofit", "WebSocket", "Firebase", "PhonePe SDK", "DigiLocker", "Gradle",
];

const FEATURE = {
  name: "Eva2z Connect",
  kicker: "Connected-vehicle platform · Evatoz Solutions · 2026",
  problem:
    "Vehicle owners needed one place to see where their vehicle is, how its battery is holding up, and what they are paying for. The catch was that the same product had to exist on Android and iOS, with one mobile engineer to build it.",
  approach:
    "I put the business logic, networking and data layers in shared Kotlin and let each platform render its own UI from the same view models. Roughly 60% of what would have been duplicated code stopped being duplicated — and features now land on both platforms in the same release instead of iOS trailing behind.",
  built: [
    { t: "Real-time dashboard", b: "Vehicle telemetry, battery analytics and trip insights over Ktor. Average data load time dropped 40% after moving to MVVM with coroutine-backed state." },
    { t: "My Account, end to end", b: "Billing, subscription renewals, invoice generation and warranty tracking across three pricing tiers — on both platforms." },
    { t: "In-app payments", b: "PhonePe Payment SDK for subscriptions. 300+ transactions processed since launch with no payment failures." },
    { t: "Four-step identity check", b: "Mobile OTP, RC verification, DigiLocker and manual review, built to DPDP-grade data handling standards." },
  ],
  numbers: [
    { v: 300, suffix: "+", l: "paying subscribers" },
    { v: 60, suffix: "%", l: "less duplicated code" },
    { v: 40, suffix: "%", l: "faster dashboard load" },
    { v: 0, suffix: "", l: "critical defects post-release" },
  ],
  stack: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor Client", "MVVM", "Clean Architecture", "Firebase", "PhonePe SDK", "DigiLocker API"],
};

const PROJECTS = [
  {
    n: "01", name: "PlayZelo", kicker: "Real-money skill gaming", year: "2025", targets: ["Android"],
    blurb: "Wallet, dashboard, profile and the Ludo game UI for a platform running Ludo, Jackpot, HighStake, Mines and Lottery. WebSocket token updates keep balances and tournament state correct for 100+ concurrent players.",
    stack: ["Java", "XML", "Jetpack Compose", "WebSocket", "Socket.IO", "Firebase Auth"],
    metric: "800ms → under 500ms screen load",
  },
  {
    n: "02", name: "In-App Calling", kicker: "Real-time voice and messaging", year: "2025", targets: ["Android"],
    blurb: "One-to-one calling built into the app. A persistent WebSocket carries signalling, presence and message events, so call state survives a network drop and reconnect.",
    stack: ["Kotlin", "Jetpack Compose", "WebSocket", "Coroutines", "StateFlow"],
    metric: "Reconnect-safe call state",
  },
  {
    n: "03", name: "PropertyGuru", kicker: "Real estate marketplace", year: "2024", targets: ["Android"],
    blurb: "Property browsing for rentals and sales. City selection, location search, filterable listings, full detail pages and a favourites list that persists across sessions.",
    stack: ["Java", "XML", "Firebase Auth", "Firebase Realtime DB"],
    metric: "First production Android app",
  },
];

const EXPERIENCE = [
  {
    company: "Evatoz Solutions Pvt. Ltd.", role: "Android Developer",
    period: "Jan 2026 — Present", location: "Noida, India", current: true,
    points: [
      "Led architecture and development of Eva2z Connect — a cross-platform app in Kotlin Multiplatform, Compose Multiplatform and Ktor Client, published on Google Play and the App Store with 300+ paying subscribers in 6 months.",
      "Built an API-driven real-time dashboard for vehicle telemetry, battery analytics and trip insights; cut average data load time 40% with MVVM and coroutines.",
      "Owned the My Account module end to end — billing, renewals, invoices and warranty tracking across 3 pricing tiers on Android and iOS.",
      "Integrated the PhonePe Payment SDK for in-app subscriptions; 300+ transactions with a 100% success rate.",
      "Shipped a 4-tier identity verification flow (mobile OTP, RC verification, DigiLocker, manual review) over secure REST APIs, DPDP compliant.",
    ],
  },
  {
    company: "Bitmax Technology Pvt. Ltd.", role: "Android Developer",
    period: "Jun 2025 — Jan 2026", location: "Noida, India", current: false,
    points: [
      "Developed core PlayZelo modules — Ludo game UI, wallet, dashboard and profile — supporting 100+ concurrent users over Socket.IO.",
      "Integrated 15+ REST APIs with Retrofit for auth, game logic, leaderboards and the wallet; lowered API error rate 30% through error handling and retry logic.",
      "Optimised the Compose rendering pipeline — 35% fewer dropped frames, screen load down from 800ms to under 500ms.",
      "Shipped 3 major releases on schedule in a 5-member Agile team over 7 months.",
    ],
  },
];

const STACK = [
  { group: "Languages", items: ["Kotlin", "Java", "XML"] },
  { group: "Mobile", items: ["Jetpack Compose", "Compose Multiplatform", "Kotlin Multiplatform", "Android SDK"] },
  { group: "Architecture", items: ["MVVM", "Clean Architecture", "Repository Pattern", "Coroutines", "StateFlow", "ViewModel"] },
  { group: "Networking", items: ["Ktor Client", "Retrofit", "REST APIs", "WebSocket", "Socket.IO"] },
  { group: "SDKs", items: ["PhonePe Payments", "DigiLocker", "Google Maps", "Firebase"] },
  { group: "Tooling", items: ["Android Studio", "Git & GitHub", "Gradle", "Postman", "Play Console"] },
];

const EDUCATION = [
  { degree: "Master of Computer Applications", school: "Maharishi Dayanand University, Rohtak", period: "2022 — 2024" },
  { degree: "B.Sc. Computer Science", school: "MJPR University, Bareilly", period: "2019 — 2022" },
];

const CONTACT = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Phone, label: "+91 97191 75684", href: "tel:+919719175684" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/rashmi-rani-77b359261" },
  { icon: Github, label: "GitHub", href: "https://github.com/Rashmi-Rani660" },
];

const NAV = [
  { label: "case study", href: "#feature", id: "feature" },
  { label: "projects", href: "#projects", id: "projects" },
  { label: "experience", href: "#work", id: "work" },
  { label: "stack", href: "#stack", id: "stack" },
];

/* ------------------------------------------------------------------ */

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", style }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`rv ${inView ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "", duration = 1300 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(to); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-rule" />
      <span className="mono-label">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Android phone mockup — stays dark by design                         */
/* ------------------------------------------------------------------ */

function PhoneMock({ ready, offset }) {
  const R = 46;
  const CIRC = 2 * Math.PI * R;
  return (
    <div className="phone-wrap" style={{ transform: `translateY(${offset}px)` }}>
      <div className={`phone ${ready ? "phone-on" : ""}`}>
        <span className="phone-cam" />
        <div className="phone-screen">
          <div className="ph-status mono-label">
            <span>9:41</span>
            <span className="ph-status-icons">
              <Signal size={11} strokeWidth={2.2} />
              <Wifi size={11} strokeWidth={2.2} />
              <Battery size={11} strokeWidth={2.2} />
            </span>
          </div>

          <div className="ph-appbar">
            <div>
              <div className="ph-appbar-t">Eva2z Connect</div>
              <div className="ph-appbar-s mono-label is-code">UP16 DL 1234</div>
            </div>
            <span className="ph-live mono-label"><span className="ph-live-dot" /> live</span>
          </div>

          <div className="ph-card">
            <svg viewBox="0 0 120 120" className="ph-ring" aria-hidden="true">
              <circle cx="60" cy="60" r={R} className="ph-ring-bg" />
              <circle cx="60" cy="60" r={R} className="ph-ring-fg"
                strokeDasharray={CIRC} strokeDashoffset={ready ? CIRC * 0.18 : CIRC} />
            </svg>
            <div className="ph-ring-label">
              <div className="ph-ring-v">82%</div>
              <div className="ph-ring-l mono-label">battery</div>
            </div>
          </div>

          <div className="ph-stats">
            <div className="ph-stat">
              <Gauge size={13} strokeWidth={1.9} />
              <div><div className="ph-stat-v">42</div><div className="ph-stat-l mono-label">km/h</div></div>
            </div>
            <div className="ph-stat">
              <Route size={13} strokeWidth={1.9} />
              <div><div className="ph-stat-v">18.4</div><div className="ph-stat-l mono-label">km today</div></div>
            </div>
          </div>

          <div className="ph-trip">
            <div className="ph-trip-head">
              <span className="mono-label">last trip</span>
              <span className="mono-label is-code">7:24 am</span>
            </div>
            <div className="ph-bars">
              {[38, 62, 45, 78, 54, 88, 66, 40, 72, 50, 84, 58].map((h, i) => (
                <span key={i} className="ph-bar"
                  style={{ height: ready ? `${h}%` : "6%", transitionDelay: `${420 + i * 45}ms` }} />
              ))}
            </div>
          </div>

          <div className="ph-nav">
            <span className="ph-nav-i is-active"><Car size={15} strokeWidth={1.9} /></span>
            <span className="ph-nav-i"><Route size={15} strokeWidth={1.9} /></span>
            <span className="ph-nav-i"><Bell size={15} strokeWidth={1.9} /></span>
            <span className="ph-nav-i"><User size={15} strokeWidth={1.9} /></span>
          </div>
        </div>
      </div>
      <div className="phone-badge mono-label is-code">androidMain · iosMain</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CodeCard() {
  return (
    <div className="code">
      <div className="code-bar">
        <span className="mono-label is-code code-file">VehicleRepository.kt</span>
        <span className="code-tag mono-label is-code">commonMain</span>
      </div>
      <pre className="code-body">
{`class `}<span className="c-type">VehicleRepository</span>{`(
    private val client: `}<span className="c-type">HttpClient</span>{`
) {
    `}<span className="c-cm">{`// one source of truth, two platforms`}</span>{`
    fun stream(vrn: `}<span className="c-type">String</span>{`): `}<span className="c-type">Flow</span>{`<`}<span className="c-type">Telemetry</span>{`> = flow {
        while (currentCoroutineContext().isActive) {
            emit(client.get(`}<span className="c-str">{`"/v1/vehicle/$vrn"`}</span>{`).body())
            delay(`}<span className="c-num">5</span>{`.seconds)
        }
    }.flowOn(`}<span className="c-type">Dispatchers</span>{`.IO)
}`}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 140);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? (y / max) * 100 : 0);
      setShowTop(y > 900);
      if (!reduce) setOffset(Math.max(-22, -y * 0.04));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="rr-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ============ TOKENS ============ */
        .rr-root{
          --fg:#141F1B;            /* near-black ink   */
          --fg-soft:#48554F;       /* body grey        */
          --fg-faint:#78837C;      /* meta grey        */
          --accent:#1A6B54;        /* verdigris        */
          --accent-dim:rgba(26,107,84,.07);
          --accent-line:rgba(26,107,84,.28);
          --on-accent:#FFFFFF;
          --line:rgba(20,31,27,.11);
          --line-mid:rgba(20,31,27,.19);
          --shadow:0 22px 48px -30px rgba(20,31,27,.32);
        }
        .zone-page{ --bg:#FFFFFF; --surface-a:#FBFCFA; --chip-bg:#F5F8F3; }
        .zone-band{ --bg:#F1F5EF; --surface-a:#FFFFFF; --chip-bg:#FFFFFF; }

        /* ============ BASE ============ */
        .rr-root{ font-family:'Inter Tight',system-ui,sans-serif; background:#FFFFFF; color:var(--fg); overflow-x:hidden; }
        .rr-root *,.rr-root *::before,.rr-root *::after{ box-sizing:border-box; }
        :where(.rr-root a){ color:inherit; text-decoration:none; }
        .rr-root ::selection{ background:#1A6B54; color:#FFFFFF; }
        .rr-root a:focus-visible,.rr-root button:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; border-radius:6px; }
        html{ scroll-behavior:smooth; }
        .zone{ background:var(--bg); color:var(--fg); position:relative; }
        .wrap{ max-width:1160px; margin:0 auto; padding-left:22px; padding-right:22px; }
        @media (min-width:768px){ .wrap{ padding-left:40px; padding-right:40px; } }
        .edge{ border-top:1px solid var(--line); }

        /* ============ TYPE ============ */
        .display{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; letter-spacing:-.038em; line-height:1.02; }
        .h-sect{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; letter-spacing:-.032em; line-height:1.1; font-size:clamp(1.95rem,3.8vw,2.7rem); }
        .mono-label{ font-family:'JetBrains Mono',ui-monospace,monospace; font-size:.735rem; font-weight:500; letter-spacing:.1em; text-transform:lowercase; }
        .mono-label.is-code{ text-transform:none; letter-spacing:.03em; }
        .accent-text{ color:var(--accent); }
        .body-lg{ font-size:clamp(1.06rem,1.5vw,1.19rem); line-height:1.72; font-weight:300; color:var(--fg-soft); }
        .prose{ color:var(--fg-soft); font-size:1.06rem; line-height:1.78; font-weight:300; }
        .eyebrow{ display:flex; align-items:center; gap:11px; color:var(--accent); }
        .eyebrow-rule{ width:24px; height:1px; flex-shrink:0; background:var(--accent-line); }

        .rv{ opacity:0; transform:translateY(22px); transition:opacity .75s cubic-bezier(.22,.75,.3,1),transform .75s cubic-bezier(.22,.75,.3,1); }
        .rv-in{ opacity:1; transform:none; }

        /* ============ PROGRESS / NAV ============ */
        .prog{ position:fixed; top:0; left:0; height:2px; background:#1A6B54; z-index:60; transition:width .1s linear; }
        .nav-wrap{ position:sticky; top:0; z-index:50; border-bottom:1px solid transparent; transition:background-color .4s,border-color .4s,backdrop-filter .4s; }
        .nav-wrap.is-stuck{ background-color:rgba(255,255,255,.88); backdrop-filter:saturate(1.4) blur(16px); border-bottom-color:var(--line); }
        .nav-bar{ display:flex; align-items:center; justify-content:space-between; height:66px; }
        .nav-name{ font-weight:500; letter-spacing:-.015em; font-size:1rem; color:var(--fg); }
        .nav-links{ display:none; align-items:center; gap:24px; }
        @media (min-width:1000px){ .nav-links{ display:flex; } }
        .nav-link{ position:relative; color:var(--fg-faint); transition:color .25s; padding-bottom:3px; }
        .nav-link:hover,.nav-link.is-active{ color:var(--fg); }
        .nav-link::after{ content:''; position:absolute; left:0; right:0; bottom:-4px; height:1px; background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(.22,.75,.3,1); }
        .nav-link:hover::after,.nav-link.is-active::after{ transform:scaleX(1); }
        .monogram{ font-family:'JetBrains Mono',monospace; font-size:.72rem; font-weight:500; letter-spacing:.08em; color:#FFFFFF; background:var(--accent); padding:6px 9px; border-radius:7px; }
        .nav-cta{ padding:11px 18px; font-size:.76rem; }
        .nav-toggle{ display:inline-flex; color:var(--fg-soft); border:1px solid var(--line-mid); padding:8px 14px; border-radius:999px; background:transparent; cursor:pointer; }
        @media (min-width:1000px){ .nav-toggle{ display:none; } }
        .nav-drawer{ border-top:1px solid var(--line); background:#FFFFFF; padding:0 22px 8px; }
        @media (min-width:1000px){ .nav-drawer{ display:none; } }
        .nav-drawer a{ display:block; color:var(--fg-soft); padding:15px 0; border-bottom:1px solid var(--line); }

        /* ============ BUTTONS / CHIPS ============ */
        .btn-primary{ display:inline-flex; align-items:center; gap:9px; font-family:'JetBrains Mono',monospace; font-size:.78rem; font-weight:500; letter-spacing:.04em; padding:14px 24px; border-radius:7px; background:var(--accent); color:var(--on-accent); transition:transform .3s cubic-bezier(.22,.75,.3,1),filter .3s; }
        .btn-primary:hover{ transform:translateY(-2px); filter:brightness(1.12); }
        .btn-ghost{ display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono',monospace; font-size:.76rem; font-weight:500; letter-spacing:.03em; padding:12px 18px; border-radius:7px; border:1px solid var(--line-mid); color:var(--fg-soft); background:transparent; transition:border-color .3s,color .3s,background-color .3s; }
        .btn-ghost:hover{ border-color:var(--accent-line); color:var(--accent); background:var(--accent-dim); }
        .chip{ font-family:'JetBrains Mono',monospace; font-size:.735rem; letter-spacing:.01em; padding:6px 11px; border-radius:6px; border:1px solid var(--line); background:var(--chip-bg); color:var(--fg-soft); white-space:nowrap; }
        .chip-row{ display:flex; flex-wrap:wrap; gap:7px; }
        .btn-row{ display:flex; flex-wrap:wrap; gap:11px; }
        .status{ display:inline-flex; align-items:center; gap:8px; padding:7px 14px; border-radius:999px; border:1px solid var(--accent-line); background:var(--accent-dim); color:var(--accent); }
        .status-dot{ width:6px; height:6px; border-radius:999px; background:var(--accent); position:relative; }
        .status-dot::after{ content:''; position:absolute; inset:-4px; border-radius:999px; border:1px solid var(--accent); animation:ping 2.4s cubic-bezier(0,0,.2,1) infinite; }
        @keyframes ping{ 0%{transform:scale(.6);opacity:.9} 80%,100%{transform:scale(1.5);opacity:0} }

        /* ============ HERO — compact ============ */
        .hero{ display:grid; gap:38px; align-items:center; padding-top:34px; padding-bottom:38px; }
        @media (min-width:940px){ .hero{ grid-template-columns:1.2fr .8fr; gap:52px; padding-top:36px; padding-bottom:42px; } }
        .hero-h1{ font-size:clamp(2.1rem,4.3vw,3.1rem); margin:16px 0 16px; }
        .hero-meta{ display:flex; flex-wrap:wrap; gap:9px 26px; margin-top:26px; padding-top:20px; border-top:1px solid var(--line); }
        .hero-meta span{ color:var(--fg-faint); }
        .hero-meta b{ color:var(--fg); font-weight:500; }

        /* ============ PHONE — dark by design ============ */
        .phone-wrap{ display:flex; flex-direction:column; align-items:center; gap:12px; transition:transform .12s linear; }
        .phone{ width:224px; padding:8px; border-radius:32px; background:linear-gradient(160deg,#213D34,#10201B); position:relative; opacity:0; transform:translateY(20px); transition:opacity .8s ease .1s,transform .8s cubic-bezier(.22,.75,.3,1) .1s; box-shadow:0 30px 60px -34px rgba(20,31,27,.72),0 0 0 1px rgba(20,31,27,.08); }
        .phone-on{ opacity:1; transform:none; }
        .phone-cam{ position:absolute; top:16px; left:50%; margin-left:-3px; width:6px; height:6px; border-radius:999px; background:#0A1512; z-index:3; }
        .phone-screen{ background:#0E1F1A; border-radius:25px; padding:8px 11px 9px; display:flex; flex-direction:column; gap:8px; min-height:406px; }
        .ph-status{ display:flex; align-items:center; justify-content:space-between; color:#7E8D86; padding:2px 2px 0; font-size:.63rem; }
        .ph-status-icons{ display:flex; gap:4px; align-items:center; }
        .ph-appbar{ display:flex; align-items:flex-start; justify-content:space-between; padding:3px 2px 1px; }
        .ph-appbar-t{ font-family:'Schibsted Grotesk',sans-serif; font-weight:500; font-size:.84rem; color:#EFF1EC; letter-spacing:-.02em; }
        .ph-appbar-s{ color:#6F7E76; margin-top:2px; font-size:.62rem; }
        .ph-live{ display:inline-flex; align-items:center; gap:5px; color:#57BFA1; background:rgba(87,191,161,.14); padding:3px 8px; border-radius:999px; font-size:.62rem; }
        .ph-live-dot{ width:4px; height:4px; border-radius:999px; background:#57BFA1; animation:blink 1.8s ease-in-out infinite; }
        @keyframes blink{ 0%,100%{opacity:1} 50%{opacity:.25} }
        .ph-card{ position:relative; background:#15302A; border:1px solid rgba(239,241,236,.07); border-radius:15px; padding:10px; display:flex; align-items:center; justify-content:center; }
        .ph-ring{ width:96px; height:96px; transform:rotate(-90deg); }
        .ph-ring-bg{ fill:none; stroke:rgba(239,241,236,.09); stroke-width:8; }
        .ph-ring-fg{ fill:none; stroke:#57BFA1; stroke-width:8; stroke-linecap:round; transition:stroke-dashoffset 1.5s cubic-bezier(.22,.75,.3,1) .45s; }
        .ph-ring-label{ position:absolute; text-align:center; }
        .ph-ring-v{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; font-size:1.24rem; color:#EFF1EC; letter-spacing:-.03em; }
        .ph-ring-l{ color:#6F7E76; margin-top:1px; font-size:.6rem; }
        .ph-stats{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
        .ph-stat{ display:flex; align-items:center; gap:7px; background:#15302A; border:1px solid rgba(239,241,236,.07); border-radius:11px; padding:8px 9px; color:#57BFA1; }
        .ph-stat-v{ font-family:'Schibsted Grotesk',sans-serif; font-weight:500; font-size:.88rem; color:#EFF1EC; letter-spacing:-.02em; }
        .ph-stat-l{ color:#6F7E76; margin-top:1px; white-space:nowrap; font-size:.575rem; letter-spacing:.05em; }
        .ph-trip{ background:#15302A; border:1px solid rgba(239,241,236,.07); border-radius:13px; padding:9px 10px 10px; }
        .ph-trip-head{ display:flex; align-items:center; justify-content:space-between; color:#6F7E76; margin-bottom:8px; font-size:.6rem; }
        .ph-bars{ display:flex; align-items:flex-end; gap:4px; height:44px; }
        .ph-bar{ flex:1; background:linear-gradient(180deg,#57BFA1,rgba(87,191,161,.28)); border-radius:2px; transition:height .7s cubic-bezier(.22,.75,.3,1); }
        .ph-nav{ display:flex; align-items:center; justify-content:space-around; margin-top:auto; padding-top:7px; border-top:1px solid rgba(239,241,236,.08); }
        .ph-nav-i{ color:#4E5D56; display:inline-flex; padding:5px; border-radius:8px; }
        .ph-nav-i.is-active{ color:#57BFA1; background:rgba(87,191,161,.14); }
        .phone-badge{ color:var(--fg-faint); }

        /* ============ MARQUEE ============ */
        .marq{ border-top:1px solid var(--line); overflow:hidden; padding:16px 0;
          -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
          mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
        .marq-track{ display:flex; width:max-content; animation:slide 44s linear infinite; }
        .marq:hover .marq-track{ animation-play-state:paused; }
        @keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marq-item{ display:inline-flex; align-items:center; gap:20px; padding:0 20px; color:var(--fg-faint); white-space:nowrap; }
        .marq-dot{ width:3px; height:3px; border-radius:999px; background:var(--accent); flex-shrink:0; }

        /* ============ CASE STUDY ============ */
        .feat-head{ display:grid; gap:22px; align-items:end; }
        @media (min-width:900px){ .feat-head{ grid-template-columns:1.5fr 1fr; gap:44px; } }
        .feat-numbers{ display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); margin:40px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .feat-num{ padding:22px 0 22px 20px; border-left:1px solid var(--line); }
        .feat-num:first-child{ padding-left:0; border-left:none; }
        .feat-num .v{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; font-size:clamp(1.8rem,3vw,2.4rem); letter-spacing:-.035em; color:var(--accent); }
        .feat-num .l{ color:var(--fg-faint); font-size:.85rem; margin-top:6px; font-weight:300; line-height:1.45; }
        .feat-body{ display:grid; gap:38px; }
        @media (min-width:900px){ .feat-body{ grid-template-columns:1fr 1fr; gap:52px; } }
        .built-item{ padding-left:18px; border-left:1px solid var(--accent-line); margin-bottom:22px; }
        .built-item h4{ font-family:'Schibsted Grotesk',sans-serif; font-weight:500; font-size:1.06rem; letter-spacing:-.02em; margin:0 0 6px; }
        .built-item p{ margin:0; color:var(--fg-soft); font-size:.96rem; line-height:1.68; font-weight:300; }

        /* ============ CODE — dark by design ============ */
        .code{ border-radius:12px; overflow:hidden; background:#10201B; margin-top:32px; box-shadow:0 20px 44px -32px rgba(20,31,27,.6); }
        .code-bar{ display:flex; align-items:center; justify-content:space-between; padding:11px 15px; border-bottom:1px solid rgba(239,241,236,.09); background:#152A23; }
        .code-file{ color:#A2B0A9; }
        .code-tag{ color:#57BFA1; background:rgba(87,191,161,.14); padding:3px 9px; border-radius:999px; }
        .code-body{ margin:0; padding:16px 17px 18px; font-family:'JetBrains Mono',monospace; font-size:.775rem; line-height:1.78; color:#BDCAC3; overflow-x:auto; white-space:pre; }
        .c-type{ color:#8FD8C0; }
        .c-str{ color:#DCCB9C; }
        .c-num{ color:#8FD8C0; }
        .c-cm{ color:#63726B; font-style:italic; }

        /* ============ PROJECT CARDS ============ */
        .cards{ display:grid; grid-template-columns:1fr; gap:18px; }
        @media (min-width:760px){ .cards{ grid-template-columns:1fr 1fr; } }
        @media (min-width:1040px){ .cards{ grid-template-columns:repeat(3,1fr); } }
        .card{ position:relative; display:flex; flex-direction:column; width:100%; background:var(--surface-a); border:1px solid var(--line); border-radius:16px; padding:26px; overflow:hidden; transition:transform .4s cubic-bezier(.22,.75,.3,1),border-color .4s,box-shadow .4s,background-color .4s; }
        .card::before{ content:''; position:absolute; left:0; right:0; top:0; height:2px; background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.22,.75,.3,1); }
        .card:hover{ transform:translateY(-6px); border-color:var(--accent-line); background:#FFFFFF; box-shadow:var(--shadow); }
        .card:hover::before{ transform:scaleX(1); }
        .card-top{ display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:16px; }
        .card-n{ font-family:'JetBrains Mono',monospace; font-size:.78rem; color:var(--fg-faint); letter-spacing:.06em; }
        .card-arrow{ color:var(--fg-faint); transition:color .3s,transform .3s; }
        .card:hover .card-arrow{ color:var(--accent); transform:translate(2px,-2px); }
        .card-name{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; font-size:1.34rem; letter-spacing:-.032em; }
        .card-kicker{ color:var(--fg-faint); margin-top:7px; }
        .card-blurb{ color:var(--fg-soft); font-size:.96rem; line-height:1.7; font-weight:300; margin:15px 0 18px; }
        .card-bottom{ margin-top:auto; }
        .card-metric{ display:flex; align-items:center; gap:9px; color:var(--accent); padding:12px 0; margin-bottom:15px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .card-metric-bar{ width:12px; height:1px; background:var(--accent); flex-shrink:0; }
        .pill{ display:inline-flex; align-items:center; font-family:'JetBrains Mono',monospace; font-size:.7rem; letter-spacing:.05em; padding:5px 11px; border-radius:999px; background:var(--accent-dim); color:var(--accent); }

        /* ============ EXPERIENCE ============ */
        .job{ display:grid; gap:16px; padding:30px 0; border-top:1px solid var(--line); }
        @media (min-width:900px){ .job{ grid-template-columns:300px 1fr; gap:44px; } }
        .job-meta{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .job-role{ font-family:'Schibsted Grotesk',sans-serif; font-weight:600; font-size:1.2rem; letter-spacing:-.028em; }
        .job-company{ color:var(--fg-soft); font-size:.95rem; margin-top:6px; font-weight:300; }
        .job-loc{ color:var(--fg-faint); margin-top:9px; }
        .job-list{ list-style:none; margin:0; padding:0; }
        .job-point{ position:relative; padding-left:22px; margin-bottom:13px; color:var(--fg-soft); font-size:1rem; line-height:1.68; font-weight:300; }
        .job-point:last-child{ margin-bottom:0; }
        .job-point::before{ content:''; position:absolute; left:0; top:.72em; width:10px; height:1px; background:var(--accent-line); }
        .dot{ width:8px; height:8px; border-radius:999px; flex-shrink:0; border:1px solid var(--line-mid); }
        .dot.is-current{ border-color:var(--accent); background:var(--accent); box-shadow:0 0 0 4px var(--accent-dim); }

        /* ============ STACK / EDU ============ */
        .stack-grid{ display:grid; grid-template-columns:1fr; gap:0 44px; }
        @media (min-width:900px){ .stack-grid{ grid-template-columns:1fr 1fr; } }
        .stack-group{ padding:24px 0; border-top:1px solid var(--line); }
        .edu-grid{ display:grid; grid-template-columns:1fr; gap:16px; margin-top:20px; }
        @media (min-width:768px){ .edu-grid{ grid-template-columns:1fr 1fr; } }
        .panel{ background:var(--surface-a); border:1px solid var(--line); border-radius:12px; padding:24px; }
        .edu-degree{ font-family:'Schibsted Grotesk',sans-serif; font-weight:500; font-size:1.06rem; letter-spacing:-.022em; }
        .edu-school{ color:var(--fg-soft); font-size:.93rem; margin-top:6px; font-weight:300; }

        /* ============ FOOTER — compact ============ */
        .foot-cta{ display:grid; gap:22px; align-items:end; padding-bottom:38px; border-bottom:1px solid var(--line); }
        @media (min-width:900px){ .foot-cta{ grid-template-columns:1.4fr 1fr; gap:44px; } }
        .foot-h{ font-size:clamp(1.8rem,4vw,2.6rem); }
        .foot-cols{ display:grid; grid-template-columns:1fr 1fr; gap:28px 24px; padding:34px 0 40px; }
        @media (min-width:760px){ .foot-cols{ grid-template-columns:repeat(4,1fr); } }
        .foot-col h5{ margin:0 0 13px; color:var(--fg-faint); font-weight:500; }
        .foot-col a,.foot-col p{ display:flex; align-items:center; gap:9px; color:var(--fg-soft); font-size:.94rem; font-weight:300; margin:0 0 10px; transition:color .25s,transform .25s; }
        .foot-col a:hover{ color:var(--accent); transform:translateX(3px); }
        .foot-bar{ display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:14px; padding:18px 0 22px; border-top:1px solid var(--line); color:var(--fg-faint); }
        .to-top{ position:fixed; right:20px; bottom:20px; z-index:55; width:44px; height:44px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; background:#1A6B54; color:#FFFFFF; border:none; cursor:pointer; opacity:0; pointer-events:none; transform:translateY(10px); transition:opacity .35s,transform .35s; box-shadow:0 10px 26px -12px rgba(20,31,27,.5); }
        .to-top.is-on{ opacity:1; pointer-events:auto; transform:none; }

        @media (prefers-reduced-motion: reduce){
          html{ scroll-behavior:auto; }
          .rr-root *,.rr-root *::before,.rr-root *::after{ animation:none !important; transition-duration:.01ms !important; }
          .rv,.phone{ opacity:1; transform:none; }
          .marq-track{ animation:none; }
        }


        /* ============================================================
           RESPONSIVE SYSTEM — mobile / tablet / desktop
           ============================================================ */
        .rr-root{
          width:100%;
          min-width:0;
          overflow-x:clip;
        }
        .rr-root *,
        .rr-root *::before,
        .rr-root *::after{
          min-width:0;
        }
        .rr-root img,
        .rr-root svg,
        .rr-root video,
        .rr-root canvas{
          max-width:100%;
        }
        .rr-root button,
        .rr-root a{
          -webkit-tap-highlight-color:transparent;
        }

        /* Tablet / small laptop */
        @media (max-width:999px){
          .nav-bar{ height:62px; }
          .nav-name{ font-size:.94rem; }
          .nav-toggle{ min-width:64px; min-height:44px; justify-content:center; }
          .nav-drawer{ margin-left:-22px; margin-right:-22px; padding-left:22px; padding-right:22px; }
          .nav-drawer a{ min-height:48px; display:flex; align-items:center; }

          .hero{ grid-template-columns:minmax(0,1fr); gap:32px; }
          .hero > *{ min-width:0; }
          .hero-h1{ font-size:clamp(2.2rem,7vw,3.25rem); overflow-wrap:anywhere; }
          .phone-wrap{ width:100%; transform:none !important; }
          .feat-head,
          .feat-body,
          .foot-cta{ grid-template-columns:minmax(0,1fr); }
        }

        /* Phone */
        @media (max-width:767px){
          .wrap{ padding-left:18px; padding-right:18px; }
          .nav-drawer{ margin-left:-18px; margin-right:-18px; padding-left:18px; padding-right:18px; }

          .hero{
            gap:28px;
            padding-top:25px;
            padding-bottom:30px;
          }
          .hero-h1{
            margin-top:14px;
            margin-bottom:14px;
            font-size:clamp(2rem,10.5vw,2.75rem);
            line-height:1.03;
          }
          .body-lg{
            font-size:1rem;
            line-height:1.68;
          }
          .btn-row{
            display:grid;
            grid-template-columns:1fr;
            width:100%;
            gap:9px;
          }
          .btn-row > a{
            width:100%;
            min-height:46px;
            justify-content:center;
          }
          .hero-meta{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:14px 16px;
            margin-top:20px;
            padding-top:17px;
          }
          .hero-meta > *{ min-width:0; }
          .hero-meta span,
          .hero-meta b{ overflow-wrap:anywhere; }

          .phone{ width:min(232px,calc(100vw - 56px)); }
          .phone-screen{ min-height:390px; }

          .feat-numbers{
            grid-template-columns:1fr 1fr;
            margin:28px 0;
          }
          .feat-num{
            padding:17px 10px;
            border-left:0;
            border-bottom:1px solid var(--line);
          }
          .feat-num:nth-child(odd){ border-right:1px solid var(--line); }
          .feat-num:nth-last-child(-n+2){ border-bottom:0; }
          .feat-num:first-child{ padding-left:10px; }
          .feat-num .v{ font-size:clamp(1.65rem,8vw,2.2rem); }
          .feat-num .l{ font-size:.78rem; }

          .feat-body{ gap:28px; }
          .prose{ font-size:1rem; line-height:1.7; }

          .code{ margin-top:25px; border-radius:10px; }
          .code-bar{ padding:10px 12px; gap:8px; }
          .code-file{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
          .code-body{
            padding:14px;
            font-size:.68rem;
            line-height:1.7;
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
          }

          .cards{ gap:14px; }
          .card{ padding:20px; border-radius:14px; }
          .card-name{ font-size:1.22rem; }
          .card-blurb{ font-size:.93rem; line-height:1.62; }
          .pill{ max-width:100%; white-space:normal; overflow-wrap:anywhere; }

          .job{ gap:13px; padding:23px 0; }
          .job-role{ font-size:1.1rem; }
          .job-point{ font-size:.95rem; line-height:1.62; padding-left:19px; }

          .stack-group{ padding:20px 0; }
          .chip-row{ gap:6px; }
          .chip{
            max-width:100%;
            white-space:normal;
            overflow-wrap:anywhere;
          }

          .edu-grid{ gap:12px; }
          .panel{ padding:20px; }

          .foot-cta{ gap:18px; padding-bottom:28px; }
          .foot-h{ font-size:clamp(1.8rem,9vw,2.4rem); }
          .foot-cols{
            grid-template-columns:1fr 1fr;
            gap:23px 17px;
            padding:27px 0 31px;
          }
          .foot-col a,
          .foot-col p{
            font-size:.86rem;
            overflow-wrap:anywhere;
            word-break:break-word;
          }
          .foot-bar{
            align-items:flex-start;
            flex-direction:column;
            padding-bottom:17px;
          }
          .to-top{ right:14px; bottom:14px; width:42px; height:42px; }
        }

        /* Very small phones: 320–380px */
        @media (max-width:380px){
          .wrap{ padding-left:15px; padding-right:15px; }
          .nav-drawer{ margin-left:-15px; margin-right:-15px; padding-left:15px; padding-right:15px; }
          .nav-name{ max-width:calc(100vw - 105px); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
          .hero-h1{ font-size:2rem; }
          .hero-meta{ grid-template-columns:1fr; }
          .feat-numbers{ grid-template-columns:1fr; }
          .feat-num,
          .feat-num:nth-child(odd),
          .feat-num:nth-last-child(-n+2){ border-right:0; border-bottom:1px solid var(--line); }
          .feat-num:last-child{ border-bottom:0; }
          .foot-cols{ grid-template-columns:1fr; gap:21px; }
          .phone{ width:min(210px,calc(100vw - 42px)); }
        }

        @media (prefers-reduced-motion:reduce){
          .rr-root *,
          .rr-root *::before,
          .rr-root *::after{
            scroll-behavior:auto !important;
          }
          .phone-wrap{ transform:none !important; }
          .marq-track{ animation:none !important; }
        }

      `}</style>

      <div className="prog" style={{ width: `${progress}%` }} />

      {/* ============ NAV + HERO ============ */}
      <div className="zone zone-band">
        <header className={`nav-wrap ${scrolled ? "is-stuck" : ""}`}>
          <div className="wrap nav-bar">
            <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span className="monogram">RR</span>
              <span className="nav-name">Rashmi Rani</span>
            </a>
            <nav className="nav-links">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className={`nav-link mono-label ${active === n.id ? "is-active" : ""}`}>
                  {n.label}
                </a>
              ))}
              <a href={RESUME} download className="btn-ghost">
                <FileDown size={13} strokeWidth={2} /> Résumé
              </a>
              <a href="#contact" className="btn-primary nav-cta">Get in touch</a>
            </nav>
            <button className="nav-toggle mono-label" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
              {menuOpen ? "close" : "menu"}
            </button>
          </div>
          {menuOpen && (
            <div className="nav-drawer">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="mono-label">{n.label}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mono-label">contact</a>
              <a href={RESUME} download onClick={() => setMenuOpen(false)} className="mono-label">download résumé</a>
            </div>
          )}
        </header>

        <section id="top" className="wrap">
          <div className="hero">
            <div>
              <Reveal>
                <span className="status mono-label"><span className="status-dot" /> open to full-time & freelance work</span>
              </Reveal>
              <Reveal delay={70}>
                <h1 className="display hero-h1">
                  One codebase.
                  <br />
                  <span className="accent-text">Two stores.</span>
                </h1>
              </Reveal>
              <Reveal delay={130}>
                <p className="body-lg" style={{ maxWidth: "46ch", marginBottom: 26 }}>
                  Android developer in Noida, open to full-time roles and
                  freelance projects. I build, debug, test and fix production
                  Android and iOS apps from one Kotlin Multiplatform codebase —
                  Compose Multiplatform on top, Ktor and Clean Architecture
                  underneath.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="btn-row">
                  <a href="#feature" className="btn-primary">View my work <ArrowUpRight size={15} strokeWidth={2.2} /></a>
                  <a href={RESUME} download className="btn-ghost"><FileDown size={14} strokeWidth={2} /> Download résumé</a>
                  <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="btn-ghost">Google Play <ArrowUpRight size={13} strokeWidth={2} /></a>
                  <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="btn-ghost">App Store <ArrowUpRight size={13} strokeWidth={2} /></a>
                </div>
              </Reveal>
              <Reveal delay={230}>
                <div className="hero-meta mono-label">
                  <span><b>2</b> apps shipped</span>
                  <span><b>300+</b> paying users</span>
                  <span><b>1.5 yrs</b> in production</span>
                </div>
              </Reveal>
            </div>
            <PhoneMock ready={ready} offset={offset} />
          </div>
        </section>

        <div className="wrap">
          <div className="marq">
            <div className="marq-track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => (
                <span key={i} className="marq-item mono-label is-code"><span className="marq-dot" />{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ CASE STUDY ============ */}
      <section id="feature" className="zone zone-page">
        <div className="wrap" style={{ paddingTop: 84, paddingBottom: 86 }}>
          <Reveal>
            <Eyebrow>case study</Eyebrow>
            <div className="feat-head" style={{ marginTop: 18 }}>
              <div>
                <h2 className="display" style={{ fontSize: "clamp(2.1rem,4.8vw,3.1rem)" }}>{FEATURE.name}</h2>
                <div className="mono-label is-code" style={{ color: "var(--fg-faint)", marginTop: 12 }}>{FEATURE.kicker}</div>
              </div>
              <div className="btn-row">
                <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="btn-ghost">Google Play <ArrowUpRight size={13} strokeWidth={2} /></a>
                <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="btn-ghost">App Store <ArrowUpRight size={13} strokeWidth={2} /></a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div className="feat-numbers">
              {FEATURE.numbers.map((n) => (
                <div key={n.l} className="feat-num">
                  <div className="v"><CountUp to={n.v} suffix={n.suffix} /></div>
                  <div className="l">{n.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="feat-body">
            <Reveal delay={60}>
              <div>
                <div className="mono-label" style={{ color: "var(--accent)", marginBottom: 12 }}>the problem</div>
                <p className="prose" style={{ margin: "0 0 28px" }}>{FEATURE.problem}</p>
                <div className="mono-label" style={{ color: "var(--accent)", marginBottom: 12 }}>the approach</div>
                <p className="prose" style={{ margin: "0 0 22px" }}>{FEATURE.approach}</p>
                <div className="chip-row">{FEATURE.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                <CodeCard />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="mono-label" style={{ color: "var(--accent)", marginBottom: 16 }}>what I built</div>
                {FEATURE.built.map((b) => (
                  <div key={b.t} className="built-item">
                    <h4>{b.t}</h4>
                    <p>{b.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" className="zone zone-band">
        <div className="wrap edge" style={{ paddingTop: 80, paddingBottom: 84 }}>
          <Reveal>
            <Eyebrow>projects</Eyebrow>
            <h2 className="h-sect" style={{ marginTop: 16, marginBottom: 14 }}>Also built</h2>
            <p className="body-lg" style={{ maxWidth: "54ch", marginBottom: 34 }}>
              Earlier production Android work, mostly Java and XML, before the
              move to Kotlin Multiplatform.
            </p>
          </Reveal>

          <div className="cards">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} style={{ display: "flex" }}>
                <article className="card">
                  <div className="card-top">
                    <span className="card-n">{p.n} / {p.year}</span>
                    <ArrowUpRight size={16} strokeWidth={2} className="card-arrow" />
                  </div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-kicker mono-label is-code">{p.kicker}</div>
                  <p className="card-blurb">{p.blurb}</p>
                  <div className="card-bottom">
                    <div className="card-metric mono-label is-code">
                      <span className="card-metric-bar" /> {p.metric}
                    </div>
                    <div className="chip-row" style={{ marginBottom: 14 }}>
                      {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                    </div>
                    {p.targets.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="work" className="zone zone-page">
        <div className="wrap" style={{ paddingTop: 82, paddingBottom: 84 }}>
          <Reveal>
            <Eyebrow>experience</Eyebrow>
            <h2 className="h-sect" style={{ marginTop: 16, marginBottom: 26 }}>Where I've shipped</h2>
          </Reveal>
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} delay={i * 80}>
              <div className="job">
                <div>
                  <div className="job-meta">
                    <span className={`dot ${job.current ? "is-current" : ""}`} />
                    <span className="mono-label" style={{ color: job.current ? "var(--accent)" : "var(--fg-faint)" }}>
                      {job.period}
                    </span>
                  </div>
                  <h3 className="job-role">{job.role}</h3>
                  <div className="job-company">{job.company}</div>
                  <div className="mono-label is-code job-loc">{job.location}</div>
                </div>
                <ul className="job-list">
                  {job.points.map((pt) => <li key={pt} className="job-point">{pt}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </section>

      {/* ============ STACK + EDUCATION ============ */}
      <section id="stack" className="zone zone-band">
        <div className="wrap edge" style={{ paddingTop: 80, paddingBottom: 88 }}>
          <Reveal>
            <Eyebrow>stack</Eyebrow>
            <h2 className="h-sect" style={{ marginTop: 16, marginBottom: 26 }}>What I reach for</h2>
          </Reveal>
          <div className="stack-grid">
            {STACK.map((g, i) => (
              <Reveal key={g.group} delay={i * 50}>
                <div className="stack-group">
                  <div className="mono-label is-code" style={{ color: "var(--accent)", marginBottom: 13 }}>{g.group}</div>
                  <div className="chip-row">{g.items.map((it) => <span key={it} className="chip">{it}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ paddingTop: 48 }}>
              <Eyebrow>education</Eyebrow>
              <div className="edu-grid">
                {EDUCATION.map((e) => (
                  <div key={e.degree} className="panel">
                    <div className="mono-label is-code" style={{ color: "var(--fg-faint)", marginBottom: 9 }}>{e.period}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-school">{e.school}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="contact" className="zone zone-page">
        <div className="wrap edge" style={{ paddingTop: 62 }}>
          <Reveal>
            <div className="foot-cta">
              <div>
                <Eyebrow>contact</Eyebrow>
                <h2 className="display foot-h" style={{ marginTop: 14, marginBottom: 14 }}>
                  Let's build
                  <br />
                  <span className="accent-text">something good.</span>
                </h2>
                <p className="body-lg" style={{ maxWidth: "42ch" }}>
                  Open to full-time Android or KMP roles in Noida, Delhi NCR or
                  remote — and available for freelance projects. Email is
                  fastest, I reply within a day.
                </p>
              </div>
              <div className="btn-row">
                <a href={`mailto:${EMAIL}`} className="btn-primary"><Mail size={15} strokeWidth={2} /> Email me</a>
                <a href={RESUME} download className="btn-ghost"><FileDown size={14} strokeWidth={2} /> Download résumé</a>
                <a href="https://linkedin.com/in/rashmi-rani-77b359261" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Linkedin size={13} strokeWidth={2} /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          <div className="foot-cols">
            <div className="foot-col">
              <h5 className="mono-label">navigate</h5>
              {NAV.map((n) => <a key={n.href} href={n.href}>{n.label.charAt(0).toUpperCase() + n.label.slice(1)}</a>)}
              <a href={RESUME} download><FileDown size={13} strokeWidth={1.8} /> Résumé (PDF)</a>
            </div>
            <div className="foot-col">
              <h5 className="mono-label">live apps</h5>
              <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer">Google Play <ArrowUpRight size={12} strokeWidth={2} /></a>
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer">App Store <ArrowUpRight size={12} strokeWidth={2} /></a>
            </div>
            <div className="foot-col">
              <h5 className="mono-label">elsewhere</h5>
              {CONTACT.map((c) => {
                const Icon = c.icon;
                return (
                  <a key={c.href} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <Icon size={13} strokeWidth={1.8} /> {c.label}
                  </a>
                );
              })}
            </div>
            <div className="foot-col">
              <h5 className="mono-label">currently</h5>
              <p><MapPin size={13} strokeWidth={1.8} /> Noida, Uttar Pradesh</p>
              <p><Car size={13} strokeWidth={1.8} /> Building Eva2z Connect</p>
              <div style={{ marginTop: 4 }}>
                <span className="status mono-label"><span className="status-dot" /> open to work</span>
              </div>
            </div>
          </div>

          <div className="foot-bar">
            <span className="mono-label">© {new Date().getFullYear()} rashmi rani · noida, india</span>
            <span className="mono-label is-code">React · Vite · Tailwind</span>
          </div>
        </div>
      </footer>

      <button className={`to-top ${showTop ? "is-on" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <ArrowUp size={17} strokeWidth={2.2} />
      </button>
    </div>
  );
}
