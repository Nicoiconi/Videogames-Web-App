export function generateElegantCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let elegantCode = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters?.length);
    elegantCode += characters?.charAt(randomIndex);
  }

  return elegantCode;
}