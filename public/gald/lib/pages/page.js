function startKeywordAnimationCycle() {
  const links = document.querySelectorAll(".keywordsBtn a");
  let currentIndex = 0;

  setInterval(() => {
    links.forEach(link => link.classList.remove("animate-border"));    
    links[currentIndex].classList.add("animate-border");

    currentIndex = (currentIndex + 1) % links.length;  }, 2500);
    
}

document.addEventListener("DOMContentLoaded", startKeywordAnimationCycle);
