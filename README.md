![BNOW Logo](https://4b7w13oy.birminghammuseums.org.uk/og-image.png)

## Description

This repo contains the website of [Birmingham Now](https://birminghamnow.co.uk), an interactive digital map developed by Birmingham Museums which brings together the sounds clips from the past and present from across Birmingham.

Birmingham Now was created and curated by Candice Nembhard as part of The Woven Foundation Curatorial Fellowship. The project was made possible with support and funding from The Woven Foundation and developed and facilitated by Birmingham Museums Trust. The platform was developed by Bruno St-Jacques (Landozone) and designed by Devision.

## Technologies

This is a [Next.js](https://nextjs.org) app using the [App Router](https://nextjs.org/docs/app). Data is sourced from [Payload](https://payloadcms.com/) and the backend lives on the same server at /admin. The map is powered by [Mapbox](https://www.mapbox.com/).

## Installation

1. Use the git CLI to close the repo

```
gh repo clone brunosj/bnow
```

2. Install dependencies

```bash
pnpm install
# or
yarn install
```

3. Navigate into the site's directory and start the development server

```bash
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend, and [http://localhost:3000/admin](http://localhost:3000/admin) for the backend.

## Structure

```
.
├── node_modules
├── public
└── src
    ├── app
    ├── payload
├── .eslintrc.json
├── .gitignore
├── next-i18next.config.js
├── next-config.js
├── pnpm-lock.yaml
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json


```

## Further development

This repository is maintained by [brunosj](https://github.com/brunosj).
