const aboutMeText =
  "I AM AN ASPIRING AI ENGINEER AND COMPUTER SCIENTIST CURRENTLY PURSUING MY BACHELORS AT THE NATIONAL UNIVERSITY OF COMPUTER AND EMERGING SCIENCES.<br>MY JOURNEY INTO TECH IS UNIQUE. I CAME FROM A BACKGROUND WITH ABSOLUTELY ZERO CODING EXPERIENCE. HOWEVER, DIVING INTO C++ COMPLETELY TRANSFORMED MY WORLDVIEW. I WENT FROM BEING A PASSIVE USER OF TECHNOLOGY TO AN ACTIVE CREATOR AND INNOVATOR.";
const typeContainer = document.getElementById("typewriter-text");
let typeIndex = 0;
function typeWriter() {
  if (typeIndex < aboutMeText.length) {
    if (aboutMeText.substring(typeIndex, typeIndex + 4) === "<br>") {
      typeContainer.innerHTML += "<br>";
      typeIndex += 4;
    } else {
      typeContainer.innerHTML += aboutMeText.charAt(typeIndex);
      typeIndex++;
    }
    setTimeout(typeWriter, 75);
  }
}
const headerTexts = ["BSAI STUDENT", "PROBLEM SOLVER", "FRONT END DEVELOPER"];
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
// LAZY LOAD BACKGROUND VIDEO
function lazyLoadVideo() {
  const video = document.getElementById("bg-video");
  const source = video.querySelector("source[data-src]");
  if (source) {
    source.src = source.getAttribute("data-src");
    source.removeAttribute("data-src");
    video.load();
    video.play().catch(function () {
      // Autoplay blocked — retry on user interaction
      document.addEventListener(
        "click",
        function retryPlay() {
          video.play();
          document.removeEventListener("click", retryPlay);
        },
        { once: true },
      );
    });
    video.addEventListener(
      "playing",
      function () {
        document.body.classList.add("video-loaded");
      },
      { once: true },
    );
  }
}

window.onload = function () {
  typeWriter();
  headerTypewriter();
  // Load the video after everything else is ready
  setTimeout(lazyLoadVideo, 200);
};
let lastScrollTop = 0;
const navbar = document.querySelector("nav");
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //DYNAMIC NAVBAR LOGIC
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (scrollTop < 0) return;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = `-${navbar.offsetHeight}px`;
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

//SCROLL ANIMATION OBSERVER
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
