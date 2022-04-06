import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

type Country = {
  name: string;
  count: number;
};

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
