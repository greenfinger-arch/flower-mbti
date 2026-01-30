import { plants } from '../data/plants';

export const calculateResult = (userAnswers) => {
  // 1. 점수 저장 객체 (EI, SN, TF, JP)
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  // 2. userAnswers 배열을 돌며 점수 합산
  // userAnswers는 [{type: 'EI', value: 2}, {type: 'SN', value: -2}, ...] 형태입니다.
  userAnswers.forEach((answer) => {
    if (scores.hasOwnProperty(answer.type)) {
      scores[answer.type] += answer.value;
    }
  });

  // 3. 점수에 따라 MBTI 알파벳 결정
  const mbti = 
    (scores.EI > 0 ? "E" : "I") +
    (scores.SN > 0 ? "S" : "N") +
    (scores.TF > 0 ? "T" : "F") +
    (scores.JP > 0 ? "J" : "P");

  // 4. plants.js 데이터에서 해당 MBTI를 가진 식물들만 필터링
  const candidatePlants = plants.filter(p => p.mbti === mbti);

  // 5. 후보 중 하나를 반환 (식물 객체 전체를 반환)
  // 후보가 여러 명일 경우 첫 번째 식물을 기본값으로 선택합니다.
  return candidatePlants.length > 0 ? candidatePlants[0] : plants[0];
};