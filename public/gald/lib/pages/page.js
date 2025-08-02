class PagesManager {
  constructor(selector = ".pages") {
    this.pagesContainer = document.querySelector(selector);
    this.pageList = this.pagesContainer.querySelectorAll(".page");
    this.navs = document.querySelectorAll(".nav");
    this.currentPage = null;

    this.init();
  }

  init() {
    this.navToPage();
    this.startKeywordAnimationCycle();
    this.expandPagesHeight();
    this.logoScale();
  }

  navToPage() {
    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        this.pageList.forEach(page => page.classList.remove("pagedown"));
        this.pageList[index].classList.add("pagedown");

        
        const pageHeight = this.pageList[index].offsetHeight;
        this.pagesContainer.style.height = `${pageHeight}px`
        this.currentPage = this.pageList[index];

lenis.scrollTo(550, {
  duration: 1.2,
  easing: (t) => t * (2 - t)
});


      });
    });
  }

  expandPagesHeight() {
    let maxBottom = 0;
    this.pageList.forEach(page => {
      const top = page.offsetTop;
      const height = page.offsetHeight;
      const bottom = top + height;
      if (bottom > maxBottom) {
        maxBottom = bottom;
      }
    });
    this.pagesContainer.style.height = `${maxBottom}px`;
  }

  startKeywordAnimationCycle() {
    const links = document.querySelectorAll(".keywordsBtn a");
    let currentIndex = 0;

    setInterval(() => {
      links.forEach(link => link.classList.remove("animate-border"));
      links[currentIndex].classList.add("animate-border");
      currentIndex = (currentIndex + 1) % links.length;
    }, 2500);
  }

  logoScale() {
    const pagedown = this.pagesContainer.querySelector(".pagedown");
    const pageLogo = document.querySelectorAll(".pageLogo");
    if (!pageLogo) return;

    // const logoHeight = pageLogo[0].offsetHeight;
    // console.log("pageLogo len: ", pageLogo.length);
    
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const logoHeight = Math.min(168, scrollY);
      
      pageLogo.forEach(logo => {
        
        logo.style.height = `${logoHeight}px`;
        console.log(logoHeight);
      });
    });
  }


}

// 启动
document.addEventListener("DOMContentLoaded", () => {
  new PagesManager();
});
