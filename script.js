const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
function move(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}
function firstani() {
  let ani = gsap.timeline();
  ani.from(".navbar", {
    y: "-10",
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
  });
  ani.to(".bounding", {
    y: 0,
    delay: -1,
    stagger: 0.2,
    ease: Expo.easeInOut,
    duration: 1.5,
  });
  ani.from(".footer", {
    y: "-10",
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 0.5,
  });
}
function circlemove() {
  let timeout;
  clearTimeout(timeout);
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
    xprev = dets.clientX;
    yprev = dets.clientY;
    move(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}
document.querySelectorAll(".ele").forEach(function (ele) {
  let diffrot;
  let rotate;
  ele.addEventListener("mouseleave", function () {
    gsap.to(ele.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
  ele.addEventListener("mousemove", function (dets) {
    let diff = dets.clientY - ele.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(ele.querySelector("img"), {
      opacity: 1,
      top: diff,
      ease: Power3,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
    });
  });
});
// move();
firstani();
circlemove();
move();
