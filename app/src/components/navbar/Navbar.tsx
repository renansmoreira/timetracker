import { useEffect, useState } from 'react';
import NavbarItem from './navbar-item/NavbarItem';
import { NavbarItemSchema } from './navbar-item/NavbarItemSchema';

export default function Navbar() {
  const initialNavbarItems: NavbarItemSchema = {};
  const [navbarItems, setNavbarItems] = useState(initialNavbarItems);

  useEffect(() => {
    async function fetchNavbar() {
      const response = await fetch('http://localhost:3100');
      const json = await response.json();
      setNavbarItems(json.links);
    }
    fetchNavbar();
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          {Object.keys(navbarItems).map((itemName: string) => (
            <NavbarItem
              key={itemName}
              to={navbarItems[itemName].href}
              name={itemName} />
          ))}
        </div>
      </div>
    </nav>
  );
}
