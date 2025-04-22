// helpers.js

// Validar email simple
export const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// Validar contraseña mínima (6 caracteres)
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Capitaliza la primera letra de una palabra
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Simula una espera (útil para testing o delays)
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
