<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BookModel;

class Books extends ResourceController
{
    protected $modelName = BookModel::class;
    protected $format = 'json';

    public function index()
    {
        $data = $this->model
            ->select('books.*, categories.name as category_name')
            ->join('categories', 'categories.id = books.category_id', 'left')
            ->findAll();

        return $this->respond(['status' => true, 'message' => 'Success', 'data' => $data], 200);
    }

    public function show($id = null)
    {
        $item = $this->model
            ->select('books.*, categories.name as category_name')
            ->join('categories', 'categories.id = books.category_id', 'left')
            ->where('books.id', $id)
            ->first();

        if (empty($item)) {
            return $this->respond(['status' => false, 'message' => 'Not Found'], 404);
        }

        return $this->respond(['status' => true, 'message' => 'Success', 'data' => $item], 200);
    }

    public function create()
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();
        if (empty($input['title']) || empty($input['category_id'])) {
            return $this->respond(['status' => false, 'message' => 'Validation Error'], 422);
        }

        $data = [
            'title' => $input['title'],
            'author' => $input['author'] ?? null,
            'publisher' => $input['publisher'] ?? null,
            'category_id' => $input['category_id'],
            'status' => $input['status'] ?? 'Available',
        ];

        $id = $this->model->insert($data);

        $created = $this->model
            ->select('books.*, categories.name as category_name')
            ->join('categories', 'categories.id = books.category_id', 'left')
            ->where('books.id', $id)
            ->first();

        return $this->respondCreated(['status' => true, 'message' => 'Success', 'data' => $created]);
    }

    public function update($id = null)
    {
        $item = $this->model->find($id);
        if (empty($item)) {
            return $this->respond(['status' => false, 'message' => 'Not Found'], 404);
        }

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if (empty($input['title']) || empty($input['category_id'])) {
            return $this->respond(['status' => false, 'message' => 'Validation Error'], 422);
        }

        $data = [
            'title' => $input['title'],
            'author' => $input['author'] ?? $item['author'],
            'publisher' => $input['publisher'] ?? $item['publisher'],
            'category_id' => $input['category_id'],
            'status' => $input['status'] ?? $item['status'],
        ];

        $this->model->update($id, $data);

        $updated = $this->model
            ->select('books.*, categories.name as category_name')
            ->join('categories', 'categories.id = books.category_id', 'left')
            ->where('books.id', $id)
            ->first();

        return $this->respond(['status' => true, 'message' => 'Success', 'data' => $updated], 200);
    }

    public function delete($id = null)
    {
        $item = $this->model->find($id);
        if (empty($item)) {
            return $this->respond(['status' => false, 'message' => 'Not Found'], 404);
        }

        $this->model->delete($id);
        return $this->respond(['status' => true, 'message' => 'Success', 'data' => null], 200);
    }
}
