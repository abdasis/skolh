<?php

namespace App\Enums;

enum AchievementCategory: string
{
    case Academic = 'academic';
    case NonAcademic = 'non_academic';
    case Arts = 'arts';
    case Sports = 'sports';
    case Other = 'other';
}
