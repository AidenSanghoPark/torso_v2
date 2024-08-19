import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const translations = {
  en: {
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

const ModalContent = styled.div`
  text-align: center;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const Info = styled.h5`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const DetailItem = styled.p`
  font-size: 1rem;
  margin-bottom: 0.8rem;
`;

const CloseButton = styled.button`
  background-color: #fff;
  color: #222;
  border: none;
  padding: 10px 25px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffee58;
  }
`;

const CompletionModal = ({ isOpen, onRequestClose, theme, locale = "ko" }) => {
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#222",
      border: "1px solid #333",
      borderRadius: "15px",
      padding: "30px",
      maxWidth: "90%",
      width: "400px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const t = translations[locale]?.modal || translations.ko.modal;

  const renderMessage = (message) => {
    if (locale === "en") {
      return message.split(". ").map((sentence, index, array) => (
        <React.Fragment key={index}>
          {sentence}
          {index < array.length - 1 ? "." : ""}
          <br />
        </React.Fragment>
      ));
    } else {
      // 한국어 및 기타 언어의 경우 전체 메시지를 그대로 렌더링
      return message;
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles} contentLabel="Completion Modal" ariaHideApp={false}>
      <ModalContent>
        <Title>{t.title}</Title>
        <Message>{renderMessage(t.message)}</Message>
        <Info>{t.info}</Info>
        <DetailItem>{t.locker}</DetailItem>
        <DetailItem>{t.drinks}</DetailItem>
        <DetailItem>{t.restroom}</DetailItem>
        <CloseButton onClick={onRequestClose}>{t.closeButton || "닫기"}</CloseButton>
      </ModalContent>
    </Modal>
  );
};

export default CompletionModal;
