export enum PasswordStrength {
    Weak,
    Strong,
}

export function passwordStrength(pw: string): PasswordStrength {
    console.log(pw)
    return PasswordStrength.Weak;
}
