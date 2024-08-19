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

const defaultTranslations = {
  en: {
    title: "When did you last shampoo?",
    backButton: "Back",
    options: {
      모자착용: "Wearing a hat",
      "어제 밤": "Last night",
      아침: "This morning",
      "방문 전": "Before visit",
    },
  },
  ko: {
    title: "샴푸는 언제하셨나요?",
    backButton: "이전",
    options: {
      모자착용: "모자착용",
      "어제 밤": "어제 밤",
      아침: "아침",
      "방문 전": "방문 전",
    },
  },
};

const shampooOptions = ["모자착용", "어제 밤", "아침", "방문 전"];

export default function ShampooSelect({ onNext, onPrev, onReset, locale = "ko", theme }) {
  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { state, dispatch } = useReservation();

  // 선택된 locale에 맞는 번역을 가져옴
  const t = defaultTranslations[locale] || defaultTranslations.ko;

  // 동기방법
  // const handleSelect = async (option) => {
  //   setSelectedOption(option);
  //   dispatch({ type: "SET_SHAMPOO", payload: option });

  //   if (option === "모자착용") {
  //     dispatch({ type: "SET_PRODUCT", payload: " " });
  //     dispatch({ type: "SET_STYLING", payload: " " });

  //     try {
  //       // AlertTalk 호출 후 모달 열기
  //       const result = await sendAlertTalk({
  //         ...state,
  //         shampoo: option,
  //         product: "없음",
  //         styling: "없음",
  //       });
  //       console.log("Alert talk sent:", result);

  //       setIsModalOpenLocal(true);
  //       setIsModalOpen(true);
  //     } catch (error) {
  //       console.error("Failed to send alert talk:", error);
  //     }
  //   } else {
  //     onNext();
  //   }
  // };

  // 비동기방법
  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch({ type: "SET_SHAMPOO", payload: option });

    if (option === "모자착용" || option === "어제 밤") {
      dispatch({ type: "SET_PRODUCT", payload: " " });
      dispatch({ type: "SET_STYLING", payload: " " });

      // 먼저 모달 열기
      setIsModalOpenLocal(true);

      // 알림톡 비동기적으로 전송
      sendAlertTalk({
        ...state,
        shampoo: option,
        product: " ",
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
      <Title>{t.title || defaultTranslations.ko.title}</Title>
      <OptionsGrid>
        {shampooOptions.map((option) => (
          <OptionButton key={option} onClick={() => handleSelect(option)}>
            {t.options[option]}
          </OptionButton>
        ))}
      </OptionsGrid>
      <BackButton onClick={onPrev}>{t.backButton || defaultTranslations.ko.backButton}</BackButton>
      <CompletionModal isOpen={isModalOpenLocal} onRequestClose={handleCloseModal} theme={theme} locale={locale} />
    </Container>
  );
}
