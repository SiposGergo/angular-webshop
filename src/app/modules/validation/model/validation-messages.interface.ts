export interface ValidationMessages {
  [errorKey: string]: string | ((object) => string);
}
