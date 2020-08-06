process.env.PORT = process.env.PORT || 3000 //puerto


/* UN TIP PARA EL POSTMAN ES CREAR AMBIENTES UNO DE PRODUCCION Y OTRO DE DESARROLLO PARA PONER EN LA URL {{url}}/usuario y elegimos el ambiente donde queremos mandar la peticion */



// ==================
//  ENTORNO
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;