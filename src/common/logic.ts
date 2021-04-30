declare var game_data: any;

/**
 * Create number formatter for game locale which will use default value when formatted values is null
 */
function numberFormatterClosure(defaultValue: string): (value?: number) => string {
    const formatter = new Intl.NumberFormat(game_data.locale.replace("_", "-"));
    return (value?: number) => {
        if (value == null) return defaultValue;
        return formatter.format(value);
    };
}

function parseIntAndRemoveNonNum(input: string): number {
    const parsed = parseInt(input.replace(/\D/g, ''));
    if (isNaN(parsed)) {
        return 0;
    } else return parsed;
}


export {
    numberFormatterClosure,
    parseIntAndRemoveNonNum
}