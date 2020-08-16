const db = require('../../database/dbConfig');

// General Model Helpers
class Model {
    constructor(tableName){
        this.tableName = tableName;
    };

    insert(newItem) {
        return db(this.tableName)
            .insert(newItem)
            .then((ids) => {
                const [id] = ids;
                return this.findById(id)
            });
    };

    find() {
        return db(this.tableName).select("*");
    };
    
    findBy(filter) {
        return db(this.tableName).where(filter);
    }

    findById(id) {
        return db(this.tableName).where("id", id).select("*").first();
    };

    updateById(id, changes) {
        return db(this.tableName)
        .where("id", id)
        .update(changes)
        .then((changesMade) => {
            if (changesMade > 0) {
              return this.findById(id);
            } else {
              return null;
            }
        });
    };
    removeById(id) {
        return db(this.tableName)
        .where("id", id)
        .del();
    };
}

// Class objects for the tables to be used in the router

const Department = new Model("departments");
const Inventory = new Model("inventory");
const Users = new Model("users");
// reservations may need some special home
const Reservations = new Model("reservations")
const ResInvConnect = new Model("reservations_inventory")

module.exports = {
    Department,
    Inventory,
    Users,
    Reservations,
    ResInvConnect
}