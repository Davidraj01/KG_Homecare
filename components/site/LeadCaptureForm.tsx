"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createLeadAction } from "@/lib/actions/cms";
import { DEFAULT_ACTION_STATE } from "@/lib/cms.types";
import { User, Phone, MapPin, MessageSquare, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 pl-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#185FA5]/50 focus:bg-white focus:ring-2 focus:ring-[#185FA5]/10";

const iconBase =
  "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-all duration-200 group-focus-within:-translate-y-1/2 group-focus-within:scale-110 group-focus-within:text-[#185FA5]";

const REQUIRED_FIELDS = ["name", "phone", "location", "service", "message"] as const;

export function LeadCaptureForm() {
  const [state, formAction, pending] = useActionState(createLeadAction, DEFAULT_ACTION_STATE);
  const [justSucceeded, setJustSucceeded] = useState(false);
  const [filled, setFilled] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      setJustSucceeded(true);
      toast.success("Request submitted! Redirecting to WhatsApp...");
      window.open(state.message, "_blank", "noopener,noreferrer");
      const timer = setTimeout(() => setJustSucceeded(false), 2500);
      return () => clearTimeout(timer);
    }
    toast.error(state.message);
  }, [state]);

  function updateProgress() {
    const form = formRef.current;
    if (!form) return;
    const count = REQUIRED_FIELDS.filter((name) => {
      const field = form.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | null;
      return !!field?.value.trim();
    }).length;
    setFilled(count);
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onInput={updateProgress}
      onChange={updateProgress}
      className="space-y-4"
    >
      {/* Live progress */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
          <span>{filled === REQUIRED_FIELDS.length ? "All set — ready to send!" : "Quick form"}</span>
          <span>{filled}/{REQUIRED_FIELDS.length}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#185FA5] to-blue-400 transition-all duration-500 ease-out"
            style={{ width: `${(filled / REQUIRED_FIELDS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Row 1: Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="lead-name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name <span className="text-[#185FA5]">*</span>
          </label>
          <div className="group relative">
            <User className={iconBase} />
            <input id="lead-name" name="name" required placeholder="Your full name" className={inputBase} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-phone" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Phone <span className="text-[#185FA5]">*</span>
          </label>
          <div className="group relative">
            <Phone className={iconBase} />
            <input id="lead-phone" name="phone" required placeholder="+91 XXXXX XXXXX" className={inputBase} />
          </div>
        </div>
      </div>

      {/* Location / Area */}
      <div className="space-y-1.5">
        <label htmlFor="lead-location" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Location / Area <span className="text-[#185FA5]">*</span>
        </label>
        <div className="group relative">
          <MapPin className={iconBase} />
          <input id="lead-location" name="location" required placeholder="Your area or locality" className={inputBase} />
        </div>
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <label htmlFor="lead-service" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Select a Service <span className="text-[#185FA5]">*</span>
        </label>
        <select
          id="lead-service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-[#185FA5]/50 focus:bg-white focus:ring-2 focus:ring-[#185FA5]/10"
        >
          <option value="" disabled>Choose a service</option>
          <option value="Washing Machine Service">Washing Machine Service</option>
        </select>
      </div>

      {/* Issue */}
      <div className="group space-y-1.5">
        <label htmlFor="lead-message" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <MessageSquare className="h-3.5 w-3.5 transition-all duration-200 group-focus-within:scale-110 group-focus-within:text-[#185FA5]" />
          Issue <span className="text-[#185FA5]">*</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          required
          rows={3}
          placeholder="e.g. machine not spinning, water leaking, error code E3…"
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#185FA5]/50 focus:bg-white focus:ring-2 focus:ring-[#185FA5]/10"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(24,95,165,0.45)] transition-all hover:-translate-y-px hover:scale-[1.015] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:animate-none ${
          justSucceeded ? "bg-green-600" : "bg-[#185FA5] hover:bg-[#185FA5]/90 animate-pulse-glow"
        }`}
      >
        {pending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : justSucceeded ? (
          <><CheckCircle2 className="h-4 w-4 animate-[fade-up_0.3s_ease-out]" /> Request Sent!</>
        ) : (
          <>Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        We respond in under 30 minutes · Mon – Sun, 8 AM – 9 PM
      </p>
    </form>
  );
}
