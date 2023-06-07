import { zxcvbnAsync, zxcvbnOptions, ZxcvbnResult } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnDePackage from '@zxcvbn-ts/language-de';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned';

export const checkPassword = async (
    pass: string,
    inputs: string[]
): Promise<Omit<ZxcvbnResult, 'password'>> => {
    const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
    zxcvbnOptions.addMatcher('pwned', matcherPwned);

    const options = {
        dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
            ...zxcvbnDePackage.dictionary,
        },
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        useLevenshteinDistance: true,
    };
    zxcvbnOptions.setOptions(options);

    const { password, ...result } = await zxcvbnAsync(pass, inputs);
    password;
    return result;
};
