var express = require('express')
const pool = require("./pool")
const upload = require("./multer")
var router = express.Router()
const fs = require('fs')


router.get('/signup',function(req,res,next){
    res.render('index1',{message:""})
})

router.get('/firstpage',function(req,res){

    res.render('interface',{message:""})
})

router.post('/submit',upload.single('logo'),function(req,res){
    // router.post('/submit',function(req,res){

    try{
        var Date = (req.body.advancedate)+"";
        // console.log("body : ",req.body)
        // console.log("file : ",req.file)

        var products = req.body.products+''
        // var pr = products[0]+", "+products[1]+", "+products[2]
        

        // console.log('FINALLLL:',products)



        // console.log("Products",req.body.products)
        
        pool.query("insert into supplier(stateid, cityid, suppliername, address, dueamount, advance, advancedate, firmname, products, logo) values(?,?,?,?,?,?,?,?,?,?)",[req.body.stateid,req.body.cityid, req.body.suppliername,req.body.address,req.body.dueamount,req.body.advance,Date,req.body.firmname,products,req.file.filename],function(error,result)
    {

        // console.log("error : ",error)

            if(error)
            {
                res.render('interface',{message:'THERE IS AN ISSUE IN DATA BASE'})
            }

            if(result)
            {
                res.render('interface',{message:'THE DATA IS SUBMITTED SUCCESSFULY.....'})
                console.log('FINALLLL:',result)
            }
            
    })
        
    }   

    
    catch(e)

        {
           res.render('interface',{message:'THERE IS AN ERROR DUE TO SERVER'})
        }
  
    })
  //--------------------------------------------------------------------------------------------------------------

  router.get('/fillstate',function(req,res){

    pool.query("Select * from state" , function(error,result)
{

    if(error)
        {
            res.json({data:[],status:false,message:"FAILURE"})
        }

    else
        {
            res.json({data:result,status:true,message:"SUCCESS"})
        }

})

})

// -----------------------------------------------------------------

router.get('/fillcity',function(req,res){

    pool.query("Select * from city where stateid=?",[req.query.stateid] , function(error,result)
{

    if(error)
        {
            res.json({data:[],status:false,message:"FAILURE"})
        }

    else
        {
            res.json({data:result,status:true,message:"SUCCESS"})
        }

}) 

})
// ----------------------------------------------------------------------------------------------------

router.get('/show',function(req,res,next){


    try{
    pool.query('Select S.* ,(select SS.statename from state SS where SS.stateid=S.stateid)as statename, (select C.cityname from city C where C.cityid=S.cityid) as cityname from supplier S;',function(error,result){

        // console.log('error : ',error)
        // console.log('res : ',result) 

        res.render('details',{status:true,data:result})

    })
    }
    catch(e){

        // console.log('NO ERROR INSIDE IT')

    }

})

router.get('/update',function(req,res,next){

    pool.query('Select X.* ,(Select S.statename from state S where S.stateid= X.stateid)as statename ,(Select C.cityname from city C where C.cityid = X.cityid) as cityname from supplier X where supplierid=?',[req.query.supplierid],function(error,result){

    
        res.render('updatedetails',{data:result[0],message:''})
        

    })

    

})

router.post('/updated',function(req,res){

    if(req.body.btn=="edit"){
    var Date = (req.body.advancedate)+"";
    var products = req.body.products+'';
    pool.query('update supplier set stateid=?, cityid=?, suppliername=?, address=?, dueamount=?, advance=?, advancedate=?, firmname=?, products=? where supplierid=?',[req.body.stateid,req.body.cityid,req.body.suppliername,req.body.address,req.body.dueamount,req.body.advance,Date,req.body.firmname,products,req.body.supplierid],function(error,result){

        if(result){

            res.redirect('/Main/show')
        }
        else{
        // res.redirect('/Main/show')
        console.log('error: ',error)
        }


        })
    }

    else{
        pool.query('delete from supplier where supplierid=?',[req.body.supplierid],function(error,result){

            if(error){
                res.redirect('/Main/show')
            }
            else{

                fs.unlink(`D:/SupplierProject/public/images${req.body.logo}`,function(err){
                    if(err)
                        {
                            res.redirect('/Main/show');
                        }

                    else
                        res.redirect('/Main/show')

                    console.log("DELETED")


                })
            }

        })
    }

})


// ------------------------------------------------------------------------------------


router.get('/picUpdate',function(req,res,next){
        

    res.render('picupdate',{data:req.query})   
    console.log('data: ',req.query)

})

    

router.post('/picupdone',upload.single('logo'),function(req,res,next){

    try{
        pool.query('update supplier set logo=? where supplierid=?',[req.file.filename,req.body.supplierid],function(error,result){

            if(error){
                res.redirect('/Main/show')
            }
            else
            // res.redirect('/food/menu')
            fs.unlink(`D:/SupplierProject/public/images${req.body.oldimage}`,function(err){
                if(err)
                    {
                        res.redirect('/Main/show')
                    }

                else
                    res.redirect('/Main/show')

                console.log("DELETED")


            })
        })
    }

    catch(e){
        res.redirect('/food/menu')
    }



})




module.exports = router;