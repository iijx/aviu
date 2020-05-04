const util = require('./util');
const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');

const run = async () => {
    // list all operater
    util.interactive.listAllOperaters();

    await util.interactive.askOperater();

    await util.interactive.askSource();

    await util.interactive.startWork();
}

run();