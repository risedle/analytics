# Risedle Analytics

This repository contains the interface of Risedle Analytics.

## Get started

Then clone the repository:

    git clone git@github.com:risedle/analytics.git
    cd analytics/

Install the dependencies:

    npm install

Run the development server:

    npm run dev

The app entrypoint is on the [`src/pages/_app.tsx`](./src/pages/_app.tsx).

To changes component for each page, you may go to directly to the page component. For example, if you want to update something on the homepage go to
directly to [`src/pages/index.tsx`](src/pages/index.tsx).

Risedle Analytics is using [Next.js](https://nextjs.org/) and deployed on [Cloudflare Pages](https://developers.cloudflare.com/pages/).