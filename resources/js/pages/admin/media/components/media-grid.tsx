import type { MediaFile } from '@/types';
import { MediaCard } from './media-card';

interface Props {
    files: MediaFile[];
    selectedPaths: Set<string>;
    onToggleSelect: (path: string) => void;
    onPreview: (file: MediaFile) => void;
    onOptimize: (path: string) => void;
    onDelete: (path: string) => void;
}

export const MediaGrid = ({ files, selectedPaths, onToggleSelect, onPreview, onOptimize, onDelete }: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-2">
            {files.map((file) => (
                <MediaCard
                    key={file.path}
                    file={file}
                    selected={selectedPaths.has(file.path)}
                    onToggleSelect={onToggleSelect}
                    onPreview={onPreview}
                    onOptimize={onOptimize}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
