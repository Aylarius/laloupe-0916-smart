<?php
namespace SerieBundle\Controller;

use SerieBundle\Entity\Serie;
use SerieBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;


class SerieController extends Controller
{

    public function followAction(Request $request)
    {
        // Get data and decode JSON
        $test = $request->request->all();
        $data = json_decode(key($test), true);

        $userId = $data['user_id'];
        $serieId = $data['id'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $userId));

        $emSerie = $this->getDoctrine()->getManager();
        $serieExist = $emSerie->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $serieId, 'userId' => $userId));

        if (!$serieExist){
            // Create new serie entity
            $serie = new Serie();
            $serie->setSerieId($serieId);
            $serie->setUserId($user);

            // Send to database
            $em = $this->getDoctrine()->getManager();
            $em->persist($serie);
            $em->flush();

            // Return as JSON
            $serializer = $this->get('serializer');
            $response = $serializer->serialize($serie, 'json');
            return new JsonResponse(json_decode($response));
        }
        else {
            // Delete from database
            $em = $this->getDoctrine()->getManager();
            $em->remove($serieExist);
            $em->flush();

            // Return as JSON
            $data = 'Vous ne suivez plus la série.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
    }

    public function doifollowAction(Request $request, $id, $data)
    {
        // Get data and decode JSON
        $serieId = $id;
        $userId = $data;

        $emSerie = $this->getDoctrine()->getManager();
        $serieExist = $emSerie->getRepository('SerieBundle:Serie')->findOneBy(array('serieId' => $serieId, 'userId' => $userId));

        if ($serieExist){
            // Return as JSON
            return new JsonResponse(['followed' => true]);
        }
        else {
            // Return as JSON
            return new JsonResponse(['followed' => false]);
        }
    }

    public function getAllAction($id)
    {
        // Get data and decode JSON
        $userId = $id;

        $em = $this->getDoctrine()->getManager();
        $serielist = $em->getRepository('SerieBundle:Serie')->findBy(array('userId' => $userId));

        if (!$serielist){
            // Return as JSON
            $data = 'Vous ne suivez pas de série.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
        else {
            // Return as JSON
            $serializer = $this->get('serializer');
            $response = $serializer->serialize($serielist, 'json');
            $data = json_decode($response, true);
            $res = [];
            foreach($data as $d) {
                array_push($res, $d['serieId']);
            }
            return new JsonResponse($res);

        }
    }

    public function followinscAction(Request $request, $id)
    {
        // Get data and decode JSON
        $userId = $id;

        $em = $this->getDoctrine()->getManager();
        $serielist = $em->getRepository('SerieBundle:Serie')->findBy(array('userId' => $userId));

        if (!$serielist){
            // Return as JSON
            $data = 'Vous ne suivez pas de série.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
        elseif (count($serielist) >= 3) {
            // Return as JSON
            $serializer = $this->get('serializer');
            $response = $serializer->serialize($serielist, 'json');
            return new JsonResponse(json_decode($response));
        }
        else {
          $data = 'Vous devez marquer au moins 3 séries.';
          $response = new JsonResponse($data);
          $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
          return $response;

        }
    }

}
