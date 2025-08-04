class SlinkyManager {
    constructor(config) {
        this.article = config.article;
        this.sections = Array.from(this.article.querySelectorAll(config.sectionSelector));
        this.compressedHeight = this.sections.length * config.sectionHeight;
        this.windowHeight = window.innerHeight;
        this.articleTop = this.getTop(this.article);
        this.articleBottom = this.articleTop + this.article.offsetHeight;
        this.stickyLatch = false;
        this.resizeDone = null;
        this.initSections();
        this.setupEventListeners();
    }

    getTop(element) {
        let top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while (element);
        return top;
    }

    smoothScroll(top) {
        let windowTop = window.pageYOffset;
        if (top !== windowTop) {
            const direction = top - windowTop > 0 ? 1 : -1;
            const scroll = () => {
                const diff = (top - windowTop) * direction;
                if (diff > 0) {
                    windowTop += Math.min(diff, 30) * direction;
                    window.scrollTo(0, windowTop);
                    window.requestAnimationFrame(scroll);
                }
            };
            window.requestAnimationFrame(scroll);
        }
    }

    initSections() {
        this.sections = this.sections.map((section, i) => {
            const h1 = section.querySelector('h1');
            const progress = h1.querySelector('.progress');
            const height = section.offsetHeight;
            const topLatch = i * 42;
            const top = this.getTop(section);
            h1.onclick = () => this.smoothScroll(top - topLatch);
            return {
                el: section,
                header: h1,
                progress,
                top,
                height,
                topLatch,
                bottomLatch: (this.sections.length - 1 - i) * 42,
                fixed: false
            };
        });
    }

    scrollHandlerInner(section, top) {
        const diff = top - section.top;
        const progressStyle = section.progress.style;
        if (diff >= -section.topLatch) {
            if (diff < section.height) {
                progressStyle.width = Math.min((diff + section.topLatch) / (section.height - 42), 1) * 100 + '%';
            } else if (progressStyle.width !== '100%') {
                progressStyle.width = '100%';
            }
            if (section.fixed !== 'top') {
                section.fixed = 'top';
                section.header.style.cssText = `position:fixed;top:${section.topLatch}px`;
                section.el.style.cssText = 'padding-top:42px';
            }
        } else {
            if (progressStyle.width !== '0px') progressStyle.width = '0px';
            if (diff + this.windowHeight - section.bottomLatch - 42 < 0) {
                if (section.fixed !== 'bottom') {
                    section.fixed = 'bottom';
                    section.header.style.cssText = `position:fixed;bottom:${section.bottomLatch}px`;
                    section.el.style.cssText = 'padding-bottom:42px';
                }
            } else if (section.fixed) {
                section.fixed = false;
                section.el.style.cssText = section.header.style.cssText = '';
            }
        }
    }

    stickToBottom(section) {
        section.fixed = false;
        section.header.style.cssText = `position:absolute;bottom:${section.bottomLatch}px`;
        section.progress.style.width = '100%';
    }

    scrollHandler() {
        
        const top = window.pageYOffset;
        if (this.articleBottom - top < this.compressedHeight) {
            if (!this.stickyLatch) {
                this.stickyLatch = 'bottom';
                this.sections.forEach(s => this.stickToBottom(s));
            }
        } else {
            if (this.stickyLatch) this.stickyLatch = false;
            this.sections.forEach(s => this.scrollHandlerInner(s, top));
        }
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.scrollHandler());
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeDone);
            this.resizeDone = setTimeout(() => {
                this.windowHeight = window.innerHeight;
                this.articleTop = this.getTop(this.article);
                this.articleBottom = this.articleTop + this.article.offsetHeight;
                this.initSections();
                this.scrollHandler();
            }, 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SlinkyManager({
        article: document.querySelector('.gald-article'),
        sectionSelector: '.gald-section',
        sectionHeight: 42
    });
});