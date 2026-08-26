/* ==========================================================
   KALINDI VYAS
   SHARED WEBSITE JAVASCRIPT
   ========================================================== */

"use strict";


const $ = (selector, parent = document) =>
  parent.querySelector(selector);


const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];



/* ==========================================================
   REDUCED MOTION
   ========================================================== */

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;



/* ==========================================================
   CURRENT YEAR
   ========================================================== */

$$("[data-year]").forEach(
  element => {

    element.textContent =
      new Date().getFullYear();

  }
);



/* ==========================================================
   ACTIVE NAVIGATION
   ========================================================== */

const currentPage =
  document.body.dataset.page;


if(currentPage) {

  $$(".site-nav a").forEach(
    link => {

      const isActive =
        link.dataset.nav ===
        currentPage;


      link.classList.toggle(
        "active",
        isActive
      );


      if(isActive) {

        link.setAttribute(
          "aria-current",
          "page"
        );

      }

    }
  );

}



/* ==========================================================
   MOBILE MENU
   ========================================================== */

const menuButton =
  $("#menuButton");


const siteNav =
  $("#siteNav");


function closeMenu() {

  if(!menuButton || !siteNav) {
    return;
  }


  menuButton.classList.remove(
    "is-open"
  );


  siteNav.classList.remove(
    "is-open"
  );


  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


if(menuButton && siteNav) {

  menuButton.addEventListener(
    "click",
    () => {

      const opened =
        siteNav.classList.toggle(
          "is-open"
        );


      menuButton.classList.toggle(
        "is-open",
        opened
      );


      menuButton.setAttribute(
        "aria-expanded",
        String(opened)
      );

    }
  );


  $$(".site-nav a").forEach(
    link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if(event.key === "Escape") {
        closeMenu();
      }

    }
  );


  document.addEventListener(
    "click",
    event => {

      if(
        !siteNav.classList.contains(
          "is-open"
        )
      ) {
        return;
      }


      if(
        siteNav.contains(
          event.target
        )
        ||
        menuButton.contains(
          event.target
        )
      ) {
        return;
      }


      closeMenu();

    }
  );

}



/* ==========================================================
   HEADER + PROGRESS
   ========================================================== */

const siteHeader =
  $("#siteHeader");


const scrollProgress =
  $("#scrollProgress");


function updateScrollUI() {

  const scrollY =
    window.scrollY;


  if(siteHeader) {

    siteHeader.classList.toggle(
      "is-scrolled",
      scrollY > 16
    );

  }


  if(scrollProgress) {

    const documentHeight =
      document.documentElement.scrollHeight
      -
      window.innerHeight;


    const progress =
      documentHeight > 0
      ?
      scrollY / documentHeight
      :
      0;


    scrollProgress.style.width =
      `${progress * 100}%`;

  }

}


window.addEventListener(
  "scroll",
  updateScrollUI,
  {
    passive: true
  }
);


updateScrollUI();



/* ==========================================================
   CURSOR LIGHT
   ========================================================== */

if(
  !reduceMotion
  &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  window.addEventListener(
    "pointermove",
    event => {

      document.documentElement
      .style
      .setProperty(
        "--mouse-x",
        `${event.clientX}px`
      );


      document.documentElement
      .style
      .setProperty(
        "--mouse-y",
        `${event.clientY}px`
      );

    }
  );

}



/* ==========================================================
   SCROLL REVEALS
   ========================================================== */

const revealElements =
  $$(".reveal");


if(
  revealElements.length
  &&
  !reduceMotion
) {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ) {

              entry.target
              .classList
              .add(
                "visible"
              );


              revealObserver
              .unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.1,
        rootMargin:
          "0px 0px -35px 0px"
      }

    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}



/* ==========================================================
   TYPEWRITER
   ========================================================== */

const typewriter =
  $("[data-typewriter]");


if(typewriter && !reduceMotion) {

  const words =
    typewriter.dataset.words
    .split(",")
    .map(
      word => word.trim()
    )
    .filter(Boolean);


  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;


  function runTypewriter() {

    const currentWord =
      words[wordIndex];


    if(!deleting) {

      characterIndex += 1;


      typewriter.textContent =
        currentWord.slice(
          0,
          characterIndex
        );


      if(
        characterIndex ===
        currentWord.length
      ) {

        deleting = true;


        window.setTimeout(
          runTypewriter,
          1000
        );


        return;

      }

    } else {

      characterIndex -= 1;


      typewriter.textContent =
        currentWord.slice(
          0,
          characterIndex
        );


      if(characterIndex === 0) {

        deleting = false;


        wordIndex =
          (
            wordIndex + 1
          )
          %
          words.length;

      }

    }


    window.setTimeout(

      runTypewriter,

      deleting
      ?
      38
      :
      68

    );

  }


  runTypewriter();

}



/* ==========================================================
   TILT CARDS
   ========================================================== */

if(
  !reduceMotion
  &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  $$("[data-tilt]").forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            (
              event.clientX
              -
              rect.left
            )
            /
            rect.width
            -
            0.5;


          const y =
            (
              event.clientY
              -
              rect.top
            )
            /
            rect.height
            -
            0.5;


          card.style.transform =
            `
            perspective(900px)
            rotateX(${(-y * 5).toFixed(2)}deg)
            rotateY(${(x * 7).toFixed(2)}deg)
            translateY(-2px)
            `;

      });


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );

}



/* ==========================================================
   PARALLAX VISUALS
   ========================================================== */

