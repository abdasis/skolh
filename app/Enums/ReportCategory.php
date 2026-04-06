<?php

namespace App\Enums;

enum ReportCategory: string
{
    case Facilities = 'facilities';
    case TeachingQuality = 'teaching_quality';
    case Administration = 'administration';
    case Safety = 'safety';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Facilities => 'Facilities',
            self::TeachingQuality => 'Teaching Quality',
            self::Administration => 'Administration',
            self::Safety => 'Safety',
            self::Other => 'Other',
        };
    }
}
