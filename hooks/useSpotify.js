import { useSession, signIn } from "next-auth/react";
import spotifyApi from "../lib/spotify";
import { useEffect } from "react";
const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh accessToken attempt fails, direct to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.setAccessToken);
    }
  }, [session]);
  return spotifyApi;
};

export default useSpotify;
