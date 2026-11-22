# Changelog

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
