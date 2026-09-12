document.body.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

menuButton.hidden = false;

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

/* Count from 0 to 50 when the facts section becomes visible */
const counter = document.querySelector(".counter");

function animateCounter() {
  const target = Number(counter.dataset.target);
  const duration = 1200;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);

    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

const factsSection = document.querySelector(".facts");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      animateCounter();
      observer.disconnect();
    }
  },
  { threshold: 0.45 }
);

counterObserver.observe(factsSection);