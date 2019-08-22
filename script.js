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
const filtreTabTitle = function (array, text) {
  return array.filter((el) => el.titre.toLowerCase().indexOf(text.toLowerCase()) !== -1);
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
// vue.js
const findColor = new Vue({
  el: '#find',
  data: {
    colorToFind: 'all',
    options: [{ text: 'All', value: 'all' }, { text: 'Gris', value: '#69626d' }, { text: 'Cyan', value: '#177e89' }, { text: 'Sang', value: '#32021f' }, { text: 'Pastèle', value: '#8b635c' }, { text: 'Violet', value: '#49306b' }, { text: 'Orange', value: '#6b2000' }, { text: 'Bleu', value: '#15075f' }, { text: 'Rouge', value: '#5c0029' }],
    rightChange: '200px',
    textToFind: '',
    shouldSortByColor: true,
    modeArchiver: false,
    archiverModeInfo: 'Mode archiver',
    shouldByColorInfo: 'Trier date',
  },
  mounted() {
    if (localStorage.colorToFind) {
      this.colorToFind = localStorage.colorToFind;
    }
  },
  watch: {
    colorToFind(colorToFind) {
      localStorage.colorToFind = colorToFind;
      this.textToFind = '';
    },
  },
  methods: {
    displayFindAText() {
      this.rightChange = '0px';
      this.$nextTick(() => this.$refs.refFindText.focus());
    },
    hideFindAText() {
      this.rightChange = '200px';
    },
    sendFindInNote() {
      const findResult = filtreTabTitle(listNote.notes, this.textToFind);
      return findResult;
    },
    shouldSortByColorFind() {
      this.shouldSortByColor = !this.shouldSortByColor;
      listNote.persist();
      if (this.shouldSortByColor) {
        this.shouldByColorInfo = 'Trier Date';
      // eslint-disable-next-line no-empty
      } else {
        this.shouldByColorInfo = 'Trier Couleur';
      }
    },
    filterByDate(array) {
      // eslint-disable-next-line no-nested-ternary
      return array.sort((a, b) => ((a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)));
    },
    IfmodeArchiver() {
      this.modeArchiver = !this.modeArchiver;
      if (this.modeArchiver) {
        this.archiverModeInfo = 'Note';
      // eslint-disable-next-line no-empty
      } else {
        this.archiverModeInfo = 'Note Archiver';
      }
    },
  },
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
      const findResult = filtreTabTitle(this.notes, findColor.textToFind);
      const filterdArray = this.notes.filter((note) => note.color === findColor.colorToFind);
      if (findColor.textToFind.length > 0) {
        findColor.colorToFind = 'all';
        return findResult;
      }
      if (findColor.shouldSortByColor) {
        if (findColor.colorToFind === 'all') {
          return this.sortNoteByColor();
        // eslint-disable-next-line no-else-return
        } else {
          this.nothingNoteFind = false;
          return filterdArray;
        }
      }
      if (findColor.colorToFind === 'all') {
        this.nothingNoteFind = false;
        return this.notes;
      }
      if (filterdArray.length === 0 || findResult.length === 0) {
        this.nothingNoteFind = true;
        return filterdArray;
      }
    },
    sortNoteByColor() {
      arrayByColor = [];
      if (this.notes) {
        for (i = 0; i < backgroundColors.length; i++) {
          for (e = 0; e < this.notes.length; e++) {
            if (this.notes[e].color === backgroundColors[i]) {
              arrayByColor.push(this.notes[e]);
            }
          }
        }
      }
      return arrayByColor;
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
  methods: {
    createNew(newNote) {
      listNote.notes.push(newNote);
    }
  }
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
