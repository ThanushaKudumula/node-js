module.exports=function replacehtml(template, product){
    let rplce=template.replace('{{%IMAGE%}}', product.productImage);
    rplce=rplce.replace('{{%name%}}', product.name);
    rplce=rplce.replace('{{%modalname%}}', product.modelName);
    rplce=rplce.replace('{{%modelnumber%}}', product.modelNumber);
    rplce=rplce.replace('{{%size%}}', product.size);
    rplce=rplce.replace('{{%camera%}}', product.camera);
    rplce=rplce.replace('{{%price%}}', product.price);
    rplce=rplce.replace('{{%color%}}', product.color);
    rplce=rplce.replace('{{%ID%}}', product.id);
    return rplce;
}