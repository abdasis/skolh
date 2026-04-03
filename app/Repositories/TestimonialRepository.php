<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

final class TestimonialRepository implements TestimonialRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /**
     * @return LengthAwarePaginator<Testimonial>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['name', 'role', 'highlight'],
            filterableColumns: [],
            sortableColumns: ['name', 'sort_order', 'created_at'],
            defaultSort: ['column' => 'created_at', 'direction' => 'desc'],
        );

        return $this->datatable->paginate(Testimonial::query(), $request, $config);
    }

    /**
     * @return Collection<int, Testimonial>
     */
    public function getPublic(): Collection
    {
        return Testimonial::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit(6)
            ->get();
    }
}
