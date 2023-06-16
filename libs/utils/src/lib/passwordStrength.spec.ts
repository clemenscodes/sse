import { PasswordStrength, passwordStrength } from './passwordStrength';

describe('passwordStrength', () => {
    it('should be strong', () => {
        expect(
            passwordStrength(
                'Max',
                'Mustermann',
                'Musterstraße',
                '1',
                '123456',
                'Musterhausen',
                'hhhhhh/H'
            )
        ).toEqual(PasswordStrength.Strong);
    });
    it('should be weak', () => {
        expect(
            passwordStrength(
                'Max',
                'Mustermann',
                'Musterstraße',
                '1',
                '123456',
                'Musterhausen',
                'hhhhhh/h'
            )
        ).toEqual(PasswordStrength.Weak);
    });
    it('should be weak', () => {
        expect(
            passwordStrength(
                'Max',
                'Mustermann',
                'Musterstraße',
                '1',
                '123456',
                'Musterhausen',
                'hhhhhhhH'
            )
        ).toEqual(PasswordStrength.Weak);
    });
    it('should be weak', () => {
        expect(
            passwordStrength(
                'Max',
                'Mustermann',
                'Musterstraße',
                '1',
                '123456',
                'Musterhausen',
                'Maxhhh/H'
            )
        ).toEqual(PasswordStrength.Weak);
    });
    it('should be weak', () => {
        expect(
            passwordStrength(
                'Max',
                'Mustermann',
                'Musterstraße',
                '1',
                '123456',
                'Musterhausen',
                '#+2ab/H'
            )
        ).toEqual(PasswordStrength.Weak);
    });
});
