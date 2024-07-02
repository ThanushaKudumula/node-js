
const db = require('../config/database');
exports.createProduct = async (req, res) => {
  const { productname, quantity, price } = req.body;
  try {
    const query = "INSERT INTO grocery (productname, quantity, price) VALUES ($1, $2, $3)";
    const values = [productname, quantity, price];
    const { rows } = await db.query(query, values);
    res.status(201).send({
      message: "Product added successfully!",
      body: {
        product: { productname, quantity, price }
      },
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.getProduct = async (req, res) => {
    try {
      const query = "SELECT * FROM grocery";
      const { rows } = await db.query(query);
      res.status(200).json({
        message: "Products fetched successfully!",
        data: rows 
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message });
    }
  };

exports.selectbyId=async (req, res)=>{
  try{
      const id=req.params.id
      const query="SELECT * FROM grocery WHERE productid>$1"
      const {rows}=await db.query(query,[id]);
      res.status(200).json({
        message: "Products with id fetched successfully!",
        data: rows 
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message });
  }
}
exports.updatebyId=async(req, res)=>{
  try{
    const id=req.params.id;
    const {quantity}=req.body;
    if (quantity === undefined) {
      return res.status(400).json({ message: "Quantity is required" });
    }
    const query="UPDATE grocery set quantity=$1 where productid=$2"
    const {rows}=await db.query(query, [quantity,id ]);
    res.status(200).json({
      message: "Products with id updated successfully!",
      
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
  }
  exports.deletebyId=async (req, res)=>{
    try{
    const id=req.params.id;
    const query ="DELETE FROM grocery where productid=$1"
    const {rows}=await db.query(query, [id]);
    res.status(200).json({
      message: "Products with id deleted successfully!" 
    });
  } catch (err) {
    console.error('Error while deleting  products:', err);
    res.status(500).json({ error: err.message });
  }
  }

