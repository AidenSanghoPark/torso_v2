"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#222",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "80%",
    width: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    lineHeight: "2",
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
  },
};

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
    modal: {
      title: "Sent to your stylist!",
      message: "Please have a seat in the waiting area. We'll guide you at your appointed time.",
      info: "< Salon Usage Guide >",
      locker: "Store your belongings in the locker outside and keep the key",
      drinks: "Self-service drinks are next to the counter",
      restroom: "Restroom is next to the elevator",
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
    modal: {
      title: "담당 디자이너에게 전달완료!",
      message: "대기석에 앉아계시면 시간 맞춰 안내해드리겠습니다.",
      info: "< 매장 이용 안내 >",
      locker: "소지품은 매장 밖 락커에 보관 후 키 챙기기",
      drinks: "음료는 카운터 옆 셀프바",
      restroom: "화장실은 엘레베이터 옆",
    },
  },
};

const stylingOptions = ["말리기만", "핸드 드라이", "롤", "고데기"];

export default function StylingSelect({ onNext, onPrev, onReset, setStep, locale = "ko", setIsModalOpen, theme }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const { state, dispatch } = useReservation();
  const [isBrowser, setIsBrowser] = useState(false);
  const t = translations[locale] || translations.ko;

  useEffect(() => {
    setIsBrowser(true);
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    setIsModalOpen(isModalOpenLocal); // 모달 상태 업데이트
  }, [isModalOpenLocal, setIsModalOpen]);

  const handleSelect = async (option) => {
    setSelectedOption(option);
    dispatch({ type: "SET_STYLING", payload: option });
    setIsModalOpenLocal(true); // 모달 열기

    try {
      const response = await fetch("/api/sendAlertTalk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          디자이너: state.designer.name,
          디자이너번호: state.designer.phoneNumber,
          예약시간: state.time,
          고객명: state.name,
          // 샴푸여부: state.shampoo === "어제 밤" || state.shampoo === "모자착용" ? (locale === "en" ? "Shampoo needed" : "샴푸 필요") : locale === "en" ? "Ready to start" : "바로 가능",
          샴푸여부: state.shampoo === "어제 밤" || state.shampoo === "모자착용" ? "샴푸 필요" : "바로 가능",
          시술내용: state.style,
          머리감기: state.shampoo,
          제품: state.product,
          스타일링: option,
          호출: false,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error sending alert talk:", error);
    }

    setTimeout(() => {
      setIsModalOpenLocal(false); // 모달 닫기
      onReset();
    }, 5000);
  };

  const modalStyles = {
    content: {
      ...customStyles.content,
      backgroundColor: theme.modalBackgroundColor,
      color: theme.modalTextColor,
      border: `1px solid ${theme.modalBorderColor}`,
    },
    overlay: {
      ...customStyles.overlay,
      backgroundColor: theme.modalOverlayColor,
    },
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
      {isBrowser && (
        <Modal
          isOpen={isModalOpenLocal}
          onRequestClose={() => {
            setIsModalOpenLocal(false);
            onReset();
          }}
          style={modalStyles}
          contentLabel="Completion Modal"
          ariaHideApp={false}
        >
          <h2 style={{ ...customStyles.text, color: theme.modalTextColor }}>
            {t.modal.title}
            <br />
            <br />
          </h2>
          <h5 style={{ ...customStyles.text, color: theme.modalTextColor }}>
            {t.modal.message}
            <br />
            <br />
            {t.modal.info}
            <br />
            {t.modal.locker}
            <br />
            {t.modal.drinks}
            <br />
            {t.modal.restroom}
            <br />
            <br />
          </h5>
        </Modal>
      )}
    </Container>
  );
}
