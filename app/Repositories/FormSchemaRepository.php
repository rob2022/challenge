<?php
declare(strict_types=1);

namespace App\Repositories;

class FormSchemaRepository
{
    public function getSchema(): array
    {
        return json_decode(file_get_contents(__DIR__ . '/form_schema.json'), true, 512, JSON_THROW_ON_ERROR);
    }
}
