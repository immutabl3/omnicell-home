const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');

const { PORT } = process.env;

const app = express();

// security
app.use(helmet());

// favicon request
app.use(favicon(`${__dirname}/assets/favicon.ico`));

// asset compression (gzip)
app.use(compression());

// logging
app.use(morgan());	

// expose built assets
app.use('/public', express.static('public'));

// routing
app.get('/', (req, res) => res.sendFile('home.html'));

// error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
	res.status(+err.code || 500).json({ message: err.message, stack: err.stack });
});

// start up the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));