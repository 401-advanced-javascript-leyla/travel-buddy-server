'use strict';

class DataModel {
  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */
  constructor(schema){
    this.schema = schema;
  }

  /**
   * Get data with or without id
   * @param _id {string}
   * @returns {object}
   */

  get(id) {
    let query = id ? { _id: id } : {};  
    return this.schema.find(query);
  }

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */

  post(record) {
    console.log(record);
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  
  /**
   * Update a data that has the given id with the given record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */

  put(id,record) {
    const filter = { _id: id };
    const update = record;

    return this.schema.findOneAndUpdate(filter, update);
  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */

  delete(id) {
    const filter = { _id: id };

    return this.schema.findOneAndDelete(filter);
  }

}

module.exports = DataModel;