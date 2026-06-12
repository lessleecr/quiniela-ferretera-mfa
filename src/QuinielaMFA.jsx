import React, { useEffect, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Save, LogOut } from "lucide-react";

const supabase = createClient(
  "https://xhouolqlmrrqzfctblwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob3VvbHFsbXJycXpmY3RibHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYyNjYsImV4cCI6MjA5NTg0MjI2Nn0.jodF4LzC6K7DyG5nYTbCNqwr1z_x8qljjMEQYoL2aOY"
);

const ADMIN_EMAILS = ["lvillegasv@mfamayoreo.com"];
const isAdmin = (user) => user && (ADMIN_EMAILS.includes(user.email) || user.esAdmin === true);

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


const SELECCIONES_MUNDIAL = [
  "México","Sudáfrica","Corea del Sur","Chequia","Canadá","Bosnia","Qatar","Suiza",
  "Brasil","Marruecos","Haití","Escocia","EE.UU.","Paraguay","Australia","Turquía",
  "Alemania","Curazao","Costa de Marfil","Ecuador","Países Bajos","Japón","Suecia",
  "Túnez","Bélgica","Egipto","Irán","Nueva Zelanda","España","Cabo Verde",
  "Arabia Saudita","Uruguay","Francia","Senegal","Irak","Noruega","Argentina",
  "Argelia","Austria","Jordania","Portugal","Congo DR","Uzbekistán","Colombia",
  "Inglaterra","Croacia","Ghana","Panamá"
];

const TOP_JUGADORES = [
  "Lionel Messi","Cristiano Ronaldo","Kylian Mbappé","Erling Haaland","Vinicius Jr.",
  "Rodri","Lamine Yamal","Jude Bellingham","Phil Foden","Bukayo Saka",
  "Pedri","Gavi","Federico Valverde","Toni Kroos","Kevin De Bruyne",
  "Mohamed Salah","Harry Kane","Robert Lewandowski","Antoine Griezmann","Romelu Lukaku",
  "Riyad Mahrez","Son Heung-min","Dusan Vlahovic","Rafael Leão","Khvicha Kvaratskhelia",
  "Jamal Musiala","Florian Wirtz","Marcus Rashford","Bruno Fernandes","Bernardo Silva",
  "Ruben Dias","Virgil van Dijk","Achraf Hakimi","Theo Hernández","Leroy Sané",
  "Serge Gnabry","Takumi Minamino","Hiroki Sakai","Ritsu Doan","Paulo Dybala",
  "Lautaro Martínez","Julián Álvarez","Rodrigo De Paul","Alexis Mac Allister","Enzo Fernández",
  "Neymar Jr.","Richarlison","Gabriel Martinelli","Endrick","Raphinha",
  "Achraf Hakimi","Sofyan Amrabat","Hakim Ziyech","Youssef En-Nesyri","Azzedine Ounahi",
  "Sadio Mané","Édouard Mendy","Ismaïla Sarr","Boulaye Dia","Nicolas Jackson",
  "Kaoru Mitoma","Wataru Endo","Shunsuke Nakamura","Ao Tanaka","Daichi Kamada",
  "Cody Gakpo","Memphis Depay","Virgil van Dijk","Xavi Simons","Tijjani Reijnders",
  "Ivan Toney","Jordan Pickford","Declan Rice","Trent Alexander-Arnold","Kobbie Mainoo",
  "Pedri González","Álvaro Morata","Mikel Merino","Martín Zubimendi","Aymeric Laporte",
  "Ousmane Dembélé","Aurélien Tchouaméni","Eduardo Camavinga","Adrien Rabiot","Marcus Thuram",
  "Granit Xhaka","Xherdan Shaqiri","Breel Embolo","Manuel Akanji","Yann Sommer",
  "Dusan Tadic","Aleksandar Mitrovic","Sergej Milinkovic-Savic","Luka Modric","Ivan Perisic",
  "Heung-Min Son","Lee Kang-in","Cho Gue-sung","Kim Min-jae","Hwang Hee-chan",
  "Hirving Lozano","Guillermo Ochoa","Raúl Jiménez","Edson Álvarez","Santiago Giménez",
  "Christian Pulisic","Tyler Adams","Matt Turner","Weston McKennie","Ricardo Pepi",
  "Enner Valencia","Moisés Caicedo","Jeremy Sarmiento","Gonzalo Plata","Piero Hincapié"
];


