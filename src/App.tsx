import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { LeaderboardScreen } from "./components/LeaderboardScreen";
import { getDisplaySlides } from "./services/leaderboardService";

const PAGE_DURATION_MS = 5000;

function App() {
  const slides = useMemo(() => getDisplaySlides(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];
  const previousSlide =
    slides[(activeIndex - 1 + slides.length) % slides.length];
  const isSameLeaderboard =
    slide.kind === previousSlide.kind && slide.title === previousSlide.title;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, PAGE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="app-shell">
      <LeaderboardScreen
        key={`${slide.kind}-${slide.title}`}
        slide={slide}
        transition={isSameLeaderboard ? "page-scroll" : "screen-switch"}
      />
    </main>
  );
}

export default App;
