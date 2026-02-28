// frontend/src/components/OverloadAlert.jsx
function OverloadAlert({ workloadLevel }) {
  if (!workloadLevel) return null;

  const config = {
    Overloaded: {
      icon: "🚨",
      title: "Cognitive Overload Detected!",
      message: "You have too many high-priority tasks. Consider rescheduling some or taking a break.",
      bg: "rgba(255, 80, 80, 0.15)",
      border: "rgba(255, 80, 80, 0.35)",
      color: "#ff6b6b",
    },
    "Cognitive Load": {
      icon: "⚠️",
      title: "High Cognitive Load",
      message: "Multiple important tasks today. Tackle them one at a time and remember to take breaks.",
      bg: "rgba(255, 200, 60, 0.15)",
      border: "rgba(255, 200, 60, 0.35)",
      color: "#ffd93d",
    },
    Stable: {
      icon: "✅",
      title: "You're in the zone!",
      message: "Your workload looks manageable today. Stay focused and you'll crush it!",
      bg: "rgba(100, 200, 120, 0.15)",
      border: "rgba(100, 200, 120, 0.35)",
      color: "#6bcb77",
    },
  };

  const cfg = config[workloadLevel] || config["Cognitive Load"];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 14,
      padding: "16px 20px",
      marginBottom: 28,
      backdropFilter: "blur(10px)",
    }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>{cfg.icon}</span>
      <div>
        <div style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: cfg.color,
          marginBottom: 3,
        }}>
          {cfg.title}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
          {cfg.message}
        </div>
      </div>
    </div>
  );
}

export default OverloadAlert;


// // frontend/src/components/OverloadAlert.jsx
// function OverloadAlert({ workloadLevel }) {
//   if (!workloadLevel) return null;

//   const config = {
//     Overloaded: {
//       icon: "🚨",
//       title: "Cognitive Overload Detected!",
//       message: "You have too many high-priority tasks. Consider rescheduling some or taking a break.",
//       gradient: "linear-gradient(135deg, rgba(255,80,80,0.18), rgba(220,50,50,0.08))",
//       border: "rgba(255, 100, 100, 0.35)",
//       glow: "rgba(255, 80, 80, 0.2)",
//       titleColor: "#ff7b7b",
//       pill: { bg: "rgba(255,80,80,0.2)", color: "#ff6b6b", label: "CRITICAL" },
//     },
//     "Cognitive Load": {
//       icon: "⚠️",
//       title: "High Cognitive Load",
//       message: "Multiple important tasks today. Tackle them one at a time and remember to take breaks.",
//       gradient: "linear-gradient(135deg, rgba(255,200,60,0.18), rgba(200,150,30,0.08))",
//       border: "rgba(255, 200, 60, 0.35)",
//       glow: "rgba(255, 200, 60, 0.2)",
//       titleColor: "#ffd93d",
//       pill: { bg: "rgba(255,200,60,0.2)", color: "#ffd93d", label: "WARNING" },
//     },
//     Stable: {
//       icon: "✅",
//       title: "You're in the zone!",
//       message: "Your workload looks manageable today. Stay focused and you'll crush it!",
//       gradient: "linear-gradient(135deg, rgba(100,200,120,0.18), rgba(60,160,80,0.08))",
//       border: "rgba(100, 200, 120, 0.35)",
//       glow: "rgba(100, 200, 120, 0.2)",
//       titleColor: "#6bcb77",
//       pill: { bg: "rgba(100,200,120,0.2)", color: "#6bcb77", label: "GOOD" },
//     },
//   };

//   const cfg = config[workloadLevel] || config["Cognitive Load"];

//   return (
//     <>
//       <style>{`
//         @keyframes alertSlideIn {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .overload-alert {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           background: ${cfg.gradient};
//           border: 1px solid ${cfg.border};
//           border-radius: 16px;
//           padding: 18px 22px;
//           margin-bottom: 28px;
//           backdrop-filter: blur(12px);
//           box-shadow: 0 0 20px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.08);
//           animation: alertSlideIn 0.4s ease;
//           position: relative;
//           overflow: hidden;
//         }
//         .overload-alert::before {
//           content: '';
//           position: absolute;
//           left: 0; top: 0; bottom: 0;
//           width: 3px;
//           background: ${cfg.titleColor};
//           border-radius: 3px 0 0 3px;
//         }
//         .alert-icon-wrap {
//           width: 44px;
//           height: 44px;
//           border-radius: 12px;
//           background: rgba(255,255,255,0.08);
//           border: 1px solid ${cfg.border};
//           display: grid;
//           place-items: center;
//           font-size: 20px;
//           flex-shrink: 0;
//         }
//         .alert-title-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 4px;
//         }
//         .alert-title {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 14px;
//           font-weight: 700;
//           color: ${cfg.titleColor};
//         }
//         .alert-pill {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 10px;
//           font-weight: 800;
//           padding: 2px 8px;
//           border-radius: 20px;
//           background: ${cfg.pill.bg};
//           color: ${cfg.pill.color};
//           letter-spacing: 0.08em;
//           border: 1px solid ${cfg.border};
//         }
//         .alert-message {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 13px;
//           color: rgba(255,255,255,0.6);
//           line-height: 1.55;
//         }
//       `}</style>

//       <div className="overload-alert">
//         <div className="alert-icon-wrap">{cfg.icon}</div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div className="alert-title-row">
//             <span className="alert-title">{cfg.title}</span>
//             <span className="alert-pill">{cfg.pill.label}</span>
//           </div>
//           <div className="alert-message">{cfg.message}</div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OverloadAlert;

// // function OverloadAlert() {
// //   return (
// //     <div
// //       style={{
// //         background: "#ffdddd",
// //         padding: "15px",
// //         marginBottom: "20px",
// //       }}
// //     >
// //       ⚠ You have multiple high priority tasks today!
// //     </div>
// //   );
// // }

// // export default OverloadAlert;