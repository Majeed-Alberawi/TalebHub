import { Link } from "react-router-dom";

import Logo from "../../Logo";

export default function Header() {
  return (
    <header className="main-header">
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/">Q&A</Link>
        </li>
      </ul>
      <Link to="/registration">
        <button className="primary-button">SignUp</button>
      </Link>
    </header>
  );
}
