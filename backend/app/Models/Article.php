<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model {
    use HasFactory;

    protected $fillable = [
        'uuid',
        'source',
        'author',
        'category',
        'title',
        'description',
        'content',
        'image_url',
        'source_url',
        'published_at'
    ];
}
