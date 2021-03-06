<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roulette extends Model
{
    use HasFactory;

    protected $table = "roulette";

    protected $fillable = [
        'endAt',
        'winnerId',
        'winnerColor',
        'rollingAt',
        'startAt',
        'bets',
    ];

    public function bets() {
        return $this->hasMany(RouletteBet::class, "rouletteRound_id");
    }

}
