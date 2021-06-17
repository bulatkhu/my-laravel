<?php

namespace App\Http\Controllers;

use App\Models\Roulette;
use Illuminate\Http\Request;

class RouletteController extends Controller
{
    protected $table = "roulette";
    //
    public function createBet(Request $request) {
        $newBet = [
            'endAt' => $request->endAt,
            'winnerId' => $request->winnerId,
            'winnerColor' => $request->winnerColor,
            'rollingAt' => $request->rollingAt,
            'startAt' => $request->startAt,
        ];
        $newRoulette = Roulette::create($newBet);
        $newRoulette->save();
        return $newRoulette;
    }

    public function getBets() {
        return Roulette::latest()->take(100)->get();
    }

}
