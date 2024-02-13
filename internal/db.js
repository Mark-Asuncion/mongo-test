const { MongoClient, ServerApiVersion, Collection } = require('mongodb');

const Database = function() {
    /** @type {Promise<MongoClient | null>} */
    let _promise_client = null;
    /** @type {MongoClient} */
    let client = null;
    async function _newClient() {
        try {
            return new MongoClient(process.env.MONGODB_URI, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            }).connect()
        }
        catch (e) {
            throw e;
        }
    }
    function _is_ready() {
        if (client === null) {
            throw "Database Connection is not yet established";
        }
    }
    /**
        * @returns {Collection<Document>}
        */
    function _getCollection() {
        try {
            _is_ready();
            const db = client.db("Syllabus");
            const collections = db.collection("Users");
            return collections;
        }
        catch (e) {
            throw e;
        }
    }

    async function query(query,opts = {}) {
        try {
            const collections = _getCollection();
            const cursor = collections.find(query, opts);
            let ret = [];
            for await (const doc of cursor) {
                ret.push(doc);
            }
            return ret;
        }
        catch (e) {
            throw e;
        }
    }

    /**
        * @param {[Object]} docs
        */
    async function insert(docs) {
        try {
            const collections = _getCollection();
            if (docs.length === 0)
                return;
            if (docs.length === 1) {
                return await collections.insertOne(docs[0]);
            }
            else {
                return await collections.insertMany(docs);
            }
        }
        catch (e) {
            throw e;
        }
    }

    function init() {
        try {
            if (client !== null) {
                console.log("Returning existing instance of mongoclient");
                return client;
            }
            else {
                if (_promise_client === null) {
                    _promise_client = _newClient()
                        .then((v) => {
                            client = v;
                        });
                    console.log("Creating new instance of mongoclient");
                }
                return _promise_client;
            }
        }
        catch (e) {
            throw e;
        }
    }
    init();
    return {
        Get: init,
        Query: query,
        Insert: insert,
    };
}
module.exports = Database();
