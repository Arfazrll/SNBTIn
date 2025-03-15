<?php

namespace App\Services;

use Kreait\Firebase\Factory;

class FirebaseService
{
    protected $firebase;
    protected $database;

    public function __construct()
    {
        $credentials = config('firebase.projects.app.credentials');
        $databaseUrl = config('firebase.projects.app.database.url');
        
        // Simpan hasil createDatabase() ke property $database
        $this->database = (new Factory)
            ->withServiceAccount($credentials)
            ->withDatabaseUri($databaseUrl)
            ->createDatabase();
    }

    // Method untuk menyimpan pesan
    public function storeMessage($chatRoomId, $message)
    {
        $reference = $this->database->getReference('chat_rooms/' . $chatRoomId . '/messages');
        $newMessage = $reference->push($message);
        
        return $newMessage->getKey();
    }

    // Method untuk mengambil pesan
    public function getMessages($chatRoomId, $limit = 50)
    {
        $reference = $this->database->getReference('chat_rooms/' . $chatRoomId . '/messages')
            ->orderByKey()
            ->limitToLast($limit);
            
        return $reference->getValue();
    }
}