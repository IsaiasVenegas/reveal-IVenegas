import "./Sidebar.css";
import { SidebarProps } from "./types";
import { useCountries } from "./hooks";

/**
 * Sidebar component
 * Display a list of countries
 * When one country is clicked on,
 * App state is updated
 * @param props
 * @returns
 */
export const Sidebar = (props: SidebarProps) => {
  const countries = useCountries(props.activeCountry, props.setActiveCountry);

  return (
    <div id="sidebar">
      <h2>Cities App</h2>
      {countries}
    </div>
  );
};
