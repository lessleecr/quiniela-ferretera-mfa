import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Save, LogOut } from "lucide-react";

const supabase = createClient(
  "https://xhouolqlmrrqzfctblwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob3VvbHFsbXJycXpmY3RibHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYyNjYsImV4cCI6MjA5NTg0MjI2Nn0.jodF4LzC6K7DyG5nYTbCNqwr1z_x8qljjMEQYoL2aOY"
);

const ADMIN_EMAILS = ["lvillegasv@mfamayoreo.com"];

const G = {
  green:"#1a9e3f", greenDark:"#0f6b2a", greenDim:"#1e3d28", greenLight:"#22c44f",
  bg:"#0d0d0d", card:"#161616", card2:"#1e1e1e", border:"#2a2a2a", muted:"#666", gray:"#aaa",
};

const inp = { width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderRadius:8, padding:"11px 14px", fontSize:14, color:"#fff", fontFamily:"'Barlow',sans-serif", outline:"none" };
const lbl = { display:"block", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".8px", color:G.gray, marginBottom:6 };
const greenBtn = { width:"100%", background:G.green, border:"none", borderRadius:10, padding:"14px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, letterSpacing:2, textTransform:"uppercase", color:"#fff", cursor:"pointer" };
const card = { background:G.card, border:`1px solid ${G.border}`, borderRadius:16 };

const teams = {
  MEX:{code:"MEX",name:"México",flag:"🇲🇽"},RSA:{code:"RSA",name:"Sudáfrica",flag:"🇿🇦"},KOR:{code:"KOR",name:"Corea del Sur",flag:"🇰🇷"},CZE:{code:"CZE",name:"Chequia",flag:"🇨🇿"},CAN:{code:"CAN",name:"Canadá",flag:"🇨🇦"},BIH:{code:"BIH",name:"Bosnia",flag:"🇧🇦"},QAT:{code:"QAT",name:"Qatar",flag:"🇶🇦"},SUI:{code:"SUI",name:"Suiza",flag:"🇨🇭"},BRA:{code:"BRA",name:"Brasil",flag:"🇧🇷"},MAR:{code:"MAR",name:"Marruecos",flag:"🇲🇦"},HAI:{code:"HAI",name:"Haití",flag:"🇭🇹"},SCO:{code:"SCO",name:"Escocia",flag:"🏴"},USA:{code:"USA",name:"EE.UU.",flag:"🇺🇸"},PAR:{code:"PAR",name:"Paraguay",flag:"🇵🇾"},AUS:{code:"AUS",name:"Australia",flag:"🇦🇺"},TUR:{code:"TUR",name:"Turquía",flag:"🇹🇷"},GER:{code:"GER",name:"Alemania",flag:"🇩🇪"},CUW:{code:"CUW",name:"Curazao",flag:"🇨🇼"},CIV:{code:"CIV",name:"Costa de Marfil",flag:"🇨🇮"},ECU:{code:"ECU",name:"Ecuador",flag:"🇪🇨"},NED:{code:"NED",name:"Países Bajos",flag:"🇳🇱"},JPN:{code:"JPN",name:"Japón",flag:"🇯🇵"},SWE:{code:"SWE",name:"Suecia",flag:"🇸🇪"},TUN:{code:"TUN",name:"Túnez",flag:"🇹🇳"},BEL:{code:"BEL",name:"Bélgica",flag:"🇧🇪"},EGY:{code:"EGY",name:"Egipto",flag:"🇪🇬"},IRN:{code:"IRN",name:"Irán",flag:"🇮🇷"},NZL:{code:"NZL",name:"Nueva Zelanda",flag:"🇳🇿"},ESP:{code:"ESP",name:"España",flag:"🇪🇸"},CPV:{code:"CPV",name:"Cabo Verde",flag:"🇨🇻"},KSA:{code:"KSA",name:"Arabia Saudita",flag:"🇸🇦"},URU:{code:"URU",name:"Uruguay",flag:"🇺🇾"},FRA:{code:"FRA",name:"Francia",flag:"🇫🇷"},SEN:{code:"SEN",name:"Senegal",flag:"🇸🇳"},IRQ:{code:"IRQ",name:"Irak",flag:"🇮🇶"},NOR:{code:"NOR",name:"Noruega",flag:"🇳🇴"},ARG:{code:"ARG",name:"Argentina",flag:"🇦🇷"},ALG:{code:"ALG",name:"Argelia",flag:"🇩🇿"},AUT:{code:"AUT",name:"Austria",flag:"🇦🇹"},JOR:{code:"JOR",name:"Jordania",flag:"🇯🇴"},POR:{code:"POR",name:"Portugal",flag:"🇵🇹"},COD:{code:"COD",name:"Congo DR",flag:"🇨🇩"},UZB:{code:"UZB",name:"Uzbekistán",flag:"🇺🇿"},COL:{code:"COL",name:"Colombia",flag:"🇨🇴"},ENG:{code:"ENG",name:"Inglaterra",flag:"🏴"},CRO:{code:"CRO",name:"Croacia",flag:"🇭🇷"},GHA:{code:"GHA",name:"Ghana",flag:"🇬🇭"},PAN:{code:"PAN",name:"Panamá",flag:"🇵🇦"},
};

const matchList = [
  {id:1,group:"A",home:"MEX",away:"RSA",date:"11 JUN",time:"1:00 PM"},{id:2,group:"A",home:"KOR",away:"CZE",date:"11 JUN",time:"8:00 PM"},{id:3,group:"B",home:"CAN",away:"BIH",date:"12 JUN",time:"1:00 PM"},{id:4,group:"D",home:"USA",away:"PAR",date:"12 JUN",time:"7:00 PM"},{id:5,group:"B",home:"QAT",away:"SUI",date:"13 JUN",time:"1:00 PM"},{id:6,group:"C",home:"BRA",away:"MAR",date:"13 JUN",time:"4:00 PM"},{id:7,group:"C",home:"HAI",away:"SCO",date:"13 JUN",time:"7:00 PM"},{id:8,group:"D",home:"AUS",away:"TUR",date:"13 JUN",time:"10:00 PM"},{id:9,group:"E",home:"GER",away:"CUW",date:"14 JUN",time:"11:00 AM"},{id:10,group:"F",home:"NED",away:"JPN",date:"14 JUN",time:"2:00 PM"},{id:11,group:"E",home:"CIV",away:"ECU",date:"14 JUN",time:"5:00 PM"},{id:12,group:"F",home:"TUN",away:"SWE",date:"14 JUN",time:"8:00 PM"},{id:13,group:"H",home:"ESP",away:"CPV",date:"15 JUN",time:"10:00 AM"},{id:14,group:"G",home:"BEL",away:"EGY",date:"15 JUN",time:"1:00 PM"},{id:15,group:"H",home:"KSA",away:"URU",date:"15 JUN",time:"4:00 PM"},{id:16,group:"G",home:"IRN",away:"NZL",date:"15 JUN",time:"7:00 PM"},{id:17,group:"I",home:"FRA",away:"SEN",date:"16 JUN",time:"1:00 PM"},{id:18,group:"I",home:"IRQ",away:"NOR",date:"16 JUN",time:"4:00 PM"},{id:19,group:"J",home:"ARG",away:"ALG",date:"16 JUN",time:"7:00 PM"},{id:20,group:"J",home:"AUT",away:"JOR",date:"16 JUN",time:"10:00 PM"},{id:21,group:"K",home:"POR",away:"COD",date:"17 JUN",time:"11:00 AM"},{id:22,group:"L",home:"ENG",away:"CRO",date:"17 JUN",time:"2:00 PM"},{id:23,group:"L",home:"GHA",away:"PAN",date:"17 JUN",time:"5:00 PM"},{id:24,group:"K",home:"UZB",away:"COL",date:"17 JUN",time:"8:00 PM"},{id:25,group:"A",home:"CZE",away:"RSA",date:"18 JUN",time:"10:00 AM"},{id:26,group:"B",home:"SUI",away:"BIH",date:"18 JUN",time:"1:00 PM"},{id:27,group:"B",home:"CAN",away:"QAT",date:"18 JUN",time:"4:00 PM"},{id:28,group:"A",home:"MEX",away:"KOR",date:"18 JUN",time:"7:00 PM"},{id:29,group:"D",home:"USA",away:"AUS",date:"19 JUN",time:"1:00 PM"},{id:30,group:"C",home:"SCO",away:"MAR",date:"19 JUN",time:"1:00 PM"},{id:31,group:"C",home:"BRA",away:"HAI",date:"19 JUN",time:"7:00 PM"},{id:32,group:"D",home:"TUR",away:"PAR",date:"19 JUN",time:"10:00 PM"},{id:33,group:"F",home:"NED",away:"SWE",date:"20 JUN",time:"11:00 AM"},{id:34,group:"E",home:"GER",away:"CIV",date:"20 JUN",time:"2:00 PM"},{id:35,group:"E",home:"ECU",away:"CUW",date:"20 JUN",time:"6:00 PM"},{id:36,group:"F",home:"TUN",away:"JPN",date:"20 JUN",time:"10:00 PM"},{id:37,group:"H",home:"ESP",away:"KSA",date:"21 JUN",time:"10:00 AM"},{id:38,group:"G",home:"BEL",away:"IRN",date:"21 JUN",time:"1:00 PM"},{id:39,group:"H",home:"URU",away:"CPV",date:"21 JUN",time:"4:00 PM"},{id:40,group:"G",home:"NZL",away:"EGY",date:"21 JUN",time:"7:00 PM"},{id:41,group:"J",home:"ARG",away:"AUT",date:"22 JUN",time:"11:00 AM"},{id:42,group:"I",home:"FRA",away:"IRQ",date:"22 JUN",time:"3:00 PM"},{id:43,group:"I",home:"NOR",away:"SEN",date:"22 JUN",time:"6:00 PM"},{id:44,group:"J",home:"JOR",away:"ALG",date:"22 JUN",time:"9:00 PM"},{id:45,group:"K",home:"POR",away:"UZB",date:"23 JUN",time:"11:00 AM"},{id:46,group:"L",home:"ENG",away:"GHA",date:"23 JUN",time:"2:00 PM"},{id:47,group:"L",home:"PAN",away:"CRO",date:"23 JUN",time:"5:00 PM"},{id:48,group:"K",home:"COL",away:"COD",date:"23 JUN",time:"8:00 PM"},{id:49,group:"B",home:"SUI",away:"CAN",date:"24 JUN",time:"1:00 PM"},{id:50,group:"B",home:"BIH",away:"QAT",date:"24 JUN",time:"1:00 PM"},{id:51,group:"C",home:"BRA",away:"SCO",date:"24 JUN",time:"4:00 PM"},{id:52,group:"C",home:"MAR",away:"HAI",date:"24 JUN",time:"4:00 PM"},{id:53,group:"A",home:"MEX",away:"CZE",date:"24 JUN",time:"7:00 PM"},{id:54,group:"A",home:"KOR",away:"RSA",date:"24 JUN",time:"7:00 PM"},{id:55,group:"E",home:"ECU",away:"GER",date:"25 JUN",time:"2:00 PM"},{id:56,group:"E",home:"CUW",away:"CIV",date:"25 JUN",time:"2:00 PM"},{id:57,group:"F",home:"TUN",away:"NED",date:"25 JUN",time:"5:00 PM"},{id:58,group:"F",home:"JPN",away:"SWE",date:"25 JUN",time:"5:00 PM"},{id:59,group:"D",home:"USA",away:"TUR",date:"25 JUN",time:"8:00 PM"},{id:60,group:"D",home:"PAR",away:"AUS",date:"25 JUN",time:"8:00 PM"},{id:61,group:"I",home:"NOR",away:"FRA",date:"26 JUN",time:"1:00 PM"},{id:62,group:"I",home:"SEN",away:"IRQ",date:"26 JUN",time:"1:00 PM"},{id:63,group:"H",home:"URU",away:"ESP",date:"26 JUN",time:"6:00 PM"},{id:64,group:"H",home:"CPV",away:"KSA",date:"26 JUN",time:"6:00 PM"},{id:65,group:"G",home:"NZL",away:"BEL",date:"26 JUN",time:"9:00 PM"},{id:66,group:"G",home:"EGY",away:"IRN",date:"26 JUN",time:"9:00 PM"},{id:67,group:"L",home:"PAN",away:"ENG",date:"27 JUN",time:"3:00 PM"},{id:68,group:"L",home:"CRO",away:"GHA",date:"27 JUN",time:"3:00 PM"},{id:69,group:"K",home:"COL",away:"POR",date:"27 JUN",time:"5:30 PM"},{id:70,group:"K",home:"COD",away:"UZB",date:"27 JUN",time:"5:30 PM"},{id:71,group:"J",home:"ARG",away:"JOR",date:"27 JUN",time:"8:00 PM"},{id:72,group:"J",home:"ALG",away:"AUT",date:"27 JUN",time:"8:00 PM"},
];

function calcPoints(pred, result) {
  if (!pred || pred.home === "" || pred.away === "") return 0;
  const h = Number(pred.home), a = Number(pred.away);
  if (h === result.home && a === result.away) return 5;
  const pd = h - a, rd = result.home - result.away;
  const pw = pd === 0 ? "d" : pd > 0 ? "h" : "a";
  const rw = rd === 0 ? "d" : rd > 0 ? "h" : "a";
  let pts = 0;
  if (pw === rw) pts += 3;
  if (pd === rd && pts < 5) pts += 1;
  return pts;
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, disabled }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      <select value={value} disabled={disabled} onChange={e => onChange(e.target.value)} style={{ ...inp, opacity: disabled ? .5 : 1 }}>
        <option value="">Seleccionar</option>
        {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, margin:"16px 0 14px" }}>
      <div style={{ flex:1, height:1, background:G.border }}></div>
      <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:G.green, whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:G.border }}></div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background:"rgba(255,80,80,.1)", border:"1px solid rgba(255,80,80,.3)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#ff5050", marginBottom:14 }}>
      ⚠️ {msg}
    </div>
  );
}

