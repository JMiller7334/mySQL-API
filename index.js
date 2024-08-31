/**API NOTES:
 * Dependencies: 
 * ----------------------------------------------------
 * Express - for api building.
 * Sequelize: ORM to simplify database interactions.
 * Nodemon: auto restarts server during development.
 * ----------------------------------------------------
 */

// index.js
const express = require('express');

// modules:
const sequelize = require('./config/index');
const Customer = require('./models/Customer');
const UsageData = require('./models/UsageData');
const { json } = require('sequelize');

const PORT = 8080;
const app = express();
app.use(express.json());

//CUSTOMER ROUTES:
app.get('/customers', async (req, res) => {
    const { id } = req.query;

    //case: id provided
    if (id) {
        try {
        const customer = await Customer.findByPk(id);
        console.log(`Received request for customer ID: ${id}`);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
        
    //case: no id provided
    } else {
        const customers = await Customer.findAll();
        res.json(customers);
    }
});


//CREATE:
app.post('/customers', async (req, res) => {
  const newCustomer = await Customer.create(req.body);
  res.status(201).json(newCustomer);
});


//UPDATE:
app.put('/customers', async (req, res) => {
    const { id } = req.query;
  
    //check ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }
    try {
      const [updated] = await Customer.update(req.body, {
        where: { id: id },
      });
  
      //check if any rows were updated
      if (updated) {
        const updatedCustomer = await Customer.findByPk(id);
        if (updatedCustomer) {
          return res.json(updatedCustomer);
        } else {
          return res.status(404).json({ error: 'Customer not found' });
        }
      } else {
        return res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
//DELETE:
app.delete('/customers', async (req, res) => {
    const { id } = req.query;

    //check id is provided
    if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }
    try {
        const deleted = await Customer.destroy({
            where: { id: id },
        });
        if (deleted) {
            res.status(204).end(); //succes: no return content
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


//USAGE DATA ROUTES:
app.get('/usage', async (req, res) => {
    const { customerId } = req.query;
  
    if (customerId) {
      try {
        const usageData = await UsageData.findAll({ where: { customerId } });
        if (usageData.length > 0) {
          res.json(usageData);
        } else {
          res.status(404).json({ error: 'No usage data found for the provided customer ID' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      try {
        const allUsageData = await UsageData.findAll();
        res.json(allUsageData);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    }
});
  
  
//CREATE:
app.post('/usage', async (req, res) => {
    try {
      const newUsage = await UsageData.create(req.body);
      res.status(201).json(newUsage);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});
  

//UPDATE:
app.put('/usage', async (req, res) => {
  const { id } = req.query;
    try {

      //update usage data
      const [updated] = await UsageData.update(req.body, {
        where: { id: id },
      });
  
      if (updated) {
        //fetch updated record
        const updatedUsage = await UsageData.findByPk(id);
        res.json(updatedUsage);
      } else {
        res.status(404).json({ error: 'Usage data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});
  
//DELETE:
app.delete('/usage', async (req, res) => {
  const { id } = req.query;
    try {
      //delete the usage data
      const deleted = await UsageData.destroy({
        where: { id: id },
      });
  
      if (deleted) {
        res.status(204).end();  //mo content to send back - success
      } else {
        res.status(404).json({ error: 'Usage data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});
  

// Sync with Database and Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});
