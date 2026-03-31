import type { Editor } from '@tiptap/react';
import {
    Bold,
    Code,
    Highlighter,
    Italic,
    Link as LinkIcon,
    Strikethrough,
    Underline as UnderlineIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface BubbleMenuProps {
    editor: Editor;
}

interface BubbleButtonProps {
    active?: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}

const BubbleButton = ({ active, onMouseDown, children }: BubbleButtonProps) => (
    <button
        type="button"
        onMouseDown={onMouseDown}
        className={cn(
            'flex size-8 items-center justify-center rounded-md transition-colors hover:bg-accent',
            active && 'bg-primary/10 text-primary',
        )}
    >
        {children}
    </button>
);

const BubbleMenu = ({ editor }: BubbleMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
        const { from, to, empty } = editor.state.selection;

        if (empty || from === to) {
            setVisible(false);
            return;
        }

        const isNodeSelection = editor.state.selection.constructor.name === 'NodeSelection';
        if (isNodeSelection) {
            setVisible(false);
            return;
        }

        const view = editor.view;
        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);
        const wrapper = view.dom.closest('.tiptap-wrapper');
        const wrapperRect = wrapper?.getBoundingClientRect();

        if (!wrapperRect) {
            setVisible(false);
            return;
        }

        const left = (start.left + end.left) / 2 - wrapperRect.left;
        const top = start.top - wrapperRect.top - 48;

        setCoords({ top: Math.max(0, top), left });
        setVisible(true);
    }, [editor]);

    useEffect(() => {
        const onSelectionUpdate = () => updatePosition();
        const onBlur = ({ event }: { event: FocusEvent }) => {
            const relatedTarget = event.relatedTarget as Node | null;
            if (menuRef.current?.contains(relatedTarget)) return;
            setVisible(false);
        };

        editor.on('selectionUpdate', onSelectionUpdate);
        editor.on('blur', onBlur);

        return () => {
            editor.off('selectionUpdate', onSelectionUpdate);
            editor.off('blur', onBlur);
        };
    }, [editor, updatePosition]);

    const handleCommand = useCallback(
        (e: React.MouseEvent, command: () => void) => {
            e.preventDefault();
            e.stopPropagation();
            command();
        },
        [],
    );

    const setLink = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);

            if (url === null) return;

            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }

            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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
            <BubbleButton active={editor.isActive('bold')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleBold().run())}>
                <Bold className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('italic')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleItalic().run())}>
                <Italic className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('underline')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleUnderline().run())}>
                <UnderlineIcon className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('strike')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleStrike().run())}>
                <Strikethrough className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('code')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleCode().run())}>
                <Code className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('highlight')} onMouseDown={(e) => handleCommand(e, () => editor.chain().focus().toggleHighlight().run())}>
                <Highlighter className="size-3.5" />
            </BubbleButton>
            <BubbleButton active={editor.isActive('link')} onMouseDown={setLink}>
                <LinkIcon className="size-3.5" />
            </BubbleButton>
        </div>
    );
};

export { BubbleMenu };
