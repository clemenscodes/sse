import { type OptionsType, type ZxcvbnResult } from '@zxcvbn-ts/core';

export const checkPassword = async (
    pass: string,
    inputs: string[]
): Promise<Omit<ZxcvbnResult, 'password'>> => {
    const { zxcvbnAsync, zxcvbnOptions } = await import('@zxcvbn-ts/core');
    const zxcvbnCommonPackage = await import('@zxcvbn-ts/language-common');
    const zxcvbnEnPackage = await import('@zxcvbn-ts/language-en');
    const zxcvbnDePackage = await import('@zxcvbn-ts/language-de');
    const { matcherPwnedFactory } = await import('@zxcvbn-ts/matcher-pwned');

    const options: OptionsType = {
        dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
            ...zxcvbnDePackage.dictionary,
            userInputs: inputs,
        },
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        useLevenshteinDistance: true,
        levenshteinThreshold: 4,
    };

    zxcvbnOptions.setOptions(options);

    const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
    zxcvbnOptions.addMatcher('pwned', matcherPwned);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await zxcvbnAsync(pass, inputs);
    return result;
};
