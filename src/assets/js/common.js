/**
 * ==============================+
 * 메뉴토글 정의
 * ==============================+
 */
const menuToggle = document.getElementById("menuToggle");
const menuBar = gsap.timeline();

menuBar.to('.bar-1', 0.5, {
	attr: { d: "M8,2 L2,8" },
	x: 1,
	ease: Power2.easeInOut
}, 'start')

menuBar.to('.bar-2', 0.5, {
	autoAlpha: 0
}, 'start')

menuBar.to('.bar-3', 0.5, {
	attr: { d: "M8,8 L2,2" },
	x: 1,
	ease: Power2.easeInOut
}, 'start')


/**
 * ==============================+
 * 전체메뉴 정의
 * ==============================+
 */

var tl = gsap.timeline({ paused: true });
const width = window.innerWidth;

//tl.to('.fullpage-menu', {
//	duration:0,
//	display: "block",
//	ease: 'Expo.easeInOut',
//});

tl.from('.menu-bg span', {
	duration: 0.35,
	y: "100%",
	stagger: 0.1,
	ease: 'Expo.easeInOut'
});


// if( width <= 767) {
//   tl.from('.logo--white', {
//     duration:0,
//     opacity:1,
//     x:"0%",
//     stagger: 0.1,
//     ease: 'Expo.easeInOut'
//   });

//   tl.fromTo('.logo--white .fill-black', {
//     duration:0,
//     fill:'#000',
//     ease: 'Expo.easeInOut'
//     },
//     {
//       fill:'#fff'
//     }
//   );

//   tl.fromTo('.logo--white a' , {
//     duration: 0,
//     color:'#000',
//     ease: 'Expo.easeInOut'
//     },
//     {
//       color:'#fff'
//     }
//   )
// }

tl.from('.main-menu li a', {
	duration: 1,
	y: "100%",
	stagger: 0.2,
	ease: 'Expo.easeInOut'
}, "-=0.5");

// tl.from('.main-menu li .count', {
// 	duration: 2,
// 	y: "100%",
// 	opacity: 0,
// 	stagger: 0.2,
// 	ease: 'Expo.easeInOut'
// }, "-=1");

//tl.from('.line', {
//	duration:0.3,
//	scaleX: 0,
//	transformOrigin: "0px 0px",		
//});

//tl.from('.social-links li', {
//	duration: 0.8,
//	y:"-100%",
//	opacity:0,
//	stagger: 0.1,
//	ease: 'Expo.easeInOut'
//} , "-=0.5");

menuBar.reverse();
tl.reverse();

const $menuToggle = $('.menu-toggle');
const $fullpageMenu = $('.fullpage-menu');
const $html = $('html');

// Optional: GSAP Timeline 객체와 메뉴 바 제어
// Assuming `menuBar` and `tl` are GSAP timelines or objects with `.reversed()` method

$menuToggle.on('click', function () {
	const isActive = $menuToggle.hasClass('active');
	const willBeActive = !isActive;

	// Toggle Active State
	$menuToggle.toggleClass('active', willBeActive);
	$fullpageMenu.toggleClass('on', willBeActive);
	$html.toggleClass('popup-open', willBeActive);
	$fullpageMenu.attr('aria-hidden', !willBeActive);

	// GSAP Timeline Reverse
	if (typeof menuBar?.reversed === 'function') {
		menuBar.reversed(!menuBar.reversed());
	}
	if (typeof tl?.reversed === 'function') {
		tl.reversed(!tl.reversed());
	}

	// Optional: Header Style Adjustments
	const header = document.querySelector('header');
	const headerFooter = document.querySelector('header .header--footer h1');
	const headerFooterIco = document.querySelectorAll('header .header--footer h1 path');

	if (willBeActive) {
		header.style.background = 'none';
		headerFooter?.classList.replace('logo--black', 'logo--white');
		headerFooterIco.forEach(path => {
			path.classList.replace('fill-black', 'fill-white');
		});
	} else {
		header.style.zIndex = '10';
		header.style.background = '#fff';
		headerFooter?.classList.replace('logo--white', 'logo--black');
		headerFooterIco.forEach(path => {
			path.classList.replace('fill-white', 'fill-black');
		});
	}
});


