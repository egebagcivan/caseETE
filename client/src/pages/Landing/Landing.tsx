// css
import styles from './Landing.module.css'
import { UserType } from '../../App'

interface LandingProps {
  user: UserType | null; // Assuming user can be null or UserType
}

const Landing = ({ user }: LandingProps) => {
  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
    </main>
  );
};

export default Landing
