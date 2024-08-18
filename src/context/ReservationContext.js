"use client";

import React, { createContext, useContext, useReducer } from "react";

const ReservationContext = createContext();

const initialState = {
  designer: null,
  time: null,
  service: null,
  // 필요한 다른 필드들 추가
};

function reservationReducer(state, action) {
  switch (action.type) {
    case "SET_DESIGNER":
      return { ...state, designer: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_STYLE":
      return { ...state, style: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_SHAMPOO":
      return { ...state, shampoo: action.payload };
    case "SET_PRODUCT":
      return { ...state, product: action.payload };
    case "SET_STYLING":
      return { ...state, styling: action.payload };
    // 다른 액션 타입들 추가
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function ReservationProvider({ children }) {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return <ReservationContext.Provider value={{ state, dispatch }}>{children}</ReservationContext.Provider>;
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
