const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const toast = document.querySelector('[data-toast]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    header?.classList.remove('is-menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const hallData = {
  big: {
    label: 'Большой зал', capacity: 'до 170–180 гостей',
    title: 'Когда гостей много,<br /><em>места должно хватить всем.</em>',
    description: 'Просторный зал для свадеб, юбилеев и больших корпоративных вечеров. Здесь можно оставить место для танцев, сцены и праздничной подачи.',
    features: ['Танцпол', 'Живая музыка', 'Проектор и экран']
  },
  main: {
    label: 'Основной зал', capacity: 'до 80 гостей',
    title: 'Праздник, в котором<br /><em>все рядом.</em>',
    description: 'Более камерный формат для юбилея, семейного торжества или корпоратива, где удобно быть в центре событий и слышать каждого гостя.',
    features: ['Отдельный зал', 'Танцпол', 'Музыка']
  },
  orange: {
    label: 'Оранжевый зал', capacity: '40–60 гостей',
    title: 'Тёплый цвет<br /><em>для тёплых встреч.</em>',
    description: 'Яркий зал с большими окнами и живым настроением — для дней рождения, выпускных и вечеров, где хочется больше света.',
    features: ['Большие окна', 'Отдельная зона', 'Танцпол']
  },
  glam: {
    label: 'Гламурный зал', capacity: 'до 40 гостей',
    title: 'Когда важна<br /><em>своя атмосфера.</em>',
    description: 'Зал с отдельным входом и характерными кирпичными колоннами. Подходит для небольшого праздника, который хочется провести своим кругом.',
    features: ['Отдельный вход', 'Камерный формат', 'Музыка']
  },
  olive: {
    label: 'Оливковый зал', capacity: 'камерный формат',
    title: 'Тише, ближе,<br /><em>по-семейному.</em>',
    description: 'Самый уютный формат для небольшого события, деловой встречи или семейного вечера с мягкими диванами и зеленью.',
    features: ['Мягкие диваны', 'Живые растения', 'Для небольших компаний']
  }
};

const hallTabs = document.querySelectorAll('[data-hall]');
const hallLabel = document.querySelector('[data-hall-label]');
const hallCapacity = document.querySelector('[data-hall-capacity]');
const hallTitle = document.querySelector('[data-hall-title]');
const hallDescription = document.querySelector('[data-hall-description]');
const hallFeatures = document.querySelector('[data-hall-features]');

function renderHall(key) {
  const hall = hallData[key];
  if (!hall) return;
  hallTabs.forEach((tab) => {
    const active = tab.dataset.hall === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  hallLabel.textContent = hall.label;
  hallCapacity.textContent = hall.capacity;
  hallTitle.innerHTML = hall.title;
  hallDescription.textContent = hall.description;
  hallFeatures.innerHTML = hall.features.map((feature) => `<li>${feature}</li>`).join('');
}

hallTabs.forEach((tab) => tab.addEventListener('click', () => renderHall(tab.dataset.hall)));

const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  dateInput.min = localDate;
}

const bookingForm = document.querySelector('[data-booking-form]');
const formSuccess = document.querySelector('[data-form-success]');
const requestType = document.querySelector('[data-request-type]');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 3400);
}

document.querySelectorAll('[data-booking-type]').forEach((link) => {
  link.addEventListener('click', () => {
    if (requestType) requestType.value = link.dataset.bookingType;
  });
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const guestName = formData.get('name') || 'Гость';
  const type = formData.get('requestType') || formData.get('occasion') || 'Заявка';
  bookingForm.hidden = true;
  formSuccess.hidden = false;
  formSuccess.querySelector('h3').textContent = `${guestName}, заявка принята.`;
  showToast(`${type}: администратор скоро перезвонит.`);
});

document.querySelectorAll('a[href="#booking"]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => document.querySelector('#booking input[name="name"]')?.focus(), 450);
  });
});

renderHall('big');
