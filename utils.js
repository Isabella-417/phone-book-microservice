const generateId = (maxNumber, minNumber) => {
  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
};

const validateParams = (personObject, list) => {
  const logs = { errors: [] };

  if (!personObject.number) {
    logs.errors.push("number is required");
  }

  if (!personObject.name) {
    logs.errors.push("name is required");
  } else {
    let repeatedNumber = list.find(
      (person) => person.name === personObject.name
    );
    if (repeatedNumber) {
      logs.errors.push("name must be unique");
    }
  }

  return logs;
};

module.exports = { generateId, validateParams };
