


var svgviewbox = document.getElementById("svgviewbox");
var curveBg = document.getElementById("curveBg");
var navPath = document.getElementById("navPath");
var textPath = document.getElementById("textPath");


var menuhome = document.querySelector(".menuhome")
var menuprojects = document.querySelector(".menuprojects")
var menuserver = document.querySelector(".menuserver")
var menuflow = document.querySelector(".menuflow")
var menuabout = document.querySelector(".menuabout")

var menus = document.querySelector(".menus")

var strokeWidth = 3

var pathDath = {
    leftTop: 0,
    leftBottom: window.innerHeight / 2 - 100,
    middleDotLeft: 0
}

// M(m) 0(leftTop) 595(leftBottom) C 0(middleDotLeft) 595 337.4 695 843.5 695 1349.6 695 1687 595 1687 595 V 0 H 0 Z


menus.classList.add("showMenu")
setTimeout(() => {
}, 1000);


// FUNCTIONS

function setviewbox(el) {
    el.setAttribute("viewBox", "0 0 " + document.body.clientWidth + " " + (window.innerHeight / 2 + strokeWidth));
}

function setpath(el) {
    el.setAttribute("d",
        "M 0 " + (window.innerHeight / 2 - 100) + " C 0 " + (window.innerHeight / 2 - 100) + " " + (document.body.clientWidth / 5) + " " + (window.innerHeight / 2) + " " + (document.body.clientWidth / 2) + " " + (window.innerHeight / 2) + " " + (document.body.clientWidth - document.body.clientWidth / 5) + " " + (window.innerHeight / 2) + " " + document.body.clientWidth + " " + (window.innerHeight / 2 - 100) + " " + document.body.clientWidth + " " + (window.innerHeight / 2 - 100) + " V 0 H 0 Z");
}

function setNavPath(el) {
    el.setAttribute("stroke-width", strokeWidth);
    el.setAttribute("stroke-linecap", "square");
    el.setAttribute("d", curveBg.getAttribute("d").split(" V")[0])

    // el.setAttribute("transform", "translate(0, " + -strokeWidth / 1 + ")");
}

function navToCurve(el, navSpace) {

    if (!navSpace) {
        navSpace = 0  //0.6~2
    }



    var navs = el.children;
    var navPathData = navPath.getAttribute("d")
    for (var index = 0; index < navs.length; index++) {
        navs[index].style.top = "0px"
        navs[index].style.left = "0px"
        navs[index].style.opacity = 1
        
        navs[index].style.offsetPath = "path('" + navPathData + "')"
        navs[index].style.offsetDistance = ((index * 10) * navSpace) + ((100 - (navs.length - 1) * navSpace * 10) / 2) + "%"
    }
}

function headerImgCenter() {
    var jzimg = document.getElementsByClassName("jzimg")[0]

    var jzimgH = jzimg.getAttribute("height")

    jzimg.setAttribute("y", (window.innerHeight / 2 - jzimgH) / 2)
}


function checkBrower() {


    if (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("iPhone") > -1) {



        var menu = document.getElementsByClassName("menu")
        var menuName = ["项目", "服务", "首页", "流程", "联系"]

        for (let index = 0; index < menu.length; index++) {
            const element = menu[index];

            element.children[1].innerHTML = menuName[index]
            element.style.width = "50px"
            element.style.height = "50px"
            element.children[0].style.fontSize = "1.5rem"
            element.children[1].style.fontSize = "1rem"
        }

        navToCurve(menus, 1.0)
    }
    navToCurve(menus, 1.0)
}






function creatImgDots(params) {
    var girdImgs = document.querySelectorAll(".girdImgs")




    for (let index = 0; index < girdImgs.length; index++) {
        var element = girdImgs[index];
        var gridImg = element.children[0].children

        var imgDots = document.createElement("div")
        imgDots.classList.add("imgDots")

        for (let i = 0; i < gridImg.length; i++) {
            var imgDot = document.createElement("div")
            imgDot.classList.add("imgDot")
            imgDots.append(imgDot)

            var dotImg = gridImg[i].style.backgroundImage
            imgDot.style.backgroundImage = dotImg

            imgDot.addEventListener('click', function (event) {
                event.stopPropagation()

                var cardSliderImgs = this.parentElement.parentElement.children[0]
                var cardSliderImg = cardSliderImgs.children

                for (let index = 0; index < cardSliderImg.length; index++) {
                    var element = cardSliderImg[index];
                    element.style.opacity = 0
                }

                dotbgimg = this.style.backgroundImage.replace("small121x75", "middle1024x735")


                cardSliderImgs.style.backgroundImage = dotbgimg

            }, false)


        }

        element.append(imgDots)
    }

}


