<?php

namespace App\Http\Controllers;

use App\Enums\AnnouncementStatus;
use App\Enums\CurriculumStatus;
use App\Enums\FacilityStatus;
use App\Models\Announcement;
use App\Models\Curriculum;
use App\Models\Facility;
use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $sitemap = Sitemap::create()
            ->add(
                Url::create('/')
                    ->setPriority(1.0)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );

        Facility::where('status', FacilityStatus::Public)
            ->orderBy('updated_at', 'desc')
            ->each(function (Facility $facility) use ($sitemap) {
                $sitemap->add(
                    Url::create("/facilities/{$facility->slug}")
                        ->setLastModificationDate($facility->updated_at)
                        ->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                );
            });

        Curriculum::where('status', CurriculumStatus::Active)
            ->orderBy('updated_at', 'desc')
            ->each(function (Curriculum $curriculum) use ($sitemap) {
                $sitemap->add(
                    Url::create("/curricula/{$curriculum->slug}")
                        ->setLastModificationDate($curriculum->updated_at)
                        ->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                );
            });

        Announcement::where('status', AnnouncementStatus::Published)
            ->where(function ($q) {
                $q->whereNull('expired_at')->orWhere('expired_at', '>', now());
            })
            ->orderBy('updated_at', 'desc')
            ->each(function (Announcement $announcement) use ($sitemap) {
                $sitemap->add(
                    Url::create("/announcements/{$announcement->slug}")
                        ->setLastModificationDate($announcement->updated_at)
                        ->setPriority(0.7)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                );
            });

        return response($sitemap->render(), 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
