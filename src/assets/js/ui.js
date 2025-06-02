$(document).ready(function () {
  //   AOS.init();
  //   $(window).scroll(function () {
  //     var elemTop = $(".pjt-con-wrap").offset().top;
  //     var scrollTop = $(window).scrollTop();
  //     var windowHeight = $(window).height();
  //     if (scrollTop + windowHeight > elemTop) {
  //       AOS.refresh();
  //     }
  //   });
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

function tabScollHorizen() {
  if (tabScollHorizen.read) {
    return;
  }
  tabScollHorizen =
    this.scrollWidth - Math.floor(this.scrollLeft) === this.clientWidth;
  if (tabScollHorizen == true) {
    $(".bg.hide-pc").css("display", "none");
    $(".tab-top ul").css("justify-content", "");
  } else {
    $(".bg.hide-pc").css("display", "block");
    $(".tab-top ul").css("justify-content", "flex-start");
  }
}

if ($(".tab-top ul").length > 0) {
  onload = function () {
    var tabList = document.querySelector(".tab-top ul");
    tabList.onscroll = tabScollHorizen;
  };
}

$(".accordion").on("click", function (e) {
  e.preventDefault();

  const $siblings = $(".accordion");

  // $siblings.next('.panel').slideUp()
  $siblings.removeClass("active");

  const $this = $(this);
  const $parent = $this.parent();
  const $nextToggleContents = $this.next(".panel");

  if ($this.next(".panel").is(":hidden")) {
    $this.addClass("active");
    $nextToggleContents.slideDown(function () {
      var offsetTop = $parent.offset().top;
      var gnbHeight = $(header).outerHeight();

      $("html, body").animate(
        {
          scrollTop: offsetTop - gnbHeight,
        },
        200
      );

      // 화면 너비가 768px보다 작을 경우
      var screenWidth = $(window).width();
      if (screenWidth < 768) {
        var offsetTop = $parent.offset().top;
        var gnbHeight = $(header).outerHeight();

        $("html, body").animate(
          {
            scrollTop: offsetTop - gnbHeight,
          },
          100
        );
      }
    });
  } else {
    $this.removeClass("active");
    $nextToggleContents.slideUp();
  }
});

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
  ScrollTrigger.create({
    trigger: "#thumbnail-grid",
    start: "top 80%",
    end: "bottom center",
    toggleActions: "play none none reverse",
    // markers: true,
    onEnter: () => {
      gsap.to(".portfolio-item", {
        autoAlpha: 1,
        duration: 1.5,
        stagger: 0.1,
      }); // duration과 stagger 값 조정
    },
    onLeaveBack: () => {
      gsap.to(".portfolio-item", {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.05,
      }); // duration과 stagger 값 조정
    },
  });
});

function setActive(link) {
  links.forEach((el) => el.classList.remove("active"));
  link.classList.add("active");
  if (link.classList.contains("indi-white")) {
    document.querySelector(".main-indicator-wrap").classList.add("white");
    document.querySelector(".menu-toggle").classList.add("white");
    document.querySelector(".main_logo").classList.add("white");
    document.querySelector(".top-nav").classList.add("white");
    if (document.querySelector(".layer-header")) {
      document.querySelector(".layer-header").classList.add("white");
    }
  } else {
    document.querySelector(".main-indicator-wrap").classList.remove("white");
    document.querySelector(".menu-toggle").classList.remove("white");
    document.querySelector(".main_logo").classList.remove("white");
    document.querySelector(".top-nav").classList.remove("white");
    if (document.querySelector(".layer-header")) {
      document.querySelector(".layer-header").classList.remove("white");
    }
  }

  // 화면 너비가 768px보다 작을 경우
  var header = $("header");
  var screenWidth = $(window).width();
  if (screenWidth < 768) {
    if ($(header).hasClass("active") == true) {
      $(".menu-toggle").removeClass("white");
      $(".layer-header").removeClass("white");
    }
  }

  /* 인트로 추가 */
  if ($("#intro-indi").hasClass("active") === true) {
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
      },
    });
  });
});

//팝업 열기
function openProjectPopup(projectId, projectTitle, event) {
  clickedThumbnail = event ? event.currentTarget : null;

  const popup = document.getElementById("projectPopup");
  const popupTitle = document.getElementById("popupTitle");
  const popupContent = document.getElementById("popupContent");
  popupTitle.textContent = projectTitle;

  // 팝업 표시
  popup.style.display = "block";
  popup.classList.add("popup-enter");
  document.body.classList.add("popup-open");

  fetch(`${projectId}.html`)
    .then((response) => response.text())
    .then((html) => {
      popupContent.innerHTML = html;
      if (typeof Swiper !== "undefined") {
        new Swiper(".kb-swiper", {
          effect: "fade",
          loop: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }
    })
    .catch((error) => {
      console.error("HTML 파일 로딩 실패:", error);
      popupContent.innerHTML =
        '<div class="loading" style="color: #ff6b6b;"> 정보를 불러오는데 실패했습니다.</div>';
    });
}

// 팝업 닫기
function closeProjectPopup() {
  const popup = document.getElementById("projectPopup");

  popup.classList.remove("popup-enter");
  popup.classList.add("popup-exit");

  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("popup-exit");
    document.body.classList.remove("popup-open");
    if (clickedThumbnail) {
      setTimeout(() => {
        clickedThumbnail.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 100);
    }
  }, 300);
}

// ESC 키로 팝업 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popup = document.getElementById("projectPopup");
    if (popup.style.display === "block") {
      closeProjectPopup();
    }
  }
});
