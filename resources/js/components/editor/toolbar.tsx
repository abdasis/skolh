import type { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    ChevronDown,
    Code,
    Code2,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    ImageIcon,
    Italic,
    Link as LinkIcon,
    Link2Off,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    Quote,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';
import { useCallback, type ReactNode } from 'react';

interface ToolbarProps {
    editor: Editor;
}

interface ToolbarButtonProps {
    onClick: () => void;
    pressed?: boolean;
    disabled?: boolean;
    tooltip: string;
    shortcut?: string;
    children: ReactNode;
}

const ToolbarButton = ({ onClick, pressed, disabled, tooltip, shortcut, children }: ToolbarButtonProps) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <Toggle
                size="sm"
                pressed={pressed}
                disabled={disabled}
                onPressedChange={() => onClick()}
                className="size-8 rounded-md data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
                {children}
            </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="flex items-center gap-2">
            <span>{tooltip}</span>
            {shortcut && <kbd className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px]">{shortcut}</kbd>}
        </TooltipContent>
    </Tooltip>
);

const ToolbarGroup = ({ children }: { children: ReactNode }) => (
    <div className="flex items-center gap-0.5">{children}</div>
);

const ToolbarDivider = () => <Separator orientation="vertical" className="mx-1.5 h-5" />;

const Toolbar = ({ editor }: ToolbarProps) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('URL gambar');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const activeHeading = editor.isActive('heading', { level: 1 })
        ? 'H1'
        : editor.isActive('heading', { level: 2 })
          ? 'H2'
          : editor.isActive('heading', { level: 3 })
            ? 'H3'
            : 'Teks';

    const ActiveAlignIcon = editor.isActive({ textAlign: 'center' })
        ? AlignCenter
        : editor.isActive({ textAlign: 'right' })
          ? AlignRight
          : editor.isActive({ textAlign: 'justify' })
            ? AlignJustify
            : AlignLeft;

    return (
        <TooltipProvider delayDuration={300}>
            <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 px-2 py-1.5">
                {/* Undo / Redo */}
                <ToolbarGroup>
                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} tooltip="Undo" shortcut="Ctrl+Z">
                        <Undo className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} tooltip="Redo" shortcut="Ctrl+Y">
                        <Redo className="size-4" />
                    </ToolbarButton>
                </ToolbarGroup>

                <ToolbarDivider />

                {/* Block type dropdown */}
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2.5 text-xs font-medium">
                                    {activeHeading}
                                    <ChevronDown className="size-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Tipe blok</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="start" className="min-w-40">
                        <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
                            <Pilcrow className="mr-2 size-4" />
                            <span>Teks</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                            <Heading1 className="mr-2 size-4" />
                            <span>Heading 1</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                            <Heading2 className="mr-2 size-4" />
                            <span>Heading 2</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                            <Heading3 className="mr-2 size-4" />
                            <span>Heading 3</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ToolbarDivider />

                {/* Inline formatting */}
                <ToolbarGroup>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')} tooltip="Bold" shortcut="Ctrl+B">
                        <Bold className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')} tooltip="Italic" shortcut="Ctrl+I">
                        <Italic className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        pressed={editor.isActive('underline')}
                        tooltip="Underline"
                        shortcut="Ctrl+U"
                    >
                        <UnderlineIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        pressed={editor.isActive('strike')}
                        tooltip="Strikethrough"
                    >
                        <Strikethrough className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} pressed={editor.isActive('code')} tooltip="Inline code">
                        <Code className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        pressed={editor.isActive('highlight')}
                        tooltip="Highlight"
                    >
                        <Highlighter className="size-4" />
                    </ToolbarButton>
                </ToolbarGroup>

                <ToolbarDivider />

                {/* Alignment dropdown */}
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="size-8 p-0">
                                    <ActiveAlignIcon className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Perataan teks</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="start" className="min-w-36">
                        <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                            <AlignLeft className="mr-2 size-4" />
                            <span>Rata kiri</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                            <AlignCenter className="mr-2 size-4" />
                            <span>Rata tengah</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                            <AlignRight className="mr-2 size-4" />
                            <span>Rata kanan</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                            <AlignJustify className="mr-2 size-4" />
                            <span>Rata kanan-kiri</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ToolbarDivider />

                {/* Lists & blocks */}
                <ToolbarGroup>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        pressed={editor.isActive('bulletList')}
                        tooltip="Bullet list"
                    >
                        <List className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        pressed={editor.isActive('orderedList')}
                        tooltip="Numbered list"
                    >
                        <ListOrdered className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        pressed={editor.isActive('blockquote')}
                        tooltip="Blockquote"
                    >
                        <Quote className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        pressed={editor.isActive('codeBlock')}
                        tooltip="Code block"
                    >
                        <Code2 className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        tooltip="Garis pembatas"
                    >
                        <Minus className="size-4" />
                    </ToolbarButton>
                </ToolbarGroup>

                <ToolbarDivider />

                {/* Link & Image */}
                <ToolbarGroup>
                    {editor.isActive('link') ? (
                        <ToolbarButton
                            onClick={() => editor.chain().focus().unsetLink().run()}
                            pressed
                            tooltip="Hapus link"
                        >
                            <Link2Off className="size-4" />
                        </ToolbarButton>
                    ) : (
                        <ToolbarButton onClick={setLink} tooltip="Sisipkan link">
                            <LinkIcon className="size-4" />
                        </ToolbarButton>
                    )}
                    <ToolbarButton onClick={addImage} tooltip="Sisipkan gambar">
                        <ImageIcon className="size-4" />
                    </ToolbarButton>
                </ToolbarGroup>
            </div>
        </TooltipProvider>
    );
};

export { Toolbar };
