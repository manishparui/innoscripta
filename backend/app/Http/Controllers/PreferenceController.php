<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class PreferenceController extends Controller {

    public function preference() {
        $article = Article::select(
            'source',
            'author',
            'category',
        )
        ->distinct()
        ->get();

        return response()->json([
            'data' => [
                'sources' => $article->pluck('source')->toArray(),
                'authors' => $article->pluck('author')->toArray(),
                'categories' => $article->pluck('category')->toArray(),
            ]
        ]);
    }

}
