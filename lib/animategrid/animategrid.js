// window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;


const grid = document.querySelector(".grid");
// const cards = document.querySelectorAll(".card");




// Get all panels
const cards = document.querySelectorAll(".card");

var preCard
var thisCard

var clickNum = 0


var transitionend = true

function toggleOpen() {
  if (transitionend) {
    
    this.classList.toggle('card--expanded')   
    this.children[0].children[1].style.backgroundColor = "rgba(222, 222, 222, 0.3)"
    this.children[0].children[1].style.color = "rgba(22, 22, 22, 1.0)"
    transitionend = false
  }


}



function toggleActive(event) {
	if (event.propertyName.includes('transform')) {
    // sourceCardImg.src = sourceCardsrc 
  } 

}



cards.forEach(card => {
	// On click, toggle open
	card.addEventListener('click', toggleOpen, false)
	card.addEventListener('transitionend', toggleActive)
})










Promise.all([...Array(10).keys()]).then(() => {
  animateCSSGrid.wrapGrid(grid, {
    duration: 250,
    stagger: 10,
    onStart: elements =>
      // console.log(`started animation for ${elements.length} elements`),
      console.log("finished started " + transitionend),
    onEnd: function (elements) {
      // console.log(`finished animation for ${elements.length} elements`)
      transitionend = true
      console.log("finished elements " + transitionend)

      
    }
      
  });
});


var prePos = 0;

window.addEventListener("scroll", function (e) {

  var scrollPos = window.scrollY || window.pageYOffset // pageYOffset for ie

  var cadExpanded = document.querySelector(".card--expanded")
  if (cadExpanded && transitionend && scrollPos < prePos) {
    cadExpanded.classList.remove('card--expanded') 
    cadExpanded = null
    transitionend = false
    console.log("END scroll:" + transitionend)
  }

  prePos = scrollPos
})






// var preCard
// var thisCard
// grid.addEventListener("click", ev => {

//   if (preCard) {
//     console.log(preCard)
//     preCard.classList.remove("card--expanded");
//   }


//   let target = ev.target;
//   while (target.tagName !== "HTML") {
//     if (target.classList.contains("card") || target.classList.contains("card--expanded")) {
//       target.classList.toggle("card--expanded");
//       thisCard = target
//       preCard = target
//       return;
//     }

//     target = target.parentElement;
    
//   }


  
// });



























// RESIZE WINDOW VIEWBOX

window.addEventListener('resize', reportWindowSize);
window.onresize = reportWindowSize;

function reportWindowSize() {



  // var cardHeight = card[0].offsetHeight

  // var cardimg = document.querySelector(".card__img")

  // var cardimgHeight = cardimg.clientHeight

  // if (cardimgHeight < cardHeight) {
  //   cardimg.style.height = cardHeight + "px"
  // }


// console.log(cardimgHeight)

}

