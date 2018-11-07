# omnicell-home

See the code for more in-depth comments.

This is a recreation of the [original Omnicell home page](https://www.omnicell.com/us/en_us)
with a [new design](https://app.zeplin.io/project/5bd747d9f160e175aaf67a04/screen/5bdc57ae5909a6641bbcefc1)

## Installation

1. [Node and npm](https://nodejs.org/en/download/) are required to run the
project. See `engines` in the `package.json` for versions
1. Create a [`.env`](https://www.npmjs.com/package/dotenv) file in the 
root of the project and add your desired `PORT` number
1. Open a terminal
1. Run `npm install` to install dependencies
1. Run `npm run assets` to move static assets into the public directory
1. Run `npm run build:css` to build the sass into css
1. Run `npm run build:js` to build the javascript
1. Run `npm run dev`

## URLs

1. `/` to view the site
1. `/download` to download a zip of this project
1. `/integration` to view the site with additional (original) css and js included