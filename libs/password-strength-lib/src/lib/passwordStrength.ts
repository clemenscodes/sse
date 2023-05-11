export enum PasswordStrength {
    Weak,
    Strong,
}

export function passwordStrength(
    vname: string,
    nname: string,
    strasse: string,
    hnr: string,
    plz: string,
    city: string,
    pw: string
): PasswordStrength {
    let upperCase = false;
    let lowerCase = false;
    let specialCharacter = false;
    let input = false;

    for (let i = 0; i < pw.length; i++) {
        const b = pw.charAt(i);
        if (
            b === b.toUpperCase() &&
            !upperCase &&
            ((b.charCodeAt(0) > 64 && b.charCodeAt(0) < 91) ||
                (b.charCodeAt(0) > 96 && b.charCodeAt(0) < 123))
        ) {
            upperCase = true;
        }
        if (b === b.toLowerCase() && !lowerCase) {
            lowerCase = true;
        }
        if (
            ((b.charCodeAt(0) >= 32 && b.charCodeAt(0) < 48) ||
                (b.charCodeAt(0) > 57 && b.charCodeAt(0) < 65) ||
                (b.charCodeAt(0) > 90 && b.charCodeAt(0) < 97) ||
                (b.charCodeAt(0) > 123 && b.charCodeAt(0) < 127) ||
                b.charCodeAt(0) > 168) &&
            !specialCharacter
        ) {
            specialCharacter = true;
        }
        if (
            pw.toLowerCase().includes(vname.toLowerCase()) ||
            pw.toLowerCase().includes(nname.toLowerCase()) ||
            pw.toLowerCase().includes(strasse.toLowerCase()) ||
            pw.includes(hnr) ||
            pw.includes(plz) ||
            pw.toLowerCase().includes(city.toLowerCase())
        ) {
            input = true;
        }
    }

    if (
        pw.length >= 8 &&
        upperCase &&
        lowerCase &&
        specialCharacter &&
        !input
    ) {
        return PasswordStrength.Strong;
    } else {
        return PasswordStrength.Weak;
    }
}
