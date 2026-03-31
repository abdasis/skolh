<?php

namespace App\Enums;

enum AnnouncementStatus: string
{
    case Published = 'published';
    case Draft = 'draft';
}
