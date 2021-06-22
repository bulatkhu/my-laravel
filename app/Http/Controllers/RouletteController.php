<?php

namespace App\Http\Controllers;

use App\Models\Roulette;
use App\Models\RouletteBet;
use App\Models\UserSteam;
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

    public function getAllCurrentBets() {
        $rouletteRound = Roulette::latest()->first();
        $allBets = RouletteBet::where("rouletteRound_id", $rouletteRound->id)->get();
        $newAllBets = array();

        foreach ($allBets as $bet) {
            $betWithUser = $this->getBetWithUser($bet->id);
            array_push($newAllBets, $betWithUser);
        }

        return $newAllBets;
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

        $candidateUserBet = null;
        foreach ($rouletteRound->bets as $bet) {
            if ($bet->user_id === $user->id && $bet->color === $request->color) {
                $candidateUserBet = $bet;
            }
        }

        if ($candidateUserBet) {
            $updatedBet = RouletteBet::find($candidateUserBet->id);
            $updatedBet->value = $updatedBet->value + $request->value;
            $updatedBet->save();

            $allBets = RouletteBet::where("rouletteRound_id", $rouletteRound->id)->get();
            $newAllBets = array();

            foreach ($allBets as $bet) {
                $betWithUser = $this->getBetWithUser($bet->id);
                array_push($newAllBets, $betWithUser);
            }

            $updatedBet->user = $user;
            $updatedBet->newItems = $newAllBets;

            return response(
                $updatedBet,
                200
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

        return response(
            $rouletteBet,
            200
        );
    }

    public function getBetWithUser($betId) {
        $bet = RouletteBet::find($betId);

        if (!is_null($bet)) {
            $user = UserSteam::find($bet->user_id);
            $bet->user = $user;
            return $bet;
        } else {
            return null;
        }
    }

}
