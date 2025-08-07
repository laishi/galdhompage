class PageArrow {
    constructor() {
        this.galdPages = [
            "/public/gald/pages/001-gald-lighting-design-company.html",
            "/public/gald/pages/002-gald-nightscape-lighting.html",
            "/public/gald/pages/003-gald-architectural-lighting.html",
            "/public/gald/pages/004-gald-lighting-design-price.html",
            "/public/gald/pages/005-gald-pricing.html",
            "/public/gald/pages/006-gald-landscape-lighting.html",
            "/public/gald/pages/007-gald-professional-lighting.html",
            "/public/gald/pages/008-gald-building-facade-lighting.html",
            "/public/gald/pages/009-gald-commercial-lighting.html",
            "/public/gald/pages/010-gald-outdoor-lighting.html",
            "/public/gald/pages/011-gald-municipal-lighting.html",
            "/public/gald/pages/012-gald-lighting-renderings.html",
            "/public/gald/pages/013-gald-lighting-solutions.html",
            "/public/gald/pages/014-gald-lighting-specialist.html",
            "/public/gald/pages/015-gald-heritage-lighting.html",
            "/public/gald/pages/016-gald-bridge-lighting.html",
            "/public/gald/pages/017-gald-company-ranking.html",
            "/public/gald/pages/018-gald-cultural-lighting.html",
            "/public/gald/pages/019-gald-festival-lighting.html",
            "/public/gald/pages/020-gald-flood-lighting.html",
            "/public/gald/pages/021-gald-landmark-lighting.html",
            "/public/gald/pages/022-gald-retail-lighting.html",
            "/public/gald/pages/023-gald-hotel-lighting.html",
            "/public/gald/pages/024-gald-park-lighting.html",
            "/public/gald/pages/025-gald-lighting-control.html"
        ];

        this.keywords = [
            "重庆照明设计公司",
            "重庆夜景灯光设计",
            "重庆建筑亮化工程",
            "重庆灯光设计多少钱",
            "重庆照明设计收费标准",
            "重庆景观照明设计",
            "重庆专业照明设计",
            "重庆楼体亮化设计",
            "重庆商业综合体照明",
            "重庆户外亮化设计",
            "重庆市政照明工程",
            "重庆灯光效果图设计",
            "重庆照明设计方案",
            "重庆专业亮化公司",
            "重庆古建筑照明设计",
            "重庆桥梁亮化工程",
            "重庆灯光设计公司排名",
            "重庆文旅夜景照明",
            "重庆迎春灯会设计",
            "重庆建筑泛光照明",
            "重庆地标建筑照明",
            "重庆商场灯光设计",
            "重庆酒店照明设计",
            "重庆园区亮化设计",
            "重庆灯光控制系统"
        ];

        this.title = document.querySelector(".articleTitle .title");
        this.navTip = document.querySelector(".navTip");
        this.navLeft = document.querySelector(".navLeft");
        this.navRight = document.querySelector(".navRight");

        this.init();
    }

    init() {
        this.navArrow();
    }


    navArrow() {
        const currentPath = window.location.pathname.split("/").pop();
        const currentIndex = this.galdPages.findIndex(path => path.endsWith(currentPath));

        if (currentIndex === -1) return;

        // 设置当前标题
        this.title.innerText = this.keywords[currentIndex];
        const setHover = (button, nextIndex) => {

            if (!button || nextIndex < 0 || nextIndex >= this.galdPages.length) return;

            button.addEventListener("click", () => {
                window.location.href = this.galdPages[nextIndex];
            });

            button.addEventListener("mouseover", () => {
                const navTips = window.CurveHeader.navTips;
                const newTips = [this.keywords[currentIndex-1], "首页", this.keywords[currentIndex+1]]
                window.CurveHeader.navTips = newTips;
                console.log("this.navTip.textContent: ", navTips);
            });


            button.addEventListener("mouseover", () => {
                // console.log("this.navTip.textContent: ", this.navTip.textContent);
            });



        };

        setHover(this.navLeft, currentIndex - 1);
        setHover(this.navRight, currentIndex + 1);
    }


}

document.addEventListener("DOMContentLoaded", () => {
  // 初始化箭头逻辑
  new PageArrow();
});