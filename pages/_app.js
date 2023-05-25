import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return( 
    <div>
    <header>
      <p> dit is mijn header</p>
    </header>
      <Component {...pageProps} />{" "}
      <footer>
          <p> dit is mijn footer 2023 Niels Perdon</p>
      </footer>
    </div>
  );
}

export default MyApp;
