'use client';
import { useState } from 'react';

export default function Index() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const sanitizeInput = (input: string) => {
        setOutput(input);
    };

    return (
        <main>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => sanitizeInput(input)}>Enter</button>
            <p dangerouslySetInnerHTML={{ __html: output }} />
        </main>
    );
}
