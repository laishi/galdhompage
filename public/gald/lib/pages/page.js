class PagesManager {
  constructor() {
    this.pages = document.querySelector(".pages");
    this.pageList = this.pages.querySelectorAll(".page");
    this.pageDown = this.pages.querySelector(".pageDown");
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
    this.navToPage();
    this.logoScale();
    this.setPagesHeight();
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
    const pageDownHeight = this.pageDown.offsetHeight;
    const homePageHeight = pageDownHeight + 250;
    this.pages.style.height = `${homePageHeight}px`;
  }


  keywordAnimationCycle(curentPage = this.pageDown) {
    const allLinks = this.pages.querySelectorAll(".keywordsBtn a");
    allLinks.forEach(link => link.classList.remove("animate-border"));

    const links = curentPage.querySelectorAll(".keywordsBtn a");
    let currentIndex = 0;
    setInterval(() => {
      links.forEach(link => link.classList.remove("animate-border"));
      links[currentIndex].classList.add("animate-border");
      currentIndex = (currentIndex + 1) % links.length;
    }, 2500);
  }



  navToPage() {

    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        const viewboxHeight = window.CurveHeader?.sideHeight - 300;

        this.pageList.forEach(page => page.classList.remove("pageDown"));
        this.pageList[index].classList.add("pageDown");
        this.logoScale();
        this.currentPage = this.pageList[index];

        // window.lenis.resize();
        // window.lenis.scrollTo(viewboxHeight, {
        //   duration: 1.2,
        //   easing: t => t * (2 - t)
        // });

        this.pageDown = this.pageList[index];

        this.keywordAnimationCycle( this.pageList[index]);
        this.setPagesHeight()
        this.navState = {
          index: index,
          navName: nav.className,
          page: this.pageList[index].className,
          viewboxHeight: viewboxHeight
        };
      });
    });
  }


  logoScale() {
    const pageDown = this.pages.querySelector(".pageDown");
    if (!pageDown) return;
    const logoImg = pageDown.querySelector(".pageLogo img");
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
