import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName) {
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {...obj};
    }

    if (obj.operation) {
      if (obj.next) {
        return { ...obj, next: obj.next + buttonName };
      }
      return { ...obj,next: buttonName };
    }
   
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        ...obj,
        next,
        total: null,
      };
    }
    return {
      ...obj,
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        ...obj,
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return {...obj};
  }

  if (buttonName === ".") {
    if (obj.next) {
    
      if (obj.next.includes(".")) {
        return {...obj};
      }
      return { ...obj,next: obj.next + "." };
    }
    return {...obj, next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
    
      return {...obj};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { ...obj,next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj,total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {...obj};
  }

  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  if (!obj.next) {
    return { ...obj,operation: buttonName };
  }

  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}