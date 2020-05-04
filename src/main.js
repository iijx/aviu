const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');

const run = async () => {
  // show script introduction
  init();
  // ask questions
  askQuestions()
  // create the file
  // show success message
};

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node JS CLI", {
        // font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
}

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".rb", ".js", ".php", ".css"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

run();