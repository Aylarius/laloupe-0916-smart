<?php

namespace SerieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('SerieBundle::index.html.twig');
    }

    /* -----------    ACTIONS API JSON   ----------------------
    public function getAllAction()
    {
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $albums = $em->getRepository('MediaBundle:Album')->findAll();

        // Return as JSON
        $albums = $this->get('serializer')->serialize($albums, 'json');
        return new JsonResponse(json_decode($albums));
    }

    public function newAction(Request $request)
    {
        // Get data and decode JSON
        $data = json_decode(json_encode($request->request->all()), true);

        // Create new album entity
        $album = new Album();
        $album->setTitreAlbum($data['titre_album']);
        $album->setArtiste($data['artiste']);
        $album->setGenre($data['genre']);
        $album->setSupport($data['support']);

        // Send to database
        $em = $this->getDoctrine()->getManager();
        $em->persist($album);
        $em->flush();

        // Return as JSON
        $serializer = $this->get('serializer');
        $response = $serializer->serialize($data, 'json');
        return new JsonResponse(json_decode($response));

    }

    public function getOneAction(Album $album)
    {
        // Return as JSON
        $album = $this->get('serializer')->serialize($album, 'json');
        return new JsonResponse(json_decode($album));
    }

    public function editAction(Request $request, Album $album)
    {
        // Get data and decode JSON
        $data = json_decode(json_encode($request->request->all()), true);

        // Update data
        if (isset($data['titre_album'])) {
            $album->setTitreAlbum($data['titre_album']);
        }
        if (isset($data['artiste'])) {
            $album->setArtiste($data['artiste']);
        }
        if (isset($data['genre'])) {
            $album->setGenre($data['genre']);
        }
        if (isset($data['support'])) {
            $album->setSupport($data['support']);
        }

        // Get all data as JSON
        $em = $this->getDoctrine()->getManager();
        $em->persist($album);
        $em->flush();

        // Return as JSON
        $album = $this->get('serializer')->serialize($album, 'json');
        return new JsonResponse(json_decode($album));
    }


    public function deleteAction(Album $album)
    {
        // Delete from database
        $em = $this->getDoctrine()->getManager();
        $em->remove($album);
        $em->flush($album);

        // Return as JSON
        $album = $this->get('serializer')->serialize($album, 'json');
        return new JsonResponse(json_decode($album));
    }
     --------     END ACTIONS API JSON      -------------*/



}
