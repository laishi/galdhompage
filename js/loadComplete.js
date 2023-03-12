



document.addEventListener("DOMContentLoaded", () => {

    var projectImgs = document.querySelectorAll(".card__img")
    var gridImg = document.querySelectorAll(".gridImg")



    imgRename1024(projectImgs)
    // imgRename1024(gridImg)



});


function imgRename1024(who) {

    for (let index = 0; index < who.length; index++) {
        const element = who[index];
        var thumbnail = element.style.backgroundImage
        var projectImg = thumbnail.replace("small121x75", "middle1024x735")
        element.style.backgroundImage = projectImg



    }
}
function imgRename1920(who) {

    for (let index = 0; index < who.length; index++) {
        const element = who[index];
        var thumbnail = element.src
        var projectImg = thumbnail.replace("middle1024x735", "large1920x1190")
        element.src = projectImg

    }
}



