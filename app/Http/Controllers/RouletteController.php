<?php

namespace App\Http\Controllers;

use App\Models\Roulette;
use App\Models\RouletteBet;
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

    public function newBet(Request $request) {
        $user = $request->get("user");

        $betValidated = $request->validate([
            "color" => "required|string",
            "value" => "required|numeric",
        ]);

        $rouletteRound = Roulette::latest()->first();

        if (date("c") < $rouletteRound->endAt) {
            return response(
                [
                    "message" => "round ended"
                ], 400
            );
        }

        $rouletteBet = RouletteBet::create([
            "color" => $request->color,
            "value" => $request->value,
            "user_id" => $user->id,
            "rouletteRound_id" => $rouletteRound->id,
        ]);

        $rouletteBet->save();

        $rouletteBet->user = $user;
        $rouletteBet->round = $rouletteRound;

        return response(
            $rouletteBet,
            200
        );
    }

}
