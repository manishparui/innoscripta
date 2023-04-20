<?php

namespace App\Http\Controllers;

// use GuzzleHttp\Client;
use Illuminate\Http\Request;


class TestController extends Controller {
    public function test(Request $request) {
        return response()->json([
            'articles' => $request->articles,
        ], 200);
    }

    // public function storeFromSources() {
    //     $client = new Client();
    //     $response = $client->get('http://localhost:8000/api/test');
    //     $data = $response->getBody()->getContents();

    //     return response()->json($data, 200);

    //     // $data = $this->format($data->articles);

    //     // $this->store($data);
    // }
}
