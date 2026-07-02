import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.main}>
      <h1>MINESWEEPER</h1>

      <div className={styles.resume}>
        <a href="https://ludovic-manet.netlify.app">
          by <span className={styles.link}>Lidobix</span>
        </a>

        <a
          href="https://github.com/Lidobix/minesweeper"
          className={`${styles.githubIcon} ${styles.icon}`}
        />
        <a
          href="https://www.linkedin.com/in/ludovic-manet/?skipRedirect=true"
          className={`${styles.linkedinIcon} ${styles.icon}`}
        />
      </div>
    </header>
  );
};

export default Header;
