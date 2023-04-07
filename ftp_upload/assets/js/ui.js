AOS.init();

/**
 * ==============================+
 * 탭
 * ==============================+
 */
$(".tab-top > ul > li").click(function () {
    var tabIdx = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".tab-detail").eq(tabIdx).addClass("on").siblings().removeClass("on");
    $(".tab-detail").fadeOut(0);
    $(".tab-detail").eq(tabIdx).fadeIn(600);
});


/**
 * ==============================+
 * 아코디언
 * ==============================+
 */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}


/**
 * ==============================+
 * 애니메이션 정의
 * ==============================+
 */

function animateFrom(elem) {
    var x = 0,
        y = 150,
        delay = 0;
    if (elem.classList.contains("txt-ani")) {
        x = 1000;
        y = 0;
    }

    if (elem.classList.contains("delay-1")) {
        delay = 0.6;
    } else if (elem.classList.contains("delay-2")) {
        delay = 0.9;
    } else if (elem.classList.contains("delay-3")) {
        delay = 1.2;
    }

    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(
        elem,
        { x: x, y: y, autoAlpha: 0 },
        {
            duration: 1.5,
            x: 0,
            y: 0,
            delay: delay,
            autoAlpha: 1,
            stagger: 0.2,
            ease: "expo",
            overwrite: "auto",
        }
    );
}

function hide(elem) {
    gsap.set(elem, { x: 0, y: 0, autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gs-up").forEach(function (elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            // start:"bottom bottom",
            onEnter: function () {
                animateFrom(elem);
            },
            onEnterBack: function () {
                animateFrom(elem);
            },
            onLeave: function () {
                hide(elem);
            },
            delay: function () {
                delay(elem);
            },
        });
    });
});


/**
 * ==============================+
 * 메인 js
 * ==============================+
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let links = gsap.utils.toArray(".main-indicator-wrap a");
links.forEach(a => {
    let element = document.querySelector(a.getAttribute("href")),
        linkST = ScrollTrigger.create({
            trigger: element,
            start: "top top"
        });
    ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onToggle: self => self.isActive && setActive(a)
    });
    a.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: "auto" });
    });
});

function setActive(link) {
    links.forEach(el => el.classList.remove("active"));
    link.classList.add("active");

    if (link.classList.contains("indi-white")) {
        document.querySelector(".main-indicator-wrap").classList.add('white')
        document.querySelector(".menu-toggle").classList.add('white')
        document.querySelector("html").classList.add('bg-black')
    } else {
        document.querySelector(".main-indicator-wrap").classList.remove('white')
        document.querySelector(".menu-toggle").classList.remove('white')
        document.querySelector("html").classList.remove('bg-black')
    }
}

//responsive
let mm = gsap.matchMedia();
mm.add("(min-width: 800px)", () => {
    let panels = gsap.utils.toArray(".main .panel");
    panels.forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom bottom",
            // end: () => "+=" + panel.offsetHeight,
            scrub: true,
            // markers: true,
            onEnter: () => {
                panels.forEach((e) => {
                    e.classList.remove("active");
                });
                panels[i].classList.add("active");
            },
            onEnterBack: () => {
                panels.forEach((e) => {
                    e.classList.remove("active");
                });
                panels[i].classList.add("active");
            }
        });
    });
});
