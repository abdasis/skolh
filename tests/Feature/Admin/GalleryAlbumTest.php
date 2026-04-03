<?php

use App\Enums\GalleryAlbumStatus;
use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('guests are redirected to login when accessing gallery admin', function () {
    auth()->logout();
    $this->get(route('admin.gallery-albums.index'))->assertRedirect(route('login'));
});

test('can view gallery albums index', function () {
    GalleryAlbum::factory()->count(3)->create();

    $this->get(route('admin.gallery-albums.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/gallery-albums/index')
            ->has('albums', 3)
            ->has('stats')
        );
});

test('can view create gallery album form', function () {
    $this->get(route('admin.gallery-albums.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/gallery-albums/create')
            ->has('statuses')
        );
});

test('can create a gallery album', function () {
    $this->post(route('admin.gallery-albums.store'), [
        'title' => 'Wisuda 2024',
        'description' => 'Momen wisuda angkatan 2024',
        'status' => 'published',
    ])->assertRedirect(route('admin.gallery-albums.index'));

    expect(GalleryAlbum::count())->toBe(1);
    expect(GalleryAlbum::first()->title)->toBe('Wisuda 2024');
    expect(GalleryAlbum::first()->slug)->toBe('wisuda-2024');
    expect(GalleryAlbum::first()->status)->toBe(GalleryAlbumStatus::Published);
});

test('create gallery album requires title', function () {
    $this->post(route('admin.gallery-albums.store'), [
        'description' => 'Test',
        'status' => 'draft',
    ])->assertSessionHasErrors('title');
});

test('create gallery album requires valid status', function () {
    $this->post(route('admin.gallery-albums.store'), [
        'title' => 'Test',
        'status' => 'invalid',
    ])->assertSessionHasErrors('status');
});

test('can view edit gallery album form', function () {
    $album = GalleryAlbum::factory()->create();

    $this->get(route('admin.gallery-albums.edit', $album))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/gallery-albums/edit')
            ->has('album')
            ->where('album.id', $album->id)
        );
});

test('can update a gallery album', function () {
    $album = GalleryAlbum::factory()->create(['title' => 'Old Title']);

    $this->put(route('admin.gallery-albums.update', $album), [
        'title' => 'New Title',
        'description' => 'Updated description',
        'status' => 'published',
    ])->assertRedirect(route('admin.gallery-albums.index'));

    expect($album->fresh()->title)->toBe('New Title');
    expect($album->fresh()->status)->toBe(GalleryAlbumStatus::Published);
});

test('can delete a gallery album', function () {
    $album = GalleryAlbum::factory()->create();

    $this->delete(route('admin.gallery-albums.destroy', $album))
        ->assertRedirect(route('admin.gallery-albums.index'));

    expect(GalleryAlbum::count())->toBe(0);
});

test('deleting album also removes associated images from database', function () {
    $album = GalleryAlbum::factory()->create();
    GalleryImage::factory()->count(3)->create(['gallery_album_id' => $album->id, 'image' => 'fake/path.jpg']);

    $this->delete(route('admin.gallery-albums.destroy', $album));

    expect(GalleryAlbum::count())->toBe(0);
    expect(GalleryImage::count())->toBe(0);
});

test('slug is auto-generated from title', function () {
    $this->post(route('admin.gallery-albums.store'), [
        'title' => 'Hari Olahraga Nasional 2024',
        'status' => 'draft',
    ]);

    expect(GalleryAlbum::first()->slug)->toBe('hari-olahraga-nasional-2024');
});

test('slug collision is handled with suffix', function () {
    GalleryAlbum::factory()->create(['title' => 'Wisuda']);

    $this->post(route('admin.gallery-albums.store'), [
        'title' => 'Wisuda',
        'status' => 'draft',
    ]);

    expect(GalleryAlbum::count())->toBe(2);
    expect(GalleryAlbum::where('slug', 'wisuda-1')->exists())->toBeTrue();
});

test('can delete a gallery image', function () {
    $album = GalleryAlbum::factory()->create();
    $image = GalleryImage::factory()->create(['gallery_album_id' => $album->id, 'image' => 'fake/path.jpg']);

    $this->delete(route('admin.gallery-images.destroy', $image))
        ->assertRedirect(route('admin.gallery-albums.edit', $album->id));

    expect(GalleryImage::count())->toBe(0);
});

test('public gallery index only shows published albums', function () {
    GalleryAlbum::factory()->published()->count(2)->create();
    GalleryAlbum::factory()->draft()->count(3)->create();

    $this->get(route('gallery.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('gallery/index')
            ->has('albums', 2)
        );
});

test('public gallery show returns 404 for draft album', function () {
    $album = GalleryAlbum::factory()->draft()->create();

    $this->get(route('gallery.show', $album))->assertNotFound();
});

test('public gallery show displays published album', function () {
    $album = GalleryAlbum::factory()->published()->create();

    $this->get(route('gallery.show', $album))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('gallery/show')
            ->where('album.id', $album->id)
        );
});

test('stats reflect current data', function () {
    GalleryAlbum::factory()->published()->count(2)->create();
    GalleryAlbum::factory()->draft()->count(1)->create();

    $response = $this->get(route('admin.gallery-albums.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('stats.total', 3)
            ->where('stats.published', 2)
            ->where('stats.draft', 1)
            ->where('stats.total_images', 0)
        );
});
