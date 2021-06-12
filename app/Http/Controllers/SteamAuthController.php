<?php


namespace App\Http\Controllers;


use App\Models\UserSteam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Invisnik\LaravelSteamAuth\SteamAuth;
use JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class SteamAuthController extends Controller
{
    /**
     * The SteamAuth instance.
     *
     * @var SteamAuth
     */
    protected $steam;

    /**
     * The redirect URL.
     *
     * @var string
     */
    protected $redirectURL = '/auth/callback';

    /**
     * AuthController constructor.
     *
     * @param SteamAuth $steam
     */
    public function __construct(SteamAuth $steam)
    {
        $this->steam = $steam;
    }

    /**
     * Redirect the user to the authentication page
     *
     * @return RedirectResponse|Redirector
     */
    public function redirectToSteam()
    {
        return $this->steam->redirect();
    }

    /**
     * Get user info and log in
     *
     * @return RedirectResponse|Redirector|string
     */
    public function handle()
    {
        try {
            if ($this->steam->validate()) {
                $info = $this->steam->getUserInfo();
                if (!is_null($info)) {
                    $token = $this->findOrNewUser($info);

                    return redirect($this->redirectURL . "?token=" . ($token ? $token : "null"));
                }
            }
            return $this->redirectToSteam();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function userData(Request $r) {
        return $r->get("user")[0];
    }

    /**
     * Getting user by info or created if not exists
     *
     * @param $info
     * @return string
     */
    protected function findOrNewUser($info)
    {
        $user = UserSteam::where('steamid', $info->steamID64)->first();

        if (!is_null($user)) {
            $user->update([
                'username' => $info->personaname,
                'avatar' => $info->avatarfull,
            ]);

            return JWTAuth::fromUser($user);
        } else {
            $user = UserSteam::create([
                'username' => $info->personaname,
                'avatar' => $info->avatarfull,
                'steamid' => $info->steamID64
            ]);

            return JWTAuth::fromUser($user);
        }
    }

}
