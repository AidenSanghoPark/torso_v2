"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../sanity/lib/client";
import { useReservation } from "../../context/ReservationContext";

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const DesignerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const DesignerButton = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;

const ResetButton = styled.button`
  background-color: transparent;
  color: #666;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: bold;
`;

const translations = {
  en: {
    title: "Please select the designer you have reserved",
    resetButton: "<< Back to Start",
  },
  ko: {
    title: "예약하신 디자이너를 선택해주세요",
    resetButton: "<< 처음으로",
  },
};

export default function DesignerSelect({ onNext, onReset, locale = "ko" }) {
  const [designers, setDesigners] = useState([]);
  const { dispatch } = useReservation();
  const t = translations[locale];

  useEffect(() => {
    async function fetchDesigners() {
      const query = '*[_type == "designer"] | order(name asc)';
      const result = await client.fetch(query);
      setDesigners(result);
    }
    fetchDesigners();
  }, []);

  const handleDesignerSelect = (designer) => {
    dispatch({ type: "SET_DESIGNER", payload: designer });
    onNext();
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    onReset();
  };

  return (
    <>
      <Title>{t.title}</Title>
      <DesignerList>
        {designers.map((designer) => (
          <DesignerButton key={designer._id} onClick={() => handleDesignerSelect(designer)}>
            {designer.name}
          </DesignerButton>
        ))}
      </DesignerList>
      <ButtonContainer>
        <ResetButton onClick={handleReset}>{t.resetButton}</ResetButton>
      </ButtonContainer>
    </>
  );
}
