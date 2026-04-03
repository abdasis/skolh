<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Testimonial;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface TestimonialRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<Testimonial>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    /**
     * @return Collection<int, Testimonial>
     */
    public function getPublic(): Collection;
}
