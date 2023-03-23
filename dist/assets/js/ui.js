/**
 * ==============================+
 * 애니메이션 정의
 * ==============================+
 */

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100,
    delay = 0;
  if (elem.classList.contains("gs-left")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs-right")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("delay-1")) {
    delay = 0.3;
  } else if (elem.classList.contains("delay-2")) {
    delay = 0.6;
  }  else if (elem.classList.contains("delay-3")) {
    delay = 0.9;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
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





 