Vue.component('newnoteform', {
  props: ['note', 'listNote.notes'],
  data() {
    return {
      rows: 3,
      message: '',
      titre: '',
      showListColor: false,
      color: '#2d2e30',
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

    listColor() {
      this.showListColor = true;
    },
    mouseLeaveColor() {
      this.showListColor = false;
    },
    changeColor(color) {
      this.color = backgroundColors[color];
      this.showListColor = false;
    },
    clickSendNote() {
      if (checkedTitle(this.titre) && checkedNote(this.message)) {
        listNote.notes.push({id: String(findTheBiggestID()), titre: this.titre, note: this.message, color: this.color });
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
      <input v-bind:style="{ backgroundColor: this.color }" class="colorForNewNote" type="button" v-on:click="listColor" @mouseover="listColor">

      <div class="listNewColor" v-show="showListColor" id="listColor" @mouseleave="mouseLeaveColor">
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
  `,
});
