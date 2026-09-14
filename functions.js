const aboutMeText =
  "Artificial Intelligence undergraduate at FAST NUCES Islamabad with interests in Web Development and AI applications. <br> Passionate about building practical solutions for businesses through technology. Currently developing skills in C++, HTML, CSS and AI systems."
const typeContainer = document.getElementById("typewriter-text");

// Render the about text immediately — no slow typewriter delay.
function typeWriter() {
  typeContainer.innerHTML = aboutMeText;
}

const headerTexts = ["BSAI STUDENT", "C++ DEVELOPER", "PROBLEM SOLVER"];
let headerCount = 0;
let headerIndex = 0;
let currentHeaderText = "";
let headerLetter = "";
let isDeleting = false;
function headerTypewriter() {
  if (headerCount === headerTexts.length) {
    headerCount = 0;
  }
  currentHeaderText = headerTexts[headerCount];
  if (isDeleting) {
    headerLetter = currentHeaderText.slice(0, --headerIndex);
  } else {
    headerLetter = currentHeaderText.slice(0, ++headerIndex);
  }
  document.querySelector(".typing-text").textContent = headerLetter;
  let typeSpeed = 100;
  if (isDeleting) typeSpeed = 50;
  if (!isDeleting && headerLetter.length === currentHeaderText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && headerLetter.length === 0) {
    isDeleting = false;
    headerCount++;
    typeSpeed = 500;
  }
  setTimeout(headerTypewriter, typeSpeed);
}

// ============================
// STARLIGHT HEADLINER BACKGROUND
// Builds the twinkling star layers once (and again on resize),
// replacing the old background video. Cheap: a single box-shadow
// list per layer, animated purely with CSS opacity.
// ============================
function randomStarShadow(count) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const alpha = (Math.random() * 0.6 + 0.4).toFixed(2);
    shadows.push(`${x}px ${y}px rgba(255,255,255,${alpha})`);
  }
  return shadows.join(",");
}

function generateStarfield() {
  const small = document.getElementById("stars-small");
  const medium = document.getElementById("stars-medium");
  const bright = document.getElementById("stars-bright");
  if (!small || !medium || !bright) return;
  small.style.boxShadow = randomStarShadow(160);
  medium.style.boxShadow = randomStarShadow(70);
  bright.style.boxShadow = randomStarShadow(22);
}

function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Keep body padding in sync with the fixed nav's real height
// (it can wrap to two rows on small screens).
function setNavHeightVar() {
  const nav = document.getElementById("site-nav");
  if (nav) {
    document.documentElement.style.setProperty(
      "--nav-height",
      nav.offsetHeight + "px",
    );
  }
}

window.onload = function () {
  typeWriter();
  headerTypewriter();
  setNavHeightVar();
  generateStarfield();
};

window.addEventListener(
  "resize",
  debounce(function () {
    setNavHeightVar();
    generateStarfield();
  }, 250),
);

// Subtle "scrolled" state on the nav (deeper background + shadow),
// throttled with requestAnimationFrame so it never runs more than
// once per frame no matter how fast the scroll events fire.
const siteNav = document.getElementById("site-nav");
let scrollTicking = false;
window.addEventListener(
  "scroll",
  function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        if (window.pageYOffset > 30) {
          siteNav.classList.add("scrolled");
        } else {
          siteNav.classList.remove("scrolled");
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  },
  { passive: true },
);

// SCROLL ANIMATION OBSERVER
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-element");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const hiddenElements = document.querySelectorAll(".hidden-left");
hiddenElements.forEach((el) => observer.observe(el));

var form = document.getElementById("contact-form");
async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(
          "Thanks! Your message has been sent to Awwab. You will get a response within 24 hours.",
        );
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            alert(data["errors"].map((error) => error["message"]).join(", "));
          } else {
            alert("Oops! There was a problem submitting your form");
          }
        });
      }
    })
    .catch((error) => {
      alert("Oops! There was a problem submitting your form");
    });
}
form.addEventListener("submit", handleSubmit);