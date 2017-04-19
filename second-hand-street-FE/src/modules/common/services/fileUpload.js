const CryptoJS = require("crypto-js");

function _utf16to8(str) {
    let out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function _base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function _safe64(base64) {
    base64 = base64.replace(/\+/g, "-");
    base64 = base64.replace(/\//g, "_");
    return base64;
};

function genUpToken(accessKey, secretKey, putPolicy) {

    //SETP 2
    let put_policy = JSON.stringify(putPolicy);

    //SETP 3
    let encoded = _base64encode(_utf16to8(put_policy));

    //SETP 4
    let hash = CryptoJS.HmacSHA1(encoded, secretKey);
    let encoded_signed = hash.toString(CryptoJS.enc.Base64);

    //SETP 5
    let upload_token = accessKey + ":" + _safe64(encoded_signed) + ":" + encoded;
    return upload_token;
};

module.exports = [
    'store',
    '$http',
    'Upload',
    function (store, $http, Upload) {

        this.token = function () {
            let uptoken = store.get('uptoken')

            if (!uptoken || uptoken.expires < Date.now() + 1000) {
                uptoken = {
                    token: genUpToken(
                        'iLMltLd7yyjiP0DrKZiT6figbGYigvyfI04JU2UB',
                        'I5Ngi10U95S7mVzTokN2mLvO54abWnEmXtHASP2N',
                        {
                            scope: 'second-hand-street',
                            deadline: parseInt((Date.now() + 3600 * 1000) / 1000)
                        }
                    ),
                    expires: parseInt((Date.now() + 3600 * 1000) / 1000) * 1000
                }

                store.set('uptoken', uptoken)
            }

            return uptoken.token
        }

        let self =  this
        this.upload = function (file) {
            return Upload.upload({
                url: 'http://upload.qiniu.com/',
                data: {
                    file: file,
                    token: self.token()
                }
            }).then(res => 'http://ol5140dkq.bkt.clouddn.com/' + res.data.key)
        }
    }
]