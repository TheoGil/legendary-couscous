# Fullwidth animated tile prototype

![Animated preview](./preview.gif)

## About

I choosed to use build an animated tile that showcase Omnipollo's Beers.

Omnipollo's beers are known for their funky, bold and hype style. Building a design around those traits give me a good opportunity to have fun with the animations.

## Online version

[https://theogil.github.io/legendary-couscous/](https://theogil.github.io/legendary-couscous/)

## Building and running on localhost

Install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

To serve production build:

```sh
npx serve dist
```

## Browser support

It has been tested using Chrome 87.0.4280.141 and FireFox 84.0.2.

It uses a bunch of modern features such as prefers-reduce-motion, focus-visible and CSS math functions.
Everything should degrade gracefully and would even work without JS.

It has not been tested with Safari and I expect some cross-browser issues with SVG animations.

## Tech stack

Vanilla JavaScript transpiled with Babel, SCSS, HTML.

I picked vanilla over a framework like React or Vue because for this particular case (quick prototype, not much state handling to do...), a framework seemed like too much overhead.

SCSS because it is awesome.

I delegate code style handling to Prettier (here using it's default settings). As long as it is consistent trough the project, I do not care _that much_ about code style.

GSAP is used to build and control animations.

Splitting.js is used to split text into individually animatable characters.

## Project architecture

```
src/
│
│   // This folder doesn't actually contains the documentation but a build that will be used by Github for the live version
├── docs/
│
├── audio/ // Audio files
│
├── fonts/ // Fonts
│
├── img/ // Images
│
├── js/
│   │   // Main entry file
│   ├── index.js
│   │
│   │   // JS Components are divided into classes
│   ├── components/
│   │
│   │   // Single function files that could be used within any component
│   └── helpers/
│
└── scss/
    │   // Main entry file, no declarations here, only includes
    ├── styles.scss
    │
    │   // Component specific styles
    ├── components/
    │
    │   // Utilities, helpers, mixins, variables...
    └── abstract/
```

# Known issues

- Animation of the ingredients is broken when replaying the animation after resizing the window because the from values are computed using the initial dimensions of the ingredients.

  - Potential fix : recompute the from values at every run of the animation.

- The faked 3D rotation of the can is not physicaly accurate AT ALL. Not really an issue as it is a volontary design decision.

  - Alternative n°1: Use 3D. That could look great but would have a significant impact on performance.

  - Alternative n°2: Ditch completely the fake 3D rotation, and apply a simple X translation to an actual photograph of the beer can. Would be really straightforward to implement but not as fun as the actual animation in my opinion.

## Potential issues

- The position of the ingredients as well as the position of the label are defined within the SCSS files. This will work well for static content but if the content is managed via a CMS, a solution that allows the maintainer to adjust those value without having to modifiy the actual CSS codebase should be implemented. A wysiwyg editor for exemple.

- Splitted words might break in the middle of the word on smaller screens. This will also break the text reveal effect.

  - Potential fix n°1: use text ellipsis to avoid 2 lines words. Not great because it might make the product name unreadable

  - Potential fix n°2: wrap every `.character` into an additional `overflow: hidden` wrapper. This will fix the text reveal effect. Not great because it introduce a LOT of additional markup and we still have the "broken product name" issue.

  - Potential fix n°3: reduce the font size until every word can fit into one line. This is the best solution for static content. But not ideal because the font size will have to be updated everytime a product with a longer word is added.

## Ideas that didn't make the cut

- Use the animated svg background as a mask that reveal a canvas with a lot of particles inside to remind of the beer bubbles ([Something like that](https://codepen.io/theo-gil/pen/aKgQzM)).

- Make some foam come out of the lid when clicking the button.

## Credits

App has been scaffolded with [createapp.dev](https://createapp.dev/).

Design is heavily inspired by [this Dribble shot](https://dribbble.com/shots/14723014-E-Commerce-Web-Interaction-Domingo) by Daniel Tan.

Color palette comes from [Happy Hues](https://www.happyhues.co).

Font is Woodchuck from [Rafael Vecchio](https://www.behance.net/gallery/85930915/WOODCHUCK-FREE-MODERN-SANS-SERIF-FONT-FAMILY).

Ingredients comes from [Pngtree](https://pngtree.com/).

Audio sample comes from [freesound](https://freesound.org/people/MarviinR/sounds/523322/).

The "Sound on/off" and the replay icons come from [Freepik](https://www.freepik.com/).
