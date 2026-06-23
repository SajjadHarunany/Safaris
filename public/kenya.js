(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Dropdown
  const dropdownTrigger = document.querySelector('[data-dropdown]');
  if (dropdownTrigger) {
    const btn = dropdownTrigger.querySelector('[aria-expanded]');
    const dropdown = dropdownTrigger.querySelector('.dropdown');

    const close = () => {
      btn && btn.setAttribute('aria-expanded', 'false');
      dropdown && dropdown.removeAttribute('data-open');
      dropdownTrigger.removeAttribute('data-open');
    };

    const open = () => {
      btn && btn.setAttribute('aria-expanded', 'true');
      dropdown && dropdown.setAttribute('data-open', '');
      dropdownTrigger.setAttribute('data-open', '');
    };

    btn && btn.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) close();
      else open();
    });

    document.addEventListener('click', (e) => {
      if (!dropdownTrigger.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // Mobile panel toggle
  const hamburger = document.querySelector('[data-mobile-menu]');
  const panel = document.querySelector('[data-mobile-panel]');

  if (hamburger && panel) {
    hamburger.addEventListener('click', () => {
      const open = panel.hasAttribute('data-open');
      if (open) panel.removeAttribute('data-open');
      else panel.setAttribute('data-open', '');
    });

    // Close on link click
    $$('[data-mobile-panel] .mobile__link').forEach((a) => {
      a.addEventListener('click', () => {
        panel.removeAttribute('data-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !hamburger.contains(e.target)) {
        panel.removeAttribute('data-open');
      }
    });
  }

  // Enquiry form: basic UX (no backend)
  const form = $('#enquiryForm');
  const note = $('#formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const contact = String(fd.get('contact') || '').trim();
      if (note) {
        note.textContent = `Thanks${name ? `, ${name}` : ''}! We will contact you at ${contact || 'your details'} soon.`;
      }
      form.reset();
    });
  }
})();

