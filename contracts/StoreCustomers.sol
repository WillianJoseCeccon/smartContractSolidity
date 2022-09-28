// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract StoreCustomers {
    
    struct Customer {
        string name;
        uint8 age; // uint inteiro, suporta ate o numero 255, para idade mais que suficiente.
    }
    
    uint32 private nextId = 0;
    uint32 public count = 0;

    function getNextId() private returns(uint32){
        return ++nextId;
    }


    mapping(uint32 => Customer ) public customers;

    function addCustomer(Customer memory NewCustomer) public {
        customers[getNextId()] = NewCustomer;
        count++;
    }

    function getCustomer(uint32 id) public view returns(Customer memory){
        return customers[id];
    }

    function compareString(string memory a, string memory b) private pure returns(bool){
        return keccak256(bytes(a)) ==  keccak256(bytes(b));

    }

    function editCustomer(uint32 id, Customer memory newCustomer) public {
        Customer memory oldCustomer = customers[id];
        if(oldCustomer.age == 0) return;
        
        if(newCustomer.age > 0 && oldCustomer.age != newCustomer.age) 
            oldCustomer.age = newCustomer.age;

        if (bytes(newCustomer.name).length > 0 && !compareString(oldCustomer.name, newCustomer.name))
            oldCustomer.name = newCustomer.name;

        customers[id] = oldCustomer;
    } 

    function removeCustomer(uint32 id) public {
        Customer memory oldCustomer = customers[id];
        if(bytes(oldCustomer.name).length != 0){
            delete customers[id];
            count--;

        }
    }

}

