const findColor = new Vue({
  el: "#find",
  data: {
    colorToFind: "all",
    options: [
      { text: "All", value: "all" },
      { text: "Gris", value: "#69626d" },
      { text: "Cyan", value: "#177e89" },
      { text: "Sang", value: "#32021f" },
      { text: "Pastèle", value: "#8b635c" },
      { text: "Violet", value: "#49306b" },
      { text: "Orange", value: "#6b2000" },
      { text: "Bleu", value: "#15075f" },
      { text: "Rouge", value: "#5c0029" },
    ],
    rightChange: "200px",
    textToFind: "",
    shouldSortByColor: true,
    modeArchived: false,
    archivedModeInfo: "Mode archiver",
    shouldByColorInfo: "Trier date",
  },
  mounted() {
    if (localStorage.colorToFind) {
      this.colorToFind = localStorage.colorToFind;
    }
  },
  watch: {
    colorToFind(colorToFind) {
      localStorage.colorToFind = colorToFind;
      this.textToFind = "";
    },
  },
  methods: {
    displayFindAText() {
      this.rightChange = "0px";
      this.$nextTick(() => this.$refs.refFindText.focus());
    },
    hideFindAText() {
      this.rightChange = "200px";
    },
    sendFindInNote() {
      const findResult = filtreTabTitle(listNote.notes, this.textToFind);
      return findResult;
    },
    shouldSortByColorFind() {
      this.shouldSortByColor = !this.shouldSortByColor;
      listNote.persist();
      if (this.shouldSortByColor) {
        this.shouldByColorInfo = "Trier Date";
      } else {
        this.shouldByColorInfo = "Trier Couleur";
      }
    },
    filterByDate(array) {
      // eslint-disable-next-line no-nested-ternary
      return array.sort((a, b) =>
        a.date > b.date ? 1 : b.date > a.date ? -1 : 0
      );
    },
    IfmodeArchived() {
      this.modeArchived = !this.modeArchived;
      if (this.modeArchived) {
        this.archivedModeInfo = "Note";
      } else {
        this.archivedModeInfo = "Note Archived";
      }
    },
  },
});
const listNote = new Vue({
  el: "#listNote",
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
    // eslint-disable-next-line consistent-return
    notesFiltered() {
      let arrayToFiltre;
      if (findColor.shouldSortByColor) {
        arrayToFiltre = this.sortNoteByColor(this.notes);
      } else {
        arrayToFiltre = this.notes;
      }
      const filterdArrayText = filtreTabTitle(
        arrayToFiltre,
        findColor.textToFind
      );
      const filterdArrayColor = filtreColor(
        filterdArrayText,
        findColor.colorToFind
      );
      const filteredArrayArchived = filtreArchived(
        filterdArrayColor,
        findColor.modeArchived
      );
      if (filteredArrayArchived.length === 0) {
        this.nothingNoteFind = true;
      } else {
        this.nothingNoteFind = false;
        return filteredArrayArchived;
      }
    },
    sortNoteByColor(array) {
      arrayByColor = [];
      if (array) {
        for (i = 0; i < backgroundColors.length; i++) {
          for (e = 0; e < array.length; e++) {
            if (array[e].color === backgroundColors[i]) {
              arrayByColor.push(array[e]);
            }
          }
        }
      }
      return arrayByColor;
    },
  },
});
const createNote = new Vue({
  el: "#createNote",
  data: {
    rows: 3,
    message: "",
    titre: "",
  },
  methods: {
    createNew(newNote) {
      listNote.notes.push(newNote);
    },
  },
});
const infoAfterSend = new Vue({
  el: "#infoAfterSend",
  data: {
    seen: false,
    infoAfterSendMsg: "La note à été sauvegarder.",
    styleObject: {
      top: "-600px",
    },
  },
});