function SoporteChat({ user, isAdmin }) {
  const [open, setOpen] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [mensajes, setMensajes] = React.useState([]);
  const [unread, setUnread] = React.useState(0);
  const [showBroadcast, setShowBroadcast] = React.useState(false);
  const [broadcastMsg, setBroadcastMsg] = React.useState("");
  const [broadcasting, setBroadcasting] = React.useState(false);
  const bottomRef = React.useRef(null);

  const loadMensajes = React.useCallback(async () => {
    const query = isAdmin
      ? supabase.from("soporte").select("*").order("created_at", { ascending: true })
      : supabase.from("soporte").select("*").eq("user_email", user.email).order("created_at", { ascending: true });
    const { data } = await query;
    if (data) {
      setMensajes(data);
      if (!open) {
        const newUnread = data.filter(m => !m.leido_admin && m.from_user && !isAdmin).length +
                          data.filter(m => !m.leido_user && !m.from_user && m.user_email === user.email).length;
        setUnread(newUnread);
      }
    }
  }, [user.email, isAdmin, open]);

  React.useEffect(() => {
    loadMensajes();
    const interval = setInterval(loadMensajes, 15000);
    return () => clearInterval(interval);
  }, [loadMensajes]);

  React.useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      // Mark as read
      if (isAdmin) {
        supabase.from("soporte").update({ leido_admin: true }).eq("from_user", true).then(() => {});
      } else {
        supabase.from("soporte").update({ leido_user: true }).eq("user_email", user.email).eq("from_user", false).then(() => {});
      }
      setUnread(0);
    }
  }, [open, mensajes, isAdmin, user.email]);

  const enviar = async () => {
    if (!mensaje.trim()) return;
    const userName = [user.firstName, user.lastName1].filter(Boolean).join(" ") || user.name || "Usuario";
    await supabase.from("soporte").insert({
      user_email: user.email,
      user_name: userName,
      mensaje: mensaje.trim(),
      from_user: !isAdmin,
      leido_admin: isAdmin,
      leido_user: !isAdmin,
      created_at: new Date().toISOString()
    });
    setMensaje("");
    loadMensajes();
  };

  const enviarATodos = async () => {
    if (!broadcastMsg.trim()) return;
    setBroadcasting(true);
    // Get all unique users
    const { data: usuarios } = await supabase.from("usuarios").select("email, nombre, primer_apellido, nombre_comercial");
    if (usuarios) {
      const inserts = usuarios.map(u => ({
        user_email: u.email,
        user_name: [u.nombre, u.primer_apellido].filter(Boolean).join(" ") || u.nombre_comercial || u.email,
        mensaje: broadcastMsg.trim(),
        from_user: false,
        leido_admin: true,
        leido_user: false,
        created_at: new Date().toISOString()
      }));
      // Insert in batches of 100
      for (let i = 0; i < inserts.length; i += 100) {
        await supabase.from("soporte").insert(inserts.slice(i, i + 100));
      }
    }
    setBroadcastMsg("");
    setShowBroadcast(false);
    setBroadcasting(false);
    loadMensajes();
  };

  // Group messages by user for admin view
  const conversaciones = isAdmin ? [...new Set(mensajes.map(m => m.user_email))] : null;
  const [selectedConv, setSelectedConv] = React.useState(null);
  const convMensajes = isAdmin && selectedConv ? mensajes.filter(m => m.user_email === selectedConv) : mensajes;
  const convUser = isAdmin && selectedConv ? mensajes.find(m => m.user_email === selectedConv) : null;

  const toCR = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleString("es-CR", { timeZone:"America/Costa_Rica", day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" });
  };

  return (
    <>
      {/* Floating button */}
      <div onClick={() => setOpen(!open)} style={{position:"fixed",bottom:24,right:24,width:56,height:56,borderRadius:"50%",background:G.green,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 4px 20px rgba(0,0,0,.4)",zIndex:9999,transition:"transform .2s",transform:open?"scale(0.9)":"scale(1)"}}>
        {open ? "✕" : "💬"}
        {!open && unread > 0 && (
          <div style={{position:"absolute",top:-4,right:-4,width:20,height:20,borderRadius:"50%",background:"#ff5050",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>{unread}</div>
        )}
      </div>

      {/* Chat panel */}
      {open && (
        <div style={{position:"fixed",bottom:92,right:24,width:360,height:500,background:G.card,border:`1px solid ${G.green}`,borderRadius:16,display:"flex",flexDirection:"column",zIndex:9998,boxShadow:"0 8px 40px rgba(0,0,0,.5)",overflow:"hidden"}}>
          {/* Header */}
          <div style={{background:"rgba(26,158,63,.15)",borderBottom:`1px solid ${G.border}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:900,color:G.green,textTransform:"uppercase"}}>
                {isAdmin ? "💬 Soporte — Todos los tickets" : "💬 Soporte MFA"}
              </div>
              <div style={{fontSize:11,color:G.muted}}>{isAdmin ? `${conversaciones?.length || 0} conversaciones` : "Escríbenos, te respondemos pronto"}</div>
            </div>
            {isAdmin && selectedConv && (
              <button onClick={() => setSelectedConv(null)} style={{background:"transparent",border:"none",color:G.muted,cursor:"pointer",fontSize:12}}>← Volver</button>
            )}
          </div>

          {/* Broadcast panel */}
          {isAdmin && showBroadcast && (
            <div style={{borderBottom:`1px solid ${G.border}`,padding:"10px 12px",background:"rgba(255,180,0,.05)"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#ffb400",marginBottom:6}}>📢 Mensaje para todos los usuarios</div>
              <textarea
                value={broadcastMsg}
                onChange={e => setBroadcastMsg(e.target.value)}
                placeholder="Escribe el mensaje que verán todos..."
                rows={3}
                style={{...inp,width:"100%",resize:"none",fontSize:12,padding:"8px 10px",marginBottom:6,boxSizing:"border-box"}}
              />
              <div style={{display:"flex",gap:6}}>
                <button onClick={() => setShowBroadcast(false)} style={{flex:1,background:"transparent",border:`1px solid ${G.border}`,borderRadius:8,padding:"7px",fontSize:12,color:G.muted,cursor:"pointer"}}>Cancelar</button>
                <button onClick={enviarATodos} disabled={broadcasting||!broadcastMsg.trim()} style={{flex:2,background:"rgba(255,180,0,.15)",border:"1px solid rgba(255,180,0,.3)",borderRadius:8,padding:"7px",fontSize:12,fontWeight:700,color:"#ffb400",cursor:"pointer",opacity:broadcasting?.6:1}}>
                  {broadcasting ? "Enviando..." : "📢 Enviar a todos"}
                </button>
              </div>
            </div>
          )}

          {/* Admin: list of conversations */}
          {isAdmin && !selectedConv ? (
            <div style={{flex:1,overflowY:"auto",padding:8}}>
              {conversaciones?.length === 0 && <div style={{textAlign:"center",padding:"40px 0",color:G.muted,fontSize:13}}>Sin tickets aún</div>}
              {conversaciones?.map(email => {
                const conv = mensajes.filter(m => m.user_email === email);
                const last = conv[conv.length - 1];
                const hasUnread = conv.some(m => m.from_user && !m.leido_admin);
                return (
                  <div key={email} onClick={() => setSelectedConv(email)} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:hasUnread?"rgba(26,158,63,.08)":"transparent",border:`1px solid ${hasUnread?G.green:G.border}`,marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{last?.user_name || email}</div>
                      {hasUnread && <span style={{fontSize:10,fontWeight:700,color:G.green,background:"rgba(26,158,63,.15)",padding:"2px 6px",borderRadius:100}}>NUEVO</span>}
                    </div>
                    <div style={{fontSize:11,color:G.muted,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{last?.mensaje}</div>
                    <div style={{fontSize:10,color:G.muted,marginTop:2}}>{toCR(last?.created_at)}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:8}}>
                {convMensajes.length === 0 && (
                  <div style={{textAlign:"center",padding:"40px 0",color:G.muted,fontSize:13}}>
                    <div style={{fontSize:32,marginBottom:8}}>👋</div>
                    ¿Tienes algún problema o consulta? Escríbenos aquí.
                  </div>
                )}
                {convMensajes.map((m, i) => {
                  const esPropio = isAdmin ? !m.from_user : m.from_user;
                  return (
                    <div key={i} style={{display:"flex",justifyContent:esPropio?"flex-end":"flex-start"}}>
                      <div style={{maxWidth:"80%",background:esPropio?"rgba(26,158,63,.2)":G.card2,border:`1px solid ${esPropio?"rgba(26,158,63,.3)":G.border}`,borderRadius:esPropio?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"8px 12px"}}>
                        {!esPropio && isAdmin && <div style={{fontSize:10,fontWeight:700,color:G.green,marginBottom:3}}>{m.user_name}</div>}
                        {!esPropio && !isAdmin && <div style={{fontSize:10,fontWeight:700,color:G.green,marginBottom:3}}>Admin MFA</div>}
                        <div style={{fontSize:13,color:"#fff",lineHeight:1.5}}>{m.mensaje}</div>
                        <div style={{fontSize:10,color:G.muted,marginTop:4,textAlign:"right"}}>{toCR(m.created_at)}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef}/>
              </div>

              {/* Input */}
              <div style={{borderTop:`1px solid ${G.border}`,padding:"10px 12px",display:"flex",gap:8}}>
                <input
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && enviar()}
                  placeholder={isAdmin && selectedConv ? `Responder a ${convUser?.user_name||selectedConv}...` : "Escribe tu mensaje..."}
                  style={{...inp,flex:1,padding:"8px 12px",fontSize:13,marginBottom:0}}
                />
                <button onClick={enviar} style={{background:G.green,border:"none",borderRadius:8,padding:"8px 14px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13}}>↑</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function calcPoints(pred, result) {
  if (!result || result.home === undefined || result.away === undefined || result.home === null || result.away === null) return 0;
  if (!pred || pred.home === undefined || pred.home === null || String(pred.home) === "" || pred.away === undefined || pred.away === null || String(pred.away) === "") return 0;
  const h = Number(pred.home), a = Number(pred.away);
  const rh = Number(result.home), ra = Number(result.away);
  if (isNaN(h) || isNaN(a) || isNaN(rh) || isNaN(ra)) return 0;
  if (h === rh && a === ra) return 5;
  const pd = h - a, rd = rh - ra;
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
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [haciendaOk, setHaciendaOk] = useState("");
  const [isConsultingCedula, setIsConsultingCedula] = useState(false);
  const [cedulaPersonalStatus, setCedulaPersonalStatus] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("predictions");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBonos, setShowBonos] = useState(false);
  const [tick, setTick] = useState(0); // forces re-render every minute to update match statuses
  const [bonosCampeon, setBonosCampeon] = useState("");
  const [bonosGoleador, setBonosGoleador] = useState("");
  const [bonosMVP, setBonosMVP] = useState("");
  const [bonosGoleadorOtro, setBonosGoleadorOtro] = useState("");
  const [bonosMVPOtro, setBonosMVPOtro] = useState("");
  const [predictions, setPredictions] = useState({});
  const [predictionStatus, setPredictionStatus] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");
  const [adminResults, setAdminResults] = useState({});

  // Load results from Supabase — re-runs every minute via tick so locked/published state stays in sync for all users
  useEffect(() => {
    supabase.from("resultados").select("*").then(({ data }) => {
      if (data) {
        const map = {};
        data.forEach(r => { map[r.match_id] = { home: Number(r.home), away: Number(r.away), locked: r.locked, published: r.published }; });
        setAdminResults(map);
      }
    });
  }, [tick]);

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

  const matches = useMemo(() => matchList.map((m) => ({
    ...m, homeTeam:teams[m.home], awayTeam:teams[m.away],
    status: adminResults[m.id]?.locked ? "Cerrado" : getMatchStatus(m.date, m.time),
    // result is only visible to users when published=true
    result: adminResults[m.id]?.published && adminResults[m.id].home !== "" && adminResults[m.id].away !== ""
      ? { home:Number(adminResults[m.id].home), away:Number(adminResults[m.id].away), locked:adminResults[m.id].locked, published:true } : null,
    // adminResult always visible to admin regardless of published state
    adminResult: adminResults[m.id] || null,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), [adminResults, tick]);

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
      if (!u) {
        try { await supabase.from("access_log").insert({ email: email.trim().toLowerCase(), evento: "login_fallido", timestamp: new Date().toISOString() }); } catch(_){}
        setError("Correo o contraseña incorrectos."); setIsLoading(false); return;
      }
      if (u.bloqueado) {
        try { await supabase.from("access_log").insert({ email: u.email, evento: "login_bloqueado", timestamp: new Date().toISOString() }); } catch(_){}
        setError("Tu cuenta ha sido suspendida. Contacta a MFA para más información."); setIsLoading(false); return;
      }
      // Log successful login with IP (via ipify)
      const ipResp = await fetch("https://api.ipify.org?format=json").catch(()=>({json:()=>({ip:"desconocida"})}));
      const { ip } = await ipResp.json().catch(()=>({ip:"desconocida"}));
      try { await supabase.from("access_log").insert({ email: u.email, evento: "login_exitoso", ip, user_agent: navigator.userAgent, timestamp: new Date().toISOString() }); } catch(_){}
      setUser({ name:u.nombre_comercial, legalName:u.razon_social, cedula:u.cedula, contact:u.contacto, email:u.email, province:u.provincia, canton:u.canton, district:u.distrito, phone:u.whatsapp_usuario, firstName:u.nombre, lastName1:u.primer_apellido, lastName2:u.segundo_apellido, esAdmin:u.es_admin||false });
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
      const ipR = await fetch("https://api.ipify.org?format=json").catch(()=>({json:()=>({ip:"desconocida"})}));
      const { ip: ipReg } = await ipR.json().catch(()=>({ip:"desconocida"}));
      try { await supabase.from("access_log").insert({ email: email.trim().toLowerCase(), evento: "registro", ip: ipReg, user_agent: navigator.userAgent, timestamp: new Date().toISOString() }); } catch(_){}
      setUser({ name:commercialName, legalName:hardwareName, cedula, contact:email.split("@")[0], email, province:selProv, canton:selCant, district:selDist, phone:userWhatsapp, businessWhatsapp, firstName, lastName1, lastName2, cedulaPersonal });
    } catch(err) { setError(err.message||"Error al crear el usuario."); }
    finally { setIsLoading(false); }
  };

  const saveBonos = async () => {
    const campeon = bonosCampeon.trim();
    const goleador = bonosGoleador === "Otro" ? bonosGoleadorOtro.trim() : bonosGoleador;
    const mvp = bonosMVP === "Otro" ? bonosMVPOtro.trim() : bonosMVP;
    if (!campeon || !goleador || !mvp) { alert("Por favor completa los tres campos de bonificación."); return; }
    const { error } = await supabase.from("usuarios").update({
      bono_campeon: campeon, bono_goleador: goleador, bono_mvp: mvp, bonos_completado: true
    }).eq("email", user.email);
    if (error) { alert("Error al guardar bonificaciones: " + error.message); return; }
    setShowBonos(false);
  };

  const updatePrediction = async (matchId, team, value) => {
    // Security: verify match is still open before allowing any edit
    const match = matchList.find(m => m.id === matchId);
    if (!match) return;
    const status = getMatchStatus(match.date, match.time);
    if (status === "Cerrado") return; // silently block closed matches

    const v = value.replace(/[^0-9]/g,"").slice(0,2);
    const updated = { ...predictions, [matchId]: { ...(predictions[matchId]||{}), [team]: v } };
    setPredictions(updated);
    const pred = updated[matchId];
    if (pred.home !== undefined && pred.home !== "" && pred.away !== undefined && pred.away !== "") {
      // Double-check status right before saving (in case time passed while typing)
      const statusNow = getMatchStatus(match.date, match.time);
      if (statusNow === "Cerrado") {
        setPredictionStatus("closed");
        setTimeout(()=>setPredictionStatus(""),3000);
        return;
      }
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
    const now = new Date();
    const entries = Object.entries(predictions)
      .filter(([matchId, p]) => {
        if (p.home === undefined || p.home === "" || p.away === undefined || p.away === "") return false;
        // Security: only save predictions for open matches
        const match = matchList.find(m => m.id === Number(matchId));
        if (!match) return false;
        const status = getMatchStatus(match.date, match.time);
        return status !== "Cerrado";
      })
      .map(([matchId, p]) => ({ user_email: user.email, match_id: Number(matchId), home: p.home, away: p.away, updated_at: now.toISOString() }));
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

  // Auto-refresh match statuses every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  // Load bonos when user logs in
  useEffect(() => {
    if (!user) return;
    supabase.from("usuarios").select("bono_campeon,bono_goleador,bono_mvp,bonos_completado").eq("email", user.email).single().then(({ data }) => {
      if (data) {
        if (data.bono_campeon) setBonosCampeon(data.bono_campeon);
        if (data.bono_goleador) setBonosGoleador(data.bono_goleador);
        if (data.bono_mvp) setBonosMVP(data.bono_mvp);
        if (!data.bonos_completado) setShowBonos(true);

      } else {
        setShowBonos(true);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, matches]);

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
    // Security: only ADMIN_EMAILS can publish results
    if (!isAdmin(user)) return;
    const r = adminResults[matchId];
    if (!r || r.home === "" || r.away === "" || r.home === undefined || r.away === undefined) return;
    // Security: match must be closed before publishing result
    const match = matchList.find(m => m.id === matchId);
    if (match) {
      const status = getMatchStatus(match.date, match.time);
      if (status !== "Cerrado") {
        alert("⚠️ No se puede publicar el resultado antes del cierre del partido.");
        return;
      }
    }
    await supabase.from("resultados").upsert({
      match_id: matchId, home: Number(r.home), away: Number(r.away), locked: true, published: true, updated_at: new Date().toISOString()
    }, { onConflict: "match_id" });
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],locked:true}}));
  };
  const lockMatch = async (matchId) => {
    if (!isAdmin(user)) return;
    // Check if result row already exists
    const { data: existing } = await supabase.from("resultados").select("id").eq("match_id", matchId).maybeSingle();
    let error;
    if (existing) {
      // Row exists — just update locked flag
      ({ error } = await supabase.from("resultados").update({ locked: true, updated_at: new Date().toISOString() }).eq("match_id", matchId));
    } else {
      // No row yet — insert with home/away = 0 as placeholder
      ({ error } = await supabase.from("resultados").insert({ match_id: matchId, locked: true, home: 0, away: 0, updated_at: new Date().toISOString() }));
    }
    if (error) { alert("Error al cerrar partido: " + error.message); return; }
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],locked:true}}));
  };

  const unlockMatch = async (matchId) => {
    if (!isAdmin(user)) return;
    const { error } = await supabase.from("resultados").update({ locked: false }).eq("match_id", matchId);
    if (error) { alert("Error al abrir partido: " + error.message); return; }
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],locked:false}}));
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
      let preds = [];
      let from2 = 0;
      while (true) {
        const { data: page } = await supabase.from("predicciones").select("*").range(from2, from2 + 999);
        if (!page || page.length === 0) break;
        preds = preds.concat(page);
        if (page.length < 1000) break;
        from2 += 1000;
      }
      const { data: resultados } = await supabase.from("resultados").select("*").eq("published", true);
      if (!usuarios || !preds) return;
      const predMap = {};
      preds.forEach(p => {
        if (!predMap[p.user_email]) predMap[p.user_email] = {};
        predMap[p.user_email][String(p.match_id)] = { home: Number(p.home), away: Number(p.away) };
      });
      const resultados2 = resultados || [];
      const standing = usuarios.map(u => {
        const userPreds = preds.filter(p => p.user_email === u.email);
        let pts = 0;
        for (const r of resultados2) {
          const pred = userPreds.find(p => Number(p.match_id) === Number(r.match_id));
          if (!pred) continue;
          const ph = Number(pred.home), pa = Number(pred.away);
          const rh = Number(r.home), ra = Number(r.away);
          if (isNaN(ph) || isNaN(pa)) continue;
          if (ph === rh && pa === ra) { pts += 5; }
          else if ((ph-pa > 0 && rh-ra > 0) || (ph-pa < 0 && rh-ra < 0) || (ph-pa === 0 && rh-ra === 0)) { pts += 3; }
          else if ((ph-pa) === (rh-ra) && ph !== rh) { pts += 1; }
        }
        const name = u.nombre && u.primer_apellido ? `${u.nombre} ${u.primer_apellido}` : u.nombre_comercial || "Usuario";
        return { name, pts, preds: userPreds.length };
      }).sort((a,b) => b.pts - a.pts || b.preds - a.preds).slice(0, 10);
      setLiveStandings(standing);
    };
    loadStandings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, matches]);

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
                  <Countdown matches={matches}/>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>📅 Próximos partidos</div>
                  {(() => {
                    // Show upcoming matches: not yet closed, ordered by date, up to 8 or next 2 days
                    const now = new Date();
                    const crNow = new Date(now.getTime() - 6*60*60*1000);
                    const todayStr = crNow.toISOString().slice(0,10);
                    const tomorrowStr = new Date(crNow.getTime() + 86400000).toISOString().slice(0,10);
                    const months = {"JUN":5};
                    const toDate = (date,time) => {
                      const [day,mon] = date.split(" ");
                      const [hm,per] = time.split(" ");
                      let [h,m] = hm.split(":").map(Number);
                      if(per==="PM"&&h!==12) h+=12;
                      if(per==="AM"&&h===12) h=0;
                      return new Date(Date.UTC(2026,months[mon],parseInt(day),h+6,m));
                    };
                    const upcoming = matches.filter(m => toDate(m.date,m.time) > now).slice(0,8);
                    // Try to show matches from today+tomorrow first, fallback to next 4
                    const twoDays = upcoming.filter(m => {
                      const d = toDate(m.date,m.time).toISOString().slice(0,10);
                      return d === todayStr || d === tomorrowStr;
                    });
                    const display = twoDays.length >= 2 ? twoDays : upcoming.slice(0,8);
                    return display.map(m=>(
                    <div key={m.id} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${G.border}`}}>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.homeTeam.flag} {m.home}</span>
                      <span style={{fontSize:10,fontWeight:700,color:G.green,background:"rgba(26,158,63,.15)",padding:"2px 5px",borderRadius:4}}>VS</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.away} {m.awayTeam.flag}</span>
                      <div style={{textAlign:"right",fontSize:9,color:G.muted,lineHeight:1.4}}>{m.date}<br/>{m.time}</div>
                    </div>
                    ));
                  })()}
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
                    <div style={{marginBottom:4}}>
                      <Field label="Cédula física o jurídica de la ferretería" value={cedula} onChange={setCedula} placeholder="Ej: 3101234567 o 112345678"/>
                    </div>
                    <div style={{fontSize:11,color:G.muted,marginBottom:12,lineHeight:1.5}}>📄 Ingresa la cédula tal como aparece en las facturas de MFA (física o jurídica).</div>
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
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,margin:"14px 0",padding:"14px",background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:10}}>
                      <input type="checkbox" id="terminos" checked={aceptoTerminos} onChange={e=>setAceptoTerminos(e.target.checked)} style={{marginTop:3,width:16,height:16,accentColor:G.green,cursor:"pointer",flexShrink:0}}/>
                      <label htmlFor="terminos" style={{fontSize:12,color:G.gray,lineHeight:1.6,cursor:"pointer"}}>
                        Declaro que soy cliente activo de MFA, que los datos de la ferretería son verídicos y que tengo vínculo laboral o de representación con el establecimiento indicado. Acepto las <span style={{color:G.green,fontWeight:700}}>reglas y condiciones</span> de la Quiniela Ferretera MFA, incluyendo que MFA podrá verificar mis datos y suspender mi participación en caso de uso fraudulento.
                      </label>
                    </div>
                    <button type="submit" disabled={isLoading||!aceptoTerminos} style={{...greenBtn,opacity:(isLoading||!aceptoTerminos)?.5:1,marginTop:4}}>{isLoading?"Creando cuenta...":"Crear usuario"}</button>
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

  const isAdminUser = isAdmin(user);
  const tabs = [
    ["predictions","🎯","Mis predicciones"],
    ["results","📊","Mis resultados"],
    ["standings","🏅","Posiciones"],
    ["profile","👤","Mi perfil"],
    ["chat","💬","Chat"],
    ...(isAdminUser ? [["admin","⚙️","Admin"]] : []),
    ["rules","📋","Reglas"]
  ];

  return (
    <>
    <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}} className="main-padding">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,background:G.green,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:"#fff"}}>M</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,letterSpacing:2,lineHeight:1}}>MFA</div>
              <div style={{fontSize:10,color:G.gray,letterSpacing:1,textTransform:"uppercase"}}>{user.firstName} {user.lastName1}</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,fontWeight:600}}>{user.firstName} {user.lastName1}</div>
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

      {showBonos && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:G.card,border:`1px solid ${G.green}`,borderRadius:20,padding:32,maxWidth:520,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontSize:40,marginBottom:10}}>⭐</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:G.green,textTransform:"uppercase",letterSpacing:1}}>Bonificaciones Especiales</div>
              <div style={{fontSize:13,color:G.gray,marginTop:6}}>Estas predicciones otorgan puntos extra al final del torneo</div>
            </div>

            {/* Campeón */}
            <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff"}}>🏆 Campeón del torneo</div>
                <span style={{background:"rgba(26,158,63,.15)",color:G.green,border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>20 pts</span>
              </div>
              <div style={{position:"relative"}}>
                <input list="campeon-list" value={bonosCampeon} onChange={e=>setBonosCampeon(e.target.value)} placeholder="Escribe o selecciona una selección..." style={{...inp,paddingRight:32}}/>
                <datalist id="campeon-list">
                  {SELECCIONES_MUNDIAL.map(s=><option key={s} value={s}/>)}
                </datalist>
              </div>
            </div>

            {/* Goleador */}
            <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff"}}>⚽ Goleador del torneo</div>
                <span style={{background:"rgba(26,158,63,.15)",color:G.green,border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>10 pts</span>
              </div>
              <input list="goleador-list" value={bonosGoleador} onChange={e=>setBonosGoleador(e.target.value)} placeholder="Escribe o selecciona un jugador..." style={inp}/>
              <datalist id="goleador-list">
                {TOP_JUGADORES.map(j=><option key={j} value={j}/>)}
                <option value="Otro"/>
              </datalist>
              {bonosGoleador === "Otro" && (
                <input value={bonosGoleadorOtro} onChange={e=>setBonosGoleadorOtro(e.target.value)} placeholder="Escribe el nombre del jugador..." style={{...inp,marginTop:8}}/>
              )}
            </div>

            {/* MVP */}
            <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff"}}>🌟 MVP del torneo</div>
                <span style={{background:"rgba(26,158,63,.15)",color:G.green,border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>10 pts</span>
              </div>
              <input list="mvp-list" value={bonosMVP} onChange={e=>setBonosMVP(e.target.value)} placeholder="Escribe o selecciona un jugador..." style={inp}/>
              <datalist id="mvp-list">
                {TOP_JUGADORES.map(j=><option key={j} value={j}/>)}
                <option value="Otro"/>
              </datalist>
              {bonosMVP === "Otro" && (
                <input value={bonosMVPOtro} onChange={e=>setBonosMVPOtro(e.target.value)} placeholder="Escribe el nombre del jugador..." style={{...inp,marginTop:8}}/>
              )}
            </div>

            <div style={{fontSize:11,color:G.muted,textAlign:"center",marginBottom:16}}>⚠️ Solo podrás modificar estas predicciones antes del inicio del torneo (11 JUN)</div>
            <button onClick={saveBonos} style={{...greenBtn,fontSize:16}}>✅ Guardar bonificaciones</button>
          </div>
        </div>
      )}

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
            {view==="admin"&&<AdminView matches={matches} updateResult={updateResult} publishResult={publishResult} clearResult={clearResult} lockMatch={lockMatch} unlockMatch={unlockMatch} adminResults={adminResults} calcPoints={calcPoints}/>}
            {view==="rules"&&<RulesView/>}
        </div>
      </div>
    </div>
  );
}


function Countdown({ matches }) {
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [nextMatch, setNextMatch] = React.useState(null);

  const getMatchDate = (date, time) => {
    const months = { "JUN": 5 };
    const [day, monthStr] = date.split(" ");
    const [hourMin, period] = time.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const d = new Date(Date.UTC(2026, months[monthStr], parseInt(day), hours + 6, minutes));
    return d;
  };

  const calcTimeLeft = () => {
    const now = new Date();
    const upcoming = matches
      .filter(m => m.status !== "Cerrado" && getMatchDate(m.date, m.time) > now)
      .sort((a, b) => getMatchDate(a.date, a.time) - getMatchDate(b.date, b.time));
    if (!upcoming.length) { setNextMatch(null); setTimeLeft(null); return; }
    const next = upcoming[0];
    setNextMatch(next);
    const diff = getMatchDate(next.date, next.time) - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setTimeLeft({ h, m, s, total: diff });
  };

  React.useEffect(() => {
    calcTimeLeft();
    const i = setInterval(calcTimeLeft, 1000);
    return () => clearInterval(i);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  if (!nextMatch || !timeLeft) return null;

  const pad = n => String(n).padStart(2, "0");
  const urgent = timeLeft.total < 3600000; // less than 1 hour

  return (
    <div style={{background: urgent ? "rgba(255,80,80,.08)" : "rgba(26,158,63,.06)", border: `1px solid ${urgent ? "rgba(255,80,80,.3)" : "rgba(26,158,63,.25)"}`, borderRadius:12, padding:"12px 16px", marginBottom:12}}>
      <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:urgent?"#ff5050":G.green,marginBottom:6}}>
        {urgent ? "⚡ ¡Cierra pronto!" : "⏱ Próximo cierre"}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:700}}>
          {nextMatch.homeTeam?.flag} {nextMatch.home} vs {nextMatch.away} {nextMatch.awayTeam?.flag}
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {[["h",pad(timeLeft.h)],["m",pad(timeLeft.m)],["s",pad(timeLeft.s)]].map(([label,val])=>(
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:urgent?"#ff5050":G.green,background: urgent?"rgba(255,80,80,.1)":"rgba(26,158,63,.1)",border:`1px solid ${urgent?"rgba(255,80,80,.3)":"rgba(26,158,63,.3)"}`,borderRadius:6,padding:"2px 7px",minWidth:34}}>{val}</div>
              <div style={{fontSize:9,color:G.muted,marginTop:2}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictionsView({ matches, predictions, updatePrediction, savePredictions, predictionStatus, matchFilter, setMatchFilter, calcPoints }) {
  const groups = matches.reduce((acc,m)=>{
    if(matchFilter==="all"||m.status===matchFilter){acc[m.date]=acc[m.date]||[];acc[m.date].push(m);}
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
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>📅 {group}</div>
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
                    <input disabled={m.status==="Cerrado"} value={pred.home||""} onChange={e=>updatePrediction(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px",opacity:m.status==="Cerrado"?.5:1,cursor:m.status==="Cerrado"?"not-allowed":"text"}} placeholder="0"/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,color:G.green}}>VS</span>
                    <input disabled={m.status==="Cerrado"} value={pred.away||""} onChange={e=>updatePrediction(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px",opacity:m.status==="Cerrado"?.5:1,cursor:m.status==="Cerrado"?"not-allowed":"text"}} placeholder="0"/>
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
      {predictionStatus==="closed"&&(
        <div style={{borderRadius:10,padding:"12px 16px",marginBottom:16,background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",color:"#ff5050",fontSize:13}}>
          🔒 Este partido ya cerró. No se puede modificar la predicción.
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
      // Paginate predictions to bypass Supabase 1000 row limit
      let allPreds = [];
      let from = 0;
      const pageSize = 1000;
      while (true) {
        const { data: page } = await supabase.from("predicciones").select("*").range(from, from + pageSize - 1);
        if (!page || page.length === 0) break;
        allPreds = allPreds.concat(page);
        if (page.length < pageSize) break;
        from += pageSize;
      }
      const { data: resultados } = await supabase.from("resultados").select("*").eq("published", true);
      if (!usuarios) { setLoading(false); return; }
      const resultados2 = resultados || [];
      const ranked = usuarios.map(u => {
        const userPreds = allPreds.filter(p => p.user_email === u.email);
        let pts = 0;
        for (const r of resultados2) {
          const pred = userPreds.find(p => Number(p.match_id) === Number(r.match_id));
          if (!pred) continue;
          const ph = Number(pred.home), pa = Number(pred.away);
          const rh = Number(r.home), ra = Number(r.away);
          if (isNaN(ph) || isNaN(pa)) continue;
          if (ph === rh && pa === ra) { pts += 5; }
          else if ((ph-pa > 0 && rh-ra > 0)||(ph-pa < 0 && rh-ra < 0)||(ph-pa === 0 && rh-ra === 0)) { pts += 3; }
          else if ((ph-pa) === (rh-ra) && ph !== rh) { pts += 1; }
        }
        const contactName = [u.nombre, u.primer_apellido, u.segundo_apellido].filter(Boolean).join(" ") || "—";
        const isMe = u.email === user.email;
        const fullName = [u.nombre, u.primer_apellido].filter(Boolean).join(" ") || u.nombre_comercial || "—";
        return { name: fullName, contactName, province: u.provincia || "—", pts, preds: userPreds.length, isMe };
      }).sort((a, b) => b.pts - a.pts || b.preds - a.preds);
      setStandings(ranked);
      setLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

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
                {["#","Contacto","Provincia","Predicciones","Puntos"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((u,i)=>(
                <tr key={u.name+i} style={{borderBottom:`1px solid ${G.border}`,background:u.isMe?"rgba(26,158,63,.08)":"transparent"}}>
                  <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:i<3?G.green:G.muted}}>{i+1}</td>
                  <td style={{padding:"12px 16px",fontWeight:600,color:u.isMe?G.green:"#fff"}}>{u.contactName}{u.isMe&&<span style={{fontSize:10,marginLeft:6,color:G.green,fontStyle:"italic"}}>← tú</span>}</td>
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


function AccessLogView() {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filtroEvento, setFiltroEvento] = React.useState("all");

  React.useEffect(() => {
    supabase.from("access_log").select("*").order("timestamp", {ascending:false}).limit(200).then(({data}) => {
      if (data) setLogs(data);
      setLoading(false);
    });
  }, []);

  const toCR = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("es-CR", {timeZone:"America/Costa_Rica",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
  };

  const colorEvento = (e) => ({
    "login_exitoso": {bg:"rgba(26,158,63,.1)",color:"#1a9e3f",border:"rgba(26,158,63,.3)"},
    "login_fallido": {bg:"rgba(255,80,80,.1)",color:"#ff5050",border:"rgba(255,80,80,.3)"},
    "registro":      {bg:"rgba(255,180,0,.1)",color:"#ffb400",border:"rgba(255,180,0,.3)"},
  }[e] || {bg:"rgba(100,100,100,.1)",color:"#aaa",border:"rgba(100,100,100,.3)"});

  const filtered = filtroEvento === "all" ? logs : logs.filter(l => l.evento === filtroEvento);

  // Detect suspicious: same IP multiple failed logins
  const ipFails = {};
  logs.filter(l=>l.evento==="login_fallido").forEach(l => { ipFails[l.ip] = (ipFails[l.ip]||0)+1; });
  const suspiciousIPs = new Set(Object.entries(ipFails).filter(([,c])=>c>=3).map(([ip])=>ip));

  return (
    <div>
      <div style={{...card,padding:16,borderRadius:12,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>🔍 Log de accesos</div>
          <div style={{fontSize:13,color:G.muted,marginTop:4}}>Últimos 200 eventos · hora Costa Rica</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["all","Todos"],["login_exitoso","✅ Exitosos"],["login_fallido","❌ Fallidos"],["registro","🆕 Registros"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFiltroEvento(v)} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${filtroEvento===v?G.green:G.border}`,background:filtroEvento===v?G.green:G.card2,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>

      {suspiciousIPs.size > 0 && (
        <div style={{background:"rgba(255,80,80,.08)",border:"1px solid rgba(255,80,80,.3)",borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:"#ff5050"}}>
          ⚠️ <strong>IPs sospechosas</strong> ({suspiciousIPs.size} con 3+ intentos fallidos): {[...suspiciousIPs].join(", ")}
        </div>
      )}

      {loading ? (
        <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando registros...</div>
      ) : (
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["Fecha/Hora CR","Email","Evento","IP","Dispositivo"].map(h=>(
                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log,i)=>{
                const c = colorEvento(log.evento);
                const suspicious = suspiciousIPs.has(log.ip);
                return (
                  <tr key={i} style={{borderBottom:`1px solid ${G.border}`,background:suspicious&&log.evento==="login_fallido"?"rgba(255,80,80,.04)":"transparent"}}>
                    <td style={{padding:"10px 12px",fontSize:12,color:G.gray,whiteSpace:"nowrap"}}>{toCR(log.timestamp)}</td>
                    <td style={{padding:"10px 12px",fontSize:13}}>{log.email||"—"}</td>
                    <td style={{padding:"10px 12px"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:100,border:`1px solid ${c.border}`,background:c.bg,color:c.color,whiteSpace:"nowrap"}}>{log.evento}</span>
                    </td>
                    <td style={{padding:"10px 12px",fontSize:12,color:suspicious?"#ff5050":G.gray,fontWeight:suspicious?700:400}}>{log.ip||"—"}{suspicious&&" ⚠️"}</td>
                    <td style={{padding:"10px 12px",fontSize:11,color:G.muted,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.user_agent||"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{textAlign:"center",padding:"40px 0",color:G.muted}}>Sin registros.</div>}
        </div>
      )}
    </div>
  );
}

function AdminView({ matches, updateResult, publishResult, clearResult, lockMatch, unlockMatch, adminResults, calcPoints }) {
  const [section, setSection] = React.useState("scores");
  const [dbUsers, setDbUsers] = React.useState([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedUserPreds, setSelectedUserPreds] = React.useState([]);

  React.useEffect(() => {
    if (!selectedUser) return;
    supabase.from("predicciones").select("*").eq("user_email", selectedUser.email).range(0, 99999).then(({data}) => {
      setSelectedUserPreds(data || []);
    });
  }, [selectedUser]);
  const [search, setSearch] = React.useState("");
  const [extraAdmins, setExtraAdmins] = React.useState([]);
  const SUPERUSER = "lvillegasv@mfamayoreo.com";

  const isUserAdmin = (email) => ADMIN_EMAILS.includes(email) || extraAdmins.includes(email);

  // Load extra admins from Supabase on mount
  React.useEffect(() => {
    supabase.from("usuarios").select("email").eq("es_admin", true).then(({ data }) => {
      if (data) setExtraAdmins(data.map(u => u.email));
    });
  }, []);

  const toggleAdmin = async (email) => {
    if (email === SUPERUSER) return;
    const currentlyAdmin = isUserAdmin(email);
    const { error } = await supabase.from("usuarios").update({ es_admin: !currentlyAdmin }).eq("email", email);
    if (error) { alert("Error al actualizar permisos: " + error.message); return; }
    setExtraAdmins(current =>
      currentlyAdmin ? current.filter(e => e !== email) : [...current, email]
    );
  };

  const toggleBloqueo = async (u) => {
    if (u.email === SUPERUSER) return;
    const bloqueado = !u.bloqueado;
    const { error } = await supabase.from("usuarios").update({ bloqueado }).eq("email", u.email);
    if (error) { alert("Error al actualizar estado: " + error.message); return; }
    setSelectedUser(prev => ({...prev, bloqueado}));
    setDbUsers(prev => prev.map(x => x.email === u.email ? {...x, bloqueado} : x));
    // Log the action
    try { await supabase.from("access_log").insert({ email: u.email, evento: bloqueado ? "usuario_bloqueado" : "usuario_desbloqueado", timestamp: new Date().toISOString() }); } catch(_){}
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


  const loadUsers = React.useCallback(async () => {
    setLoadingUsers(true);
    const { data } = await supabase.from("usuarios").select("*").order("created_at", { ascending: false });
    let preds = [];
    let fromU = 0;
    while (true) {
      const { data: page } = await supabase.from("predicciones").select("*").range(fromU, fromU + 999);
      if (!page || page.length === 0) break;
      preds = preds.concat(page);
      if (page.length < 1000) break;
      fromU += 1000;
    }
    if (data) {
      setDbUsers(data);
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
        {[["scores","⚽ Cargar marcadores"],["users","👥 Ver usuarios"],["banners","🖼️ Banners"],["log","🔍 Log de accesos"]].map(([s,l])=>(
          <button key={s} onClick={()=>setSection(s)} style={{padding:"10px 18px",borderRadius:8,border:`1px solid ${section===s?G.green:G.border}`,background:section===s?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      {section==="banners" ? (
        <BannersAdmin/>
      ) : section==="log" ? (
        <AccessLogView/>
      ) : section==="scores" ? (
        <div>
          <div style={{...card,padding:16,borderRadius:12,marginBottom:16}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Cargar marcadores oficiales</div>
            <div style={{fontSize:13,color:G.muted,marginTop:4}}>Al publicar un marcador se actualizan los puntos automáticamente.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}} className="admin-scores-grid">
            {matches.map(m=>(
              <div key={m.id} style={{...card,padding:14,borderRadius:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:11,color:G.muted}}>{m.date} · {m.time}</span>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    {adminResults[m.id]?.locked && !adminResults[m.id]?.published && <span style={{fontSize:10,fontWeight:700,color:"#ff8c00",background:"rgba(255,140,0,.1)",border:"1px solid rgba(255,140,0,.3)",borderRadius:100,padding:"2px 7px"}}>🔒 CERRADO</span>}
                    {adminResults[m.id]?.published ? <span style={{fontSize:11,color:G.green}}>✅ Publicado</span> : <span style={{fontSize:11,color:"#ffb400"}}>⏳ Pendiente</span>}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 52px auto 52px 1fr",alignItems:"center",gap:6,marginBottom:12}}>
                  <div style={{textAlign:"right",fontSize:18}}>{m.homeTeam.flag}</div>
                  <input disabled={adminResults[m.id]?.locked} value={adminResults[m.id]?.home?.toString()||""} onChange={e=>updateResult(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px",opacity:adminResults[m.id]?.locked?.6:1}} placeholder="0"/>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:G.green,fontWeight:700}}>VS</span>
                  <input disabled={adminResults[m.id]?.locked} value={adminResults[m.id]?.away?.toString()||""} onChange={e=>updateResult(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px",opacity:adminResults[m.id]?.locked?.6:1}} placeholder="0"/>
                  {adminResults[m.id]?.locked && !adminResults[m.id]?.published && <div style={{gridColumn:"1/-1",fontSize:10,color:"#ff8c00",textAlign:"center",marginTop:-6}}>⚠️ Cerrado pero no publicado — los puntos no se suman aún</div>}
                  <div style={{fontSize:18}}>{m.awayTeam.flag}</div>
                </div>
                {adminResults[m.id]?.locked ? (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <button onClick={()=>unlockMatch(m.id)} style={{background:"rgba(255,140,0,.1)",border:"1px solid rgba(255,140,0,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:"#ff8c00",cursor:"pointer"}}>🔓 Abrir partido</button>
                    <button onClick={()=>publishResult(m.id)} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:G.green,cursor:"pointer"}}>Publicar</button>
                  </div>
                ) : (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                    <button onClick={()=>clearResult(m.id)} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:8,padding:"8px",fontSize:11,fontWeight:700,color:"#ff5050",cursor:"pointer"}}>🗑 Limpiar</button>
                    <button onClick={()=>lockMatch(m.id)} style={{background:"rgba(255,140,0,.1)",border:"1px solid rgba(255,140,0,.3)",borderRadius:8,padding:"8px",fontSize:11,fontWeight:700,color:"#ff8c00",cursor:"pointer"}}>🔒 Cerrar</button>
                    <button onClick={()=>publishResult(m.id)} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px",fontSize:11,fontWeight:700,color:G.green,cursor:"pointer"}}>✅ Publicar</button>
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
                    <button key={u.id} onClick={()=>setSelectedUser(u)} style={{width:"100%",padding:"12px 16px",background:selectedUser?.id===u.id?"rgba(26,158,63,.1)":u.bloqueado?"rgba(255,80,80,.04)":"transparent",border:"none",borderBottom:`1px solid ${G.border}`,textAlign:"left",cursor:"pointer",transition:".15s"}}>
                      <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{u.nombre_comercial||"Sin nombre"}</div>
                      <div style={{fontSize:12,color:G.green,marginTop:2}}>{u.nombre} {u.primer_apellido} {u.segundo_apellido}</div>
                      <div style={{fontSize:11,color:G.muted,marginTop:2}}>{u.email}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                        <div style={{fontSize:11,color:G.muted}}>{u.provincia} · {u.canton}</div>
                        {u.bloqueado && <span style={{fontSize:10,fontWeight:700,color:"#ff5050",background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:100,padding:"1px 6px"}}>⛔ BLOQ</span>}
                      </div>
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
                    <div style={{marginTop:16,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                      {selectedUser.email === SUPERUSER ? (
                        <div style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"10px 16px",fontSize:13,fontWeight:700,color:G.green}}>
                          ⭐ Superusuario — no se puede modificar
                        </div>
                      ) : (<>
                        <button onClick={()=>toggleAdmin(selectedUser.email)} style={{
                          padding:"10px 20px", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer",
                          border: isUserAdmin(selectedUser.email) ? "1px solid rgba(255,80,80,.4)" : "1px solid rgba(26,158,63,.4)",
                          background: isUserAdmin(selectedUser.email) ? "rgba(255,80,80,.1)" : "rgba(26,158,63,.1)",
                          color: isUserAdmin(selectedUser.email) ? "#ff5050" : G.green,
                        }}>
                          {isUserAdmin(selectedUser.email) ? "❌ Quitar Admin" : "✅ Asignar como Admin"}
                        </button>
                        <button onClick={()=>toggleBloqueo(selectedUser)} style={{
                          padding:"10px 20px", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer",
                          border: selectedUser.bloqueado ? "1px solid rgba(26,158,63,.4)" : "1px solid rgba(255,140,0,.4)",
                          background: selectedUser.bloqueado ? "rgba(26,158,63,.1)" : "rgba(255,140,0,.08)",
                          color: selectedUser.bloqueado ? G.green : "#ff8c00",
                        }}>
                          {selectedUser.bloqueado ? "🔓 Desbloquear usuario" : "🚫 Bloquear usuario"}
                        </button>
                        {selectedUser.bloqueado && (
                          <span style={{fontSize:12,fontWeight:700,padding:"4px 10px",borderRadius:100,background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",color:"#ff5050"}}>⛔ BLOQUEADO</span>
                        )}
                      </>)}
                      <div style={{fontSize:12,color:G.muted}}>
                        Rol: <span style={{color:isUserAdmin(selectedUser.email)?G.green:G.gray,fontWeight:700}}>{isUserAdmin(selectedUser.email)?"Administrador":"Usuario"}</span>
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
const pred = selectedUserPreds?.find(p=>Number(p.match_id)===Number(m.id));
                                const hasPred = pred && pred.home !== null && pred.away !== null;
                                return (
                                  <tr key={m.id} style={{borderBottom:`1px solid ${G.border}`}}>
                                    <td style={{padding:"8px 12px",fontSize:12,color:G.muted,fontWeight:700}}>{m.group}</td>
                                    <td style={{padding:"8px 12px",fontSize:13}}>{ht?.flag} {m.home} vs {m.away} {at?.flag}</td>
                                    <td style={{padding:"8px 12px",fontSize:11,color:G.muted,whiteSpace:"nowrap"}}>{m.date} {m.time}</td>
                                    <td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</td>
                                    {(() => { const matchData = matches.find(mx=>mx.id===m.id); const res = matchData?.result || matchData?.adminResult; const pts = res?.published && hasPred ? calcPoints({home:Number(pred?.home),away:Number(pred?.away)}, {home:Number(res.home),away:Number(res.away)}) : null; return (<><td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{res?`${res.home} - ${res.away}`:"—"}</td><td style={{padding:"8px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:pts===5?G.green:pts>0?"#ffb400":G.muted}}>{pts!==null?`${pts} pts`:"—"}</td></>); })()}
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

function BonificacionesDisplay({ email }) {
  const [bonos, setBonos] = React.useState(null);
  React.useEffect(() => {
    supabase.from("usuarios").select("bono_campeon,bono_goleador,bono_mvp,bonos_completado").eq("email", email).single().then(({ data }) => {
      if (data) setBonos(data);
    });
  }, [email]);

  const items = [
    { icon:"🏆", label:"Campeón del torneo", pts:"20 pts", value: bonos?.bono_campeon },
    { icon:"⚽", label:"Goleador del torneo", pts:"10 pts", value: bonos?.bono_goleador },
    { icon:"🌟", label:"MVP del torneo",      pts:"10 pts", value: bonos?.bono_mvp },
  ];

  if (!bonos?.bonos_completado) {
    return (
      <div style={{background:"rgba(255,180,0,.06)",border:"1px solid rgba(255,180,0,.2)",borderRadius:10,padding:"14px 16px",fontSize:13,color:"#ffb400",textAlign:"center"}}>
        ⚠️ Aún no has completado tus bonificaciones especiales.
      </div>
    );
  }

  return (
    <div style={{display:"grid",gap:10}}>
      {items.map(({icon,label,pts,value})=>(
        <div key={label} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:10,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>{icon}</span>
            <div>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{label}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",marginTop:2}}>{value || "—"}</div>
            </div>
          </div>
          <span style={{background:"rgba(26,158,63,.15)",color:G.green,border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>{pts}</span>
        </div>
      ))}
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

      {/* Bonificaciones especiales */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>⭐ Bonificaciones especiales</div>
        <BonificacionesDisplay email={user.email}/>
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
  const isAdminUser = isAdmin(user);
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
          {isAdminUser && (
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowPollForm(!showPollForm)} style={{background:showPollForm?"rgba(255,180,0,.2)":"rgba(26,158,63,.1)",border:`1px solid ${showPollForm?"rgba(255,180,0,.4)":"rgba(26,158,63,.3)"}`,borderRadius:8,padding:"6px 12px",color:showPollForm?"#ffb400":G.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>📊 Encuesta</button>
              <button onClick={()=>fileInputRef.current?.click()} disabled={uploadingImg} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"6px 12px",color:G.green,fontSize:12,fontWeight:700,cursor:"pointer",opacity:uploadingImg?.6:1}}>{uploadingImg?"Subiendo...":"📷 Foto"}</button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={uploadImage} style={{display:"none"}}/>
            </div>
          )}
        </div>

        {/* Poll form */}
        {showPollForm && isAdminUser && (
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
  const seccion = (titulo, icono, items) => (
    <div style={{...card,padding:20,borderRadius:12}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,textTransform:"uppercase",color:"#fff",marginBottom:14}}>{icono} {titulo}</div>
      {items.map(([l,p])=>(
        <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
          <span style={{fontSize:13,color:G.gray,lineHeight:1.5}}>{l}</span>
          {p && <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,color:G.green,whiteSpace:"nowrap"}}>{p}</span>}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{display:"grid",gap:16}}>

      {/* Elegibilidad */}
      {seccion("Elegibilidad y participación","🏪",[
        ["La Quiniela Ferretera MFA es una dinámica promocional exclusiva para clientes activos de Mayoreo Ferretería y Acabados (MFA).",""],
        ["Solo pueden participar personas mayores de 18 años que trabajen o representen a una ferretería cliente de MFA.",""],
        ["Se permite un único registro por cédula jurídica de ferretería y por cédula de identidad personal. Registros duplicados serán eliminados sin previo aviso.",""],
        ["Un registro por correo electrónico. No se permite usar correos temporales o falsos.",""],
        ["Al registrarse, el participante declara bajo su responsabilidad que los datos de ferretería son verídicos y que efectivamente labora o representa a dicho establecimiento.",""],
      ])}

      {/* Predicciones */}
      {seccion("Predicciones","🎯",[
        ["Las predicciones deben ingresarse antes del inicio oficial de cada partido según el horario de Costa Rica (UTC-6).",""],
        ["Una vez iniciado el partido, las predicciones quedan bloqueadas automáticamente y no pueden modificarse.",""],
        ["Los resultados oficiales son los publicados por MFA al finalizar el tiempo reglamentario (90 minutos). No se consideran prórrogas ni penales para la fase de grupos.",""],
        ["Las bonificaciones especiales (Campeón, Goleador, MVP) deben completarse antes del inicio del torneo (11 JUN).",""],
        ["El ranking se actualiza automáticamente tras la publicación de cada resultado por el administrador.",""],
      ])}

      {/* Puntaje */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="rules-grid">
        {seccion("Fase de grupos","📊",[
          ["Marcador exacto","5 pts"],
          ["Ganador o empate correcto","3 pts"],
          ["Diferencia de goles correcta","+1 pt"],
        ])}
        {seccion("Bonificaciones especiales","⭐",[
          ["Campeón del torneo","20 pts"],
          ["Goleador del torneo","10 pts"],
          ["MVP del torneo","10 pts"],
        ])}
      </div>

      {/* Premios y verificación */}
      {seccion("Premios de bonificaciones especiales","⭐",[
        ["Los premios por Campeón del torneo, Goleador del torneo y MVP del torneo serán rifados exclusivamente entre los participantes que acertaron el resultado correspondiente.",""],
        ["Si nadie acierta alguna de estas bonificaciones, el premio de esa categoría queda desierto o podrá ser reasignado a criterio de MFA.",""],
        ["La rifa se realizará de forma transparente por MFA una vez concluido el torneo y anunciados los resultados oficiales de cada categoría.",""],
      ])}
      {seccion("Reclamación de premios","🏆",[
        ["Los premios del ranking final serán entregados a los participantes con mayor puntaje al cierre del torneo.",""],
        ["Para reclamar cualquier premio, el ganador deberá demostrar fehacientemente que trabaja o representa a la ferretería indicada en su registro. MFA podrá solicitar cualquier documentación que considere necesaria.",""],
        ["Si el ganador no puede verificar su vínculo con la ferretería registrada, el premio pasará al siguiente participante en el ranking.",""],
        ["Los premios no son transferibles, canjeables por dinero en efectivo ni acumulables.",""],
        ["MFA se reserva el derecho de modificar los premios sin previo aviso.",""],
      ])}

      {/* Conducta y fraude */}
      {seccion("Conducta y uso fraudulento","🛡️",[
        ["Queda estrictamente prohibido el uso de herramientas automatizadas, bots o cualquier medio artificial para ingresar predicciones.",""],
        ["Cualquier intento de manipular el sistema, los resultados o el ranking será motivo de descalificación inmediata y permanente.",""],
        ["En caso de detectarse uso fraudulento, suplantación de identidad o datos falsos, MFA podrá suspender, limitar o eliminar la participación del usuario sin previo aviso y sin responsabilidad de ningún tipo.",""],
        ["MFA se reserva el derecho de auditar predicciones, registros y actividad en cualquier momento.",""],
        ["Las decisiones del administrador de MFA sobre descalificaciones o disputas son finales e inapelables.",""],
      ])}

      {/* Disclaimer */}
      <div style={{background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:"16px 20px",fontSize:12,color:G.muted,lineHeight:1.7}}>
        <strong style={{color:G.green,display:"block",marginBottom:6}}>⚖️ Disposiciones generales</strong>
        La Quiniela Ferretera MFA es una dinámica promocional sin costo de participación, organizada por Mayoreo Ferretería y Acabados. La participación implica la aceptación total de estas reglas. MFA se reserva el derecho de modificar, suspender o cancelar la dinámica en cualquier momento por razones operativas, de fuerza mayor o por incumplimiento masivo de las normas. Para consultas o reclamos: <strong style={{color:"#fff"}}>lvillegasv@mfamayoreo.com</strong>
      </div>
    </div>
    <SoporteChat user={user} isAdmin={isAdmin(user)}/>
    </>
  );
}
// force rebuild Fri Jun 12 00:44:10 UTC 2026
