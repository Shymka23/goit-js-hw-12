// Імпортуємо бібліотеку сповіщень iziToast та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Імпортуємо функцію для отримання зображень з Pixabay
import { getImagesByQuery } from './js/pixabay-api.js';

// Імпортуємо функції для рендеру галереї та елементів інтерфейсу
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// Отримуємо посилання на елементи DOM
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');

// Змінні для зберігання поточного запиту, сторінки та загальної кількості результатів
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Кількість зображень на одну сторінку
const PER_PAGE = 15;

// Додаємо обробники подій на форму та кнопку "Load More"
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// Обробник події надсилання форми
async function onSearch(event) {
  event.preventDefault(); // Зупиняємо перезавантаження сторінки

  // Отримуємо значення запиту та очищаємо пробіли
  const searchQuery = event.target.elements['search-text'].value.trim();

  // Якщо поле порожнє — показуємо попередження
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  // Оновлюємо поточний запит і скидаємо сторінку
  currentQuery = searchQuery;
  currentPage = 1;

  // Очищаємо галерею та приховуємо кнопку "Load More"
  clearGallery();
  hideLoadMoreButton();

  // Показуємо лоадер
  showLoader();

  try {
    // Отримуємо дані з API
    const data = await getImagesByQuery(currentQuery, currentPage);

    // Якщо зображення не знайдено — показуємо помилку
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    // Зберігаємо загальну кількість зображень
    totalHits = data.totalHits;

    // Рендеримо галерею з отриманих зображень
    createGallery(data.hits);

    // Якщо є більше зображень — показуємо кнопку "Load More"
    if (totalHits > PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    // У випадку помилки — показуємо повідомлення
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    // Ховаємо лоадер та скидаємо форму
    hideLoader();
    form.reset();
  }
}

// Обробник натискання на кнопку "Load More"
async function onLoadMore() {
  currentPage += 1; // Переходимо до наступної сторінки
  showLoader(); // Показуємо лоадер
  hideLoadMoreButton(); // Приховуємо кнопку, поки не завантажаться дані

  try {
    // Отримуємо зображення наступної сторінки
    const data = await getImagesByQuery(currentQuery, currentPage);

    // Додаємо нові зображення до галереї
    createGallery(data.hits);

    // Обчислюємо загальну кількість сторінок
    const totalPages = Math.ceil(totalHits / PER_PAGE);

    // Якщо остання сторінка — ховаємо кнопку та показуємо повідомлення
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton(); // Інакше показуємо кнопку знову
    }

    // Плавно прокручуємо сторінку вниз на висоту двох карток
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    // Помилка при запиті — показуємо повідомлення
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    // Ховаємо лоадер після завантаження
    hideLoader();
  }
}
