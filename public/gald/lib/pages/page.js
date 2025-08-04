class PagesManager {
  constructor() {
    this.pages = document.querySelector(".pages");
    this.pageList = this.pages.querySelectorAll(".page");
    this.pagedown = this.pages.querySelector(".pagedown");
    this.navs = document.querySelectorAll(".nav");
    this.pageLogo = document.querySelectorAll(".pageLogo");

    this.currentPage = null;
    this.navState = {};

    this.handleEvent();
    this.init();
  }

  handleEvent() {
    window.addEventListener("resize", () => {
      this.setPagesHeight();
    })
  }
  
  init() {
    this.setPagesHeight();
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

  setPagesHeight() {
    const pagedownHeight = this.pagedown.offsetHeight;    
    const homePageHeight = pagedownHeight + 250;
    this.pages.style.height = `${homePageHeight}px`;
    
    // if (this.currentPage) {
    //   const currentPageHeight = this.currentPageHeight.offsetHeight + 250;
    //   this.pages.style.height = `${currentPageHeight}px`;      
    // }

  }

  navToPage() {

    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        const viewboxHeight = window.CurveHeader?.sideHeight - 300;

        this.pageList.forEach(page => page.classList.remove("pagedown"));
        this.pageList[index].classList.add("pagedown");
        this.logoScale();
        this.currentPage = this.pageList[index];
       
        const pageHeight = this.pageList[index].offsetHeight + 250;
        this.pages.style.height = `${pageHeight}px`;

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
    const pagedown = this.pages.querySelector(".pagedown");
    const links = pagedown.querySelectorAll(".keywordsBtn a");

    let currentIndex = 0;

    setInterval(() => {
      links.forEach(link => link.classList.remove("animate-border"));
      links[currentIndex].classList.add("animate-border");
      currentIndex = (currentIndex + 1) % links.length;
    }, 2500);
  }

  logoScale() {
    const pagedown = this.pages.querySelector(".pagedown");
    if (!pagedown) return;
    const logoImg = pagedown.querySelector(".pageLogo img");
    if (!logoImg) return;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const logoHeight = Math.min(128, scrollY*2);
      logoImg.style.height = `${logoHeight}px`;
    });
  }
}

// 启动
document.addEventListener("DOMContentLoaded", () => {
  new PagesManager();
});
