<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->string('source')->nullable();
            $table->string('author')->nullable();
            $table->string('category')->nullable();
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('image_url')->nullable();
            $table->string('source_url')->nullable();
            $table->string('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
