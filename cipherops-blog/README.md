# Andrew Lobo — Security Blog

Blog técnico sobre o ecossistema Microsoft Security. Hospedado via **GitHub Pages** (zero custo, zero servidor).

---

## 🚀 Publicando no GitHub

### 1. Criar o repositório

1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: `security-blog` (ou qualquer nome)
3. Marque **Public**
4. Clique em **Create repository**

### 2. Subir os arquivos

```bash
cd cipherops-blog

git init
git add .
git commit -m "chore: initial blog setup"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/security-blog.git
git push -u origin main
```

### 3. Ativar o GitHub Pages

1. No repositório → **Settings** → **Pages**
2. Em *Source*, selecione **Deploy from a branch**
3. Branch: `main`, pasta: `/ (root)`
4. Clique em **Save**

Seu blog estará em: `https://SEU-USUARIO.github.io/security-blog/`

---

## 📝 Adicionando um novo post

### Passo 1 — Editar o JSON da categoria

Abra o arquivo `posts/[categoria].json` e adicione um novo bloco:

```json
{
  "title":   "Título do Post",
  "date":    "2025-04-01",
  "tag":     "Tutorial",
  "excerpt": "Breve descrição de 1-2 linhas exibida na listagem.",
  "mitre":   ["T1078", "T1110"],
  "url":     "posts/entraid/meu-post.html"
}
```

**Campos:**
| Campo     | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `title`   | ✅ | Título exibido na listagem |
| `date`    | ✅ | Data no formato `AAAA-MM-DD` |
| `tag`     | ✅ | Rótulo curto: `Tutorial`, `IR`, `Hardening`, `Análise` |
| `excerpt` | ✅ | Resumo exibido abaixo do título |
| `mitre`   | ❌ | Array de IDs MITRE ATT&CK (deixe `[]` se não aplicar) |
| `url`     | ✅ | Caminho para o HTML do post |

### Passo 2 — Criar o arquivo HTML do post

Copie o template:

```bash
cp posts/_template.html posts/entraid/meu-post.html
```

Edite o arquivo e preencha:
- `<title>` na `<head>`
- Tag, data, título e badges MITRE nos metadados
- Conteúdo dentro de `<article class="post-content">`
- Link do botão "voltar" com o hash correto (ex: `#entraid`)

### Passo 3 — Publicar

```bash
git add .
git commit -m "post: título do post"
git push
```

O GitHub Pages atualiza em ~30 segundos.

---

## 📁 Estrutura do projeto

```
/
├── index.html              ← Página principal (categorias)
├── style.css               ← Estilos globais
├── app.js                  ← Navegação e carregamento de posts
├── posts/
│   ├── _template.html      ← Template para novos posts
│   ├── entraid.json        ← Lista de posts: Entra ID
│   ├── defender-endpoint.json
│   ├── incident-response.json
│   ├── purview.json
│   ├── intune.json
│   ├── defender-cloud-apps.json
│   ├── hardening.json
│   ├── ofensivo.json
│   └── entraid/
│       └── meu-post.html   ← Arquivos HTML dos posts
└── README.md
```

---

## ➕ Adicionando uma nova categoria

1. Abra `index.html` e copie um bloco `<div class="category-card">` dentro de `.categories-grid`
2. Altere `data-category`, emoji, `card-title` e `card-desc`
3. Adicione o ID em `CATEGORY_LABELS` no `app.js`
4. Crie o arquivo `posts/[nova-categoria].json` com `{ "posts": [] }`

---

## 🔧 Personalizando

- **Cores:** edite as variáveis CSS em `style.css` na seção `:root`
- **Fontes:** troque os imports do Google Fonts em `index.html` e `style.css`
- **Link do GitHub:** substitua `SEU-USUARIO` nos arquivos `index.html` e `_template.html`
