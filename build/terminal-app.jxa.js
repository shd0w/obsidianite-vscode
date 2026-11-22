// Writes a macOS Terminal profile (.terminal) with sRGB NSColor values.
// Called by build.mjs: osascript -l JavaScript terminal-app.jxa.js <outPath> <specJson>
ObjC.import("AppKit");

function run(argv) {
  const out = argv[0];
  const spec = JSON.parse(argv[1]);
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const archive = (hex) => {
    const [r, g, b] = rgb(hex);
    const color = $.NSColor.colorWithSRGBRedGreenBlueAlpha(r, g, b, 1);
    return $.NSKeyedArchiver.archivedDataWithRootObjectRequiringSecureCodingError(color, false, null);
  };
  const profile = $.NSMutableDictionary.alloc.init;
  profile.setObjectForKey(spec.name, "name");
  profile.setObjectForKey("Window Settings", "type");
  profile.setObjectForKey("2.07", "ProfileCurrentVersion");
  profile.setObjectForKey($.NSNumber.numberWithBool(true), "UseBrightBold");
  for (const key of Object.keys(spec.colors)) {
    profile.setObjectForKey(archive(spec.colors[key]), key);
  }
  if (!profile.writeToFileAtomically(out, true)) throw new Error("could not write " + out);
  return "ok";
}
