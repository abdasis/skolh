<?php

namespace App\Actions\Category;

use App\Models\Category;
use Illuminate\Validation\ValidationException;

class DeleteCategoryAction
{
    public function handle(Category $category): void
    {
        if ($category->announcements()->exists()) {
            throw ValidationException::withMessages([
                'category' => 'Kategori tidak dapat dihapus karena masih digunakan oleh pengumuman.',
            ]);
        }

        $category->delete();
    }
}
