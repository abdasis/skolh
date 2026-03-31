<?php

namespace App\Actions\Category;

use App\Models\Category;

class CreateCategoryAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Category
    {
        return Category::create($data);
    }
}
