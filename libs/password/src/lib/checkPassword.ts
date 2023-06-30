import {
    zxcvbn,
    zxcvbnOptions,
    type OptionsType,
    type ZxcvbnResult,
} from '@zxcvbn-ts/core';

export const checkPassword = async (
    pass: string,
    inputs: string[]
): Promise<Omit<ZxcvbnResult, 'password'>> => {
    const commonPackage = await import('@zxcvbn-ts/language-common');
    const dePackge = await import('@zxcvbn-ts/language-en');
    const enPackage = await import('@zxcvbn-ts/language-de');
    const options: OptionsType = {
        dictionary: {
            ...commonPackage.dictionary,
            ...dePackge.dictionary,
            ...enPackage.dictionary,
            userInputs: inputs,
        },
        graphs: commonPackage.adjacencyGraphs,
        useLevenshteinDistance: true,
        levenshteinThreshold: 4,
    };

    zxcvbnOptions.setOptions(options);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = zxcvbn(pass, inputs);
    return result;
};
