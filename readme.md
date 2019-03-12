**This project is no longer maintained**

#oidc-cordova-demo
This is a simple Ionic framework cordova application to demonstrate usage of the library [https://github.com/IdentityModel/oidc-client-js](https://github.com/IdentityModel/oidc-client-js).  The project is built using Tools for Apache Cordova (update 10) in Visual Studio 2015 purely because that is the environment I normally use.

## Testing the demo
To run the demo an OpenId Connect identity provider must be accessible from a mobile device or an emulator (one that can at least run cordova plugins).  The code has been tested using IdentityServer3 v2.5.

Setup the identity provider with a new client and scope configuration with the following properties:
### Client config
````
new Client
{
    ClientName = "OIDC demo mobile",
    ClientId = "oidcdemomobile",
    Flow = Flows.Implicit,
    AccessTokenType = AccessTokenType.Jwt,
    AllowAccessTokensViaBrowser = true,
    AllowedScopes = new List<string>
    {
        "openid",
        "profile"
    },
    ClientUri = "https://identityserver.io",
    RequireConsent = true,
    AllowRememberConsent = true,
    RedirectUris = new List<string>
    {
        "https://localhost/oidc",
    },
    PostLogoutRedirectUris = new List<string>
    {
        "https://localhost/oidc",
    },
    AllowedCorsOrigins = new List<string>
    {
        "file://\\*"
    }
}  
````
### Scope Config
````
return new[]
{
    StandardScopes.OpenId,
    StandardScopes.Profile
}
````
The demo's app.js file must be configured to suit your own identity server or other OpenId Connect identity provider.  This file is located at src/Oidc.Demo.Cordova/www/app/js/app.js and currently looks like this:
````
        ngOidcClientProvider.setSettings({
            authority: "add your STS authority url here",
            client_id: "oidcdemomobile",
            redirect_uri: "https://localhost/oidc",
            post_logout_redirect_uri: "https://localhost/oidc",
            silent_redirect_uri: "https://localhost/oidc",

            response_type: "id_token token",
            scope: "openid profile",

            automaticSilentRenew: true,

            filterProtocolClaims: true,
            loadUserInfo: true,

            popupNavigator: new Oidc.CordovaPopupNavigator(),
            iframeNavigator: new Oidc.CordovaIFrameNavigator()
    });
````
You will need to modify the authority property and specify the location of your deployed provider.  All other settings have values to match those specified for the client configuration in the provider.
