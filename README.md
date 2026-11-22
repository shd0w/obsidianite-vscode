# Obsidianite VS Code Theme

A faithful port of the Obsidianite theme from Obsidian to VS Code, inspired by the original Obsidianite theme created by Benny Guo.

## Installation

### Option 1: Via VS Code Marketplace (Recommended)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Obsidianite"
4. Click Install

### Option 2: Manual Installation (Development)
1. Clone or download this repository.
2. Copy the entire repository folder to your VS Code extensions directory:
   - Windows: `%USERPROFILE%\.vscode\extensions`
   - macOS: `~/.vscode/extensions`
   - Linux: `~/.vscode/extensions`
3. Rename the folder to `shd0w.obsidianite-vscode-<version>` (for example `shd0w.obsidianite-vscode-1.1.0`)
4. Restart VS Code.
5. Select the "Obsidianite" theme from the Color Theme picker (Ctrl+K Ctrl+T).

### Option 3: Via .vsix file
1. Download the latest `.vsix` file from [Releases](https://github.com/shd0w/obsidianite-vscode/releases)
2. In VS Code: Extensions → Install from VSIX...
3. Select the downloaded file

Or from a terminal:

```bash
code --install-extension obsidianite-vscode-1.1.0.vsix
```

## Variants

- **Obsidianite**: the original deep purple-black background (`#100e17`).
- **Obsidianite AMOLED**: pure black editor and panels for OLED screens.

## Features

- Colors taken from the original Obsidianite CSS: cyan `#0fb6d6`, pink `#f4569d`, blue `#7aa2f7` and purple `#bb9af7`.
- Semantic highlighting, so variables, parameters, properties, types and deprecated symbols stay consistent in TypeScript, Python, Rust, Go and others.
- Markdown styled like Obsidianite notes: cyan H1, pale headings, blue bold, cyan inline code and pink bullets.
- Errors are pink and warnings are yellow, so you can tell them apart at a glance.
- Bracket-pair colors, find and selection highlights, sticky scroll, inlay hints and the minimap all use the theme.
- The integrated terminal uses the same 16-color palette as the terminal themes below.

## Terminal themes

The same palette is available for your terminal in [`extras/`](extras):

| Terminal | File | How to install |
| --- | --- | --- |
| Ghostty | `extras/ghostty/Obsidianite` | Copy to `~/.config/ghostty/themes/`, then add `theme = Obsidianite` to your Ghostty config. |
| iTerm2 | `extras/iterm2/Obsidianite.itermcolors` | Double-click the file, or go to Settings → Profiles → Colors → Color Presets → Import. Then pick **Obsidianite** from the same menu. |
| macOS Terminal | `extras/terminal-app/Obsidianite.terminal` | Double-click the file, or go to Settings → Profiles → ⋯ → Import. Then click **Default** to keep it. |

Shell prompts that use the standard color names (fish, Starship, zsh, etc.) pick up the palette automatically.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Credits

Original Obsidian theme by Benny Guo: https://github.com/bennyxguo/Obsidian-Obsidianite