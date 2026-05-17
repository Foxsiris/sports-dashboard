# Sports Dashboard

Дашборд с ближайшими турнирами CS2, гонками Formula 1 и боями UFC. Тёмная неоновая тема, адаптивный layout, обратный отсчёт до каждого события.

**Live:** https://foxsiris.github.io/sports-dashboard/

## Стек

- React 19 + Vite
- Публичные API без ключей:
  - [Jolpica F1 API](https://api.jolpi.ca/ergast/f1/) — гонки Formula 1
  - [TheSportsDB](https://www.thesportsdb.com/api.php) — UFC и CS2
- GitHub Actions → GitHub Pages

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Каждый push в `main` автоматически билдит и публикует на GitHub Pages через workflow `.github/workflows/deploy.yml`.
После первого пуша зайдите в **Settings → Pages** и установите **Source: GitHub Actions**.
