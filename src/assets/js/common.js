console.log(gsap)

// gsap.to('.box',1 ,{
//   x:'300px'
// })

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
});

menuBar.reverse();