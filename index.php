<?php


class Hello {

    private $private;

    public function abc(): bool
    {
        $this->private = "something";

        return $this->private;
    }
}


$c = new Hello();

