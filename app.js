/* ============================================================
   ANDREW LOBO — SECURITY BLOG
   app.js — Navegação entre categorias e carregamento de posts
   ============================================================ */

// Mapeamento: ID da categoria → título exibido na página de posts
const CATEGORY_LABELS = {
  'entraid':            'Entra ID',
  'defender-endpoint':  'Defender for Endpoint',
  'incident-response':  'Incident Response',
  'purview':            'Purview',
  'intune':             'Intune',
  'defender-cloud-apps':'Defender for Cloud Apps',
  'hardening':          'Hardening',
  'ofensivo':           'Segurança Ofensiva',
};

/* ── NAVEGAÇÃO ────────────────────────────────────────────── */

/**
 * Abre a página de uma categoria.
 * Chamado pelo onclick de cada category-card no index.html.
 *
 * @param {string} categoryId - ID da categoria (ex: 'entraid')
 */
function openCategory(categoryId) {
  // Oculta a seção principal e exibe a de posts
  document.querySelector('.hero').classList.add('hidden');
  document.querySelector('.categories-section').classList.add('hidden');
  document.getElementById('posts-section').classList.remove('hidden');

  // Atualiza título e label
  const label = CATEGORY_LABELS[categoryId] || categoryId;
  document.getElementById('posts-category-label').textContent = `// ${categoryId}`;
  document.getElementById('posts-title').textContent = label;

  // Carrega posts do JSON da categoria
  loadPosts(categoryId);

  // Atualiza URL sem reload (permite voltar com o botão do browser)
  history.pushState({ category: categoryId }, '', `#${categoryId}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Volta para a página principal.
 * Chamado pelo botão "← voltar para home".
 */
function goBack() {
  document.querySelector('.hero').classList.remove('hidden');
  document.querySelector('.categories-section').classList.remove('hidden');
  document.getElementById('posts-section').classList.add('hidden');

  history.pushState({}, '', 'index.html');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── CARREGAMENTO DE POSTS ────────────────────────────────── */

/**
 * Carrega o arquivo posts/[categoryId].json e renderiza os cards.
 *
 * Estrutura esperada do JSON:
 * {
 *   "posts": [
 *     {
 *       "title":   "Título do post",
 *       "date":    "2025-01-15",
 *       "tag":     "Tutorial",
 *       "excerpt": "Breve descrição...",
 *       "mitre":   ["T1078", "T1556"],   ← opcional
 *       "url":     "posts/entraid/post-slug.html"
 *     }
 *   ]
 * }
 *
 * @param {string} categoryId
 */
async function loadPosts(categoryId) {
  const container = document.getElementById('posts-list');
  container.innerHTML = '<div class="empty-state"><div class="empty-icon">⏳</div>Carregando posts...</div>';

  try {
    const res = await fetch(`posts/${categoryId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data.posts || data.posts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          Nenhum post publicado ainda nesta categoria.
          <div class="empty-msg">Adicione posts em posts/${categoryId}.json</div>
        </div>`;
      return;
    }

    container.innerHTML = data.posts.map(post => renderPostCard(post)).join('');

  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        Nenhum post publicado ainda nesta categoria.
        <div class="empty-msg">Crie o arquivo posts/${categoryId}.json para começar</div>
      </div>`;
  }
}

/**
 * Gera o HTML de um card de post.
 * @param {Object} post
 * @returns {string} HTML
 */
function renderPostCard(post) {
  const mitreHTML = (post.mitre && post.mitre.length > 0)
    ? `<div class="post-mitre">${post.mitre.map(t => `<span class="mitre-badge">${t}</span>`).join('')}</div>`
    : '';

  const dateFormatted = post.date
    ? new Date(post.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  const href = post.url ? post.url : '#';

  return `
    <a class="post-card" href="${href}">
      <div class="post-meta">
        <span class="post-date">${dateFormatted}</span>
        ${post.tag ? `<span class="post-tag">${post.tag}</span>` : ''}
      </div>
      <div class="post-body">
        <div class="post-title">${post.title}</div>
        <div class="post-excerpt">${post.excerpt || ''}</div>
        ${mitreHTML}
      </div>
    </a>`;
}

/* ── INICIALIZAÇÃO ────────────────────────────────────────── */

// Suporte ao botão voltar do browser
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.category) {
    openCategory(e.state.category);
  } else {
    goBack();
  }
});

// Lê hash da URL na entrada direta (ex: blog/#entraid)
window.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  const hash = window.location.hash.replace('#', '');
  if (hash && CATEGORY_LABELS[hash]) {
    openCategory(hash);
  }
});
