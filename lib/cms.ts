import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createStaticSupabaseClient } from "@/lib/supabase/static";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { LeadRecord, ServiceRecord, SeoPageRecord } from "@/lib/cms.types";

export type { LeadRecord, ServiceRecord, SeoPageRecord };

// Public-facing reads use a cookie-free client so they can run at build time
// (e.g. inside generateStaticParams, where next/headers' cookies() is unavailable).

export async function getPublishedSeoPageBySlug(slug: string): Promise<SeoPageRecord | null> {
  if (!hasSupabaseEnv()) return null;

  const supabase = createStaticSupabaseClient();
  const { data } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .maybeSingle();

  return (data as SeoPageRecord) ?? null;
}

export async function getPublishedSeoPages(): Promise<SeoPageRecord[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = createStaticSupabaseClient();
  const { data } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  return (data as SeoPageRecord[]) ?? [];
}

export async function getSeoPages(): Promise<SeoPageRecord[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("seo_pages")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as SeoPageRecord[]) ?? [];
}

export async function getSeoPageById(id: string): Promise<SeoPageRecord | null> {
  if (!hasSupabaseEnv()) return null;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("seo_pages").select("*").eq("id", id).maybeSingle();

  return (data as SeoPageRecord) ?? null;
}

export async function getPublicServices(): Promise<ServiceRecord[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = createStaticSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("status", "Active")
    .order("created_at", { ascending: false });

  return (data as ServiceRecord[]) ?? [];
}

export async function getPublicServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  if (!hasSupabaseEnv()) return null;

  const supabase = createStaticSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Active")
    .maybeSingle();

  return (data as ServiceRecord) ?? null;
}

export async function getServices(): Promise<ServiceRecord[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as ServiceRecord[]) ?? [];
}

export async function getServiceById(id: string): Promise<ServiceRecord | null> {
  if (!hasSupabaseEnv()) return null;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();

  return (data as ServiceRecord) ?? null;
}

export async function getLeads(): Promise<LeadRecord[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as LeadRecord[]) ?? [];
}

export async function getLeadById(id: string): Promise<LeadRecord | null> {
  if (!hasSupabaseEnv()) return null;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();

  return (data as LeadRecord) ?? null;
}
