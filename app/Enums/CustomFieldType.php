<?php

namespace App\Enums;

enum CustomFieldType: string
{
    case Text = 'text';
    case Number = 'number';
    case Select = 'select';
    case Textarea = 'textarea';
    case Date = 'date';
    case File = 'file';

    public function label(): string
    {
        return match($this) {
            self::Text => 'Teks',
            self::Number => 'Angka',
            self::Select => 'Pilihan',
            self::Textarea => 'Teks Panjang',
            self::Date => 'Tanggal',
            self::File => 'File/Dokumen',
        };
    }
}
