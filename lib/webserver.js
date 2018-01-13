const   request = require('request')
    ,   querystring = require('querystring')
;
module.exports.authorize = function (params, cb) {
    var url = params.instance_url;
    if(url===undefined){
        return cb(new Error('Missing instance_url parameter'),null);
    }
    var allowedParams = ['client_id','scope','redirect_uri','state','immediate','code_challenge','display','login_hint','nonce','prompt'];
    clean(params,allowedParams);
    params.response_type='code';
    cb(null,url+"/services/oauth2/authorize?"+querystring.stringify(params));
}
module.exports.accessToken = function (params, cb) {
    var url = params.instance_url;
    if(url===undefined){
        return cb(new Error('Missing instance_url parameter'),null);
    }
    var allowedParams = ['code','client_id','client_secret','client_assertion','client_assertion_type','redirect_uri','code_verifier','format'];
    clean(params,allowedParams);
    param.grant_type = 'authorization_code';
    request.post(
        url+'/services/oauth2/token?'+querystring.stringify(params),
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(error,body)
            } else {
                cb(error,null)
            }
        }
    );
}
module.exports.refreshToken = function (params, cb) {
    var url = params.instance_url;
    if(url===undefined){
        return cb(new Error('Missing instance_url parameter'),null);
    }
    var allowedParams = ['refresh_token','client_id','client_secret','client_assertion','client_assertion_type','redirect_uri','code_verifier','format','grant_type'];
    clean(params,allowedParams);
    request.post(
        url+'/services/oauth2/token?'+querystring.stringify(params),
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(error,body)
            } else {
                cb(error,null)
            }
        }
    );
}
function clean(obj,allowed){
    for(var param in obj){
        if(!allowed.includes(param))
        delete obj[param];
    }
}