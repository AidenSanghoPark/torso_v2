"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { ReservationProvider, useReservation } from "../context/ReservationContext";
import DesignerSelect from "./components/DesignerSelect";
import TimeSelect from "./components/TimeSelect";
import StyleSelect from "./components/StyleSelect";
import InputName from "./components/InputName";
import ShampooSelect from "./components/ShampooSelect";
import ProductSelect from "./components/ProductSelect";
import StylingSelect from "./components/StylingSelect";
import LogoAnimation from "./components/LogoAnimation";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    transition: all 0.3s ease;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  font-family: "Pretendard", sans-serif;
  // 배경이미지 적용
  background-image: ${(props) =>
    props.$isDarkMode
      ? props.$isWaitingScreen
        ? 'url("/images/dark_bg_main_1080_low.jpg")'
        : 'url("/images/dark_bg_sub_1080_low.jpg")'
      : props.$isWaitingScreen
        ? 'url("/images/white_bg_main_1080_low.jpg")'
        : 'url("/images/white_bg_sub_1080_low_2.jpg")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  // background-color: ${(props) => props.theme.navBackgroundColor};
  // border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const NavItem = styled.div`
  padding: 0.5rem 1rem;
  color: ${(props) => (props.$active ? props.theme.activeTextColor : props.theme.inactiveTextColor)};
  font-weight: ${(props) => (props.$active ? "800" : "600")};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LogoContainer = styled.div`
  width: 300px;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonTextColor};
  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackgroundColor};
    border-color: ${(props) => props.theme.buttonHoverBorderColor};
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-top: 2rem;
  text-align: center;
  line-height: 2;
  font-weight: 600;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.$active ? props.theme.activeTextColor : props.theme.inactiveTextColor)};
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackgroundColor};
  }
`;

const LanguageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ToggleSwitch = styled.label`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: inline-block;
  width: 50px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.toggleBackgroundColor};
    transition: 0.4s;
    border-radius: 26px;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: ${(props) => props.theme.toggleButtonColor};
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${(props) => props.theme.toggleActiveColor};
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const translations = {
  en: {
    selfCheckIn: "Check-in",
    staffCall: "Call Staff",
    welcome: "Welcome to Torso for MEN Hongdae Hapjeong Branch.",
    helpMessage: "Please call a staff member if you need assistance.",
    reservation: "Reservation",
    hairCheck: "Hair Check",
    waitingEntry: "Waiting Entry",
  },
  ko: {
    selfCheckIn: "셀프 체크인",
    staffCall: "직원 호출",
    welcome: "환영합니다. 토르소포맨 홍대 합정점 입니다.",
    helpMessage: "도움이 필요하시면 직원을 호출해주세요.",
    reservation: "예약확인",
    hairCheck: "모발체크",
    waitingEntry: "입장대기",
  },
};

console.log("Page translations:", translations);

const lightTheme = {
  backgroundColor: "#fff",
  textColor: "#333",
  navBackgroundColor: "#f8f8f8",
  borderColor: "#e0e0e0",
  activeTextColor: "#000",
  inactiveTextColor: "#888",
  buttonBackgroundColor: "#fff",
  buttonTextColor: "#333",
  buttonBorderColor: "#ccc",
  buttonHoverBackgroundColor: "#f0f0f0",
  buttonHoverBorderColor: "#999",
  toggleBackgroundColor: "#222",
  toggleButtonColor: "#fff",
  toggleActiveColor: "#6c757d",
  logoColor: "#333",
  // 모달스타일
  modalBackgroundColor: "#fff",
  modalTextColor: "#333",
  modalBorderColor: "#ccc",
  modalOverlayColor: "rgba(0, 0, 0, 0.5)",
};

const darkTheme = {
  backgroundColor: "#121212",
  textColor: "#e0e0e0",
  navBackgroundColor: "#1e1e1e",
  borderColor: "#333",
  activeTextColor: "#fff",
  inactiveTextColor: "#888",
  buttonBackgroundColor: "#1e1e1e",
  buttonTextColor: "#e0e0e0",
  // buttonBorderColor: "#444",
  buttonBorderColor: "#121212",
  buttonHoverBackgroundColor: "#2c2c2c",
  buttonHoverBorderColor: "#666",
  toggleBackgroundColor: "#444",
  toggleButtonColor: "#121212",
  toggleActiveColor: "#fff",
  logoColor: "#fff",
  // 모달스타일
  modalBackgroundColor: "#333",
  modalTextColor: "#fff",
  modalBorderColor: "#555",
  modalOverlayColor: "rgba(0, 0, 0, 0.75)",
};

function ReservationProcess() {
  const [step, setStep] = useState("waiting");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useReservation();
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState("ko");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 다크모드 기억
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    const pathnameLocale = pathname.split("/")[1];
    if (pathnameLocale === "en" || pathnameLocale === "ko") {
      setLocale(pathnameLocale);
    }
  }, [pathname]);

  const t = translations[locale];

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setStep("waiting");
    // setIsModalOpen(false);
  };

  const handleStaffCall = async () => {
    try {
      const response = await fetch("/api/sendAlertTalk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          호출: true,
        }),
      });
      const result = await response.json();
      console.log("직원 호출 결과:", result);
    } catch (error) {
      console.error("직원 호출 중 오류:", error);
    }
  };

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
    router.push(pathname, { locale: newLocale });
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const renderStep = () => {
    switch (step) {
      case "waiting":
        return (
          <>
            <LanguageContainer>
              <LanguageButton onClick={() => handleLanguageChange("en")} $active={locale === "en"}>
                English
              </LanguageButton>
              <LanguageButton onClick={() => handleLanguageChange("ko")} $active={locale === "ko"}>
                한국어
              </LanguageButton>
            </LanguageContainer>
            <LogoContainer>
              <LogoAnimation theme={isDarkMode ? darkTheme : lightTheme} />
            </LogoContainer>
            <div>
              <Button onClick={() => setStep("designer")}>{t.selfCheckIn}</Button>
              <Button onClick={handleStaffCall}>{t.staffCall}</Button>
            </div>
            <Message>
              {t.welcome}
              <br />
              {t.helpMessage}
            </Message>
          </>
        );
      case "designer":
        return <DesignerSelect onNext={() => setStep("time")} onReset={handleReset} locale={locale} />;
      case "time":
        return <TimeSelect onNext={() => setStep("style")} onPrev={() => setStep("designer")} locale={locale} />;
      case "style":
        return <StyleSelect onNext={() => setStep("name")} onPrev={() => setStep("time")} locale={locale} />;
      case "name":
        return <InputName onNext={() => setStep("shampoo")} onPrev={() => setStep("style")} locale={locale} />;
      case "shampoo":
        return <ShampooSelect onNext={() => setStep("product")} onPrev={() => setStep("name")} onReset={handleReset} locale={locale} theme={isDarkMode ? darkTheme : lightTheme} />;
      case "product":
        return <ProductSelect onNext={() => setStep("styling")} onPrev={() => setStep("shampoo")} locale={locale} />;
      case "styling":
        return (
          <StylingSelect
            onNext={() => setStep("confirm")}
            onPrev={() => setStep("product")}
            onReset={handleReset}
            setStep={setStep}
            locale={locale}
            // setIsModalOpen={setIsModalOpen}
            theme={isDarkMode ? darkTheme : lightTheme}
          />
        );
      default:
        return null;
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container $isDarkMode={isDarkMode} $isWaitingScreen={step === "waiting"}>
        <GlobalStyle />
        {step !== "waiting" && (
          <NavBar>
            <NavItem $active={step === "designer" || step === "time" || step === "style" || step === "name"}>{t.reservation}</NavItem>
            <NavItem $active={step === "shampoo" || step === "product" || step === "styling"}>{t.hairCheck}</NavItem>
            <NavItem $active={step === "confirm"}>{t.waitingEntry}</NavItem>
          </NavBar>
        )}
        <Content>{renderStep()}</Content>
        <ToggleSwitch>
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span></span>
        </ToggleSwitch>
      </Container>
    </ThemeProvider>
  );
}

export default function Home() {
  return (
    <ReservationProvider>
      <ReservationProcess />
    </ReservationProvider>
  );
}
