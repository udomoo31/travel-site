exports.handler = function ( event , context , callback ) {

    const secretContent = `
        <h3>Welcome to Secret area!</h3>

        <p>Tama ka sa password! ,<br/><b>Hahahahaha!</b> </p>
    `;

    let body;

    if ( event.body ) {

        body = JSON.parse( event.body );
        
    } else {
        body = {};
    }


    if (body.password === "javascript") {
        
        callback(null, {
            statusCode: 200,
            body: secretContent,
        });
        
    } else {
        
        callback(null, {
            statusCode: 401, // 401 means unauthorized
            // body: "Welcome to super duper webzit!",
        });

    }

    

}