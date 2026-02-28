// frontend/src/pages/Login.jsx

import { useState } from "react";

function strengthInfo(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const labels = ["", "😟 Weak", "😐 Fair", "💪 Strong", "🔥 Great!"];
  const colors = ["", "#ff6b6b", "#ffd93d", "#6bcb77", "#6bcb77"];
  return { score: s, label: labels[s], color: colors[s] };
}

export default function Login({ onLogin }) {
  const [mode, setMode]         = useState("login"); // "login" | "signup"
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const strength = strengthInfo(password);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Please fill in all fields.");

    if (mode === "signup") {
      if (!name.trim())        return setError("Please enter your name.");
      if (password.length < 6) return setError("Password must be at least 6 characters.");
      if (password !== confirm) return setError("Passwords do not match.");
    }
    localStorage.setItem("auth", "true");
    // Just call onLogin — App.jsx will unlock the site
    // Later you can replace this with a real API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800); // small delay to feel real
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setName(""); setEmail(""); setPassword(""); setConfirm(""); setError("");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Sora:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,.45); }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes drift   { from{transform:translateY(0) scale(1)} to{transform:translateY(30px) scale(1.05)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }
        .login-orb { position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;animation:drift 8s ease-in-out infinite alternate; }
        .login-input { width:100%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:12px;padding:13px 14px 13px 42px;font-family:'Nunito',sans-serif;font-size:14px;color:#fff;outline:none;transition:border-color .2s,box-shadow .2s; }
        .login-input:focus { border-color:rgba(255,255,255,.55);box-shadow:0 0 0 3px rgba(255,255,255,.08); }
        .login-btn { width:100%;padding:14px;background:rgba(255,255,255,.22);border:1.5px solid rgba(255,255,255,.35);border-radius:12px;font-family:'Sora',sans-serif;font-size:14px;font-weight:600;color:#fff;cursor:pointer;transition:background .2s,transform .15s; }
        .login-btn:hover:not(:disabled) { background:rgba(255,255,255,.32);transform:translateY(-1px); }
        .login-btn:disabled { opacity:.6;cursor:not-allowed; }
        .google-btn { width:100%;padding:13px;background:rgba(255,255,255,.92);border:none;border-radius:12px;font-family:'Nunito',sans-serif;font-size:13.5px;font-weight:700;color:#3d2f8f;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:background .2s,transform .15s; }
        .google-btn:hover { background:#fff;transform:translateY(-1px); }
      `}</style>

      <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#5b4fcf 0%,#7b68ee 30%,#9c6fd6 55%,#4ca1af 100%)",fontFamily:"'Nunito',sans-serif",position:"relative",overflow:"hidden" }}>

        {/* Background orbs */}
        <div className="login-orb" style={{width:500,height:500,background:"rgba(108,92,231,.4)",top:-150,left:-100}} />
        <div className="login-orb" style={{width:400,height:400,background:"rgba(76,161,175,.35)",bottom:-100,right:-80,animationDelay:"-3s"}} />
        <div className="login-orb" style={{width:300,height:300,background:"rgba(180,100,220,.25)",top:"50%",left:"50%",marginTop:-150,marginLeft:-150,animationDelay:"-6s"}} />

        {/* Card */}
        <div style={{ display:"grid",gridTemplateColumns:"1.1fr 1fr",width:"min(92vw,900px)",minHeight:560,borderRadius:24,overflow:"hidden",backdropFilter:"blur(20px)",boxShadow:"0 30px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.15)",position:"relative",zIndex:1,animation:"slideUp .7s cubic-bezier(.16,1,.3,1) both" }}>

          {/* Left — Brand */}
          <div style={{ background:"rgba(255,255,255,.08)",borderRight:"1px solid rgba(255,255,255,.15)",padding:"52px 48px",display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",width:280,height:280,background:"rgba(108,92,231,.2)",borderRadius:"50%",bottom:-80,left:-80,filter:"blur(50px)",pointerEvents:"none" }} />

            {/* Logo */}
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:42,height:42,background:"linear-gradient(135deg,rgba(255,255,255,.3),rgba(255,255,255,.1))",border:"1.5px solid rgba(255,255,255,.4)",borderRadius:12,display:"grid",placeItems:"center",fontSize:20 }}>🧠</div>
              <div style={{ fontFamily:"'Sora',sans-serif",fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.2 }}>
                AI Attention OS
                <span style={{ display:"block",fontSize:10,fontWeight:400,color:"rgba(255,255,255,.6)",letterSpacing:".08em" }}>Intelligent Focus System</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:20,padding:"5px 14px",fontSize:11,color:"rgba(255,255,255,.7)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:20 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#7effa0",boxShadow:"0 0 6px #7effa0",display:"inline-block",animation:"pulse 2s ease-in-out infinite" }} /> AI-Powered
              </div>
              <div style={{ fontFamily:"'Sora',sans-serif",fontSize:34,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:16 }}>
                Reclaim your<br />
                <span style={{ background:"linear-gradient(90deg,#f8d7f0,#c8b4f8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Focus & Attention</span>
              </div>
              <p style={{ fontSize:13.5,color:"rgba(255,255,255,.7)",lineHeight:1.7,marginBottom:28 }}>
                An intelligent cognitive OS that dynamically allocates your attention based on deadlines, mental state, and priorities.
              </p>
              {[["🎯","Smart Priority Engine"],["🍅","AI Pomodoro Rooms"],["📊","Behavioral Dashboard"],["💤","Health-Aware Scheduling"]].map(([icon,label]) => (
                <div key={label} style={{ display:"flex",alignItems:"center",gap:10,fontSize:12.5,color:"rgba(255,255,255,.7)",marginBottom:10 }}>
                  <div style={{ width:28,height:28,borderRadius:8,background:"rgba(255,255,255,.12)",display:"grid",placeItems:"center",flexShrink:0 }}>{icon}</div>
                  {label}
                </div>
              ))}
            </div>

            <div style={{ fontSize:11,color:"rgba(255,255,255,.4)",letterSpacing:".05em" }}>TLE Coders · Built for Students, by Students</div>
          </div>

          {/* Right — Form */}
          <div style={{ background:"rgba(255,255,255,.1)",padding:"48px 44px",display:"flex",flexDirection:"column",justifyContent:"center",gap:22 }}>
            <div>
              <h2 style={{ fontFamily:"'Sora',sans-serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:6 }}>
                {mode === "login" ? "Welcome back 👋" : "Join the OS 🚀"}
              </h2>
              <p style={{ fontSize:13,color:"rgba(255,255,255,.65)" }}>
                {mode === "login" ? "Sign in to optimize your focus today" : "Create your account and start focusing smarter"}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:14 }}>

              {mode === "signup" && (
                <div>
                  <label style={{ display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".07em",textTransform:"uppercase",marginBottom:7 }}>Full Name</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",opacity:.6 }}>👤</span>
                    <input className="login-input" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".07em",textTransform:"uppercase",marginBottom:7 }}>Email Address</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",opacity:.6 }}>📧</span>
                  <input className="login-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@university.edu" />
                </div>
              </div>

              <div>
                <label style={{ display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".07em",textTransform:"uppercase",marginBottom:7 }}>Password</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",opacity:.6 }}>🔒</span>
                  <input className="login-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==="signup"?"Create a strong password":"Enter your password"} />
                </div>
                {mode === "signup" && password && (
                  <>
                    <div style={{ display:"flex",gap:4,marginTop:7 }}>
                      {[1,2,3,4].map(i=>(
                        <div key={i} style={{ flex:1,height:3,borderRadius:4,background:i<=strength.score?strength.color:"rgba(255,255,255,.15)",transition:"background .3s" }} />
                      ))}
                    </div>
                    <div style={{ fontSize:11,color:strength.color,marginTop:4 }}>{strength.label}</div>
                  </>
                )}
              </div>

              {mode === "signup" && (
                <div>
                  <label style={{ display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".07em",textTransform:"uppercase",marginBottom:7 }}>Confirm Password</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",opacity:.6 }}>✅</span>
                    <input className="login-input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat your password" />
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <label style={{ display:"flex",alignItems:"center",gap:8,fontSize:12.5,color:"rgba(255,255,255,.7)",cursor:"pointer" }}>
                    <input type="checkbox" style={{ accentColor:"#f0c8f8" }} /> Remember me
                  </label>
                  <a href="#" style={{ fontSize:12.5,color:"#f0c8f8",textDecoration:"none" }}>Forgot password?</a>
                </div>
              )}

              {error && (
                <div style={{ background:"rgba(255,100,100,.2)",border:"1px solid rgba(255,100,100,.4)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#ffb3b3" }}>
                  ⚠️ {error}
                </div>
              )}

              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "⏳ Please wait..." : mode === "login" ? "Sign In to Dashboard →" : "Create Account →"}
              </button>
            </form>

            <div style={{ display:"flex",alignItems:"center",gap:12,fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".1em" }}>
              <div style={{ flex:1,height:1,background:"rgba(255,255,255,.15)" }} />or<div style={{ flex:1,height:1,background:"rgba(255,255,255,.15)" }} />
            </div>

            <button
  className="google-btn"
  onClick={() => {
window.location.href = "http://localhost:8000/auth/login";
  }}
>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === "login" ? "Continue with Google" : "Sign up with Google"}
            </button>

            <p style={{ textAlign:"center",fontSize:12.5,color:"rgba(255,255,255,.65)" }}>
              {mode === "login" ? "New to AI Attention OS? " : "Already have an account? "}
              <span onClick={switchMode} style={{ color:"#f0c8f8",fontWeight:700,cursor:"pointer",textDecoration:"underline" }}>
                {mode === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}