document.addEventListener('DOMContentLoaded', () => {  
  window.lenis = new Lenis({ autoRaf: true });

  lenis.on('scroll', (e) => {
    // 可以监听滚动
  });
});


// 等待完整加载
window.addEventListener("load", () => {
  // 等待 lenis 实例准备好
  requestAnimationFrame(() => {
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(0, {
        duration: 1.2,
        easing: t => t * (2 - t)
      });
    } else {
      console.warn("Lenis 未初始化，无法滚动");
    }
  });



  // ScrollReveal().reveal('.card', {
  //   origin: 'bottom',
  //   distance: '100px',
  //   duration: 500,
  //   easing: 'ease-in-out',
  //   reset: true,
  //   interval: 100
  // });


});
