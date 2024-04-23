"use client";
import Header from "@/components/Header/Header";
import store from "@/store/configureStore";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
        </body>
      </Provider>
    </html>
  );
}
