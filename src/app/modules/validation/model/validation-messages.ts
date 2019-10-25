export const validationMessages = {
  required: 'A mező kitöltése kötelező!',
  maxlength: error => `A mező maximális hossza ${error.requiredLength} karakter!`,
  minlength: error => `A mező minimális hossza ${error.requiredLength} karakter!`,
  max: error => `A mező maximális értéke: ${error.max}!`,
  min: error => `A mező minimális értéke: ${error.min}!`,
  integer: 'Az értéknek egész számnak kell lennie!'
};
