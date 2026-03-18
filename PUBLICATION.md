# 🚀 Guia de Teste e Publicação - Obsidianite VS Code Theme

## 📋 Pré-requisitos para Publicação

Antes de publicar no Marketplace, você precisa de:

1. **Conta Microsoft/GitHub** - Para login no Marketplace
2. **Node.js + npm** - Para ferramentas de build
3. **vsce** (VS Code Extension CLI) - Para empacotar a extensão
4. **Conta no Marketplace VS Code** - Para publicar

---

## 🧪 TESTE 1: Teste Local (Desenvolvedor)

### Passo 1: Testar no VS Code

**Método A: Via pasta de extensões**
```bash
# O tema já está em:
# ~/.vscode/extensions/shd0w.obsidianite-vscode-1.0.0

# Reinicie o VS Code
# Vá para: Ctrl+K Ctrl+T (ou Cmd+K Cmd+T no Mac)
# Selecione "Obsidianite" ou "Obsidianite AMOLED"
```

**Método B: Via VS Code Extension Development Host**
```bash
# Abra a pasta da extensão
cd /Users/johnnyrios/.vscode/extensions/shd0w.obsidianite-vscode-1.0.0

# Abra no VS Code
code .

# Pressione F5 para abrir em modo Debug (Extension Development Host)
# Abrirá uma nova janela do VS Code com a extensão carregada
```

### Passo 2: Testes de Validação

- ✅ Cores no editor (syntax highlighting)
- ✅ UI colors (sidebar, status bar, buttons)
- ✅ Hover effects (ciano com borda)
- ✅ Terminal colors (ANSI colors)
- ✅ Git decorations (added/modified/deleted)
- ✅ Ambas variantes: "Obsidianite" e "Obsidianite AMOLED"

### Passo 3: Teste com Múltiplas Linguagens

Crie um arquivo de teste com:
- **JavaScript**: Keywords, strings, comentários
- **Python**: Indentação, decorators
- **HTML/CSS**: Tags, properties
- **Java**: Classes, methods
- **JSON**: Keys, values

---

## 📦 PASSO 1: Instalar ferramentas necessárias

```bash
# Instale Node.js se ainda não tiver:
# https://nodejs.org (recomendado LTS)

# Instale vsce (VS Code Extension CLI)
npm install -g vsce

# Verifique a instalação
vsce --version
```

---

## 🔧 PASSO 2: Preparar a extensão para publicação

### 2.1: Validar o package.json

Seu `package.json` deve ter:

```json
{
  "name": "obsidianite-vscode",
  "displayName": "Obsidianite",
  "version": "1.0.0",
  "publisher": "shd0w",
  "description": "Faithful Obsidianite theme port for VS Code",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-usuario/obsidianite-vscode"
  },
  "keywords": ["theme", "obsidianite", "dark", "dracula-inspired"],
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": ["Themes"],
  "contributes": {
    "themes": [...]
  }
}
```

**⚠️ IMPORTANTE**: Mude `"publisher": "local"` para seu `publisher` ID!

### 2.2: Criar/atualizar arquivos importantes

- **README.md** ✅ (você já tem)
- **LICENSE** (recomendado)

```bash
cd /Users/johnnyrios/.vscode/extensions/shd0w.obsidianite-vscode-1.0.0

# Criar arquivo LICENSE (MIT)
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 Johnny Rios

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

### 2.3: Adicionar .gitignore (se usar Git)

```bash
cat > .gitignore << 'EOF'
node_modules/
*.vsix
.DS_Store
EOF
```

---

## 🔑 PASSO 3: Obter Publisher ID no Marketplace

1. Acesse: https://marketplace.visualstudio.com/manage
2. Faça login com sua conta Microsoft
3. Clique em "Create Publisher" se não tiver um
4. Escolha um nome único (ex: `shd0w`)
5. Copie seu **Publisher ID**

Atualize o `package.json`:

```json
"publisher": "shd0w"
```

---

## 📝 PASSO 4: Empacotar a extensão

```bash
cd /Users/johnnyrios/.vscode/extensions/shd0w.obsidianite-vscode-1.0.0

# Gerar o arquivo .vsix
vsce package

# Resultado: obsidianite-vscode-1.0.0.vsix (criado na pasta raiz)
```

### Teste the .vsix localmente:

```bash
# Abra VS Code
code --install-extension obsidianite-vscode-1.0.0.vsix

# Reinicie e teste o tema
```

---

## 🌐 PASSO 5: Publicar no Marketplace

### Opção 1: Via Web Upload (Mais Simples)

1. Acesse: https://marketplace.visualstudio.com/manage
2. Clique em "+ New Extension"
3. Selecione "Visual Studio Code"
4. Faça upload do arquivo `.vsix`
5. Preencha detalhes
6. Clique "Publish"

### Opção 2: Via CLI (Com Token PAT)

1. Gere um **Personal Access Token (PAT)**:
   - Acesse: https://marketplace.visualstudio.com/manage
   - Crie um novo PAT com permissão "Publish"
   - Copie o token

2. Publique via CLI:

```bash
cd /Users/johnnyrios/.vscode/extensions/shd0w.obsidianite-vscode-1.0.0

vsce publish -p YOUR_PAT_TOKEN

# OU (será pedido o token interativamente)
vsce publish
```

---

## 📈 Após Publicação

### Verificar:
- https://marketplace.visualstudio.com/items?itemName=shd0w.obsidianite-vscode
- Teste a instalação diretamente pelo Marketplace no VS Code

### Atualizar para versão 2.0 (futura):

```json
// package.json
"version": "1.0.1"
```

Depois execute:
```bash
vsce publish patch  # Ou "minor" ou "major"
```

---

## 🐛 Troubleshooting

### Erro: "Publisher not found"
- Verifique que criou o Publisher ID no Marketplace
- Use o nome exato no `package.json`

### Erro: "Invalid .vsix"
```bash
# Valide o package.json
vsce ls

# Recompile
vsce package --out obsidianite.vsix
```

### Tema não aparece após instalar
- Reinicie o VS Code completamente
- Vá para Ctrl+Shift+P → Color Theme
- Procure por "Obsidianite"

---

## 📊 Checklist Final

- [ ] Testou ambas variantes (Obsidianite + AMOLED)
- [ ] Confirmou syntax highlighting em 5+ linguagens
- [ ] Testou hover effects na sidebar
- [ ] Testou terminal colors
- [ ] Updated package.json com publisher ID
- [ ] Criou LICENSE
- [ ] Rodou `vsce package` sem erros
- [ ] Testou .vsix localmente
- [ ] Criou Publisher ID no Marketplace
- [ ] Publicou com sucesso

---

## 📞 Suporte

Se tiver problemas:
1. Confira: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
2. Valide JSON: https://jsonlint.com/
3. Cheque os logs do VS Code: Help > Toggle Developer Tools

Good luck! 🚀
