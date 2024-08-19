export async function sendAlertTalk(reservationState, isCalling = false) {
  try {
    const response = await fetch("/api/sendAlertTalk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        디자이너: reservationState.designer.name,
        디자이너번호: reservationState.designer.phoneNumber,
        예약시간: reservationState.time,
        고객명: reservationState.name,
        샴푸여부: reservationState.shampoo === "어제 밤" || reservationState.shampoo === "모자착용" ? "샴푸 필요" : "바로 가능",
        시술내용: reservationState.style,
        머리감기: reservationState.shampoo,
        제품: reservationState.product,
        스타일링: reservationState.styling,
        호출: isCalling,
      }),
    });

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const result = await response.json();
    console.log("Alert talk result:", result);
    return result;
  } catch (error) {
    console.error("Error sending alert talk:", error);
    throw error;
  }
}
