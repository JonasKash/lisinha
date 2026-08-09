import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Fazer pedido — Lisinha",
};

export default function PedidoPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
