import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/profile", disabled: true },
  { label: "Settings", to: "/settings", disabled: true },
];

function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-gray-400 bg-white px-6 py-5">
      <Link to="/" className="text-2xl font-semibold text-black">
        Followers Tracker
      </Link>

      <nav className="flex items-center">
        <ul className="flex list-none gap-6 text-lg text-black">
          {navItems.map((item) =>
            item.disabled ? (
              <li
                key={item.label}
                className="cursor-not-allowed text-gray-500"
                title="Not implemented"
              >
                {item.label}
              </li>
            ) : (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "transition-colors duration-150",
                      isActive ? "text-gray-600" : "hover:text-gray-500",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
