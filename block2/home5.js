class HashTable{
    constructor(){
        this.store = [];
    }

    /**
     * Calculates the hash value for the given data.
     *
     * @param {string} [data='']
     * @return {string}
     */
    getHash(data = '') {
        let hash = data.split('').reduce((acc, curr) => {
            return acc + BigInt(curr.charCodeAt(0)) * 8n;
        }, 0n);
    
        hash ^= hash << 16n;
        const mask = (1n << 512n) - 1n;
        hash &= mask;
        return hash.toString(16).padStart(8, 0);
    }

    /**
     * Inserts a key-value pair into the data store.
     * 
     * @param {string} key 
     * @param {any} value 
     */
    insert(key, value){
        const hashedKey = this.getHash(key);
        this.store[hashedKey] = value;
    }

    /**
     * Retrieves the value associated with the specified key.
     * 
     * @param {string} key 
     * @return {any} 
     */
    get(key){
        const hashedKey = this.getHash(key);
        return this.store[hashedKey];
    }

    /**
     * Removes an element from the store using the specified key.
     *
     * @param {string} key 
     */
    remove(key){
        const hashedKey = this.getHash(key);
        delete this.store[hashedKey];
    }
    
}


const hash = new HashTable();

hash.insert('test 1', 'data 1');
hash.insert('test 2', 'data 2');
hash.insert('test 3', 'data 3');

console.log(`test 1 - ${hash.get('test 1')}`);
console.log(`test 2 - ${hash.get('test 2')}`);
console.log(`test 3 - ${hash.get('test 3')}`);

hash.remove('test 2');

console.log(`test 1 - ${hash.get('test 1')}`);
console.log(`test 2 - ${hash.get('test 2')}`);
console.log(`test 3 - ${hash.get('test 3')}`);

console.log(`Get hash ${hash.getHash('test hash func')}`);