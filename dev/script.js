document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    const mainContent = document.getElementById('main-content');

    // --- DYNAMIC FOOTER YEAR ---
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        const yr = new Date().getFullYear();
        yearEl.textContent = yr > 2025 ? `2025-${String(yr).slice(-2)}` : '2025';
    }

    // --- SETUP FUNCTIONS ---
    setupInteractiveText();
    setupMobileNav(); // <-- New function for the mobile menu
    renderProjects();
    setupInteractiveImage();
    setupScrollBasedAnimations();
    setupCustomCursor();
    setupHeaderInversion();
    setupAdvancedAnimations();
    createFloatingSymbols();
    setupParallax();

    // --- PRELOADER TIMELINE ---
    const tl = gsap.timeline();
    tl.to('.loading-bar', { width: '100%', duration: 2.5, ease: 'power3.inOut' })
        .to('.loading-percent', { innerText: 100, duration: 2.5, ease: 'power3.inOut', snap: 'innerText' }, '<')
        .to('.preloader-content', { opacity: 0, duration: 0.5, ease: 'power1.in' }, '-=0.5')
        .to('.top-gate', { height: 0, duration: 1.2, ease: 'expo.inOut' })
        .to('.bottom-gate', { height: 0, duration: 1.2, ease: 'expo.inOut' }, '<')
        .set('#preloader', { display: 'none' })
        .set(mainContent, { visibility: 'visible' })
        .from('.main-header', { y: '-100%', duration: 1, ease: 'expo.out' }, '-=0.8')
        .from('#hero .main-heading .char', { y: '100%', opacity: 0, stagger: 0.02, duration: 1, ease: 'expo.out' }, '-=1')
        .from('.hero-subtext', { opacity: 0, y: 20, duration: 1, ease: 'expo.out' }, '-=0.8')
        .from(['.hero-graphic', '.hero-blob'], { opacity: 0, scale: 0.5, stagger: 0.05, duration: 1.2, ease: 'expo.out' }, '<');


    // --- FUNCTION DEFINITIONS ---

    // NEW FUNCTION FOR MOBILE NAVIGATION
    function setupMobileNav() {
        const toggleButton = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const navLinks = document.querySelectorAll('.mobile-nav-link');

        if (!toggleButton || !mobileNav) return;

        // Function to close the menu
        const closeMenu = () => {
            toggleButton.classList.remove('is-active');
            mobileNav.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };

        // Toggle menu on button click
        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('is-active');
            mobileNav.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu if a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu if the overlay (background) is clicked
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMenu();
            }
        });
    }

    function createFloatingSymbols() {
        const symbols = ['{}', '/>', ';', '+', '0', '1', 'Σ', '>', '<', '#', '&', '*', '@', '$', '%'];
        document.querySelectorAll('.symbol-container').forEach(container => {
            const symbolCount = container.parentElement.id === 'hero' ? 30 : 10;
            for (let i = 0; i < symbolCount; i++) {
                const span = document.createElement('span');
                span.classList.add('floating-symbol');
                span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                span.style.top = `${Math.random() * 100}%`;
                span.style.left = `${Math.random() * 100}%`;
                span.style.fontSize = `${Math.random() * 14 + 10}px`;
                span.style.opacity = Math.random() * 0.5 + 0.2;
                container.appendChild(span);
            }
        });
    }

    function setupParallax() {
        const parallaxLayers = {
            '.hero-blob': 25,
            '.hero-graphic': 50,
            '.floating-symbol': 60
        };
        let ticking = false;
        let mouseX = 0, mouseY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
            if (!ticking) {
                requestAnimationFrame(() => {
                    for (const layer in parallaxLayers) {
                        if (document.querySelector(layer)) {
                            const speed = parallaxLayers[layer];
                            gsap.to(layer, { x: mouseX * speed, y: mouseY * speed, duration: 1, ease: 'power2.out' });
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function setupInteractiveText(scope = document) {
        scope.querySelectorAll(".interactive-text").forEach(element => {
            if (element.classList.contains('js-processed')) return;
            element.classList.add('js-processed');
            const lines = element.querySelectorAll('.line');
            if (lines.length > 0) {
                lines.forEach(line => {
                    const originalText = line.textContent.trim();
                    line.innerHTML = originalText.split("").map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join("");
                });
            } else {
                const originalText = element.textContent.trim();
                element.innerHTML = originalText.split("").map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join("");
            }
            gsap.utils.toArray(element.querySelectorAll('.char')).forEach(char => {
                char.addEventListener('mouseenter', () => gsap.to(char, { y: -5, scale: 1.2, duration: 0.3, ease: 'power3.out' }));
                char.addEventListener('mouseleave', () => gsap.to(char, { y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }));
            });
        });
    }



    // Global fallback handler for broken card images
    window.handleCardImageError = function(img, title) {
        const wrapper = img.parentElement;
        if (!wrapper) return;
        wrapper.innerHTML = `
            <div class="card-fallback-banner">
                <i class="fas fa-code card-fallback-icon"></i>
                <span class="card-fallback-title">${title}</span>
            </div>
        `;
    };

    async function renderProjects() {
        const projectContainer = document.querySelector('.projects-grid');
        const viewAllContainer = document.getElementById('view-all-container');
        if (!projectContainer) return;

        const defaultProjects = [
            {
                title: "MCD HRMS",
                description: "An enterprise-grade HR management system for tracking employee attendance, payroll, and performance metrics.",
                image: "images/projects/mcd-hrms.png",
                link: "https://mcd-hrms.web.app",
                github: "https://github.com/kuberbassi/mcd-hrms"
            },
            {
                title: "AcadHub",
                description: "A comprehensive academic management system dashboard for streamlining educational workflows and student data tracking.",
                image: "images/projects/acadhub.png",
                link: "https://acadhub.kuberbassi.com",
                github: "https://github.com/kuberbassi/acadhub"
            },
            {
                title: "IndiaOnRoaming",
                description: "A vibrant travel portal showcasing diverse Indian landscapes and simplifying travel bookings with a modern interface.",
                image: "images/projects/indiaonroaming.png",
                link: "https://indiaonroaming.com",
                github: "https://github.com/kuberbassi/indiaonroaming"
            },
            {
                title: "Sugandhmaya",
                description: "A premium e-commerce platform for a luxury fragrance brand, featuring an elegant design and seamless shopping experience.",
                image: "images/projects/sugandhmaya.png",
                link: "https://sugandhmaya.com",
                github: "https://github.com/kuberbassi/sugandhmaya.com"
            },
            {
                title: "Developer Portfolio",
                description: "Interactive dual-path portfolio site showcasing software system architecture and original musical compositions.",
                image: "https://opengraph.githubassets.com/1/kuberbassi/old-portfolio",
                link: "https://kuberbassi.com",
                github: "https://github.com/kuberbassi/old-portfolio"
            },
            {
                title: "Audio Plugin Suite",
                description: "Custom DSP audio processing plugins built for modern music production and real-time mixing workflows.",
                image: "https://opengraph.githubassets.com/1/kuberbassi/audio-plugins",
                link: "https://github.com/kuberbassi",
                github: "https://github.com/kuberbassi"
            },
            {
                title: "Automation Workflows",
                description: "System automation scripts and tools designed for high-efficiency build pipelines and data processing.",
                image: "https://opengraph.githubassets.com/1/kuberbassi/automation-tools",
                link: "https://github.com/kuberbassi",
                github: "https://github.com/kuberbassi"
            },
            {
                title: "Clarity Engine Core",
                description: "Modular software architecture engine focusing on clean code principles and system optimization.",
                image: "https://opengraph.githubassets.com/1/kuberbassi/clarity-engine",
                link: "https://github.com/kuberbassi",
                github: "https://github.com/kuberbassi"
            }
        ];

        let allProjects = defaultProjects;

        // Try reading from LocalStorage Cache first (1 hour TTL)
        const CACHE_KEY = 'kb_github_repos_v2';
        const CACHE_TIME_KEY = 'kb_github_repos_time_v2';
        const ONE_HOUR = 60 * 60 * 1000;

        let cachedProjects = null;
        try {
            const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedTime && cachedData && (Date.now() - parseInt(cachedTime, 10) < ONE_HOUR)) {
                cachedProjects = JSON.parse(cachedData);
            }
        } catch (e) {
            console.warn('LocalStorage read failed:', e);
        }

        if (cachedProjects && Array.isArray(cachedProjects) && cachedProjects.length > 0) {
            allProjects = cachedProjects;
        } else {
            try {
                const res = await fetch('https://api.github.com/users/kuberbassi/repos?sort=updated&per_page=100');
                if (res.ok) {
                    const repos = await res.json();
                    if (Array.isArray(repos) && repos.length > 0) {
                        const fetchedProjects = repos.filter(r => !r.fork).map(r => {
                            const hasLiveUrl = r.homepage && r.homepage.trim() !== '' && r.homepage.startsWith('http');
                            const previewImage = hasLiveUrl
                                ? `https://api.microlink.io/?url=${encodeURIComponent(r.homepage)}&embed=image.url`
                                : `https://opengraph.githubassets.com/1/kuberbassi/${r.name}`;

                            return {
                                title: r.name,
                                description: r.description || 'Open source software project crafted on GitHub.',
                                image: previewImage,
                                link: hasLiveUrl ? r.homepage : r.html_url,
                                github: r.html_url
                            };
                        });
                        if (fetchedProjects.length > 0) {
                            allProjects = fetchedProjects;
                            try {
                                localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedProjects));
                                localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
                            } catch (e) {}
                        }
                    }
                }
            } catch (e) {
                console.warn('GitHub API fetch failed, using curated fallback projects:', e);
            }
        }

        projectContainer.innerHTML = '';
        if (viewAllContainer) viewAllContainer.innerHTML = '';

        let displayedCount = 0;
        const BATCH_SIZE = 6;

        function appendBatch() {
            const batch = allProjects.slice(displayedCount, displayedCount + BATCH_SIZE);
            const newCardElements = [];

            batch.forEach((project, i) => {
                const globalIndex = displayedCount + i + 1;
                const githubLink = project.github
                    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="card-link"><i class="fab fa-github"></i> Code</a>`
                    : '';
                const escapedTitle = project.title.replace(/'/g, "\\'");

                const cardHTML = `
                    <article class="project-card reveal-fade-up">
                        <div class="card-image-wrapper">
                            <img src="${project.image}" alt="${project.title}" class="card-image" loading="lazy" onerror="window.handleCardImageError(this, '${escapedTitle}');">
                        </div>
                        <div class="card-content">
                            <span class="card-number">${globalIndex < 10 ? '0' + globalIndex : globalIndex}</span>
                            <h3 class="card-title">${project.title}</h3>
                            <p class="card-description">${project.description}</p>
                            <div class="card-links">
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-link"><i class="fas fa-external-link-alt"></i> Live Site</a>
                                ${githubLink}
                            </div>
                        </div>
                    </article>
                `;
                projectContainer.insertAdjacentHTML('beforeend', cardHTML);
            });

            // Target newly added project cards for animation
            const allCards = projectContainer.querySelectorAll('.project-card');
            for (let i = displayedCount; i < allCards.length; i++) {
                newCardElements.push(allCards[i]);
            }

            displayedCount += batch.length;
            setupCardHoverEffects();

            // Trigger GSAP entrance animations & refresh ScrollTrigger
            if (newCardElements.length > 0 && window.gsap) {
                gsap.from(newCardElements, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
                if (window.ScrollTrigger) {
                    ScrollTrigger.refresh();
                }
            }

            // Handle Load More Button
            if (viewAllContainer) {
                if (displayedCount < allProjects.length) {
                    viewAllContainer.innerHTML = `
                        <button class="load-more-button" id="load-more-btn">
                            Load More Projects (${allProjects.length - displayedCount} remaining) <i class="fas fa-chevron-down"></i>
                        </button>
                    `;
                    const loadBtn = document.getElementById('load-more-btn');
                    if (loadBtn) {
                        loadBtn.addEventListener('click', appendBatch);
                    }
                } else {
                    viewAllContainer.innerHTML = '';
                }
            }
        }

        appendBatch();
    }

    function setupCardHoverEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -10, duration: 0.4, ease: 'power3.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out' });
            });
        });
    }

    function setupHeaderInversion() {
        const mainHeader = document.querySelector('.main-header');
        if (!mainHeader) return;
        const darkSections = gsap.utils.toArray('.bg-dark');
        const headerHeight = mainHeader.offsetHeight;
        darkSections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: `top ${headerHeight}px`,
                end: `bottom ${headerHeight}px`,
                onEnter: () => mainHeader.classList.add('header-is-inverted'),
                onLeave: () => mainHeader.classList.remove('header-is-inverted'),
                onEnterBack: () => mainHeader.classList.add('header-is-inverted'),
                onLeaveBack: () => mainHeader.classList.remove('header-is-inverted')
            });
        });
    }

    function setupInteractiveImage() {
        const imageContainer = document.querySelector('.floating-image-container');
        if (!imageContainer) return;
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(imageContainer, { duration: 0.8, rotationX: -y / 20, rotationY: x / 20, ease: 'power2.out' });
        });
        imageContainer.addEventListener('mouseleave', () => {
            gsap.to(imageContainer, { duration: 1, rotationX: 0, rotationY: 0, ease: 'elastic.out(1, 0.5)' });
        });
    }

    function setupScrollBasedAnimations() {
        const progressBar = document.getElementById('scroll-progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                progressBar.style.width = scrollHeight > clientHeight ? `${(scrollTop / (scrollHeight - clientHeight)) * 100}%` : '0%';
            });
        }
        gsap.utils.toArray('.reveal-fade-up').forEach(el => {
            gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
        });
        gsap.utils.toArray('.bg-graphic:not(.hero-graphic)').forEach(el => {
            gsap.to(el, {
                scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
                opacity: el.classList.contains('contact-graphic-pulse') ? 0.25 : 1,
                y: (i, target) => (target.parentElement.offsetHeight * 0.1) * (Math.random() - 0.5)
            });
        });
    }

    function setupAdvancedAnimations() {
        if (document.querySelector('.works-graphic-line.line-v')) {
            gsap.from('.works-graphic-line.line-v', {
                scrollTrigger: { trigger: '#works', start: 'top 80%', end: 'bottom top', scrub: 1 },
                scaleY: 0, transformOrigin: 'top'
            });
        }
        if (document.querySelector('.works-graphic-line.line-h')) {
            gsap.from('.works-graphic-line.line-h', {
                scrollTrigger: { trigger: '#works', start: 'top 80%', end: 'bottom top', scrub: 1 },
                scaleX: 0, transformOrigin: 'left'
            });
        }
        if (document.querySelector('.contact-graphic-blob')) {
            gsap.to('.contact-graphic-blob', {
                duration: 20, x: 'random(-50, 50)', y: 'random(-50, 50)', rotation: 'random(-45, 45)',
                repeat: -1, yoyo: true, ease: 'none'
            });
        }
        if (document.querySelector('.floating-symbol')) {
            gsap.utils.toArray('.floating-symbol').forEach(symbol => {
                gsap.to(symbol, {
                    x: `random(-20, 20)`, y: `random(-20, 20)`, duration: `random(10, 20)`,
                    repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
            });
        }
    }

    function setupCustomCursor() {
        const cursorOutline = document.querySelector('.cursor-outline');
        const cursorDot = document.querySelector('.cursor-dot');
        if (!cursorOutline || !cursorDot) return;
        // Only run on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            gsap.set([cursorOutline, cursorDot], { xPercent: -50, yPercent: -50 });
            window.addEventListener('mousemove', e => {
                gsap.to(cursorDot, { duration: 0.2, x: e.clientX, y: e.clientY });
                gsap.to(cursorOutline, { duration: 0.7, x: e.clientX, y: e.clientY, ease: 'power2.out' });
            });
            document.querySelectorAll('a, button, .skill-tag').forEach(el => {
                el.addEventListener('mouseenter', () => gsap.to(cursorOutline, { scale: 1.8, duration: 0.3 }));
                el.addEventListener('mouseleave', () => gsap.to(cursorOutline, { scale: 1, duration: 0.3 }));
            });
        } else {
            // Hide custom cursor on touch devices
            cursorOutline.style.display = 'none';
            cursorDot.style.display = 'none';
        }
    }
});