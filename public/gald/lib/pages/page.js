class PagesManager {
  constructor(selector = ".pages") {
    this.pagesContainer = document.querySelector(selector);
    this.pageList = this.pagesContainer.querySelectorAll(".page");
    this.navs = document.querySelectorAll(".nav");
    this.currentPage = null;
    this.navState = {};

    this.init();
  }

  init() {
    this.navToPage();
    this.logoScale();
    this.keywordAnimationCycle();
    this.hashScroll();
  }

  hashScroll() {
    if (location.hash === "#scroll500") {
      window.scrollTo({
        top: 500,
        behavior: "smooth" // 平滑滚动
      });
    }
  }

  navToPage() {
    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        const viewboxHeight = window.CurveHeader?.sideHeight - 300;

        this.pageList.forEach(page => page.classList.remove("pagedown"));
        this.pageList[index].classList.add("pagedown");
        this.logoScale();
        this.currentPage = this.pageList[index];
        
        const pageHeight = this.pageList[index].offsetHeight;
        this.pagesContainer.style.height = `${pageHeight}px`;
        window.lenis.resize();
        window.lenis.scrollTo(viewboxHeight, {
          duration: 1.2,
          easing: t => t * (2 - t)
        });


        this.keywordAnimationCycle();

        this.navState = {
          index: index,
          navName: nav.className,
          page: this.pageList[index].className,
          viewboxHeight: viewboxHeight
        };
      });
    });
  }

  keywordAnimationCycle() {
    const pagedown = this.pagesContainer.querySelector(".pagedown");
    const links = pagedown.querySelectorAll(".keywordsBtn a");

    let currentIndex = 0;

    setInterval(() => {
      links.forEach(link => link.classList.remove("animate-border"));
      links[currentIndex].classList.add("animate-border");
      currentIndex = (currentIndex + 1) % links.length;
    }, 2500);
  }

  logoScale() {
    const pagedown = this.pagesContainer.querySelector(".pagedown");
    const logoImg = pagedown.querySelector(".pageLogo img");
    if (!logoImg) return;

    const logoImgHeight = logoImg.offsetHeight;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const logoHeight = Math.min(128, scrollY);
      logoImg.style.height = `${logoHeight}px`;
    });
  }
}

// 启动
document.addEventListener("DOMContentLoaded", () => {
  new PagesManager();
});
