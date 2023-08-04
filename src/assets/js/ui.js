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

function tabScollHorizen() {
    if (tabScollHorizen.read) {
       return;
    }
    tabScollHorizen = this.scrollWidth - (Math.floor(this.scrollLeft)) === this.clientWidth;
    if(tabScollHorizen == true ){
        $('.bg.hide-pc').css('display','none');
        $('.tab-top ul').css('justify-content','');
    }else{
        $('.bg.hide-pc').css('display','block');
        $('.tab-top ul').css('justify-content','flex-start');
     }
 }
 
 if($(".tab-top ul").length > 0) {
     onload = function () {
        var tabList = document.querySelector(".tab-top ul");
        tabList.onscroll = tabScollHorizen;
     };
 }


/**
 * ==============================+
 * 아코디언
 * ==============================+
 */
// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function () {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     });
// }

// $(".accordion").click(function(){
//     $(this).toggleClass("active");
//     $(this).parents("dl").siblings().find(".accordion").removeClass("active");
//     $(this).next(".panel").slideToggle(300);
//     $(this).parents("dl").siblings().find(".panel").slideUp(300);
// });

$('.accordion').on('click', function (e) {
    e.preventDefault()

    const $siblings = $('.accordion')

    $siblings.next('.panel').slideUp()
    $siblings.removeClass('active')

    const $this = $(this)
    const $parent = $this.parent()
    const $nextToggleContents = $this.next('.panel')

    if ($this.next('.panel').is(':hidden')) {
        $this.addClass('active')
        $nextToggleContents.slideDown(function() {
            var offsetTop = $parent.offset().top;
            var gnbHeight = $(header).outerHeight();

            $('html, body').animate({
                scrollTop: offsetTop - gnbHeight
            }, 200);

            // 화면 너비가 768px보다 작을 경우
            var screenWidth = $(window).width();
            if (screenWidth < 768) {
                var offsetTop = $parent.offset().top;
                var gnbHeight = $(header).outerHeight();

                $('html, body').animate({ 
                    scrollTop: offsetTop - gnbHeight
                }, 100);
            }
        });
    } else {
        $this.removeClass('active')
        $nextToggleContents.slideUp();
    }
})


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
            duration: 1,
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
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// let links = gsap.utils.toArray(".main-indicator-wrap a");
// links.forEach(a => {
//     let element = document.querySelector(a.getAttribute("href")),
//         linkST = ScrollTrigger.create({
//             trigger: element,
//             start: "top top"
//         });
//     ScrollTrigger.create({
//         trigger: element,
//         start: "top center",
//         end: "bottom center",
//         onToggle: self => self.isActive && setActive(a)
//     });
//     a.addEventListener("click", e => {
//         e.preventDefault();
//         gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: "auto" });
//     });
// });

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let links = gsap.utils.toArray(".main-indicator-wrap a");
let currentSpan = document.querySelector(".current"); // current span 요소 선택

links.forEach((a, index) => {
    let element = document.querySelector(a.getAttribute("href")),
        linkST = ScrollTrigger.create({
            trigger: element,
            start: "top top"
        });
    ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
            if (self.isActive) {
                // 링크의 숫자값으로 "current" span 내용 변경
                const linkNumber = index + 1;
                
                if (currentSpan) { // currentSpan이 존재할 경우에만 애니메이션 적용
                    gsap.to(currentSpan, {
                        y: -20, // 위로 20px 이동
                        opacity: 0, // 투명도 0으로 변경
                        duration: 0.2,
                        onComplete: () => {
                            currentSpan.textContent = linkNumber.toString().padStart(2, '0'); // "current" span 내용 변경
                            gsap.to(currentSpan, {
                                y: 0, // 다시 원래 위치로
                                opacity: 1, // 투명도 원래대로
                                duration: 0.2,
                            });
                        }
                    });
                }
                setActive(a);
            }
        }
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
        document.querySelector(".num-box").classList.add('white')
        document.querySelector(".main_logo").classList.add('white')
        document.querySelector(".top-nav").classList.add('white')
        document.querySelector("html").classList.add('bg-black')
    } else {
        document.querySelector(".main-indicator-wrap").classList.remove('white')
        document.querySelector(".menu-toggle").classList.remove('white')
        document.querySelector(".num-box").classList.remove('white')
        document.querySelector(".main_logo").classList.remove('white')
        document.querySelector(".top-nav").classList.remove('white')
        document.querySelector("html").classList.remove('bg-black')
    }

    // 화면 너비가 768px보다 작을 경우
    var header = $("header");
    var screenWidth = $(window).width();
    if (screenWidth < 768) {
        if($(header).hasClass("active") == true) {
            $(".menu-toggle").removeClass("white")
        }
    }

    /* 인트로 추가 */
    if($("#intro-indi").hasClass("active") === true){
        $(".panel").removeClass("active");
        $("#intro").addClass("active");
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