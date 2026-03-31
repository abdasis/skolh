<?php

use App\Http\Controllers\Admin\AgendaController;
use App\Http\Controllers\Admin\AnnouncementAttachmentController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CurriculumController as AdminCurriculumController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/facilities/{facility:slug}', [FacilityController::class, 'show'])->name('facilities.show');
Route::get('/curricula/{curriculum:slug}', [CurriculumController::class, 'show'])->name('curricula.show');
Route::get('/announcements/{announcement:slug}', [AnnouncementController::class, 'show'])->name('announcements.show');

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
    Route::delete('announcement-attachments/{attachment}', [AnnouncementAttachmentController::class, 'destroy'])
        ->name('announcement-attachments.destroy');
});

require __DIR__.'/settings.php';
