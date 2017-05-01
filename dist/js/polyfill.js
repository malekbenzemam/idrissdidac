// ECMA-262, Edition 5, 15.4.4.18
// Référence: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback /*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this vaut null ou n est pas défini');
    }

    // 1. Soit O le résultat de l'appel à ToObject
    //    auquel on a passé |this| en argument.
    var O = Object(this);

    // 2. Soit lenValue le résultat de l'appel de la méthode 
    //    interne Get sur O avec l'argument "length".
    // 3. Soit len la valeur ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Si IsCallable(callback) est false, on lève une TypeError.
    // Voir : http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' n est pas une fonction');
    }

    // 5. Si thisArg a été fourni, soit T ce thisArg ;
    //    sinon soit T égal à undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Soit k égal à 0
    k = 0;

    // 7. On répète tant que k < len
    while (k < len) {

      var kValue;

      // a. Soit Pk égal ToString(k).
      //   (implicite pour l'opérande gauche de in)
      // b. Soit kPresent le résultat de l'appel de la 
      //    méthode interne HasProperty de O avec l'argument Pk.
      //    Cette étape peut être combinée avec c
      // c. Si kPresent vaut true, alors
      if (k in O) {

        // i. Soit kValue le résultat de l'appel de la 
        //    méthode interne Get de O avec l'argument Pk.
        kValue = O[k];

        // ii. On appelle la méthode interne Call de callback 
        //     avec T comme valeur this et la liste des arguments
        //     qui contient kValue, k, et O.
        callback.call(T, kValue, k, O);
      }
      // d. On augmente k de 1.
      k++;
    }
    // 8. on renvoie undefined
  };
}
// Production steps / ECMA-262, Edition 5, 15.4.4.19
// Référence : https://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback /*, thisArg*/) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this est null ou non défini');
    }

    // 1. Soit O le résultat de l'appel ToObject avec |this| 
    //    comme argument.
    var O = Object(this);

    // 2. Soit lenValue le résultat de l'appel de la méthode interne
    //    Get de O avec l'argument "length".
    // 3. Soit len égal à ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Si IsCallable(callback) vaut false, on renvoie une TypeError
    // Voir : https://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' n est pas une fonction');
    }

    // 5. Si thisArg a été utilisé, on définit T avec thisArg
    //    sinon T vaudra undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Soit A un nouveau tableau créé tel
    //    qu'avec l'expression new Array(len) 
    //    où Array est le constructeur natif standard
    A = new Array(len);

    // 7. Soit k égal à 0
    k = 0;

    // 8. On répète tant que k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Soit Pk égal à ToString(k).
      //    (implicite pour l'opérande gauche de in)
      // b. Soit kPresent le résultat de l'appel à la méthode
      //    interne de O HasProperty appelée avec l'argument 
      //     Pk.
      //    Cette étape peut être combinée avec c
      // c. Si kPresent vaut true, alors
      if (k in O) {

        // i. Soit kValue le résultat de l'appel de la méthode
        //    interne Get de O avec l'argument Pk.
        kValue = O[k];

        // ii. Soit mappedValue le résultat de l'appel de la 
        //     méthode interne Call de callback avec T comme première
        //     valeur et la liste des arguments kValue, k, et O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. On appelle la méthode intnerne DefineOwnProperty de A
        // avec les arguments Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // et false.

        // Pour les navigateurs qui supportent Object.defineProperty
        // on pourra utiliser :
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // Pour un meilleur suppport, on utilisera :
        A[k] = mappedValue;
      }
      // d. On augmente k de 1.
      k++;
    }

    // 9. On renvoie A
    return A;
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // Steps 3, 4, 5, 6, 7      
      var k = 0;
      var value;

      if (arguments.length == 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }

        // 3. If len is 0 and initialValue is not present, throw 
        // a TypeError exception.
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i. Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(callbackfn, undefined, 
        //        « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}


if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    
    // NOTE : fix to avoid very long loop on negative length value
    
    if (len > t.length || typeof fun != 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];

        // NOTE: Techniquement on devrait utiliser Object.defineProperty
        //       pour le prochain index car push peut être affecté
        //       par les propriétés d'Object.prototype et d'Array.prototype.
        //       Cependant cette méthode est récente et les cas de collisions
        //       devraient rester rares : on préfère donc l'alternative la plus
        //       compatible.
        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}

