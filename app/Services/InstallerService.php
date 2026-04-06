<?php

namespace App\Services;

use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

class InstallerService
{
    /**
     * @param  array{name: string, email: string, password: string, school_name: string, tagline: string, seeders?: string[]}  $data
     *
     * @throws Throwable
     */
    public function install(array $data): User
    {
        return DB::transaction(function () use ($data) {
            // Jalankan RolePermissionSeeder terlebih dahulu agar role tersedia
            (new RolePermissionSeeder)->run();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            $user->assignRole('Super Admin');

            $this->saveSiteIdentity($data['school_name'], $data['tagline']);

            $this->runOptionalSeeders($data['seeders'] ?? []);

            return $user;
        });
    }

    private function saveSiteIdentity(string $schoolName, string $tagline): void
    {
        $existing = json_decode(SiteSetting::get('site_identity', '{}') ?? '{}', true);

        $identity = array_merge($existing, [
            'name' => $schoolName,
            'tagline' => $tagline,
            'phone' => $existing['phone'] ?? '',
            'email' => $existing['email'] ?? '',
            'address' => $existing['address'] ?? '',
            'hours' => $existing['hours'] ?? '',
            'map_url' => $existing['map_url'] ?? '',
        ]);

        SiteSetting::set('site_identity', json_encode($identity));
    }

    /**
     * @param  string[]  $selectedKeys
     */
    private function runOptionalSeeders(array $selectedKeys): void
    {
        if (empty($selectedKeys)) {
            return;
        }

        $availableSeeders = config('installer.seeders', []);

        foreach ($selectedKeys as $key) {
            if (isset($availableSeeders[$key])) {
                $seederClass = $availableSeeders[$key]['class'];
                (new $seederClass)->run();
            }
        }
    }
}
