<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    protected $table = "chat_messages";
    //
    function index() {
        $redisChat = array_reverse(Redis::lrange("chat", 0, -1));
        $i = 0;
        $newMessages = [];

        foreach ($redisChat as $key => $newMessage[$i]) {
            if ($i > 20) { break; }
            array_push($newMessages, json_decode($redisChat[$key]));
            $i++;
        }

        return array_reverse($newMessages);
    }

    function store(Request $request) {
        $validated = $request->validate([
            "message" => "required|string|max:100",
        ]);

        $chatMessage = [
            "id" => Str::random(16),
            "user" => $request->get("user")[0],
            "message" => $request->message,
            "time" => Carbon::now()->format("H:i"),
        ];

//        $chatMessage = new ChatMessage;
//        $chatMessage->message = $request->message;
//        $chatMessage->user = $request->get("user");

        Redis::rpush("chat", json_encode($chatMessage));
        Redis::publish("newMessage", json_encode($chatMessage));

    }
}
