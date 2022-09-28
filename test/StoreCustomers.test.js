const StoreCustomers = artifacts.require("StoreCustomers");

contract( 'StoreCustomers', function(accounts){
    
    beforeEach(async() => {
        contract = await StoreCustomers.new();
    })

    it('Add Customer', async () => {
        const result = await contract.addCustomer(
            {name: 'Willian',
            age: 35
            }
        );

        const count = await contract.count();
        console.log(result);
        //assert(result.tx, "Transação de adicionar com erro");
        assert(count.toNumber() === 1, "Transação de adicionar com erro");
    })


    it('Get Customer', async () => {
        const result = await contract.addCustomer(
            {name: 'Willian',
            age: 35
            }
        );

        const customer = await contract.getCustomer(1);
        
        //assert(result.tx, "Transação de adicionar com erro");
        assert(customer.name === 'Willian', 'Customer não retornado');
    })

    it('Edit Customer', async () => {
        await contract.addCustomer(
            {name: 'Willian',
            age: 35
            }
        );

        await contract.editCustomer(1, {
            name: "Willian José",
            age: 36
        });
        
        const customer = await contract.getCustomer(1);
        //assert(result.tx, "Transação de adicionar com erro");
        assert(customer.name === "Willian José" && customer.age == 36, 'Customer não retornado');
    })

    it('Remove Customer', async () => {
        const result = await contract.addCustomer(
            {name: 'Willian',
            age: 35
            }
        );

        await contract.removeCustomer(1);
        
        const count = await contract.count();
        
        //assert(result.tx, "Transação de adicionar com erro");
        assert(count.toNumber() === 0, "Custumer não Removido");
    })




})