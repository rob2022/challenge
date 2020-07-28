<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'address',
        'age',
        'name',
        'nickname',
    ];
}
