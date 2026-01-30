import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Question from './pages/Question';
import Result from './pages/Result';

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 💡 [추가] 볼륨 설정: 컴포넌트가 로드될 때 실행됩니다.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // 0.0 ~ 1.0 사이 (0.3은 30% 음량)
    }
  }, []);

  const handleFirstClick = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("재생 실패:", error);
        });
    }
  };

  return (
    <div className="app-wrapper" onClick={handleFirstClick} style={{ minHeight: '100vh' }}>
      
      <audio ref={audioRef} loop>
        <source src="/sounds/nature.mp3" type="audio/mpeg" />
      </audio>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;