// Accessible navigation and progressive-enhancement effects for the portfolio.
(() => {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Keep anchor navigation functional even when smooth scrolling is disabled.
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            navLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            history.replaceState(null, '', link.getAttribute('href'));
        });
    });

    // Update the active navigation item as the reader moves through the page.
    if ('IntersectionObserver' in window && sections.length) {
        const sectionToLink = new Map(
            navLinks.map((link) => [document.querySelector(link.getAttribute('href')), link])
        );
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => link.classList.remove('active'));
                sectionToLink.get(entry.target)?.classList.add('active');
            });
        }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });
        sections.forEach((section) => navObserver.observe(section));
    }

    // Animate only when supported and when the visitor has not requested reduced motion.
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('main section').forEach((section) => {
            section.classList.add('reveal');
            revealObserver.observe(section);
        });
    }
})();
