// Removes the words "local", "private" and "authorized/authorised" from all
// CMS content (seo_pages, services). Dry run by default; pass --apply to write.
//
//   node --env-file=.env.local scripts/remove-banned-words.mjs
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node --env-file=.env.local scripts/remove-banned-words.mjs --apply
//
// Dry run reads published rows with the public key; --apply signs in as the
// dashboard admin (RLS only allows authenticated writes) and sees drafts too.
import { createClient } from "@supabase/supabase-js";

const APPLY = process.argv.includes("--apply");
const BANNED = /\b(local(ly)?|private|authori[sz]ed)\b/i;

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function clean(s) {
  return (
    s
      // Disclaimers: "not an authorized LG [brand] service center" must stay a
      // truthful statement, so rewrite rather than just delete the word.
      .replace(/\bnot an? authori[sz]ed ([\w& ]+?) (?:brand )?service (?:cent(?:er|re)|station)\b/gi, "not affiliated with $1")
      .replace(/\ban? authori[sz]ed ([\w& ]+?) (?:brand )?service (?:cent(?:er|re)|station)(?: in [A-Z][\w]+)?/gi, "affiliated with $1")
      .replace(/\b([\w&]+)-authori[sz]ed channels\b/gi, "$1 channels")
      .replace(/\bauthori[sz]ed (suppliers|distributors|dealers)\b/gi, "trusted $1")
      .replace(/\bauthori[sz]ed (service point|repair)\b/gi, "$1")
      .replace(/\ba local ("all-brand")/gi, "an $1")
      // "Fast, local doorstep" -> "Fast doorstep"
      .replace(/,\s+local\s+/gi, " ")
      // "Local Coverage" / "Book Local LG" -> drop word, keep capitalisation of what follows
      .replace(/\b(Local|local)\s+(["“]?)(\w)/g, (m, w, q, c) => q + (w === "Local" ? c.toUpperCase() : c))
      .replace(/\bprivate\s+/gi, "")
      .replace(/\blocally\b/gi, "")
  );
}

function walk(v) {
  if (typeof v === "string") return clean(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
  return v;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key, { auth: { persistSession: false } });

if (APPLY) {
  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  if (error) throw new Error("Admin sign-in failed: " + error.message);
}

const SKIP = new Set(["id", "created_at", "updated_at", "slug"]);
let changedRows = 0;
const leftovers = [];

for (const table of ["seo_pages", "services"]) {
  const { data: rows, error } = await supabase.from(table).select("*");
  if (error) throw error;
  for (const row of rows) {
    const patch = {};
    for (const [col, val] of Object.entries(row)) {
      if (SKIP.has(col) || val == null) continue;
      const next = walk(val);
      if (JSON.stringify(next) !== JSON.stringify(val)) patch[col] = next;
      if (BANNED.test(JSON.stringify(next))) leftovers.push(`${table}/${row.slug}.${col}`);
    }
    if (!Object.keys(patch).length) continue;
    changedRows++;
    if (APPLY) {
      const { error: upErr } = await supabase.from(table).update(patch).eq("id", row.id);
      if (upErr) throw new Error(`${table}/${row.slug}: ${upErr.message}`);
    } else if (process.env.SAMPLE) {
      for (const [c, v] of Object.entries(patch)) {
        const before = JSON.stringify(row[c]), after = JSON.stringify(v);
        console.log(`--- ${table}/${row.slug}.${c}\n- ${before.slice(0, 300)}\n+ ${after.slice(0, 300)}`);
      }
    }
  }
}
console.log(`${APPLY ? "Updated" : "Would update"} ${changedRows} rows.`);
console.log("Rows still containing banned words:", leftovers.length ? leftovers : "none");
