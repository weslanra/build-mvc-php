<?php
/**
 * Created by PhpStorm.
 * User: weslan
 * Date: 14/01/2019
 * Time: 17:16
 */

class Connection{

    public static function connect($db, $url, $user, $password){
        $conn = mysqli_connect($url, $user, $password, $db);

        return $conn;
    }

    public static function query($conn, $sql){
        if($result = mysqli_query($conn, $sql)){
            while($row = $result->fetch_assoc()){
                $rows[] = $row;
            }

            return $rows;
        }else{
            return null;
        }
    }
}