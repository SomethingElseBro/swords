  // Dynamic Canvas Background Effects
  const canvas = document.getElementById('ember-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const eraColors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'];

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      radius: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: 1,
      color: eraColors[Math.floor(Math.random() * eraColors.length)]
    };
  }

  for(let i = 0; i < 60; i++) {
    let p = createParticle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha -= 0.002;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    particles = particles.filter(p => p.alpha > 0 && p.y > -10);
    while (particles.length < 60) {
      particles.push(createParticle());
    }
    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // Scroll Tracking & Spine Progress
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    document.getElementById('spine-fill').style.height = `${progress}%`;
  });

  // Navigation Helper Functions
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToEra(eraId) {
    const target = document.getElementById(eraId);
    if (target) {
      const offset = 70; // height offset for sticky filter bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Interactive Weapon Filtering System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.specimen');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      items.forEach(item => {
        if (filterValue === 'all' || item.dataset.type === filterValue) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });
