const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const media = require('./media');
const pkg = require('./package.json');

const { PORT } = process.env;

const app = express();

// security
app.use(helmet());

// favicon request
app.use(favicon(`${__dirname}/assets/favicon.ico`));

// asset compression (gzip)
app.use(compression());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// logging
app.use(morgan('tiny'));	

// expose built assets
app.use('/public', express.static('public'));

// the home page
app.get('/', (req, res) => res.render('home'));
// the home page with additional scripts/styles from the original home page
app.get('/integration', (req, res) => res.render('home', { integrate: true }));
// redirect to the download link
app.get('/download', (req, res) => res.redirect(pkg.repository.download));
app.use('/video', media);

// start up the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));