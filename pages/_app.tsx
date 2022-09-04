// pages/_app.js
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "../utils/wagmi";

import useGlobalState from "../store";
import { fetchAuthenticatedUser } from "../utils/github";
import "../styles/globals.css";
import "../styles/piechart.css";

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const accessToken = useGlobalState((state) => state.accessToken);
  const user = useGlobalState((state) => state.user);
  const setAccessToken = useGlobalState((state) => state.setAccessToken);
  const setUser = useGlobalState((state) => state.setUser);
  useEffect(() => {
    console.log("> Fetch accessToken");
    const matchedData = document.cookie.match(/(?<=access_token=)\w*/g);
    if (!matchedData) {
      setAccessToken(null);
    } else {
      setAccessToken(matchedData[0]);
    }
  }, []);
  useEffect(() => {
    console.log("> Running to fetch userINfo");
    // Fetch userinfo
    async function doo() {
      if (!accessToken) {
        console.error("No access token.", user, accessToken);
      } else {
        try {
          console.log("Working");
          const user = await fetchAuthenticatedUser(accessToken);
          setUser(user);
        } catch (e) {
          console.log("Logging out");
          // Logout the user.
          setUser(null);
          document.cookie = "";
          setAccessToken(null);
        }
      }
    }
    doo();
  }, [accessToken]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
