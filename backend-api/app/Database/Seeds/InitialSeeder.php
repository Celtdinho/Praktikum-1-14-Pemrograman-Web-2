<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class InitialSeeder extends Seeder
{
    public function run()
    {
        $now = date('Y-m-d H:i:s');

        // Users
        $users = [
            [
                'username'   => 'admin',
                'password'   => md5('admin123'),
                'token'      => null,
                'role'       => 'admin',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        $this->db->table('users')->insertBatch($users);

        // Categories
        $categories = [
            ['name' => 'Action', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Adventure', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Fantasy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Comedy', 'created_at' => $now, 'updated_at' => $now],
        ];

        $this->db->table('categories')->insertBatch($categories);

        // Map categories to ids
        $cats = $this->db->table('categories')->select('id,name')->get()->getResultArray();
        $map = [];
        foreach ($cats as $c) {
            $map[$c['name']] = $c['id'];
        }

        // Books
        $books = [
            ['title' => 'Naruto', 'author' => 'Masashi Kishimoto', 'publisher' => 'Shueisha', 'category_id' => $map['Action'] ?? 1, 'status' => 'Available', 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'One Piece', 'author' => 'Eiichiro Oda', 'publisher' => 'Shueisha', 'category_id' => $map['Adventure'] ?? 2, 'status' => 'Available', 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Solo Leveling', 'author' => 'Chu-Gong', 'publisher' => 'D&C', 'category_id' => $map['Fantasy'] ?? 3, 'status' => 'Available', 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Laskar Pelangi', 'author' => 'Andrea Hirata', 'publisher' => 'Gramedia', 'category_id' => $map['Comedy'] ?? 4, 'status' => 'Available', 'created_at' => $now, 'updated_at' => $now],
        ];

        $this->db->table('books')->insertBatch($books);
    }
}
