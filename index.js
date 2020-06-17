const http = require('http');
const port = 8000;
const fs = require('fs');

function requestHandler(req,res){
    console.log(req.url);
    if(req.headers.accept.split(',')[0] == 'text/css') {
        console.log('TRUE');

        fs.readFile('01Resume.css', (err, data)=>{
            res.writeHeader(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });  
   }else{

    console.log('false');
   

    let filepath;
    switch(req.url){
        case '/':
            filepath = './index.html';
        case '/home':
            filepath = './index.html';
            break;
        default:
            filepath = './404.html';

    }

    fs.readFile(filepath,function(err,data){
        res.writeHead(200,{
            'content-type': 'text/html'
        });
        if(err){
            console.log("Error!!",err);
            return res.end("<h1>Error</h1>");
        }
        return res.end(data);

    });
}

}


const server = http.createServer(requestHandler);

server.listen(port,function(err){
    if(err){
        console.log(err);
        return;

    }
    console.log('Server is running on port',port);
   
})