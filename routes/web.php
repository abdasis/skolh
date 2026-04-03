<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\GalleryAlbumController as AdminGalleryAlbumController;
use App\Http\Controllers\Admin\GalleryImageController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\ThemeController as AdminThemeController;
use App\Http\Controllers\GalleryAlbumController;
use App\Http\Controllers\Admin\AchievementController as AdminAchievementController;
use App\Http\Controllers\Admin\ExtracurricularController as AdminExtracurricularController;
use App\Http\Controllers\Admin\OrganizationNodeController as AdminOrganizationNodeController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Admin\AlumniController as AdminAlumniController;
use App\Http\Controllers\ExtracurricularController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\Admin\AgendaController;
use App\Http\Controllers\Admin\AnnouncementAttachmentController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\CurriculumController as AdminCurriculumController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/facilities/{facility:slug}', [FacilityController::class, 'show'])->name('facilities.show');
Route::get('/curricula/{curriculum:slug}', [CurriculumController::class, 'show'])->name('curricula.show');
Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
Route::get('/announcements/{announcement:slug}', [AnnouncementController::class, 'show'])->name('announcements.show');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');
Route::post('/contact-messages', [ContactMessageController::class, 'store'])->middleware('throttle:contact-form')->name('contact-messages.store');
Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
Route::get('/achievements/{achievement}', [AchievementController::class, 'show'])->name('achievements.show');
Route::get('/extracurriculars', [ExtracurricularController::class, 'index'])->name('extracurriculars.index');
Route::get('/extracurriculars/{extracurricular:slug}', [ExtracurricularController::class, 'show'])->name('extracurriculars.show');
Route::get('/organization', OrganizationController::class)->name('organization.index');
Route::get('/gallery', [GalleryAlbumController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{galleryAlbum:slug}', [GalleryAlbumController::class, 'show'])->name('gallery.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('agendas', AgendaController::class);
    Route::resource('facilities', AdminFacilityController::class);
    Route::resource('curricula', AdminCurriculumController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('announcements', AdminAnnouncementController::class);
    Route::resource('articles', AdminArticleController::class);
    Route::resource('contact-messages', AdminContactMessageController::class)->only(['index', 'show', 'destroy']);
    Route::resource('achievements', AdminAchievementController::class);
    Route::resource('extracurriculars', AdminExtracurricularController::class);
    Route::resource('teachers', AdminTeacherController::class);
    Route::get('organization-nodes/design', [AdminOrganizationNodeController::class, 'design'])
        ->name('organization-nodes.design');
    Route::post('organization-nodes/design', [AdminOrganizationNodeController::class, 'saveDesign'])
        ->name('organization-nodes.save-design');
    Route::post('organization-nodes/store-from-design', [AdminOrganizationNodeController::class, 'storeFromDesign'])
        ->name('organization-nodes.store-from-design');
    Route::resource('organization-nodes', AdminOrganizationNodeController::class);
    Route::delete('announcement-attachments/{attachment}', [AnnouncementAttachmentController::class, 'destroy'])
        ->name('announcement-attachments.destroy');
    Route::resource('gallery-albums', AdminGalleryAlbumController::class);
    Route::delete('gallery-images/{galleryImage}', [GalleryImageController::class, 'destroy'])
        ->name('gallery-images.destroy');
    Route::get('media', [AdminMediaController::class, 'index'])->name('media.index');
    Route::post('media', [AdminMediaController::class, 'store'])->name('media.store');
    Route::get('themes', [AdminThemeController::class, 'index'])->name('themes.index');
    Route::post('themes/{slug}/activate', [AdminThemeController::class, 'activate'])->name('themes.activate');
    Route::post('testimonials/reorder', [AdminTestimonialController::class, 'reorder'])->name('testimonials.reorder');
    Route::resource('testimonials', AdminTestimonialController::class)->except(['show']);
    Route::post('alumni/reorder', [AdminAlumniController::class, 'reorder'])->name('alumni.reorder');
    Route::resource('alumni', AdminAlumniController::class)->except(['show']);
});

require __DIR__.'/settings.php';
