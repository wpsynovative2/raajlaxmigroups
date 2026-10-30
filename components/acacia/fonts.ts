import { Poppins } from "next/font/google";

/** Poppins is only used by the Acacia landing page, so it is loaded there rather than site-wide. */
export const poppins = Poppins({
  variable: "--font-poppins-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
