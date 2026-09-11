(() => {
  'use strict';
  const video = document.querySelector('#scene-video');
  const effect = document.querySelector('#effect-toggle');
  const depth = document.querySelector('#scene-depth');
  if (video && effect && depth) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const saveData = Boolean(navigator.connection?.saveData);
    let enabled = false;
    let frame = 0;
    let playSequence = 0;
    let position = { x: 0, y: 0 };
    function resetDepth() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      for (const prop of ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y']) depth.style.removeProperty(prop);
    }
    function reflect() {
      document.body.dataset.motion = enabled ? 'on' : 'off';
      effect.querySelector('.effect-icon').textContent = enabled ? 'Ⅱ' : '▶';
      effect.querySelector('.effect-label').textContent = enabled ? 'Pausar efeito' : 'Ativar efeito';
      effect.setAttribute('aria-label', enabled ? 'Pausar vídeo e efeitos do cenário' : 'Ativar vídeo e efeitos do cenário');
    }
    function play() {
      if (!enabled || document.hidden) return;
      const sequence = ++playSequence;
      if (!video.getAttribute('src')) video.src = video.dataset.source;
      video.muted = true;
      try {
        const promise = video.play();
        promise?.catch(() => {
          if (sequence !== playSequence || !enabled || document.hidden) return;
          enabled = false;
          resetDepth();
          reflect();
        });
      } catch {
        enabled = false;
        resetDepth();
        reflect();
      }
    }
    function setEffect(value) {
      enabled = value;
      reflect();
      if (enabled) play();
      else {
        playSequence++;
        video.pause();
        resetDepth();
      }
    }
    effect.hidden = false;
    effect.addEventListener('click', () => setEffect(!enabled));
    video.addEventListener('playing', () => video.classList.add('is-ready'));
    video.addEventListener('error', () => {
      video.classList.remove('is-ready');
      setEffect(false);
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        playSequence++;
        video.pause();
        resetDepth();
      } else play();
    });
    window.addEventListener('pagehide', () => {
      playSequence++;
      video.pause();
      resetDepth();
    });
    window.addEventListener('pageshow', play);
    reduced.addEventListener('change', () => { if (reduced.matches) setEffect(false); });
    window.addEventListener('pointermove', event => {
      if (!enabled || !finePointer.matches || reduced.matches || document.hidden) return;
      position = { x: event.clientX / window.innerWidth * 2 - 1, y: event.clientY / window.innerHeight * 2 - 1 };
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        depth.style.setProperty('--tilt-x', (-position.y * 2).toFixed(2) + 'deg');
        depth.style.setProperty('--tilt-y', (-4 + position.x * 4).toFixed(2) + 'deg');
        depth.style.setProperty('--shift-x', (position.x * 7).toFixed(2) + 'px');
        depth.style.setProperty('--shift-y', (position.y * 4).toFixed(2) + 'px');
        frame = 0;
      });
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetDepth);
    setEffect(!reduced.matches && !saveData);
  }

  const dialog = document.querySelector('#lightbox');
  if (dialog) {
    let opener = null;
    const image = document.querySelector('#lightbox-image');
    const title = document.querySelector('#lightbox-title');
    for (const link of document.querySelectorAll('[data-gallery]')) {
      link.addEventListener('click', event => {
        if (typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        title.textContent = link.dataset.title;
        dialog.showModal();
      });
    }
    dialog.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => opener?.focus());
  }
})();
