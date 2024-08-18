"use client";

import { useState } from "react";
import styled from "styled-components";
import { useReservation } from "../../context/ReservationContext";

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
`;

const StyleButton = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 1rem 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #333;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #666;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 2rem;
`;
const translations = {
  en: {
    title: "What service did you book?",
    backButton: "Back",
    styles: {
      컷: "Cut",
      다운펌: "Down Perm",
      펌: "Perm",
      열펌: "Heat Perm",
      컬러: "Color",
      스타일링: "Styling",
    },
  },
  ko: {
    title: "어떤 시술로 예약하셨나요?",
    backButton: "이전",
    styles: {
      컷: "컷",
      다운펌: "다운펌",
      펌: "펌",
      열펌: "열펌",
      컬러: "컬러",
      스타일링: "스타일링",
    },
  },
};
const styles = ["컷", "다운펌", "펌", "열펌", "컬러", "스타일링"];

export default function StyleSelect({ onNext, onPrev, locale = "ko" }) {
  const { dispatch } = useReservation();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const t = translations[locale] || translations.ko;

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    dispatch({ type: "SET_STYLE", payload: style });
    onNext();
  };

  return (
    <>
      <Title>{t.title}</Title>
      <StyleGrid>
        {styles.map((style) => (
          <StyleButton key={style} onClick={() => handleStyleSelect(style)}>
            {t.styles[style]}
          </StyleButton>
        ))}
      </StyleGrid>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
    </>
  );
}
