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
$(".tab-top > ul > li > a").click(function () {
  var tabIdx = $(this).parent("li").index();
  $(this).parent("li").addClass("on").siblings().removeClass("on");
  $(".tab-detail").eq(tabIdx).addClass("on").siblings().removeClass("on");
  $(".tab-detail").fadeOut(0);
  $(".tab-detail").eq(tabIdx).fadeIn(600);
});

// function tabScrollHorizen() {
//   // this는 스크롤된 UL 요소
//   var isAtEnd = this.scrollWidth - Math.floor(this.scrollLeft) === this.clientWidth;

//   if (isAtEnd) {
//     $(".bg.hide-pc").css("display", "none");
//     $(".tab-top ul").css("justify-content", "");
//   } else {
//     $(".bg.hide-pc").css("display", "block");
//     $(".tab-top ul").css("justify-content", "flex-start");
//   }
// }

// if ($(".tab-top ul").length > 0) {
//   window.addEventListener("load", function () {
//     var tabList = document.querySelector(".tab-top ul");
//     if (tabList) {
//       tabList.addEventListener("scroll", tabScrollHorizen);
//     }
//   });
// }
// 포트폴리오 PC에서 탭 스크롤
document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('.tab-top ul');
  const bgElem = document.querySelector('.bg.hide-pc');

  if (!tabList) return;

  function tabScrollHorizen() {
    const isAtEnd = tabList.scrollWidth - Math.floor(tabList.scrollLeft) === tabList.clientWidth;
    if (isAtEnd) {
      if (bgElem) bgElem.style.display = 'none';
      tabList.style.justifyContent = '';
    } else {
      if (bgElem) bgElem.style.display = 'block';
      tabList.style.justifyContent = 'flex-start';
    }
  }

  tabList.addEventListener('scroll', tabScrollHorizen);

  let isDown = false;
  let startX;
  let scrollLeft;
  let targetScrollLeft;
  let animationFrameId;

  const smoothScroll = () => {
    const currentScrollLeft = tabList.scrollLeft;
    const distance = targetScrollLeft - currentScrollLeft;
    if (Math.abs(distance) < 0.5) {
      cancelAnimationFrame(animationFrameId);
      return;
    }
    tabList.scrollLeft = currentScrollLeft + distance * 0.2;
    animationFrameId = requestAnimationFrame(smoothScroll);
  };

  tabList.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - tabList.offsetLeft;
    scrollLeft = tabList.scrollLeft;
    targetScrollLeft = scrollLeft;
    tabList.classList.add('dragging');
    document.body.style.userSelect = 'none';
    cancelAnimationFrame(animationFrameId);
  });

  tabList.addEventListener('mouseup', () => {
    isDown = false;
    tabList.classList.remove('dragging');
    document.body.style.userSelect = '';
  });

  tabList.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      tabList.classList.remove('dragging');
      document.body.style.userSelect = '';
    }
  });

  tabList.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tabList.offsetLeft;
    const walk = x - startX;
    targetScrollLeft = scrollLeft - walk;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(smoothScroll);
  });
});
// 포트폴리오 목록 카운팅
document.querySelectorAll('.tab-detail').forEach(tabDetail => {
  tabDetail.querySelectorAll('dl').forEach(dl => {
    const dt = dl.querySelector('dt.accordion');
    const dd = dl.querySelector('dd.panel');
    if (dt && dd) {
      const liCount = dd.querySelectorAll('ul > li').length;
      let sup = dt.querySelector('sup');
      if (!sup) {
        sup = document.createElement('sup');
        dt.appendChild(sup);
      }
      sup.textContent = `(${liCount})`;
    }
  });
});

document.querySelectorAll('li.ing, li.going').forEach(li => {
  const p = li.querySelector('p');
  if (!p) return;

  if (li.classList.contains('ing')) {
    if (!p.querySelector('span') || p.querySelector('span').textContent !== '진행중') {
      const span = document.createElement('span');
      span.textContent = '진행중';
      p.appendChild(span);
    }
  } else if (li.classList.contains('going')) {
    if (!p.querySelector('span') || p.querySelector('span').textContent !== '예정') {
      const span = document.createElement('span');
      span.textContent = '예정';
      p.appendChild(span);
    }
  }
});



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
  // var header = $("header");
  // var screenWidth = $(window).width();
  // if (screenWidth < 768) {
  //   if ($(header).hasClass("active") == true) {
  //     $(".menu-toggle").removeClass("white");
  //     $(".layer-header").removeClass("white");
  //   }
  // }
  

  /* 인트로 추가 */
  if ($("#intro-indi").hasClass("active") === true) {
    $(".panel").removeClass("active");
    $("#intro").addClass("active");
  }
}

