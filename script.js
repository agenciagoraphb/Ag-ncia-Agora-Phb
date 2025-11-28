/**
 * ARQUIVO: script.js
 * FUNCIONALIDADES INCLUÍDAS:
 * 1. Menu Hamburguer (Mobile)
 * 2. Scroll Suave para Âncoras
 * 3. Animação de Revelação ao Scroll (Fade-in/Slide-up)
 * 4. Carrossel de Logos (Loop Infinito Perfeito e Velocidade Corrigida)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências para Menu
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    
    // =======================================================
    // 1. FUNCIONALIDADE DO MENU MOBILE
    // =======================================================
    if (menuToggle && nav) {
        const navLinks = nav.querySelectorAll('a');

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            // Troca o ícone do menu (Font Awesome)
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ícone de fechar (X)
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Ícone de menu (hambúrguer)
            }
        });

        // Fechar o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Fechar apenas se estiver aberto e em tela menor que desktop
                if (window.innerWidth <= 768 && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // =======================================================
    // 2. SCROLL SUAVE PARA ÂNCORAS
    // =======================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                 targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =======================================================
    // 3. ANIMAÇÃO DE REVELAÇÃO AO SCROLL (Intersection Observer)
    // =======================================================
    const elementsToAnimate = document.querySelectorAll(
        '.vantagem-item, .servico-card, .processo-step, .carousel-item, .footer-col'
    );
    
    // Adiciona a classe base para o CSS
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% do elemento visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Chama a função do carrossel após as outras inicializações DOM
    initLogoCarousel(); 
});


// =======================================================
// 4. FUNCIONALIDADE DO CARROSSEL DE LOGOS (Loop Infinito Perfeito)
// =======================================================
function initLogoCarousel() {
    const carouselTrack = document.getElementById('logos-carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselTrack || !carouselContainer) return;

    // Desativa a animação CSS em favor do controle JS
    carouselTrack.style.animation = 'none';

    let scrollAmount = 0;
    const scrollSpeed = 2; // Velocidade em pixels/frame (suave)
    
    // Largura da primeira metade de logos (ponto exato para reinício)
    const totalContentWidth = carouselTrack.scrollWidth / 1; 

    let isPaused = false;
    let animationFrameId;

    function animateScroll() {
        if (!isPaused) {
            scrollAmount += scrollSpeed;
            
            // CONDIÇÃO CORRIGIDA PARA LOOP INFINITO PERFEITO:
            // Reinicia o scrollAmount quando atinge a largura da primeira sequência.
            if (scrollAmount >= totalContentWidth) {
                scrollAmount = 0; 
                // O navegador pula instantaneamente para 0, mas como o conteúdo
                // em 0 é idêntico ao conteúdo em totalContentWidth, não há quebra.
            }

            carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;
        }
        
        // Mantém o loop de animação ativo
        animationFrameId = requestAnimationFrame(animateScroll);
    }

    // Inicia a animação (chamada única)
    animateScroll();

    // Lógica de PAUSA/REINÍCIO ao passar o mouse
    carouselContainer.addEventListener('mouseover', () => {
        isPaused = true;
    });

    carouselContainer.addEventListener('mouseout', () => {
        isPaused = false;
    });
}
