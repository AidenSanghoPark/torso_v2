"use client";

import { useState } from "react";
import styled from "styled-components";
import { useReservation } from "../../context/ReservationContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center; // 텍스트 가운데 정렬
  letter-spacing: 0.3em; // 자간 넓히기
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #666;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const translations = {
  en: {
    title: "Please enter the name of the person who made the reservation",
    placeholder: "Enter your name",
    nextButton: "Next",
    backButton: "Back",
  },
  ko: {
    title: "예약자분의 성함을 입력해주세요",
    placeholder: "성함을 입력해주세요",
    nextButton: "다음",
    backButton: "이전",
  },
};

export default function InputName({ onNext, onPrev, locale = "ko" }) {
  const [name, setName] = useState("");
  const { dispatch } = useReservation();
  const t = translations[locale] || translations.ko;
  const handleSubmit = () => {
    if (name.trim()) {
      dispatch({ type: "SET_NAME", payload: name });
      onNext();
    }
  };

  return (
    <Container>
      <Title>{t.title}</Title>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.placeholder} />
      <Button onClick={handleSubmit}>{t.nextButton}</Button>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
    </Container>
  );
}
