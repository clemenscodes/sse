export function sanitize(input: string): string {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}
