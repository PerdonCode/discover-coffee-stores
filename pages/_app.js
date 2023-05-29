import "../styles/globals.css";
// default export dont need {}
import StoreProvider from "../store/store-context";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
