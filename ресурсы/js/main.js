/**
 * ГЛАВНЫЙ JavaScript ФАЙЛ
 * Для сайта "купить-картины.рф"
 */

console.log('🚀 Сайт "купить-картины.рф" загружается...');

// Основная функция инициализации
function initSite() {
    console.log('✨ Инициализация сайта...');
    
    try {
        // 1. Мобильное меню
        setupMobileMenu();
        
        // 2. Кнопки галереи
        setupGalleryButtons();
        
        // 3. Кнопки ИИ-ассистента
        setupAICTAButtons();
        
        // 4. Анимации при скролле
        setupScrollAnimations();
        
        // 5. Эффекты при наведении
        setupHoverEffects();
        
        // 6. Проверка текущей страницы
        highlightCurrentPage();
        
        console.log('✅ Сайт успешно инициализирован');
    } catch (error) {
        console.error('❌ Ошибка инициализации:', error);
    }
}

// Мобильное меню
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) {
        console.log('ℹ️ Меню не найдено на этой странице');
        return;
    }
    
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        if (navList.classList.contains('active')) {
            this.innerHTML = '✕';
            // Анимация пунктов меню
            const items = navList.querySelectorAll('li');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease ' + (index * 0.1) + 's';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            });
        } else {
            this.innerHTML = '☰';
        }
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('active') && 
            !navList.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navList.classList.remove('active');
            menuToggle.innerHTML = '☰';
            menuToggle.classList.remove('active');
        }
    });
    
    console.log('✅ Мобильное меню настроено');
}

// Кнопки галереи
function setupGalleryButtons() {
    const buttons = document.querySelectorAll('.btn-secondary');
    if (buttons.length === 0) return;
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Эффект нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const galleryItem = this.closest('.gallery-item');
            if (!galleryItem) return;
            
            const title = galleryItem.querySelector('h3')?.textContent || 'Картина';
            
            // Анимация "пульсации" для карточки
            galleryItem.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                galleryItem.style.animation = '';
            }, 500);
            
            console.log('🎨 Выбрана картина:', title);
            
            // Перенаправление в ИИ-ассистента
            setTimeout(() => {
                const aiMessage = `Интересует картина: "${title}"`;
                const telegramURL = `https://t.me/ваш_бот?start=${encodeURIComponent(aiMessage)}`;
                window.open(telegramURL, '_blank');
            }, 300);
        });
    });
    
    console.log('✅ Кнопки галереи настроены');
}

// Кнопки ИИ с анимациями
function setupAICTAButtons() {
    const buttons = document.querySelectorAll('.ai-button');
    if (buttons.length === 0) return;
    
    buttons.forEach(button => {
        // Эффект свечения при наведении
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Обработка клика
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.includes('t.me')) {
                return; // Пусть ссылка работает как обычно
            }
            
            e.preventDefault();
            
            // Эффект нажатия
            this.style.transform = 'scale(0.95)';
            
            // Анимация загрузки
            const originalHTML = this.innerHTML;
            this.innerHTML = '<span class="ai-icon">✨</span> <span>Подключаем ИИ...</span>';
            this.style.pointerEvents = 'none';
            
            // Имитация загрузки
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.transform = '';
                this.style.pointerEvents = '';
                
                const pageTitle = document.querySelector('.page-title')?.textContent || 'Главная страница';
                const context = `Пользователь с страницы: ${pageTitle}`;
                const telegramURL = `https://t.me/ваш_бот?start=${encodeURIComponent(context)}`;
                window.open(telegramURL, '_blank');
            }, 1500);
        });
    });
    
    console.log('✅ Кнопки ИИ настроены');
}

// Анимации при скролле
function setupScrollAnimations() {
    // Создаем наблюдатель для анимаций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Для галереи - последовательная анимация
                if (entry.target.classList.contains('gallery-item')) {
                    const galleryItems = document.querySelectorAll('.gallery-item');
                    const index = Array.from(galleryItems).indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 0.1) + 's';
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll('.content-section, .gallery-item, .ai-button-container, .numbered-list');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Эффект параллакса для шапки
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header && scrolled > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
            header.style.backdropFilter = 'blur(15px)';
        } else if (header) {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    console.log('✅ Анимации настроены');
}

// Эффекты при наведении
function setupHoverEffects() {
    // Эффект для карточек
    document.querySelectorAll('.content-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Эффект для картинок галереи
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('✅ Эффекты наведения настроены');
}

// Подсветка текущей страницы в меню
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPath.endsWith(href) || 
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        }
    });
}

// Добавляем CSS анимации
function addAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        /* Плавный переход для всех элементов */
        * {
            transition: background-color 0.3s ease, 
                        color 0.3s ease, 
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Функция для обновления года в футере
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Функция для проверки загрузки изображений
function setupImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('❌ Ошибка загрузки изображения:', this.src);
            // Можно установить заглушку
            // this.src = 'ресурсы/изображения/placeholder.jpg';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM загружен');
    
    // Добавляем CSS анимации
    addAnimationsCSS();
    
    // Инициализируем сайт
    initSite();
    
    // Обновляем год в футере
    updateFooterYear();
    
    // Настраиваем загрузку изображений
    setupImageLoading();
    
    // Логируем информацию о странице
    console.log('🌐 Текущая страница:', window.location.pathname);
    console.log('🖥️ Разрешение:', window.innerWidth, 'x', window.innerHeight);
});

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // На больших экранах скрываем мобильное меню
    if (window.innerWidth > 768 && navList && menuToggle) {
        navList.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.classList.remove('active');
    }
});

// Для отладки - экспортируем функции в глобальную область видимости
if (typeof window !== 'undefined') {
    window.siteDebug = {
        initSite,
        highlightCurrentPage,
        updateFooterYear
    };
}

console.log('✅ Все скрипты загружены и готовы к работе!');