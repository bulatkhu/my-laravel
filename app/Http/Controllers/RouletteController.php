<?php

namespace App\Http\Controllers;

use App\Models\Roulette;
use App\Models\RouletteBet;
use App\Models\UserSteam;
use Illuminate\Http\Request;

class RouletteController extends Controller
{
    protected $table = "roulette";

    public function changeBet(Request $request) {
        Roulette::where("id", $request->id)
            ->update([
                "winnerColor" => $request->winnerColor,
                "winnerId" => $request->winnerId,
            ]);

        $rouletteRound = Roulette::find($request->id);
        $participants = array();

        foreach ($rouletteRound->bets as $bet) {
            $participant = UserSteam::find($bet->user_id);
            array_push($participants, $participant);
            $winCount = 0;

            if ($bet->color === $request->winnerColor) {
                if ($bet->color === "green" || $bet->color === "blue") {
                    $winCount = $bet->value * 2;
                } else {
                    $winCount = $bet->value * 14;
                }
            }

            $participant->update([
                "balance" => $participant->balance + $winCount
            ]);
        }

        return $rouletteRound;
    }

    public function createBet(Request $request) {
        $newBet = [
            'endAt' => $request->endAt,
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

    public function roundEnd() {

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
        $currentTime = date("c");

        $canBet =
            $rouletteRound->startAt < $currentTime &&
            $currentTime < $rouletteRound->rollingAt;

        if (!$canBet) {
            return response(
                [
                    "message" => "round ended"
                ], 400
            );
        }

        if ($user->balance - $request->value < 0) {
            return response(
                [
                    "message" => "you do not have enough money"
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

            $userData = UserSteam::find($user->id);
            $userData->update([
                "balance" => $userData->balance - $request->value,
            ]);

            $updatedBet->user = $userData;
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

        $userData = UserSteam::find($user->id);
        $userData->update([
            "balance" => $userData->balance - $request->value,
        ]);

        $rouletteBet->user = $userData;

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
