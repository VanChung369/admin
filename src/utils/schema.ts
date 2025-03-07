import { object, string } from 'yup';

export function passwordValidate(pw: string): number {
  return (
    (/.{8,}/.test(pw) ? 1 : 0) *
    ((/[a-z]/.test(pw) ? 1 : 0) +
      (/[A-Z]/.test(pw) ? 1 : 0) +
      (/\d/.test(pw) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(pw) ? 1 : 0))
  );
}