function Header({ subtitle }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:28 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:46, height:46, background:G.green, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:"#fff" }}>M</div>
        <div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:900, letterSpacing:2, lineHeight:1 }}>MFA</div>
          <div style={{ fontSize:10, color:G.gray, letterSpacing:1, textTransform:"uppercase" }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, background:G.card, border:`1px solid ${G.border}`, borderRadius:100, padding:"8px 16px" }}>
        <div style={{ width:8, height:8, background:G.green, borderRadius:"50%", animation:"pulse 2s infinite" }}></div>
        <span style={{ fontSize:12, color:G.gray }}>Quiniela Ferretera MFA · Mundial 2026</span>
      </div>
      <style>{`
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

/* ─── RESPONSIVE MÓVIL ─── */
@media (max-width: 768px) {

  /* Landing: grid de 3 cols → 1 col */
  .landing-grid {
    display: flex !important;
    flex-direction: column !important;
  }
  /* Ocultar banners laterales en móvil */
  .banner-lateral { display: none !important; }

  /* Dashboard: ocultar banners laterales, 1 col */
  .dashboard-grid {
    display: flex !important;
    flex-direction: column !important;
  }
  .dashboard-sidebar { display: none !important; }

  /* Tabs: scroll horizontal sin wrap */
  .tabs-row {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 6px !important;
    gap: 6px !important;
    scrollbar-width: none !important;
  }
  .tabs-row::-webkit-scrollbar { display: none !important; }
  .tabs-row button {
    flex-shrink: 0 !important;
    padding: 8px 10px !important;
    font-size: 11px !important;
  }

  /* Header pill oculto en móvil */
  .header-pill { display: none !important; }
  .header-bar { padding-bottom: 12px !important; }
  .main-padding { padding: 12px !important; }

  /* Top10 y próximos partidos: 1 columna */
  .landing-info-grid { grid-template-columns: 1fr !important; }

  /* ── PREDICCIONES ── */
  .predictions-grid { grid-template-columns: 1fr !important; }
  .predictions-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
  }
  .predictions-filters {
    width: 100% !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    scrollbar-width: none !important;
  }
  .predictions-filters::-webkit-scrollbar { display: none !important; }

  /* ── RESULTADOS ── */
  .results-stats { grid-template-columns: 1fr 1fr !important; }
  .result-row {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }
  .result-scores { grid-template-columns: 1fr 1fr !important; }

  /* ── POSICIONES ── */
  .standings-table { overflow-x: auto !important; }
  .standings-table table { min-width: 480px !important; }
  .standings-table th, .standings-table td {
    padding: 10px 10px !important;
    font-size: 12px !important;
  }

  /* ── PERFIL ── */
  .profile-grid { grid-template-columns: 1fr !important; }
  .profile-summary { grid-column: 1 !important; }
  .profile-stats { grid-template-columns: 1fr 1fr !important; }
  .profile-table { overflow-x: auto !important; }
  .profile-table table { min-width: 580px !important; }

  /* ── CHAT ── */
  .chat-container { height: 70vh !important; }

  /* ── ADMIN ── */
  .admin-tabs { flex-wrap: wrap !important; }
  .admin-scores-grid { grid-template-columns: 1fr !important; }
  .admin-users-grid { grid-template-columns: 1fr !important; }
  .admin-user-detail { grid-template-columns: 1fr 1fr !important; }
  .admin-pred-table { overflow-x: auto !important; }
  .admin-pred-table table { min-width: 600px !important; }
  .admin-banners-grid { grid-template-columns: 1fr !important; }

  /* ── REGLAS ── */
  .rules-grid { grid-template-columns: 1fr !important; }
}

/* ─── RESPONSIVE TABLET ─── */
@media (min-width: 769px) and (max-width: 1024px) {
  .landing-grid { grid-template-columns: 160px 1fr !important; }
  .banner-lateral { display: none !important; }
  .dashboard-grid { grid-template-columns: 1fr !important; }
  .dashboard-sidebar { display: none !important; }
  .landing-info-grid { grid-template-columns: 1fr 1fr !important; }
  .predictions-grid { grid-template-columns: 1fr 1fr !important; }
  .admin-users-grid { grid-template-columns: 1fr !important; }
  .profile-table { overflow-x: auto !important; }
  .profile-table table { min-width: 580px !important; }
}
`}</style>
    </div>
  );
}

