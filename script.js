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
    label: 'Гранд-холл', capacity: 'до 170 гостей',
    title: 'Когда гостей много,<br /><em>места должно хватить всем.</em>',
    description: 'Самый большой зал комплекса для свадеб, юбилеев и больших корпоративных вечеров. В центре — танцевальная площадка с эффектным тканевым куполом и подсветкой.',
    features: ['Танцпол', 'Живая музыка', 'Проектор и экран']
  },
  second: {
    label: 'Зал 2-го этажа', capacity: 'до 90 гостей',
    title: 'Праздник, в котором<br /><em>все рядом.</em>',
    description: 'Просторный зал для масштабных мероприятий, корпоративов, вечеринок и частных праздников. Пространство можно зонировать под банкет, фуршет или театральную рассадку.',
    features: ['Отдельный вход', 'До 90 гостей', 'Трансформируемая рассадка']
  },
  stained: {
    label: 'Витражный зал', capacity: 'до 60 гостей',
    title: 'Когда важна<br /><em>своя атмосфера.</em>',
    description: 'Большие окна, картины и старинные подсвечники создают настроение парадного вечера. Для дня рождения, корпоратива или праздника с танцами.',
    features: ['Большие окна', 'Танцпол', 'Шоу-программа']
  },
  green: {
    label: 'Зал Мистер Грин', capacity: '20–30 гостей',
    title: 'Зелени больше,<br /><em>официальности меньше.</em>',
    description: 'Арт-нуво, живописная растительность и необычная подсветка — камерный зал для дружеской встречи, делового ужина или душевного банкета.',
    features: ['Арт-нуво', 'Растения и подсветка', 'Фото-зона']
  },
  glam: {
    label: 'Зал Гламур', capacity: 'до 34 гостей',
    title: 'Немного блеска<br /><em>для особенного вечера.</em>',
    description: 'Голубые стены, жемчужные детали и хрустальные люстры — камерный зал с характером для торжества в своём кругу.',
    features: ['Хрустальные люстры', 'Картины', 'До 34 гостей']
  },
  olive: {
    label: 'Оливковый зал', capacity: '10–20 гостей',
    title: 'Тише, ближе,<br /><em>по-семейному.</em>',
    description: 'Оливковые и золотистые оттенки, мягкий рассеянный свет и мебель из натурального дерева — для романтического ужина, деловой встречи или небольшого праздника.',
    features: ['Мягкие диваны', 'Натуральное дерево', 'Трансформируемый формат']
  },
  vinegret: {
    label: 'Lounge bar «Винегрет»', capacity: 'до 14 гостей',
    title: 'После работы —<br /><em>в «Винегрет».</em>',
    description: 'Уютное пространство для компании друзей и небольших событий: спокойные шоколадные и красные оттенки, бар, два телевизора и видеопроектор.',
    features: ['Lounge-формат', 'Видеопроектор', 'Бар']
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
const whatsappSubmit = document.querySelector('[data-whatsapp-submit]');
const formEdit = document.querySelector('[data-form-edit]');

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
  const rawDate = formData.get('date');
  const formattedDate = rawDate
    ? new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${rawDate}T00:00:00`))
    : 'не указана';
  const whatsappMessage = [
    'Здравствуйте! Хочу уточнить возможность бронирования в «У Близнецов».',
    '',
    `Имя: ${guestName}`,
    `Телефон для связи: ${formData.get('phone') || 'не указан'}`,
    `Дата: ${formattedDate}`,
    `Гостей: ${formData.get('guests') || 'не указано'}`,
    `Формат: ${formData.get('occasion') || type}`
  ].join('\n');
  const whatsappUrl = `https://wa.me/79182877790?text=${encodeURIComponent(whatsappMessage)}`;
  if (whatsappSubmit) whatsappSubmit.href = whatsappUrl;
  bookingForm.hidden = true;
  formSuccess.hidden = false;
  formSuccess.querySelector('h3').textContent = `${guestName}, сообщение готово.`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  showToast(`${type}: откройте WhatsApp и отправьте сообщение.`);
});

formEdit?.addEventListener('click', () => {
  formSuccess.hidden = true;
  bookingForm.hidden = false;
  bookingForm.querySelector('input[name="name"]')?.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header?.classList.contains('is-menu-open')) {
    header.classList.remove('is-menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.focus();
  }
});

document.querySelectorAll('a[href="#booking"]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => document.querySelector('#booking input[name="name"]')?.focus(), 450);
  });
});

renderHall('big');
