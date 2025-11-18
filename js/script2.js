// option-a: js/script.js
// Controles básicos: colapsar, abrir mobile, fechar overlay, acessibilidade
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  const mobileBtn = document.getElementById('mobileBtn');
  const overlay = document.getElementById('overlay');
  const mainContent = document.getElementById('mainContent');

  // Toggle colapsar/expandir (desktop)
  collapseBtn?.addEventListener('click', (ev) => {
    const collapsed = sidebar.classList.toggle('collapsed');
    collapseBtn.setAttribute('aria-pressed', String(collapsed));
    // Força repaint para suavizar transição em alguns navegadores
    window.getComputedStyle(mainContent).marginLeft;
  });

  // Mobile: abrir sidebar
  mobileBtn?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
    overlay.hidden = false;
    overlay.classList.add('active');
  });

  // Fechar clicando no overlay
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    setTimeout(() => overlay.hidden = true, 220);
  });

  // Fechar com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      overlay.hidden = true;
    }
  });
});
