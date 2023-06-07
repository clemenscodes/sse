import {
    zxcvbn,
    zxcvbnOptions,
    type OptionsType,
    type ZxcvbnResult,
} from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnDePackage from '@zxcvbn-ts/language-de';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

export const checkPassword = (
    pass: string,
    inputs: string[]
): Omit<ZxcvbnResult, 'password'> => {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = zxcvbn(pass, inputs);
    return result;
};
