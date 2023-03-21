console.log(gsap)

// gsap.to('.box',1 ,{
//   x:'300px'
// })
/**
 * ==============================+
 * 토글버튼 정의
 * ==============================+
 */

const t1 = gsap.timeline({paused: true});
const menuToggle = document.getElementById("menuToggle");
const menuBar  = gsap.timeline();
menuBar.to('.bar-1', 0.5, {
  attr: {d:"M8,2 L2,8"},
  x:1,
  ease:Power2.easeInOut
},'start')

menuBar.to('.bar-2',0.5, {
  autoAlpha:0
},'start')

menuBar.to('.bar-3', 0.5, {
  attr: {d:"M8,8 L2,2"},
  x:1,
  ease:Power2.easeInOut
},'start')

menuToggle.addEventListener('click',function() {
  menuBar.reversed(!menuBar.reversed());
  t1.reverse(!t1.reversed())
});

menuBar.reverse();
t1.reverse();

/**
 * ==============================+
 * 토글버튼 정의
 * ==============================+
 */
t1.fromTo('.fullpage-menu', 1, {
  duration:1,
  display:"block",
  x:'0%',
  y:'0%',
  stagger:0.1,
  ease:'Expo.easeInOut'
},
{
  x:'100%',
  y:'0%',
})

// t1.from('.fullpage-menu', {
//   duration:1,
//   display:"block",
//   x:'100%',
//   stagger:0.1,
//   ease:'Expo.ease'
// })


// t1.from('.fullpage-menu', {
//   duration:1.5,
//   y:'100%',
//   stagger:0.2,
//   ease:'Expo.ease'
// })
