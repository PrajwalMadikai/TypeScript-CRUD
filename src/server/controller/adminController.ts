import { Request, Response } from 'express';
import Student from '../modal/studentModal';
type IStudent={
    name: string;
    email: string;
    password: string;
    isBlock: boolean;
  }
 const getLogin=async(req:Request,res:Response)=>{
    try {
        console.log('Accessing /admin/login')
          res.render('adminlogin')
    } catch (error) {
        console.log(error)
    }
 }
const LoginPost=async(req:Request,res:Response)=>{
    try {
           const {email ,password}:{email:string,password:string}=req.body

          let admin:IStudent |null =await Student.findOne({email:email,isAdmin:true,password:password})
         if(admin)
         {
             res.json({success:true,message:'login success'})
         }else{
             res.json({success:false, })
         }

    } catch (error) {
        console.log(error);
        
    }
}
const dashboard = async (req: Request, res: Response) => {
    try {
      let students = await Student.find({isAdmin:false});
      console.log("student:", students);   
      res.render("dashboard", { students });
    } catch (error) {
      console.log(error);
    }
  };
  
 
export default{ getLogin,LoginPost,dashboard }