/**
 * Create number formatter for game locale which will use default value when formatted values is null
 */
declare function numberFormatterClosure(defaultValue: string): (value?: number) => string;
declare function parseIntAndRemoveNonNum(input: string): number;
export { numberFormatterClosure, parseIntAndRemoveNonNum };
