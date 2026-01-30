import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'; // 스타일을 위한 CSS 파일 (곧 만들 예정)

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <header className="main-header">

        <p className="sub-title">나의 성향으로 찾아보는</p>
        <h1 className="main-title">반려 식물 MBTI 테스트</h1>
      </header>

      <div className="main-image-wrapper">
        {/* 메인 비주얼 이미지가 있다면 여기에 넣으세요 */}
        <img src="/images/main-plant.jpg" alt="Beautiful Plants" className="main-img" />
      </div>

      <div className="main-info">
        <p>나는 어떤 식물과 닮았을까?</p>
        <p>나의 라이프스타일에 딱 맞는 제품까지 추천해 드려요.</p>
      </div>

      <button className="start-button" onClick={() => navigate('/question')}>
        테스트 시작하기
      </button>

      <footer className="main-footer">
        © 2026 Flower MBTI Test. All rights reserved.
      </footer>
    </div>
  );
};

export default Main;