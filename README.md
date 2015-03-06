# KansaiScene API Documentation

This is the repository for the API documentation of KansaiScene. This documentation.

## Orientation

### Main Content
The biggest part of the documentation can be found in the [api.apib](https://github.com/KansaiScene/kansaiscene.github.io/blob/development/api.apib) file, which is a [api blueprint](https://apiblueprint.org/) document that is internally processed using [aglio](https://github.com/danielgtaylor/aglio) with custom templates that can be found in the `template` folder.

### Special Sections
[`Attribution`](https://github.com/KansaiScene/kansaiscene.github.io/blob/development/attribution.md), [`Branding Guide`](https://github.com/KansaiScene/kansaiscene.github.io/blob/development/branding-guide.md) and [`Terms of use`](https://github.com/KansaiScene/kansaiscene.github.io/blob/development/terms-of-use.md) are woven together through the template using jade tags in the [navigation](https://github.com/KansaiScene/kansaiscene.github.io/blob/11627eb7625f850147006cb846e2eefe755d2216/template/_bootstrap-mixins.jade#L173) and the [content area](https://github.com/KansaiScene/kansaiscene.github.io/blob/11627eb7625f850147006cb846e2eefe755d2216/template/_bootstrap-mixins.jade#L383).

### User UI
The html elements shown in the login user interface are all hosted in the [template](https://github.com/KansaiScene/kansaiscene.github.io/blob/11627eb7625f850147006cb846e2eefe755d2216/template/_bootstrap-mixins.jade#L5). The logic behind it is written using [Ampersand.js](ampersandjs.com) and available in the `client folder`(https://github.com/KansaiScene/kansaiscene.github.io/tree/development/client).

## Scripts
To generate the html page you will need [`node.js`](nodejs.org/download). To build the whole site you can use the `npm run build` command. You can start a development environment using `npm run dev` in which some (but - unfortunately - not all) files can trigger a refresh of the build process and you get an live update. If you have the permissions to do so `npm run deploy` will deploy the site to the master branch.