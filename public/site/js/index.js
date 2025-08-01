document.addEventListener('DOMContentLoaded', () => {  
  window.lenis = new Lenis({ autoRaf: true });

  lenis.on('scroll', (e) => {
    // 可以监听滚动
  });
});
