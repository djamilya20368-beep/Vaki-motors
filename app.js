const modal = document.querySelector('#request-modal');
const openers = document.querySelectorAll('[data-open-request]');
const closeButton = document.querySelector('[data-close-modal]');
const form = document.querySelector('#request-form');
const modalBox = document.querySelector('.modal');
const success = document.querySelector('#success-message');
const result = document.querySelector('#finder-result');

function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openers.forEach(button => button.addEventListener('click', openModal));
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', event => { if(event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeModal(); });
form.addEventListener('submit', event => { event.preventDefault(); modalBox.classList.add('submitted'); success.classList.add('show'); });

document.querySelector('[data-scroll-search]').addEventListener('click', () => document.querySelector('#catalog-search').focus());
document.querySelectorAll('[data-finder]').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('[data-finder]').forEach(item => item.classList.remove('finder-card-dark','active'));
  card.classList.add('finder-card-dark','active');
}));
document.querySelector('[data-show-results]').addEventListener('click', () => { result.classList.add('show'); result.scrollIntoView({behavior:'smooth', block:'nearest'}); });

const cards = [...document.querySelectorAll('.product-card')];
const emptyState = document.querySelector('#empty-state');
let activeFilter = 'all';
function applyFilters(){
  const query = document.querySelector('#catalog-search').value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const filterMatch = activeFilter === 'all' || card.dataset.category.split(' ').includes(activeFilter);
    const searchMatch = !query || card.dataset.search.includes(query);
    const show = filterMatch && searchMatch;
    card.classList.toggle('hidden', !show);
    if(show) visible++;
  });
  emptyState.classList.toggle('show', visible === 0);
}
document.querySelectorAll('[data-filter]').forEach(pill => pill.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
  pill.classList.add('active'); activeFilter = pill.dataset.filter; applyFilters();
}));
document.querySelector('#catalog-search').addEventListener('input', applyFilters);
document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => { button.textContent = button.textContent === '♡' ? '♥' : '♡'; button.style.color = button.textContent === '♥' ? 'var(--orange)' : ''; }));
