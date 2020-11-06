const normalize = (term: string): string => term.toLowerCase().normalize('NFC');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export { normalize, sleep }
