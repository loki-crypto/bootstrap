/**
 * ========================================
 * ICS BACKUPS - DASHBOARD SCRIPT
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
            
            // Adiciona feedback visual durante busca
            if (searchTerm) {
                searchInput.style.borderColor = '#ffc908';
                searchInput.style.boxShadow = '0 0 15px rgba(255, 201, 8, 0.3)';
            } else {
                searchInput.style.borderColor = '';
                searchInput.style.boxShadow = '';
            }
        });
    }

    // ========================================
    // BOTÃO REFRESH (FUNCIONALIDADE EXTRA)
    // ========================================
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(function(btn) {
        const icon = btn.querySelector('.material-symbols-rounded');
        if (icon && icon.textContent.trim() === 'refresh') {
            btn.addEventListener('click', function() {
                // Adiciona animação de rotação
                icon.style.transition = 'transform 0.6s ease';
                icon.style.transform = 'rotate(360deg)';
                
                // Efeito de pulso no botão
                btn.style.boxShadow = '0 0 20px rgba(255, 201, 8, 0.6)';
                
                setTimeout(function() {
                    icon.style.transform = 'rotate(0deg)';
                    btn.style.boxShadow = '';
                }, 600);
                
                console.log('✅ Atualizando dados...');
            });
        }
        
        // Botão adicionar
        if (icon && icon.textContent.trim() === 'add') {
            btn.addEventListener('click', function() {
                console.log('➕ Adicionando novo item...');
                btn.style.transform = 'scale(0.95)';
                setTimeout(function() {
                    btn.style.transform = '';
                }, 150);
            });
        }
    });

    // ========================================
    // HOVER EFFECT NAS LINHAS DA TABELA
    // ========================================
    tableRows.forEach(function(row) {
        row.addEventListener('click', function() {
            // Remove seleção anterior
            tableRows.forEach(function(r) {
                r.classList.remove('table-active');
            });
            
            // Adiciona seleção na linha clicada
            this.classList.add('table-active');
            
            // Atualiza painel de detalhes (simulação)
            const serverName = this.cells[0].textContent;
            const cardHeader = document.querySelector('.card-header span:first-child');
            if (cardHeader) {
                cardHeader.textContent = serverName;
                
                // Efeito visual no card
                const card = cardHeader.closest('.card');
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 0 30px rgba(255, 201, 8, 0.4)';
                
                setTimeout(function() {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 300);
            }
            
            console.log('🖱️ Servidor selecionado:', serverName);
        });
    });

    // ========================================
    // ANIMAÇÃO DOS BOTÕES DO CARD
    // ========================================
    const cardButtons = document.querySelectorAll('.card-body .btn');
    cardButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            const isFailover = this.textContent.includes('Failover') && !this.textContent.includes('Testar');
            
            // Adiciona estado de loading
            this.classList.add('btn-loading');
            this.disabled = true;
            
            setTimeout(function() {
                btn.classList.remove('btn-loading');
                btn.disabled = false;
                
                // Feedback visual
                if (isFailover) {
                    console.log('🔄 Failover executado com sucesso!');
                    showNotification('Failover iniciado com sucesso!', 'success');
                } else {
                    console.log('🧪 Teste de Failover iniciado!');
                    showNotification('Teste de Failover em andamento...', 'info');
                }
            }, 2000);
            
            console.log('🚀 Ação iniciada:', originalText);
        });
    });

    // ========================================
    // SISTEMA DE NOTIFICAÇÕES (SIMULAÇÃO)
    // ========================================
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 32px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(255, 201, 8, 0.95)' : 'rgba(61, 61, 92, 0.95)'};
            color: ${type === 'success' ? '#000000' : '#ffc908'};
            border-radius: 12px;
            border: 2px solid #ffc908;
            box-shadow: 0 8px 20px rgba(255, 201, 8, 0.4);
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ========================================
    // CSS ANIMATIONS DINÂMICAS
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // CONSOLE LOG DE INICIALIZAÇÃO
    // ========================================
    console.log('%c✅ ICS Backups Dashboard Inicializado!', 'color: #ffc908; font-size: 16px; font-weight: bold;');
    console.log('%c📱 Modo Mobile:', window.innerWidth <= 768 ? 'Ativado' : 'Desativado', 'color: #ffc908;');
    console.log('%c📊 Sidebar Estado:', sidebar.classList.contains('collapsed') ? 'Colapsada' : 'Expandida', 'color: #ffc908;');
    console.log('%c🎨 Tema: Escuro com Amarelo (#FFC908)', 'color: #ffc908; font-style: italic;');
});