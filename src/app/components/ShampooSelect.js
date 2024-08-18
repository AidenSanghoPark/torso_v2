"use client";

import { useState } from "react";
import styled from "styled-components";
import { useReservation } from "../../context/ReservationContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
`;

const OptionButton = styled.button`
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  padding: 1rem 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
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
    title: "When did you last shampoo?",
    backButton: "Back",
    options: {
      "어제 밤": "Last night",
      아침: "This morning",
      "방문 전": "Before visit",
      모자착용: "Wearing a hat",
    },
  },
  ko: {
    title: "샴푸는 언제하셨나요?",
    backButton: "이전",
    options: {
      "어제 밤": "어제 밤",
      아침: "아침",
      "방문 전": "방문 전",
      모자착용: "모자착용",
    },
  },
};

const shampooOptions = ["어제 밤", "아침", "방문 전", "모자착용"];

export default function ShampooSelect({ onNext, onPrev, locale = "ko" }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { dispatch } = useReservation();
  const t = translations[locale] || translations.ko;

  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch({ type: "SET_SHAMPOO", payload: option });
    onNext();
  };

  return (
    <Container>
      <Title>{t.title}</Title>
      <OptionsGrid>
        {shampooOptions.map((option) => (
          <OptionButton key={option} onClick={() => handleSelect(option)}>
            {t.options[option]}
          </OptionButton>
        ))}
      </OptionsGrid>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
    </Container>
  );
}
