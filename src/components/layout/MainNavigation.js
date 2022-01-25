import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>logo</Link></div>
      <nav>
        <ul>
          <li>
            <Link to='/catalogue'>Link 1</Link>
          </li>
          <li>
            <Link to='/contribute'>Link 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
