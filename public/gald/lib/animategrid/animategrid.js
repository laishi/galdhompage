
document.addEventListener('DOMContentLoaded', () => {
    
  const grid = document.querySelector(".grid");
  const cards = document.querySelectorAll(".card");
  const imgDots = document.querySelectorAll(".imgDot");

  function dotOver() {
    imgDots.forEach(dot => {
      dot.addEventListener("mouseover", (e) => {
        const dotEl = e.currentTarget;
        const parent = dotEl.parentElement;      // .imgDots
        const girdImgs = parent.parentElement;   // .girdImgs
        const cardSlider = girdImgs.querySelector(".cardSlider");

        if (!cardSlider) {
          // console.warn("未找到 .cardSlider");
          return;
        }

        const imgs = cardSlider.querySelectorAll(".cardImg");
        const index = Array.from(parent.children).indexOf(dotEl);

        imgs.forEach((img, i) => {
          img.style.opacity = (i === index) ? "1" : "0";
        });
      });

      dot.addEventListener("mouseout", (e) => {
        const dotEl = e.currentTarget;
        const parent = dotEl.parentElement;
        const girdImgs = parent.parentElement;
        const cardSlider = girdImgs.querySelector(".cardSlider");

        if (!cardSlider) return;

        const imgs = cardSlider.querySelectorAll(".cardImg");
        imgs.forEach(img => {
          img.style.opacity = "1";
        });
      });
    });
  }

  dotOver();

 

  function setPagesHeight() {
    const pages = document.querySelector('.pages');
    const pagedown = document.querySelector('.pagedown');
    const pagedownHeight = pagedown.offsetHeight;    
    const homePageHeight = pagedownHeight + 250;
    pages.style.height = `${homePageHeight}px`;
  }

  let transitionEnd = true;

  function toggleOpen() {
    if (transitionEnd) {
      this.classList.toggle('card--expanded');
      window.lenis.resize();
      setPagesHeight();
      // 修改子元素样式
      // const cardInner = this.children[0];
      // if (cardInner && cardInner.children[1]) {
      //   cardInner.children[1].style.backgroundColor = "var(--menu-bg-darker)";
      //   cardInner.children[1].style.color = "rgba(22, 22, 22, 1.0)";
      // }
      transitionEnd = false;
    }
  }

  function toggleActive(event) {
    if (event.propertyName.includes('transform')) {
      // 这里可以做额外处理，当前为空
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', toggleOpen, false);
    card.addEventListener('transitionend', toggleActive);
  });

  // 使用 animateCSSGrid 包装网格动画
  Promise.all([...Array(10).keys()]).then(() => {
    animateCSSGrid.wrapGrid(grid, {
      duration: 250,
      stagger: 10,
      onStart: elements => {
        // console.log("动画开始，transitionEnd 状态：" + transitionEnd);
      },
      onEnd: elements => {
        transitionEnd = true;
        setPagesHeight();
        // console.log("动画结束，transitionEnd 状态：" + transitionEnd);
      }
    });
  });

  let previousScrollPos = 0;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY || window.pageYOffset;
    const expandedCard = document.querySelector(".card--expanded");

    if (expandedCard && transitionEnd && scrollPos < previousScrollPos) {
      expandedCard.classList.remove('card--expanded');
      transitionEnd = false;
      // console.log("滚动关闭卡片，transitionEnd 状态：" + transitionEnd);
    }

    previousScrollPos = scrollPos;
  });



});