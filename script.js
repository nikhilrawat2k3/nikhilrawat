document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Fade-in and stagger animations
  const elementsToFade = document.querySelectorAll('.section, .card, .hero');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  elementsToFade.forEach(el => {
    el.classList.add('fade');
    observer.observe(el);
  });

  // Dark/Light Mode Toggle with animation
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    // Add transition class for smooth color change
    body.style.transition = 'background 0.5s ease, color 0.5s ease';
    setTimeout(() => body.style.transition = '', 500);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  // Animate progress bars on view
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progresses = entry.target.querySelectorAll('.progress');
        progresses.forEach(progress => {
          const width = progress.classList.contains('intermediate') ? '60%' :
                        progress.classList.contains('basic') ? '40%' : '20%';
          progress.style.width = width;
        });
      }
    });
  });
  document.querySelectorAll('.skills-grid .card').forEach(card => progressObserver.observe(card));
});
