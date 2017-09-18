/* eslint-disable */

module.exports = {
	"parserOptions": {
		"ecmaVersion": 2017,
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},

	"env": {
		"es6": true,
		"node": true
	},

	"globals": {
		"document": false,
		"navigator": false,
		"window": false,
		"BEM": false,
		"BEMHTML": false,
		"Lego": false,
		"describe": false,
		"xdescribe": false,
		"ddescribe": false,
		"before": false,
		"after": false,
		"beforeEach": false,
		"afterEach": false,
		"it": false,
		"xit": false,
		"iit": false,
		"jasmine": false,
		"expect": false,
		"spyOn": false,
		"sinon": false,
		"modules": true,
		"casper": true,
		"YaMoney": true,
		"ym": true,
		"xscript": true,
		"getCookie": true,
		"applyCtx": true,
		"block": true,
		"blocks": true,
		"js": true,
		"content": true,
		"mix": true,
		"match": true,
		"tag": true,
		"def": true,
		"elem": true,
		"wrap": true,
		"mod": true,
		"elemMod": true,
		"attrs": true,
		"replace": true,
		"apply": true,
		"mode": true,
		"applyNext": true
	},

	"plugins": [
		"react"
	],

	"rules": {

		/**
		 Создание сеттера без геттера выдаст ошибку, наоборот допустимо

		 Correct
		 var o = {
			set a(value) {
				this.val = value;
			},
			get a() {
				return this.val;
			}
		 };

		 Incorrect
		 var o = {
			set a(value) {
			this.val = value;
			}
		 };
		 */
		"accessor-pairs": 2,

		/**
		 Скобочки вокруг аргументов стрелочной функции требуются во всех случаях

		 Correct
		 () => {};
		 (a) => {};
		 (a) => a;
		 (a) => {'\n'}
		 a.then((foo) => {});
		 a.then((foo) => { if (true) {} });

		 Incorrect
		 a => {};
		 a => a;
		 a => {'\n'};
		 a.then(foo => {});
		 a.then(foo => a);
		 a(foo => { if (true) {} });
		 */
		"arrow-parens": 2,
		"no-process-env": 2,
		"no-process-exit": 2,
		"no-lonely-if": 2,
		"no-negated-condition": 2,

		// todo: прикркутить правило, чтобы для объектов с количеством св-тв больше 3
		// todo: работало правило  object-property-newline
		"object-property-newline": 0,
		"strict": 0,
		"dot-notation": [2, { "allowPattern": "^[a-z]+(_[A-Za-z]+)+$" }],
		"object-curly-spacing": [2, "never"],
		"no-restricted-modules": [2, "utils"],
		"guard-for-in": 2,
		"array-bracket-spacing": [2, "never"],

		/**
		 Пробелы в начале и конце блока

		 Correct
		 function foo() { return true; }
		 if (foo) { bar = 0; }

		 Incorrect
		 function foo() {return true; }
		 if (foo) {bar = 0;}
		 */
		"block-spacing": [2, "always"],

		/**
		 Объявление переменных в месте их инициализации
		 Correct
		 function doIf() {
			var build;

			if (true) {
				build = true;
			}

			console.log(build);
		 }

		 Inorrect
		 function doIf() {
			if (true) {
				var build = true;
			}

			console.log(build);
		 }
		 */
		"block-scoped-var": 2,
		"brace-style": [2, "1tbs", { "allowSingleLine": true }],
		"camelcase": [2, { "properties": "always" }],
		"comma-dangle": [2, "never"],
		"comma-spacing": [2, { "before": false, "after": true }],
		"comma-style": [2, "last"],
		"computed-property-spacing": [2, "never"],

		"curly": [2, "all"],
		"complexity": [1, { "max": 20 }],
		"dot-location": [2, "property"],

		/**
		 Обязательное использование default в конструкции switch/case
		 если значение по умолчанию отсутствует оставлять комментарий  // no default
		 Correct
		 switch (a) {
			case 1:
				// code
				break;

			default:
				// code
				break;
		 }


		 switch (a) {
			case 1:
				// code
				break;

			// no default
		 }

		 Inorrect
		 switch (a) {
			case 1:
				// code
				break;
		 }
		 */
		"default-case": 2,
		"eol-last": 2,
		"eqeqeq": 2,

		/**
		 Обязательная обработка ошибок при наличии в аргументах функции err или Error

		 Correct
		 requestHandler (err, req) {
			if (err) {
				doSomthing();
			}
		 }

		 Incorrect
		 requestHandler (err, req) {
			doSomthing();
		 }
		 */
		"handle-callback-err": [2, "^(err|error)$" ],
		"indent": [2, "tab", { "SwitchCase": 1 }],
		"key-spacing": [2, { "beforeColon": false, "afterColon": true }],
		"keyword-spacing": [2, { "before": true, "after": true }],
		"max-len": [2, 120, 4, {"ignoreUrls": true}],
		"new-cap": [2, { "newIsCap": true, "capIsNew": true, "capIsNewExceptions": ['I18N', 'Deferred'] }],

		/**
		 Ограничение уровней вложености до 4.

		 Correct
		 function foo() {
			for (;;) { // Nested 1 deep
				let val = () => (param) => { // Nested 2 deep
				   if (true) { // Nested 3 deep
						if (true) { // Nested 4 deep
						}
					}
				};
			}
		 }

		 Incorrect
		 function foo() {
			for (;;) { // Nested 1 deep
				let val = () => (param) => { // Nested 2 deep
					if (true) { // Nested 3 deep
						if (true) { // Nested 4 deep
							if (true) { // Nested 5 deep
								if (true) { // Nested 6 deep
								}
							}
						}
					}
				};
			}
		 }
		 */
		"max-depth": [2, 5],
		"new-parens": 2,

		/**
		 Обязуем цепочки вызовов больше 2 писать с новой строки.

		 Correct
		 _.chain({})
		 .map(foo)
		 .filter(bar);

		 // Or
		 obj
		 .prop
		 .method().prop;

		 // Or
		 obj
		 .prop.method()
		 .method2()
		 .method3().prop;

		 Incorrect
		 _.chain({}).map(foo).filter(bar).value();

		 // Or
		 _.chain({}).map(foo).filter(bar);

		 // Or
		 _
		 .chain({}).map(foo)
		 .filter(bar);

		 // Or
		 obj.method().method2().method3();
		 }
		 */
		"newline-per-chained-call": [2, { "ignoreChainWithDepth": 3 }],

		/**
		 Запрещаем использовать alert/confirm/prompt
		 Incorrect
		 alert("here!");

		 confirm("Are you sure?");

		 prompt("What's your name?", "John Doe");
		 */
		"no-alert": 2,
		"no-array-constructor": 2,

		/**
		 Запрещаем использование arguments.callee

		 Incorrect
		 function foo(n) {
			if (n <= 0) {
				return;
			}

			arguments.callee(n - 1);
		 }
		 */
		"no-caller": 2,
		"no-cond-assign": 2,

		/**
		 Запрещаем конструкции которые будут выполняться всегда/никогда вне зависимости от условия

		 Incorrect
		 if (false) {
			doSomethingUnfinished();
		 }

		 for (;-2;) {
			doSomethingForever();
		 }

		 while (typeof x) {
			doSomethingForever();
		 }
		 do{
			doSomethingForever();
		 } while (x = -1);

		 var result = 0 ? a : b;
		 */
		"no-constant-condition": 2,

		/**
		 Запрещаем пустые конструкции

		 Incorrect
		 if (foo) {
		 }

		 while (foo) {
		 }

		 switch(foo) {
		 }
		 */
		"no-empty": 2,
		"no-control-regex": 2,

		/**
		 Запрещаем конструкцию debugger

		 Incorrect
		 function isTruthy(x) {
			debugger;
			return Boolean(x);
		}
		 */
		"no-debugger": 2,

		/**
		 Запрещаем удалять переменные

		 Incorrect
		 var x;
		 delete x;
		 */
		"no-delete-var": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty-character-class": 2,
		"no-extra-semi": 2,
		"no-empty-pattern": 2,

		/**
		 Запрещаем создание пустых функций без комментов
		 Correct
		 function foo() {
			// do nothing.
		 }

		 var foo = function() {
			// any clear comments.
		 };

		 var foo = () => {
			bar();
		 };

		 Incorrect
		 function foo() {}

		 var foo = function() {};

		 var foo = () => {};
		 */
		"no-empty-function": 2,
		"no-eval": 2,
		"no-ex-assign": 2,

		/**
		 Запрещаем расширять нативные конструкции

		 Incorrect
		 Object.prototype.a = "a";
		 Object.defineProperty(Array.prototype, "times", { value: 999 });
		 */
		"no-extend-native": 2,
		"no-extra-bind": 2,
		"no-extra-boolean-cast": 2,
		"no-extra-parens": [2, "functions"],

		/**
		 Запрещаем писать конструкцию switch/case без break

		 Incorrect
		 switch(foo) {
			case 1:
				doSomething();

			case 2:
				doSomething();
		 }
		 */
		"no-fallthrough": 2,

		/**
		 Запрещаем писать float number без числа до/после точки

		 Correct
		 var num = 0.5;
		 var num = 2.0;
		 var num = -0.7;

		 Incorrect
		 var num = .5;
		 var num = 2.;
		 var num = -.7;
		 */
		"no-floating-decimal": 2,
		"no-func-assign": 2,

		/**
		 Запрещаем eval подобные конструкции

		 Incorrect
		 setTimeout("alert('Hi!');", 100);
		 setInterval("alert('Hi!');", 100);
		 execScript("alert('Hi!')");
		 window.setTimeout("count = 5", 10);
		 window.setInterval("foo = bar", 10);
		 */
		"no-implied-eval": 2,
		"no-inner-declarations": [2, "functions"],
		"no-invalid-regexp": 2,
		"no-irregular-whitespace": 2,
		"no-label-var": 2,
		"no-labels": [2, { "allowLoop": false, "allowSwitch": false }],
		"no-lone-blocks": 2,
		"no-mixed-spaces-and-tabs": 2,
		"no-multi-spaces": 2,
		"no-multi-str": 2,

		/**
		 Запрещаем использовать больше max пустых строк подряд

		 Incorrect
		 setTimeout("alert('Hi!');", 100);
		 \n
		 \n
		 setInterval("alert('Hi!');", 100);
		 */
		"no-multiple-empty-lines": [2, { "max": 2 }],
		"no-native-reassign": 2,

		/**
		 Запрещаем вложенные тернарки.

		 Correct
		 var thing = foo ? bar : foobar;

		 Incorrect
		 var thing = foo ? bar : baz === qux ? quxx : foobar;
		 foo ? baz === qux ? quxx() : foobar() : bar();
		 }
		 */
		"no-nested-ternary": 2,
		"no-negated-in-lhs": 2,

		/**
		 Запрещаем использовать new без присваения переменной

		 Correct
		 var thing = new Thing();
		 Thing();

		 Incorrect
		 new Thing();
		 */
		"no-new": 2,
		"no-new-func": 2,
		"no-new-object": 2,
		"no-new-require": 2,
		"no-new-wrappers": 2,
		"no-obj-calls": 2,
		"no-octal": 2,
		"no-octal-escape": 2,

		"no-proto": 2,
		"no-redeclare": 2,
		"no-regex-spaces": 2,
		"no-return-assign": [2, "except-parens"],
		"no-self-assign": 2,
		"no-self-compare": 2,
		"no-sequences": 2,
		"no-shadow-restricted-names": 2,

		/**
		 Запрещаем пробел между названием функциии и круглыми скобочками при вызове

		 Correct
		 fn()

		 Incorrect
		 fn ()
		 */
		"no-spaced-func": 2,
		"no-sparse-arrays": 2,

		/**
		 Запрещаем использовать литералы в конструкции throw

		 Correct
		 throw new Error();
		 throw new Error("error");
		 var e = new Error("error");
		 throw e;

		 Incorrect
		 throw "error";
		 throw 0;
		 throw undefined;
		 throw null;
		 var err = new Error();
		 throw "an " + err;
		 */
		"no-throw-literal": 2,
		"no-trailing-spaces": 2,
		"no-undef": 2,
		"no-undef-init": 2,

		/**
		 Запрещаем прямые операции с типом undefined

		 Correct
		 var foo = void 0;

		 var Undefined = "foo";

		 if (typeof foo === "undefined") {
			// ...
		 }

		 global.undefined = "foo";

		 Incorrect
		 var foo = undefined;

		 var undefined = "foo";

		 if (foo === undefined) {
			// ...
		 }

		 function foo(undefined) {
			// ...
		 }
		 */
		"no-undefined": 0,
		"no-unexpected-multiline": 2,
		"no-unmodified-loop-condition": 2,
		"no-unneeded-ternary": [2, { "defaultAssignment": false }],
		"no-unreachable": 2,
		"no-unsafe-finally": 2,
		"no-unused-vars": [2, { "vars": "all", "args": "after-used" }],
		"no-useless-call": 2,
		"no-useless-escape": 2,

		/**
		 Запрещаем использовать в комментах слова-метки

		 Incorrect
		 // fixme: здесь адский говнокод для отладки
		 function foo(bar) {
			bar = 13;
		 }
		 */
		"no-warning-comments": [2, { "terms": ["fixme"], "location": "anywhere" }],
		"no-whitespace-before-property": 2,
		"no-with": 2,
		"one-var": [2, { "initialized": "never" }],
		"operator-linebreak": [2, "before", { "overrides": { "=": "after" } }],

		/**
		 Запрещаем отступы внутри блока

		 Correct
		 if (a) {
			b();
		 }

		 Incorrect
		 if (a) {
		 \n
		 	b();
		 \n
		 }
		 */
		"padded-blocks": [2, "never"],

		/**
		 Использования двойных/одинарных кавычек
		 */
		"quotes": [2, "single", { "allowTemplateLiterals": true }],

		/**
		 Обязуем писать jsDoc для функциий, методов и классов
		 */
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": true,
				"ClassDeclaration": true
			}
		}],
		"semi": [2, "always"],
		"semi-spacing": [2, { "before": false, "after": true }],
		"space-before-blocks": [2, "always"],

		/**
		 Использование пробела при обьявлении функции

		 Correct
		 function foo() {
			// ...
		 }

		 Incorrect
		 function foo () {
			// ...
		 }
		 */
		"space-before-function-paren": [2, "never"],
		"space-in-parens": [2, "never"],
		"space-infix-ops": 2,
		"space-unary-ops": [2, { "words": true, "nonwords": false }],
		"spaced-comment": [2, "always", { "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!", ","] }],
		"use-isnan": 2,

		/**
		 Проверка jsdoc
		 */
		"valid-jsdoc": [2, { "requireReturn": false, "requireReturnDescription": false }],
		"valid-typeof": 2,
		"wrap-iife": [2, "any"],

		/**
		 Использование пробелов в конструкции yield *

		 Correct
		 yield* other();

		 Incorrect
		 yield *other();
		 */
		"yoda": [2, "never"],


		// eslint es6
		/**
		 Запрещаем переопределять параметры функции
		 Correct
		 function foo(bar) {
			var baz = bar;
		 }

		 Incorrect
		 function foo(bar) {
			bar = 13;
		 }

		 function foo(bar) {
			bar++;
		 }
		 */
		"no-param-reassign": 0,
		"no-var": 1,
		"arrow-spacing": ["error", { "before": true, "after": true }],
		"yield-star-spacing": [0, "after"],
		"template-curly-spacing": [0, "never"],
		/**
		 Запрещаем пробел между оператором spread(es6) и переменной

		 Correct
		 fn(...args)
		 [...arr, 4, 5, 6]
		 let [a, b, ...arr] = [1, 2, 3, 4, 5];
		 function fn(...args) { console.log(args); }
		 let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
		 let n = { x, y, ...z };

		 Incorrect
		 fn(... args)
		 [... arr, 4, 5, 6]
		 let [a, b, ... arr] = [1, 2, 3, 4, 5];
		 function fn(... args) { console.log(args); }
		 let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
		 let n = { x, y, ... z };
		 */
		"rest-spread-spacing": [2, "never"],
		"require-yield": 0,

		/**
		 Обязуем использовать const если переменная не изменялась

		 Correct
		 const a = 0;

		 let a;
		 a = 0;
		 a = 1;
		 console.log(a);

		 Incorrect
		 let a = 3;
		 console.log(a);

		 let a;
		 a = 0;
		 console.log(a);
		 */
		"prefer-const": 2,

		/**
		 Обязуем использовать шаблонные строки вместо конкатенации

		 Correct
		 var str = "Hello World!";
		 var str = `Hello, ${name}!`;
		 var str = `Time: ${12 * 60 * 60 * 1000}`;

		 Incorrect
		 var str = "Hello, " + name + "!";
		 var str = "Time: " + (12 * 60 * 60 * 1000);
		 */
		"prefer-template": 2,

		/**
		 Запись методов в сокращенном синтаксисе

		 Correct
		 var foo = {
			w() {},
			*x() {},
			[y]() {},
			z
		 };

		 Incorrect
		 var foo = {
			w: function() {},
			x: function *() {},
			[y]: function() {},
			z: z
		 };
		 */
		"object-shorthand": 2,
		"no-useless-computed-key": 2,
		"no-useless-constructor": 2,
		"no-new-symbol": 0,
		"no-duplicate-imports": 2,
		"no-dupe-class-members": 0,
		"no-const-assign": 2,
		"no-class-assign": 2,
		/**
		 Пробелы при обьявлении функции-генератора

		 Correct
		 function* generator() {}

		 Incorrect
		 function*generator() {}
		 function * generator() {}
		 */
		"generator-star-spacing": [2, { "before": false, "after": true }],
		/**
		 Обязательный вызов метода super() при наследовании

		 Correct
		 class A extends B {
			constructor() {
				super();
			}
		 }

		 Incorrect
		 class A extends B {
			constructor() { }  // Would throw a ReferenceError.
		 }
		 */
		"constructor-super": 2,

		// Prevent React to be incorrectly marked as unused
		"react/jsx-uses-vars": [2],
		// Prevent variables used in JSX to be incorrectly marked as unused
		"react/react-in-jsx-scope": 1
	}
};