if(
  !reduceMotion
  &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  $$("[data-parallax]").forEach(
    object => {

      const parent =
        object.closest(
          ".hero, .content-section"
        )
        ||
        object.parentElement;


      if(!parent) {
        return;
      }


      parent.addEventListener(
        "pointermove",
        event => {

          const rect =
            parent.getBoundingClientRect();


          const x =
            (
              event.clientX
              -
              rect.left
            )
            /
            rect.width
            -
            0.5;


          const y =
            (
              event.clientY
              -
              rect.top
            )
            /
            rect.height
            -
            0.5;


          object.style.transform =
            `
            perspective(1100px)
            rotateX(${(-y * 7).toFixed(2)}deg)
            rotateY(${(x * 9).toFixed(2)}deg)
            `;

        }
      );


      parent.addEventListener(
        "pointerleave",
        () => {

          object.style.transform =
            "";

        }
      );

    }
  );

}



/* ==========================================================
   MAGNETIC BUTTONS
   ========================================================== */

if(
  !reduceMotion
  &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  $$(".magnetic").forEach(
    button => {

      button.addEventListener(
        "pointermove",
        event => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX
            -
            rect.left
            -
            rect.width / 2;


          const y =
            event.clientY
            -
            rect.top
            -
            rect.height / 2;


          button.style.transform =
            `
            translate(
              ${x * 0.1}px,
              ${y * 0.1}px
            )
            `;

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform =
            "";

        }
      );

    }
  );

}



/* ==========================================================
   VOICE WAVE
   ========================================================== */

const waveBars =
  $("#waveBars");


if(waveBars) {

  const totalBars =
    window.innerWidth < 580
    ?
    24
    :
    34;


  for(
    let index = 0;
    index < totalBars;
    index += 1
  ) {

    const bar =
      document.createElement(
        "span"
      );


    const height =
      20
      +
      Math.random()
      *
      90;


    bar.style.height =
      `${height}px`;


    bar.style.animationDelay =
      `${Math.random() * 1.2}s`;


    bar.style.animationDuration =
      `${0.75 + Math.random() * 0.8}s`;


    waveBars.appendChild(
      bar
    );

  }

}



/* ==========================================================
   INTEREST LABELS
   ========================================================== */

const planetCaption =
  $("#planetCaption");


if(planetCaption) {

  $$(".planet").forEach(
    planet => {

      const updateCaption =
        () => {

          if(
            planet.dataset.label
          ) {

            planetCaption.textContent =
              planet.dataset.label;

          }

        };


      planet.addEventListener(
        "mouseenter",
        updateCaption
      );


      planet.addEventListener(
        "click",
        updateCaption
      );


      planet.addEventListener(
        "focus",
        updateCaption
      );

    }
  );

}



/* ==========================================================
   PARTICLE BACKGROUND
   ========================================================== */

const canvas =
  $("#particleCanvas");


if(
  canvas
  &&
  !reduceMotion
) {

  const context =
    canvas.getContext(
      "2d"
    );


  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  let particles = [];


  function setupCanvas() {

    width =
      window.innerWidth;


    height =
      window.innerHeight;


    pixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        1.5
      );


    canvas.width =
      Math.floor(
        width * pixelRatio
      );


    canvas.height =
      Math.floor(
        height * pixelRatio
      );


    canvas.style.width =
      `${width}px`;


    canvas.style.height =
      `${height}px`;


    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );


    const targetCount =
      Math.min(
        70,
        Math.max(
          32,
          Math.floor(
            width
            *
            height
            /
            22000
          )
        )
      );


    particles =
      Array.from(
        {
          length:
            targetCount
        },

        () => ({

          x:
            Math.random()
            *
            width,

          y:
            Math.random()
            *
            height,

          vx:
            (
              Math.random()
              -
              0.5
            )
            *
            0.15,

          vy:
            (
              Math.random()
              -
              0.5
            )
            *
            0.15,

          radius:
            0.45
            +
            Math.random()
            *
            0.9

        })

      );

  }


  function drawParticles() {

    context.clearRect(
      0,
      0,
      width,
      height
    );


    particles.forEach(
      particle => {

        particle.x +=
          particle.vx;


        particle.y +=
          particle.vy;


        if(
          particle.x < 0
          ||
          particle.x > width
        ) {

          particle.vx *= -1;

        }


        if(
          particle.y < 0
          ||
          particle.y > height
        ) {

          particle.vy *= -1;

        }


        context.beginPath();


        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );


        context.fillStyle =
          "rgba(235, 231, 220, 0.32)";


        context.fill();

      }
    );


    for(
      let firstIndex = 0;
      firstIndex < particles.length;
      firstIndex += 1
    ) {

      for(
        let secondIndex =
          firstIndex + 1;

        secondIndex <
        particles.length;

        secondIndex += 1
      ) {

        const first =
          particles[firstIndex];


        const second =
          particles[secondIndex];


        const distance =
          Math.hypot(
            first.x - second.x,
            first.y - second.y
          );


        if(distance < 95) {

          const alpha =
            (
              1
              -
              distance / 95
            )
            *
            0.07;


          context.beginPath();


          context.moveTo(
            first.x,
            first.y
          );


          context.lineTo(
            second.x,
            second.y
          );


          context.lineWidth =
            0.6;


          context.strokeStyle =
            `rgba(
              213,
              179,
              106,
              ${alpha}
            )`;


          context.stroke();

        }

      }

    }


    requestAnimationFrame(
      drawParticles
    );

  }


  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          setupCanvas,
          120
        );

    }
  );


  setupCanvas();

  drawParticles();

}
