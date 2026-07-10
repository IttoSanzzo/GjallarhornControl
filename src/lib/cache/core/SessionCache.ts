"use client";

export interface SessionCacheOptions {
	ttlMs?: number;
}

interface CacheEntry<T> {
	expiresAt: number;
	value: T | null;
}

export class SessionCache<TKey, TValue> {
	private readonly prefix: string;
	private readonly ttlMs: number;

	private readonly pending = new Map<string, Promise<TValue | null>>();

	constructor(prefix: string, options?: SessionCacheOptions) {
		this.prefix = prefix;
		this.ttlMs = options?.ttlMs ?? 5 * 60 * 1000;
	}

	private buildKey(key: TKey): string {
		return `${this.prefix}:${JSON.stringify(key)}`;
	}

	public get(key: TKey): TValue | null | undefined {
		const storageKey = this.buildKey(key);

		const raw = sessionStorage.getItem(storageKey);
		if (raw == null) return undefined;

		try {
			const entry = JSON.parse(raw) as CacheEntry<TValue>;

			if (entry.expiresAt <= Date.now()) {
				sessionStorage.removeItem(storageKey);
				return undefined;
			}

			return entry.value;
		} catch {
			sessionStorage.removeItem(storageKey);
			return undefined;
		}
	}

	public set(key: TKey, value: TValue | null | undefined): void {
		const storageKey = this.buildKey(key);
		if (value === undefined) {
			sessionStorage.removeItem(storageKey);
			return;
		}

		const entry: CacheEntry<TValue | null> = {
			value,
			expiresAt: Date.now() + this.ttlMs,
		};

		sessionStorage.setItem(storageKey, JSON.stringify(entry));
	}

	public invalidate(key: TKey): void {
		sessionStorage.removeItem(this.buildKey(key));
		this.pending.delete(this.buildKey(key));
	}

	public clear(): void {
		const prefix = `${this.prefix}:`;

		for (let i = sessionStorage.length - 1; i >= 0; i--) {
			const key = sessionStorage.key(i);

			if (key?.startsWith(prefix)) sessionStorage.removeItem(key);
		}

		this.pending.clear();
	}

	public async getOrLoad(
		key: TKey,
		loader: () => Promise<TValue | null>,
	): Promise<TValue | null> {
		const cached = this.get(key);
		if (cached !== undefined) return cached;

		const storageKey = this.buildKey(key);
		const pending = this.pending.get(storageKey);
		if (pending) return pending;

		const promise = loader()
			.then((value) => {
				this.set(key, value);
				this.pending.delete(storageKey);
				return value;
			})
			.catch((err) => {
				this.set(key, null);
				this.pending.delete(storageKey);
				throw err;
			});

		this.pending.set(storageKey, promise);

		return promise;
	}
}
