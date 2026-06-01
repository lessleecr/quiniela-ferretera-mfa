import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Save, LogOut } from "lucide-react";

const supabase = createClient(
  "https://xhouolqlmrrqzfctblwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob3VvbHFsbXJycXpmY3RibHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYyNjYsImV4cCI6MjA5NTg0MjI2Nn0.jodF4LzC6K7DyG5nYTbCNqwr1z_x8qljjMEQYoL2aOY"
);

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
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

export default function QuinielaMFA() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("predictions");
  const [predictions, setPredictions] = useState({});
  const [predictionStatus, setPredictionStatus] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");
  const [adminResults, setAdminResults] = useState({ 1:{home:2,away:0}, 2:{home:1,away:1} });

  const matches = matchList.map((m, i) => ({
    ...m, homeTeam:teams[m.home], awayTeam:teams[m.away],
    status: i < 40 ? "Abierto" : i < 56 ? "Cierra pronto" : "Cerrado",
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
      setUser({ name:commercialName, legalName:hardwareName, cedula, contact:email.split("@")[0], email, province:selProv, canton:selCant, district:selDist, phone:userWhatsapp, firstName, lastName1, lastName2 });
    } catch(err) { setError(err.message||"Error al crear el usuario."); }
    finally { setIsLoading(false); }
  };

  const updatePrediction = (matchId, team, value) => {
    setPredictions(c=>({...c,[matchId]:{...c[matchId],[team]:value.replace(/[^0-9]/g,"").slice(0,2)}}));
    setPredictionStatus("");
  };
  const savePredictions = () => {
    const incomplete = matches.some(m=>{const p=predictions[m.id]||{};return p.home===undefined||p.home===""||p.away===undefined||p.away==="";});
    setPredictionStatus(incomplete?"error":"ok");
  };
  const updateResult = (matchId, team, value) => {
    if (adminResults[matchId]?.locked) return;
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],[team]:value.replace(/[^0-9]/g,"").slice(0,2)}}));
  };
  const publishResult = matchId => {
    setAdminResults(c=>{const r=c[matchId];if(!r||r.home===""||r.away==="")return c;return{...c,[matchId]:{...r,locked:true}};});
  };
  const clearResult = matchId => {
    setAdminResults(c=>{const u={...c};delete u[matchId];return u;});
  };

  if (!user) {
    return (
      <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>
          <Header subtitle="Mayoreo Ferretería y Acabados" />
          <div style={{display:"grid",gridTemplateColumns:"1fr 390px",gap:32,alignItems:"start"}}>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(26,158,63,.12)",border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:700,color:G.green,textTransform:"uppercase",letterSpacing:1,marginBottom:20}}>⚽ Ya inició la competencia</div>
              <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:80,fontWeight:900,lineHeight:.9,textTransform:"uppercase",marginBottom:16}}>
                <span style={{WebkitTextStroke:`2px ${G.green}`,color:"transparent"}}>Demuestra</span><br/>
                <span style={{WebkitTextStroke:`2px ${G.green}`,color:"transparent"}}>que</span><br/>
                <span style={{color:G.green}}>sabes de</span><br/>
                <span style={{WebkitTextStroke:`2px ${G.green}`,color:"transparent"}}>fútbol</span>
              </h2>
              <p style={{fontSize:16,color:G.gray,lineHeight:1.6,maxWidth:480,marginBottom:32}}>Participa en la Quiniela Ferretera MFA, predice los marcadores del Mundial 2026, suma puntos y compite por grandes premios.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:32}}>
                {[["🎯","Predice","los marcadores"],["📊","Suma","puntos"],["🏆","Gana","premios"]].map(([icon,title,desc])=>(
                  <div key={title} style={{...card,padding:16,textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:8}}>{icon}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{title}</div>
                    <div style={{fontSize:11,color:G.muted,marginTop:2}}>{desc}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
                <div style={{...card,padding:16}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>🏅 Top 3 de la quiniela</div>
                  {[{name:"Juan P.",pts:125},{name:"María G.",pts:118},{name:"Carlos V.",pts:109}].map((p,i)=>(
                    <div key={p.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<2?`1px solid ${G.border}`:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,width:20}}>{i+1}</span>
                        <div style={{width:28,height:28,borderRadius:"50%",background:G.card2,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G.gray}}>{p.name[0]}</div>
                        <span style={{fontSize:13}}>{p.name}</span>
                      </div>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{p.pts} pts</span>
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
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                {[["🏆","Grandes premios","Para los mejores al final del torneo"],["⭐","Marcador exacto","Predice bien y gana más puntos"]].map(([icon,title,desc])=>(
                  <div key={title} style={{background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:16,display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:28}}>{icon}</span>
                    <div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:G.green,textTransform:"uppercase"}}>{title}</div>
                      <div style={{fontSize:12,color:G.muted,marginTop:2}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...card,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:14,color:G.green}}>🛡️</span>
                <p style={{fontSize:11,color:G.muted,lineHeight:1.5}}>La Quiniela Ferretera MFA es una dinámica promocional exclusiva para clientes MFA. Aplican condiciones del concurso.</p>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              <div style={{...card,padding:28,borderRadius:20}}>
                <div style={{textAlign:"center",marginBottom:24}}>
                  <div style={{width:64,height:64,background:"rgba(26,158,63,.1)",border:`2px solid ${G.green}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28}}>🏆</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Ingresa a la quiniela</div>
                  <div style={{fontSize:13,color:G.muted,marginTop:4}}>Accede con tus datos para competir</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:22}}>
                  {[["login","Iniciar sesión"],["register","Crear usuario"]].map(([mode,label])=>(
                    <button key={mode} onClick={()=>{setAuthMode(mode);setError("");}} style={{padding:"12px",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",border:`2px solid ${G.green}`,color:"#fff",background:authMode===mode?G.green:G.greenDim}}>{label}</button>
                  ))}
                </div>
                {authMode==="login"?(
                  <form onSubmit={e=>{e.preventDefault();handleLogin();}}>
                    <Field label="Correo electrónico" value={email} onChange={setEmail} placeholder="ejemplo@correo.com" type="email"/>
                    <Field label="Contraseña" value={password} onChange={setPassword} placeholder="Tu contraseña" type="password"/>
                    {error&&<ErrorBox msg={error}/>}
                    <button type="submit" disabled={isLoading} style={{...greenBtn,opacity:isLoading?.7:1,marginTop:8}}>{isLoading?"Verificando...":"Ingresar"}</button>
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
                    <Field label="Nombre" value={firstName} onChange={setFirstName} placeholder="Nombre"/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <Field label="Primer apellido" value={lastName1} onChange={setLastName1} placeholder="Primer apellido"/>
                      <Field label="Segundo apellido" value={lastName2} onChange={setLastName2} placeholder="Segundo apellido"/>
                    </div>
                    <Field label="Cédula de identidad" value={cedulaPersonal} onChange={setCedulaPersonal} placeholder="Ej: 1-1234-5678"/>
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

  const tabs = [["predictions","🎯","Mis predicciones"],["results","📊","Mis resultados"],["standings","🏅","Posiciones"],["admin","⚙️","Admin"],["rules","📋","Reglas"]];

  return (
    <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>
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

        <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}}>
          {tabs.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setView(id)} style={{padding:"10px 16px",borderRadius:8,border:`1px solid ${view===id?G.green:G.border}`,background:view===id?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{icon} {label}</button>
          ))}
        </div>

        {view==="predictions"&&<PredictionsView matches={matches} predictions={predictions} updatePrediction={updatePrediction} savePredictions={savePredictions} predictionStatus={predictionStatus} matchFilter={matchFilter} setMatchFilter={setMatchFilter} calcPoints={calcPoints}/>}
        {view==="results"&&<ResultsView matches={matches} predictions={predictions} calcPoints={calcPoints}/>}
        {view==="standings"&&<StandingsView matches={matches} predictions={predictions} calcPoints={calcPoints} user={user}/>}
        {view==="admin"&&<AdminView matches={matches} updateResult={updateResult} publishResult={publishResult} clearResult={clearResult} adminResults={adminResults}/>}
        {view==="rules"&&<RulesView/>}
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
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Mis predicciones</div>
          <div style={{fontSize:13,color:G.muted}}>Primera fase · Por grupo · Marcador exacto = 5 pts</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["all","Todos"],["Abierto","Abiertos"],["Cierra pronto","Cierra pronto"],["Cerrado","Cerrados"]].map(([v,l])=>(
            <button key={v} onClick={()=>setMatchFilter(v)} style={{padding:"7px 14px",borderRadius:100,border:`1px solid ${matchFilter===v?G.green:G.border}`,background:matchFilter===v?G.green:"transparent",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>
      {Object.entries(groups).filter(([,gm])=>gm.length>0).map(([group,gMatches])=>(
        <div key={group} style={{...card,padding:20,borderRadius:16,marginBottom:16}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>Grupo {group}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
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
      {predictionStatus&&(
        <div style={{borderRadius:10,padding:"12px 16px",marginBottom:16,background:predictionStatus==="ok"?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",border:`1px solid ${predictionStatus==="ok"?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,color:predictionStatus==="ok"?G.green:"#ff5050",fontSize:13}}>
          {predictionStatus==="ok"?"✅ Predicciones guardadas correctamente.":"⚠️ Debes completar todos los marcadores antes de guardar."}
        </div>
      )}
      <button onClick={savePredictions} style={{...greenBtn,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Save size={18}/> Guardar predicciones</button>
    </div>
  );
}

function ResultsView({ matches, predictions, calcPoints }) {
  const played=matches.filter(m=>m.result);
  const total=played.reduce((t,m)=>t+calcPoints(predictions[m.id]||{},m.result),0);
  const done=played.filter(m=>{const p=predictions[m.id]||{};return p.home!==undefined&&p.home!==""&&p.away!==undefined&&p.away!==""}).length;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
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
            <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:G.muted}}>Grupo {m.group} · {m.date}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:700,marginTop:2}}>{m.homeTeam.flag} {m.homeTeam.name} vs {m.awayTeam.flag} {m.awayTeam.name}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
                  <div style={{fontSize:10,color:G.muted}}>Tu predicción</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</div>
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
  const fullName = [user.firstName, user.lastName1, user.lastName2].filter(Boolean).join(" ") || user.name || "Mi ferretería";
  const users = [
    { name:fullName, province:user.province||"San José", predMap:predictions },
  ].map(u=>({...u,pts:matches.filter(m=>m.result).reduce((t,m)=>t+calcPoints(u.predMap[m.id]||{},m.result),0),preds:matches.filter(m=>{const p=u.predMap[m.id]||{};return p.home!==undefined&&p.home!==""&&p.away!==undefined&&p.away!==""}).length})).sort((a,b)=>b.pts-a.pts);
  return (
    <div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>Tabla de posiciones</div>
      <div style={{...card,borderRadius:12,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:G.card2}}>
              {["#","Ferretería","Provincia","Predicciones","Puntos"].map(h=>(
                <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u,i)=>(
              <tr key={u.name} style={{borderBottom:`1px solid ${G.border}`}}>
                <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green}}>{i+1}</td>
                <td style={{padding:"12px 16px",fontWeight:600}}>{u.name}</td>
                <td style={{padding:"12px 16px",color:G.gray,fontSize:13}}>{u.province}</td>
                <td style={{padding:"12px 16px",textAlign:"center",fontWeight:600}}>{u.preds}</td>
                <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green}}>{u.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminView({ matches, updateResult, publishResult, clearResult, adminResults }) {
  return (
    <div>
      <div style={{...card,padding:16,borderRadius:12,marginBottom:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Cargar marcadores oficiales</div>
        <div style={{fontSize:13,color:G.muted,marginTop:4}}>Al publicar un marcador se actualizan los puntos automáticamente.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
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
  );
}

function RulesView() {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
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
