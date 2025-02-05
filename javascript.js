
document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("button");
    let button2=document.getElementById("delete")
    

    button.addEventListener('click', function(event) {
        event.preventDefault();

        let table = document.querySelector('#open-tables tbody');
        let tableInput = document.getElementById("table");
        let disksInput = document.getElementById("disks");

        let tableName = tableInput.value.trim();
        let disksValue = parseInt(disksInput.value.trim(), 10);

        if (!tableName || isNaN(disksValue) || disksValue <= 0) {
            alert("Please enter a valid table name and number of disks!");
            return;
        }

        let rows = table.getElementsByTagName("tr");
        let tableExists = false;

        for (let row of rows) {
            let tableCell = row.cells[0]; 

            if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()) {
                
                let disksCell = row.cells[1]; 
                let currentDisks = disksCell.textContent || 0;
                console.log(currentDisks);
                let updatedDisks=parseFloat(currentDisks) + parseFloat(disksValue);
                console.log(updatedDisks);
                disksCell.textContent = updatedDisks;
                tableExists = true;
                break;
            }
        }

        if (!tableExists) {
            let newRow = document.createElement('tr');
            let tableCell = document.createElement('td');
            let disksCell = document.createElement('td');
            let actionCell = document.createElement('td');
            let deleteButton = document.createElement('button');
            let payButton = document.createElement('button');

            tableCell.textContent = tableName;
            disksCell.textContent = disksValue;
            deleteButton.textContent = 'Delete';
            payButton.textContent='Pay';

            deleteButton.addEventListener('click', function() {
                let table = document.querySelector('#open-tables tbody');
                let tableInput = document.getElementById("table");
                let disksInput = document.getElementById("disks")

                let tableName = tableInput.value.trim();
                let disksValue = parseInt(disksInput.value.trim(), 10);
                for (let row of rows) {
                    let tableCell = row.cells[0]; 
        
                    if (tableCell && tableCell.textContent.trim().toLowerCase() === tableName.toLowerCase()){
                        let disksCell = row.cells[1];
                        let currentDisks = disksCell.textContent || 0;
                        let updatedDisks=parseFloat(currentDisks) - parseFloat(disksValue);
                        disksCell.textContent = updatedDisks;

                    }
                
        }});

            payButton.addEventListener('click',function(){
                
            })

            actionCell.appendChild(deleteButton);
            actionCell.appendChild(payButton);
            newRow.appendChild(tableCell);
            newRow.appendChild(disksCell);
            newRow.appendChild(actionCell);
            table.appendChild(newRow);
            
        }

        
    });

    button2.addEventListener('click', function() {
        // Clear all rows in the table
        let table = document.querySelector('#open-tables tbody');
        table.innerHTML = '';
    });
});

