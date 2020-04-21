const fileSystem = require("fs");
const chalk = require("chalk");

// adding notes
const addNote = (title, body) => {
  const allNotes = loadNotes();
  const duplicateNote = allNotes.find((note) => note.title === title);
  debugger;
  if (!duplicateNote) {
    allNotes.push({
      title: title,
      body: body,
    });
    save(allNotes);
    console.log(chalk.blue.underline.bold("added a note"));
  } else {
    console.log(chalk.red.underline.bold("cannot add a note"));
  }
};

// saving notes
const save = (note) => {
  fileSystem.writeFileSync("1-json.json", JSON.stringify(note));
};

//load all notes
const loadNotes = () => {
  try {
    const data = fileSystem.readFileSync("1-json.json");
    return JSON.parse(data.toString());
  } catch (e) {
    console.log(e);
  }
};

const removeNote = (title) => {
  const allNotes = loadNotes();
  const duplicateNote = allNotes.filter((note) => note.title !== title);

  if (duplicateNote.length != 0) {
    save(duplicateNote);
    console.log(chalk.blue.underline.bold("removed a note"));
  } else {
    console.log(chalk.red.underline.bold("cannot removed a note"));
  }
};

const getNotes = () => loadNotes();

const readANote = (title) => {
  const allNotes = loadNotes();
  const readNote = allNotes.find((note) => note.title === title);
  if (readNote) {
    return readNote;
  } else {
    return undefined;
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  getNotes: getNotes,
  readANote: readANote,
};
