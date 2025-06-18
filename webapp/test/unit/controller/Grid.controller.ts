/*global QUnit*/
import Controller from "zsalarypending/controller/Grid.controller";

QUnit.module("ZSALARY Controller");

QUnit.test("I should test the ZSALARY controller", function (assert: Assert) {
	const oAppController = new Controller("ZSALARY");
	oAppController.onInit();
	assert.ok(oAppController);
});