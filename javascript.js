
document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("button");
    let button2 = document.getElementById("delete");
    let button3=document.getElementById('report');
    let initial =document.getElementById('start')
    let current=document.getElementById('current');   
    let flag=1;
    
    initial.addEventListener('input',function(){
    event.preventDefault()
    
    current.textContent=initial.value;
    
    })
    

    button.addEventListener('click', function (event) {
        event.preventDefault();
        
        
        let openTable = document.querySelector('#open-tables tbody');
        let tableInput = document.getElementById("table");
        let disksInput = document.getElementById("disks");
        
        
        let tableName = tableInput.value.trim();
        let disksValue = parseInt(disksInput.value.trim(), 10);
        

        if (!tableName || isNaN(disksValue) || disksValue <= 0) {
            alert("Please enter a valid table name and number of disks!");
            return;
        }
        current.textContent=parseInt(current.textContent)-disksValue;

        let rows = openTable.getElementsByTagName("tr");
        let tableExists = false;

        for (let row of rows) {
            let tableCell = row.cells[0];

            if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()) {
                let disksCell = row.cells[1];
                let currentDisks = parseInt(disksCell.textContent || 0, 10);
                disksCell.textContent = currentDisks + disksValue;
                tableExists = true;
                

                return; // Stop execution after updating existing entry
            }
        }

        if (!tableExists) {
            let newRow = document.createElement('tr');
            let tableCell = document.createElement('td');
            let disksCell = document.createElement('td');
            let actionCell = document.createElement('td');
            let payButton = document.createElement('button');
            let deleteButton=document.createElement('button');
            tableCell.textContent = tableName;
            disksCell.textContent = disksValue;
            payButton.textContent = 'Pay';
            deleteButton.textContent = 'Delete';
            

            deleteButton.addEventListener('click', function() {
                let table = document.querySelector('#open-tables tbody');
                let tableInput = document.getElementById("table");
                let disksInput = document.getElementById("disks")
                
                let tableName = tableInput.value.trim();
                let disksValue = parseInt(disksInput.value.trim(), 10);
                current.textContent=parseInt(current.textContent)+disksValue;

                for (let row of rows) {
                    let tableCell = row.cells[0]; 
                        
                    if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()){
                        let disksCell = row.cells[1];
                        let currentDisks = disksCell.textContent || 0;
                        let updatedDisks=parseFloat(currentDisks) - parseFloat(disksValue);
                        disksCell.textContent = updatedDisks;
                
                        if (disksCell.textContent == 0) {
                            // Remove the row from the open table
                            row.remove();
                        }    
                    }
                                
                }});
                if(current.textContent<='200' &&flag===1){
                    alert('Χρειαζόμαστε Λουλούδια!')
                    flag=0;
                }
                



            // PAY FUNCTION - Adds to payment table but keeps in open-tables
            payButton.addEventListener('click', function () {
                let paymentTable = document.querySelector('#payment-table tbody');

                let paymentRow = document.createElement('tr');
                let paymentTableCell = document.createElement('td');
                let paymentDisksCell = document.createElement('td');
                let amountCell = document.createElement('td');
                let amountInput =document.createElement('input');
                let paymentActionCell = document.createElement('td');
                let undoButton = document.createElement('button');
                let completeButton = document.createElement('button');
                amountInput.type='number';
                paymentTableCell.textContent = tableName;
                paymentDisksCell.textContent = disksInput.value;
                undoButton.textContent = 'Undo Payment';
                completeButton.textContent = 'Complete';

                // UNDO PAYMENT FUNCTION - Removes from payment-table only
                undoButton.addEventListener('click', function () {
                    paymentRow.remove();

                });

                // COMPLETE PAYMENT FUNCTION - Removes from payment-table only
                completeButton.addEventListener('click', function () {
                    // Remove the payment row from the open table
                    paymentRow.remove();
                    
                
                    // Get the paid table's tbody
                    let paymentTable = document.querySelector('#payed-tables tbody');
                
                    // Check if the table already exists in the paid table
                    let tableExists = false;
                    let paymentRows = paymentTable.getElementsByTagName("tr");
                
                    for (let row of paymentRows) {
                        let tableCell = row.cells[0];
                
                        // Check if the table name matches
                        if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()) {
                            let disksCell = row.cells[1];
                            let paymentCell =row.cells[2];
                            let discountCell=row.cells[3];
                            let currentDisks = parseInt(disksCell.textContent || 0, 10);
                            let currentAmount = parseInt(paymentCell.textContent);
                            let currentDiscount =parseInt(discountCell.textContent);
                            disksCell.textContent = currentDisks + parseInt(disksInput.value, 10);
                            paymentCell.textContent=currentAmount+parseInt(amountInput.value);
                            discountCell.textContent=currentDiscount+(parseInt(disksInput.value, 10)*3)-parseInt(amountInput.value);
                            tableExists = true;
                            break; // Exit the loop once the table is found and updated
                        }
                    }
                
                    // If the table does not exist in the paid table, create a new row
                    if (!tableExists) {
                        let paymentRow2 = document.createElement('tr');
                        let paymentTableCell = document.createElement('td');
                        let paymentDisksCell = document.createElement('td');
                        let paymentCell = document.createElement('td');
                        let discountCell = document.createElement('td');

                        paymentTableCell.textContent = tableName;
                        paymentDisksCell.textContent = disksInput.value;
                        paymentCell.textContent=amountInput.value;
                        discountCell.textContent=(disksInput.value*3)-amountInput.value;
                        
                        
                        paymentRow2.appendChild(paymentTableCell);
                        paymentRow2.appendChild(paymentDisksCell);
                        paymentRow2.appendChild(paymentCell);
                        paymentRow2.appendChild(discountCell);
                        paymentTable.appendChild(paymentRow2);
                    }
                
                    // Update the open table (if needed)
                    let openTableRows = openTable.getElementsByTagName("tr");
                    for (let row of openTableRows) {
                        let tableCell = row.cells[0];
                
                        if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()) {
                            let disksCell = row.cells[1];
                            let currentDisks = parseInt(disksCell.textContent || 0, 10);
                            disksCell.textContent = currentDisks - parseInt(disksInput.value, 10);
                            if (disksCell.textContent == 0) {
                                // Remove the row from the open table
                                row.remove();
                            }
                            break; // Exit the loop once the table is found and updated
                        }
                    }
                });

                amountCell.appendChild(amountInput);
                paymentActionCell.appendChild(undoButton);
                paymentActionCell.appendChild(completeButton);
                
                paymentRow.appendChild(paymentTableCell);
                paymentRow.appendChild(paymentDisksCell);
                paymentRow.appendChild(amountCell);
                paymentRow.appendChild(paymentActionCell);
                
                paymentTable.appendChild(paymentRow);
            });


            
            actionCell.appendChild(payButton);
            actionCell.appendChild(deleteButton);
            newRow.appendChild(tableCell);
            newRow.appendChild(disksCell);
            newRow.appendChild(actionCell);
            openTable.appendChild(newRow);
            
            
        }
        
    
        button3.addEventListener('click', function () {
            let paymentTable = document.querySelector('#payed-tables tbody');
            let paymentRows = paymentTable.getElementsByTagName("tr");
        
            let totalDisks = 0;
            let totalPayments = 0;
            let totalDiscount = 0;
        
            // Calculate totals
            for (let row of paymentRows) {
                let disksCell = row.cells[1];
                let paymentCell = row.cells[2];
                let discountCell = row.cells[3];
        
                totalDisks += parseInt(disksCell.textContent || 0, 10);
                totalPayments += parseInt(paymentCell.textContent || 0, 10);
                totalDiscount += parseInt(discountCell.textContent || 0, 10);
            }
        
            // Update the totals table
            document.getElementById('total-disks').textContent = totalDisks;
            document.getElementById('total-payments').textContent = totalPayments;
            document.getElementById('total-discount').textContent = totalDiscount;
            
           
            
        });    
    });
});
    