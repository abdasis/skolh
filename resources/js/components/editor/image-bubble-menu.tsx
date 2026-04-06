import type { Editor } from '@tiptap/react';
import { NodeSelection } from '@tiptap/pm/state';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageBubbleMenuProps {
    editor: Editor;
}

const SIZE_PRESETS = [
    { label: '25%', value: '25%' },
    { label: '50%', value: '50%' },
    { label: '75%', value: '75%' },
    { label: '100%', value: '100%' },
] as const;

const ImageBubbleMenu = ({ editor }: ImageBubbleMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [currentWidth, setCurrentWidth] = useState<string>('100%');

    const updatePosition = useCallback(() => {
        const { selection } = editor.state;

        if (
            !(selection instanceof NodeSelection) ||
            selection.node.type.name !== 'image'
        ) {
            setVisible(false);
            return;
        }

        const attrs = selection.node.attrs as { width?: string };
        setCurrentWidth(attrs.width ?? '100%');

        const view = editor.view;
        const pos = selection.from;
        const coords = view.coordsAtPos(pos);
        const wrapper = view.dom.closest('.tiptap-wrapper');
        const wrapperRect = wrapper?.getBoundingClientRect();

        if (!wrapperRect) {
            setVisible(false);
            return;
        }

        const domNode = view.nodeDOM(pos) as HTMLElement | null;
        const nodeRect = domNode?.getBoundingClientRect();

        const centerX = nodeRect
            ? nodeRect.left + nodeRect.width / 2 - wrapperRect.left
            : coords.left - wrapperRect.left;

        const top =
            (nodeRect ? nodeRect.bottom : coords.bottom) - wrapperRect.top + 8;

        setCoords({ top, left: centerX });
        setVisible(true);
    }, [editor]);

    useEffect(() => {
        editor.on('selectionUpdate', updatePosition);
        editor.on('transaction', updatePosition);

        const handleBlur = ({ event }: { event: FocusEvent }) => {
            const relatedTarget = event.relatedTarget as Node | null;
            if (menuRef.current?.contains(relatedTarget)) return;
            setVisible(false);
        };

        editor.on('blur', handleBlur);

        return () => {
            editor.off('selectionUpdate', updatePosition);
            editor.off('transaction', updatePosition);
            editor.off('blur', handleBlur);
        };
    }, [editor, updatePosition]);

    const setWidth = useCallback(
        (e: React.MouseEvent, width: string) => {
            e.preventDefault();
            e.stopPropagation();
            editor.chain().focus().updateAttributes('image', { width }).run();
            setCurrentWidth(width);
        },
        [editor],
    );

    const deleteImage = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            editor.chain().focus().deleteSelection().run();
            setVisible(false);
        },
        [editor],
    );

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className="absolute z-50 flex items-center gap-0.5 rounded-lg border bg-background p-0.5 shadow-md"
            style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                transform: 'translateX(-50%)',
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {SIZE_PRESETS.map((preset) => (
                <button
                    key={preset.value}
                    type="button"
                    onMouseDown={(e) => setWidth(e, preset.value)}
                    className={cn(
                        'flex h-8 min-w-[2.5rem] items-center justify-center rounded-md px-2 text-xs font-medium transition-colors hover:bg-accent',
                        currentWidth === preset.value &&
                            'bg-primary/10 text-primary',
                    )}
                >
                    {preset.label}
                </button>
            ))}
            <Separator orientation="vertical" className="mx-0.5 h-5" />
            <button
                type="button"
                onMouseDown={deleteImage}
                className="flex size-8 items-center justify-center rounded-md text-destructive transition-colors hover:bg-destructive/10"
            >
                <Trash2 className="size-3.5" />
            </button>
        </div>
    );
};

export { ImageBubbleMenu };
