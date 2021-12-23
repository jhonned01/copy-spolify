import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
      </Head>

      <main className="flex">
        <Sidebar />
        {/* center */}
        <Center />
      </main>
      <div>{/* player */}</div>
    </div>
  );
}
