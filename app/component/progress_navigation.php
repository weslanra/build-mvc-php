<?php
    $i = 0;

    $width = 100/(count($data['stage']));

    $progress = "<ul class='progress-navigation'>";
    foreach ($data['stage'] as $st){
        if($i <= $data['currentStep']){
            $progress .= "<li style='width: " . $width . "%' class='active'>" . $st . "</li>";
        }else{
            $progress .= "<li style='width: " . $width . "%'>" . $st . "</li>";
        }

        $i++;
    }
    $progress .= "</ul>";


    return $progress;