function createCardImg() {


    var cardSlider = document.querySelectorAll(".cardSlider")
    for (let index = 0; index < cardSlider.length; index++) {
        var element = cardSlider[index];
        var imgtitle = imageData[index].imgtitle
        var imgsrc = imageData[index].imgsrc

        for (let i = 0; i < imgsrc.length; i++) {
            var imgurl = imgsrc[i];

            var imgdiv = document.createElement("div")
            imgdiv.classList.add("card__img")
            imgdiv.style.backgroundImage = 'url(./' + imgurl + ')'
            element.append(imgdiv)
        }
    }

}


function togglemenutransitionend(istransitionend) {
    if (istransitionend) {
        
        for (let i = 0; i < menus.children.length; i++) {
            const element = menus.children[i];
            element.classList.add("menutransitionend")
        }
    } else {
        for (let i = 0; i < menus.children.length; i++) {
            const element = menus.children[i];
            element.classList.remove("menutransitionend")
        }
    }
}




// const dock = document.getElementById("menus")
// dock.addEventListener('mousemove', e => {
//     console.log("yesend")
//     let sum = 0
//     for (let c of dock.children) {
//         let { offsetLeft: x, clientWidth: w } = c
//         let val = Math.min(((1 + Math.exp(-Math.abs(x - e.clientX + w / 2) / 72)) * 64 | 0) - 64, 32)
//         c.setAttribute('ratio', val)
//         sum += val
//     }
//     for (let c of dock.children)
//         c.style.width = c.style.height = (64 * (1 + c.getAttribute('ratio') / sum)) + 'px'
// })


// MENUS MENU END

// for (let i = 0; i < menus.children.length; i++) {
//     const element = menus.children[i];
//     element.addEventListener('transitionend', function () {
//         element.style.transition = "width 0.3s, height 0.4s, opacity 1.8s ease-in-out"        
//     })    
// }





// INIT VIEWBOX

setviewbox(svgviewbox)
setpath(curveBg)
setNavPath(navPath)

navToCurve(menus)

setTimeout(() => {
    navToCurve(menus, 1)
}, 1000);



headerImgCenter()

createCardImg()

creatImgDots()
checkBrower()






var winw = document.body.clientWidth

// RESIZE WINDOW VIEWBOX

window.addEventListener('resize', reportWindowSize);
window.onresize = reportWindowSize;

function reportWindowSize() {

    setviewbox(svgviewbox)
    setpath(curveBg)
    setNavPath(navPath)
    navToCurve(menus,1)

    if (window.innerWidth < 1000) {
        checkBrower()
    }
}



// var scroll = function() {
//     requestAnimationFrame(scroll);



//     console.log("scroll")
// }

// // Start the rendering loop function
// scroll();





var pageTip = document.querySelector(".pageTip")
// onscroll

var menuOffset = 0;


var card = document.getElementsByClassName("card")





window.addEventListener("scroll", function (e) {


        

    togglemenutransitionend(true)

    setTimeout(() => {
        togglemenutransitionend(false)
    }, 100);

    


    var scrollPos = window.scrollY || window.pageYOffset // pageYOffset for ie

    var newcurvevaule = (window.innerHeight / 2) - (scrollPos / 1.8)

    var menuOffsetScroll = Math.min(menuOffset + scrollPos / document.body.clientWidth, 0.3)


    // MENU 间距



    var scrollPath = "M 0 " + (window.innerHeight / 2 - 100) + " C 0 " + (window.innerHeight / 2 - 100) + " " + (document.body.clientWidth / 5) + " " + newcurvevaule + " " + (document.body.clientWidth / 2) + " " + newcurvevaule + " " + (document.body.clientWidth - document.body.clientWidth / 5) + " " + newcurvevaule + " " + document.body.clientWidth + " " + (window.innerHeight / 2 - 100) + " " + document.body.clientWidth + " " + (window.innerHeight / 2 - 100) + " V 0 H 0 Z"

    if (scrollPos >= 0 && scrollPos < window.innerHeight) {

        curveBg.setAttribute("d", scrollPath)
        navPath.setAttribute("d", scrollPath.split(" V")[0])

        navToCurve(menus, 1 + scrollPos / 1000)

        if (window.innerWidth < 1000) {
            navToCurve(menus, 1.8 + scrollPos / 1000);
        }

        if (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("iPhone" || window.innerWidth < 1000) > -1) {
            navToCurve(menus, 1.8 + scrollPos / 1000)
        }



        pageTip.style.top = Math.min(scrollPos * 2, window.innerHeight / 2 - pageTip.clientHeight) + "px"
    }

})





