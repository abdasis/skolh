import { Extension } from '@tiptap/react';
import { Suggestion, type SuggestionOptions } from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import type { Editor, Range } from '@tiptap/react';
import {
    Code2,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    List,
    ListOrdered,
    Minus,
    Quote,
    Type,
} from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ComponentType } from 'react';
import { cn } from '@/lib/utils';

interface SlashCommandItem {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    command: (props: { editor: Editor; range: Range }) => void;
}

const slashCommands: SlashCommandItem[] = [
    {
        title: 'Teks',
        description: 'Paragraf teks biasa',
        icon: Type,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setParagraph().run();
        },
    },
    {
        title: 'Heading 1',
        description: 'Judul besar',
        icon: Heading1,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
        },
    },
    {
        title: 'Heading 2',
        description: 'Judul sedang',
        icon: Heading2,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
        },
    },
    {
        title: 'Heading 3',
        description: 'Judul kecil',
        icon: Heading3,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
        },
    },
    {
        title: 'Bullet List',
        description: 'Daftar tidak berurut',
        icon: List,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: 'Numbered List',
        description: 'Daftar berurut',
        icon: ListOrdered,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: 'Blockquote',
        description: 'Kutipan teks',
        icon: Quote,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
    },
    {
        title: 'Code Block',
        description: 'Blok kode dengan syntax highlighting',
        icon: Code2,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
    },
    {
        title: 'Gambar',
        description: 'Sisipkan gambar dari URL',
        icon: ImageIcon,
        command: ({ editor, range }) => {
            const url = window.prompt('URL gambar');
            if (url) {
                editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
            }
        },
    },
    {
        title: 'Garis Pembatas',
        description: 'Garis horizontal pemisah',
        icon: Minus,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
    },
];

interface CommandListRef {
    onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface CommandListProps {
    items: SlashCommandItem[];
    command: (item: SlashCommandItem) => void;
}

const CommandList = forwardRef<CommandListRef, CommandListProps>(({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedIndex(0);
    }, [items]);

    useEffect(() => {
        const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
        el?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
                setSelectedIndex((idx) => (idx + items.length - 1) % items.length);
                return true;
            }

            if (event.key === 'ArrowDown') {
                setSelectedIndex((idx) => (idx + 1) % items.length);
                return true;
            }

            if (event.key === 'Enter') {
                const item = items[selectedIndex];
                if (item) command(item);
                return true;
            }

            return false;
        },
    }));

    if (items.length === 0) {
        return (
            <div className="rounded-lg border bg-popover p-3 shadow-md">
                <p className="text-muted-foreground text-sm">Tidak ada perintah ditemukan</p>
            </div>
        );
    }

    return (
        <div ref={listRef} className="max-h-72 w-64 overflow-y-auto rounded-lg border bg-popover py-1 shadow-md">
            {items.map((item, index) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.title}
                        type="button"
                        className={cn(
                            'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
                            index === selectedIndex && 'bg-accent',
                        )}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            command(item);
                        }}
                    >
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                            <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-muted-foreground truncate text-xs">{item.description}</p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
});

CommandList.displayName = 'CommandList';

const suggestionConfig: Omit<SuggestionOptions<SlashCommandItem>, 'editor'> = {
    char: '/',
    items: ({ query }) => {
        return slashCommands.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
    },
    render: () => {
        let component: ReactRenderer<CommandListRef> | null = null;
        let popup: HTMLDivElement | null = null;

        return {
            onStart: (props) => {
                component = new ReactRenderer(CommandList, {
                    props: {
                        items: props.items,
                        command: (item: SlashCommandItem) => {
                            item.command({ editor: props.editor, range: props.range });
                        },
                    },
                    editor: props.editor,
                });

                popup = document.createElement('div');
                popup.style.position = 'absolute';
                popup.style.zIndex = '50';

                const editorWrapper = props.editor.view.dom.closest('.tiptap-wrapper');
                const coords = props.clientRect?.();

                if (coords && editorWrapper) {
                    const wrapperRect = editorWrapper.getBoundingClientRect();
                    popup.style.top = `${coords.bottom - wrapperRect.top + 4}px`;
                    popup.style.left = `${coords.left - wrapperRect.left}px`;
                }

                if (component.element) {
                    popup.appendChild(component.element);
                }

                editorWrapper?.appendChild(popup);
            },

            onUpdate: (props) => {
                component?.updateProps({
                    items: props.items,
                    command: (item: SlashCommandItem) => {
                        item.command({ editor: props.editor, range: props.range });
                    },
                });

                const coords = props.clientRect?.();
                if (coords && popup) {
                    const editorWrapper = props.editor.view.dom.closest('.tiptap-wrapper');
                    if (editorWrapper) {
                        const wrapperRect = editorWrapper.getBoundingClientRect();
                        popup.style.top = `${coords.bottom - wrapperRect.top + 4}px`;
                        popup.style.left = `${coords.left - wrapperRect.left}px`;
                    }
                }
            },

            onKeyDown: (props) => {
                if (props.event.key === 'Escape') {
                    popup?.remove();
                    popup = null;
                    component?.destroy();
                    component = null;
                    return true;
                }

                return component?.ref?.onKeyDown(props) ?? false;
            },

            onExit: () => {
                popup?.remove();
                popup = null;
                component?.destroy();
                component = null;
            },
        };
    },
};

const SlashCommand = Extension.create({
    name: 'slashCommand',

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...suggestionConfig,
            }),
        ];
    },
});

export { SlashCommand };
