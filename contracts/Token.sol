pragma solidity >= 0.8.0;
import 'hardhat/console.sol';
contract Token {
    string public name = 'Hardhat';
    address public owner;
    uint public totalSupply = 1000000;
    string public symbol = 'MHT';
    mapping(address => uint) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;


    }

    function transferToken(address _to, uint _amount) external{
        console.log('Sender balance is %s tokens', balances[msg.sender]);
        console.log('Trying to send %s tokens to %s', _amount, _to);
        require(balances[msg.sender] >= _amount, "Not enough balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address _account) external view returns (uint){
        return balances[_account];
    }

}
