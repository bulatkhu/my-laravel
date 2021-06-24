<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoulettesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('roulette');
        Schema::create('roulette', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("endAt");
            $table->string("winnerColor")->nullable()->default(null);
            $table->bigInteger("winnerId")->nullable()->default(null);
            $table->string("rollingAt");
            $table->string("startAt");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roulette');
    }
}
