<?php

namespace SerieBundle\Entity;

/**
 * Episode
 */
class Episode
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var int
     */
    private $userId;

    /**
     * @var int
     */
    private $serieId;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return Episode
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set serieId
     *
     * @param integer $serieId
     *
     * @return Episode
     */
    public function setSerieId($serieId)
    {
        $this->serieId = $serieId;

        return $this;
    }

    /**
     * Get serieId
     *
     * @return int
     */
    public function getSerieId()
    {
        return $this->serieId;
    }
    /**
     * @var integer
     */
    private $episodeId;


    /**
     * Set episodeId
     *
     * @param integer $episodeId
     *
     * @return Episode
     */
    public function setEpisodeId($episodeId)
    {
        $this->episodeId = $episodeId;

        return $this;
    }

    /**
     * Get episodeId
     *
     * @return integer
     */
    public function getEpisodeId()
    {
        return $this->episodeId;
    }
    /**
     * @var \DateTime
     */
    private $date;


    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Episode
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }
    /**
     * @var integer
     */
    private $saison;


    /**
     * Set saison
     *
     * @param integer $saison
     *
     * @return Episode
     */
    public function setSaison($saison)
    {
        $this->saison = $saison;

        return $this;
    }

    /**
     * Get saison
     *
     * @return integer
     */
    public function getSaison()
    {
        return $this->saison;
    }
    /**
     * @var integer
     */
    private $numero;


    /**
     * Set numero
     *
     * @param integer $numero
     *
     * @return Episode
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;

        return $this;
    }

    /**
     * Get numero
     *
     * @return integer
     */
    public function getNumero()
    {
        return $this->numero;
    }
}
