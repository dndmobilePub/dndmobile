const menuToggle = document.getElementById("menuToggle");
const menuBar = gsap.timeline();
var tl = gsap.timeline({ paused: true});
const width = window.innerWidth;

const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

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


if( width <= 767) {
  tl.from('.logo--white', {
    duration:0,
    opacity:1,
    x:"0%",
    stagger: 0.1,
    ease: 'Expo.easeInOut'
  });
  
  tl.fromTo('.logo--white .fill-black', {
    duration:0,
    fill:'#000',
    ease: 'Expo.easeInOut'
    },
    {
      fill:'#fff'
    }
  );
  
  tl.fromTo('.logo--white a' , {
    duration: 0,
    color:'#000',
    ease: 'Expo.easeInOut'
    },
    {
      color:'#fff'
    }
  )
}

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

menuBar.reverse();
tl.reverse();


menuToggle.addEventListener('click', function(){
  console.dir(menuToggle);
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
  menuToggle.classList.toggle('active');
 
});

window.addEventListener('scroll', () => {
  headerFixed();
})

function headerFixed() {
  const windowScroll = window.pageYOffset;
  if(windowScroll > header.offsetHeight) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

