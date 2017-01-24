<?php
namespace SerieBundle\Controller;

use SerieBundle\Entity\User;
use SerieBundle\Entity\Serie;
use SerieBundle\Entity\Episode;
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
        $test = $request->request->all();
        $data = json_decode(key($test), true);
        $email = str_replace("_", ".", $data['email']);

        if ($data['password'] != $data['passwordConf']) {
            $data = 'Les mots de passe doivent être identiques.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('email' => $email));

        if ($user) {
            $data = 'Cette adresse email est déjà utilisée.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
        if (!$user && $data['password'] == $data['passwordConf'] && $data['conditions'] == true) {
        // Create new album entity
            $user = new User();
            $user->setUsername($data['username']);
            $user->setEmail($email);

            if (isset($data['picture'])){
                $picture = str_replace("_", ".", $data['picture']);
                $user->setPicture($picture);
            } else {
                $user->setPicture('');
            }

            // Encode the password
            $password = $this->get('security.password_encoder')
            ->encodePassword($user, $data['password']);
            $user->setPassword($password);

            // Send to database
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Create JWT token with username
            $token = $this->get('lexik_jwt_authentication.encoder')
                ->encode(['username' => $user->getUsername()]);

            $user = json_decode($this->get('serializer')->serialize($user, 'json'));

            // Return generated token
            return new JsonResponse(['token' => 'Bearer '.$token, 'user' => $user]);

        } else {
            $data = 'Si tu ne coches pas la case, un bébé chaton sera sacrifié... Alors coche la case !';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
    }

    public function loginAction(Request $request)
    {
        $test = $request->request->all();
        $data = json_decode(key($test), true);

        $email = str_replace("_", ".", $data['email']);
        $password = $data['password'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('email' => $email));

        if (!$user) {
            $data = 'Vous n\'avez pas encore de compte.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);;
            return $response;
        } else {
            $actif = $user->getIsActive();

            if ($actif === true) {

                // Check password
                if (!$this->get('security.password_encoder')->isPasswordValid($user, $password)) {
                    $data = 'Vous n\'avez pas saisi le bon mot de passe.';
                    $response = new JsonResponse($data);
                    $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);;
                    return $response;
                } else {
                    // Create JWT token with username
                    $token = $this->get('lexik_jwt_authentication.encoder')
                        ->encode(['username' => $user->getUsername()]);

                    $user = json_decode($this->get('serializer')->serialize($user, 'json'));

                    // Return generated token
                    return new JsonResponse(['token' => 'Bearer '.$token, 'user' => $user]);
                }

            } else {
                $data = 'Votre compte est désactivé.';
                $response = new JsonResponse($data);
                $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);;
                return $response;
            }
        }
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


    public function editAction(Request $request)
    {
        // Get data and decode JSON
        $test = $request->request->all();
        $data = json_decode(key($test), true);
        $id = $data['id'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $id));

        // Update data
        if (isset($data['username'])) {

            $user->setUsername($data['username']);

            // Create JWT token with username
            $token = $this->get('lexik_jwt_authentication.encoder')
                ->encode(['username' => $data['username']]);
        }

        if (isset($data['email'])) {
            $email = str_replace("_", ".", $data['email']);
            $user->setEmail($email);
        }
        if (isset($data['picture'])) {
            $picture = str_replace("_", ".", $data['picture']);
            $user->setPicture($picture);
        }

        if (isset($data['password']) && isset($data['passwordConf'])){

            if ($data['password'] == $data['passwordConf']) {
                $password = $data['password'];
                $password = $this->get('security.password_encoder')
                    ->encodePassword($user, $data['password']);
                $user->setPassword($password);
            }
            else {
                $data = 'Les deux mots de passe saisis ne sont pas identiques.';
                $response = new JsonResponse($data);
                $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
                return $response;
            }

        }
        if ((isset($data['password']) && !isset($data['passwordConf'])) || (!isset($data['password']) && isset($data['passwordConf']))) {
            $data = 'Vous n\'avez pas saisi deux mots de passe.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }

            // Send to database
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $user = json_decode($this->get('serializer')->serialize($user, 'json'));

        if (isset($token)) {
            // Return generated token
            return new JsonResponse(['token' => 'Bearer '.$token, 'user' => $user]);

        } else {
            // Return as JSON
            return new JsonResponse(json_decode($user));
        }

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

    public function retrieveAction(Request $request){
        // retrieve the file with the name given in the form.
        // do var_dump($request->files->all()); if you need to know if the file is being uploaded.
        $file = $request->files->get('picture');
        $status = array('status' => "success","fileUploaded" => false);

        // If a file was uploaded
        if(!is_null($file)){
            // generate a random name for the file but keep the extension
            $filename = uniqid().".".$file->getClientOriginalExtension();
            $path = "./bundles/serie/uploads";
            $file->move($path,$filename); // move the file to a path
            $status = array('status' => "success","fileUploaded" => $filename);
        }

        return new JsonResponse($status);
    }

    public function statsAction($id){
        // Get data from database
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $id));
        $serieList = $em->getRepository('SerieBundle:Serie')->findBy(array('userId' => $user));
        $episodeList = $em->getRepository('SerieBundle:Episode')->findBy(array('userId' => $user));
        
        if (isset($serieList) && isset($episodeList) && !is_null($serieList) && !is_null($episodeList)) {
            $episodes = count($episodeList);
            $series = count($serieList);
            $count = 0;
            foreach ($episodeList as $episode){
                $serieId = $episode->getSerieId();
                $serie = $em->getRepository('SerieBundle:Serie')->findOneBy(array('userId' => $user, 'id' => $serieId));
                $serieDuration = $serie->getDuration();
                $count += $serieDuration;
            }
            return new JsonResponse(['series' => $series, 'episodes' => $episodes, 'duration' => $count]);

        }
        elseif (!$serieList || is_null($serieList)){
            return new JsonResponse(['series' => 0, 'episodes' => 0]);
        }
        elseif (!$episodeList || is_null($episodeList)) {
            $serie = count($serieList);
            return new JsonResponse(['series' => $serie, 'episodes' => 0]);
        }
        else {
            $data = 'Erreur.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);;
            return $response;
        }
    }

    public function deactivateAction(Request $request)
    {
        // Get data and decode JSON
        $test = $request->request->all();
        $data = json_decode(key($test), true);
        $id = $data['id'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('id' => $id));

        if (isset($data['deactivate']) && $data['deactivate'] === true) {

            // Update data
            $user->setIsActive(false);

            // Send to database
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Return as JSON
            $user = $this->get('serializer')->serialize($user, 'json');
            $response = new JsonResponse(json_decode($user));
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);;
            return $response;

        } else {
            $data = 'Erreur.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
    }

    public function reactivateAction(Request $request)
    {
        $test = $request->request->all();
        $data = json_decode(key($test), true);

        $email = str_replace("_", ".", $data['email']);
        $password = $data['password'];

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('SerieBundle:User')->findOneBy(array('email' => $email));

        if (!$user) {
            $data = 'Vous n\'avez pas encore de compte ou bien vous vous êtes trompés dans votre email.';
            $response = new JsonResponse($data);
            $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
            return $response;
        }
        elseif ($user && isset($data['deactivate']) && $data['deactivate'] === false) {

            $actif = $user->getIsActive();

            if ($actif === false) {
                // Check password
                if (!$this->get('security.password_encoder')->isPasswordValid($user, $password)) {
                    $data = 'Vous n\'avez pas saisi le bon mot de passe.';
                    $response = new JsonResponse($data);
                    $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
                    return $response;
                }

                // Reactivate account
                $user->setIsActive(true);

                // Send to database
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();

                // Create JWT token with username
                $token = $this->get('lexik_jwt_authentication.encoder')
                    ->encode(['username' => $user->getUsername()]);

                $user = json_decode($this->get('serializer')->serialize($user, 'json'));

                // Return generated token
                return new JsonResponse(['token' => 'Bearer ' . $token, 'user' => $user]);
            } else {
                $data = 'Votre compte n\'est pas désactivé.';
                $response = new JsonResponse($data);
                $response->setStatusCode(JsonResponse::HTTP_EXPECTATION_FAILED);;
                return $response;
            }

        } else {
            $data = 'La réactivation a échouée, merci de retenter dans quelques instants.';
            $response = new JsonResponse($data);
            return $response;
        }


    }


}
