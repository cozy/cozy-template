BIN = ./node_modules/.bin

LINT_RULES = --indent 2 --maxlen 80 --nomen --sloppy --unparam
lint:
	find server -name "*.js" -print0 | xargs -0 node $(BIN)/jslint $(LINT_RULES) --node --predef emit --predef sum
	find client/app -name "*.js" -print0 | xargs -0 node $(BIN)/jslint $(LINT_RULES) --browser --predef $$ --predef Backbone --predef _

test:
	@$(BIN)/mocha ./tests --report spec --require should --colors