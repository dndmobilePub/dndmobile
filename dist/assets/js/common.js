
const menuToggle = document.getElementById("menuToggle");
const menuBar = gsap.timeline();
var tl = gsap.timeline({ paused: true});

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

menuBar.reverse();


tl.to('.fullpage-menu', {
	duration:0,
	display: "block",
	ease: 'Expo.easeInOut',
});

tl.from('.menu-bg span', {
	duration:0.4,
	x:"100%",
	stagger: 0.1,
	ease: 'Expo.easeInOut'
});

tl.from('.main-menu li a', {
	duration:1,
	y:"100%",
	stagger: 0.2,
	ease: 'Expo.easeInOut'
} , "-=0.5");

tl.from('.line', {
	duration:0.3,
	scaleX: 0,
	transformOrigin: "0px 0px",		
});

tl.from('.social-links li', {
	duration: 1,
	y:"-100%",
	opacity:0,
	stagger: 0.1,
	ease: 'Expo.easeInOut'
} , "-=0.5");


tl.reverse();

menuToggle.addEventListener('click', function(){
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
  menuToggle.classList.toggle('active');

});

