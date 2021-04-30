export function genericLocalQuery<T>(key: string, defaultValue: () => T): StorageQuery<T> {
    return new StorageQuery<T>(key, defaultValue, localStorage)
}
export function genericCachedLocalQuery<T>(key: string, defaultValue: () => T): CachedStorageQuery<T> {
    return new CachedStorageQuery<T>(genericLocalQuery<T>(key, defaultValue));
}

/**
 * Storage IO operations in JSON format.
 */
class StorageQuery<T> {
    private readonly key: string
    private readonly defaultValueSupplier: () => T;
    private readonly storage: Storage;

    constructor(key: string, defaultValueSupplier: () => T, storage: Storage) {
        this.key = key
        this.defaultValueSupplier = defaultValueSupplier;
        this.storage = storage;
    }

    get(): T {
        const storedValue = this.storage.getItem(this.key);
        if (storedValue === null) {
            const defaultValue = this.defaultValueSupplier();
            this.set(defaultValue);
            return defaultValue
        }

        return JSON.parse(storedValue);
    }
    set(value: T) {
        this.storage.setItem(this.key, JSON.stringify(value))
    }
    setCallback(storeCallback: (value: T) => void) {
        const storedVal = this.get()
        storeCallback(storedVal)
        this.set(storedVal)
    }
    exist(): boolean {
        return this.storage.getItem(this.key) != null
    }
    remove() {
        this.storage.removeItem(this.key);
    }
}

class CachedStorageQuery<T> {
    value: T;
    private readonly query: StorageQuery<T>;

    constructor(query: StorageQuery<T>) {
        this.query = query;
        this.value = query.get();
    }

    store(storeCallback: (value: T) => void = (value: T) => {}) {
        storeCallback(this.value)
        this.query.set(this.value)
    }
    remove() {
        this.query.remove();
    }
    forceRefresh(): T {
        this.value = this.query.get();
        return this.value;
    }
}