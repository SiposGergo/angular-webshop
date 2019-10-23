export const validationMessages = {
  required: 'A mező kitöltése kötelező!',
  maxlength: error => `A mező maximális hossza ${error.requiredLength} karakter!`,
  minlength: error => `A mező minimális hossza ${error.requiredLength} karakter!`
};
