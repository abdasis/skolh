<?php

namespace App\Enums;

enum AchievementLevel: string
{
    case District = 'district';
    case Province = 'province';
    case National = 'national';
    case International = 'international';
}
