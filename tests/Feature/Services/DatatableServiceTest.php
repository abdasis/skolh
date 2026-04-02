<?php

use App\Models\Achievement;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = new DatatableService;
    $this->config = new DatatableConfig(
        searchableColumns: ['title', 'description'],
        filterableColumns: ['category', 'level', 'year'],
        sortableColumns: ['title', 'year', 'created_at'],
    );
});

test('paginates with default settings', function () {
    Achievement::factory()->count(20)->create();

    $request = new DatatableRequest;
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result)->toHaveCount(15);
    expect($result->total())->toBe(20);
});

test('respects per_page parameter', function () {
    Achievement::factory()->count(10)->create();

    $request = new DatatableRequest(perPage: 5);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result)->toHaveCount(5);
    expect($result->total())->toBe(10);
});

test('clamps per_page to max', function () {
    Achievement::factory()->count(5)->create();

    $request = new DatatableRequest(perPage: 500);
    $config = new DatatableConfig(maxPerPage: 50);
    $result = $this->service->paginate(Achievement::query(), $request, $config);

    expect($result->perPage())->toBe(50);
});

test('applies global search across searchable columns', function () {
    Achievement::factory()->create(['title' => 'Olimpiade Matematika', 'description' => 'Juara 1']);
    Achievement::factory()->create(['title' => 'Lomba Fisika', 'description' => 'Juara 2']);
    Achievement::factory()->create(['title' => 'Lomba Seni', 'description' => 'Olimpiade tingkat kota']);

    $request = new DatatableRequest(search: 'Olimpiade');
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->total())->toBe(2);
});

test('applies exact filter on allowed columns', function () {
    Achievement::factory()->create(['year' => 2024]);
    Achievement::factory()->create(['year' => 2025]);
    Achievement::factory()->create(['year' => 2025]);

    $request = new DatatableRequest(filters: ['year' => 2025]);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->total())->toBe(2);
});

test('applies whereIn filter when value is array', function () {
    Achievement::factory()->create(['year' => 2023]);
    Achievement::factory()->create(['year' => 2024]);
    Achievement::factory()->create(['year' => 2025]);

    $request = new DatatableRequest(filters: ['year' => [2023, 2025]]);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->total())->toBe(2);
});

test('ignores filter on disallowed columns', function () {
    Achievement::factory()->count(3)->create();

    $request = new DatatableRequest(filters: ['attachment' => 'hack.jpg']);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->total())->toBe(3);
});

test('applies sorting on allowed columns', function () {
    Achievement::factory()->create(['year' => 2025]);
    Achievement::factory()->create(['year' => 2023]);
    Achievement::factory()->create(['year' => 2024]);

    $request = new DatatableRequest(sorting: [['column' => 'year', 'direction' => 'asc']]);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    $years = $result->pluck('year')->toArray();
    expect($years)->toBe([2023, 2024, 2025]);
});

test('falls back to default sort when no sorting provided', function () {
    Achievement::factory()->create(['title' => 'A', 'created_at' => now()->subDay()]);
    Achievement::factory()->create(['title' => 'B', 'created_at' => now()]);

    $request = new DatatableRequest;
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->first()->title)->toBe('B');
});

test('ignores sorting on disallowed columns', function () {
    Achievement::factory()->create(['title' => 'A', 'created_at' => now()->subDay()]);
    Achievement::factory()->create(['title' => 'B', 'created_at' => now()]);

    $request = new DatatableRequest(sorting: [['column' => 'attachment', 'direction' => 'asc']]);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    // Falls back to default sort (created_at desc)
    expect($result->first()->title)->toBe('B');
});

test('combines search, filter, and sorting', function () {
    Achievement::factory()->create(['title' => 'Olimpiade A', 'year' => 2024]);
    Achievement::factory()->create(['title' => 'Olimpiade B', 'year' => 2025]);
    Achievement::factory()->create(['title' => 'Lomba C', 'year' => 2025]);

    $request = new DatatableRequest(
        search: 'Olimpiade',
        filters: ['year' => 2025],
        sorting: [['column' => 'title', 'direction' => 'asc']],
    );
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->total())->toBe(1);
    expect($result->first()->title)->toBe('Olimpiade B');
});

test('preserves query string in pagination', function () {
    Achievement::factory()->count(20)->create();

    $request = new DatatableRequest(search: 'test', perPage: 10);
    $result = $this->service->paginate(Achievement::query(), $request, $this->config);

    expect($result->url(2))->toContain('page=2');
});

test('DatatableRequest fromRequest parses correctly', function () {
    $httpRequest = Illuminate\Http\Request::create('/test', 'GET', [
        'search' => 'hello',
        'category' => 'academic',
        'level' => 'national',
        'sort' => [
            ['id' => 'year', 'desc' => true],
            ['id' => 'title', 'desc' => false],
        ],
        'per_page' => 25,
        'page' => 2,
    ]);

    $dtRequest = DatatableRequest::fromRequest($httpRequest);

    expect($dtRequest->search)->toBe('hello');
    expect($dtRequest->filters)->toBe(['category' => 'academic', 'level' => 'national']);
    expect($dtRequest->sorting)->toBe([
        ['column' => 'year', 'direction' => 'desc'],
        ['column' => 'title', 'direction' => 'asc'],
    ]);
    expect($dtRequest->perPage)->toBe(25);
    expect($dtRequest->page)->toBe(2);
});

test('DatatableRequest fromRequest handles empty request', function () {
    $httpRequest = Illuminate\Http\Request::create('/test', 'GET');
    $dtRequest = DatatableRequest::fromRequest($httpRequest);

    expect($dtRequest->search)->toBe('');
    expect($dtRequest->filters)->toBe([]);
    expect($dtRequest->sorting)->toBe([]);
    expect($dtRequest->perPage)->toBe(15);
    expect($dtRequest->page)->toBe(1);
    expect($dtRequest->hasSearch())->toBeFalse();
    expect($dtRequest->hasSorting())->toBeFalse();
    expect($dtRequest->hasFilters())->toBeFalse();
});