/*
menuToggle.addEventListener('click', function () {
	// console.dir(menuToggle);
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
	menuToggle.classList.toggle('active');

	// const header = document.querySelector('header');
	// const headerFooter = document.querySelector('header .header--footer h1');
	// const headerFooterIco = document.querySelectorAll('header .header--footer h1 path');

	// if($('.menu-toggle').hasClass('active')){
	// 	header.style.zIndex = "1002";
	// 	header.style.background = "transparent";
	// 	headerFooter.classList.replace('logo--black','logo--white');
	// 	for ( var i = 0; i < headerFooterIco.length; i++ ) {
	// 		headerFooterIco[i].classList.replace('fill-black','fill-white');
	// 	}
	// }else{
	// 	header.style.zIndex = "10";
	// 	header.style.background = "#fff";
	// 	headerFooter.classList.replace('logo--white','logo--black');
	// 	for ( var i = 0; i < headerFooterIco.length; i++ ) {
	// 		headerFooterIco[i].classList.replace('fill-white','fill-black');
	// 	}
	// }

});


$(".menu-toggle").on('click', function () {
	const $toggle = $(this);
	$('.fullpage-menu').toggleClass('on');

	setTimeout(() => {
		if ($toggle.hasClass('active')) {
			$('html').addClass('popup-open');
			$('.fullpage-menu').attr('aria-hidden', 'false');
		} else {
			$('html').removeClass('popup-open');
			$('.fullpage-menu').attr('aria-hidden', 'true');
		}
	}, 0);
});
*/

/**
 * ==============================+
 * 헤더 정의
 * ==============================+
 */
const header = document.querySelector('header');
const layerHeader = document.querySelector('.layer-header');

window.addEventListener('scroll', () => {
  const windowScroll = window.pageYOffset;

  if (windowScroll > header.offsetHeight) {
    header.classList.add('active');

    const screenWidth = window.innerWidth;
    if (screenWidth < 768 && layerHeader) {
      layerHeader.classList.remove("white");
    }
  } else {
    header.classList.remove('active');
  }
});



$('.header--inner .top-nav .dcb .ico').hover(function () {
	$(".top_hide").addClass('on');
}, function () {
	$(".top_hide").removeClass('on');
});

// $('.main-menu li a').hover(function(){
// 	$(".main-menu li span").css("-webkit-text-stroke-color", "#5E5E5E");
// 	$(".main-menu li span").css("-webkit-text-stroke-width", "0.02em");
// }, function(){
// 	$(".main-menu li span").css("-webkit-text-stroke-color", "white");
// 	$(".main-menu li span").css("-webkit-text-stroke-width", "0.01em");
// });



/**
 * ==============================+
 * 푸터 정의
 * ==============================+
 */
let mybutton = document.getElementById("topBtn");
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}
function topFunction() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}



/**
 * ==============================+
 * 스크롤 정의
 * ==============================+
 */

setTimeout(function () {
	const intro = document.querySelector('.intro-wrap');
	if (!intro) return; // intro-wrap이 없으면 종료

	const introObserver = (entries, observer) => {
		if (entries[0].isIntersecting) {
			$(".main-indicator-wrap").addClass("white");
			$(".menu-toggle").addClass("white");
			$(".main_logo").addClass("white");
			$(".top-nav").addClass("white");
			$(".quick_btn").addClass("white");
			$(".layer-header").addClass("white");
		}
	};

	const introObserverOptions = {
		threshold: 0.5,
		rootMargin: '100px',
	};

	const introWatcher = new IntersectionObserver(introObserver, introObserverOptions);
	introWatcher.observe(intro); // ✅ intro는 Element이므로 오류 없음
}, 100);


const scrollEvent = () => {
	//query selectors
	const getDataTypes = document.querySelectorAll('[data-type="white"]');
	// intersection observer
	const watchCallback = (getData, sectionWatcher) => {
		getData.forEach((getData) => {
			// console.log(getData)
			if (getData.isIntersecting) {
				//$(".main-indicator-wrap").addClass("white");
				$(".menu-toggle").addClass('white');
				$(".main_logo").addClass('white');
				$(".top-nav").addClass('white');
				$(".quick_btn").addClass('white')
				$(".layer-header").addClass('white')
			} else {
				//$(".main-indicator-wrap").removeClass("white");
				$(".menu-toggle").removeClass('white');
				$(".main_logo").removeClass('white');
				$(".top-nav").removeClass('white');
				$(".quick_btn").removeClass('white')
				$(".layer-header").removeClass('white')
			}

		})

	}
	const watchOptions = { threshold: 0.4 }
	// 관찰자
	const sectionWatcher = new IntersectionObserver(watchCallback, watchOptions)

	//관찰 대상
	getDataTypes.forEach(getData => {
		sectionWatcher.observe(getData)
	})
}

scrollEvent()