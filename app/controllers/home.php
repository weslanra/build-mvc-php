<?php


class Home extends Controller{
    public function index($name = ''){

        //Loading header
        $this->view('header', ['class-body' => 'text-center']);

//        //Loading component's
//        $progressNavigation = $this->component('progress_navigation', [
//            'stage' => array('Conexão da base de dados', 'Seleção dos dados', 'Opções', 'Autorização'),
//            'currentStep' => 0
//        ]);

        //Loading View
        $this->view('home/index');

        //Loading footer
        $this->view('footer');

    }
}