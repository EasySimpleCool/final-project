
import {
  NavLink,
} from "react-router-dom";

function HomePage() {
  return (
    <div>
        <nav className="main-nav">
          <NavLink to="/shop">Shop</NavLink>
        </nav>
    </div>
  );
}

export default HomePage;
