<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class MaxNavDepth implements ValidationRule
{
    public function __construct(private int $maxDepth = 3) {}

    /**
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_array($value)) {
            return;
        }

        if (! $this->checkDepth($value, 1)) {
            $fail("Navigasi tidak boleh lebih dari {$this->maxDepth} level.");
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     */
    private function checkDepth(array $items, int $currentDepth): bool
    {
        foreach ($items as $item) {
            $children = $item['children'] ?? [];

            if (! is_array($children) || $children === []) {
                continue;
            }

            if ($currentDepth >= $this->maxDepth) {
                return false;
            }

            if (! $this->checkDepth($children, $currentDepth + 1)) {
                return false;
            }
        }

        return true;
    }
}
