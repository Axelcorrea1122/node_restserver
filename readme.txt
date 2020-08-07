"D:\Mongodb\Server\4.4\bin\mongod.exe" --dbpath="D:\data\db" =>comando para ejecutar mongodb en local


//para ver todas las variables de entorno
heroku config
//comando en heroku para definir variable de entorno
heroku config:set <nombre>=<valor>
//borrar una variable
heroku config:unset <nombre>
//obtener el valor de una variable
heroku config:get <nombre>