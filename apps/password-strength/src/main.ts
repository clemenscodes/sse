import { PasswordStrength, passwordStrength } from '@sse/password-strength-lib';

const strength = passwordStrength(
    'Max',
    'Mustermann',
    'Musterstraße',
    '1',
    '123456',
    'Musterhausen',
    'hhhhhh/H'
);

if (strength === PasswordStrength.Weak) {
    console.log('Weak password');
}
if (strength === PasswordStrength.Strong) {
    console.log('Strong password');
}
