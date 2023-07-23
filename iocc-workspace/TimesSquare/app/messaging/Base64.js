Ext.define('messaging.Base64', {
    singleton: !0,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    lookup: null,
    ie: /MSIE /.test(navigator.userAgent),
    ieo: /MSIE [67]/.test(navigator.userAgent),
    encode: function(j) {
        var b = this;
        var f = b.toUtf8(j),
            c = -1,
            i = f.length,
            g, d, e, a = new Array(3);
        if (b.ie) {
            var h = [];
            while (++c < i) {
                g = f[c];
                d = f[++c];
                a[0] = g >> 2;
                a[1] = (g & 3) << 4 | d >> 4;
                if (isNaN(d)) {
                    a[2] = a[3] = 64
                } else {
                    e = f[++c];
                    a[2] = (d & 15) << 2 | e >> 6;
                    a[3] = isNaN(e) ? 64 : e & 63
                }
                h.push(b.alphabet.charAt(a[0]), b.alphabet.charAt(a[1]), b.alphabet.charAt(a[2]), b.alphabet.charAt(a[3]))
            }
            return h.join('')
        } else {
            var h = '';
            while (++c < i) {
                g = f[c];
                d = f[++c];
                a[0] = g >> 2;
                a[1] = (g & 3) << 4 | d >> 4;
                if (isNaN(d)) {
                    a[2] = a[3] = 64
                } else {
                    e = f[++c];
                    a[2] = (d & 15) << 2 | e >> 6;
                    a[3] = isNaN(e) ? 64 : e & 63
                }
                h += b.alphabet[a[0]] + b.alphabet[a[1]] + b.alphabet[a[2]] + b.alphabet[a[3]]
            }
            return h
        }
    },
    decode: function(f) {
        var d = this;
        if (f.length % 4) {
            throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.")
        }
        var b = d.fromUtf8(f),
            a = 0,
            e = b.length;
        if (d.ieo) {
            var c = [];
            while (a < e) {
                if (b[a] < 128) {
                    c.push(String.fromCharCode(b[a++]))
                } else {
                    if (b[a] > 191 && b[a] < 224) {
                        c.push(String.fromCharCode((b[a++] & 31) << 6 | b[a++] & 63))
                    } else {
                        c.push(String.fromCharCode((b[a++] & 15) << 12 | (b[a++] & 63) << 6 | b[a++] & 63))
                    }
                }
            }
            return c.join('')
        } else {
            var c = '';
            while (a < e) {
                if (b[a] < 128) {
                    c += String.fromCharCode(b[a++])
                } else {
                    if (b[a] > 191 && b[a] < 224) {
                        c += String.fromCharCode((b[a++] & 31) << 6 | b[a++] & 63)
                    } else {
                        c += String.fromCharCode((b[a++] & 15) << 12 | (b[a++] & 63) << 6 | b[a++] & 63)
                    }
                }
            }
            return c
        }
    },
    toUtf8: function(d) {
        var f = this;
        var c = -1,
            e = d.length,
            a, b = [];
        if (/^[\x00-\x7f]*$/.test(d)) {
            while (++c < e) {
                b.push(d.charCodeAt(c))
            }
        } else {
            while (++c < e) {
                a = d.charCodeAt(c);
                if (a < 128) {
                    b.push(a)
                } else {
                    if (a < 2048) {
                        b.push(a >> 6 | 192, a & 63 | 128)
                    } else {
                        b.push(a >> 12 | 224, a >> 6 & 63 | 128, a & 63 | 128)
                    }
                }
            }
        }
        return b
    },
    fromUtf8: function(d) {
        var c = this;
        var b = -1,
            f, e = [],
            a = new Array(3);
        if (!c.lookup) {
            f = c.alphabet.length;
            c.lookup = {};
            while (++b < f) {
                c.lookup[c.alphabet.charAt(b)] = b
            }
            b = -1
        }
        f = d.length;
        while (++b < f) {
            a[0] = c.lookup[d.charAt(b)];
            a[1] = c.lookup[d.charAt(++b)];
            e.push(a[0] << 2 | a[1] >> 4);
            a[2] = c.lookup[d.charAt(++b)];
            if (a[2] == 64) {
                break
            }
            e.push((a[1] & 15) << 4 | a[2] >> 2);
            a[3] = c.lookup[d.charAt(++b)];
            if (a[3] == 64) {
                break
            }
            e.push((a[2] & 3) << 6 | a[3])
        }
        return e
    }
});
