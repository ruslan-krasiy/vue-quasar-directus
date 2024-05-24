export function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export type PasswordValidator = {
  length: boolean;
  capital: boolean;
  number: boolean;
  symbol: boolean;
};


export function validatePassword(password: string, callback: (a: keyof PasswordValidator, b: boolean) => void): boolean {
  // Test length
  const isLong = password.length >= 12;
  callback('length', isLong);

  // Test capital
  const hasCapital = /^(?=.*[A-Z])/.test(password);
  callback('capital', hasCapital);

  // Test number
  const hasNumber = /^(?=.*[0-9])/.test(password);
  callback('number', hasNumber);


  // Test symbol
  const hasSymbol = /^(?=.*[!@#\$%\^&\*_\-=+])/.test(password);
  callback('symbol', hasSymbol)

  return (
    isLong &&
    hasCapital &&
    hasNumber &&
    hasSymbol
  );
}
