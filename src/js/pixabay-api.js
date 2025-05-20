// Імпортуємо бібліотеку axios для здійснення HTTP-запитів
import axios from 'axios';

// 🔑 API-ключ для доступу до Pixabay API
const API_KEY = '50309673-ea2b029f8f1cb6745c8643ce8';

// Базовий URL-адрес API Pixabay
const BASE_URL = 'https://pixabay.com/api/';

// Функція для отримання зображень за пошуковим запитом
export async function getImagesByQuery(query) {
  // Параметри запиту до API
  const params = {
    key: API_KEY,              // API-ключ
    q: query.trim(),           // Пошуковий запит (обрізаємо пробіли з обох боків)
    image_type: 'photo',       // Тип зображення — тільки фотографії
    orientation: 'horizontal', // Орієнтація зображення — горизонтальна
    safesearch: true,          // Фільтр безпечного пошуку (виключає небажаний контент)
  };

  // Відправляємо GET-запит на базовий URL з заданими параметрами
  const response = await axios.get(BASE_URL, { params });

  // Повертаємо лише дані з відповіді (response.data містить масив зображень та іншу інформацію)
  return response.data;
}
