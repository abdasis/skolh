<?php

namespace App\Enums;

enum RegistrationStatus: string
{
    case Pending = 'pending';
    case Verified = 'verified';
    case Accepted = 'accepted';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match($this) {
            self::Pending => 'Menunggu',
            self::Verified => 'Terverifikasi',
            self::Accepted => 'Diterima',
            self::Rejected => 'Ditolak',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::Pending => 'yellow',
            self::Verified => 'blue',
            self::Accepted => 'green',
            self::Rejected => 'red',
        };
    }
}
