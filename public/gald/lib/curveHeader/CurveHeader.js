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
        this.svgbox = document.querySelector(`#${idName} .svgbox`);
        this.titleInfo = document.querySelector(`#${idName} .svgbox .titleInfo`);
        this.subTitle = document.querySelector(`#${idName} .svgbox .subTitle`);
        this.headerbg = document.querySelector(`#${idName} .headerbgSvg`);
        this.headerbgPath = document.querySelector(`#${idName}-headerbgPath`);
        this.useHeaderbgGradient = document.querySelector(`#${idName} .headerbg .useHeaderbgGradient`);
        this.headerbgParallaxImages = document.querySelector(`#${idName} .headerbg .headerbgParallaxImages`);
        this.headerfg = document.querySelector(`#${idName} .headerfgSvg`);
        this.headerPath = document.querySelector(`#${idName}-headerPath`);
        this.headerShape = document.querySelector(`#${idName}-headerShape`);
        this.curvePath = document.querySelector(`#${idName}-curvePath`);
        this.defaultTip = document.querySelector(`#${idName} .headerfg .defaultTip`);
        this.navTip = document.querySelector(`#${idName} .headerfg .navTip`);
        this.menu = document.querySelector(`#${idName} .svgbox .menus`);
        this.navs = document.querySelectorAll(`#${idName} .svgbox .menus .nav`);
        this.navLogo = document.querySelector(`#${idName} .nav.logo`);
        this.headerImage = document.querySelector(`#${idName} .svgbox .headerBackgroundImg`);
        this.girlImg = document.querySelector(`#${idName} .girlImg`);
        this.textTip = document.querySelectorAll(`#${idName} .svgbox .textTip`);

        this.pages = document.querySelectorAll(".page");
        this.pagedown = document.querySelectorAll(".page.pagedown");
        

        this.curveHeight = 0;
        this.curveLength = 0;
        this.curveData = "";
        this.currentImageIndex = 0;
        this.viewBoxHeight = 0;
        this.pathHeight = 0;
        this.scrollY = 0;
        this.isdown = isdown;
        this.config = config;
        this.imageUrls = imageUrls;
        this.navTips = navTips;
        this.lastSetupTime = 0;
        this.cooldown = 500;
        this.flowEnd = false;
        this.init();
    }

    init() {
        this.updatePath();
        this.lazyImg()
        this.changeHue();
        this.navFlow();
        this.navsTip();
        window.addEventListener('resize', () => {
            this.updatePath();
            this.setupParallaxImages(this.curveHeight);
            
            
        });
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY || document.documentElement.scrollTop;
            this.updatePath(this.scrollY);
        });
    }

    lazyImg() {
        const lazyElements = document.querySelectorAll(".clipImg:not(.jzled)");
        const jzledElement = document.querySelector(".clipImg.jzled");

        // 优先加载 jzled 图片
        if (jzledElement) {
            const src = jzledElement.getAttribute("data-href");
            if (src) {
                console.time("jzledLoad");
                jzledElement.setAttribute("href", src);
                

                // 监听 jzled 图片加载完成
                jzledElement.addEventListener("load", () => {                    
                    this.headerMask(); // 在 jzled 加载完成后调用 headerMask
                    this.updatePath(); // 确保剪裁路径同步更新
                }, { once: true });

                // 错误处理
                jzledElement.addEventListener("error", () => {
                    console.error("Failed to load jzled image:", src);
                }, { once: true });
            } else {
                console.warn("jzled image missing data-href:", jzledElement);
            }
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            const src = el.getAttribute("data-href");
                            if (src) {
                                el.setAttribute("href", src);
                                el.addEventListener("load", () => {
                                }, { once: true });
                            } else {
                                console.warn("No valid image source for:", el);
                            }
                            observer.unobserve(el);
                        }
                    });
                },
                {
                    rootMargin: "200px",
                    threshold: 0.1,
                }
            );

            lazyElements.forEach((el) => {
                observer.observe(el);
            });
        } else {
            // 后备方案：直接加载所有图片
            lazyElements.forEach((el) => {
                const src = el.getAttribute("data-href");
                if (src) {
                    el.setAttribute("href", src);
                } else {
                }
            });
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

    setupParallaxImages(curveHeight) {
        const clipImages = document.querySelectorAll(".clipImg");
        const dancer = document.querySelectorAll(".dancer");
        const rains = document.querySelectorAll(".rain");
        const jzled = document.querySelector(".jzled");
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        // 设置 jzled 位置
        jzled.style.transition = "";
        jzled.setAttribute("x", (ww - 1225) / 2);
        jzled.setAttribute("y", curveHeight / 5);

        // 初始化 imageStates 用于视差效果
        const imageStates = Array.from(clipImages).map((ele, index) => {
            const x = parseFloat(ele.getAttribute("x")) || 0;
            const y = parseFloat(ele.getAttribute("y")) || 0;
            return {
                ele,
                sourceX: x,
                sourceY: y,
                scale: 0.01 * index
            };
        });

        // 设置 dancer 位置
        dancer.forEach((item, index) => {
            // 获取 SVG 初始 x 和 y
            const initialX = parseFloat(item.getAttribute("x")) || 0;
            const initialY = parseFloat(item.getAttribute("y")) || 0;

            // 计算随机位置，基于窗口中心点
            const minX = ww * 0.2;
            const maxX = ww - minX;
            const randomX = minX + Math.random() * (maxX - minX) + initialX; // 结合初始 x

            const minY = curveHeight - (dancer.length - index) * 300;
            const maxY = curveHeight / 5 + 527 * 0.6;
            const yPos = Math.max(minY, maxY) + initialY; // 结合初始 y

            // 应用 transform 确保位置在屏幕内
            item.style.transform = `translate(${randomX}px, ${yPos}px)`;
            item.style.opacity = 1;
        });

        // 视差效果
        window.addEventListener("mousemove", function(e) {
            const offsetX = e.clientX - ww / 2;
            const offsetY = e.clientY - wh / 2;
            imageStates.forEach(({ ele, sourceX, sourceY, scale }) => {
                const xpos = offsetX * scale;
                const ypos = offsetY * scale * 0.01;
                ele.setAttribute("x", sourceX + xpos);
                ele.setAttribute("y", sourceY + ypos);
            });
        });

        // 冷却时间逻辑
        const now = Date.now();
        if (now - this.lastSetupTime < this.cooldown) return;
        this.lastSetupTime = now;
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
        this.menu.style.opacity = 1;
        this.flowEnd = false;
        let space = this.curveLength / this.navs.length;
        const animate = () => {
            if (space > 120) {
                space -= this.navs.length;
                this.setNavsOnPath(space);
                requestAnimationFrame(animate);
            } else {                
                this.flowEnd = true;
                this.logoNavExpand();
                
                this.navLogo.classList.add("jelly-animate");
                this.navLogo.addEventListener("animationend", () => {
                this.navLogo.classList.remove("jelly-animate");
                }, { once: true });
            }
        };
        requestAnimationFrame(animate);
    }

    headerMask() {
        const useHeaderbgPathMask = document.querySelector(".useHeaderbgPathMask");
        useHeaderbgPathMask.style.opacity = 0;
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
                if (space < 120) {
                    space += 10;
                    this.setNavsOnPath(space);
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


    setNavsOnPath(navSpace = 0) {
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

    updatePath(yScroll = 0) {
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        const curveOffset = 25;
        const middleOffset = Math.max(150, ww / 10);
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

        this.curveHeight = curveHeight;
        const centerLeft = ww * 0.25;
        const centerRight = ww - centerLeft;
        const curveData = `M 0,${sideHeight} Q ${centerLeft},${curveHeight} ${ww / 2},${curveHeight} Q ${centerRight},${curveHeight} ${ww},${sideHeight}`;
        const headData = curveData + ` V 0 H 0 Z`;
        let viewboxHeight = Math.max(curveHeight, sideHeight) + 75;
        // viewboxHeight = sideHeight + middleOffset + 50;

        this.titleInfo.style.height = `${curveHeight}px`;
        this.svgbox.style.height = `${viewboxHeight}px`;
        this.headerbg.setAttribute("viewBox", `0 0 ${ww} ${viewboxHeight}`);
        this.headerbgPath.setAttribute("d", headData);
        this.headerfg.setAttribute("viewBox", `0 0 ${ww} ${viewboxHeight}`);
        this.headerPath.setAttribute("d", headData);
        this.curvePath.setAttribute("d", curveData);

        const baseOffset = 10;
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

        
        
        if (Math.abs(curveHeight - sideHeight) > 50) {
            this.subTitle.style.top = `${sideHeight - 50}px`;
            this.subTitle.style.opacity = 1;
        } else {
            this.subTitle.style.opacity = 0;
        }
        
        this.initfun(ww, curveHeight);
        

    }

    initfun(ww, curveHeight) {
        this.setupParallaxImages(curveHeight);
        this.girlCenter(ww, curveHeight);
        this.setNavsOnPath();


        

    }


}

document.addEventListener('DOMContentLoaded', () => {
    window['CurveHeader'] = new CurveHeader('CurveHeader', true, { svgHeight: 80, isdown: true });
});

