import styles from './Header.module.css';

import todoLogo from '../../assets/todo-logo.png';

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.todoLogo} src={todoLogo} alt="Todo Logo" />
      </header>
    </>
  );
}
