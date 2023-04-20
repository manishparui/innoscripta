<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class SearchController extends Controller {


    public function search(Request $request) {
        $articles = Article::query();

        $articles->orWhere('source', 'like', '%' . $request->keyword . '%');
        $articles->orWhere('author', 'like', '%' . $request->keyword . '%');
        $articles->orWhere('category', 'like', '%' . $request->keyword . '%');
        $articles->orWhere('title', 'like', '%' . $request->keyword . '%');
        $articles->orWhere('description', 'like', '%' . $request->keyword . '%');
        $articles->orWhere('content', 'like', '%' . $request->keyword . '%');

        $articles = $articles->select(
            'uuid',
            'source',
            'author',
            'category',
            'title',
            'description',
            'content',
            'image_url as imageUrl',
            'source_url as sourceUrl',
            'published_at as publishedAt',
            'created_at as createdAt',
            'updated_at as updatedAt',
        )->paginate($request->offset ? $request->offset : 10);

        if ($request->offset) {
            $articles->appends(['offset' => $request->offset]);
        }

        return ArticleResource::collection($articles);
    }

}
