import * as yup from 'yup';
import User from '../models/User';
import Office from '../models/Office';
import Mail from '../../lib/Mail';

class UserController {
  async store(req, res){
    
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }


    const userExists = await User.findOne({where :{ email: req.body.email}});

    if(userExists){
      return res.status(400).json({error: ' User already exists.'});
    }

    const {id, name, email, telephone, area_interest, hierarchy_level } = await User.create(req.body);

    await Mail.sendMail({
      to:`${name}<${email}>`,
      subject: 'Novo Cadastro',
      text: 'Cadastrado com Sucesso',
    });

    return res.json({
      id,
      name,
      email,  
      telephone, 
      area_interest,
      hierarchy_level
    });
  }

  async update(req, res){
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup.string().min(6).when('oldPassword',(oldPassword, field)=> oldPassword ? field.required() : field),
      confirmPassword: yup.string().when('password',(password, field)=> password ? field.required().oneOf([yup.ref('password')]) : field)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if(email && email !== user.email){
        const userExists = await User.findOne({where :{ email }});

        if(userExists){
          return res.status(400).json({error: 'User already exists.'});
        }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({ error: 'Password does not match' });
    }
    
    const {id, name, telephone, area_interest, office_id ,hierarchy_level }  = await user.update(req.body);

    return res.json({
      id,
      name,
      email,  
      telephone, 
      area_interest,
      office_id,
      hierarchy_level
    });
  }

  async delete(req, res){
    const user =  await User.findByPk(req.params.id);
    await user.destroy(req.params.id);
    return res.json({messagem:"Successfully Deleted"});

  }

  async index(req, res){
    const users = await User.findAll({
      attributes:['id','name','email','telephone','area_interest'],
      order:['id'],
      include:[
        {
          model: Office,
          as : 'office',
          attributes:['name','area'],
          include:[
            {
              model: User,
              as : 'subordinate',
              attributes:['name'] ,
              include:[
                {
                  model: Office, 
                  as:'office',
                  attributes:['name']
                }
              ]
            }
          ]
        }
      ]
    });

    return res.json(users);
  }


}

export default new UserController();