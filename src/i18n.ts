import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLng = localStorage.getItem('lng') || 'ru'

void i18n
  .use(initReactI18next)
  .init({
    lng: savedLng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          navbar: {
            brand: 'TravelMag',
            home: 'Home',
          },
          home: {
            title: 'Routes',
            readMore: 'Read more',
          },
          route: {
            notFound: 'Route not found.',
            backHome: 'Back to home',
            descriptionTitle: 'Description',
            placeholder: 'Detailed description will be added later.',
          },
          routes: {
            baikal: {
              title: 'Baikal — the pearl of Siberia',
              short: 'Icy expanses, crystal clear water and unique nature.',
            },
            kamchatka: {
              title: 'Kamchatka — land of volcanoes',
              short: 'Geysers, volcanoes and wild nature at the edge of the world.',
            },
            caucasus: {
              title: 'Caucasus mountains — trekking and nature',
              short: 'High peaks, waterfalls and hospitable auls.',
            },
          },
        },
      },
      ru: {
        translation: {
          navbar: {
            brand: 'TravelMag',
            home: 'Главная',
          },
          home: {
            title: 'Маршруты',
            readMore: 'Подробнее',
          },
          route: {
            notFound: 'Маршрут не найден.',
            backHome: 'Вернуться на главную',
            descriptionTitle: 'Описание',
            placeholder: 'Подробное описание будет добавлено позже.',
          },
          routes: {
            baikal: {
              title: 'Байкал — жемчужина Сибири',
              short: 'Ледяные просторы, прозрачная вода и уникальная природа.',
            },
            kamchatka: {
              title: 'Камчатка — страна вулканов',
              short: 'Гейзеры, вулканы и дикая природа на краю света.',
            },
            caucasus: {
              title: 'Кавказские горы — треккинг и природа',
              short: 'Высокие вершины, водопады и гостеприимные аулы.',
            },
          },
        },
      },
    },
  })

export default i18n


