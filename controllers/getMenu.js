// const axios = require('axios');
const {Product, Label} = require('../db');

const getMenu = async(idresto)=>{
    let allproducts=await Product.findAll({include:{
        model: Label,
        attributes: ['id'],
    },
    where:{
        UserId: idresto
    }
    });
    return allproducts.map(p=>{
        return{
            id:p.id,
            name:p.name,
            price:p.price,
            detail:p.detail,
            image:p.image,
            available:p.available,
            DiscountId:p.DiscountId,
            CategoryId:p.CategoryId,
            UserId:p.UserId,
            Labels:p.Labels.map(label=>label.id),
        }
    });
}

module.exports = getMenu