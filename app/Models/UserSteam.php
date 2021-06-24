<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserSteam extends Model implements JWTSubject
{
    use HasFactory;

    protected $table = "user_steams";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'avatar',
        'steamid',
        'trade_link',
        'balance',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function rouletteBets() {
        return $this->hasMany(RouletteBet::class, "user_id");
    }
}
