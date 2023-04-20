<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory {
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'uuid' => Str::uuid(),
            'source' => $this->faker->company,
            'author' => $this->faker->name,
            'category' => $this->faker->randomElement(['Politics', 'Sports', 'Technology', 'Entertainment']),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'content' => $this->faker->paragraphs(rand(3, 10), true),
            'image_url' => $this->faker->imageUrl(),
            'source_url' => $this->faker->url,
            'published_at' => $this->faker->dateTimeBetween('-1 month', 'now')
        ];
    }
}
