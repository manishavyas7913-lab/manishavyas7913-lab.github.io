/* =========================================================
   KALINDI VYAS
   SHARED JAVASCRIPT
   ========================================================= */

"use strict";


const $ = (selector, root = document) =>
  root.querySelector(selector);


const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];



/* =========================================================
   CURRENT YEAR
   ========================================================= */

$$("[data-current-year]")
.forEach(element => {

  element.textContent =
    new Date().getFullYear();

});



/* =========================================================
   HEADER
   ========================================================= */

const siteHeader =
  $("#siteHeader");


window.addEventListener(
  "scroll",
  () => {

    if(siteHeader){

      siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    }

  }
);



/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  $("#menuToggle");


const siteNav =
  $("#siteNav");


if(menuToggle && siteNav){

  menuToggle.addEventListener(
    "click",
    () => {

      siteNav.classList.toggle(
        "open"
      );

    }
  );


  $$("#siteNav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        siteNav.classList.remove(
          "open"
        );

      }
    );

  });

}



/* =========================================================
   PAGE PROGRESS
   ========================================================= */

const pageProgress =
  $("#pageProgress");


window.addEventListener(
  "scroll",
  () => {

    if(!pageProgress){
      return;
    }


    const maxScroll =
      document.documentElement.scrollHeight
      -
      window.innerHeight;


    const progress =
      maxScroll > 0
      ?
      window.scrollY / maxScroll
      :
      0;


    pageProgress.style.width =
      progress * 100 + "%";

  }
);



/* =========================================================
   CURSOR GLOW
   ========================================================= */

window.addEventListener(
  "pointermove",
  event => {

    document.documentElement
    .style
    .setProperty(
      "--mouse-x",
      event.clientX + "px"
    );


    document.documentElement
    .style
    .setProperty(
      "--mouse-y",
      event.clientY + "px"
    );

  }
);



/* =========================================================
   SCROLL REVEALS
   ========================================================= */

const revealElements =
  $$(".reveal");


if(revealElements.length){

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if(entry.isIntersecting){

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
        threshold:.12
      }

    );


  revealElements.forEach(
    element => {

      revealObserver
      .observe(
        element
      );

    }
  );

}



/* =========================================================
   TYPEWRITER
   ========================================================= */

const typewriter =
  $("[data-typewriter]");


if(typewriter){

  const words =
    typewriter
    .dataset
    .words
    .split(",")
    .map(word => word.trim());


  let wordIndex =
    0;


  let characterIndex =
    0;


  let deleting =
    false;


  function animateTypewriter(){

    const word =
      words[wordIndex];


    if(!deleting){

      characterIndex++;


      typewriter.textContent =
        word.slice(
          0,
          characterIndex
        );


      if(
        characterIndex ===
        word.length
      ){

        deleting =
          true;


        setTimeout(
          animateTypewriter,
          1100
        );


        return;

      }

    }else{

      characterIndex--;


      typewriter.textContent =
        word.slice(
          0,
          characterIndex
        );


      if(
        characterIndex === 0
      ){

        deleting =
          false;


        wordIndex =
          (
            wordIndex + 1
          )
          %
          words.length;

      }

    }


    setTimeout(

      animateTypewriter,

      deleting
      ?
      42
      :
      75

    );

  }


  animateTypewriter();

}



/* =========================================================
   3-D TILT
   ========================================================= */

$$("[data-tilt]")
.forEach(card => {

  card.addEventListener(
    "pointermove",
    event => {

      if(
        window.innerWidth < 850
      ){
        return;
      }


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
        .5;


      const y =
        (
          event.clientY
          -
          rect.top
        )
        /
        rect.height
        -
        .5;


      card.style.transform =
        `
        perspective(900px)
        rotateX(${(-y * 6).toFixed(2)}deg)
        rotateY(${(x * 8).toFixed(2)}deg)
        translateY(-3px)
        `;

    }
  );


  card.addEventListener(
    "pointerleave",
    () => {

      card.style.transform =
        "";

    }
  );

});



/* =========================================================
   3-D PARALLAX
   ========================================================= */

$$("[data-parallax-3d]")
.forEach(object => {

  const container =
    object.closest(
      ".hero, .journey-hero, .contact-hero, .section"
    )
    ||
    document.body;


  container.addEventListener(
    "pointermove",
    event => {

      if(
        window.innerWidth < 850
      ){
        return;
      }


      const rect =
        container
        .getBoundingClientRect();


      const x =
        (
          event.clientX
          -
          rect.left
        )
        /
        rect.width
        -
        .5;


      const y =
        (
          event.clientY
          -
          rect.top
        )
        /
        rect.height
        -
        .5;


      object.style.transform =
        `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 8}deg)
        `;

    }
  );


  container.addEventListener(
    "pointerleave",
    () => {

      object.style.transform =
        "";

    }
  );

});



