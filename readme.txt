"D:\Mongodb\Server\4.4\bin\mongod.exe" --dbpath="D:\data\db" =>comando para ejecutar mongodb en local


//para ver todas las variables de entorno
heroku config
//comando en heroku para definir variable de entorno
heroku config:set <nombre>=<valor>
//borrar una variable
heroku config:unset <nombre>
//obtener el valor de una variable
heroku config:get <nombre>




//scripts en postman ir a la pestaña pre-request Script para ejecutar script antes de la request 
y en la pestaña test escribimos los script que se ejecutan luego de obtener el response

en pestaña test escribir el siguiente script:

let resp = pm.response.json()

if( resp.ok ){
    let token = resp.token;
    pm.enviroment.set("token", token);
}else {
    console.log('No se actualiza el token');
}       // este script es para que se guarde y actualize automaticamente el token y lo almacene comouna variable de entorno en postman


// pagina para destramar token
https://jwt.io/




//AUTENTICACION CON GOOGLE 
CREAR UNA CREDENCIAL CLIENTE ID Y NUEVO PROYECTO Y PONER EN LA LISTA EL HOST CON EL PUERTO en produccion hay que pegar la url de keroku tambien en whitelist
PEGAR EN UN HTML EN ETIQUETA HEAD ESTE DOS ETIQUETAS:
<script src="https://apis.google.com/js/platform.js" async defer></script>
<meta name="google-signin-client_id" content="MICLIENTID">

//TAMBIEN PEGAR EN EL BODY ESTE TRAMO DE CODIGO
<div class="g-signin2" data-onsuccess="onSignIn"></div>

    <script>
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

            var id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);


            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/google');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                console.log('Signed in as: ' + xhr.responseText);
            };
            xhr.send('idtoken=' + id_token);
        }
    </script>

    <a href="#" onclick="signOut();">Sign out</a>
    <script>
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log('User  signed out.');
            });
        }
    </script>

//POR ULTIMO ARMAR EL ENDPOINT DONDE VA A PEGAR LA SOLICITUD POST ESCRITA ANTERIORMENTE: