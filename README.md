
# Famous Roasters - Frontend

[![Test and Build](https://github.com/Famous-Roasters/frontend/actions/workflows/build.yml/badge.svg)](https://github.com/Famous-Roasters/frontend/actions/workflows/build.yml)
[![Test, Build and Deploy](https://github.com/Famous-Roasters/frontend/actions/workflows/build_main.yml/badge.svg)](https://github.com/Famous-Roasters/frontend/actions/workflows/build_main.yml)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=sqale_rating&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=reliability_rating&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=security_rating&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=bugs&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=coverage&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=code_smells&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=sqale_index&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Famous-Roasters_frontend&metric=vulnerabilities&token=d444da0936f388e6ec530f34ff77f9005eb8805d)](https://sonarcloud.io/summary/new_code?id=Famous-Roasters_frontend)

<details open="open">  
  <summary>Table of Contents:</summary>  
  <ol>  
    <li><a href="#about">About</a></li>  
    <li><a href="#getting-started">Getting started</a></li>  
    <li><a href="#scripts">Scripts</a></li>  
    <li><a href="#create-react-app">Create React App</a></li>  
    <li><a href="#structure-overview">Structure Overview</a></li>  
    <li><a href="#tailwind-css-and-tailwind-ui">Tailwind CSS & TailwindUI</a></li>  
    <li><a href="#storybook">Storybook</a></li>
    <li><a href="#i18n">i18n</a></li>  
    <li><a href="#commiting-code">Commiting code</a></li>  
    <li><a href="#unit-tests">Unit tests</a></li>
    <li><a href="#github-actions">GitHub Actions</a></li>  
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#questions">Questions?</a></li>
  </ol>  
</details>  



<!-- About -->  
## About
This frontend app for Famous Roasters is written in TypeScript, using Create React App, Tailwind CSS and Tailwind UI, Storybook and i18next.

<!-- Getting Started -->  
## Getting Started
1. Make sure you have [Node](https://nodejs.org/) `^14.18.1` and [Yarn](https://yarnpkg.com/) `^1.22.17` running in your machine.
2. Execute `yarn` to resolve dependencies.
3. Run the project with `yarn start`

For handling node versioning it is recommended to have node setup using [nvm](https://github.com/nvm-sh/nvm).

For more info on getting started, please read the <a href="#scripts">Scripts</a> section.

<!-- Scripts -->  
## Scripts

#### `yarn start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.
You will also see any lint errors in the console.

#### `yarn build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimises the build for the best performance. The build is minified and the filenames include the hashes.
Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn serve`
Serves the production build.

#### `yarn test`
Launches the (unit/snapshot) test runner in the interactive watch mode.  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn test:watch`
Launches the (unit/snapshot) test runner scoping only the not commited changes.

#### `yarn test:watchAll`
Launches the (unit/snapshot) test runner scoping all the project files.

#### `yarn test:ci`
Launches the (unit/snapshot) test runner in CI mode.

#### `yarn test:fix`
Launches the (unit/snapshot) test runner in CI mode and attempts to fix automatically any failing snapshot.

#### `yarn lint`
Runs linter. Lint configuration can be found at `.eslintrc` and `.eslintignore`.

#### `yarn lint:fix`
Runs linter and attempts to fix linting issues.

#### `yarn prettier`
Runs prettifier.

#### `yarn prettier:write`
Runs prettifier and attempts to fix pretty issues.

#### `yarn postinstall`
(Post)installs Husky, pre-commit and pre-push hooks. See config in `.husky` folder.

#### `yarn storybook`
Compiles and runs storybook in dev mode.

#### `yarn build-storybook`
Builds storybook as a static build application.

<!-- Create React App -->  
## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

<!-- Structure Overview -->  
## Structure Overview
```  
/                                     # root folder  
├── .github                           # github actions workflows (yml), PR template ├── .husky                            # pre-commit and pre-push actions  
├── .storybook                        # storybook configuration files 
├── public                            # static public files
├── src                               # repo source files  
│   ├── _mocks                        # mock objects  
│   ├── assets                        # source code assets  
│   │   └── i18n                      # translations json files
│   ├── components                    # components folder  
│   │   ├── ...    
│   │   ├── <Component>  
│   │   │   ├── __snapshots__         # generated snapshots  
│   │   │   ├── <Component>.test.tsx  # component test file  
│   │   │   ├── <Component>.tsx       # component source code  
│   │   │   └── index.ts              # module named exports
│   │   └── ...  
│   ├── config                        # i18n config  
│   ├── docs                          # documentation
│   │   └── storybook                 # storybook docs
│   ├── utils                         # utilities and helpers  
│   ├── views                         # pages/views  
│   │   ├── ...  
│   │   ├── <Page>  
│   │   │   ├── __snapshots__         # generated snapshots  
│   │   │   ├── <Page>.test.tsx       # page test file  
│   │   │   ├── <Page>.tsx            # page source code  
│   │   │   └── index.ts              # module named exports
│   │   └── ...  
│   ├── App.tsx                       # root app file, outer routing
│   └── index.css                     # css including tailwind binding
├── .commitlintrc.js                  # commitlint config  
├── .eslintignore                     # ignores for eslint  
├── .eslintrc                         # eslint config  
├── .gitignore                        # gitignore  
├── .prettierignore                   # ignores for code prettier  
├── .prettierrc                       # code prettier config  
├── package.json                      # package file  
├── README.md                         # this file  
├── tailwind.config.js                # tailwind config  
├── tsconfig.json                     # typescript config  
└── yarn.lock                         # lock file
```  

<!-- Tailwind -->  
## Tailwind CSS and Tailwind UI
This application uses [Tailwind CSS](https://tailwindcss.com/) framework and [Tailwind UI](https://tailwindui.com/) as UI references, [HeadlessUI](https://headlessui.dev/) as accessible UI components library and the icon library [Hero Icons](https://heroicons.com/).

<!-- Storybook -->  
## Storybook
This app includes [Storybook](https://storybook.js.org/docs/react/get-started/introduction) to support building the UI, document it and facilitate the hand-by-hand work between engineers and designers. All the configuration can be found in `.storybook` folder, including `postcss`, `tailwind` and `i18next` plugins.

<!-- i18n -->  
## i18n
i18n is handled by [i18next](https://www.i18next.com/). As of today, the only available language is german - `de`.

The configs for i18next can be found at `src/config/i18n/i18n.ts` and the language json files at `src/assets/i18n`.

<!-- Commiting code -->  
## Commiting code
When commiting code, this repository is following [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). There is a precommit hook triggered following the commitlint configuration set at `.commitlintrc.json`.

These commit patterns are enabling later on a correct semantic release integration.

<!-- Unit tests -->  
## Unit tests
Each new file must have at least a snapshot test. Snapshots are generated on build and compared against the stored snapshots. Tests are written using [Jest](https://jestjs.io/) and [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/)

<!-- GitHub -->  
## GitHub Actions
GitHub workflows is our solution for CI/CD and the config can be found at `.github/workflows`.  There are as of today two workflows:

#### `test-and-build`
- Executes for any branch except of `main`
- Environment name: `test`
- Tasks: installs dependencies, executes lint, executes prettier, executes unit tests with coverage, builds and packages.

#### `test-build-deploy`
- Executes only for `main` branch (typically after a PR merge)
- Environment name: `staging`
- Tasks: all the tasks done by `test-and-build` plus configure credentials and push to AWS S3

<!-- Deployment -->  
## Deployment
Deployment to staging is configured automatically for the `main` branch. For details, check the [GitHub Actions](#github-actions) section above.
The deployed app can be found [here](https://d1ma33i6h3eq7r.cloudfront.net/).

<!-- Questions? -->  
## Questions?
For more details or technical questions, please reach out! Made with love by BCGDV.

Contact: [Juan Minnocci](mailto:juan.minnocci@bcgdv.com)