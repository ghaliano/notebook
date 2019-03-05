<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"contact_read"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"name": "partial"})
 * @ORM\Entity(repositoryClass="App\Repository\ContactRepository")
 */
class Contact
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("contact_read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("contact_read")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("contact_read")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("contact_read")
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("contact_read")
     */
    private $skype;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("contact_read")
     */
    private $photo;

    /**
     * @ApiFilter(SearchFilter::class, properties={"numbers.num": "ipartial"})
     * @ORM\OneToMany(targetEntity="App\Entity\Number", mappedBy="contact", orphanRemoval=true)
     * @Groups("contact_read")
     */
    private $numbers;

    public function __construct()
    {
        $this->numbers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getSkype(): ?string
    {
        return $this->skype;
    }

    public function setSkype(string $skype): self
    {
        $this->skype = $skype;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    /**
     * @return Collection|Number[]
     */
    public function getNumbers(): Collection
    {
        return $this->numbers;
    }

    public function addNumber(Number $number): self
    {
        if (!$this->numbers->contains($number)) {
            $this->numbers[] = $number;
            $number->setContact($this);
        }

        return $this;
    }

    public function removeNumber(Number $number): self
    {
        if ($this->numbers->contains($number)) {
            $this->numbers->removeElement($number);
            // set the owning side to null (unless already changed)
            if ($number->getContact() === $this) {
                $number->setContact(null);
            }
        }

        return $this;
    }
}
