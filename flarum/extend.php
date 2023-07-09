<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '
<meta name="msapplication-TileColor" content="#ffffff"/>
<meta name="twitter:site" content="@GrapheneOS"/>
<meta property="og:image" content="https://discuss.grapheneos.org/opengraph.png"/>
<meta property="og:image:width" content="512"/>
<meta property="og:image:height" content="512"/>
<meta property="og:image:alt" content="GrapheneOS logo"/>
<meta property="og:site_name" content="GrapheneOS Discussion Forum"/>
<link rel="icon" href="/favicon.ico"/>
<link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg"/>
<link rel="mask-icon" href="/780febcc.mask-icon.svg" color="#1a1a1a"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="manifest" href="/manifest.webmanifest"/>
            ';
        })
];
