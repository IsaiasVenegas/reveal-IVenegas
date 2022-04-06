import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/types";
import { useState } from "react";

/**
 * App component
 * Share "activeCountry" state between Sidebar and Table
 * @returns
 */
function App() {
  const [activeCountry, setActiveCountry] = useState<Country>({
    name: "",
    count: 0,
  });

  return (
    <div className="App">
      <Sidebar
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
      />
      <Table activeCountry={activeCountry} />
    </div>
  );
}

export default App;
