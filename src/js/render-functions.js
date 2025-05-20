// Імпортуємо бібліотеку SimpleLightbox для красивого перегляду зображень
import SimpleLightbox from 'simplelightbox';
// Підключаємо стилі для SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';

// Отримуємо посилання на основні елементи DOM
const gallery = document.querySelector('.gallery'); // Список галереї
const loader = document.querySelector('.loader'); // Елемент завантажувача (spinner)
const loadMoreBtn = document.querySelector('.load-more-btn'); // Кнопка "Load More"

// Ініціалізуємо lightbox для зображень у галереї
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Використовуємо атрибут alt як підпис
  captionDelay: 250, // Затримка перед показом підпису (в мс)
});

/**
 * Функція створює розмітку зображень і додає її до галереї.
 * @param {Array} images - масив об'єктів зображень від Pixabay
 */
export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
          <div class="image-info">
            <p><b>Likes:</b>👍 ${image.likes}</p>
            <p><b>Views:</b>👀 ${image.views}</p>
            <p><b>Comments:</b>💬 ${image.comments}</p>
            <p><b>Downloads:</b>⬇️ ${image.downloads}</p>
          </div>
        </a>
      </li>
    `
    )
    .join(''); // Об'єднуємо всі елементи в один HTML-рядок

  // Додаємо розмітку до кінця галереї
  gallery.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо lightbox, щоб він знав про нові зображення
  lightbox.refresh();
}

/**
 * Очищає галерею перед новим пошуком.
 */
export function clearGallery() {
  gallery.innerHTML = '';
}

/**
 * Показує анімацію завантаження (spinner).
 */
export function showLoader() {
  loader.classList.add('visible');
}

/**
 * Ховає анімацію завантаження.
 */
export function hideLoader() {
  loader.classList.remove('visible');
}

/**
 * Показує кнопку "Load More".
 */
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

/**
 * Ховає кнопку "Load More".
 */
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