/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */

$$(".magnetic")
.forEach(button => {

  button.addEventListener(
    "pointermove",
    event => {

      const rect =
        button
        .getBoundingClientRect();


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
          ${x * .12}px,
          ${y * .12}px
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

});



/* =========================================================
   SOUND WAVE
   ========================================================= */

const soundWave =
  $("[data-wave]");


if(soundWave){

  for(
    let i = 0;
    i < 35;
    i++
  ){

    const bar =
      document.createElement(
        "span"
      );


    bar.style.height =
      (
        20 +
        Math.random() * 115
      )
      +
      "px";


    bar.style.animationDelay =
      (
        Math.random() * 1.2
      )
      +
      "s";


    bar.style.animationDuration =
      (
        .8 +
        Math.random() * .8
      )
      +
      "s";


    soundWave
    .appendChild(
      bar
    );

  }

}



/* =========================================================
   PLANET CAPTION
   ========================================================= */

const planetCaption =
  $("#planetCaption");


$$("[data-planet]")
.forEach(planet => {

  const updateCaption =
    () => {

      if(planetCaption){

        planetCaption.textContent =
          planet.dataset.planet;

      }

    };


  planet.addEventListener(
    "mouseenter",
    updateCaption
  );


  planet.addEventListener(
    "focus",
    updateCaption
  );


  planet.addEventListener(
    "click",
    updateCaption
  );

});



/* =========================================================
   PARTICLE NETWORK BACKGROUND
   ========================================================= */

const canvas =
  $("#bgCanvas");


if(canvas){

  const ctx =
    canvas.getContext(
      "2d"
    );


  let width;
  let height;
  let dpr;


  let particles =
    [];


  function resizeCanvas(){

    width =
      window.innerWidth;


    height =
      window.innerHeight;


    dpr =
      Math.min(
        window.devicePixelRatio
        ||
        1,
        1.6
      );


    canvas.width =
      width * dpr;


    canvas.height =
      height * dpr;


    canvas.style.width =
      width + "px";


    canvas.style.height =
      height + "px";


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    const particleCount =
      Math.min(

        95,

        Math.max(

          42,

          Math.floor(
            width
            *
            height
            /
            18000
          )

        )

      );


    particles =
      Array.from(

        {
          length:
            particleCount
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
              .5
            )
            *
            .18,

          vy:
            (
              Math.random()
              -
              .5
            )
            *
            .18,

          radius:
            .4
            +
            Math.random()
            *
            1.2

        })

      );

  }


  resizeCanvas();


  window.addEventListener(
    "resize",
    resizeCanvas
  );


  function animateParticles(){

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /* POINTS */

    particles
    .forEach(
      particle => {

        particle.x +=
          particle.vx;


        particle.y +=
          particle.vy;


        if(
          particle.x < 0
          ||
          particle.x > width
        ){

          particle.vx *=
            -1;

        }


        if(
          particle.y < 0
          ||
          particle.y > height
        ){

          particle.vy *=
            -1;

        }


        ctx.beginPath();


        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          "rgba(235,230,218,.38)";


        ctx.fill();

      }
    );


    /* CONNECTIONS */

    for(
      let i = 0;
      i < particles.length;
      i++
    ){

      for(
        let j = i + 1;
        j < particles.length;
        j++
      ){

        const first =
          particles[i];


        const second =
          particles[j];


        const dx =
          first.x
          -
          second.x;


        const dy =
          first.y
          -
          second.y;


        const distance =
          Math.hypot(
            dx,
            dy
          );


        if(
          distance < 108
        ){

          ctx.beginPath();


          ctx.moveTo(
            first.x,
            first.y
          );


          ctx.lineTo(
            second.x,
            second.y
          );


          ctx.lineWidth =
            .65;


          ctx.strokeStyle =
            `
            rgba(
              215,
              181,
              109,
              ${
                (
                  1
                  -
                  distance / 108
                )
                *
                .08
              }
            )
            `;


          ctx.stroke();

        }

      }

    }


    requestAnimationFrame(
      animateParticles
    );

  }


  animateParticles();

}



/* =========================================================
   PAGE FADE
   ========================================================= */

document.body.style.opacity =
  "0";


document.body.style.transition =
  "opacity .5s ease";


window.addEventListener(
  "load",
  () => {

    document.body.style.opacity =
      "1";

  }
);
