const navTips = [
    "光爱设计耀夜景 城市地标更璀璨",
    "景观照明快定制 点亮品牌新高度",
    "低成本创高价值 夜景照明引潮流",
    "建筑灯光全适配 视觉体验更出彩",
    "灯光规划巧设计 城市魅力如星河",
    "灵活方案预算优 照明工程好选择",
    "景观商业双亮点 光爱设计赢未来",
    "专业服务真放心 点亮城市快一步"
];

const imageUrls = [
    "/public/gald/img/header/jzled-small.png",
    "https://cn.bing.com/th?id=OHR.VietnamFalls_EN-US9133406245_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4",
    "https://cn.bing.com/th?id=OHR.DelicateArch_EN-US2369284902_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4",
    "https://cn.bing.com/th?id=OHR.IcelandSolstice_EN-US2057542769_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4"
];

class CurveHeader {
    constructor(idName, isdown = true, config = { svgHeight: 10, isdown: true }) {
        this.idName = idName;
        this.config = config;
        this.isdown = isdown;
        this.imageUrls = imageUrls;
        this.navTips = navTips;
        this.imageSourceInfo = {
            background: [[100, 602], [100, 802], [100, 1080], [100, 1280]],
            jzled: [[1189, 547]],
            dancers: [[93, 124], [110, 144], [114, 152], [127, 256], [193, 236]]
        };

        this.initElements();
        this.init();
    }

    initElements() {
        this.svgbox = document.querySelector(`#${this.idName} .svgbox`);
        this.titleInfo = document.querySelector(`#${this.idName} .svgbox .titleInfo`);
        this.subTitle = document.querySelector(`#${this.idName} .svgbox .subTitle`);
        this.headerbg = document.querySelector(`#${this.idName} .headerbgSvg`);
        this.headerbgPath = document.querySelector(`#${this.idName}-headerbgPath`);
        this.useHeaderbgGradient = document.querySelector(`#${this.idName} .headerbg .useHeaderbgGradient`);
        this.headerbgParallaxImages = document.querySelector(`#${this.idName} .headerbg .headerbgParallaxImages`);
        this.headerfg = document.querySelector(`#${this.idName} .headerfgSvg`);
        this.headerPath = document.querySelector(`#${this.idName}-headerPath`);
        this.headerShape = document.querySelector(`#${this.idName}-headerShape`);
        this.curvePath = document.querySelector(`#${this.idName}-curvePath`);
        this.defaultTip = document.querySelector(`#${this.idName} .headerfg .defaultTip`);
        this.navTip = document.querySelector(`#${this.idName} .headerfg .navTip`);
        this.menu = document.querySelector(`#${this.idName} .svgbox .menus`);
        this.navs = document.querySelectorAll(`#${this.idName} .svgbox .menus .nav`);
        this.navLogo = document.querySelector(`#${this.idName} .nav.logo`);
        this.headerImage = document.querySelector(`#${this.idName} .svgbox .headerBackgroundImg`);
        this.girlImg = document.querySelector(`#${this.idName} .girlImg`);
        this.textTip = document.querySelectorAll(`#${this.idName} .svgbox .textTip`);
        this.clipImages = document.querySelectorAll(".clipImg");
        this.dancer = document.querySelectorAll(".dancer");
        this.jzled = document.querySelector(".jzled");
        this.useHeaderbgPathMask = document.querySelector(".useHeaderbgPathMask");

        this.curveData = "";
        this.curveHeight = 0;
        this.curveLength = 0;
        this.currentImageIndex = 0;
        this.viewBoxHeight = 500;
        this.sideHeight = 0;
        this.pathHeight = 0;
        this.scrollY = 0;
        this.lastSetupTime = 0;
        this.cooldown = 1000;
        this.flowEnd = false;
        this.parallaxHandler = null;
    }

    init() {
        this.updatePath(window.scrollY);
        this.lazyImg();
        this.changeHue();
        this.navFlow();
        this.navsTip();
        this.handlerEvent();
    }

