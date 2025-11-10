/**
 * Modern Portfolio - Main JavaScript
 * Handles navigation, animations, form submission, and project rendering
 */
(function() {
    'use strict';

    /**
     * Configuration
     */
    const CONFIG = {
        selectors: {
            navbar: '#navbar',
            navMenu: '#nav-menu',
            navToggle: '#nav-toggle',
            navLinks: '.nav-link',
            featuredProjects: '#featured-projects',
            additionalProjects: '#additional-projects',
            showMoreBtn: '#show-more-btn',
            contactForm: '#contact-form',
            formMessage: '#form-message',
            tabButtons: '.tab-btn',
            tabPanes: '.tab-pane'
        },
        api: {
            scriptURL: 'https://script.google.com/macros/s/your-google-sheet-id/exec'
        },
        messages: {
            success: 'Message sent successfully! I\'ll get back to you soon.',
            error: 'Failed to send message. Please try again or contact me directly.'
        }
    };

    /**
     * Utility Functions
     */
    const Utils = {
        query(selector, all = false) {
            try {
                return all ? document.querySelectorAll(selector) : document.querySelector(selector);
            } catch (error) {
                console.error(`Error querying selector "${selector}":`, error);
                return null;
            }
        },

        showMessage(element, message, type = 'success') {
            if (!element) return;
            element.textContent = message;
            element.className = `form-message ${type}`;
            element.style.display = 'block';
            
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    };

    /**
     * Navigation Manager
     */
    const Navigation = {
        navbar: null,
        navMenu: null,
        navToggle: null,
        navLinks: null,

        init() {
            this.navbar = Utils.query(CONFIG.selectors.navbar);
            this.navMenu = Utils.query(CONFIG.selectors.navMenu);
            this.navToggle = Utils.query(CONFIG.selectors.navToggle);
            this.navLinks = Utils.query(CONFIG.selectors.navLinks, true);

            if (!this.navbar || !this.navMenu || !this.navToggle) return;

            this.setupScrollEffect();
            this.setupMobileMenu();
            this.setupActiveLinks();
            this.setupSmoothScroll();
        },

        setupScrollEffect() {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            });
        },

        setupMobileMenu() {
            if (!this.navToggle) return;

            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
                document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        },

        setupActiveLinks() {
            const sections = document.querySelectorAll('section[id]');
            
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => observer.observe(section));
        },

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '#!') return;
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    /**
     * Tab Manager
     */
    const TabManager = {
        tabButtons: null,
        tabPanes: null,

        init() {
            this.tabButtons = Utils.query(CONFIG.selectors.tabButtons, true);
            this.tabPanes = Utils.query(CONFIG.selectors.tabPanes, true);

            if (!this.tabButtons || !this.tabPanes) return;

            this.tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    this.switchTab(targetTab, button);
                });
            });
        },

        switchTab(tabName, activeButton) {
            // Remove active class from all buttons and panes
            this.tabButtons.forEach(btn => btn.classList.remove('active'));
            this.tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            activeButton.classList.add('active');

            // Show corresponding pane
            const targetPane = Utils.query(`#${tabName}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        }
    };

    /**
     * Projects Manager
     */
    const ProjectsManager = {
        featuredContainer: null,
        additionalContainer: null,
        showMoreBtn: null,
        isExpanded: false,
        projectsData: [],

        init() {
            if (typeof PROJECTS_DATA === 'undefined') {
                console.warn('PROJECTS_DATA not found');
                return;
            }

            this.projectsData = PROJECTS_DATA;
            this.featuredContainer = Utils.query(CONFIG.selectors.featuredProjects);
            this.additionalContainer = Utils.query(CONFIG.selectors.additionalProjects);
            this.showMoreBtn = Utils.query(CONFIG.selectors.showMoreBtn);

            if (!this.featuredContainer) return;

            this.renderProjects();
            this.setupToggle();
        },

        renderProjects() {
            const featuredProjects = this.projectsData.filter(p => p.featured);
            const additionalProjects = this.projectsData.filter(p => !p.featured);

            if (this.featuredContainer && featuredProjects.length > 0) {
                this.featuredContainer.innerHTML = this.generateProjectsHTML(featuredProjects);
            }

            if (this.additionalContainer && additionalProjects.length > 0) {
                this.additionalContainer.innerHTML = this.generateProjectsHTML(additionalProjects);
                this.additionalContainer.style.display = 'none';
            } else if (this.showMoreBtn) {
                this.showMoreBtn.style.display = 'none';
            }
        },

        generateProjectsHTML(projects) {
            return projects.map(project => `
                <div class="project-card glass-card" data-project-id="${project.id}">
                    <div class="project-image-wrapper">
                        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                        <div class="project-overlay">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class='bx bxl-github'></i></a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i class='bx bx-link-external'></i></a>` : ''}
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-subtitle">${project.subtitle}</p>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary">GitHub</a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary">Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        },

        setupToggle() {
            if (!this.showMoreBtn || !this.additionalContainer) return;

            const hasAdditionalProjects = this.projectsData.some(p => !p.featured);
            if (!hasAdditionalProjects) {
                this.showMoreBtn.style.display = 'none';
                return;
            }

            this.showMoreBtn.addEventListener('click', () => {
                this.isExpanded = !this.isExpanded;
                
                if (this.isExpanded) {
                    this.additionalContainer.style.display = 'grid';
                    this.showMoreBtn.querySelector('.btn-text').textContent = 'Show Less';
                    this.showMoreBtn.classList.add('expanded');
                    
                    // Smooth scroll to additional projects
                    setTimeout(() => {
                        this.additionalContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                } else {
                    this.additionalContainer.style.display = 'none';
                    this.showMoreBtn.querySelector('.btn-text').textContent = 'Show More';
                    this.showMoreBtn.classList.remove('expanded');
                }
            });
        }
    };

    /**
     * Form Manager
     */
    const FormManager = {
        form: null,
        messageElement: null,

        init() {
            this.form = Utils.query(CONFIG.selectors.contactForm);
            this.messageElement = Utils.query(CONFIG.selectors.formMessage);

            if (!this.form) return;

            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        },

        async handleSubmit(e) {
            e.preventDefault();

            if (!this.form || !this.messageElement) return;

            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';

            try {
                const formData = new FormData(this.form);
                const response = await fetch(CONFIG.api.scriptURL, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                Utils.showMessage(this.messageElement, CONFIG.messages.success, 'success');
                this.form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                Utils.showMessage(this.messageElement, CONFIG.messages.error, 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        }
    };

    /**
     * Scroll Animations
     */
    const ScrollAnimations = {
        init() {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements with fade-in-up class
            document.querySelectorAll('.fade-in-up').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        }
    };

    /**
     * Main App
     */
    const App = {
        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        },

        start() {
            try {
                Navigation.init();
                TabManager.init();
                ProjectsManager.init();
                FormManager.init();
                ScrollAnimations.init();
            } catch (error) {
                console.error('Error initializing application:', error);
            }
        }
    };

    // Initialize the application
    App.init();

})();
