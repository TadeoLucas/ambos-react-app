import axios from "axios";

// ----------------------this is for orders----------------------
export const paymentWithMP = async (data) => {
  const {title, price, quantity, description} = data;
  try{
    const response = await axios.post('/api/mercadopago/payment', 
      {
        title, 
        price, 
        quantity, 
        description
      }
    );
    return window.open(response.data.body.sandbox_init_point, '_blank'); 
  }catch(error) {
    alert('algo salio mal intentalo de nuevo');
  }
}

// ----------------------this is for products---------------------
export const paymentProductWithMP = async (data) => {
  const {id, title, price, quantity, description, size, picture, path, picture2, path2} = data;

  try{
    const response = await axios.post('/api/mercadopago/payment', 
      {
        title, 
        price, 
        quantity, 
        description
      }
    );

    window.open(response.data.body.sandbox_init_point, '_blank');

    await axios.post('/api/saleshistory/init', {
      id: response.data.body.id,
      name: title,
      price,
      size,
      description,
      picture,
      path,
      picture2,
      path2
    });

    await axios.delete(`/api/products/${id}`);

    return 
  }catch(error) {
    alert('algo salio mal intentalo de nuevo');
  }
}

