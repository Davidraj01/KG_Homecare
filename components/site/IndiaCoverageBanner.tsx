export function IndiaCoverageBanner() {
  return (
    <div
      className="relative overflow-hidden py-10"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #0f2a6b 55%, #1e40af 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-2xl">🌍</p>
        <h2 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          We Provide Services All Over India
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          Wherever you are in India, KG Home Care is ready to help with reliable washing machine
          repair, installation, and maintenance services.
        </p>
      </div>
    </div>
  );
}
