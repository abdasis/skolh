import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

export const createExtensions = (placeholder?: string) => [
    StarterKit.configure({
        codeBlock: false,
        link: false,
    }),
    CodeBlockLowlight.configure({
        lowlight,
    }),
    Image.configure({
        inline: false,
        allowBase64: true,
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
    }),
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Highlight.configure({
        multicolor: true,
    }),
    TextStyle,
    Color,
    Typography,
    Placeholder.configure({
        placeholder: placeholder ?? 'Ketik "/" untuk perintah, atau mulai menulis...',
    }),
];
