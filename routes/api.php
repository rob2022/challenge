<?php

use App\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/form-schema', function (Request $request) {
    $formSchemaRepository = new \App\Repositories\FormSchemaRepository();

    return $formSchemaRepository->getSchema();
});

Route::post('/member', function (Request $request) {
    $validatedData = $request->validate([
        'address' => ['required', 'regex:/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/'],
        'nickname' => 'string|nullable',
        'age' => 'numeric|nullable',
        'name' => ['required', 'min:4', 'max:255', 'regex:/^[a-z ,.\'-]+$/i'],
    ]);

    Member::create($validatedData);

    return ['success' => true];
});

Route::get('/member', function (Request $request) {
    return Member::all();
});
