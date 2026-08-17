import { ShieldCheck, Wrench, Truck, Award, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BADGES = [
  { icon: Clock, label: "Same Day Service" },
  { icon: Award, label: "Genuine Spare Parts" },
  { icon: ShieldCheck, label: "Service Warranty" },
  { icon: Wrench, label: "Expert Technicians" },
  { icon: Truck, label: "Doorstep Support" },
];

export function Hero() {
  return (
    <section className="dark relative overflow-hidden min-h-[560px] flex flex-col justify-center text-foreground">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#07090f]">
        <Image
          src="/hero-bg-2.png"
          alt="Premium washing machine background"
          fill
          className="object-cover object-right sm:object-center"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background from-10% via-background/85 via-50% to-background/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Trusted by thousands of happy customers
        </span>

        <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          Washing Machine{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            Service Centre
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          Professional washing machine service, installation and maintenance from certified technicians.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
          {BADGES.map((b) => (
            <li
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <b.icon className="h-3.5 w-3.5 text-accent" />
              {b.label}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Link
            href="#book"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_0_30px_-5px_rgba(0,87,255,0.4)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_40px_-5px_rgba(0,87,255,0.6)] active:scale-95"
          >
            Book Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
