module.exports = {
  	root: true,
  	parserOptions: {
		"ecmaVersion": 8,
		parser: "babel-eslint"
  	},
  	env: {
		browser: true,
  	},
  	extends: [
	  	"plugin:vue/recommended"
  	],
  	// required to lint *.vue files
  	plugins: [
	  	"vue"
  	],
  	// add your custom rules here
  	rules: {
		// allow async-await
		"generator-star-spacing": "off",
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"arrow-parens": 0,
		"array-bracket-spacing": [ "error", "always" ],
		"brace-style": [ "error", "stroustrup", { "allowSingleLine": true } ],
		"object-curly-spacing": [ "error", "always", { "objectsInObjects": true } ],
		"operator-linebreak": [ "warn", "before", { "overrides": { "+=": "ignore", "=": "ignore", "-=": "ignore" } } ],
		"no-tabs": 0,
		"no-multiple-empty-lines": [ "error", { "max": 2 } ],
		"no-unused-vars": [ "error" ],
		"space-in-parens": [ "error", "always" ],
		"space-before-function-paren": [ "error", { "anonymous": "never", "named": "never", "asyncArrow": "always" } ],
		"indent": [ "error", "tab", { "SwitchCase": 1 } ],
		"camelcase": 0,
		"semi": [ "error", "always" ],
		"padded-blocks": [ "error", "always" ],
		"indent": "off",
		// vue
		"vue/html-indent": [ "error", "tab" ],
		"vue/name-property-casing": [ "error", "kebab-case" ],
		"vue/script-indent": [ "warn", "tab", { "baseIndent": 1 } ]
  	}
}