export default function QuinielaMFA() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  const [isSendingForgot, setIsSendingForgot] = useState(false);
  const [cedula, setCedula] = useState("");
  const [hardwareName, setHardwareName] = useState("");
  const [commercialName, setCommercialName] = useState("");
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [district, setDistrict] = useState("");
  const [businessWhatsapp, setBusinessWhatsapp] = useState("");
  const [userWhatsapp, setUserWhatsapp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [cedulaPersonal, setCedulaPersonal] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [haciendaOk, setHaciendaOk] = useState("");
  const [isConsultingCedula, setIsConsultingCedula] = useState(false);
  const [cedulaPersonalStatus, setCedulaPersonalStatus] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("predictions");
  const [showWelcome, setShowWelcome] = useState(true);
  const [predictions, setPredictions] = useState({});
  const [predictionStatus, setPredictionStatus] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");
  const [adminResults, setAdminResults] = useState({});

  // Load results from Supabase on mount
  useEffect(() => {
    supabase.from("resultados").select("*").then(({ data }) => {
      if (data) {
        const map = {};
        data.forEach(r => { map[r.match_id] = { home: r.home, away: r.away, locked: r.locked }; });
        setAdminResults(map);
      }
    });
  }, []);

  const getMatchStatus = (date, time) => {
    // Parse match date and time (Costa Rica time UTC-6)
    const months = { "JUN": 5 };
    const [day, monthStr] = date.split(" ");
    const [hourStr, minuteStr] = time.replace(" PM","").replace(" AM","").split(":");
    let hour = parseInt(hourStr);
    const isPM = time.includes("PM");
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    // Costa Rica is UTC-6, convert to UTC for comparison
    const matchDate = new Date(Date.UTC(2026, months[monthStr], parseInt(day), hour + 6, parseInt(minuteStr)));
    const now = new Date();
    const diffMs = matchDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffMs <= 0) return "Cerrado";
    if (diffHours <= 2) return "Cierra pronto";
    return "Abierto";
  };

  const matches = matchList.map((m) => ({
    ...m, homeTeam:teams[m.home], awayTeam:teams[m.away],
    status: getMatchStatus(m.date, m.time),
    result: adminResults[m.id] && adminResults[m.id].home !== "" && adminResults[m.id].away !== ""
      ? { home:Number(adminResults[m.id].home), away:Number(adminResults[m.id].away) } : null,
  }));

  useEffect(() => {
    fetch("https://ubicaciones.paginasweb.cr/provincias.json").then(r=>r.json()).then(d=>setProvinces(Object.entries(d).map(([id,name])=>({id,name})))).catch(()=>{});
  }, []);
  useEffect(() => {
    if (!province) { setCantons([]); return; }
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${province}/cantones.json`).then(r=>r.json()).then(d=>setCantons(Object.entries(d).map(([id,name])=>({id,name})))).catch(()=>{});
  }, [province]);
  useEffect(() => {
    if (!province||!canton) { setDistricts([]); return; }
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${province}/canton/${canton}/distritos.json`).then(r=>r.json()).then(d=>setDistricts(Object.entries(d).map(([id,name])=>({id,name})))).catch(()=>{});
  }, [province, canton]);

  const consultCedulaPersonal = async (value) => {
    const clean = value.replace(/[^0-9]/g, "");
    setCedulaPersonal(clean);
    setCedulaPersonalStatus("");
    if (clean.length < 9) return;
    setIsConsultingCedula(true);
    try {
      const r = await fetch(`https://apis.gometa.org/cedulas/${clean}`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      if (d && d.results && d.results.length > 0) {
        const person = d.results[0];
        setFirstName(person.firstname || "");
        setLastName1(person.lastname1 || "");
        setLastName2(person.lastname2 || "");
        setCedulaPersonalStatus("ok");
      } else {
        setCedulaPersonalStatus("error");
      }
    } catch {
      setCedulaPersonalStatus("error");
    } finally {
      setIsConsultingCedula(false);
    }
  };

  const consultHacienda = async () => {
    setError(""); setHaciendaOk("");
    const clean = cedula.replace(/[^0-9]/g,"");
    if (!clean) { setError("Ingresa la cédula jurídica."); return; }
    setCedula(clean); setIsConsulting(true);
    try {
      const r = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${clean}`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      const name = d.nombre || d.nombreLegal || "";
      if (!name) throw new Error();
      setHardwareName(name);
      setHaciendaOk("Empresa encontrada.");
    } catch { setError("No se encontró la empresa. Revisa la cédula jurídica e intenta nuevamente."); }
    finally { setIsConsulting(false); }
  };

  const handleLogin = async () => {
    setError("");
    if (!email.trim()||!password.trim()) { setError("Completa todos los campos."); return; }
    setIsLoading(true);
    try {
      const { data:u, error:e } = await supabase.from("usuarios").select("*").eq("email",email.trim().toLowerCase()).eq("password",password.trim()).maybeSingle();
      if (e) throw new Error(e.message);
      if (!u) { setError("Correo o contraseña incorrectos."); setIsLoading(false); return; }
      setUser({ name:u.nombre_comercial, legalName:u.razon_social, cedula:u.cedula, contact:u.contacto, email:u.email, province:u.provincia, canton:u.canton, district:u.distrito, phone:u.whatsapp_usuario, firstName:u.nombre, lastName1:u.primer_apellido, lastName2:u.segundo_apellido });
    } catch(err) { setError(err.message||"Error al iniciar sesión."); }
    finally { setIsLoading(false); }
  };

  const handleRegister = async () => {
    setError("");
    if (!email.trim()||!password.trim()||!cedula.trim()||!hardwareName.trim()||!province||!canton||!district||!commercialName.trim()||!businessWhatsapp.trim()||!userWhatsapp.trim()||!firstName.trim()||!lastName1.trim()||!lastName2.trim()||!cedulaPersonal.trim()) {
      setError("Completa todos los campos antes de crear el usuario."); return;
    }
    setIsLoading(true);
    try {
      const { data:ex } = await supabase.from("usuarios").select("id").eq("email",email.trim().toLowerCase()).maybeSingle();
      if (ex) { setError("Este correo ya está registrado."); setIsLoading(false); return; }
      const selProv = provinces.find(p=>p.id===province)?.name||province;
      const selCant = cantons.find(c=>c.id===canton)?.name||canton;
      const selDist = districts.find(d=>d.id===district)?.name||district;
      const { error:ie } = await supabase.from("usuarios").insert({
        email:email.trim().toLowerCase(), password:password.trim(),
        nombre_comercial:commercialName, razon_social:hardwareName, cedula,
        contacto:email.split("@")[0], whatsapp_negocio:businessWhatsapp, whatsapp_usuario:userWhatsapp,
        provincia:selProv, canton:selCant, distrito:selDist,
        nombre:firstName, primer_apellido:lastName1, segundo_apellido:lastName2, cedula_personal:cedulaPersonal,
      });
      if (ie) throw new Error(ie.message);
      setUser({ name:commercialName, legalName:hardwareName, cedula, contact:email.split("@")[0], email, province:selProv, canton:selCant, district:selDist, phone:userWhatsapp, businessWhatsapp, firstName, lastName1, lastName2, cedulaPersonal });
    } catch(err) { setError(err.message||"Error al crear el usuario."); }
    finally { setIsLoading(false); }
  };

  const updatePrediction = async (matchId, team, value) => {
    const v = value.replace(/[^0-9]/g,"").slice(0,2);
    const updated = { ...predictions, [matchId]: { ...(predictions[matchId]||{}), [team]: v } };
    setPredictions(updated);
    const pred = updated[matchId];
    if (pred.home !== undefined && pred.home !== "" && pred.away !== undefined && pred.away !== "") {
      await supabase.from("predicciones").upsert({
        user_email: user.email,
        match_id: matchId,
        home: pred.home,
        away: pred.away,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_email,match_id" });
      setPredictionStatus("saved");
      setTimeout(()=>setPredictionStatus(""),2000);
    }
  };
  const savePredictions = async () => {
    const entries = Object.entries(predictions)
      .filter(([,p]) => p.home !== undefined && p.home !== "" && p.away !== undefined && p.away !== "")
      .map(([matchId, p]) => ({ user_email: user.email, match_id: Number(matchId), home: p.home, away: p.away, updated_at: new Date().toISOString() }));
    if (entries.length > 0) {
      await supabase.from("predicciones").upsert(entries, { onConflict: "user_email,match_id" });
    }
    setPredictionStatus("saved");
    setTimeout(()=>setPredictionStatus(""),2000);
  };
  const handleForgotPassword = async () => {
    setForgotStatus("");
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      setForgotStatus("error:Ingresa un correo electrónico válido.");
      return;
    }
    setIsSendingForgot(true);
    try {
      const { data: u } = await supabase.from("usuarios").select("password, nombre, nombre_comercial").eq("email", forgotEmail.trim().toLowerCase()).maybeSingle();
      if (!u) {
        setForgotStatus("error:No encontramos una cuenta con ese correo.");
        setIsSendingForgot(false);
        return;
      }
      // Send email via EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_suphdhh",
          template_id: "template_mwt2rhs",
          user_id: "jX4XRELE75nhLURIb",
          template_params: {
            to_email: forgotEmail.trim().toLowerCase(),
            to_name: u.nombre || u.nombre_comercial || "Usuario",
            password: u.password,
          }
        })
      });
      if (response.ok) {
        setForgotStatus("ok:Correo enviado. Revisa tu bandeja de entrada.");
      } else {
        setForgotStatus("error:No se pudo enviar el correo. Intenta nuevamente.");
      }
    } catch {
      setForgotStatus("error:Error al enviar el correo. Intenta nuevamente.");
    } finally {
      setIsSendingForgot(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    supabase.from("predicciones").select("*").eq("user_email", user.email).then(({ data }) => {
      if (data) {
        const map = {};
        data.forEach(p => { map[p.match_id] = { home: p.home, away: p.away }; });
        setPredictions(map);
      }
    });
  }, [user]);

  const updateResult = (matchId, team, value) => {
    if (adminResults[matchId]?.locked) return;
    const clean = value.replace(/[^0-9]/g,"").slice(0,2);
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],[team]:clean}}));
  };
  const publishResult = async (matchId) => {
    const r = adminResults[matchId];
    if (!r || r.home === "" || r.away === "" || r.home === undefined || r.away === undefined) return;
    await supabase.from("resultados").upsert({
      match_id: matchId, home: Number(r.home), away: Number(r.away), locked: true, updated_at: new Date().toISOString()
    }, { onConflict: "match_id" });
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],locked:true}}));
  };
  const clearResult = async (matchId) => {
    await supabase.from("resultados").delete().eq("match_id", matchId);
    setAdminResults(c=>{const u={...c};delete u[matchId];return u;});
  };

  // Live standings loaded from Supabase
  const [liveStandings, setLiveStandings] = useState([]);
  useEffect(() => {
    if (user) return;
    const loadStandings = async () => {
      const { data: usuarios } = await supabase.from("usuarios").select("email, nombre_comercial, nombre, primer_apellido");
      const { data: preds } = await supabase.from("predicciones").select("*");
      if (!usuarios || !preds) return;
      const standing = usuarios.map(u => {
        const userPreds = preds.filter(p => p.user_email === u.email);
        const pts = userPreds.reduce((total, p) => {
          return total;
        }, 0);
        const name = u.nombre && u.primer_apellido ? `${u.nombre} ${u.primer_apellido}` : u.nombre_comercial || "Usuario";
        return { name, pts, preds: userPreds.length };
      }).sort((a,b) => b.preds - a.preds).slice(0, 10);
      setLiveStandings(standing);
    };
    loadStandings();
  }, [user]);

  if (!user) {
    if (authMode === "forgot") {
      return (
        <div style={{background:G.bg,minHeight:"100vh",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.4}} style={{width:"100%",maxWidth:420,padding:"0 20px"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{width:64,height:64,background:"rgba(26,158,63,.1)",border:`2px solid ${G.green}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28}}>🔑</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,letterSpacing:1,textTransform:"uppercase",color:"#fff"}}>¿Olvidaste tu contraseña?</div>
              <div style={{fontSize:14,color:G.muted,marginTop:8}}>Ingresa tu correo y te enviaremos tu contraseña.</div>
            </div>
            <div style={{...card,padding:28,borderRadius:20}}>
              <Field label="Correo electrónico" value={forgotEmail} onChange={setForgotEmail} placeholder="ejemplo@correo.com" type="email"/>
              {forgotStatus && (
                <div style={{borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:14,
                  background:forgotStatus.startsWith("ok")?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",
                  border:`1px solid ${forgotStatus.startsWith("ok")?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,
                  color:forgotStatus.startsWith("ok")?G.green:"#ff5050"
                }}>
                  {forgotStatus.startsWith("ok")?"✅":"⚠️"} {forgotStatus.split(":")[1]}
                </div>
              )}
              <button onClick={handleForgotPassword} disabled={isSendingForgot} style={{...greenBtn,opacity:isSendingForgot?.7:1}}>
                {isSendingForgot?"Enviando...":"Enviar contraseña"}
              </button>
              <button onClick={()=>{setAuthMode("login");setForgotStatus("");setForgotEmail("");}} style={{width:"100%",background:"none",border:"none",color:G.gray,fontSize:13,cursor:"pointer",marginTop:12,textDecoration:"underline"}}>
                ← Volver al inicio de sesión
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px"}} className="main-padding">
          <Header subtitle="Mayoreo Ferretería y Acabados" />
          <div style={{display:"grid",gridTemplateColumns:"200px 1fr 390px",gap:16,alignItems:"stretch"}} className="landing-grid">
            {/* Banner #2 - lateral izquierdo inicio */}
            <div style={{minHeight:"100%"}} className="banner-lateral">
              <BannerDisplay slot={2} stretch={true}/>
            </div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
              <BannerDisplay slot={1}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}} className="landing-info-grid">
                <div style={{...card,padding:16}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>🏅 Top 10 de la quiniela</div>
                  {liveStandings.length === 0 ? (
                    <div style={{fontSize:13,color:G.muted,textAlign:"center",padding:"16px 0"}}>Aún no hay participantes.</div>
                  ) : liveStandings.map((p,i)=>(
                    <div key={p.name+i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<liveStandings.length-1?`1px solid ${G.border}`:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:i<3?G.green:G.muted,width:22}}>{i+1}</span>
                        <div style={{width:28,height:28,borderRadius:"50%",background:G.card2,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G.gray}}>{p.name[0]}</div>
                        <span style={{fontSize:13}}>{p.name}</span>
                      </div>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,color:G.green}}>{p.pts} pts</span>
                    </div>
                  ))}
                </div>
                <div style={{...card,padding:16}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>📅 Próximos partidos</div>
                  {matches.slice(0,4).map(m=>(
                    <div key={m.id} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${G.border}`}}>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.homeTeam.flag} {m.home}</span>
                      <span style={{fontSize:10,fontWeight:700,color:G.green,background:"rgba(26,158,63,.15)",padding:"2px 5px",borderRadius:4}}>VS</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.away} {m.awayTeam.flag}</span>
                      <div style={{textAlign:"right",fontSize:9,color:G.muted,lineHeight:1.4}}>{m.date}<br/>{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              <div style={{...card,padding:28,borderRadius:20}}>
                <div style={{textAlign:"center",marginBottom:24}}>
                  <div style={{width:64,height:64,background:"rgba(26,158,63,.1)",border:`2px solid ${G.green}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28}}>🏆</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Ingresa a la quiniela</div>
                  <div style={{fontSize:13,color:G.muted,marginTop:4}}>Accede con tus datos para competir</div>
                </div>
                {authMode !== "forgot" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:22}}>
                  {[["login","Iniciar sesión"],["register","Crear usuario"]].map(([mode,label])=>(
                    <button key={mode} onClick={()=>{setAuthMode(mode);setError("");}} style={{padding:"12px",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",border:`2px solid ${G.green}`,color:"#fff",background:authMode===mode?G.green:G.greenDim}}>{label}</button>
                  ))}
                </div>
              )}
                {authMode==="login"?(
                  <form onSubmit={e=>{e.preventDefault();handleLogin();}}>
                    <Field label="Correo electrónico" value={email} onChange={setEmail} placeholder="ejemplo@correo.com" type="email"/>
                    <Field label="Contraseña" value={password} onChange={setPassword} placeholder="Tu contraseña" type="password"/>
                    {error&&<ErrorBox msg={error}/>}
                    <button type="submit" disabled={isLoading} style={{...greenBtn,opacity:isLoading?.7:1,marginTop:8}}>{isLoading?"Verificando...":"Ingresar"}</button>
                    <button type="button" onClick={()=>setAuthMode("forgot")} style={{width:"100%",background:"none",border:"none",color:G.green,fontSize:13,cursor:"pointer",marginTop:10,textDecoration:"underline"}}>¿Olvidé mi contraseña?</button>
                  </form>
                ):(
                  <form onSubmit={e=>{e.preventDefault();handleRegister();}}>
                    <Divider label="Datos de la ferretería"/>
                    <Field label="Cédula jurídica" value={cedula} onChange={setCedula} placeholder="Cédula jurídica"/>
                    <button type="button" onClick={consultHacienda} disabled={isConsulting} style={{width:"100%",background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:11,fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:G.green,cursor:"pointer",marginBottom:14}}>{isConsulting?"Consultando...":"🔍 Consultar Hacienda"}</button>
                    {haciendaOk&&<div style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:G.green,marginBottom:14}}>✅ {haciendaOk}</div>}
                    <Field label="Nombre de la ferretería" value={hardwareName} onChange={setHardwareName} placeholder="Nombre legal"/>
                    <Field label="Nombre comercial" value={commercialName} onChange={setCommercialName} placeholder="Nombre comercial"/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                      <SelectField label="Provincia" value={province} onChange={v=>{setProvince(v);setCanton("");setDistrict("");}} options={provinces}/>
                      <SelectField label="Cantón" value={canton} onChange={v=>{setCanton(v);setDistrict("");}} options={cantons} disabled={!province}/>
                      <SelectField label="Distrito" value={district} onChange={setDistrict} options={districts} disabled={!canton}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <Field label="WhatsApp ferretería" value={businessWhatsapp} onChange={setBusinessWhatsapp} placeholder="88880000"/>
                      <Field label="WhatsApp usuario" value={userWhatsapp} onChange={setUserWhatsapp} placeholder="88880000"/>
                    </div>
                    <Divider label="Datos del contacto"/>
                    <div style={{marginBottom:14}}>
                      <label style={lbl}>Cédula de identidad</label>
                      <div style={{position:"relative"}}>
                        <input
                          type="text"
                          value={cedulaPersonal}
                          onChange={e=>consultCedulaPersonal(e.target.value)}
                          placeholder="Ej: 112345678"
                          style={{...inp,paddingRight:40}}
                        />
                        {isConsultingCedula && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:16}}>⏳</span>
                        )}
                        {!isConsultingCedula && cedulaPersonalStatus==="ok" && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:16}}>✅</span>
                        )}
                        {!isConsultingCedula && cedulaPersonalStatus==="error" && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:16}}>❌</span>
                        )}
                      </div>
                      {cedulaPersonalStatus==="ok" && (
                        <div style={{fontSize:12,color:G.green,marginTop:6}}>✅ Datos encontrados — nombre y apellidos completados automáticamente.</div>
                      )}
                      {cedulaPersonalStatus==="error" && (
                        <div style={{fontSize:12,color:"#ff5050",marginTop:6}}>❌ Cédula no encontrada. Completa los datos manualmente.</div>
                      )}
                    </div>
                    <Field label="Nombre" value={firstName} onChange={setFirstName} placeholder="Nombre"/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <Field label="Primer apellido" value={lastName1} onChange={setLastName1} placeholder="Primer apellido"/>
                      <Field label="Segundo apellido" value={lastName2} onChange={setLastName2} placeholder="Segundo apellido"/>
                    </div>
                    <Divider label="Acceso"/>
                    <Field label="Correo electrónico" value={email} onChange={setEmail} placeholder="ejemplo@correo.com" type="email"/>
                    <Field label="Contraseña" value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" type="password"/>
                    {error&&<ErrorBox msg={error}/>}
                    <button type="submit" disabled={isLoading} style={{...greenBtn,opacity:isLoading?.7:1,marginTop:8}}>{isLoading?"Creando cuenta...":"Crear usuario"}</button>
                  </form>
                )}

                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:14,fontSize:12,color:G.muted}}>🔒 Tus datos están protegidos</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = ADMIN_EMAILS.includes(user.email);
  const tabs = [
    ["predictions","🎯","Mis predicciones"],
    ["results","📊","Mis resultados"],
    ["standings","🏅","Posiciones"],
    ["profile","👤","Mi perfil"],
    ["chat","💬","Chat"],
    ...(isAdmin ? [["admin","⚙️","Admin"]] : []),
    ["rules","📋","Reglas"]
  ];

  return (
    <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}} className="main-padding">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,background:G.green,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:"#fff"}}>M</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,letterSpacing:2,lineHeight:1}}>MFA</div>
              <div style={{fontSize:10,color:G.gray,letterSpacing:1,textTransform:"uppercase"}}>Quiniela Ferretera · Mundial 2026</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,fontWeight:600}}>{user.name}</div>
              <div style={{fontSize:11,color:G.muted}}>{user.email}</div>
            </div>
            <button onClick={()=>setUser(null)} style={{background:"rgba(255,255,255,.05)",border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 12px",color:G.gray,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:6}}>
              <LogOut size={14}/> Salir
            </button>
          </div>
        </div>

        <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <span style={{fontSize:24}}>🎉</span>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:G.green}}>¡Bienvenido a la Quiniela Ferretera MFA!</div>
            <div style={{fontSize:13,color:G.gray}}>Ingresa tus predicciones antes del inicio de cada partido.</div>
          </div>
        </div>

        {/* Banner #4 - superior dashboard */}
        <BannerDisplay slot={4}/>
        <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}} className="tabs-row">
          {tabs.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setView(id)} style={{padding:"10px 16px",borderRadius:8,border:`1px solid ${view===id?G.green:G.border}`,background:view===id?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{icon} {label}</button>
          ))}
        </div>

        {showWelcome && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:G.card,border:`1px solid ${G.green}`,borderRadius:20,padding:32,maxWidth:560,width:"100%",maxHeight:"80vh",overflowY:"auto"}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:40,marginBottom:12}}>🏆</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:G.green,textTransform:"uppercase",letterSpacing:1}}>Quiniela Ferretera MFA</div>
                <div style={{fontSize:14,color:G.gray,marginTop:6}}>Mundial 2026 · Bienvenido</div>
              </div>
              <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:20}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff",textTransform:"uppercase",marginBottom:14}}>📋 Reglas y puntaje</div>
                {[
                  ["🎯 Marcador exacto","5 pts — acertás el resultado exacto"],
                  ["✅ Ganador correcto","3 pts — acertás quién gana o empate"],
                  ["📊 Diferencia correcta","+1 pt — la diferencia de goles es la misma"],
                  ["⏰ Cierre de predicciones","Se cierran al inicio de cada partido"],
                  ["🏅 Ranking","Se actualiza después de cada partido publicado"],
                  ["🎁 Premios","Los mejores al final del torneo se llevan premios"],
                ].map(([title, desc]) => (
                  <div key={title} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{title}</span>
                    <span style={{fontSize:12,color:G.gray,textAlign:"right",maxWidth:"55%"}}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:12,color:G.gray,textAlign:"center"}}>
                La Quiniela Ferretera MFA es una dinámica promocional exclusiva para clientes MFA. Aplican condiciones del concurso.
              </div>
              <button onClick={()=>setShowWelcome(false)} style={{...greenBtn,fontSize:16,letterSpacing:1}}>
                ✅ Entendido — ¡A jugar!
              </button>
            </div>
          </div>
        )}
        <div>
            {view==="profile"&&<ProfileView user={user} setUser={setUser} predictions={predictions} matches={matches} calcPoints={calcPoints}/>}
            {view==="chat"&&<ChatView user={user}/>}
            {view==="predictions"&&<PredictionsView matches={matches} predictions={predictions} updatePrediction={updatePrediction} savePredictions={savePredictions} predictionStatus={predictionStatus} matchFilter={matchFilter} setMatchFilter={setMatchFilter} calcPoints={calcPoints}/>}
            {view==="results"&&<ResultsView matches={matches} predictions={predictions} calcPoints={calcPoints}/>}
            {view==="standings"&&<StandingsView matches={matches} predictions={predictions} calcPoints={calcPoints} user={user}/>}
            {view==="admin"&&<AdminView matches={matches} updateResult={updateResult} publishResult={publishResult} clearResult={clearResult} adminResults={adminResults} calcPoints={calcPoints}/>}
            {view==="rules"&&<RulesView/>}
        </div>
      </div>
    </div>
  );
}

function PredictionsView({ matches, predictions, updatePrediction, savePredictions, predictionStatus, matchFilter, setMatchFilter, calcPoints }) {
  const groups = matches.reduce((acc,m)=>{
    if(matchFilter==="all"||m.status===matchFilter){acc[m.group]=acc[m.group]||[];acc[m.group].push(m);}
    return acc;
  },{});
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}} className="predictions-header">
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Mis predicciones</div>
          <div style={{fontSize:13,color:G.muted}}>Primera fase · Por grupo · Marcador exacto = 5 pts</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}} className="predictions-filters">
          {[["all","Todos"],["Abierto","Abiertos"],["Cierra pronto","Cierra pronto"],["Cerrado","Cerrados"]].map(([v,l])=>(
            <button key={v} onClick={()=>setMatchFilter(v)} style={{padding:"7px 14px",borderRadius:100,border:`1px solid ${matchFilter===v?G.green:G.border}`,background:matchFilter===v?G.green:"transparent",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>
      {Object.entries(groups).filter(([,gm])=>gm.length>0).map(([group,gMatches])=>(
        <div key={group} style={{...card,padding:20,borderRadius:16,marginBottom:16}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>Grupo {group}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}} className="predictions-grid">
            {gMatches.map(m=>{
              const pred=predictions[m.id]||{};
              return (
                <div key={m.id} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <span style={{fontSize:11,color:G.muted}}>{m.date} · {m.time}</span>
                    <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid",...(m.status==="Abierto"?{borderColor:"rgba(26,158,63,.4)",background:"rgba(26,158,63,.1)",color:G.green}:m.status==="Cierra pronto"?{borderColor:"rgba(255,180,0,.4)",background:"rgba(255,180,0,.1)",color:"#ffb400"}:{borderColor:"rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff5050"})}}>{m.status}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 52px auto 52px 1fr",alignItems:"center",gap:8}}>
                    <div style={{textAlign:"right"}}><div style={{fontSize:20}}>{m.homeTeam.flag}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.home}</div></div>
                    <input value={pred.home||""} onChange={e=>updatePrediction(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px"}} placeholder="0"/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,color:G.green}}>VS</span>
                    <input value={pred.away||""} onChange={e=>updatePrediction(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px"}} placeholder="0"/>
                    <div><div style={{fontSize:20}}>{m.awayTeam.flag}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.away}</div></div>
                  </div>
                  {m.result&&(
                    <div style={{marginTop:10,background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,color:G.green}}>Resultado: {m.result.home} - {m.result.away}</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:900,color:G.green}}>{calcPoints(pred,m.result)} pts</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {predictionStatus==="saved"&&(
        <div style={{borderRadius:10,padding:"12px 16px",marginBottom:16,background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",color:G.green,fontSize:13}}>
          ✅ Predicción guardada automáticamente.
        </div>
      )}
      <button onClick={savePredictions} style={{...greenBtn,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Save size={18}/> Guardar predicciones</button>
    </div>
  );
}

function ResultsView({ matches, predictions, calcPoints }) {
  const played=matches.filter(m=>m.result);  // shows all matches with official result
  const total=played.reduce((t,m)=>t+calcPoints(predictions[m.id]||{},m.result),0);
  const done=played.filter(m=>{const p=predictions[m.id]||{};return p.home!==undefined&&p.home!==""&&p.away!==undefined&&p.away!==""}).length;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}} className="results-stats">
        {[["Puntos ganados",`${total} pts`],["Partidos jugados",played.length],["Predicciones hechas",`${done}/${played.length}`]].map(([t,v])=>(
          <div key={t} style={{...card,padding:20,textAlign:"center",borderRadius:12}}>
            <div style={{fontSize:12,color:G.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,color:G.green}}>{v}</div>
          </div>
        ))}
      </div>
      {played.length===0?(
        <div style={{...card,padding:40,textAlign:"center",borderRadius:12,color:G.muted}}>Aún no hay partidos con resultado oficial.</div>
      ):played.map(m=>{
        const pred=predictions[m.id]||{};
        const hasPred=pred.home!==undefined&&pred.home!==""&&pred.away!==undefined&&pred.away!=="";
        const pts=calcPoints(pred,m.result);
        return (
          <div key={m.id} style={{...card,padding:16,borderRadius:12,marginBottom:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:16,alignItems:"center"}} className="result-row">
              <div>
                <div style={{fontSize:11,color:G.muted}}>Grupo {m.group} · {m.date}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:700,marginTop:2}}>{m.homeTeam.flag} {m.homeTeam.name} vs {m.awayTeam.flag} {m.awayTeam.name}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}} className="result-scores">
                <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
                  <div style={{fontSize:10,color:G.muted}}>Tu predicción</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:hasPred?18:13,fontWeight:900,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"Sin predicción"}</div>
                </div>
                <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
                  <div style={{fontSize:10,color:G.green}}>Resultado real</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900}}>{m.result.home} - {m.result.away}</div>
                </div>
              </div>
              <div style={{background:G.green,borderRadius:8,padding:"10px 16px",textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,minWidth:70}}>{pts} pts</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StandingsView({ matches, predictions, calcPoints, user }) {
  const [standings, setStandings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: usuarios } = await supabase.from("usuarios").select("email, nombre_comercial, nombre, primer_apellido, segundo_apellido, provincia");
      const { data: preds } = await supabase.from("predicciones").select("*");
      if (!usuarios) { setLoading(false); return; }
      const allPreds = preds || [];
      const ranked = usuarios.map(u => {
        const userPreds = allPreds.filter(p => p.user_email === u.email);
        const predMap = {};
        userPreds.forEach(p => { predMap[p.match_id] = { home: p.home, away: p.away }; });
        const pts = matches.filter(m => m.result).reduce((t, m) => t + calcPoints(predMap[m.id] || {}, m.result), 0);
        const contactName = [u.nombre, u.primer_apellido, u.segundo_apellido].filter(Boolean).join(" ") || "—";
        const isMe = u.email === user.email;
        return { name: u.nombre_comercial || "—", contactName, province: u.provincia || "—", pts, preds: userPreds.length, isMe };
      }).sort((a, b) => b.pts - a.pts || b.preds - a.preds);
      setStandings(ranked);
      setLoading(false);
    };
    load();
  }, [matches, calcPoints, user.email]);

  return (
    <div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>Tabla de posiciones</div>
      {loading ? (
        <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando posiciones...</div>
      ) : (
        <div style={{...card,borderRadius:12,overflow:"hidden"}} className="standings-table">
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["#","Ferretería","Contacto","Provincia","Predicciones","Puntos"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((u,i)=>(
                <tr key={u.name+i} style={{borderBottom:`1px solid ${G.border}`,background:u.isMe?"rgba(26,158,63,.08)":"transparent"}}>
                  <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:i<3?G.green:G.muted}}>{i+1}</td>
                  <td style={{padding:"12px 16px",fontWeight:600,color:u.isMe?G.green:"#fff"}}>{u.name}{u.isMe&&<span style={{fontSize:10,marginLeft:6,color:G.green,fontStyle:"italic"}}>← tú</span>}</td>
                  <td style={{padding:"12px 16px",color:G.gray,fontSize:13}}>{u.contactName}</td>
                  <td style={{padding:"12px 16px",color:G.gray,fontSize:13}}>{u.province}</td>
                  <td style={{padding:"12px 16px",textAlign:"center",fontWeight:600}}>{u.preds}</td>
                  <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green}}>{u.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminView({ matches, updateResult, publishResult, clearResult, adminResults, calcPoints }) {
  const [section, setSection] = React.useState("scores");
  const [dbUsers, setDbUsers] = React.useState([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [extraAdmins, setExtraAdmins] = React.useState([]);
  const SUPERUSER = "lvillegasv@mfamayoreo.com";

  const isUserAdmin = (email) => ADMIN_EMAILS.includes(email) || extraAdmins.includes(email);

  const toggleAdmin = (email) => {
    if (email === SUPERUSER) return; // superuser cannot be removed
    setExtraAdmins(current =>
      current.includes(email)
        ? current.filter(e => e !== email)
        : [...current, email]
    );
  };

  const sendBackupEmail = React.useCallback(async (usuarios, predicciones) => {
    try {
      const fecha = new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" });

      // Helper: format UTC timestamp to Costa Rica time (UTC-6)
      const toCR = (ts) => {
        if (!ts) return "—";
        const d = new Date(ts);
        const cr = new Date(d.getTime() - 6*60*60*1000);
        const pad = n => String(n).padStart(2,"0");
        return `${pad(cr.getUTCDate())}/${pad(cr.getUTCMonth()+1)}/${cr.getUTCFullYear()} ${pad(cr.getUTCHours())}:${pad(cr.getUTCMinutes())}`;
      };

      // Match lookup map
      const matchMap = {};
      matchList.forEach(m => { matchMap[m.id] = m; });

      // Build full detail per user with enriched predictions
      const detalle = usuarios.map((u, i) => {
        const userPreds = predicciones.filter(p => p.user_email === u.email)
          .sort((a,b) => a.match_id - b.match_id);
        const predsStr = userPreds.length > 0
          ? userPreds.map(p => {
              const m = matchMap[p.match_id];
              const nombre = m ? `${m.home} vs ${m.away}` : `Partido ${p.match_id}`;
              const guardado = toCR(p.updated_at);
              const cierre = m ? `${m.date} ${m.time} CR` : "—";
              return `    Partido ${p.match_id} · ${nombre} | Predicción: ${p.home}-${p.away} | Guardado: ${guardado} CR | Cierre: ${cierre}`;
            }).join("\n")
          : "    Sin predicciones";
        return `${i+1}. ${u.nombre_comercial||""} | ${u.nombre||""} ${u.primer_apellido||""} ${u.segundo_apellido||""} | ${u.email} | ${u.cedula||""} | ${u.cedula_personal||""} | ${u.whatsapp_usuario||""} | ${u.provincia||""} ${u.canton||""} ${u.distrito||""} | Registro: ${u.created_at?.slice(0,10)||""}\n  Predicciones (${userPreds.length}):\n${predsStr}`;
      }).join("\n\n");

      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_suphdhh",
          template_id: "template_ds9b3vu",
          user_id: "jX4XRELE75nhLURIb",
          template_params: {
            fecha,
            total_usuarios: usuarios.length,
            total_predicciones: predicciones.length,
            detalle: detalle || "Sin usuarios registrados.",
          }
        })
      });
    } catch(e) { console.error("Backup email error:", e); }
  }, []);

  const [allPredicciones, setAllPredicciones] = React.useState([]);

  const loadUsers = React.useCallback(async () => {
    setLoadingUsers(true);
    const { data } = await supabase.from("usuarios").select("*").order("created_at", { ascending: false });
    const { data: preds } = await supabase.from("predicciones").select("*");
    if (data) {
      setDbUsers(data);
      setAllPredicciones(preds || []);
      sendBackupEmail(data, preds || []);
    }
    setLoadingUsers(false);
  }, [sendBackupEmail]);

  React.useEffect(() => { if (section === "users") loadUsers(); }, [section, loadUsers]);

  const filteredUsers = dbUsers.filter(u => {
    const s = search.toLowerCase();
    return (u.nombre_comercial||"").toLowerCase().includes(s) ||
      (u.email||"").toLowerCase().includes(s) ||
      (u.cedula||"").toLowerCase().includes(s) ||
      (u.nombre||"").toLowerCase().includes(s) ||
      (u.primer_apellido||"").toLowerCase().includes(s);
  });

  const exportToExcel = () => {
    const esc = v => String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const rows = filteredUsers.map(u => `<tr>
      <td>${esc(u.nombre_comercial)}</td><td>${esc(u.razon_social)}</td><td>${esc(u.cedula)}</td>
      <td>${esc(u.nombre)} ${esc(u.primer_apellido)} ${esc(u.segundo_apellido)}</td>
      <td>${esc(u.cedula_personal)}</td><td>${esc(u.email)}</td>
      <td>${esc(u.whatsapp_negocio)}</td><td>${esc(u.whatsapp_usuario)}</td>
      <td>${esc(u.provincia)}</td><td>${esc(u.canton)}</td><td>${esc(u.distrito)}</td>
      <td>${esc(u.created_at?.slice(0,10))}</td>
    </tr>`).join("");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"/><style>th{background:#1a9e3f;color:#fff;font-weight:bold}th,td{border:1px solid #999;padding:8px}</style></head><body><h2>Usuarios Quiniela Ferretera MFA</h2><table><thead><tr><th>Nombre comercial</th><th>Razón social</th><th>Cédula jurídica</th><th>Contacto</th><th>Cédula identidad</th><th>Correo</th><th>WhatsApp ferretería</th><th>WhatsApp usuario</th><th>Provincia</th><th>Cantón</th><th>Distrito</th><th>Registro</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "usuarios_quiniela_mfa.xls";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}} className="admin-tabs">
        {[["scores","⚽ Cargar marcadores"],["users","👥 Ver usuarios"],["banners","🖼️ Banners"]].map(([s,l])=>(
          <button key={s} onClick={()=>setSection(s)} style={{padding:"10px 18px",borderRadius:8,border:`1px solid ${section===s?G.green:G.border}`,background:section===s?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      {section==="banners" ? (
        <BannersAdmin/>
      ) : section==="scores" ? (
        <div>
          <div style={{...card,padding:16,borderRadius:12,marginBottom:16}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Cargar marcadores oficiales</div>
            <div style={{fontSize:13,color:G.muted,marginTop:4}}>Al publicar un marcador se actualizan los puntos automáticamente.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}} className="admin-scores-grid">
            {matches.map(m=>(
              <div key={m.id} style={{...card,padding:14,borderRadius:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontSize:11,color:G.muted}}>Grupo {m.group} · {m.date}</span>
                  <span style={{fontSize:11,color:m.result?G.green:"#ffb400"}}>{m.result?"✅ Publicado":"⏳ Pendiente"}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 52px auto 52px 1fr",alignItems:"center",gap:6,marginBottom:12}}>
                  <div style={{textAlign:"right",fontSize:18}}>{m.homeTeam.flag}</div>
                  <input disabled={m.result?.locked} value={adminResults[m.id]?.home?.toString()||""} onChange={e=>updateResult(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px"}} placeholder="0"/>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:G.green,fontWeight:700}}>VS</span>
                  <input disabled={m.result?.locked} value={adminResults[m.id]?.away?.toString()||""} onChange={e=>updateResult(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px"}} placeholder="0"/>
                  <div style={{fontSize:18}}>{m.awayTeam.flag}</div>
                </div>
                {m.result?.locked?(
                  <div style={{textAlign:"center",padding:"8px",background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,fontSize:12,color:G.green}}>🔒 Resultado bloqueado</div>
                ):(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <button onClick={()=>clearResult(m.id)} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:"#ff5050",cursor:"pointer"}}>Limpiar</button>
                    <button onClick={()=>publishResult(m.id)} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:G.green,cursor:"pointer"}}>Publicar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Usuarios registrados ({filteredUsers.length})</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button onClick={loadUsers} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 14px",color:G.gray,cursor:"pointer",fontSize:13}}>🔄 Actualizar</button>
              <button onClick={exportToExcel} style={{background:G.green,border:"none",borderRadius:8,padding:"8px 14px",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:13}}>📥 Exportar Excel</button>
              <button onClick={async()=>{
                const c1 = window.confirm("⚠️ ¿Estás seguro de que quieres borrar TODAS las predicciones?\nEsta acción no se puede deshacer.");
                if (!c1) return;
                const c2 = window.confirm("🔴 CONFIRMACIÓN FINAL: Se borrarán las predicciones de TODOS los usuarios.\n¿Continuar?");
                if (!c2) return;
                await supabase.from("predicciones").delete().neq("id", "00000000-0000-0000-0000-000000000000");
                alert("✅ Todas las predicciones han sido borradas.");
              }} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.4)",borderRadius:8,padding:"8px 14px",color:"#ff5050",cursor:"pointer",fontWeight:700,fontSize:13}}>🗑️ Resetear predicciones</button>
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por ferretería, correo, cédula o nombre..." style={{...inp,padding:"11px 16px"}}/>
          </div>

          {loadingUsers ? (
            <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando usuarios...</div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16,alignItems:"start"}} className="admin-users-grid">
              <div style={{...card,borderRadius:12,overflow:"hidden"}}>
                <div style={{padding:"12px 16px",background:G.card2,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>Lista de usuarios</div>
                <div style={{maxHeight:600,overflowY:"auto"}}>
                  {filteredUsers.length===0?(
                    <div style={{padding:20,textAlign:"center",color:G.muted,fontSize:13}}>No hay usuarios registrados.</div>
                  ):filteredUsers.map(u=>(
                    <button key={u.id} onClick={()=>setSelectedUser(u)} style={{width:"100%",padding:"12px 16px",background:selectedUser?.id===u.id?"rgba(26,158,63,.1)":"transparent",border:"none",borderBottom:`1px solid ${G.border}`,textAlign:"left",cursor:"pointer",transition:".15s"}}>
                      <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{u.nombre_comercial||"Sin nombre"}</div>
                      <div style={{fontSize:12,color:G.green,marginTop:2}}>{u.nombre} {u.primer_apellido} {u.segundo_apellido}</div>
                      <div style={{fontSize:11,color:G.muted,marginTop:2}}>{u.email}</div>
                      <div style={{fontSize:11,color:G.muted}}>{u.provincia} · {u.canton}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {!selectedUser ? (
                  <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Selecciona un usuario para ver sus datos completos.</div>
                ) : (
                  <div style={{...card,padding:24,borderRadius:12}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>Datos del usuario</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="admin-user-detail">
                      {[
                        ["Nombre comercial", selectedUser.nombre_comercial],
                        ["Razón social", selectedUser.razon_social],
                        ["Cédula jurídica", selectedUser.cedula],
                        ["Nombre", selectedUser.nombre],
                        ["Primer apellido", selectedUser.primer_apellido],
                        ["Segundo apellido", selectedUser.segundo_apellido],
                        ["Cédula identidad", selectedUser.cedula_personal],
                        ["Correo", selectedUser.email],
                        ["WhatsApp ferretería", selectedUser.whatsapp_negocio],
                        ["WhatsApp usuario", selectedUser.whatsapp_usuario],
                        ["Provincia", selectedUser.provincia],
                        ["Cantón", selectedUser.canton],
                        ["Distrito", selectedUser.distrito],
                        ["Fecha de registro", selectedUser.created_at?.slice(0,10)],
                        ["Contraseña", selectedUser.email === SUPERUSER ? "••••••••" : selectedUser.password],
                      ].map(([label, value]) => (
                        <div key={label} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"12px 14px"}}>
                          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted,marginBottom:4}}>{label}</div>
                          <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{value||"—"}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:16,display:"flex",alignItems:"center",gap:12}}>
                      {selectedUser.email === SUPERUSER ? (
                        <div style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"10px 16px",fontSize:13,fontWeight:700,color:G.green}}>
                          ⭐ Superusuario — no se puede modificar
                        </div>
                      ) : (
                        <button onClick={()=>toggleAdmin(selectedUser.email)} style={{
                          padding:"10px 20px", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer",
                          border: isUserAdmin(selectedUser.email) ? "1px solid rgba(255,80,80,.4)" : "1px solid rgba(26,158,63,.4)",
                          background: isUserAdmin(selectedUser.email) ? "rgba(255,80,80,.1)" : "rgba(26,158,63,.1)",
                          color: isUserAdmin(selectedUser.email) ? "#ff5050" : G.green,
                        }}>
                          {isUserAdmin(selectedUser.email) ? "❌ Quitar Admin" : "✅ Asignar como Admin"}
                        </button>
                      )}
                      <div style={{fontSize:12,color:G.muted}}>
                        Rol actual: <span style={{color:isUserAdmin(selectedUser.email)?G.green:G.gray,fontWeight:700}}>{isUserAdmin(selectedUser.email)?"Administrador":"Usuario"}</span>
                      </div>
                    </div>

                    {/* User predictions table */}
                    {selectedUser && (
                      <div style={{marginTop:20}}>
                        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:12}}>
                          Predicciones del usuario
                        </div>
                        <div style={{overflowX:"auto"}} className="admin-pred-table">
                          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                            <thead>
                              <tr style={{background:G.card2}}>
                                {["Grupo","Partido","Fecha","Predicción","Resultado","Puntos","Guardado"].map(h=>(
                                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {matchList.map(m=>{
                                const ht = teams[m.home], at = teams[m.away];
const pred = allPredicciones.find(p=>p.match_id===m.id&&p.user_email===selectedUser.email);
                                const hasPred = pred && pred.home !== null && pred.away !== null;
                                return (
                                  <tr key={m.id} style={{borderBottom:`1px solid ${G.border}`}}>
                                    <td style={{padding:"8px 12px",fontSize:12,color:G.muted,fontWeight:700}}>{m.group}</td>
                                    <td style={{padding:"8px 12px",fontSize:13}}>{ht?.flag} {m.home} vs {m.away} {at?.flag}</td>
                                    <td style={{padding:"8px 12px",fontSize:11,color:G.muted,whiteSpace:"nowrap"}}>{m.date} {m.time}</td>
                                    <td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</td>
                                    {(() => { const matchData = matches.find(mx=>mx.id===m.id); const res = matchData?.result; const pts = res && hasPred ? calcPoints({home:pred?.home,away:pred?.away}, res) : null; return (<><td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{res?`${res.home} - ${res.away}`:"—"}</td><td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:pts===5?G.green:pts>0?"#ffb400":G.muted}}>{pts!==null?`${pts} pts`:"—"}</td></>); })()}
                                    <td style={{padding:"8px 12px",fontSize:11,color:G.muted}}>{pred?.updated_at ? (() => { const d = new Date(pred.updated_at); const cr = new Date(d.getTime() - (6*60*60*1000)); const pad = n=>String(n).padStart(2,"0"); return `${pad(cr.getUTCDate())}/${pad(cr.getUTCMonth()+1)}/${cr.getUTCFullYear()} ${pad(cr.getUTCHours())}:${pad(cr.getUTCMinutes())}`; })() : "—"}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileView({ user, setUser, predictions, matches, calcPoints }) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pwStatus, setPwStatus] = React.useState("");
  const [isChanging, setIsChanging] = React.useState(false);

  const handleChangePassword = async () => {
    setPwStatus("");
    if (!currentPassword.trim()) { setPwStatus("error:Ingresa tu contraseña actual."); return; }
    if (newPassword.trim().length < 6) { setPwStatus("error:La nueva contraseña debe tener al menos 6 caracteres."); return; }
    if (newPassword !== confirmPassword) { setPwStatus("error:Las contraseñas no coinciden."); return; }
    setIsChanging(true);
    try {
      const { data: u } = await supabase.from("usuarios").select("id").eq("email", user.email).eq("password", currentPassword.trim()).maybeSingle();
      if (!u) { setPwStatus("error:La contraseña actual es incorrecta."); setIsChanging(false); return; }
      const { error } = await supabase.from("usuarios").update({ password: newPassword.trim() }).eq("email", user.email);
      if (error) throw new Error(error.message);
      setPwStatus("ok:Contraseña actualizada correctamente.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch(err) { setPwStatus("error:" + (err.message || "Error al cambiar contraseña.")); }
    finally { setIsChanging(false); }
  };

  const fullContactName = [user.firstName, user.lastName1, user.lastName2].filter(Boolean).join(" ") || user.contact || "—";
  const dataFields = [
    ["Nombre comercial", user.name],
    ["Razón social", user.legalName],
    ["Cédula jurídica", user.cedula],
    ["Nombre del contacto", fullContactName],
    ["Cédula de identidad", user.cedulaPersonal],
    ["Correo electrónico", user.email],
    ["WhatsApp ferretería", user.businessWhatsapp],
    ["WhatsApp usuario", user.phone],
    ["Provincia", user.province],
    ["Cantón", user.canton],
    ["Distrito", user.district],
  ];

  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"}} className="profile-grid">
      {/* Datos del usuario */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>Mis datos</div>
        <div style={{display:"grid",gap:10}}>
          {dataFields.map(([label,value])=>(
            <div key={label} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{label}</span>
              <span style={{fontSize:14,fontWeight:600,color:"#fff",textAlign:"right",maxWidth:"55%"}}>{value||"—"}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:14,background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,padding:"12px 14px",fontSize:12,color:G.muted}}>
          Para actualizar tus datos de ferretería, contacta al administrador.
        </div>
      </div>

      {/* Resumen predicciones */}
      <div style={{...card,padding:24,borderRadius:16,marginTop:20,gridColumn:"1/-1"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Resumen de mis predicciones</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}} className="profile-stats">
            {[["Predicciones",Object.keys(predictions).length],["Con resultado",matches.filter(m=>m.result).length],["Puntos",matches.filter(m=>m.result).reduce((t,m)=>t+calcPoints(predictions[m.id]||{},m.result),0)+" pts"]].map(([l,v])=>(
              <div key={l} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:10,padding:"10px 16px",textAlign:"center",minWidth:110}}>
                <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:1}}>{l}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,marginTop:4}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{overflowX:"auto"}} className="profile-table">
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["Grupo","Partido","Fecha","Mi predicción","Resultado","Puntos","Estado"].map(h=>(
                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matches.map(m=>{
                const pred=predictions[m.id]||{};
                const hasPred=pred.home!==undefined&&pred.home!==""&&pred.away!==undefined&&pred.away!=="";
                const pts=m.result?calcPoints(pred,m.result):null;
                return (
                  <tr key={m.id} style={{borderBottom:`1px solid ${G.border}`,background:pts===5?"rgba(26,158,63,.05)":"transparent"}}>
                    <td style={{padding:"10px 12px",fontSize:13,color:G.muted,fontWeight:700}}>{m.group}</td>
                    <td style={{padding:"10px 12px",fontSize:13}}>{m.homeTeam.flag} {m.home} vs {m.away} {m.awayTeam.flag}</td>
                    <td style={{padding:"10px 12px",fontSize:12,color:G.muted,whiteSpace:"nowrap"}}>{m.date} {m.time}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{m.result?`${m.result.home} - ${m.result.away}`:"—"}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:pts===5?G.green:pts>0?"#ffb400":G.muted}}>{pts!==null?`${pts} pts`:"—"}</td>
                    <td style={{padding:"10px 12px"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid",
                        ...(m.status==="Abierto"?{borderColor:"rgba(26,158,63,.4)",background:"rgba(26,158,63,.1)",color:G.green}:
                           m.status==="Cierra pronto"?{borderColor:"rgba(255,180,0,.4)",background:"rgba(255,180,0,.1)",color:"#ffb400"}:
                           {borderColor:"rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff5050"})
                      }}>{m.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:6}}>Cambiar contraseña</div>
        <div style={{fontSize:13,color:G.muted,marginBottom:20}}>Actualiza tu contraseña de acceso a la quiniela.</div>

        <Field label="Contraseña actual" value={currentPassword} onChange={setCurrentPassword} placeholder="Tu contraseña actual" type="password"/>
        <Field label="Nueva contraseña" value={newPassword} onChange={setNewPassword} placeholder="Mínimo 6 caracteres" type="password"/>
        <Field label="Confirmar nueva contraseña" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repite la nueva contraseña" type="password"/>

        {pwStatus && (
          <div style={{borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:14,
            background:pwStatus.startsWith("ok")?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",
            border:`1px solid ${pwStatus.startsWith("ok")?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,
            color:pwStatus.startsWith("ok")?G.green:"#ff5050"
          }}>
            {pwStatus.startsWith("ok")?"✅":"⚠️"} {pwStatus.split(":")[1]}
          </div>
        )}

        <button onClick={handleChangePassword} disabled={isChanging} style={{...greenBtn,opacity:isChanging?.7:1}}>
          {isChanging?"Actualizando...":"Cambiar contraseña"}
        </button>
      </div>
    </div>
  );
}

