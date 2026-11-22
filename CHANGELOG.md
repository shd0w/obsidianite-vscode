# Changelog

## 1.2.0

### New: Obsidianite Facets
A family of six themes built from one named palette, added next to Obsidianite and Obsidianite AMOLED (both unchanged).

| Flavor | Type | Look |
| --- | --- | --- |
| **Quartz** | light | Pale lavender base, deepened accents |
| **Smoke** | dark | Lifted purple-grey, soft pastels |
| **Onyx** | dark | Deeper base, pastel accents |
| **Snowflake** | dark | Obsidian's `#100e17` base with pastel accents |
| **Obsidian** | dark | The original `#100e17` with vivid cyan and pink |
| **Jet** | AMOLED | Obsidian's vivid accents on pure black |

- **Twelve named accents**: garnet, tourmaline, kunzite, amethyst, iolite, sapphire, topaz, aquamarine, jade, peridot, citrine and carnelian. Each keeps the hue of an Obsidianite color.
- **Twelve neutrals**, from `text` to `abyss`, all tinted toward Obsidianite's purple.
- **Readable everywhere:** every accent meets readable contrast on its background. The tightest is Quartz's aquamarine at 4.4:1.
- **Same roles in every flavor:**
  - keywords: tourmaline
  - functions: sapphire
  - strings: jade
  - numbers: carnelian
  - types: citrine
  - parameters: amethyst italic
  - properties: topaz
  - operators and the accent color: aquamarine
- **Full UI theming** in all six themes, including semantic highlighting, bracket pairs, sticky scroll, inlay hints, diff and merge views, testing icons and the integrated terminal.

### Terminal and shell themes for every flavor
Find them in `extras/facets/`:
- **Ghostty**
- **iTerm2** (`.itermcolors`)
- **macOS Terminal** (`.terminal`)
- **fish** (`.theme`, for `fish_config theme save`)
- **Starship**: palette blocks you select with `palette = "obsidianite_facets_<flavor>"`

### Live preview page
- `docs/index.html` is an interactive page showing every flavor: the VS Code editor, a fish and Starship terminal, an Obsidian note, the 16 terminal colors, and the swatch reference. It's served with GitHub Pages from `docs/`. Links like `#snowflake` open it on that flavor.
- README now opens with an animated GIF of all six flavors and a grid of clickable flavor thumbnails that open the live preview (`docs/screenshots/`).

### Marketplace listing
- Display name is now **Obsidianite Theme**. The description and keywords are rewritten around how people search for themes: dark, light, AMOLED, black, purple, pink, pastel, Obsidian.

### One palette file
- `palettes/facets.json` is the source of truth. `npm run build` regenerates every port and registers the themes in `package.json`.
- Terminal.app profiles need macOS to build. Everything else builds anywhere with Node.

## 1.1.0

### Syntax highlighting
- **Less green.** Plain variables now use Obsidianite's heading color (`#cbdbe5`) instead of green, so functions (still green) stand out.
- **Properties and object keys** use the property cyan `#66d9ef`, including JSON, YAML and CSS property names.
- **Parameters** are purple italic (`#bb9af7`). `this` / `self` / `super` are pink italic.
- **Constants and enum members** use the number purple `#bd93f9`.
- **New scopes:**
  - imports/exports
  - storage modifiers
  - primitive and built-in types
  - interfaces and inherited classes
  - type parameters
  - decorators
  - built-in functions
  - escapes and format placeholders
  - template-string interpolation
  - JSDoc/docstring tags
  - shell variables and commands
  - diff headers
- **Fixed CSS rules** that used scope names that never matched. Property names and values are now actually colored.
- **Semantic highlighting** is enabled, and `semanticTokenColors` is mapped to the same palette. Deprecated symbols are struck through.

### Markdown (closer to Obsidianite notes)
- H1 is cyan, H2–H6 are `#cbdbe5`, and the `#` marks are a dimmed cyan.
- Bold uses the light blue `#87c2fd`, and inline code uses Obsidianite's cyan.
- Blockquotes are readable `#bdbdbd` italic instead of dim grey.
- List bullets and horizontal rules are pink. The Nord list color is gone.

### Editor and UI
- **Warnings are now yellow** (`#ffc93c`, from Obsidianite's `#ideas` tag) instead of the same pink as errors. This applies in the editor, the problems panel, notifications, the status bar and the debug console.
- **Selection** uses Obsidianite's highlight blue `#263d92`. In AMOLED it was nearly invisible.
- **Newly themed:**
  - find matches and word/selection highlights
  - bracket-pair colorization and guides
  - sticky scroll
  - inlay hints and ghost text
  - whitespace and rulers
  - the minimap
- **Lists and trees:** cyan match highlights, a clearer active selection, and inactive selection states.
- **Tabs:** a cyan top border on the active tab, a pink modified indicator, and a pinned-tab border.
- **Status bar:** debugging, no-folder and remote-indicator states.
- **Also themed:**
  - checkboxes and input validation
  - keybinding labels
  - banners
  - testing icons
  - notebooks
  - charts
  - the renamed/staged git decorations
- Widget borders are softer.

### Terminal
- The integrated terminal palette is fixed: bright blue was purple. It now matches the bundled terminal themes exactly.
- Terminal cursor, selection, find-match colors and command decorations are themed.

### Extras
- New terminal ports with the same palette in `extras/`:
  - **Ghostty**: `extras/ghostty/Obsidianite`
  - **iTerm2**: `extras/iterm2/Obsidianite.itermcolors`
  - **macOS Terminal**: `extras/terminal-app/Obsidianite.terminal`

### Packaging
- Added the `$schema` to the theme files, plus license, keywords, gallery banner and bugs URL to `package.json`.
- The `.vsix` no longer includes the extras, publishing notes or the git folder.

## 1.0.1
- Added the extension icon.

## 1.0.0
- Initial release: Obsidianite and Obsidianite AMOLED.
