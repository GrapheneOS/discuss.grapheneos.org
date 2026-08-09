var BLOCKLIST_PATH = '/etc/nginx/blocklist.txt';
var REFRESH_MS = 60000;
// Lock TTL: how long a worker holds the refresh lock before it auto-expires.
// Guards against a worker dying mid-refresh leaving the lock permanently set.
var LOCK_TTL_MS = 5000;

function refresh() {
    var mtime;
    try {
        mtime = require('fs').statSync(BLOCKLIST_PATH).mtime.getTime();
    } catch (e) {
        return;
    }

    if (String(mtime) === ngx.shared.blocklist.get('mtime')) {
        return;
    }

    // add() is atomic and only succeeds if the key is absent — acts as a mutex.
    // Other workers that lose the race skip the refresh and serve stale data
    // (still correct — the blocklist was valid 60s ago).
    if (!ngx.shared.blocklist.add('lock', '1', LOCK_TTL_MS)) {
        return;
    }

    try {
        var text;
        try {
            text = require('fs').readFileSync(BLOCKLIST_PATH, 'utf8');
        } catch (e) {
            return;
        }

        var addrs = {};
        text.split('\n').forEach(function(line) {
            var t = line.trim();
            if (t && t[0] !== '#') addrs[t] = 1;
        });

        // Store addrs before mtime — a concurrent reader seeing the new mtime
        // but old addrs would be momentarily wrong; this ordering avoids that.
        ngx.shared.blocklist.set('addrs', JSON.stringify(addrs));
        ngx.shared.blocklist.set('mtime', String(mtime));
    } finally {
        ngx.shared.blocklist.delete('lock');
    }
}

function isBlocked(r) {
    var now = Date.now();
    var checkedAt = Number(ngx.shared.blocklist.get('checkedAt') || '0');

    if (now - checkedAt >= REFRESH_MS) {
        // Update checkedAt first so other workers don't all pile in together.
        ngx.shared.blocklist.set('checkedAt', String(now));
        refresh();
    }

    var raw = ngx.shared.blocklist.get('addrs');
    if (!raw) {
        return '';
    }

    return JSON.parse(raw)[r.remoteAddress] ? '1' : '';
}

export default { isBlocked };
