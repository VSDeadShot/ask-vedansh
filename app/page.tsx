import { AskPanel } from "@/components/AskPanel";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { ShippedCards } from "@/components/ShippedCards";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <main>
        <Intro />
        <ShippedCards />
        <AskPanel />
      </main>
      <Footer />
    </div>
  );
}
