/**
 * ========================================
 * ACRONIS CYBER CLOUD - DASHBOARD SCRIPT
 * ========================================
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // ========== ELEMENTOS DO DOM ==========
    const sidebar = document.getElementById('sidebar');
    const toggleCollapse = document.getElementById('toggleCollapse');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========================================
    // DESKTOP: COLAPSAR/EXPANDIR SIDEBAR
    // ========================================
    if (toggleCollapse) {
        toggleCollapse.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Salva o estado no localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
            
            // Força recalculo do layout para animações suaves
            if (mainContent) {
                window.getComputedStyle(mainContent).marginLeft;
            }
        });
    }

    // ========================================
    // CARREGAR ESTADO SALVO DA SIDEBAR
    // ========================================
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
    }

    // ========================================
    // MOBILE: ABRIR SIDEBAR
    // ========================================
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('mobile-active');
            sidebarOverlay.classList.add('active');
            
            // Previne scroll do body quando menu está aberto
            document.body.style.overflow = 'hidden';
        });
    }

    // ========================================
    // MOBILE: FECHAR SIDEBAR (OVERLAY)
    // ========================================
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeMobileSidebar();
        });
    }

    // ========================================
    // NAVEGAÇÃO: HIGHLIGHT DO LINK ATIVO
    // ========================================
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos os links
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            
            // Adiciona active ao link clicado
            this.classList.add('active');
            
            // Atualiza título do header
            const linkText = this.querySelector('.nav-label').textContent;
            const headerTitle = document.querySelector('.header-title');
            if (headerTitle) {
                headerTitle.textContent = linkText;
            }
            
            // Fecha sidebar no mobile após clicar
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
            
            // Aqui você pode adicionar navegação real
            console.log('Navegando para:', linkText);
        });
    });

    // ========================================
    // FECHAR SIDEBAR MOBILE COM ESC
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('mobile-active')) {
            closeMobileSidebar();
        }
    });

    // ========================================
    // AJUSTE RESPONSIVO AO REDIMENSIONAR
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Remove classe mobile-active se tela aumentar
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ========================================
    // FUNÇÃO: FECHAR SIDEBAR MOBILE
    // ========================================
    function closeMobileSidebar() {
        sidebar.classList.remove('mobile-active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // ANIMAÇÃO SUAVE PARA TABELA
    // ========================================
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(function(row, index) {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            row.style.transition = 'all 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });

    // ========================================
    // BUSCA NO HEADER (FUNCIONALIDADE EXTRA)
    // ========================================
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            tableRows.forEach(function(row) {
                const text = row.textContent.toLowerCase();
                
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // ========================================
    // BOTÃO REFRESH (FUNCIONALIDADE EXTRA)
    // ========================================
    const refreshBtn = document.querySelector('.action-btn:has(.material-symbols-rounded:contains("refresh"))');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(function(btn) {
        const icon = btn.querySelector('.material-symbols-rounded');
        if (icon && icon.textContent.trim() === 'refresh') {
            btn.addEventListener('click', function() {
                // Adiciona animação de rotação
                icon.style.transition = 'transform 0.6s ease';
                icon.style.transform = 'rotate(360deg)';
                
                setTimeout(function() {
                    icon.style.transform = 'rotate(0deg)';
                }, 600);
                
                console.log('Atualizando dados...');
            });
        }
    });

    // ========================================
    // CONSOLE LOG DE INICIALIZAÇÃO
    // ========================================
    console.log('✅ Dashboard inicializado com sucesso!');
    console.log('📱 Modo Mobile:', window.innerWidth <= 768);
    console.log('📊 Sidebar Estado:', sidebar.classList.contains('collapsed') ? 'Colapsada' : 'Expandida');
});