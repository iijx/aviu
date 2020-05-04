const shell = require('shelljs');
const path = require('path');
const config = require('./config');

const operaters = require('./operaters');
const interactive = require('./interactive');


module.exports = {
    operaters,
    interactive,
}