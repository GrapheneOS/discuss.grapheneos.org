<?php return [
  'debug' => false,
  'database' => [
    'driver' => 'mysql',
    'unix_socket' => '/run/mysqld/mysqld.sock',
    'database' => 'flarum',
    'username' => 'flarum',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'strict' => false,
    'engine' => 'InnoDB',
    'prefix_indexes' => true,
  ],
  'url' => 'https://discuss.grapheneos.org',
  'paths' => [
    'api' => 'api',
    'admin' => 'admin',
  ],
  'headers' => [
    'poweredByHeader' => false,
    'referrerPolicy' => 'same-origin',
  ],
];
