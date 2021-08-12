const TodoList = artifacts.require("TodoList.sol");


module.exports = function(deployer, network, accounts) {
  deployer.deploy(TodoList, {from: accounts[0]});
 };