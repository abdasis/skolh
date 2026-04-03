import { useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import type { FormDataType } from '@inertiajs/core';

type SerializableValue = string | number | boolean | null;

/**
 * Wrapper useForm dengan dukungan draft otomatis ke localStorage.
 * File (File | null) tidak di-simpan karena tidak bisa di-serialize.
 */
const useFormDraft = <T extends FormDataType<T>>(
    storageKey: string,
    initialValues: T,
) => {
    const savedRef = useRef(false);

    // Baca draft dari localStorage, merge ke initialValues (text fields saja)
    const getInitialWithDraft = (): T => {
        if (typeof window === 'undefined') return initialValues;

        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) return initialValues;

            const draft = JSON.parse(raw) as Record<string, SerializableValue>;

            // Hanya restore key yang ada di initialValues dan bukan File
            const merged = { ...initialValues } as Record<string, unknown>;
            for (const key of Object.keys(draft)) {
                if (key in initialValues && !((initialValues as Record<string, unknown>)[key] instanceof File)) {
                    merged[key] = draft[key];
                }
            }
            return merged as T;
        } catch {
            return initialValues;
        }
    };

    const form = useForm<T>(getInitialWithDraft);

    // Auto-save ke localStorage setiap kali data berubah (debounced 500ms)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            // Hanya simpan nilai yang bukan File
            const serializable: Record<string, SerializableValue> = {};
            for (const [key, value] of Object.entries(form.data)) {
                if (!(value instanceof File) && value !== null || typeof value !== 'object') {
                    serializable[key] = value as SerializableValue;
                }
            }
            localStorage.setItem(storageKey, JSON.stringify(serializable));
        }, 500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [form.data, storageKey]);

    // Hapus draft dari localStorage
    const clearDraft = () => {
        localStorage.removeItem(storageKey);
        savedRef.current = false;
    };

    const hasDraft = (): boolean => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(storageKey) !== null;
    };

    return { ...form, clearDraft, hasDraft };
};

export { useFormDraft };
