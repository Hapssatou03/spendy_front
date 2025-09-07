import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import CookieBanner from "./components/CookieBanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRouter />
      {showBanner && <CookieBanner onSave={() => setShowBanner(false)} />}
    </>
  );
}

export default App;
