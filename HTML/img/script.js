document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS ---
    const mobileBtn = document.getElementById('mobile-btn');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-item a'); 
    const navItems = document.querySelectorAll('.nav-item'); // Os LIs que ganham a classe active
    const sections = document.querySelectorAll('section'); 
    const mobileIcon = mobileBtn ? mobileBtn.querySelector('i') : null;
    const header = document.querySelector('header');

    // --- 1. MENU MOBILE (Abrir/Fechar) ---
    function toggleMenu() {
        if (!navList) return;
        const isActive = navList.classList.toggle('active');

        if (mobileIcon) {
            if (isActive) {
                mobileIcon.classList.remove('bi-list');
                mobileIcon.classList.add('bi-x-lg');
            } else {
                mobileIcon.classList.remove('bi-x-lg');
                mobileIcon.classList.add('bi-list');
            }
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Fecha menu ao clicar no link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) toggleMenu();
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('active') && 
            !navList.contains(e.target) && 
            !mobileBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // --- 2. MENU ATIVO (CORRIGIDO) ---
    function activeMenu() {
        let scrollY = window.scrollY;
        
        // Ajuste fino: considera o tamanho do header (aprox 100px) + um respiro
        // Isso faz a troca acontecer um pouco ANTES da seção bater no topo exato
        let headerOffset = 150; 

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerOffset;
            const sectionId = current.getAttribute('id');

            // Se o scroll está DENTRO desta seção
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active de todos
                navItems.forEach(item => item.classList.remove('active'));
                
                // Adiciona active no item que tem o href igual ao ID da seção
                const activeLink = document.querySelector(`.nav-item a[href*=${sectionId}]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    }
    // Otimização: Chama ao rolar e ao carregar a página
    window.addEventListener('scroll', activeMenu);
    activeMenu(); // Chama uma vez pra já carregar certo

    // --- 3. SOMBRA HEADER ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });
});