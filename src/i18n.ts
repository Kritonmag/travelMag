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
            login: 'Log in',
          },
          home: {
            title: 'Routes',
            readMore: 'Read more',
            heroTitle: 'Find your outside',
            searchPlaceholder: 'Search routes',
            sections: {
              topRoutes: 'Top routes',
              ads: 'Sponsored',
              guides: 'Local guides',
              activities: 'Activities',
            },
          },
          activities: {
            hiking: 'Hiking',
            running: 'Running',
            roadBiking: 'Road biking',
            walking: 'Walking',
            driving: 'Driving',
            offroad: 'Off-road',
            crossCountrySkiing: 'Cross-country skiing',
            alpineSkiing: 'Alpine skiing',
            snowboarding: 'Snowboarding',
          },
          difficulty: 'Difficulty',
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
            login: 'Войти',
          },
          home: {
            title: 'Маршруты',
            readMore: 'Подробнее',
            heroTitle: 'Найди маршрут для своего приключения',
            searchPlaceholder: 'Поиск маршрутов',
            sections: {
              topRoutes: 'Топ маршруты',
              ads: 'Реклама',
              guides: 'Гиды',
              activities: 'Активности',
            },
          },
          activities: {
            hiking: 'Хайкинг',
            running: 'Бег',
            roadBiking: 'Шоссейный велоcпорт',
            walking: 'Пешие прогулки',
            driving: 'Езда на машинах',
            offroad: 'Офф-роуд',
            crossCountrySkiing: 'Лыжные прогулки',
            alpineSkiing: 'Горные лыжи',
            snowboarding: 'Сноуборд',
          },
          difficulty: 'Сложность',
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


