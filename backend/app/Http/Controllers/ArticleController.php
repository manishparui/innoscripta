<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $articles = Article::query();

        if ($request->sources) {
            $articles->whereIn('source', $request->sources);
        }
        // if ($request->author) {
        //     $articles->orWhere('author', 'like', '%' . $request->author . '%');
        // }
        // if ($request->category) {
        //     $articles->orWhere('category', 'like', '%' . $request->category . '%');
        // }

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($data)
    {

        $validator = Validator::make($data, [
            'data' => 'required|array',
            'data.*.source' => 'nullable|string|max:255',
            'data.*.author' => 'nullable|string|max:255',
            'data.*.category' => 'nullable|string|max:255',
            'data.*.title' => 'nullable|string|max:255',
            'data.*.description' => 'nullable|string',
            'data.*.content' => 'nullable|string',
            'data.*.imageUrl' => 'nullable|url',
            'data.*.sourceUrl' => 'nullable|url',
            'data.*.publishedAt' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad Request',
                'type' => 'error',
                'errors' =>$validator->errors()
            ], 400);
        }

        $articles = [];
        foreach ($data['data'] as $object) {
            $articles[] = [
                'uuid' => Str::uuid(),
                'source' => array_key_exists('source', $object) ? $object['source'] : null,
                'author' => array_key_exists('author', $object) ? $object['author'] : null,
                'category' => array_key_exists('category', $object) ? $object['category'] : null,
                'title' => array_key_exists('title', $object) ? $object['title'] : null,
                'description' => array_key_exists('description', $object) ? $object['description'] : null,
                'content' => array_key_exists('content', $object) ? $object['content'] : null,
                'image_url' => array_key_exists('imageUrl', $object) ? $object['imageUrl'] : null,
                'source_url' => array_key_exists('sourceUrl', $object) ? $object['sourceUrl'] : null,
                'published_at' => array_key_exists('publishedAt', $object) ? $object['publishedAt'] : null,
            ];
        }

        $article = new Article;

        if ($article::insert($articles)) {
            return response()->json([], 200);
        } else {
            return response()->json([
                'message' => 'Internal Server Error',
                'type' => 'error'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) { }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) { }

    public function storeFromSources() {

        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'country' => 'in',
            'apiKey' => '6748e3b212b044ca80dd0a8633271c93',
            'pageSize' => 10
        ]);

        // $response = Http::get('http://example.com');



        $data = $this->format($response->json()['articles']);
        $this->store($data);
        // return response()->json(['data' => $data], 200);

        //
    }

    private function format($data) {
        $data["data"] = array_map(function($item) {
            return [        'source' => $item['source']['name'],
                'author' => $item['author'],
                'title' => $item['title'],
                'description' => $item['description'],
                'sourceUrl' => $item['url'],
                'imageUrl' => $item['urlToImage'],
                'publishedAt' => $item['publishedAt'],
                'content' => $item['content']
            ];
        }, $data);
        return $data;
    }

}
