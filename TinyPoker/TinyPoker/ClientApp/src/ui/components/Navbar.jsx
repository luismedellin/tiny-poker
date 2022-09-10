import { Link, NavLink } from 'react-router-dom';
import { useUserStore } from '../../hooks';

const navMenu = [
    {
        to:  '/',
        name:'Inicio'
    },
    {
        to:  '/rooms',
        name:'Salas'
    }
];

export const Navbar = () => {

  const { user } = useUserStore();

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
                    {
                        navMenu.map(({to, name}) => (
                            <li key={to}
                                className="nav-item">
                                <NavLink 
                                    className={ isActive }
                                    to={to}>
                                    {name}
                                </NavLink>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </nav>
      </header>
  )
}
