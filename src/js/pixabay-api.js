// Імпортуємо бібліотеку axios для HTTP-запитів
import axios from 'axios';

// Ключ API для доступу до Pixabay
const API_KEY = '50309673-ea2b029f8f1cb6745c8643ce8';

// Базова URL-адреса API Pixabay
const BASE_URL = 'https://pixabay.com/api/';

// Кількість зображень, які будуть завантажуватися на одну сторінку
const PER_PAGE = 15;

/**
 * Функція для отримання зображень за пошуковим запитом.
 * @param {string} query - Пошуковий запит, введений користувачем
 * @param {number} page - Номер сторінки (за замовчуванням 1)
 * @returns {Promise<Object>} - Повертає об'єкт з результатами (totalHits, hits тощо)
 */
export async function getImagesByQuery(query, page = 1) {
  // Параметри запиту до API
  const params = {
    key: API_KEY, // API ключ
    q: query.trim(), // Пошуковий запит без зайвих пробілів
    image_type: 'photo', // Тип зображення — тільки фотографії
    orientation: 'horizontal', // Орієнтація — горизонтальна
    safesearch: true, // Фільтр безпечного пошуку (виключає 18+ контент)
    page, // Номер сторінки
    per_page: PER_PAGE, // Кількість результатів на сторінку
  };

  // Надсилаємо GET-запит до API з переданими параметрами
  const response = await axios.get(BASE_URL, { params });

  // Повертаємо лише необхідні дані з відповіді (без зайвої обгортки)
  return response.data;
}