function ChatView({ user }) {
  const [messages, setMessages] = React.useState([]);
  const [newMsg, setNewMsg] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [showPollForm, setShowPollForm] = React.useState(false);
  const [pollQuestion, setPollQuestion] = React.useState("");
  const [pollOptions, setPollOptions] = React.useState(["",""]);
  const [userVotes, setUserVotes] = React.useState({});
  const [uploadingImg, setUploadingImg] = React.useState(false);
  const bottomRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const isAdmin = ADMIN_EMAILS.includes(user.email);
  const userName = [user.firstName, user.lastName1].filter(Boolean).join(" ") || user.name || "Usuario";

  const loadMessages = React.useCallback(async () => {
    const { data } = await supabase.from("chat").select("*").order("created_at", { ascending: true }).limit(100);
    if (data) setMessages(data);
    const { data: votes } = await supabase.from("votos_encuesta").select("*").eq("user_email", user.email);
    if (votes) {
      const map = {};
      votes.forEach(v => { map[v.mensaje_id] = v.opcion; });
      setUserVotes(map);
    }
  }, [user.email]);

  React.useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [loadMessages]);

  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const formatTime = (ts) => {
    const d = new Date(ts);
    const cr = new Date(d.getTime() - 6*60*60*1000);
    const pad = n => String(n).padStart(2,"0");
    return `${pad(cr.getUTCDate())}/${pad(cr.getUTCMonth()+1)} ${pad(cr.getUTCHours())}:${pad(cr.getUTCMinutes())}`;
  };

  const sendMessage = async () => {
    const text = newMsg.trim();
    if (!text) return;
    setSending(true);
    await supabase.from("chat").insert({ user_email:user.email, user_name:userName, mensaje:text, tipo:"mensaje" });
    setNewMsg("");
    await loadMessages();
    setSending(false);
  };

  const sendPoll = async () => {
    if (!pollQuestion.trim() || pollOptions.filter(o=>o.trim()).length < 2) return;
    setSending(true);
    const opts = pollOptions.filter(o=>o.trim());
    await supabase.from("chat").insert({
      user_email:user.email, user_name:userName,
      mensaje: pollQuestion.trim(), tipo:"encuesta",
      encuesta: { pregunta:pollQuestion.trim(), opciones:opts, votos:opts.map(()=>0) }
    });
    setPollQuestion(""); setPollOptions(["",""]); setShowPollForm(false);
    await loadMessages();
    setSending(false);
  };

  const vote = async (msgId, opcionIdx) => {
    if (userVotes[msgId] !== undefined) return;
    // First register the vote
    const { error: voteError } = await supabase.from("votos_encuesta").insert({ mensaje_id:msgId, user_email:user.email, opcion:opcionIdx });
    if (voteError) return;
    // Then count all votes fresh from DB
    const { data: allVotes } = await supabase.from("votos_encuesta").select("opcion").eq("mensaje_id", msgId);
    const { data: msgData } = await supabase.from("chat").select("encuesta").eq("id", msgId).single();
    if (allVotes && msgData) {
      const enc = msgData.encuesta;
      const newVotos = enc.opciones.map((_, i) => allVotes.filter(v => v.opcion === i).length);
      await supabase.from("chat").update({ encuesta: { ...enc, votos: newVotos } }).eq("id", msgId);
    }
    setUserVotes(c=>({...c,[msgId]:opcionIdx}));
    await loadMessages();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("chat-images").upload(fileName, file, { contentType: file.type });
      if (error) { alert("Error al subir imagen: " + error.message); setUploadingImg(false); e.target.value = ""; return; }
      const { data:urlData } = supabase.storage.from("chat-images").getPublicUrl(fileName);
      await supabase.from("chat").insert({ user_email:user.email, user_name:userName, mensaje:"📷 Imagen", tipo:"imagen", imagen_url:urlData.publicUrl });
      await loadMessages();
    } catch(err) { alert("Error inesperado: " + err.message); }
    finally { setUploadingImg(false); e.target.value = ""; }
  };

  const handleKey = (e) => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const totalVotos = (enc) => enc.votos.reduce((t,v)=>t+(v||0),0);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"75vh",gap:0}} className="chat-container">
      <div style={{...card,borderRadius:"16px 16px 0 0",flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>💬</span>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:G.green,textTransform:"uppercase"}}>Chat de la quiniela</div>
              <div style={{fontSize:11,color:G.muted}}>Visible para todos · Se actualiza cada 5 seg</div>
            </div>
          </div>
          {isAdmin && (
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowPollForm(!showPollForm)} style={{background:showPollForm?"rgba(255,180,0,.2)":"rgba(26,158,63,.1)",border:`1px solid ${showPollForm?"rgba(255,180,0,.4)":"rgba(26,158,63,.3)"}`,borderRadius:8,padding:"6px 12px",color:showPollForm?"#ffb400":G.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>📊 Encuesta</button>
              <button onClick={()=>fileInputRef.current?.click()} disabled={uploadingImg} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"6px 12px",color:G.green,fontSize:12,fontWeight:700,cursor:"pointer",opacity:uploadingImg?.6:1}}>{uploadingImg?"Subiendo...":"📷 Foto"}</button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={uploadImage} style={{display:"none"}}/>
            </div>
          )}
        </div>

        {/* Poll form */}
        {showPollForm && isAdmin && (
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${G.border}`,background:"rgba(255,180,0,.05)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#ffb400",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Nueva encuesta</div>
            <input value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} placeholder="Pregunta de la encuesta..." style={{...inp,marginBottom:8}}/>
            {pollOptions.map((opt,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                <input value={opt} onChange={e=>{const n=[...pollOptions];n[i]=e.target.value;setPollOptions(n);}} placeholder={`Opción ${i+1}`} style={{...inp,flex:1}}/>
                {pollOptions.length>2&&<button onClick={()=>setPollOptions(pollOptions.filter((_,j)=>j!==i))} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:6,padding:"0 10px",color:"#ff5050",cursor:"pointer",fontSize:16}}>×</button>}
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button onClick={()=>setPollOptions([...pollOptions,""])} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:6,padding:"6px 12px",color:G.green,fontSize:12,cursor:"pointer"}}>+ Opción</button>
              <button onClick={sendPoll} disabled={sending} style={{background:G.green,border:"none",borderRadius:6,padding:"6px 16px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Publicar encuesta</button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
          {messages.length===0?(
            <div style={{textAlign:"center",color:G.muted,fontSize:13,marginTop:40}}>Sé el primero en escribir algo 👋</div>
          ):messages.map(m=>{
            const isMe = m.user_email===user.email;
            if (m.tipo==="imagen") return (
              <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
                <div style={{fontSize:10,color:G.muted,marginBottom:4}}>
                  {!isMe&&<span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>}
                  {formatTime(m.created_at)}{isMe&&<span style={{color:G.green,fontWeight:700}}> · Tú</span>}
                </div>
                <img src={m.imagen_url} alt="img" style={{maxWidth:280,maxHeight:200,borderRadius:12,border:`1px solid ${G.border}`,objectFit:"cover",cursor:"pointer"}} onClick={()=>window.open(m.imagen_url,"_blank")}/>
              </div>
            );
            if (m.tipo==="encuesta") {
              const enc = m.encuesta||{};
              const total = totalVotos(enc);
              const myVote = userVotes[m.id];
              return (
                <div key={m.id} style={{maxWidth:360,alignSelf:"flex-start"}}>
                  <div style={{fontSize:10,color:G.muted,marginBottom:4}}><span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>{formatTime(m.created_at)}</div>
                  <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:16}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#ffb400",marginBottom:2}}>📊 Encuesta</div>
                    <div style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:12}}>{enc.pregunta}</div>
                    {(enc.opciones||[]).map((opt,i)=>{
                      const votos = enc.votos?.[i]||0;
                      const pct = total>0?Math.round(votos/total*100):0;
                      const voted = myVote===i;
                      return (
                        <div key={i} style={{marginBottom:8}}>
                          <button onClick={()=>vote(m.id,i)} disabled={myVote!==undefined} style={{width:"100%",background:voted?"rgba(26,158,63,.2)":"rgba(255,255,255,.05)",border:`1px solid ${voted?G.green:G.border}`,borderRadius:8,padding:"8px 12px",color:voted?G.green:"#fff",cursor:myVote!==undefined?"default":"pointer",textAlign:"left",fontSize:13,marginBottom:4}}>
                            {voted?"✅ ":""}{opt}
                          </button>
                          {myVote!==undefined&&(
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{flex:1,height:4,background:G.border,borderRadius:2,overflow:"hidden"}}>
                                <div style={{width:`${pct}%`,height:"100%",background:voted?G.green:G.gray,borderRadius:2,transition:".3s"}}/>
                              </div>
                              <span style={{fontSize:11,color:G.muted,width:40,textAlign:"right"}}>{pct}% ({votos})</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div style={{fontSize:11,color:G.muted,marginTop:4}}>{total} {total===1?"voto":"votos"}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
                <div style={{fontSize:10,color:G.muted,marginBottom:4,paddingLeft:4,paddingRight:4}}>
                  {!isMe&&<span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>}
                  {formatTime(m.created_at)}{isMe&&<span style={{color:G.green,fontWeight:700}}> · Tú</span>}
                </div>
                <div style={{maxWidth:"70%",padding:"10px 14px",borderRadius:isMe?"16px 4px 16px 16px":"4px 16px 16px 16px",background:isMe?G.green:G.card2,border:`1px solid ${isMe?"transparent":G.border}`,color:"#fff",fontSize:14,lineHeight:1.5,wordBreak:"break-word"}}>{m.mensaje}</div>
              </div>
            );
          })}
          <div ref={bottomRef}/>
        </div>
      </div>

      {/* Input */}
      <div style={{background:G.card,border:`1px solid ${G.border}`,borderTop:"none",borderRadius:"0 0 16px 16px",padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-end"}}>
        <textarea value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={handleKey} placeholder="Escribe un mensaje... (Enter para enviar)" rows={1} style={{flex:1,background:G.bg,border:`1px solid ${G.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,color:"#fff",resize:"none",outline:"none",fontFamily:"'Barlow',sans-serif",lineHeight:1.5}}/>
        <button onClick={sendMessage} disabled={sending||!newMsg.trim()} style={{background:G.green,border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,cursor:"pointer",opacity:sending||!newMsg.trim()?.5:1,whiteSpace:"nowrap"}}>
          {sending?"...":"Enviar ➤"}
        </button>
      </div>
    </div>
  );
}

