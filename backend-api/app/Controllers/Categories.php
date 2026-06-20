<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CategoryModel;

class Categories extends ResourceController
{
    protected $modelName = CategoryModel::class;
    protected $format = 'json';

    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond(['status' => true, 'message' => 'Success', 'data' => $data], 200);
    }

    public function show($id = null)
    {
        $item = $this->model->find($id);
        if (empty($item)) {
            return $this->respond(['status' => false, 'message' => 'Not Found'], 404);
        }
        return $this->respond(['status' => true, 'message' => 'Success', 'data' => $item], 200);
    }

    public function create()
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();
        if (empty($input['name'])) {
            return $this->respond(['status' => false, 'message' => 'Validation Error'], 422);
        }

        $id = $this->model->insert(['name' => $input['name']]);
        $created = $this->model->find($id);

        return $this->respondCreated(['status' => true, 'message' => 'Success', 'data' => $created]);
    }

    public function update($id = null)
    {
        $item = $this->model->find($id);
        if (empty($item)) {
            return $this->respond(['status' => false, 'message' => 'Not Found'], 404);
        }

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if (empty($input['name'])) {
            return $this->respond(['status' => false, 'message' => 'Validation Error'], 422);
        }

        $this->model->update($id, ['name' => $input['name']]);
        $updated = $this->model->find($id);

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
