"use client";

import { useState } from "react";
import styled from "styled-components";
import { useReservation } from "../../context/ReservationContext";

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const TimeButton = styled.button`
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

// 시간 목록 생성 함수
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour <= 21; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour !== 21) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const translations = {
  en: {
    title: "Please select the time you have reserved",
    backButton: "Back",
  },
  ko: {
    title: "예약 시간을 선택해주세요",
    backButton: "이전",
  },
};

export default function TimeSelect({ onNext, onPrev, locale = "ko" }) {
  const { dispatch } = useReservation();
  const [selectedTime, setSelectedTime] = useState(null);
  const t = translations[locale];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    dispatch({ type: "SET_TIME", payload: time });
    onNext();
  };

  return (
    <>
      <Title>{t.title}</Title>
      <TimeGrid>
        {timeSlots.map((time) => (
          <TimeButton key={time} onClick={() => handleTimeSelect(time)}>
            {time}
          </TimeButton>
        ))}
      </TimeGrid>
      <BackButton onClick={onPrev}>{t.backButton}</BackButton>
    </>
  );
}
