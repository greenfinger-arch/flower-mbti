import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateResult } from '../utils/calculate';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Question 페이지에서 전달받은 답변 데이터
  const userAnswers = location.state?.answers;

  // 💡 카카오 초기화 로직
  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('6255a098c7e824181f8efea7eb920397'); // 전달받은 키 입력 완료
      }
    }
  }, []);

  // 💡 카카오 공유 함수
  const shareKakao = (result) => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 반려 식물 결과: ${result.name}`,
        description: `당신과 찰떡궁합인 식물은 ${result.mbti} 타입의 ${result.name}입니다!`,
        imageUrl: `https://flower-mbti.pages.dev${result.img}`, // 배포된 절대 경로
        link: {
          mobileWebUrl: 'https://flower-mbti.pages.dev',
          webUrl: 'https://flower-mbti.pages.dev',
        },
      },
      buttons: [
        {
          title: '나도 테스트 하러 가기',
          link: {
            mobileWebUrl: 'https://flower-mbti.pages.dev',
            webUrl: 'https://flower-mbti.pages.dev',
          },
        },
      ],
    });
  };

  // 만약 직접 주소창에 /result를 치고 들어온 경우 메인으로 보냄
  if (!userAnswers) {
    return (
      <div className="result-container">
        <p>잘못된 접근입니다.</p>
        <button className="retry-btn" onClick={() => navigate('/')}>메인으로 돌아가기</button>
      </div>
    );
  }

  // 계산기 함수 호출
  const resultPlant = calculateResult(userAnswers);

  return (
    <div className="result-container">
      <span className="result-top-text">나와 찰떡궁합인 식물은?</span>
      <h1 className="plant-name">{resultPlant.name}</h1>
      <p className="plant-mbti">{resultPlant.mbti}</p>

      <div className="result-image-wrapper">
        <img src={resultPlant.img} alt={resultPlant.name} className="result-img" />
      </div>

      <div className="result-desc">
        <p>{resultPlant.desc}</p>
      </div>

      {/* 💡 카카오 공유 버튼 추가 위치 */}
      <div className="share-section">
        <button className="kakao-share-btn" onClick={() => shareKakao(resultPlant)}>
          🗨️ 카카오톡으로 결과 공유하기
        </button>

        {/* 3. [추가] 링크 복사 버튼: 카카오 버튼 바로 아래 혹은 옆에 배치 */}
        <button className="link-copy-btn" onClick={copyLink}>
          🔗 링크 복사하기
        </button>
        
      </div>

      <div className="product-section">
        <h3>🌱 추천 가드닝 아이템</h3>
        <div className="product-card">
          <img src={resultPlant.product.img} alt="추천 제품" className="product-img" />
          <div className="product-info">
            <p className="product-name">{resultPlant.product.name}</p>
            <button className="buy-link" onClick={() => window.open(resultPlant.product.link, '_blank')}>
              제품 상세 보기
            </button>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <p>※ 본 추천 서비스에서 제공하는 제품 정보 및 구매 링크는 파트너십의 일환으로 제공될 수 있으며, 실제 제품의 효능이나 품질을 보증하지 않습니다. 구매 결정은 본인의 판단 하에 신중히 진행하시기 바랍니다.</p>
      </div>

      <button className="retry-btn" onClick={() => navigate('/')}>
        테스트 다시 하기
      </button>
    </div>
  );
};

export default Result;