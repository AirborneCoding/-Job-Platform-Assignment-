import Header from "../components/Header";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-markoubOrange1">
      <Header />
      <div className="flex items-center justify-center">
        <section className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-sm">
              <img
                src="https://markoub.ma/assets/home/bus.webp"
                alt="Book bus tickets"
                width={400}
                height={280}
                className="w-full h-auto object-contain"
              />

              <span className="absolute left-1/2 top-0 -translate-x-1/2 w-56 h-56 rounded-full border border-white/40" />
              <span className="absolute left-1/2 -top-8 -translate-x-1/2 w-72 h-72 rounded-full border border-white/30" />

              <img
                src="https://markoub.ma/assets/home/city.webp"
                alt=""
                width={120}
                height={180}
                className="hidden md:block absolute -left-6 bottom-0"
              />
              <img
                src="https://markoub.ma/assets/home/mosque.webp"
                alt=""
                width={120}
                height={180}
                className="hidden md:block absolute -right-6 -top-6"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="order-2 md:order-1 text-center md:text-left text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Senior Full‑stack{" "}
              <span className="text-white/90">Assignment</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/90 font-medium">
              With <span className="font-semibold text-white">marKoub.ma</span>,
              access{" "}
              <span className="font-semibold text-white">100+ operators</span>,
              enjoy the best prices, and pay easily online or in cash.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
