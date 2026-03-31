<?php

namespace App\Actions\Category;

use App\Models\Category;

class UpdateCategoryAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Category $category, array $data): Category
    {
        $category->update($data);

        return $category;
    }
}
