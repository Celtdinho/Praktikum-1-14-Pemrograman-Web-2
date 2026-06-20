<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine('Authorization');

        if (empty($header)) {
            return Services::response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Unauthorized',
            ]);
        }

        // Expect "Bearer TOKEN"
        if (strpos($header, 'Bearer ') === 0) {
            $token = substr($header, 7);
        } else {
            $token = $header;
        }

        if (empty($token)) {
            return Services::response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Unauthorized',
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->where('token', $token)->first();

        if (empty($user)) {
            return Services::response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Unauthorized',
            ]);
        }

        // authorized; allow request to continue
        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no action after
    }
}
