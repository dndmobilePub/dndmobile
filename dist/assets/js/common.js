/**
 * ==============================+
 * 메뉴토글 정의
 * ==============================+
 */
const menuToggle = document.getElementById("menuToggle");
const menuBar = gsap.timeline();

menuBar.to('.bar-1', 0.5,{
	attr:{d: "M8,2 L2,8"},
	x:1,
	ease: Power2.easeInOut
}, 'start')

menuBar.to('.bar-2', 0.5,{
	autoAlpha: 0
}, 'start')

menuBar.to('.bar-3', 0.5,{
	attr:{d: "M8,8 L2,2"},
	x:1,
	ease: Power2.easeInOut
}, 'start')


/**
 * ==============================+
 * 전체메뉴 정의
 * ==============================+
 */

var tl = gsap.timeline({ paused: true});
const width = window.innerWidth;

//tl.to('.fullpage-menu', {
//	duration:0,
//	display: "block",
//	ease: 'Expo.easeInOut',
//});

tl.from('.menu-bg span', {
	duration:0.35,
	y:"100%",
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
	duration:1,
	y:"100%",
	stagger: 0.2,
	ease: 'Expo.easeInOut'
} , "-=0.5");

tl.from('.main-menu li .count', {
	duration:2,
	y:"100%",
	opacity:0,
	stagger: 0.2,
	ease: 'Expo.easeInOut'
} , "-=1");

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


menuToggle.addEventListener('click', function(){
  console.dir(menuToggle);
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


$(".menu-toggle").on('click', function(){
	$('.fullpage-menu').toggleClass('on');
})


/**
 * ==============================+
 * 헤더 정의
 * ==============================+
 */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
	const windowScroll = window.pageYOffset;
	if(windowScroll > header.offsetHeight) {
	  header.classList.add('active');
	} else {
	  header.classList.remove('active');
	}
})


$('.header--inner .top-nav .dcb .ico').hover(function(){
	$(".top_hide").css("display", "block");
}, function(){
	$(".top_hide").css("display", "none");
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

const scrollEvent = () => {
    //query selectors
    const intro = document.querySelector('.intro-wrap')
	const getDataTypes = document.querySelectorAll('[data-type="white"]');
  
	const introObserver = (intro, introWatcher) => {
		
		if(intro[0].isIntersecting) {
			$(".main-indicator-wrap").addClass("white");
			$(".menu-toggle").addClass('white');
			$(".main_logo").addClass('white');
			$(".top-nav").addClass('white');
			$(".num-box").addClass("white");
			$(".btn-top").find("path:first-child").attr("fill", "white");
			$(".btn-top").find("path:last-child").attr("stroke", "black");
			$(".quick_btn").addClass('white')
		} 
		
	}

	const introObserverOptions = {threshold:0.5, rootMargin:'100px'}

	const introWatcher = new IntersectionObserver(introObserver, introObserverOptions)
	introWatcher.observe(intro)
	// introWatcher.unobserve(intro)

    // intersection observer
    const watchCallback = (getData, sectionWatcher) => {
        getData.forEach((getData) => {
            // console.log(getData)
            if(getData.isIntersecting) {
                $(".main-indicator-wrap").addClass("white");
                $(".menu-toggle").addClass('white');
                $(".main_logo").addClass('white');
                $(".top-nav").addClass('white');
                $(".num-box").addClass("white");
                $(".btn-top").find("path:first-child").attr("fill", "white");
                $(".btn-top").find("path:last-child").attr("stroke", "black");
                $(".quick_btn").addClass('white')
            } else {
            $(".main-indicator-wrap").removeClass("white");
			$(".menu-toggle").removeClass('white');
			$(".main_logo").removeClass('white');
			$(".top-nav").removeClass('white');
			$(".num-box").removeClass('white');
			$(".btn-top").find('path:first-child').attr('fill', 'black');
			$(".btn-top").find('path:last-child').attr('stroke', 'white');
			$(".quick_btn").removeClass('white')
            }
            
        })
       
    }
    const watchOptions = {threshold:0.4}
    // 관찰자
    const sectionWatcher = new IntersectionObserver(watchCallback, watchOptions)
	
	//관찰 대상
    getDataTypes.forEach(getData => {
        sectionWatcher.observe(getData)
    })
}

scrollEvent()