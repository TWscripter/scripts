export declare function genericLocalQuery<T>(key: string, defaultValue: () => T): StorageQuery<T>;
export declare function genericCachedLocalQuery<T>(key: string, defaultValue: () => T): CachedStorageQuery<T>;
/**
 * Storage IO operations in JSON format.
 */
declare class StorageQuery<T> {
    private readonly key;
    private readonly defaultValueSupplier;
    private readonly storage;
    constructor(key: string, defaultValueSupplier: () => T, storage: Storage);
    get(): T;
    set(value: T): void;
    setCallback(storeCallback: (value: T) => void): void;
    exist(): boolean;
    remove(): void;
}
declare class CachedStorageQuery<T> {
    value: T;
    private readonly query;
    constructor(query: StorageQuery<T>);
    store(storeCallback?: (value: T) => void): void;
    remove(): void;
    forceRefresh(): T;
}
export {};
