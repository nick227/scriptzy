const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const util = require('util');
const validateSchema = require('./validateSchema');
const schemas = require('./schemas');
const DB_PATH = path.join(__dirname, '../data/');

class DB {
    constructor(dbName) {
        this.validateSchema = validateSchema;
        this.db = new sqlite3.Database(path.join(DB_PATH, `${dbName}.db`));
        this.dbName = dbName;
    }

    async insert(rows) {
        const schema = schemas[this.dbName];
        const isArrayOfStrings = Array.isArray(rows) && rows.every(item => typeof item === 'string');

        const normalizedRows = isArrayOfStrings ? rows.map(str => ({ value: str })) : Array.isArray(rows) ? rows : [rows];

        const insertPromises = normalizedRows.map(row => {
            return new Promise((resolve, reject) => {
                if (!this.validateSchema(row, schema)) {
                    reject(new Error('Invalid schema for one of the rows'));
                }
                const keys = Object.keys(row).join(',');
                const values = Object.values(row).map(value => `'${value}'`).join(',');
                const sql = `INSERT INTO ${this.dbName} (${keys}) VALUES (${values})`;

                this.db.run(sql, function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.lastID);
                });
            });
        });

        const results = await Promise.all(insertPromises);
        return Array.isArray(rows) ? results : results[0];
    }

    async update(query, update) {
        const schema = schemas[this.dbName];
        if (!this.validateSchema(update, schema)) {
            throw new Error('Invalid schema');
        }

        const setClause = Object.keys(update).map(key => `${key}='${update[key]}'`).join(',');
        const whereClause = Object.keys(query).map(key => `${key}='${query[key]}'`).join(' AND ');

        const sql = `UPDATE ${this.dbName} SET ${setClause} WHERE ${whereClause}`;

        return new Promise((resolve, reject) => {
            this.db.run(sql, function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes);
            });
        });
    }

    async find(query) {
        const whereClause = Object.keys(query).map(key => `${key}='${query[key]}'`).join(' AND ');
        const sql = `SELECT * FROM ${this.dbName} WHERE ${whereClause} ORDER BY _id DESC`;

        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    async findOne(query) {
        const whereClause = Object.keys(query).map(key => `${key}='${query[key]}'`).join(' AND ');
        const sql = `SELECT * FROM ${this.dbName} WHERE ${whereClause} LIMIT 1`;

        return new Promise((resolve, reject) => {
            this.db.get(sql, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    async remove(query) {
        const whereClause = Object.keys(query).map(key => `${key}='${query[key]}'`).join(' AND ');
        const sql = `DELETE FROM ${this.dbName} WHERE ${whereClause}`;

        return new Promise((resolve, reject) => {
            this.db.run(sql, function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes);
            });
        });
    }
}

module.exports = DB;
