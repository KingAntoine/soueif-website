// Small progressive enhancements. All content and contact links work without JavaScript.
document.body.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Count once when visible. Keep the final value without JavaScript or motion.
const counter = document.querySelector('.counter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (counter && 'IntersectionObserver' in window && !reduceMotion.matches) {
  const target = Number(counter.dataset.target);
  counter.textContent = '0';
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / 1000, 1);
      counter.textContent = String(Math.floor(progress * target));
      if (progress < 1 && !reduceMotion.matches) requestAnimationFrame(tick);
      else counter.textContent = String(target);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  observer.observe(counter);
}
