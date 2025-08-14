// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MockWithdraw {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    // anyone can call — funds forwarded to fixed recipient
    function withdraw() public {
        payable(recipient).transfer(address(this).balance);
    }

    // helper to receive funds
    receive() external payable {}
}
