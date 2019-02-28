<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * )
 * @ORM\Entity(repositoryClass="App\Repository\NumberRepository")
 */
class Number
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("contact_read")
     */
    private $id;

    /**
     * @Groups("contact_read")
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("contact_read")
     */
    private $num;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contact", inversedBy="numbers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $contact;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNum(): ?string
    {
        return $this->num;
    }

    public function setNum(?string $num): self
    {
        $this->num = $num;

        return $this;
    }

    public function getContact(): ?Contact
    {
        return $this->contact;
    }

    public function setContact(?Contact $contact): self
    {
        $this->contact = $contact;

        return $this;
    }
}
