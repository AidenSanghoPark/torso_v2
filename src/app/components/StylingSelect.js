"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useReservation } from "../../context/ReservationContext";
import { sendAlertTalk } from "../../../utils/sendAlertTalk";
import CompletionModal from "./CompletionModal";

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

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptionButton = styled.button`
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  padding: 0.8rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
    title: "Did you style your hair?",
    backButton: "Back",
    options: {
      말리기만: "Only dried",
      "핸드 드라이": "Hand-dried",
      롤: "Roller",
      고데기: "Hair iron",
    },
  },
  ko: {
    title: "스타일링을 하셨나요?",
    backButton: "이전",
    options: {
      말리기만: "말리기만",
      "핸드 드라이": "핸드 드라이",
      롤: "롤",
      고데기: "고데기",
    },
  },
};

const stylingOptions = ["말리기만", "핸드 드라이", "롤", "고데기"];

export default function StylingSelect({ onNext, onPrev, onReset, setStep, locale = "ko", theme }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const { state, dispatch } = useReservation();
  const t = translations[locale] || translations.ko;

  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch({ type: "SET_STYLING", payload: option });

    // 즉시 모달 표시
    setIsModalOpenLocal(true);

    // 5초 후 모달 닫기 및 리셋
    setTimeout(() => {
      setIsModalOpenLocal(false);
      onReset();
    }, 5000);

    // 비동기적으로 알림톡 전송
    sendAlertTalk({ ...state, styling: option })
      .then((result) => {
        console.log("Alert talk sent:", result);
      })
      .catch((error) => {
        console.error("Failed to send alert talk:", error);
      });
  };

  return (
    <Container>
      <Title>{t.title}</Title>
      <OptionsGrid>
        {stylingOptions.map((option) => (
          <OptionButton key={option} onClick={() => handleSelect(option)}>
            {t.options[option]}
          </OptionButton>
        ))}
      </OptionsGrid>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
      <CompletionModal
        isOpen={isModalOpenLocal}
        onRequestClose={() => {
          setIsModalOpenLocal(false);
          onReset();
        }}
        theme={theme}
        locale={locale}
      />
    </Container>
  );
}
