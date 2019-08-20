// utile
const msgSendNote = function () {
  infoAfterSend.styleObject.top = '10%';
  infoAfterSend.seen = true;
  setTimeout(() => { infoAfterSend.styleObject.top = '-600px'; }, 2000);
  setTimeout(() => { infoAfterSend.seen = false; }, 2000);
};
const checkedTitle = function (title) {
  if (title.length >= 3 && title.length < 30) {
    return true;
  }
  infoAfterSend.infoAfterSendMsg = 'Merci de donner un titre de plus de 3 caractères et un maximume de 30.';
  msgSendNote();
  return false;
};
const checkedNote = function (note) {
  if (note.length > 3 && note.length < 2000) {
    return true;
  }
  infoAfterSend.infoAfterSendMsg = "Merci d'effectuer une note de plus de 5 caractères. 2000 est la limites.";
  msgSendNote();
  return false;
};
const findTheBiggestID = function () {
  const maxExistingId = Math.max(...listNote.notes.map((item) => item.id));
  return Math.max(maxExistingId, 0) + 1;
};

// variable
let infoAfterSendMsg;
const notesLocalStorage = JSON.parse(localStorage.notes);
// vue.js
const findColor = new Vue({
  el: '#find',
  data: {
    colorToFind: 'all',
    options: [{ text: 'All', value: 'all' }, { text: 'Gris', value: '#69626d' }, { text: 'Cyan', value: '#177e89' }, { text: 'Sang', value: '#32021f' }, { text: 'Pastèle', value: '#8b635c' }, { text: 'Violet', value: '#49306b' }, { text: 'Orange', value: '#6b2000' }, { text: 'Bleu', value: '#15075f' }, { text: 'Rouge', value: '#5c0029' }],
  },
  mounted() {
    this.colorToFind = localStorage.colorToFind;
  },
  watch: {
    colorToFind(colorToFind) {
      localStorage.colorToFind = colorToFind;
    }
  }
});

const listNote = new Vue({
  el: '#listNote',
  data: {
    notes: [],
    nothingNoteFind: false,
  },
  mounted() {
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
    }
  },
  watch: {
    notes(notes) {
      localStorage.notes = JSON.stringify(notes);
    },
  },
  methods: {
    persist() {
      localStorage.notes = JSON.stringify(this.notes);
    },
    notesFiltered() {
      const filterdArray = this.notes.filter((x) => x.color === findColor.colorToFind);
      if (findColor.colorToFind === 'all') {
        this.nothingNoteFind = false;
        return this.notes;
      }
      if (filterdArray.length === 0) {
        this.nothingNoteFind = true;
        return filterdArray;
      }
      this.nothingNoteFind = false;
      return filterdArray;
    },
  },
});
const createNote = new Vue({
  el: '#createNote',
  data: {
    rows: 3,
    message: '',
    titre: '',
  },
});
const infoAfterSend = new Vue({
  el: '#infoAfterSend',
  data: {
    seen: false,
    infoAfterSendMsg: 'La note à été sauvegarder.',
    styleObject: {
      top: '-600px',
    },
  },
});
