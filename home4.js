//1
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  updateInfo(info) {
    Object.keys(info).forEach(key => {
      if (this.hasOwnProperty(key) && Object.getOwnPropertyDescriptor(this, key).writable) {
        Object.defineProperty(this, key, {
          value: info[key],
          writable: false
        });
      }
    });
  }
};

Object.defineProperty(person, "address", {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false
});

console.log(person);

///2
const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5
};

Object.defineProperty(product, "price", {
  enumerable: false,
  writable: false
});
Object.defineProperty(product, "quantity", {
  enumerable: false,
  writable: false
});

const getTotalPrice = (obj) => {
  const { value: price } = Object.getOwnPropertyDescriptor(obj, "price");
  const { value: quantity } = Object.getOwnPropertyDescriptor(obj, "quantity");

  return price * quantity;
};

const deleteNonConfigurable = (obj, propName) => {
  if (obj.hasOwnProperty(propName)) {
    const propDesc = Object.getOwnPropertyDescriptor(obj, propName);
    if (!propDesc.configurable) {
      throw new Error("Property is non-configurable");
    }
    delete obj[propName];
  }
};

console.log(getTotalPrice(product));
deleteNonConfigurable(product, "quantity");
console.log(product);



//3
const bankAccount = {
  _balance: 1000,
  get formattedBalance() {
    return `$${this._balance}`;
  },
  set balance(newBalance) {
    this._balance = newBalance;
  },
  transfer(targetAccount, amount) {
    if (this._balance >= amount) {
      this._balance -= amount;
      targetAccount._balance += amount;
    } else {
      throw new Error("Insufficient funds");
    }
  },
};

console.log(bankAccount.formattedBalance);
bankAccount.balance = 2000;
console.log(bankAccount.formattedBalance);

const targetAccount = {
  _balance: 0,
  get formattedBalance() {
    return `$${this._balance}`;
  },
};

bankAccount.transfer(targetAccount, 500);
console.log(bankAccount.formattedBalance);
console.log(targetAccount.formattedBalance);

//4
function createImmutableObject(obj) {
  const newObj = {};

  for (let prop in obj) {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      newObj[prop] = createImmutableObject(obj[prop]);
    } else {
      Object.defineProperty(newObj, prop, {
        value: obj[prop],
        writable: false
      });
    }
  }

  return newObj;
}

const immutablePerson = createImmutableObject(person);
person.age = 1;

console.log(immutablePerson);


//5
function observeObject(obj, callback) {
	return new Proxy(obj, {
		get(target, prop, receiver) {
			callback(prop, "get");
			return Reflect.get(target, prop, receiver);
		},
		set(target, prop, value, receiver) {
			callback(prop, "set");
			return Reflect.set(target, prop, value, receiver);
		}
	});
}

const callback = (prop, action) => {
	console.log(`Property: ${prop} , Action: ${action}`);
};

const proxyPerson = observeObject(person, callback);
proxyPerson.firstName;
proxyPerson.age = 31;



//6
const deepCloneObject = (obj, cloned = new WeakMap()) => {
	if (typeof obj !== "object" || obj === null) {
		return obj;
	}

	if (cloned.has(obj)) {
		return cloned.get(obj);
	}

	let clone;

	if (Array.isArray(obj)) {
		clone = [];
		cloned.set(obj, clone);
		obj.forEach((item, index) => {
			clone[index] = deepCloneObject(item, cloned);
		});
	} else {
		clone = {};
		cloned.set(obj, clone);
		for (let key in obj) {
			clone[key] = deepCloneObject(obj[key], cloned);
		}
	}

	return clone;
};

const clonedPerson = deepCloneObject(person);

console.log(clonedPerson);
console.log(clonedPerson === person);


//7
const validateObject = (obj, schema) => {
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      const schemaValue = schema[key];
      const objValue = obj[key];

      if (typeof objValue !== schemaValue.type) {
        return false;
      }

      if (schemaValue.validate && !schemaValue.validate(objValue)) {
        return false;
      }
    }
  }

  return true;
};

const schema = {
  firstName: "string",
  lastName: "string",
  age: "number",
  email: "string"
};

console.log(validateObject(person, schema));
