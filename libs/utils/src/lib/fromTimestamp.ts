export const fromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds

    const formattedDate = date
        .toLocaleDateString('de-DE', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Europe/Berlin',
        })
        .replace(/\./g, '_');

    const formattedTime = date
        .toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Berlin',
        })
        .replace(/:/g, '_');

    return `${formattedDate}_${formattedTime}`;
};
