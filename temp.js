const express = require('express');
const app = express();

//const cors = require('cors');
//app.use(cors());

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'manoj',
    password: 'welcome123',
    database: 'dhar',
	port:3306
});
console.log("database connected");


//const bodyParser = require('body-parser');

app.use(express.static('abc'));

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;


app.get('/getBook', function (req, res) {
    
	       let input=req.query.bookid;

           let result={
			status:false,
			bookdetails:{bookid:100,bookname:"xyz",price:0}
		   };

          // console.log("reading input " + req.query.bookid);
		
		  //select * from book where bookid=1;
		  connection.query("select * from book where bookid = ?",
		   [input], 
		   (err, rows) => {
			if (err) {
				result=err;
				console.log("trouble " + err);

			  } else if(rows.length>0){
				result.status = true;
				result.bookdetails=rows[0];
				//console.log("success in db" + result.status)
			   }
		   
			
		
			  res.send(result);
			});

      });
    	
//------------------------for update------------------------------------
app.get('/updateBook', function (req, res) {
    console.log("update event");
	let input={bookid:req.query.x,
		        
				price:req.query.z,
	};

	let result=false;
	 

   // console.log("reading input " + req.query.bookid);
 
   
   connection.query("update book set price = ? where bookid = ?",
	  [input.price,input.bookid], 
	  (err, rows) => {
	   if (err) {
		 result = err;
		 console.log("trouble " + err);
	   } else if(rows.affectedRows>0){
		 result= true;
		 
		 console.log("success in db" + result)
		}
	
	    res.send(result);
	 });

});		      

	




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});