const header = document.querySelector('[data-header]');
const progress = document.querySelector('.progress i');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function onScroll(){
  header.classList.toggle('scrolled', scrollY > 24);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}
onScroll();
addEventListener('scroll', onScroll, {passive:true});

menuToggle?.addEventListener('click', () => {
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}));

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced && 'IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}else{
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
}

// Keep FAQ intentionally calm: one open item at a time.
const details = [...document.querySelectorAll('.faq details')];
details.forEach(item => item.addEventListener('toggle', () => {
  if(!item.open) return;
  details.forEach(other => { if(other !== item) other.open = false; });
}));

document.querySelector('[data-contact-form]')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Kennenlernen – ${data.get('type') || 'Zeremonie'}`;
  const body = [
    `Hallo Britta,`,
    ``,
    `wir sind ${data.get('name') || ''}.`,
    `Kontakt: ${data.get('email') || ''}`,
    `Anlass: ${data.get('type') || ''}`,
    ``,
    `${data.get('message') || ''}`,
    ``,
    `Liebe Grüße`
  ].join('\n');
  location.href = `mailto:info@britta-rethfeldt.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
