document.addEventListener("DOMContentLoaded", function() {
    
    const sidebar = document.getElementById('sidebar');
    const toggleCollapse = document.getElementById('toggleCollapse');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');

    // --- Lógica para Desktop (Colapsar/Expandir com a "setinha") ---
    if (toggleCollapse) {
        toggleCollapse.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Força o navegador a recalcular as transições
            // Isso previne bugs de layout durante a animação
            if (mainContent) {
                window.getComputedStyle(mainContent).marginLeft;
            }
        });
    }

    // --- Lógica para Mobile (Abrir/Fechar Menu Hamburguer) ---
    
    // Abrir sidebar no mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('mobile-active');
            sidebarOverlay.classList.add('active');
        });
    }

    // Fechar sidebar no mobile (clicando no overlay)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-active');
            sidebarOverlay.classList.remove('active');
        });
    }

});