var clipImg = document.querySelectorAll(".clipImg")
var svgheader = document.getElementById("svgheader")

var mousex = 0;
var mousey = 0;


var eventDirectX = window.innerWidth / 2;
var eventDirectY = window.innerHeight / 2;

window.addEventListener('mousemove', function (e) {

    var clipImage = document.querySelectorAll(".clipImg")

    var imgPosX = 0
    var imgPosY = 0

    if (e.x > eventDirectX) {
        imgPosX = e.x - eventDirectX
    } else {
        imgPosX = e.x - eventDirectX
    }

    if (e.y < eventDirectY) {
        imgPosY = e.y - eventDirectY
    } else {
        imgPosY = e.y - eventDirectY
    }

    eventDirectX = e.x;
    eventDirectY = e.y;

    clipImage.forEach(function (ele, index) {

        imgPoseachX = imgPosX * 10 * ((index - 3) / 100);
        imgPoseachY = imgPosY * 2 * ((index - 3) / 200);

        var sourceX = parseFloat(ele.getAttribute("x"))
        var sourceY = parseFloat(ele.getAttribute("y"))

        ele.setAttribute("x", sourceX + imgPoseachX);
        ele.setAttribute("y", sourceY + imgPoseachY);

    })

});




// pages

navmenus = document.querySelectorAll(".menu")

var pages = document.querySelectorAll(".page")



function togglePageDown() {



    navmenus.forEach(function (item, index) {

        if (pages[index].classList.contains("pagedown")) {
            pages[index].classList.toggle("pagedown")
        }

        pages[index].addEventListener('transitionend', pagetransitionend)


    })
}

function pagetransitionend() {
}



var maskimghome = document.querySelector(".maskimghome")
var maskimgpage = document.querySelector(".maskimgpage")





// page.addEventListener('transitionend', pageend)

navmenus.forEach(function (item, index) {

    item.addEventListener('click', function (event) {
        togglePageDown()

        pages[index].classList.toggle("pagedown");
    })


    item.addEventListener('mouseenter', changePathText, false)
    item.addEventListener('mouseleave', changeOpacity, false)

})


var svgHeadInfo = document.querySelector(".svgHeadInfo")
var textPath = document.querySelector(".textPath")
function changeOpacity() {

    textPath.style.opacity = 0
    textPath.setAttribute("letter-spacing", "300")
    svgHeadInfo.setAttribute("font-size", 24)
}

function changePathText(event) {

    var text = textPath.innerHTML
    var classList = this.classList.value
    textPath.style.opacity = 0
    textPath.setAttribute("letter-spacing", "300")

    console.log(textPath.getAttribute("letter-spacing"))


    svgHeadInfo.setAttribute("font-size", 0)

    // font-size

    if (classList.includes("menuprojects")) {

        textPath.innerHTML = "建筑夜景照明 / 城市景观照明 / 道路桥梁照明 / 商业家居照明 / 广场古建照明 / 迎春灯饰"
        textPath.style.opacity = 1
        textPath.setAttribute("letter-spacing", "3")
    }

    if (classList.includes("menuserver")) {

        textPath.innerHTML = "用专业水平打动您 用敬业态度感动您"
        textPath.style.opacity = 1
        textPath.setAttribute("letter-spacing", "3")
    }

    if (classList.includes("menuhome")) {

        textPath.innerHTML = "专注于照明设计  擅长在灯光设计  出色的灯饰设计"
        textPath.style.opacity = 1
        textPath.setAttribute("letter-spacing", "3")
    }

    if (classList.includes("menuflow")) {

        textPath.innerHTML = "合理有序的流程设计  满足施工效益最大化"
        textPath.style.opacity = 1
        textPath.setAttribute("letter-spacing", "3")
    }

    if (classList.includes("menuabout")) {

        textPath.innerHTML = "TEL: 13640566324   EMail: 504677424@qq.com"
        textPath.style.opacity = 1
        textPath.setAttribute("letter-spacing", "3")
    }
}



// For each panel
pages.forEach(page => {
    // On click, toggle open
    // page.addEventListener('click', toggleOpen)
    // After open is done toggling, toggle active
    page.addEventListener('transitionend', pageend)
})


function pageend(params) {
}

