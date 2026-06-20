<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
// Authentication
$routes->post('login', 'AuthController::login');

// Preflight handler for CORS (no auth)
$routes->options('/', static function() {
	$response = service('response');
	return $response->setStatusCode(200)
		->setHeader('Access-Control-Allow-Origin', '*')
		->setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
		->setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,Origin');
});

$routes->options('(:any)', static function() {
	$response = service('response');
	return $response->setStatusCode(200)
		->setHeader('Access-Control-Allow-Origin', '*')
		->setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
		->setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,Origin');
});

// Public read routes for resources
$routes->get('books', 'Books::index');
$routes->get('books/(:num)', 'Books::show/$1');
$routes->get('categories', 'Categories::index');
$routes->get('categories/(:num)', 'Categories::show/$1');

// Protected write routes for resources (require Bearer token)
$routes->group('', ['filter' => 'auth'], static function($routes) {
	$routes->post('books', 'Books::create');
	$routes->put('books/(:num)', 'Books::update/$1');
	$routes->delete('books/(:num)', 'Books::delete/$1');

	$routes->post('categories', 'Categories::create');
	$routes->put('categories/(:num)', 'Categories::update/$1');
	$routes->delete('categories/(:num)', 'Categories::delete/$1');
});
