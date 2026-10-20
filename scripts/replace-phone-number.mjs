// Replaces the old phone number (8122931402) with the new one (8778838405) in
// all CMS content (seo_pages, services), in any common format. Dry run by
// default; pass --apply to write.
//
//   node --env-file=.env.local scripts/replace-phone-number.mjs
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node --env-file=.env.local scripts/replace-phone-number.mjs --apply
import { createClient } from "@supabase/supabase-js";

const APPLY = process.argv.includes("--apply");

// 8122931402 with optional separators anywhere between digits, e.g.
// "81229 31402", "81229-31402", "8122 931 402"; also matches a 91 prefix.
const OLD = /(?<![\d])(\+?91[\s-]?)?8[\s-]?1[\s-]?2[\s-]?2[\s-]?9[\s-]?3[\s-]?1[\s-]?4[\s-]?0[\s-]?2(?![\d])/g;
const NEW_RAW = "8778838405";
const NEW_SPACED = "87788 38405";

function clean(s) {
  return s.replace(OLD, (m, prefix) => {
    const sep = /[\s-]/.test(m.slice(0, -1).replace(/^\+?91[\s-]?/, "")) ? NEW_SPACED : NEW_RAW;
    return (prefix ?? "") + sep;
  });
}

function walk(v) {
  if (typeof v === "string") return clean(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
  return v;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

if (APPLY) {
  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  if (error) throw new Error("Admin sign-in failed: " + error.message);
}

const SKIP = new Set(["id", "created_at", "updated_at", "slug"]);
let changedRows = 0;

for (const table of ["seo_pages", "services"]) {
  const { data: rows, error } = await supabase.from(table).select("*");
  if (error) throw error;
  for (const row of rows) {
    const patch = {};
    for (const [col, val] of Object.entries(row)) {
      if (SKIP.has(col) || val == null) continue;
      const next = walk(val);
      if (JSON.stringify(next) !== JSON.stringify(val)) patch[col] = next;
    }
    if (!Object.keys(patch).length) continue;
    changedRows++;
    console.log(`${table}/${row.slug}: ${Object.keys(patch).join(", ")}`);
    if (APPLY) {
      const { error: upErr } = await supabase.from(table).update(patch).eq("id", row.id);
      if (upErr) throw new Error(`${table}/${row.slug}: ${upErr.message}`);
    }
  }
}
console.log(`${APPLY ? "Updated" : "Would update"} ${changedRows} rows.`);
