// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Room from "./pages/Room";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/room/:roomId" element={<Room />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Pomodoro from "./pages/Pomodoro";
import Room from "./pages/Room";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("auth") === "success") {
    setIsLoggedIn(true);
    window.history.replaceState({}, document.title, "/");
  }
}, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;