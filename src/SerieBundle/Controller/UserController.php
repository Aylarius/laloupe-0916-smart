<?php
namespace SerieBundle\Controller;

use SerieBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use SerieBundle\Security\JwtAuthenticator;
use Symfony\Component\HttpFoundation\Response;


class UserController extends Controller
{
    public function registerAction(Request $request)
    {
        // Get data and decode JSON
        $data = json_decode(json_encode($request->request->all()), true);

        // Create new album entity
        $user = new User();

        $user->setUsername($data['username']);
        $user->setEmail($data['email']);

        // Encode the password
        $password = $this->get('security.password_encoder')
            ->encodePassword($user, $data['password']);
        $user->setPassword($password);

        // Send to database
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // Return as JSON
        $serializer = $this->get('serializer');
        $response = $serializer->serialize($data, 'json');
        return new JsonResponse(json_decode($response));

    }

    public function loginAction(Request $request)
    {
        $test = $request->request->all();
        reset($test);
        $data = json_decode(key($test), true);

        $username = $data['username'];
        $password = $data['password'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('username' => $username));

        if (!$user) {
            throw $this->createNotFoundException();
        }

        // password check
        if (!$this->get('security.password_encoder')->isPasswordValid($user, $password)) {
            throw $this->createAccessDeniedException();
        }

        // Create JWT token with username
        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode(['username' => $user->getUsername()]);

        // Return generated token
        return new JsonResponse(['token' => 'Bearer '.$token]);

    }

    public function loggedinAction()
    {
        return new Response();

    }


    public function logoutAction()
    {
        $this->container->get('security.token_storage')->setToken(null);
        $response = new JsonResponse();
        $response->setStatusCode(JsonResponse::HTTP_OK);;
        return $response;

    }


    public function getAllAction()
    {
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('SerieBundle:User')->findAll();

        // Return as JSON
        $users = $this->get('serializer')->serialize($users, 'json');
        return new JsonResponse(json_decode($users));
    }

    public function getOneAction(User $user)
    {
        // Return as JSON
        $user = $this->get('serializer')->serialize($user, 'json');
        return new JsonResponse(json_decode($user));
    }


    public function editAction(Request $request, User $user)
    {
        // Get data and decode JSON
        $data = json_decode(json_encode($request->request->all()), true);

        // Update data
        if (isset($data['username'])) {
            $user->setUsername($data['username']);
        }
        if (isset($data['password'])) {
            $user->setPassword($data['password']);
        }
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        // Get all data as JSON
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // Return as JSON
        $user = $this->get('serializer')->serialize($user, 'json');
        return new JsonResponse(json_decode($user));
    }


    public function deleteAction(User $user)
    {
        // Delete from database
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        // Return as JSON
        $user = $this->get('serializer')->serialize($user, 'json');
        return new JsonResponse(json_decode($user));
    }



}
