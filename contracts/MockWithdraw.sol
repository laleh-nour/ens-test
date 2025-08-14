// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockWithdraw {
    address payable public daoWallet;

    constructor(address payable _daoWallet) {
        daoWallet = _daoWallet;
    }

    // این تابع عمداً public است مثل چیزی که گزارش دادی
    function withdraw() public {
        daoWallet.transfer(address(this).balance);
    }

    // برای تست: واریز به قرارداد
    receive() external payable {}
}