function BannerDisplay({ slot, vertical=false, height=null, maxHeight=null, stretch=false }) {
  const [banner, setBanner] = React.useState(null);
  React.useEffect(() => {
    supabase.from("banners").select("*").eq("orden", slot).eq("activo", true).single().then(({data}) => {
      if (data?.imagen_url) setBanner(data);
    });
  }, [slot]);
  if (!banner) return null;
  const imgHeight = height || (vertical ? "400px" : "auto");
  const imgMaxHeight = maxHeight || (vertical ? "100vh" : "200px");
  return (
    <div style={{width:"100%",height:stretch?"100%":undefined,marginBottom:stretch?0:16,borderRadius:12,overflow:"hidden",border:`1px solid ${G.border}`}}>
      <img src={banner.imagen_url} alt={banner.nombre} style={{width:"100%",height:stretch?"100%":imgHeight,maxHeight:stretch?"none":imgMaxHeight,objectFit:"cover",display:"block"}}/>
    </div>
  );
}

function BannersAdmin() {
  const [banners, setBanners] = React.useState([]);
  const [uploading, setUploading] = React.useState(null);

  const loadBanners = React.useCallback(async () => {
    const { data } = await supabase.from("banners").select("*").order("orden");
    if (data) setBanners(data);
  }, []);

  React.useEffect(() => { loadBanners(); }, [loadBanners]);

  const uploadBanner = async (bannerId, file) => {
    if (!file) return;
    setUploading(bannerId);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `banner_${bannerId}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("banners").upload(fileName, file, { upsert: true, contentType: file.type });
      if (uploadError) {
        alert("Error al subir imagen: " + uploadError.message);
        setUploading(null);
        return;
      }
      const { data: urlData } = supabase.storage.from("banners").getPublicUrl(fileName);
      const { error: updateError } = await supabase.from("banners").update({ imagen_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq("id", bannerId);
      if (updateError) {
        alert("Error al guardar URL: " + updateError.message);
        setUploading(null);
        return;
      }
      await loadBanners();
    } catch(e) {
      alert("Error inesperado: " + e.message);
    } finally {
      setUploading(null);
    }
  };

  const toggleBanner = async (bannerId, activo) => {
    await supabase.from("banners").update({ activo: !activo }).eq("id", bannerId);
    await loadBanners();
  };

  const removeBanner = async (bannerId) => {
    await supabase.from("banners").update({ imagen_url: null }).eq("id", bannerId);
    await loadBanners();
  };

  return (
    <div>
      <div style={{...card,padding:16,borderRadius:12,marginBottom:20}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:4}}>🖼️ Gestión de banners</div>
        <div style={{fontSize:13,color:G.muted}}>Sube imágenes para cada sección. Tamaño recomendado: <strong style={{color:"#fff"}}>1200 x 400 px</strong>. Formatos: JPG, PNG, WebP.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:16}} className="admin-banners-grid">
        {banners.map(b=>(
          <div key={b.id} style={{...card,padding:20,borderRadius:12}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"#fff",textTransform:"uppercase"}}>{b.nombre}</div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid",
                  ...(b.activo?{borderColor:"rgba(26,158,63,.4)",background:"rgba(26,158,63,.1)",color:G.green}:{borderColor:"rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff5050"})
                }}>{b.activo?"Activo":"Inactivo"}</span>
              </div>
            </div>

            {/* Preview */}
            <div style={{width:"100%",height:140,background:G.card2,border:`1px solid ${G.border}`,borderRadius:10,marginBottom:12,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {b.imagen_url ? (
                <img src={b.imagen_url} alt={b.nombre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              ) : (
                <div style={{textAlign:"center",color:G.muted}}>
                  <div style={{fontSize:28,marginBottom:6}}>🖼️</div>
                  <div style={{fontSize:12}}>Sin imagen</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <label style={{cursor:"pointer"}}>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadBanner(b.id, e.target.files[0])}/>
                <div style={{background:G.green,borderRadius:8,padding:"9px",textAlign:"center",fontSize:13,fontWeight:700,color:"#fff",opacity:uploading===b.id?.7:1}}>
                  {uploading===b.id?"Subiendo...":"📤 Subir imagen"}
                </div>
              </label>
              <button onClick={()=>toggleBanner(b.id, b.activo)} style={{background:b.activo?"rgba(255,80,80,.1)":"rgba(26,158,63,.1)",border:`1px solid ${b.activo?"rgba(255,80,80,.3)":"rgba(26,158,63,.3)"}`,borderRadius:8,padding:"9px",fontSize:13,fontWeight:700,color:b.activo?"#ff5050":G.green,cursor:"pointer"}}>
                {b.activo?"⏸️ Desactivar":"▶️ Activar"}
              </button>
            </div>
            {b.imagen_url && (
              <button onClick={()=>removeBanner(b.id)} style={{width:"100%",marginTop:8,background:"transparent",border:`1px solid ${G.border}`,borderRadius:8,padding:"7px",fontSize:12,color:G.muted,cursor:"pointer"}}>
                🗑️ Quitar imagen
              </button>
            )}
            {b.updated_at && b.imagen_url && (
              <div style={{fontSize:10,color:G.muted,marginTop:8,textAlign:"center"}}>Actualizado: {new Date(new Date(b.updated_at).getTime()-6*60*60*1000).toLocaleString("es-CR")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RulesView() {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="rules-grid">
      {[
        {title:"Reglas generales",items:["Ingresa tus predicciones antes del inicio de cada partido.","Una vez iniciado el partido, las predicciones quedan bloqueadas.","Los resultados oficiales son los publicados al finalizar cada encuentro.","El ranking se actualiza automáticamente después de cada partido."]},
        {title:"Fase de grupos",rows:[["Marcador exacto","5 pts"],["Ganador correcto","3 pts"],["Empate correcto","3 pts"],["Diferencia correcta","+1 pt"]]},
        {title:"Fases eliminatorias",rows:[["Octavos - marcador exacto","7 pts"],["Cuartos - marcador exacto","10 pts"],["Semifinal - marcador exacto","12 pts"],["Final - marcador exacto","15 pts"],["Campeón correcto","20 pts"]]},
        {title:"Bonificaciones especiales",rows:[["Campeón del torneo","20 pts"],["Goleador del torneo","10 pts"],["MVP del torneo","10 pts"]]},
      ].map(s=>(
        <div key={s.title} style={{...card,padding:20,borderRadius:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,textTransform:"uppercase",color:"#fff",marginBottom:14}}>{s.title}</div>
          {s.items?s.items.map(item=>(
            <div key={item} style={{fontSize:13,color:G.gray,padding:"6px 0",borderBottom:`1px solid ${G.border}`,lineHeight:1.5}}>• {item}</div>
          )):s.rows.map(([l,p])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
              <span style={{fontSize:13,color:G.gray}}>{l}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{p}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
