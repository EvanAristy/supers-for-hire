import { Link } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
// css
import "./styles.css"


const Nav = () => {

  const user = useContext(UserContext)

  return (

    <ul className="nav nav-tabs justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
      </li>
      <li className="nav-item">
            <Link className="nav-link" to="hero/list">Heros</Link>
          </li>
      {
        !user
        ?
        <div className='nav-fix'>
          
          <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
          
        </div>
        :
        <li className='nav-item'>
          <Link className='nav-link' to="villain/list">Villains</Link>
        </li>
      }
    </ul>
    
  );
};

export default Nav;
