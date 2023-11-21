// npm modules
import { NavLink } from 'react-router-dom'
import { UserType } from '../../App'

interface NavBarProps {
  user: UserType | null;
  handleLogout: () => void;
}

const NavBar = ({ user, handleLogout }: NavBarProps) => {
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="/companies">Companies</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
