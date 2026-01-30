import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import './Question.css';

const Question = () => {
  const [currentNo, setCurrentNo] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  // 1. 이미지 미리 불러오기 (지연 현상 방지)
  useEffect(() => {
    questions.forEach((q, index) => {
      const img = new Image();
      img.src = `/images/q${index + 1}.jpg`;
    });
  }, []);

  const handleAnswer = (type, value) => {
    const newAnswers = [...answers, { type, value }];
    
    if (currentNo + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrentNo(currentNo + 1);
    } else {
      // 결과 페이지로 데이터 전달
      navigate('/result', { state: { answers: newAnswers } });
    }
  };

  const currentQuestion = questions[currentNo];
  const progress = ((currentNo + 1) / questions.length) * 100;

  return (
    <div className="question-container">
      {/* 상단 진행 바 */}
      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* key={currentNo} 덕분에 질문이 바뀔 때마다 fade-in 애니메이션이 실행됩니다 */}
      <div className="question-content fade-in" key={currentNo}>
        <span className="question-number">질문 {currentNo + 1}</span>
        <h2 className="question-text">{currentQuestion.q}</h2>
        
        <div className="question-image">
           <img 
             src={`/images/q${currentNo + 1}.jpg`} 
             alt="question" 
             loading="eager" 
           />
        </div>

        <div className="answer-group">
          <button className="answer-btn" onClick={() => handleAnswer(currentQuestion.type, currentQuestion.v1)}>
            {currentQuestion.a1}
          </button>
          <button className="answer-btn" onClick={() => handleAnswer(currentQuestion.type, currentQuestion.v2)}>
            {currentQuestion.a2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;