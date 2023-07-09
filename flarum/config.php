<?php return array (
  'debug' => false,
  'database' =>
  array (
    'driver' => 'mysql',
    'unix_socket' => '/run/mysqld/mysqld.sock',
    'database' => 'flarum',
    'username' => 'flarum',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'strict' => false,
    'engine' => NULL,
    'prefix_indexes' => true,
  ),
  'url' => 'https://discuss.grapheneos.org',
  'paths' =>
  array (
    'api' => 'api',
    'admin' => 'admin',
  ),
  'headers' =>
  array (
    'poweredByHeader' => false,
    'referrerPolicy' => 'same-origin',
  ),
);
