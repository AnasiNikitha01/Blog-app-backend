import JsonWebToken from "jsonwebtoken";

async function Tokens(res,obj){
   JsonWebToken.sign({obj},process.env.Secrete_Key,{},(error,token)=>{
    if(error){
        throw error;
    }
    else{
        res.cookie('token',token).json('OK');
    }
});
}

export default Tokens;