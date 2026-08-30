// Mobile navigation
const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Publication tabs: Selected, All, or a specific year
const filterButtons = document.querySelectorAll('.filter-button');
const publications = document.querySelectorAll('.publication');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    publications.forEach((publication) => {
      const show = filter === 'all' ||
        (filter === 'selected' && publication.dataset.selected === 'true') ||
        (!['all', 'selected'].includes(filter) && publication.textContent.includes(filter));
      publication.hidden = !show;
    });
  });
});

// Add the compact purple venue badges used in the reference design.
const venueBadges = [
  ['ICML', 'ICML'], ['ICLR', 'ICLR'], ['JMLR', 'JMLR'], ['CVPR', 'CVPR'],
  ['ICASSP', 'ICASSP'], ['ECCV', 'ECCV'], ['ICCV', 'ICCV'], ['AAAI', 'AAAI'],
  ['IROS', 'IROS'], ['UAI', 'UAI'], ['ICDCS', 'ICDCS'], ['IEEE', 'IEEE']
];

publications.forEach((publication) => {
  const venue = publication.querySelector('.venue')?.textContent || '';
  const title = publication.querySelector('h3');
  const match = venueBadges.find(([needle]) => venue.includes(needle));
  if (title && match) {
    const badge = document.createElement('span');
    badge.className = 'pub-abbr';
    badge.textContent = match[1];
    title.prepend(badge);
  }
});

// Highlight the current section in the sticky navigation.
const sections = document.querySelectorAll('[id].section, #about');
const navLinks = document.querySelectorAll('.site-nav a');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 80;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
      const id = section.getAttribute('id');
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
