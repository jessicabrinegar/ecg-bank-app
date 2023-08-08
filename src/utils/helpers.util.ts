export function isEmailAddress(input: string) {
    if(typeof input !== 'string') {
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
}

export function isUUID(input: string): boolean {
    if(typeof input !== 'string') {
        return false;
    }
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(input);
}

export function extractIdFromUrl(url: string): string | null {
    const idRegex = /^\/accounts\/([a-fA-F0-9-]+)\/.*$/;
    const match = url.match(idRegex);
  
    if (match && match[1]) {
      return match[1];
    }
  
    return null;
}