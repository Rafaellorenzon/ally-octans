'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', expanded);
});
navigation.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
});
const film = document.querySelector('#guild-film');
document.querySelector('#watch-film').addEventListener('click', () => {
  const promise = film.play();
  if (promise && typeof promise.catch === 'function') promise.catch(() => { film.focus(); });
});
const lightbox = document.querySelector('#lightbox');
let galleryOpener = null;
document.querySelectorAll('[data-gallery]').forEach(link => {
  link.addEventListener('click', event => {
    if (typeof lightbox.showModal !== 'function') return;
    event.preventDefault();
    galleryOpener = link;
    document.querySelector('#lightbox-image').src = link.getAttribute('href');
    document.querySelector('#lightbox-image').alt = link.querySelector('img').alt;
    document.querySelector('#lightbox-title').textContent = link.dataset.title;
    lightbox.showModal();
  });
});
document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) { const r = lightbox.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close(); } });
lightbox.addEventListener('close', () => { if (galleryOpener) galleryOpener.focus(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Abrir menu'); menuButton.focus(); } });
document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
