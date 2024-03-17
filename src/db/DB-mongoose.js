const mongoose = require('mongoose');
const schemas = require('./schemas-mongoose');

class DB {
    constructor(dbName, mongoURI = 'mongodb://localhost:27017/') {
        this.dbName = dbName;
        this.connection = mongoose.createConnection(`${mongoURI}${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    
        this.connection.on('connected', () => {
          console.log(`MongoDB connected to ${dbName}`);
        });
    
        this.connection.on('error', (err) => {
          console.log(`MongoDB connection error: ${err}`);
        });
    
        this.Model = this.connection.model(dbName, new mongoose.Schema(schemas[dbName]));
    }

  async insert(rows) {
    const isArrayOfStrings = Array.isArray(rows) && rows.every(item => typeof item === 'string');
    const normalizedRows = isArrayOfStrings ? rows.map(str => ({ value: str })) : Array.isArray(rows) ? rows : [rows];
  
    const results = await Promise.all(normalizedRows.map(row => this.Model.create(row)));
    return Array.isArray(rows) ? results : results[0];
  }
  
  async update(query, update) {
    return await this.Model.updateMany(query, update);
  } 

  async find(query, options = {}) {
    options.sort = { _id: -1 };
    return await this.Model.find(query).sort(options.sort);
  }

  async findOne(query) {
    try {
      return await this.Model.findOne(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(query) {
    try {
      const result = await this.Model.deleteMany(query);
      return result.deletedCount;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = DB;
