<?php

declare(strict_types=1);

namespace App\Services\Datatable;

final class DatatableConfig
{
    /**
     * @param  array<int, string>  $searchableColumns
     * @param  array<int, string>  $filterableColumns
     * @param  array<int, string>  $sortableColumns
     * @param  array{column: string, direction: string}  $defaultSort
     */
    public function __construct(
        public readonly array $searchableColumns = [],
        public readonly array $filterableColumns = [],
        public readonly array $sortableColumns = [],
        public readonly array $defaultSort = ['column' => 'created_at', 'direction' => 'desc'],
        public readonly int $defaultPerPage = 15,
        public readonly int $maxPerPage = 100,
    ) {}
}
