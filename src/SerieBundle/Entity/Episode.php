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
}
