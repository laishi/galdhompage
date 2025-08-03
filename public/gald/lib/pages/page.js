class PagesManager {
  constructor(selector = ".pages") {
    this.pagesContainer = document.querySelector(selector);
    this.pageList = this.pagesContainer.querySelectorAll(".page");
    this.navs = document.querySelectorAll(".nav");
    this.currentPage = null;

    this.navState = {}

    this.init();
  }

  init() {
    this.navToPage();
    this.expandPagesHeight();
    this.logoScale();
    this.keywordAnimationCycle();
    this.goHome();
    this.hashSroll()
  }

  hashSroll() {
    if (location.hash === '#scroll500') {
      window.scrollTo({
        top: 500,
        behavior: 'smooth' // 可选：平滑滚动
      });
    }

  }



  // gohome 函数：跳转到首页
  goHome() {
    const pageTitle = document.querySelector('.pageTitle');
    const pageTitleImg = document.querySelector('.pageTitle img');
    const pageTitleh3 = document.querySelector('.pageTitle h3');
    const titleh3Text = pageTitleh3.innerText;
    pageTitle.addEventListener('click', () => {
      window.location.href = '/';
    });
    pageTitleImg.addEventListener('mouseover', () => {
      pageTitleh3.innerText = "回到首页";
    });

    pageTitleImg.addEventListener('mouseout', () => {
      pageTitleh3.innerText = titleh3Text;
    });
  }

  navToPage() {
    
    this.navs.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        
        const viewboxHeight = window.CurveHeader?.sideHeight-300;
        console.log("page viewboxHeight: ", viewboxHeight+300);
        
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
        
        this.navState.index = index;
        this.navState.navName = nav.className;
        this.navState.page = this.pageList[index].className;
        this.navState.viewboxHeight = viewboxHeight;
        console.log("this.navState.: ", this.navState);

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
