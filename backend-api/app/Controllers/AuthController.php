<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;

class AuthController extends BaseController
{
    public function login()
    {
        $data = $this->request->getJSON(true) ?? [];

        $username = $data['username'] ?? $this->request->getVar('username');
        $password = $data['password'] ?? $this->request->getVar('password');

        if (empty($username) || empty($password)) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Invalid username or password',
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->where('username', $username)->first();

        if (empty($user)) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Invalid username or password',
            ]);
        }

        // Password stored as md5 in seed; compare accordingly
        if ($user['password'] !== md5($password)) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Invalid username or password',
            ]);
        }

        // generate simple token
        $token = md5($username . time() . random_int(1000, 9999));

        // save token
        $userModel->update($user['id'], ['token' => $token]);

        return $this->response->setStatusCode(200)->setJSON([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
        ]);
    }
}
