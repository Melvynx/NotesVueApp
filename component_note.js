const backgroundColors = ['#2d2e30', '#177e89', '#32021f', '#8b635c', '#49306b', '#bc9cb0 ', '#5b9279', '#5c0029'];
Vue.component('note', {
  props: ['note'],
  data() {
    return {
      color: backgroundColors[this.note.color],
      showColor: false,
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
      showListColor: false,
      showValidationDelete: false,
    };
  },

  methods: {
    mouseOver() {
      this.showDelete = true;
      this.showColor = true;
    },
    mouseLeave() {
      this.showDelete = false;
      this.showColor = false;
    },
    deleteNote() {
      this.showValidationDelete = true;
    },
    yesDeleteNote() {
      const { id } = this.note;
      const index = listNote.notes.findIndex((note) => note.id === id);
      if (index > -1) {
        listNote.notes.splice(index, 1);
      }
      this.showValidationDelete = false;
      return true;
    },
    listColor() {
      this.showListColor = !this.showListColor;
    },
    noDeleteNote() {
      this.showValidationDelete = false;
    },
    changeColor(colorIndex) {
      this.color = backgroundColors[colorIndex];
      this.showListColor = false;
      this.note.color = this.color;
      listNote.persist();
    },
    mouseLeaveColor() {
      this.showListColor = false;
    },
    editTitle() {
      this.showEditTitle = true;
      this.$nextTick(() => this.$refs.refEditTitle.focus());
    },
    stopEditTitle() {
      this.showEditTitle = false;
    },
    editNote() {
      this.showEditNote = true;
      this.$nextTick(() => this.$refs.refEditNote.focus());
    },
    stopEditNote() {
      this.showEditNote = false;
    },
    changeRow() {
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
  <div v-bind:style="{ backgroundColor: color || this.note.color }" class="note" @mouseover="mouseOver" @mouseleave="mouseLeave">
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
    <div class="blockofval" v-show="showValidationDelete">
      <div class="validationOfDelete">
        <h3 class="questionValidationDelete">Voulez vous vraiment supprimer cette note ? </h3>
        <p class="infoValidationDelete">Le titre de votre note est : <span class="titleValidationDelete">{{ note.titre }}</span>.</p>
        <button v-on:click="yesDeleteNote" class="buttonYes">OUI</button>
        <button v-on:click="noDeleteNote" class="buttonNo">NON</button>
      </div>
    </div>
    <div id="changeColorBlock" class="changeColorBlock">
      <button 
        @mouseover="listColor" v-bind:style="{ backgroundColor: color || this.note.color }" v-bind:title="infoLabelTitle" class="buttonColor" v-show="showColor" v-on:click="listColor">
      </button>
      <div class="listColor" v-show="showListColor" id="listColor" @mouseleave="mouseLeaveColor">
        <button v-on:click="changeColor(0)" style="background: #2d2e30" class="buttonLabelColor"/>
        <button v-on:click="changeColor(1)" style="background: #177e89" class="buttonLabelColor"/>
        <button v-on:click="changeColor(2)" style="background: #32021f" class="buttonLabelColor"/>
        <button v-on:click="changeColor(3)" style="background: #8b635c" class="buttonLabelColor"/>
        <button v-on:click="changeColor(4)" style="background: #49306b" class="buttonLabelColor"/>
        <button v-on:click="changeColor(5)" style="background: #bc9cb0" class="buttonLabelColor"/>
        <button v-on:click="changeColor(6)" style="background: #5b9279" class="buttonLabelColor"/>
        <button v-on:click="changeColor(7)" style="background: #5c0029" class="buttonLabelColor"/>
      </div>
    </div>
  </div>
  `,
});
