
import React, { useState } from "react";
import "./SettingsPage.css";
import ConfidentialitySettings from "./settings/ConfidentialitySettings";
import UpgradePlan from "./settings/UpgradePlan";

const SettingsPage = () => {
  const [selectedOption, setSelectedOption] = useState("confidentiality");

  return (
    <div className="settings-wrapper">
      <aside className="settings-menu">
        <ul>
          <li onClick={() => setSelectedOption("confidentiality")} className={selectedOption === "confidentiality" ? "active" : ""}>
            Confidentialité
          </li>
          <li onClick={() => setSelectedOption("upgrade")} className={selectedOption === "upgrade" ? "active" : ""}>
            Passer au plan supérieur
          </li>
        </ul>
      </aside>

      <section className="settings-content">
        {selectedOption === "confidentiality" && <ConfidentialitySettings />}
        {selectedOption === "upgrade" && <UpgradePlan />}
      </section>
    </div>
  );
};

export default SettingsPage;
