#!/usr/bin/env node
// Builds every Obsidianite Facets port from palettes/facets.json.
// Usage: npm run build   (Terminal.app profiles need macOS; everything else builds anywhere)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { vscodeTheme, ansi } from "./vscode.mjs";
import { rgb, bare } from "./color.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const palette = JSON.parse(readFileSync(join(root, "palettes/facets.json"), "utf8"));
const flavors = Object.entries(palette.flavors).map(([id, f]) => ({ id, ...f }));
const title = (f) => `Obsidianite Facets ${f.name}`;

const write = (rel, text) => {
  const path = join(root, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  return rel;
};
const written = [];

// Start clean so renamed flavors don't leave stale files behind.
rmSync(join(root, "themes/facets"), { recursive: true, force: true });
rmSync(join(root, "extras/facets"), { recursive: true, force: true });

// ---------- VS Code ----------
for (const f of flavors) {
  written.push(write(`themes/facets/obsidianite-facets-${f.id}-color-theme.json`,
    JSON.stringify(vscodeTheme(f), null, 2) + "\n"));
}

// Register the themes in package.json (the two original themes stay first).
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const originals = pkg.contributes.themes.filter((t) => !t.path.includes("/facets/"));
pkg.contributes.themes = [
  ...originals,
  ...flavors.map((f) => ({
    label: title(f),
    uiTheme: f.type === "light" ? "vs" : "vs-dark",
    path: `./themes/facets/obsidianite-facets-${f.id}-color-theme.json`,
  })),
];
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// ---------- Ghostty ----------
for (const f of flavors) {
  const p = f.colors, a = ansi(f);
  const order = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const lines = [
    `# ${title(f)} for Ghostty. Generated from palettes/facets.json, do not edit by hand.`,
    `background = ${p.base}`,
    `foreground = ${p.text}`,
    `cursor-color = ${p.aquamarine}`,
    `cursor-text = ${p.base}`,
    `selection-background = ${f.type === "light" ? p.layer2 : p.layer2}`,
    `selection-foreground = ${p.text}`,
    `split-divider-color = ${p.layer1}`,
    ...order.map((n, i) => `palette = ${i}=${a[n]}`),
    ...order.map((n, i) => `palette = ${i + 8}=${a["bright" + n[0].toUpperCase() + n.slice(1)]}`),
  ];
  written.push(write(`extras/facets/ghostty/${title(f)}`, lines.join("\n") + "\n"));
}

// ---------- iTerm2 ----------
const itermColor = (key, hex) => {
  const [r, g, b] = rgb(hex).map((x) => (x / 255).toFixed(6));
  return `\t<key>${key}</key>\n\t<dict>\n\t\t<key>Alpha Component</key>\n\t\t<real>1</real>\n\t\t<key>Blue Component</key>\n\t\t<real>${b}</real>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Green Component</key>\n\t\t<real>${g}</real>\n\t\t<key>Red Component</key>\n\t\t<real>${r}</real>\n\t</dict>`;
};
const ansiList = (f) => {
  const a = ansi(f);
  return ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"]
    .flatMap((n) => [a[n], a["bright" + n[0].toUpperCase() + n.slice(1)]])
    .reduce((acc, c, i) => { acc[(i % 2) * 8 + Math.floor(i / 2)] = c; return acc; }, []);
};
for (const f of flavors) {
  const p = f.colors;
  const entries = [
    ...ansiList(f).map((c, i) => itermColor(`Ansi ${i} Color`, c)),
    itermColor("Background Color", p.base),
    itermColor("Badge Color", p.tourmaline),
    itermColor("Bold Color", p.text),
    itermColor("Cursor Color", p.aquamarine),
    itermColor("Cursor Guide Color", p.layer0),
    itermColor("Cursor Text Color", p.base),
    itermColor("Foreground Color", p.text),
    itermColor("Link Color", p.topaz),
    itermColor("Selected Text Color", p.text),
    itermColor("Selection Color", p.layer2),
    itermColor("Tab Color", p.abyss),
  ];
  written.push(write(`extras/facets/iterm2/${title(f)}.itermcolors`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n${entries.join("\n")}\n</dict>\n</plist>\n`));
}

// ---------- macOS Terminal (needs macOS to archive NSColor values) ----------
if (process.platform === "darwin") {
  for (const f of flavors) {
    const p = f.colors, a = ansi(f);
    const spec = {
      name: title(f),
      colors: {
        BackgroundColor: p.base, TextColor: p.text, TextBoldColor: p.text,
        CursorColor: p.aquamarine, SelectionColor: p.layer2,
        ANSIBlackColor: a.black, ANSIRedColor: a.red, ANSIGreenColor: a.green, ANSIYellowColor: a.yellow,
        ANSIBlueColor: a.blue, ANSIMagentaColor: a.magenta, ANSICyanColor: a.cyan, ANSIWhiteColor: a.white,
        ANSIBrightBlackColor: a.brightBlack, ANSIBrightRedColor: a.brightRed, ANSIBrightGreenColor: a.brightGreen,
        ANSIBrightYellowColor: a.brightYellow, ANSIBrightBlueColor: a.brightBlue,
        ANSIBrightMagentaColor: a.brightMagenta, ANSIBrightCyanColor: a.brightCyan, ANSIBrightWhiteColor: a.brightWhite,
      },
    };
    const rel = `extras/facets/terminal-app/${title(f)}.terminal`;
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    const r = spawnSync("osascript", ["-l", "JavaScript", join(root, "build/terminal-app.jxa.js"),
      join(root, rel), JSON.stringify(spec)], { encoding: "utf8" });
    if (r.status !== 0) throw new Error(`Terminal.app profile failed for ${f.name}: ${r.stderr}`);
    written.push(rel);
  }
} else {
  console.warn("Skipping Terminal.app profiles (they can only be built on macOS).");
}

// ---------- fish ----------
for (const f of flavors) {
  const p = f.colors, b = (k) => bare(p[k]);
  const lines = [
    `# name: '${title(f)}'`,
    `# preferred_background: ${bare(p.base)}`,
    `# Generated from palettes/facets.json. Install: copy to ~/.config/fish/themes/, then run`,
    `# fish_config theme save "${title(f)}"`,
    "",
    `fish_color_normal ${b("text")}`,
    `fish_color_command ${b("sapphire")}`,
    `fish_color_keyword ${b("tourmaline")}`,
    `fish_color_param ${b("topaz")}`,
    `fish_color_option ${b("amethyst")}`,
    `fish_color_quote ${b("jade")}`,
    `fish_color_redirection ${b("kunzite")}`,
    `fish_color_end ${b("aquamarine")}`,
    `fish_color_operator ${b("aquamarine")}`,
    `fish_color_escape ${b("kunzite")}`,
    `fish_color_error ${b("garnet")}`,
    `fish_color_comment ${b("veil1")} --italics`,
    `fish_color_autosuggestion ${b("veil0")}`,
    `fish_color_valid_path --underline`,
    `fish_color_cwd ${b("aquamarine")}`,
    `fish_color_cwd_root ${b("garnet")}`,
    `fish_color_user ${b("tourmaline")}`,
    `fish_color_host ${b("sapphire")}`,
    `fish_color_host_remote ${b("carnelian")}`,
    `fish_color_status ${b("garnet")}`,
    `fish_color_cancel ${b("garnet")} --reverse`,
    `fish_color_selection --background=${b("layer1")}`,
    `fish_color_search_match --background=${b("layer1")}`,
    `fish_color_history_current --bold`,
    `fish_pager_color_progress ${b("veil1")}`,
    `fish_pager_color_prefix ${b("aquamarine")}`,
    `fish_pager_color_completion ${b("text")}`,
    `fish_pager_color_description ${b("veil1")}`,
    `fish_pager_color_selected_background --background=${b("layer1")}`,
    `fish_pager_color_selected_completion ${b("text")}`,
    `fish_pager_color_selected_prefix ${b("aquamarine")}`,
    `fish_pager_color_selected_description ${b("muted0")}`,
  ];
  written.push(write(`extras/facets/fish/${title(f)}.theme`, lines.join("\n") + "\n"));
}

// ---------- Starship ----------
{
  const names = [...palette.accents, ...palette.neutrals];
  const blocks = flavors.map((f) =>
    `[palettes.obsidianite_facets_${f.id}]\n` + names.map((n) => `${n} = "${f.colors[n]}"`).join("\n"));
  written.push(write("extras/facets/starship/palettes.toml", [
    "# Obsidianite Facets palettes for Starship. Generated from palettes/facets.json.",
    "# Paste the block you want into ~/.config/starship.toml, then select it at the top level:",
    '#   palette = "obsidianite_facets_obsidian"',
    "# and use swatch names as styles, for example: style = \"bold aquamarine\".",
    "",
    blocks.join("\n\n"),
    "",
  ].join("\n")));
}

// ---------- docs page data (docs/index.html reads window.FACETS) ----------
{
  const data = {
    accents: palette.accents,
    neutrals: palette.neutrals,
    flavors: Object.fromEntries(flavors.map((f) => [f.id, {
      name: f.name, type: f.type, description: f.description, colors: f.colors, ansi: ansi(f),
    }])),
  };
  written.push(write("docs/facets.js",
    "// Generated by build/build.mjs from palettes/facets.json. Do not edit by hand.\n" +
    `window.FACETS = ${JSON.stringify(data, null, 1)};\n`));
}

console.log(`Built ${flavors.length} flavors, ${written.length} files:`);
for (const w of written) console.log("  " + w);
