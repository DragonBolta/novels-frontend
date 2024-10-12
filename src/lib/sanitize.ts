function sanitizeFilename(filename: string): string {
    // Windows invalid characters for filenames: <>:"/\|?* and prevent control characters
    const invalidChars = /[<>:"/\\|?*]/g;
    let sanitized = filename.replace(invalidChars, '');

    // Strip leading/trailing spaces and periods
    sanitized = sanitized.trim().replace(/\.+$/, '');

    // Reserved filenames in Windows (e.g., "CON", "PRN", etc.)
    const reservedNames = new Set([
        "CON", "PRN", "AUX", "NUL",
        "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
        "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
    ]);

    // Check if the sanitized filename is a reserved name, and append an underscore if so
    if (reservedNames.has(sanitized.toUpperCase())) {
        sanitized += '_';
    }

    return sanitized;
}

export default sanitizeFilename;