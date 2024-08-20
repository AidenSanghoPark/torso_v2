"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
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
  grid-template-columns: repeat(3, 1fr);
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
    title: "Have you applied any hair products?",
    backButton: "Back",
    options: {
      아니요: "No",
      에센스만: "Only Essence",
      기타: "Other",
    },
  },
  ko: {
    title: "머리에 제품을 바르셨나요?",
    backButton: "이전",
    options: {
      아니요: "아니요",
      에센스만: "에센스만",
      기타: "기타",
    },
  },
};

const productOptions = ["아니요", "에센스만", "기타"];

export default function ProductSelect({ onNext, onPrev, onReset, locale = "ko", theme }) {
  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { state, dispatch } = useReservation();
  const t = translations[locale] || translations.ko; // fallback to Korean if locale is not found

  // const handleSelect = (option) => {
  //   setSelectedOption(option);
  //   dispatch({ type: "SET_PRODUCT", payload: option });
  //   onNext();
  // };

  // 비동기방법
  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch({ type: "SET_PRODUCT", payload: option });

    if (option === "기타") {
      dispatch({ type: "SET_STYLING", payload: " " });

      // 먼저 모달 열기
      setIsModalOpenLocal(true);

      // 알림톡 비동기적으로 전송
      sendAlertTalk({
        ...state,
        product: option,
        styling: " ",
      })
        .then((result) => {
          console.log("Alert talk sent:", result);
        })
        .catch((error) => {
          console.error("Failed to send alert talk:", error);
        });
    } else {
      onNext();
    }
  };

  useEffect(() => {
    let timer;
    if (isModalOpenLocal) {
      timer = setTimeout(() => {
        setIsModalOpenLocal(false);
        if (onReset) onReset();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isModalOpenLocal, onReset]);

  const handleCloseModal = () => {
    setIsModalOpenLocal(false);
    if (onReset) onReset();
  };

  return (
    <Container>
      <Title>{t.title}</Title>
      <OptionsGrid>
        {productOptions.map((option) => (
          <OptionButton key={option} onClick={() => handleSelect(option)}>
            {t.options[option]}
          </OptionButton>
        ))}
      </OptionsGrid>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
      <CompletionModal isOpen={isModalOpenLocal} onRequestClose={handleCloseModal} theme={theme} locale={locale} />
    </Container>
  );
}