    handlerEvent() {
        window.addEventListener('resize', () => {
            this.updatePath();
            this.headerImgPose();
            this.navToCurve()
        });

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY || document.documentElement.scrollTop;
            this.updatePath(this.scrollY);
        });
    }

    updatePath(yScroll = 0) {
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        const curveOffset = Math.max(10, Math.min(25, ww / 100));
        const middleOffset = Math.max(50, ww / 10);
        const svgboxOffsetTop = this.svgbox.offsetTop;
        const relativeScroll = Math.max(0, yScroll - svgboxOffsetTop);
        let limitY = Math.min((middleOffset - curveOffset) * 2, relativeScroll);
        let middleHeight = wh * (this.config.svgHeight / 100);
        let sideHeight = middleHeight - middleOffset;
        let curveHeight = middleHeight - curveOffset - limitY;

        if (!this.config.isdown) {
            sideHeight = middleHeight;
            middleHeight = sideHeight - middleOffset;
            curveHeight = middleHeight + curveOffset + limitY;
        }

        this.sideHeight = sideHeight;
        this.curveHeight = curveHeight;
        const centerLeft = ww * 0.25;
        const centerRight = ww - centerLeft;
        const curveData = `M 0,${sideHeight} Q ${centerLeft},${curveHeight} ${ww / 2},${curveHeight} Q ${centerRight},${curveHeight} ${ww},${sideHeight}`;
        const headData = curveData + ` V 0 H 0 Z`;
        let viewboxHeight = Math.max(curveHeight, sideHeight) + 75;

        this.viewBoxHeight = viewboxHeight;
        this.titleInfo.style.height = `${curveHeight}px`;
        this.svgbox.style.height = `${viewboxHeight}px`;
        this.headerbg.setAttribute("viewBox", `0 0 ${ww} ${viewboxHeight}`);
        this.headerbgPath.setAttribute("d", headData);
        this.headerfg.setAttribute("viewBox", `0 0 ${ww} ${viewboxHeight}`);
        this.headerPath.setAttribute("d", headData);
        this.curvePath.setAttribute("d", curveData);

        const baseOffset = curveOffset * 0.2;
        let shapTopOffset = curveHeight - curveOffset;
        let shapBottomOffset = curveHeight + curveOffset;
        let baseTopHeight = sideHeight - baseOffset / 2;
        let baseBottomHeight = sideHeight + baseOffset / 2;
        const shapTop = `M 0,${baseTopHeight} Q ${centerLeft},${shapTopOffset} ${ww / 2},${shapTopOffset} Q ${centerRight},${shapTopOffset} ${ww},${baseTopHeight} v ${baseOffset}`;
        const shapBottom = ` Q ${centerRight},${shapBottomOffset} ${ww / 2},${shapBottomOffset} Q ${centerLeft},${shapBottomOffset} 0,${baseBottomHeight} Z`;
        const curveOffsetData = shapTop + " " + shapBottom;

        this.headerShape.setAttribute("d", curveOffsetData);
        this.curveData = curveData;
        this.curveLength = this.curvePath.getTotalLength();

        this.updateFun(ww, curveHeight, yScroll);
    }

    updateFun(ww, curveHeight) {
        this.girlCenter(ww, curveHeight);
        this.navToCurve();
        this.headerImgPose();
        this.headerMask();
    }

    headerMask() {
        const maskList = [this.useHeaderbgPathMask];
        const opacity = Math.max(0, Math.min(0.95, this.scrollY / 500));
        this.useHeaderbgPathMask.style.opacity = 0.5;
        maskList.forEach(mask => {
            mask.style.opacity = opacity;
        });
    }

    lazyImg() {
        const lazyElements = document.querySelectorAll(".clipImg:not(.jzled)");
        const jzledElement = document.querySelector(".clipImg.jzled");

        if (jzledElement) {
            const src = jzledElement.getAttribute("data-href");
            if (src) {
                const startTime = performance.now();
                jzledElement.setAttribute("href", src);
                jzledElement.addEventListener("load", () => {
                    const endTime = performance.now();
                    lazyElements.forEach((el) => {
                        const src = el.getAttribute("data-href");
                        el.setAttribute("href", src);
                    });
                    this.headerbgParallaxImages.style.opacity = 0.3;
                    this.headerMask();
                    setTimeout(() => {
                        this.headerbgParallaxImages.style.opacity = 1;
                    }, 3000);
                }, { once: true });
            }
        }
    }

    remap(value, inMin, inMax, outMin, outMax) {
        return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
    }

    changeHue() {
        let hue = 0;
        const root = document.documentElement;
        setInterval(() => {
            hue = (hue + 30) % 360;
            root.style.setProperty('--hue', hue);
        }, 5000);
    }

    headerImgPose() {
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        const originalJzledWidth = this.imageSourceInfo.jzled[0][0];
        const originalJzledHeight = this.imageSourceInfo.jzled[0][1];
        const jzledRatio = originalJzledWidth / originalJzledHeight;

        const maxJzledWidth = Math.min(originalJzledWidth, ww * 0.9);
        const resizeJzledWidth = maxJzledWidth;
        const resizeJzledHeight = resizeJzledWidth / jzledRatio;

        this.jzled.style.transition = "";
        this.jzled.setAttribute("width", resizeJzledWidth);
        this.jzled.setAttribute("height", resizeJzledHeight);
        this.jzled.setAttribute("x", (ww - resizeJzledWidth) / 2);
        this.jzled.setAttribute("y", (this.curveHeight - resizeJzledHeight) / 2);

        this.dancer.forEach((dance, index) => {
            const originalDancerWidth = this.imageSourceInfo.dancers[index][0];
            const originalDancerHeight = this.imageSourceInfo.dancers[index][1];
            const dancerRatio = originalDancerWidth / originalDancerHeight;

            const maxDancerWidth = Math.min(originalDancerWidth, ww * 0.2);
            const resizeDancerWidth = maxDancerWidth;
            const resizeDancerHeight = resizeDancerWidth / dancerRatio;

            dance.style.transition = "";
            dance.setAttribute("width", resizeDancerWidth);
            dance.setAttribute("height", resizeDancerHeight);
            dance.setAttribute("x", (ww - resizeDancerWidth) / 2);
            dance.setAttribute("y", this.curveHeight - resizeDancerHeight);

            setTimeout(() => {
                const randomOffsetX = (Math.random() - 0.5) * resizeJzledWidth;
                const posy = Math.max((this.dancer.length - index) * (-this.curveHeight / 2 / this.dancer.length), -this.curveHeight / 2 + resizeDancerHeight);
                dance.style.transform = `translate(${randomOffsetX}px, ${posy}px)`;
            }, 100);
        });

        const imageStates = Array.from(this.clipImages).map((ele, index) => {
            const x = parseFloat(ele.getAttribute("x")) || 0;
            const y = parseFloat(ele.getAttribute("y")) || 0;
            return {
                ele,
                sourceX: x,
                sourceY: y,
                scale: 0.01 * index
            };
        });

        if (this.parallaxHandler) {
            window.removeEventListener("mousemove", this.parallaxHandler);
        }

        this.parallaxHandler = (e) => {
            const offsetX = e.clientX - ww / 2;
            const offsetY = e.clientY - wh / 2;
            imageStates.forEach(({ ele, sourceX, sourceY, scale }) => {
                const xpos = offsetX * scale;
                const ypos = offsetY * scale;
                ele.setAttribute("x", sourceX + xpos);
                ele.setAttribute("y", sourceY + ypos);
            });
        };

        window.addEventListener("mousemove", this.parallaxHandler);
    }

    girlCenter(width, curveHeight) {
        const imgWidth = 378;
        const imgHeight = 378;
        const girlImg = this.girlImg;

        if (!girlImg) return;

        const tx = width / 2 - imgWidth / 2;
        const ty = curveHeight - imgHeight;
        girlImg.style.transform = `translate(${tx}px, ${ty}px)`;
    }

    navFlow() {
        let fromeSpace = 25;
        const targetSpace = 0;
        this.menu.style.opacity = 1;
        this.flowEnd = false;

        const animate = () => {
            if (fromeSpace > targetSpace) {
                fromeSpace -= 0.5;
                this.navToCurve(fromeSpace);
                requestAnimationFrame(animate);
            } else {
                this.flowEnd = true;
                this.logoNavExpand();
                this.jelly();
            }
        };

        requestAnimationFrame(animate);
    }

    logoNavExpand() {
        let animating = false;
        let animated = false;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                animated = false;
            }
        });

        const setupMouseoverAnimate = (element) => {
            element.addEventListener("mouseover", () => {
                if (window.scrollY !== 0 || animating || animated) return;
                animating = true;
                let space = 0;

                const animate = () => {
                    if (space < 7.5) {
                        space += 0.5;
                        this.navToCurve(space);
                        requestAnimationFrame(animate);
                    } else {
                        animating = false;
                        animated = true;
                    }
                };

                requestAnimationFrame(animate);
            });
        };

        setupMouseoverAnimate(this.navLogo);
        setupMouseoverAnimate(this.headerShape);
    }

    jelly() {
        this.navLogo.classList.add("jelly-animate");
        this.navLogo.addEventListener("animationend", () => {
            this.navLogo.classList.remove("jelly-animate");
        }, { once: true });
    }


    navToCurve(navSpace = 0) {
        const ww = window.innerWidth;
        const maxScale = 1;
        const minScale = 0.8;
        const sizeScale = Math.max(0.5, Math.min(1, ww / 2000));
        const sizeSpace = Math.max(0, 1 - ww / 1000) * 2 + 1;
        const limitScroll = Math.min(Math.max(0, this.scrollY - this.svgbox.offsetTop) / 10, 7.5);

        if (this.flowEnd && Math.max(0, this.scrollY - this.svgbox.offsetTop) === 0) {
            this.jelly();
        }

        const space = navSpace * sizeSpace + limitScroll;
        const navs = Array.from(this.navs);
        const centerIndex = Math.floor((navs.length - 1) / 2);

        // 计算每个导航元素的宽度和缩放因子
        let scaledWidths = [];
        let totalUnit = 0;

        navs.forEach((nav, index) => {
            const distanceFromCenter = Math.abs(index - centerIndex);
            const scaleFactor = this.remap(distanceFromCenter, 0, centerIndex, maxScale, minScale) * sizeScale;
            const widthUnit = scaleFactor;
            scaledWidths.push({ scaleFactor, widthUnit });
            totalUnit += widthUnit;
        });

        // 计算每个单元的百分比
        let unitPercent = (space * (navs.length - 1)) / totalUnit;

        // 应用缩放和位置
        navs.forEach((nav, index) => {
            const { scaleFactor } = scaledWidths[index];
            const distanceFromCenter = index - centerIndex;
            const offset = distanceFromCenter * space; // 使用固定间距
            const navCenterPercent = 50 + offset; // 从中间开始

            nav.style.zIndex = navs.length - Math.abs(distanceFromCenter);
            nav.style.transform = `scale(${scaleFactor})`;
            nav.style.offsetPath = `path("${this.curveData}")`;
            nav.style.offsetDistance = `${navCenterPercent}%`;
        });
    }



    _setNavsOnPath(navSpace = 0) {
        let gap = navSpace / this.curveLength;
        const maxScale = 1;
        const minScale = 0.8;
        const minWidth = Math.min((Math.max(0, (this.scrollY - this.svgbox.offsetTop)) / 100), 1.1);

        if (this.flowEnd) {
            if (Math.max(0, (this.scrollY - this.svgbox.offsetTop)) === 0) {
                this.navLogo.classList.add("jelly-animate");
                this.navLogo.addEventListener("animationend", () => {
                    this.navLogo.classList.remove("jelly-animate");
                }, { once: true });
            }
        }

        const navs = Array.from(this.navs);
        const navCount = navs.length;
        const centerIndex = Math.floor(navCount / 2);
        let widths = navs.map(nav => nav.getBoundingClientRect().width);
        const navWidthPercents = widths.map(width => width / this.curveLength * minWidth);
        let totalOffset = 0;

        for (let i = 0; i < navCount; i++) {
            if (i < centerIndex) {
                totalOffset += navWidthPercents[i] + gap;
            } else if (i === centerIndex && navCount % 2 === 1) {
                totalOffset += navWidthPercents[i] / 2;
            }
        }

        let currentOffset = 0.5 - totalOffset;

        navs.forEach((nav, i) => {
            const distanceFromCenter = Math.abs(i - centerIndex);
            const scaleFactor = this.remap(distanceFromCenter, 0, centerIndex, maxScale, minScale);
            const navWidthPercent = navWidthPercents[i];
            const navCenterPercent = (currentOffset + navWidthPercent / 2) * 100;

            nav.style.offsetPath = `path("${this.curveData}")`;
            nav.style.offsetDistance = `${navCenterPercent}%`;
            nav.style.zIndex = `${100 - distanceFromCenter}`;
            nav.style.transform = `scale(${scaleFactor})`;

            currentOffset += navWidthPercent + gap;
        });
    }

    navsTip() {
        this.menu.style.display = "block";
        const defaultTip = this.defaultTip;
        const navTip = this.navTip;

        defaultTip.style.transition = "letter-spacing 0.3s, opacity 0.3s, transform 0.3s";
        navTip.style.transition = "letter-spacing 0.3s, opacity 0.3s, transform 0.3s";

        this.menu.addEventListener("mouseover", event => {
            const nav = event.target.closest('.nav');
            if (!nav) return;

            defaultTip.style.letterSpacing = '-0.57em';
            defaultTip.style.opacity = '0';

            const index = Array.from(this.navs).indexOf(nav);
            if (index !== -1 && this.navTips[index]) {
                navTip.textContent = this.navTips[index];
            }

            navTip.style.letterSpacing = '0.1em';
            navTip.style.opacity = '1';
        });

        this.menu.addEventListener("mouseout", event => {
            const nav = event.target.closest('.nav');
            if (!nav) return;

            defaultTip.style.letterSpacing = '0.1em';
            defaultTip.style.opacity = '1';
            navTip.style.letterSpacing = '10em';
            navTip.style.opacity = '0';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('scrollY', window.scrollY);
    });

    window.addEventListener('load', () => {
        const savedY = localStorage.getItem('scrollY');
        if (savedY) {
            window.scrollTo(0, parseInt(savedY));
        }
    });

    window.CurveHeader = new CurveHeader('CurveHeader', true, { svgHeight: 80, isdown: true });
});
