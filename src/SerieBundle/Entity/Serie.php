<?php

namespace SerieBundle\Entity;

/**
 * Serie
 */
class Serie
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
     * @return Serie
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
     * @var integer
     */
    private $serieId;


    /**
     * Set serieId
     *
     * @param integer $serieId
     *
     * @return Serie
     */
    public function setSerieId($serieId)
    {
        $this->serieId = $serieId;

        return $this;
    }

    /**
     * Get serieId
     *
     * @return integer
     */
    public function getSerieId()
    {
        return $this->serieId;
    }
}
