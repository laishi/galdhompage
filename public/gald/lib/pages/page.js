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
    this.expandPagesHeight();
    this.logoScale();
    this.keywordAnimationCycle();
  }

  navToPage() {   
    
    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
      const viewboxHeight = window.CurveHeader?.sideHeight-300;
        this.pageList.forEach(page => page.classList.remove("pagedown"));
        this.pageList[index].classList.add("pagedown");
        
        const pageHeight = this.pageList[index].offsetHeight;
        this.pagesContainer.style.height = `${pageHeight}px`
        this.currentPage = this.pageList[index];

        lenis.scrollTo(viewboxHeight, {
          duration: 1.2,
          easing: (t) => t * (2 - t)
        });

        this.keywordAnimationCycle();


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

  keywordAnimationCycle() {
    const pagedown = this.pagesContainer.querySelector(".pagedown");
    const links = pagedown.querySelectorAll(".keywordsBtn a");
    console.log("this.links: ", links);
    
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
      });
    });
  }


}

// 启动
document.addEventListener("DOMContentLoaded", () => {
  new PagesManager();
});
