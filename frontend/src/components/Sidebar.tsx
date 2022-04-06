import "./Sidebar.css";
import { SidebarProps } from "./types";
import { useCountries } from "./hooks";

export const Sidebar = (props: SidebarProps) => {
  const countries = useCountries(props.activeCountry, props.setActiveCountry);

  return (
    <div id="sidebar">
      <h2>Cities App</h2>
      {countries}
    </div>
  );
};
