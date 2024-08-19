import { NextResponse } from "next/server";
const { SolapiMessageService } = require("solapi");

export async function POST(req) {
  console.log("POST request received");
  try {
    const messageService = new SolapiMessageService(process.env.KEY, process.env.SECRET_KEY);
    const data = await req.json();
    console.log("Received data:", data);

    if (data.호출) {
      return sendFixedTemplate(messageService);
    } else {
      return sendVariableTemplate(messageService, data);
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ success: false, payload: "실패", error: error.message }, { status: 500 });
  }
}

async function sendFixedTemplate(messageService) {
  console.log("Sending fixed template");
  try {
    const res = await messageService.send({
      // 테스트
      //   to: "01074842242",
      to: process.env.ROOT_PHONE_TORSO,
      from: process.env.ROOT_PHONE_MASTER,
      kakaoOptions: {
        pfId: process.env.PFID,
        templateId: process.env.FIXED_TEMPLATE,
        variables: {},
      },
    });
    console.log("Fixed template sent successfully:", res);
    return NextResponse.json({ success: true, payload: "성공" });
  } catch (err) {
    console.error("Error sending fixed template:", err);
    return NextResponse.json({ success: false, payload: "실패", error: err.message }, { status: 500 });
  }
}

async function sendVariableTemplate(messageService, data) {
  console.log("Sending variable template");
  try {
    const recipients = [data.디자이너번호, process.env.ROOT_PHONE_TORSO];

    // 진성쌤일때 승원인턴 추가
    if (data.디자이너번호 === process.env.ROOT_PHONE_MASTER) {
      recipients.push("01047060749");
    }

    console.log("Recipients:", recipients);

    const res = await messageService.send({
      // 테스트
      // to: "01074842242",
      to: recipients,
      from: process.env.ROOT_PHONE_MASTER,
      kakaoOptions: {
        pfId: process.env.PFID,
        templateId: process.env.BASIC_TEMPLATE,
        variables: {
          "#{디자이너}": data.디자이너,
          "#{예약시간}": data.예약시간,
          "#{고객명}": data.고객명,
          "#{샴푸여부}": data.샴푸여부,
          "#{시술내용}": data.시술내용,
          "#{머리감기}": data.머리감기,
          "#{제품}": data.제품,
          "#{스타일링}": data.스타일링,
        },
      },
    });
    console.log("Variable template sent successfully:", res);
    return NextResponse.json({ success: true, payload: "성공" });
  } catch (err) {
    console.error("Error sending variable template:", err);
    return NextResponse.json({ success: false, payload: "실패", error: err.message }, { status: 500 });
  }
}
