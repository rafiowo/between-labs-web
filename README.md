# Between website

A product showcase for the Between iOS debt tracker, built with plain HTML, CSS,
and JavaScript. The website runs without dependencies or a build step.

## Open it

Open `dist/index.html` in your browser, or serve it locally:

```sh
python3 -m http.server 4173 --directory dist
```

Then visit http://localhost:4173.

## Project structure

```text
Between-Website/
├── dist/                       # Website source; also ready to host
│   ├── index.html              # Page content, organized by section
│   └── assets/
│       ├── css/
│       │   ├── base.css        # Colors, typography, navigation, hero
│       │   ├── preview.css     # Phone UI, balance card, people filters
│       │   ├── sections.css    # Features, repayment demo, workflow, footer
│       │   └── responsive.css  # Breakpoints and reduced-motion support
│       └── js/
│           └── main.js         # Sample data and demo interactions
├── .editorconfig               # Consistent editor indentation and line endings
├── .prettierrc.json             # Formatting rules
├── .prettierignore              # Files excluded from formatting
├── .gitignore
├── .openai/hosting.json         # Existing Sites deployment identity
├── package.json                # Optional developer commands
├── package-lock.json           # Pinned formatter dependency
└── README.md
```

`dist` contains the editable source, not generated or minified files. There is no
second copy to keep in sync. Upload its contents to any static host.

## Where to make changes

| Change                                       | File / location                               |
| -------------------------------------------- | --------------------------------------------- |
| Headlines, descriptions, navigation, buttons | `dist/index.html`                             |
| App colors and shared typography             | `:root` and body rules in `base.css`          |
| Phone preview appearance                     | `preview.css`                                 |
| Feature cards and lower sections             | `sections.css`                                |
| Mobile and tablet layouts                    | `responsive.css`                              |
| Names and balances in the preview            | `SAMPLE_PEOPLE` in `main.js`                  |
| Repayment amounts                            | `REPAYMENT_DEMO` in `main.js`                 |
| App Store link                               | Replace the preview CTA links in `index.html` |

CSS loads in the order shown above. Keep `responsive.css` last so its breakpoint
rules override the default layout. Page section comments match the visible
sections. JavaScript keeps people filtering and the repayment demo in separate
initialization functions.

## Formatting and checks

Developer tooling is optional. Install it once if you want automatic formatting:

```sh
npm ci
npm run format
npm run format:check
npm run check
```

Prettier uses two-space indentation and a 100-character target line width.
`npm run check` checks JavaScript syntax. No packages are loaded by the website.

## Design and demo data

The original SwiftUI palette maps to these CSS values:

| Token                  | Color     |
| ---------------------- | --------- |
| Ink                    | `#12332E` |
| Mint                   | `#C7F0AD` |
| Green                  | `#217352` |
| Orange                 | `#A64D26` |
| iOS grouped background | `#F2F2F7` |

The preview is HTML/CSS with fictional records. It does not connect to an actual
ledger or move money. Reloading resets the demo. No App Store URL was supplied,
so the main buttons link to the preview.

## Hosting

The existing Sites identity is stored in `.openai/hosting.json`. Keep it when
updating this Site; remove that folder before registering a different Site.
For other static hosts, publish only the contents of `dist`.
