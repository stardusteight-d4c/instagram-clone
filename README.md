# Instagram | Firebase, NextAuth & TailwindCSS

![banner](banner.png)

> Instagram feed clone, in this project the user can be authenticated via Google Provider using NextAuth, all routes are protected and have different functionality depending on whether the user is authenticated or not. Using Firebase's Firestore service as a Database, from which the user can insert photos, captions and delete them through Firebase service functions like `addDoc` and `deleteDoc`, if the user is not authenticated, he will not be able to perform actions within the app, but he will be able to view the posts.

:arrow_right: TailwindCSS | Rapidly build modern websites

<br />

## TailwindCSS | Rapidly build modern websites 

Tailwind CSS is a framework designed to maximize the potential of Cascading Style Sheets and take them even further. Simple, minimalist and intuitive, it offers lean code, fast customization and easy responsiveness with a Mobile First approach, work the content and form of your components without leaving JSX. 

- <strong>An API for your design system</strong> - Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.

- <strong>Never ship unused CSS</strong> - Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.

- <strong>Hover and focus states</strong> - Want to style something on hover? Stick hover: at the beginning of the class you want to add. Works for focus, active, disabled, focus-within, focus-visible, and even fancy states we invented ourselves like group-hover.

- <strong>Dark Mode</strong> - Don’t want to be one of those websites that blinds people when they open it on their phone at 2am? Enable dark mode in your configuration file then throw dark: in front of any color utility to apply it when dark mode is active. Works for background colors, text colors, border colors, and even gradients.

- <strong>Extend it, tweak it, change it</strong> -Tailwind includes an expertly crafted set of defaults out-of-the-box, but literally everything can be customized — from the color palette to the spacing scale to the box shadows to the mouse cursor. Use the `tailwind.config.js` file to craft your own design system, then let Tailwind transform it into your own custom CSS framework.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      roboto: ['Roboto'],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
```

