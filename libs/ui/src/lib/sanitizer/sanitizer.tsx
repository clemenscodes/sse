'use client';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SanitizerProps {}

export function Sanitizer({ ...props }: SanitizerProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const sanitizeInput = (input: string) => {
        setOutput(input);
    };

    return (
        <>
            <input
                aria-label="xss-input"
                type="text"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => sanitizeInput(input)}>Sanitize</button>
            <p>Custom Sanitization: </p>
            <p
                data-testid="xss-output"
                dangerouslySetInnerHTML={{ __html: output }}
            />
            <p>React Sanitization: </p>
            <p data-testid="react-sanitized">{output}</p>
        </>
    );
}

export default Sanitizer;
