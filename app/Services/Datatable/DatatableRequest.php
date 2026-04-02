<?php

declare(strict_types=1);

namespace App\Services\Datatable;

use Illuminate\Http\Request;

final class DatatableRequest
{
    /**
     * @param  array<string, mixed>  $filters
     * @param  array<int, array{column: string, direction: string}>  $sorting
     */
    public function __construct(
        public readonly string $search = '',
        public readonly array $filters = [],
        public readonly array $sorting = [],
        public readonly int $perPage = 15,
        public readonly int $page = 1,
    ) {}

    public static function fromRequest(Request $request): self
    {
        $sorting = [];
        $rawSort = $request->input('sort', []);

        if (is_array($rawSort)) {
            foreach ($rawSort as $item) {
                if (is_array($item) && isset($item['id'])) {
                    $sorting[] = [
                        'column' => (string) $item['id'],
                        'direction' => ! empty($item['desc']) ? 'desc' : 'asc',
                    ];
                }
            }
        }

        $reservedKeys = ['search', 'sort', 'per_page', 'page'];
        $filters = array_filter(
            $request->except($reservedKeys),
            fn (mixed $value) => $value !== null && $value !== '',
        );

        return new self(
            search: (string) $request->input('search', ''),
            filters: $filters,
            sorting: $sorting,
            perPage: (int) $request->input('per_page', 15),
            page: (int) $request->input('page', 1),
        );
    }

    public function hasSearch(): bool
    {
        return $this->search !== '';
    }

    public function hasSorting(): bool
    {
        return $this->sorting !== [];
    }

    public function hasFilters(): bool
    {
        return $this->filters !== [];
    }
}
