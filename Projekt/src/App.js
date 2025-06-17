import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CarouselPage from "./pages/CarouselPage";
import FavoritePage from "./pages/FavoritesPage";
import AllSongsPage from "./pages/AllSongsPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";
import FishIntro from "./FishIntro";

import { LanguageProvider } from "./pages/LanguageContext";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Pa Pa Ya !!",
      artist: "Babymetal",
      genre: "Metal / J-Pop",
      file: "track/track1.mp3",
      image: "covers/img1.jpg",
      liked: false,
    },
    {
      id: 2,
      title: "Bad Guy",
      artist: "Billie Eilish",
      genre: "Alternative Pop",
      file: "track/track2.mp3",
      image: "covers/img2.jpg",
      liked: false,
    },
    {
      id: 3,
      title: "No Woman No Cry",
      artist: "Bob Marley",
      genre: "Reggae",
      file: "track/track3.mp3",
      image: "covers/img3.jpg",
      liked: false,
    },
    {
      id: 4,
      title: "Summer",
      artist: "Calvin Harris",
      genre: "Electronic / EDM",
      file: "track/track4.mp3",
      image: "covers/img4.jpg",
      liked: false,
    },
    {
      id: 5,
      title: "New Rules",
      artist: "Dua Lipa",
      genre: "Pop",
      file: "track/track5.mp3",
      image: "covers/img5.jpg",
      liked: false,
    },
    {
      id: 6,
      title: "Shape Of You",
      artist: "Ed Sheeran",
      genre: "Pop",
      file: "track/track6.mp3",
      image: "covers/img6.jpg",
      liked: false,
    },
    {
      id: 7,
      title: "Empire State Of Mind",
      artist: "Jay-Z",
      genre: "Hip-Hop",
      file: "track/track7.mp3",
      image: "covers/img7.jpg",
      liked: false,
    },
    {
      id: 8,
      title: "Old Town Road",
      artist: "Lil Nas X",
      genre: "Country Rap",
      file: "track/track8.mp3",
      image: "covers/img8.jpg",
      liked: false,
    },
    {
      id: 9,
      title: "Rockstar",
      artist: "Post Malone",
      genre: "Hip-Hop",
      file: "track/track9.mp3",
      image: "covers/img9.jpg",
      liked: false,
    },
    {
      id: 10,
      title: "Naucz Mnie",
      artist: "Sarsa",
      genre: "Pop",
      file: "track/track10.mp3",
      image: "covers/img10.jpg",
      liked: false,
    },
    {
      id: 11,
      title: "Blinding Lights",
      artist: "The Weeknd",
      genre: "Synthwave / Pop",
      file: "track/track11.mp3",
      image: "covers/img11.jpg",
      liked: false,
    },
    {
      id: 12,
      title: "Cha Cha Cha",
      artist: "Turbo",
      genre: "Rock / Metal",
      file: "track/track12.mp3",
      image: "covers/img12.jpg",
      liked: false,
    },
    {
      id: 13,
      title: "I Don't Wanna Be Me",
      artist: "Type O Negative",
      genre: "Gothic Metal",
      file: "track/track13.mp3",
      image: "covers/img13.jpg",
      liked: false,
    },
    {
      id: 14,
      title: "Ginseng Strip 2002",
      artist: "Yung Lean",
      genre: "Cloud Rap",
      file: "track/track14.mp3",
      image: "covers/img14.jpg",
      liked: false,
    },
    {
      id: 15,
      title: "Shine",
      artist: "Yung Lean",
      genre: "Cloud Rap",
      file: "track/track15.mp3",
      image: "covers/img15.jpg",
      liked: false,
    },
    {
      id: 16,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      genre: "Grunge / Rock",
      file: "track/track16.mp3",
      image: "covers/img16.jpg",
      liked: false,
    },
    {
      id: 17,
      title: "One More Time",
      artist: "Daft Punk",
      genre: "Electronic / House",
      file: "track/track17.mp3",
      image: "covers/img17.jpg",
      liked: false,
    },
    {
      id: 18,
      title: "Do I Wanna Know? (Live)",
      artist: "Arctic Monkeys",
      genre: "Indie Rock",
      file: "track/track18.mp3",
      image: "covers/img18.jpg",
      liked: false,
    },
    {
      id: 19,
      title: "Chandelier",
      artist: "Sia",
      genre: "Pop",
      file: "track/track19.mp3",
      image: "covers/img19.jpg",
      liked: false,
    },
    {
      id: 20,
      title: "Get Lucky (Feat. Pharrell Williams)",
      artist: "Daft Punk",
      genre: "Funk / Disco",
      file: "track/track20.mp3",
      image: "covers/img20.jpg",
      liked: false,
    },
    {
      id: 21,
      title: "Till I Collapse (Feat. Nate Dogg)",
      artist: "Eminem",
      genre: "Hip-Hop",
      file: "track/track21.mp3",
      image: "covers/img21.jpg",
      liked: false,
    },
    {
      id: 22,
      title: "Bad Romance",
      artist: "Lady Gaga",
      genre: "Pop",
      file: "track/track22.mp3",
      image: "covers/img22.jpg",
      liked: false,
    },
    {
      id: 23,
      title: "Hope",
      artist: "XXXTentacion",
      genre: "Hip-Hop",
      file: "track/track23.mp3",
      image: "covers/img23.jpg",
      liked: false,
    },
    {
      id: 24,
      title: "Stressed Out",
      artist: "Twenty One Pilots",
      genre: "Alternative",
      file: "track/track24.mp3",
      image: "covers/img24.jpg",
      liked: false,
    },
    {
      id: 25,
      title: "Pacify Her",
      artist: "Melanie Martinez",
      genre: "Alternative Pop",
      file: "track/track25.mp3",
      image: "covers/img25.jpg",
      liked: false,
    },
  ]);

  const toggleLike = (id, liked) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, liked } : song
      )
    );
  };

  const incrementPlayCount = (id) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id
          ? { ...song, playCount: (song.playCount || 0) + 1 }
          : song
      )
    );
  };

  if (showIntro) {
    return <FishIntro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <CarouselPage
                songs={songs}
                toggleLike={toggleLike}
                incrementPlayCount={incrementPlayCount}
              />
            }
          />
          <Route path="/favorites" element={<FavoritePage songs={songs} />} />
          <Route
            path="/all-songs"
            element={<AllSongsPage songs={songs} toggleLike={toggleLike} />}
          />
          <Route path="/stats" element={<StatsPage songs={songs} />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
