<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouletteBet extends Model
{
    use HasFactory;

    protected $table = "roulette_bet";

    protected $fillable = [
        'color',
        'value',
        'user_id',
        'rouletteRound_id',
    ];

//    protected $hidden = [
//        'user_id',
//        'rouletteRound_id',
//    ];

    public function roulette(): BelongsTo
    {
        return $this->belongsTo(Roulette::class, "id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserSteam::class, "id");
    }
}
