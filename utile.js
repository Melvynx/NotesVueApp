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
  if (!text) {
    return array;
  }
  return array.filter((ar) => ar.titre.toLowerCase().indexOf(text.toLowerCase()) !== -1);
};
const filtreColor = function (array, colorToFind) {
  if (colorToFind === 'all') {
    return array;
  }
  return array.filter((ar) => ar.color === colorToFind);
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
