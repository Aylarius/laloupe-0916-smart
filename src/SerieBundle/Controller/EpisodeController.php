<?php
namespace SerieBundle\Controller;

use SerieBundle\Entity\Episode;
use SerieBundle\Entity\Serie;
use SerieBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;


class EpisodeController extends Controller
{
    public function watchAction(Request $request)
    {
        // Get data and decode JSON
        $test = $request->request->all();
        $data = json_decode(key($test), true);

        $userId = $data['user_id'];
        $serieId = $data['serie_id'];
        $episodeId = $data['episode_id'];
        $date = $data['date'];
        $saison = $data['saison'];
        $numero = $data['numero'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $userId));

        $em = $this->getDoctrine()->getManager();
        $serie = $em->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $serieId,  'userId' => $user));

        $emEpisode = $this->getDoctrine()->getManager();
        $episodeExist = $emEpisode->getRepository('SerieBundle:Episode')->findOneBy(array('serieId' => $serie, 'userId' => $user, 'episodeId' => $episodeId));
        if ($user && $serie){

          if (!$episodeExist){
              // Create new serie entity
              $episode = new Episode();
              $episode->setSerieId($serie);
              $episode->setUserId($user);
              $episode->setEpisodeId($episodeId);
              $episode->setDate(new \DateTime($date));
              $episode->setSaison($saison);
              $episode->setNumero($numero);

              // Send to database
              $em = $this->getDoctrine()->getManager();
              $em->persist($episode);
              $em->flush();

              // Return as JSON
              $serializer = $this->get('serializer');
              $response = $serializer->serialize($episode, 'json');
              return new JsonResponse(json_decode($response));
          }
          else {
              // Delete from database
              $em = $this->getDoctrine()->getManager();
              $em->remove($episodeExist);
              $em->flush();

              // Return as JSON
              $data = 'Vous n\'avez pas vu cet épisode.';
              $response = new JsonResponse($data);
              $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
              return $response;
          }
      }
      elseif (!$serie || $serie == NULL) {
        $data = 'Vous ne suivez pas cette série.';
        $response = new JsonResponse($data);
        $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
        return $response;
      }
      else {
        $data = 'Vous n\'êtes pas connectés.';
        $response = new JsonResponse($data);
        $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
        return $response;
      }
    }

    public function didiwatchAction($id, $episode, $user)
    {
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $user));

        $emSerie = $this->getDoctrine()->getManager();
        $serie = $emSerie->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $id, 'userId' => $user));

        if ($user && $serie){
            $emEpisode = $this->getDoctrine()->getManager();
            $episodeExist = $emEpisode->getRepository('SerieBundle:Episode')->findOneBy(array('serieId' => $serie, 'userId' => $user, 'episodeId' => $episode));
            if ($episodeExist){
                // Return as JSON
                return new JsonResponse(['watched' => true]);
            }
            else {
                // Return as JSON
                return new JsonResponse(['watched' => false]);
            }
        }
        else {
            return new JsonResponse(['exist' => false]);

        }
    }

    public function getAllAction($id, $user)
    {
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $user));

        $emSerie = $this->getDoctrine()->getManager();
        $serie = $emSerie->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $id, 'userId' => $user));

        if ($user && $serie){
            $emEpisode = $this->getDoctrine()->getManager();
            $episodeList = $emEpisode->getRepository('SerieBundle:Episode')->findBy(array('serieId' => $serie, 'userId' => $user));
            if (!$episodeList){
                // Return as JSON
                $data = '';
                return new JsonResponse($data);
            }
            else {
                // Return as JSON
                $serializer = $this->get('serializer');
                $response = $serializer->serialize($episodeList, 'json');
                $data = json_decode($response, true);
                $res = [];
                foreach($data as $d) {
                  array_push($res, $d['episodeId']);
                }
                return new JsonResponse($res);
            }
        }
        else {
            $data = 'Vous ne suivez pas cette série.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
    }
    public function getLastWatchedAction($id, $user)
    {
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $user));

        $emSerie = $this->getDoctrine()->getManager();
        $serie = $emSerie->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $id, 'userId' => $user));

        if ($user && $serie){
            $emEpisode = $this->getDoctrine()->getManager();
            $lastEpisode = $emEpisode->getRepository('SerieBundle:Episode')->findOneBy(array('serieId' => $serie, 'userId' => $user), array('date' => 'DESC'));

            if (!$lastEpisode){
                // Return as JSON
                $data = '';
                return new JsonResponse($data);
            }
            else {
                // Return as JSON
                $serializer = $this->get('serializer');
                $response = $serializer->serialize($lastEpisode, 'json');
                return new JsonResponse(json_decode($response));
            }
        }
        else {
            $data = 'Vous ne suivez pas cette série.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
    }
}
