document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.getElementById('category-sidebar');
  var backdrop = document.getElementById('sidebar-backdrop');
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var closeBtn = document.getElementById('sidebar-close');

  if (!sidebar || !backdrop || !hamburgerBtn) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('sidebar-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('sidebar-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  hamburgerBtn.addEventListener('click', openSidebar);
  backdrop.addEventListener('click', closeSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });
});
