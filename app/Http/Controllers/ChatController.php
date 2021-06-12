<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    protected $table = "chat_messages";
    //
    function index() {
        return ChatMessage::latest()->take(100)->get();
    }

    function store(Request $request) {
        $chatMessage = new ChatMessage;
        $chatMessage->message = $request->message;
        $chatMessage->user = $request->get("user");

        dd("message", $chatMessage);
    }
}
