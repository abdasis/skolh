import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import InputError from '@/components/ui/input-error';
import { FormLabel } from '@/components/form';
import { cn } from '@/lib/utils';
import { createExtensions } from './extensions';
import { SlashCommand } from './slash-command';
import { Toolbar } from './toolbar';
import { BubbleMenu } from './bubble-menu';

interface TiptapEditorProps {
    label?: string;
    content: string;
    onChange: (html: string) => void;
    error?: string;
    required?: boolean;
    id?: string;
    placeholder?: string;
}

const TiptapEditor = ({ label, content, onChange, error, required, id = 'tiptap-editor', placeholder }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [...createExtensions(placeholder), SlashCommand],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-content min-h-[200px] px-4 py-3 focus:outline-none',
            },
        },
    });

    useEffect(() => {
        if (!editor) return;
        const current = editor.getHTML();
        if (content !== current) {
            editor.commands.setContent(content, false);
        }
    }, [content, editor]);

    return (
        <div className="grid gap-2">
            {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
            <div
                id={id}
                aria-invalid={!!error}
                className={cn(
                    'tiptap-wrapper relative rounded-md border bg-background text-sm',
                    error && 'border-rose-500',
                )}
            >
                {editor && <Toolbar editor={editor} />}
                {editor && <BubbleMenu editor={editor} />}
                <EditorContent editor={editor} />
            </div>
            <InputError message={error} />
        </div>
    );
};

export { TiptapEditor };
export type { TiptapEditorProps };
