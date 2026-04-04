<?php

declare(strict_types=1);

namespace App\Enums;

enum StudentStatus: string
{
    case Active = 'active';
    case Graduated = 'graduated';
    case Transferred = 'transferred';
    case DroppedOut = 'dropped_out';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Aktif',
            self::Graduated => 'Lulus',
            self::Transferred => 'Pindah',
            self::DroppedOut => 'Keluar',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Active => 'green',
            self::Graduated => 'blue',
            self::Transferred => 'yellow',
            self::DroppedOut => 'red',
        };
    }
}
