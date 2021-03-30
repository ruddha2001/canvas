import Head from 'next/head';
import SignInButton from '../components/Sign In/SignInButton';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Canvas | Free Mood Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/canvas.png" className="w-24" />
        <h1 className={styles.title}>
          Welcome to <a href="https://canvas.aniruddha.net">Canvas!</a>
        </h1>

        <p className={styles.description}>
          <br />
          <SignInButton />
        </p>

        <div className={styles.grid}>
          <span className={styles.card}>
            <h3>Record You Mood 📝</h3>
            <p>Track how you are feeling throughout the day.</p>
          </span>

          <span className={styles.card}>
            <h3>Generate Reports 📋</h3>
            <p>Generate beautiful reports to know how you have been.</p>
          </span>

          <span className={styles.card}>
            <h3>Get Calming Suggestions 😌</h3>
            <p>Review our set of calming videos and music.</p>
          </span>

          <span className={styles.card}>
            <h3>Free Forever 🛡️</h3>
            <p>Private, safe and free forever without any ads.</p>
          </span>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Crafted with ❤️ by Team Puzzles</span>
      </footer>
    </div>
  );
}
