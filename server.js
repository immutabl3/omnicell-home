const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');

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

// routing
app.get('/', (req, res) => res.render('home'));
app.get('/integration', (req, res) => res.render('home', { integrate: true }));
app.get('/download', (req, res) => res.render('home'));

// start up the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));