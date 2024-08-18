import { ReservationProvider } from "@/context/ReservationContext";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

export const metadata = {
  title: "TORSO for MEN 키오스크",
  description: "토르소포맨 홍대상수점 키오스크",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ReservationProvider>{children}</ReservationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
