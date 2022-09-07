import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {

  const isActive = ({isActive})=> {
      return `nav-link ${isActive ? 'active' : ''}`;
  }

  return (
    <header className="header-home">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarTogglerUltraVotes" 
                        aria-controls="navbarTogglerUltraVotes" 
                        ria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    Tiny Pocker
                </Link>

                <div className="collapse navbar-collapse" id="navbarTogglerUltraVotes">
                    
                    <ul className="navbar-nav col-6">
                        <li className="nav-item dropdown">
                          <NavLink 
                              className={ isActive }
                              to="/"
                          >
                              Inicio
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink 
                              className={ isActive }
                              to="/rooms"
                          >
                              Salas
                          </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </header>
  )
}
