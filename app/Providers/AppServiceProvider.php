<?php

namespace App\Providers;

use App\Repositories\AnnouncementRepository;
use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ContactMessageRepository;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use App\Repositories\CurriculumRepository;
use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CurriculumRepositoryInterface::class, CurriculumRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(AnnouncementRepositoryInterface::class, AnnouncementRepository::class);
        $this->app->bind(ArticleRepositoryInterface::class, ArticleRepository::class);
        $this->app->bind(ContactMessageRepositoryInterface::class, ContactMessageRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        $this->configureDefaults();
        $this->configureRateLimiters();
    }

    /**
     * Configure rate limiters for the application.
     */
    protected function configureRateLimiters(): void
    {
        RateLimiter::for('contact-form', function (Request $request) {
            return Limit::perMinutes(5, 3)->by($request->ip());
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
