Vue.component('newnoteform', {
  data() {
    return {
      rows: 3,
      message: '',
      titre: '',
    };
  },
  methods: {
    change() {
      const messageSplit = this.message.split('\n');
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rows = messageSplitLength + 1;
      }
    },
    clickSendNote() {
      if (checkedTitle(this.titre) && checkedNote(this.message)) {
        listNote.notes.push({ id: String(findTheBiggestID()), titre: this.titre, note: this.message });
        this.message = '';
        this.titre = '';
        msgSendNote();
        infoAfterSend.infoAfterSendMsg = 'La note à été sauvegarder.';
      }
    },
  },
  template: `
    <div id="createNoteComponent">
      <input v-model="titre" type="text" class="titleCreate" id="titleNote" placeholder="Titre...">
      <textarea class="noteCreate createNoteTextArea" v-model="message" v-on:keyup="change" id="containedNote" placeholder="Note..." v-bind:rows="rows"></textarea><br/>
      <input class="createNoteButton" type="button" v-on:click="clickSendNote" id="sendNote" value="Noter">
    </div>
  `,
});
