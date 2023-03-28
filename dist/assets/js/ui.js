/**
 * ==============================+
 * scrollSmooth
 * ==============================+
 */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  smooth: 1,
  effects: true,
});

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

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100,
    delay = 0.3;
  if (elem.classList.contains("gs-left")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs-right")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("delay-1")) {
    delay = 0.6;
  } else if (elem.classList.contains("delay-2")) {
    delay = 0.9;
  } else if (elem.classList.contains("delay-3")) {
    delay = 1.2;
  } else if (elem.classList.contains("delay-4")) {
    delay = 1.5;
  } else if (elem.classList.contains("gs-opacity")) {
    x = 0;
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
      duration: 2,
      x: 0,
      y: 0,
      delay: delay,
      autoAlpha: 1,
      stagger: 0.2,
      ease: "expo",
      overwrite: "auto",
    }
  )
  // gsap.fromTo(".txt-ani", 
  // { 
  //   scale: 0.8 
  // }, {
  //   scale: 1,
  //   delay: 0.8
  // })
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs-up").forEach(function (elem) {
    hide(elem);
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      },
      delay: function() {
        delay(elem)
      }
    });
  });
  
});



/**
 * ==============================+
 * 상단 스플래쉬 이미지 스와이프
 * ==============================+
 */

new Swiper('.splash-swiper', {
  autoplay: {
      delay: 2000,
  },
  speed: 500,
  loop: true,
  watchSlidesProgress: true,
  on: {
      init: function () {
          this.slides.css('overflow', 'hidden');
      },
      progress: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
              var slideProgress = swiper.slides[i].progress;
              var innerOffset = swiper.width * 1;
              var innerTranslate = slideProgress * innerOffset;
              swiper.slides[i].querySelector('img').style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
          }
      },
      touchStart: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = "";
          }
      },
      setTransition: function (speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + "ms";
              swiper.slides[i].querySelector('img').style.transition = speed + "ms";
          }
      }
  }
});

/**
 * ==============================+
 * 프로젝트 스와이프
 * ==============================+
 */

new Swiper('.project-swiper', {
  slidesPerView: 3,
  spaceBetween: 110,
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
      loop:true,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
      },
    }
  },
});
