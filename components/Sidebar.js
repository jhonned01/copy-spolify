import {
  HomeIcon,
  SearchIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
  LibraryIcon,
} from "@heroicons/react/outline";

import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistsId, setPlaylistsId] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log("playlists:", playlists);
  return (
    <div className=" text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white "
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900 " />
        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900 " />
      </div>

      {/* PlayLists... */}
      <h2 className="text-center py-3">PlayList</h2>

      {playlists?.map((playlist) => (
        <p
          key={playlist.id}
          className="cursor-pointer hover:text-white"
          onClick={() => setPlaylistsId(playlist.id)}
        >
          {playlist.name}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
