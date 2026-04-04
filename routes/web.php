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
use App\Http\Controllers\Admin\AdmissionPeriodController as AdminAdmissionPeriodController;
use App\Http\Controllers\Public\AdmissionController;
use App\Http\Controllers\Admin\CustomFieldController as AdminCustomFieldController;
use App\Http\Controllers\Admin\RegistrationController as AdminRegistrationController;
use App\Http\Controllers\Admin\AlumniController as AdminAlumniController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
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
use App\Http\Controllers\Admin\VisiMisiController as AdminVisiMisiController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/contact', ContactPageController::class)->name('contact.index');
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

// Pendaftaran publik (SPMB)
Route::prefix('admission')->name('admission.')->group(function () {
    Route::get('/', [AdmissionController::class, 'index'])->name('index');
    Route::post('/register', [AdmissionController::class, 'store'])->name('store');
    Route::get('/success/{registration:registration_number}', [AdmissionController::class, 'success'])->name('success');
    Route::get('/success/{registration:registration_number}/pdf', [AdmissionController::class, 'downloadPdf'])->name('pdf');
    Route::get('/check', [AdmissionController::class, 'check'])->name('check');
    Route::post('/check', [AdmissionController::class, 'checkStatus'])->name('check-status');
});

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
    Route::resource('admission-periods', AdminAdmissionPeriodController::class)->only(['index', 'store', 'update']);
    Route::post('custom-fields/reorder', [AdminCustomFieldController::class, 'reorder'])->name('custom-fields.reorder');
    Route::resource('custom-fields', AdminCustomFieldController::class)->except(['show']);
    Route::get('registrations/export', [AdminRegistrationController::class, 'export'])->name('registrations.export');
    Route::patch('registrations/{registration}/status', [AdminRegistrationController::class, 'updateStatus'])->name('registrations.update-status');
    Route::get('registrations/{registration}/pdf', [AdminRegistrationController::class, 'downloadPdf'])->name('registrations.pdf');
    Route::resource('registrations', AdminRegistrationController::class)->only(['index', 'show']);
    Route::get('visi-misi', [AdminVisiMisiController::class, 'show'])->name('visi-misi.show');
    Route::get('visi-misi/edit', [AdminVisiMisiController::class, 'edit'])->name('visi-misi.edit');
    Route::put('visi-misi', [AdminVisiMisiController::class, 'update'])->name('visi-misi.update');

    Route::get('settings/site-identity', [AdminSiteSettingController::class, 'identity'])->name('settings.site-identity');
    Route::put('settings/site-identity', [AdminSiteSettingController::class, 'updateIdentity'])->name('settings.site-identity.update');
    Route::get('settings/welcome-content', [AdminSiteSettingController::class, 'welcomeContent'])->name('settings.welcome-content');
    Route::put('settings/welcome-content', [AdminSiteSettingController::class, 'updateWelcomeContent'])->name('settings.welcome-content.update');
    Route::get('settings/navigation', [AdminSiteSettingController::class, 'navigation'])->name('settings.navigation');
    Route::put('settings/navigation', [AdminSiteSettingController::class, 'updateNavigation'])->name('settings.navigation.update');
    Route::get('settings/page-meta', [AdminSiteSettingController::class, 'pageMeta'])->name('settings.page-meta');
    Route::put('settings/page-meta', [AdminSiteSettingController::class, 'updatePageMeta'])->name('settings.page-meta.update');
    Route::get('settings/section-preferences', [AdminSiteSettingController::class, 'sectionPreferences'])->name('settings.section-preferences');
    Route::put('settings/section-preferences', [AdminSiteSettingController::class, 'updateSectionPreferences'])->name('settings.section-preferences.update');
});

require __DIR__.'/settings.php';
