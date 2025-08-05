document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector(".grid");
  const cards = document.querySelectorAll(".card");
  const imgDots = document.querySelectorAll(".imgDot");

  function dotOver() {
    imgDots.forEach(dot => {
      dot.addEventListener("mouseover", (e) => {
        const dotEl = e.currentTarget;
        const parent = dotEl.parentElement;
        const girdImgs = parent.parentElement;
        const cardSlider = girdImgs.querySelector(".cardSlider");
        if (!cardSlider) return;

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
    const pagedownHeight = pagedown?.offsetHeight || 0;
    const homePageHeight = pagedownHeight + 250;
    pages.style.height = `${homePageHeight}px`;
  }

  let transitionEnd = true;

  function getComputedGridColumns(gridTemplateColumnsValue) {
    return gridTemplateColumnsValue.trim().split(/\s+/).length;
  }

  function updateExpandedCardSpan(card) {
    const gridStyle = window.getComputedStyle(grid);
    const columnCount = getComputedGridColumns(gridStyle.getPropertyValue('grid-template-columns'));

    if (columnCount >= 5) {
      card.style.gridColumn = 'span 3';
      card.style.gridRow = 'span 2';
    } else if (columnCount === 4) {
      card.style.gridColumn = 'span 3';
      card.style.gridRow = 'span 2';
    } else if (columnCount === 3 || columnCount === 2) {
      card.style.gridColumn = 'span 2';
      card.style.gridRow = 'span 1';
    } else {
      card.style.gridColumn = 'span 1';
      card.style.gridRow = 'span 1';
    }
  }

  function toggleOpen() {
    if (transitionEnd) {
      this.classList.toggle('card--expanded');
      if (this.classList.contains('card--expanded')) {
        // updateExpandedCardSpan(this);
      } else {
        // 恢复默认
        this.style.gridColumn = '';
        this.style.gridRow = '';
      }
      window.lenis?.resize?.();
      setPagesHeight();
      transitionEnd = false;
    }
  }

  function toggleActive(event) {
    if (event.propertyName.includes('transform')) {
      // 可拓展
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', toggleOpen, false);
    card.addEventListener('transitionend', toggleActive);
  });

  // AnimateCSSGrid 效果
  Promise.all([...Array(10).keys()]).then(() => {
    animateCSSGrid.wrapGrid(grid, {
      duration: 250,
      stagger: 10,
      onStart: () => {},
      onEnd: () => {
        transitionEnd = true;
        setPagesHeight();
      }
    });
  });

  let previousScrollPos = 0;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY || window.pageYOffset;
    const expandedCard = document.querySelector(".card--expanded");

    if (expandedCard && transitionEnd && scrollPos < previousScrollPos) {
      expandedCard.classList.remove('card--expanded');
      expandedCard.style.gridColumn = '';
      expandedCard.style.gridRow = '';
      transitionEnd = false;
    }

    previousScrollPos = scrollPos;
  });

  // Resize 时更新 expanded card 的 span
  window.addEventListener('resize', () => {
    const expandedCard = document.querySelector(".card--expanded");
    if (expandedCard) {
      updateExpandedCardSpan(expandedCard);
    }
  });

});
