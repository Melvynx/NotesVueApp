Vue.component('note', {
  props: ['note'],
  data() {
    return {
      showLabel: false,
      showDelete: false,
      showEditTitle: false,
      showEditNote: false,
      rowChange: 3,
      infoDeleteTitle: 'Un click pour supprimer une note.',
      infoLabelTitle: 'Un click pour modifier le Label (couleur)',
      styleButton: {
        background: '#2d2e30',
        border: '1px solid #d1d1d9',
      },
      showListLabel: false,
    };
  },

  methods: {
    mouseOver(event) {
      this.showDelete = true;
      this.showLabel = true;
    },
    mouseLeave(event) {
      this.showDelete = false;
      this.showLabel = false;
    },
    deleteNote(event) {
      const { id } = this.note;
      const index = listNote.notes.findIndex((note) => note.id === id);
      if (index > -1) {
        listNote.notes.splice(index, 1);
      }
      return true;
    },
    listLabel() {
      this.showListLabel = !this.showListLabel;
    },
    editTitle(event) {
      this.showEditTitle = true;
      this.$nextTick(() => this.$refs.refEditTitle.focus());
    },
    stopEditTitle() {
      this.showEditTitle = false;
    },
    editNote(event) {
      this.showEditNote = true;
      this.$nextTick(() => this.$refs.refEditNote.focus());
    },
    stopEditNote() {
      this.showEditNote = false;
    },
    changeRow(event) {
      const messageSplit = this.note.note.split('\n');
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rowChange = messageSplitLength + 1;
      }
    },
    countNombreCaractres() {
      titleLenght = this.note.titre.length;

      if (titleLenght > 31) {
        this.stopEditTitle();
        infoAfterSend.infoAfterSendMsg = 'Merci de ne pas dépasser 30 caractères pour le titre.';
        msgSendNote();
      }
    },
  },
  template: `
  <div class="note" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <h1 
      v-show="!showEditTitle"
      v-on:click="editTitle">
      {{ note.titre }}
    </h1>
    <input v-on:keyup.enter="stopEditTitle" v-on:keyup="countNombreCaractres" v-show="showEditTitle" ref="refEditTitle" class="changeNoteInput" type="text" v-model="note.titre" @focusout="stopEditTitle" v-on:input="$emit('edit-note-storage')">
    <p class="noteContenue" v-show="!showEditNote" v-on:click="editNote">{{ note.note }}</p>
    <textarea 
      v-show="showEditNote"
      ref="refEditNote"
      v-on:keyup="changeRow" 
      v-bind:rows="rowChange" 
      class="changeNoteTextarea"
      @focusout="stopEditNote"
      type="text"
      v-on:input="$emit('edit-note-storage')"
      v-model="note.note">
    </textarea> 
    <button v-bind:title="infoDeleteTitle" class="buttonDelete" v-show="showDelete" v-on:click="deleteNote">
      <img src="trash.svg" class="svgTrash" />
    </button>
    <div id="changeLabelBlock" class="changeLabelBlock">
      <button 
        v-bind:style="styleButton" v-bind:title="infoLabelTitle" class="buttonLabel" v-show="showLabel" v-on:click="listLabel">
      </button>
      <div class="listLabel" v-show="showListLabel" id="listLabel">
        <button style="background: #2d2e30; border-color: #93969c" class="buttonLabelColor"/>
        <button style="background: #21355d; border-color: #64618e" class="buttonLabelColor"/>
        <button style="background: #5a2754; border-color: #8f4bb0" class="buttonLabelColor"/>
        <button style="background: #336c72; border-color: #6e7c88" class="buttonLabelColor"/>
        <button style="background: #6e2525; border-color: #86474e" class="buttonLabelColor"/>
        <button style="background: #5b4429; border-color: #7b6556" class="buttonLabelColor"/>
        <button style="background: #395741; border-color: #404c5b" class="buttonLabelColor"/>
        <button style="background: #21355d; border-color: #64618e" class="buttonLabelColor"/>
      </div>
    </div>
  </div>
  `,
});
