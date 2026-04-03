export interface MediaFileResource {
    name: string;
    path: string;
    url: string;
    size: number;
    last_modified: string;
}

export type ImagePickerMode = 'single' | 'multiple';
