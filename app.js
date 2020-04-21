//const add = require("./util.js");
const note = require("./notes.js");
// const notes = readNotes("node.txt");
const chalk = require("chalk");
// console.log(
//   chalk.red(
//     "I am a green line " +
//       chalk.blue.underline.bold("a blue substring") +
//       " that becomes green again!"
//   )
// );
const fs = require("fs");
const yargs = require("yargs");

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.removeNote(argv.title);
  },
});

yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "list",
  describe: "list a note",
  handler() {
    note.getNotes().map((v, index) => {
      console.log(
        chalk.blue.underline.bold(index + 1),
        chalk.blue.underline.bold(v.title),
        chalk.blue.underline.bold(v.body)
      );
    });
  },
});
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const obj = note.readANote(argv.title);
    if (obj === undefined) {
      console.log(chalk.red.underline.bold("cannot find a note"));
    } else {
      console.log(
        chalk.blue.underline.bold(obj.title),
        chalk.blue.underline.bold(obj.body)
      );
    }
  },
});

yargs.parse();
