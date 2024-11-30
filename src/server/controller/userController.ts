import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Student from '../modal/studentModal';


type IStudent={
  name: string;
  email: string;
  password: string;
  isBlock: boolean;
}

const logGet = async (req: Request, res: Response) => {
  try {

       if(req.session.userDetail)
       {
         res.redirect('/student')
       }else{
        // res.setHeader('Cache-Control', 'no-store')
           res.render('login');
       }
  } catch (error) {
    console.log(error);
  }
};

const logPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    

    let user: IStudent | null = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }

    // Ensure password is not undefined
    if (!user.password) {
      return res.status(400).json({ success: false, message: 'Invalid user data' });
    }

    const hashPass = await bcrypt.compare(password, user.password);
    if (!hashPass) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    req.session.userDetail= user

    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const signupGet = async (req: Request, res: Response) => {
  try {
    res.render('signup');
  } catch (error) {
    console.log(error);
  }
};

const signupPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, classN, email, password }: { name: string; classN: string; email: string; password: string } = req.body;

    
    const alreadyUser = await Student.findOne({ email });

    if (alreadyUser) {
        res.status(400).json({user:true, message: 'User already exists with this email' });
    }

     
    const hashedPassword = await bcrypt.hash(password, 10);  

     
    const newStudent = new Student({
      name,
      classN,
      email,
      password: hashedPassword,
    });

     
    await newStudent.save();

     
      res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

const studentGet=async(req:Request,res:Response)=>{
  try {
       
    console.log('session  :',req.session.userDetail);
    
         if(req.session.userDetail)
         {
          // res.setHeader('Cache-Control', 'no-store');

        let student: IStudent | null  = await Student.findOne({ email: req.session.userDetail?.email });
        res.render('home',{student})
         }else{
          res.redirect('/')
         }
        
  } catch (error) {
    console.log(error);
    
  }
}
const logOut = async (req: Request, res: Response) => {
  try {
    if (req.session.userDetail) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.clearCookie('connect.sid');
          res.redirect('/'); // Redirect to login after logout
        }
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

export default { logGet, signupGet, signupPost, logPost,studentGet,logOut };
