<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function addItem($userId) {
        $user = User::find($userId);

        $item = new Item();
        $item->name = "first item";
        $item->completed = false;

        $item->save();

        $user->items()->save($item);

        return "Todo has been added";
    }

}
