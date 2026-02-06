// Minimal JS for interactions and scroll reveal animations
// - IntersectionObserver adds 'active' to elements with .reveal
// - Nav toggle for mobile

document.addEventListener('DOMContentLoaded', function(){
  // Smooth reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = {root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.06};
  const observer = new IntersectionObserver((entries, o) => {
    entries.forEach((entry, idx) => {
      if(entry.isIntersecting){
        // stagger children by CSS variable
        entry.target.querySelectorAll('.card, .skill, .project, .contact, .skill-icon, .tech-list span').forEach((child, i)=>{
          child.style.transitionDelay = (i * 60) + 'ms';
        });
        // activate element
        entry.target.classList.add('active');

        // animate tech bars inside this section
        entry.target.querySelectorAll('.tech-list span').forEach(span => {
          const level = span.getAttribute('data-level') || '60';
          // animate the ::after width by setting the CSS variable
          span.style.setProperty('--level', level + '%');
        });

        o.unobserve(entry.target);
      }
    });
  }, obsOptions);
  reveals.forEach(el => observer.observe(el));

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', () => {
    links.classList.toggle('show');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', ()=>{
    links.classList.remove('show');
  }));

  // Optional: add subtle parallax to hero ring on mouse move (low cost)
  const ring = document.querySelector('.profile-ring');
  const hero = document.querySelector('.hero');
  if(ring && hero){
    hero.addEventListener('mousemove', (e)=>{
      const rect = ring.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) / 30;
      const dy = (e.clientY - (rect.top + rect.height/2)) / 30;
      ring.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    hero.addEventListener('mouseleave', ()=>{
      ring.style.transform = '';
    });
  }

  // Typing effect for hero headline
  const typedEl = document.getElementById('typed');
  if(typedEl){
    const phrases = ['Python Developer','Data Science Student','Agentic AI Enthusiast'];
    let pIndex = 0, charIndex = 0, deleting = false;
    const typeSpeed = 80, deleteSpeed = 40, pause = 1200;
    const tick = ()=>{
      const current = phrases[pIndex];
      if(!deleting){
        typedEl.textContent = current.slice(0, ++charIndex);
        if(charIndex === current.length){
          deleting = true;
          setTimeout(tick, pause);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIndex);
        if(charIndex === 0){
          deleting = false; pIndex = (pIndex+1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };
    setTimeout(tick, 400);
  }
});

