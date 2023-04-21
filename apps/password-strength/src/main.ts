import { PasswordStrength, passwordStrength } from '@sse/password-strength-lib'

const strength = passwordStrength("password")

if (strength === PasswordStrength.Weak) {
    console.log('Weak password')
}
