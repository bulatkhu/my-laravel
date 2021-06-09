<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    public function __construct() {
        $this->middleware("auth");
    }
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection|Response
     */
    public function index()
    {
        $userId = auth()->user()->id;
        return Item::where("user_id", $userId)->get();
    }

    /**
     * Show the form for creating a new resource.
     * @param Request $request
     * @return Item
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Item
     */
    public function store(Request $request): Item
    {
        $userId = auth()->user()->getAuthIdentifier();
        $user = User::find($userId);

        $newItem = new Item;
        $newItem->name = $request->item["name"];
        $newItem->user_id = $user->id;
        $newItem->save();

        $user->items()->save($newItem);

        return $newItem;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return string
     */
    public function update(Request $request, $id)
    {
        $existingItem = Item::find( $id );

        if ($existingItem) {
            $existingItem->completed = $request->item['completed'] ? true : false;
            $existingItem->completed_at = $request->item['completed'] ? Carbon::now() : null;
            $existingItem->save();
            return $existingItem;
        }
        return "Item not found.";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return string
     */
    public function destroy(int $id)
    {
        $existingItem = Item::find($id);

        if ($existingItem) {
            $existingItem->delete();
            return "Item successfully deleted.";
        }

        return "Item with id " . $id . " not found";
    }
}
