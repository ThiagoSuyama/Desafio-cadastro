import Office from '../models/Office'
import * as yup from 'yup'

class OfficeController {
  async store(req, res){
    const schema = yup.object().shape({
      name: yup.string().required(),
      area: yup.string().required(),
      hierarchy_level: yup.number().integer(),
      subordinate_user: yup.number().integer(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }
    

    const office = await Office.create(req.body);

    return res.json(office);

  }

  async update(req, res){

    const office =  await Office.findByPk(req.params.id); 

    await office.update(req.body);
    return res.json(office);

  }

  async delete(req, res){
    const office =  await Office.findByPk(req.params.id); 
    await office.destroy(req.params.id);
    return res.json({messagem:"Successfully Deleted"});

  }


  async index(req, res){
    const offices = await Office.findAll({

    });
    return res.json(offices);
  }


}

export default new OfficeController();