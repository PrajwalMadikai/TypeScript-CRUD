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
  
  export const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;
  
      // Find the student by ID and update the name and email
      const user = await Student.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true }
      );
  
      if (!user) {
          res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'An error occurred while updating the user' });
    }
  };
  const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
  
      const user = await Student.findByIdAndDelete(userId);
  
      if (!user) {
          res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
  };

export default{ getLogin,LoginPost,dashboard ,editUser,deleteUser}