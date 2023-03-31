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
        y = 150;

    if (elem.classList.contains("gs-left")) {
        x = -150;
        y = 0;
    } else if (elem.classList.contains("gs-right")) {
        x = 150;
        y = 0;
    } else if (elem.classList.contains("txt-ani")) {
        x = 1000;
        y = 0;
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


