import bcrybt from 'bcryptjs'
import { User } from '../../models/index.js';

export const signUpUserController = async (req, res) => {
    
const isUser = await User.findOne({ email: req.body.email });
if(isUser) return res.status(400).json({
    msg: 'There is a user already with this email!'
});

try{
    const hashSalt = await bcrybt.genSalt(10);
    const hashed = await bcrybt.hash(req.body.password, hashSalt);
    console.log(hashed);
    const { repeatPassword, ...restBody} = req.body;
    const user = await new User({...restBody, password: hashed });
    await user.save();
    res.status(201).json({
        msg: 'user created Successfully!'
    })
}catch(err){
    res.status(400).json(err)
}
}