/* HEADER */
$(function () {
  var header = $("header");
  var menuIcon = $(".menu-toggle");
  var lastScrollTop = 0;
  var delta = 5;

  // 초기: 화면 너비가 768px보다 작을 경우에만 실행
  var screenWidth = $(window).width();
  if (screenWidth < 768) {
    if (header.hasClass("active")) {
      $(".menu-toggle").removeClass("white");
      $(".layer-header").removeClass("white");
    }
  }

  // 스크롤 이벤트: 화면 너비 상관없이 항상 실행
  $(window).on("scroll", function () {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop) {
      // 스크롤 내려갈 때
      header.addClass("hide-on-scroll");
      menuIcon.addClass("hide-on-scroll");
    } else {
      // 스크롤 올릴 때
      header.removeClass("hide-on-scroll");
      menuIcon.removeClass("hide-on-scroll");
    }

    lastScrollTop = st;
  });
});


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

let clickedThumbnail = null; // 클릭한 썸네일 저장용 변수


// ESC 키로 팝업 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popup = document.getElementById("projectPopup");
    if (popup.style.display === "block") {
      closeProjectPopup();
    }
  }
});

// main masonry
$(document).ready(function () {
  setTimeout(() => window.scrollTo(0, 0), 50);

  const items = Array.from(document.querySelectorAll('.masonry-gallery .portfolio-item'));
  let queue = [];
  let isProcessing = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        queue.push(entry.target);
        observer.unobserve(entry.target);
      }
    });
    processQueue();
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  function processQueue() {
    if (isProcessing) return;
    if (queue.length === 0) return;

    isProcessing = true;
    let i = 0;

    function showNext() {
      if (i >= queue.length) {
        queue = [];
        isProcessing = false;
        return;
      }
      queue[i].classList.add('visible');
      i++;
      setTimeout(showNext, 80);
    }

    showNext();
  }

  function startInitialFadeIn() {
    queue = [];
    isProcessing = false;

    observer.disconnect();

    // 모든 visible 제거
    items.forEach(item => item.classList.remove('visible'));

    // 50ms 딜레이를 준 다음에 순차 fade-in 시작 + observer 재등록
    setTimeout(() => {
      let forceVisible = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].getBoundingClientRect().top < window.innerHeight) {
          forceVisible.push(items[i]);
        } else {
          break;
        }
      }

      // 순차적으로 visible 추가
      forceVisible.forEach((item, idx) => {
        setTimeout(() => item.classList.add('visible'), idx * 100);
      });

      // observer 다시 등록
      items.forEach(item => {
        if (!item.classList.contains('visible')) {
          observer.observe(item);
        }
      });
    }, 0); // <- 여기서 300ms 대기 후 다시 시작
  }


  startInitialFadeIn();
  /* scrollTop:0일때 반복
  let lastScrollY = window.scrollY;

  $(window).on('scroll', function () {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0 && lastScrollY !== 0) {
      queue = [];
      isProcessing = false;

      startInitialFadeIn();
    }
    lastScrollY = currentScrollY;
  });
  */
  $('.portfolio-item').on('mouseenter touchstart', function () {
    $(this).find('.pf-item').addClass('active');
  }).on('mouseleave touchend touchcancel', function () {
    // $(this).removeClass('active');
    $('.pf-item').removeClass('active');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const pfItems = document.querySelectorAll(".pf-item");

  pfItems.forEach((item) => {
    const flips = item.querySelectorAll(".pf-eff.flip");

    // mouseenter
    item.addEventListener("mouseenter", () => {
      gsap.to(flips, {
        rotateY: -180,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

    // mouseleave
    item.addEventListener("mouseleave", () => {
      gsap.to(flips, {
        rotateY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.in"
      });
    });
  });
});

// 메인 포트폴리오 마퀴 & 팝업 열고 닫기
$(function () {
  let clickedThumbnail = null;
  let isPaused = false;

  // ✅ 마퀴 초기화 함수
  function initializeMarquee() {
    $('.pf-list-item').each(function () {
      const $list = $(this);
      const speed = 0.5;
      let items = [];
      let currentY = 0;

      $list.find('li').each(function () {
        const $el = $(this);
        // 높이가 0이면 강제로 visibility: hidden; display:block 으로 임시 측정 가능
        let h = $el.outerHeight(true);
        if (h === 0) {
          $el.css({ visibility: 'hidden', display: 'block' });
          h = $el.outerHeight(true);
          $el.css({ visibility: '', display: '' });
        }
        items.push({ $el: $el, initialY: currentY, y: currentY, h: h });
        currentY += h;
      });

      $list.data('marqueeData', {
        speed: speed,
        totalOffset: 0,
        totalHeight: currentY,
        items: items
      });
    });
  }

  // ✅ 초기화
  initializeMarquee();

  // ✅ resize + orientationchange 시 재계산 (디바운스 + raf)
  let resizeTimer;
  function recalculateOnResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        initializeMarquee();
      });
    }, 200);
  }
  $(window).on('resize orientationchange', recalculateOnResize);

  // aria-hidden 업데이트 함수
  function updateAria($pfItem) {
    const isActive = $pfItem.hasClass('active');
    $pfItem.find('.pf-cont').attr('aria-hidden', isActive ? 'true' : 'false');
    $pfItem.find('.pf-eff').attr('aria-hidden', isActive ? 'false' : 'true');
  }

  // 마퀴 루프
  function loop() {
    if (!isPaused) {
      $('.pf-item.active').each(function () {
        const $pfItem = $(this);
        const $list = $pfItem.find('.pf-list-item');
        const data = $list.data('marqueeData');
        if (!data) return;

        data.totalOffset -= data.speed;
        if (data.totalOffset <= -data.totalHeight) {
          data.totalOffset += data.totalHeight;
        }

        data.items.forEach(function (item) {
          let y = item.initialY + data.totalOffset;
          if (y <= -item.h) {
            y += data.totalHeight;
          }
          item.$el.css('transform', 'translateY(' + y + 'px)');
        });
      });
    }
    requestAnimationFrame(loop);
  }
  loop();

  // .pf-item에 hover 시 active 추가/제거 + aria 업데이트
  $('.pf-item').on('mouseenter pointerenter', function () {
    $(this).addClass('active');
    updateAria($(this));
  }).on('mouseleave pointerleave', function () {
    $(this).removeClass('active');
    updateAria($(this));
  });

  // li에 마우스 오버 시 멈춤, 벗어나면 재개
  $('.pf-list-item').on('mouseenter', 'li', function () {
    isPaused = true;
  }).on('mouseleave', 'li', function () {
    isPaused = false;
  });

  // 팝업 열기 함수
  window.openProjectPopup = function (projectId, projectTitle, initialIndex = 0, event) {
    initialIndex = parseInt(initialIndex, 10) || 0;
    if (event && event.currentTarget) {
      clickedThumbnail = event.currentTarget;
    }

    // 모든 pf-item에서 active 제거 + aria 업데이트
    $('.pf-item').each(function () {
      $(this).removeClass('active');
      updateAria($(this));
    });

    const popup = document.getElementById("projectPopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupContent = document.getElementById("popupContent");
    popupTitle.textContent = projectTitle;

    popup.style.display = "block";
    popup.classList.add("popup-enter");
    document.documentElement.classList.add("popup-open");
    document.body.classList.add("popup-open");

    fetch(`${projectId}.html`)
      .then(response => response.text())
      .then(html => {
        popupContent.innerHTML = html;

        setTimeout(() => {
          if (typeof Swiper !== "undefined") {
            new Swiper(".kb-swiper", {
              effect: "fade",
              loop: false,
              initialSlide: initialIndex,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          }
          const closeBtn = popup.querySelector("button.ico-close");
          if (closeBtn) closeBtn.focus();
          document.querySelector('div.wrap')?.setAttribute("aria-hidden", "true");
        }, 0);
      })
      .catch(error => {
        console.error("HTML 파일 로딩 실패:", error);
        popupContent.innerHTML = '<div class="loading" style="color: #ff6b6b;"> 정보를 불러오는데 실패했습니다.</div>';
      });
  };

  // 팝업 닫기 함수
  window.closeProjectPopup = function () {
    const popup = document.getElementById("projectPopup");

    popup.classList.remove("popup-enter");
    popup.classList.add("popup-exit");

    setTimeout(() => {
      popup.style.display = "none";
      popup.classList.remove("popup-exit");
      document.documentElement.classList.remove("popup-open");
      document.body.classList.remove("popup-open");
      document.querySelector('div.wrap')?.removeAttribute("aria-hidden");

      // 마퀴 상태 초기화
      $('.pf-list-item').each(function () {
        const data = $(this).data('marqueeData');
        if (data) {
          data.totalOffset = 0;
        }
      });
    }, 300);
  };

  // li > button.pf-openPop 클릭 시 팝업 열기
  $('.pf-openPop').on('click touchstart', function (e) {
    e.stopPropagation();
    e.preventDefault();

    const $btn = $(this);
    const projectId = $btn.data('project-id');
    const projectTitle = $btn.data('project-title');
    const initialIndex = $btn.data('initial-index') || 0;

    openProjectPopup(projectId, projectTitle, initialIndex, e);
  });
});
