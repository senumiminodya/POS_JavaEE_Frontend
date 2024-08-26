import CustomerModel from "../model/CustomerModel.js";
import {customers} from "../db/Db.js";

$(document).ready(function () {

    var baseURL = "http://localhost:8080/javaEE/customer";

    var recordIndex;

    generateNextCustomerId();

    // Function to generate the next customer ID in the format C-001
    function generateNextCustomerId() {
        if (customers.length === 0) {
            return 'C-001';
        }else {
            const lastCustomerId = customers[customers.length - 1].c_id;
            if (!lastCustomerId) {
                return 'C-001'; // If the lastCustomerId is undefined or empty, again start with C-001
            }
            const nextIdNumber = parseInt(lastCustomerId.split('-')[1]) + 1;
            return `C-${nextIdNumber.toString().padStart(3, '0')}`;
        }
    }

    /* Load customers to the table */
    function loadTable() {

        $('#customer-table-tbody').empty();

        /*customers.map((item, index) => {
            console.log(item)
            let record = `<tr>
                <td class="customer_id_value">${item.c_id}</td>
                <td class="customer_nic_value">${item.nic}</td>
                <td class="customer_name_value">${item.name}</td>
                <td class="customer_phoneNo_value">${item.phoneNo}</td>
            </tr>`;
            $('#customer-table-tbody').append(record);
        });*/
        console.log(customers);
        customers.forEach((item) => {
            let record = `<tr>
                <td class="customer_id_value">${item.id}</td>
                <td class="customer_nic_value">${item.nic}</td>
                <td class="customer_name_value">${item.name}</td>
                <td class="customer_phoneNo_value">${item.phoneNo}</td>
            </tr>`;
            $('#customer-table-tbody').append(record);
        });
    }

    function fetchCustomers() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Customers retrieved successfully:', data);
                customers.length = 0; // Clear existing customers
                customers.push(...data); // Add fetched customers
                loadTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch customers:', status, error);
            }
        });
    }

    // Function to validate customer fields
    function validateCustomerFields() {
        var isValid = true;
        $('.error').remove(); // Clear any previous error messages

        if ($('#cus_id').val().trim() === '') {
            $('#cus_id').after('<span class="error text-danger" >Customer ID is required</span>');
            isValid = false;
        } else if (!/^(C-\d{3})$/.test($('#cus_id').val().trim())) {
            $('#cus_id').after('<span class="error text-danger">Customer ID format is invalid. Expected format: C-001</span>');
            isValid = false;
        }

        if ($('#cus_nic').val().trim() === '') {
            $('#cus_nic').after('<span class="error text-danger">NIC is required</span>');
            isValid = false;
        } else if (!/^\d{9}[Vv]$|^\d{12}$/.test($('#cus_nic').val().trim())) { // Example NIC validation
            $('#cus_nic').after('<span class="error text-danger">NIC format is invalid</span>');
            isValid = false;
        }

        if ($('#cus_name').val().trim() === '') {
            $('#cus_name').after('<span class="error text-danger">Name is required</span>');
            isValid = false;
        }

        if ($('#cus_phoneNo').val().trim() === '') {
            $('#cus_phoneNo').after('<span class="error text-danger">Phone Number is required</span>');
            isValid = false;
        } else if (!/^\d{10}$/.test($('#cus_phoneNo').val().trim())) { // Example phone number validation
            $('#cus_phoneNo').after('<span class="error text-danger">Phone Number format is invalid</span>');
            isValid = false;
        }

        return isValid;
    }

    // Real-time validation functions for each input field
    function validateCustomerId() {
        $('.error-id').remove(); // Clear previous error messages
        if ($('#cus_id').val().trim() === '') {
            $('#cus_id').after('<span class="error text-danger error-id">Customer ID is required</span>');
        } else if (!/^(C-\d{3})$/.test($('#cus_id').val().trim())) {
            $('#cus_id').after('<span class="error text-danger error-id">Customer ID format is invalid. Expected format: C-001</span>');
        }
    }

    function validateCustomerNic() {
        $('.error-nic').remove(); // Clear previous error messages
        const nic = $('#cus_nic').val().trim();
        if (nic === '') {
            $('#cus_nic').after('<span class="error text-danger error-nic">NIC is required</span>');
        } else if (!/^\d{9}[Vv]$|^\d{12}$/.test(nic)) {
            $('#cus_nic').after('<span class="error text-danger error-nic">NIC format is invalid</span>');
        }
    }

    function validateCustomerName() {
        $('.error-name').remove(); // Clear previous error messages
        if ($('#cus_name').val().trim() === '') {
            $('#cus_name').after('<span class="error text-danger error-name">Name is required</span>');
        }
    }

    function validateCustomerPhoneNo() {
        $('.error-phoneNo').remove(); // Clear previous error messages
        const phoneNo = $('#cus_phoneNo').val().trim();
        if (phoneNo === '') {
            $('#cus_phoneNo').after('<span class="error text-danger error-phoneNo">Phone Number is required</span>');
        } else if (!/^\d{10}$/.test(phoneNo)) {
            $('#cus_phoneNo').after('<span class="error text-danger error-phoneNo">Phone Number format is invalid</span>');
        }
    }

    // Bind the input event to trigger validation in real-time
    $('#cus_id').on('input', validateCustomerId);
    $('#cus_nic').on('input', validateCustomerNic);
    $('#cus_name').on('input', validateCustomerName);
    $('#cus_phoneNo').on('input', validateCustomerPhoneNo);

    /* Search a customer from table */
    $('#customer-table-tbody').on('click', 'tr', function (){
        let index = $(this).index();
        recordIndex = index;
        console.log("index: ", index);

        let cus_id = $(this).find(".customer_id_value").text();
        let cus_nic = $(this).find(".customer_nic_value").text();
        let cus_name = $(this).find(".customer_name_value").text();
        let cus_phoneNo = $(this).find(".customer_phoneNo_value").text();

        $("#cus_id").val(cus_id);
        $("#cus_nic").val(cus_nic);
        $("#cus_name").val(cus_name);
        $("#cus_phoneNo").val(cus_phoneNo);
    });

    /* save customer */
    /*$('#cus_save_btn').on('click', () =>{
        let isvalid =  validateCustomerFields();
        if(isvalid) {
            var cus_id = generateNextCustomerId();
            var cus_nic = $('#cus_nic').val();
            var cus_name = $('#cus_name').val();
            var cus_phoneNo = $('#cus_phoneNo').val();

            var customer = new CustomerModel(cus_id, cus_nic, cus_name, cus_phoneNo);

            customers.push(customer);
            loadTable();
            clear();
        } else {
            console.log("invalid fields.")
        }

    });*/



    $('#cus_save_btn').on('click', () => {
        let isValid = validateCustomerFields();

        if (isValid) {
            const newCustomerId = generateNextCustomerId();
            const customer = {
                id: newCustomerId,
                nic: $('#cus_nic').val(),
                name: $('#cus_name').val(),
                phoneNo: $('#cus_phoneNo').val()
            };

            $.ajax({
                url: baseURL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(customer),
                success: function (data) {
                    console.log('Customer created successfully:', data);
                    fetchCustomers();
                    clear();
                },
                error: function (xhr, status, error) {
                    console.error('Failed to save customer:', status, error);
                }
            });
        } else {
            console.log("Invalid fields.");
        }
    });

    /* update customer */
    /*$('#cus_update_btn').on('click', () =>{
        var cus_id = $('#cus_id').val();
        var cus_nic = $('#cus_nic').val();
        var cus_name = $('#cus_name').val();
        var cus_phoneNo = $('#cus_phoneNo').val();

        let customerObject = customers[recordIndex];
        customerObject.c_id = cus_id;
        customerObject.nic = cus_nic;
        customerObject.name = cus_name;
        customerObject.phoneNo = cus_phoneNo;

        loadTable();
        clear();
    });*/
    $('#cus_update_btn').on('click', () => {
        var customerId = $('#cus_id').val();
        var customer = {
            id: customerId,
            nic: $('#cus_nic').val(),
            name: $('#cus_name').val(),
            phoneNo: $('#cus_phoneNo').val()
        };

        $.ajax({
            url: baseURL + '/' + customerId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(customer),
            success: function (data) {
                console.log('Customer updated successfully:', data);
                fetchCustomers();
                clear();
            },
            error: function (xhr, status, error) {
                console.error('Failed to update customer:', status, error);
            }
        });

    });

    /* delete customer */
    /*$("#cus_delete_btn").on('click', () => {
        customers.splice(recordIndex, 1);
        loadTable();
        clear();
    });*/
    $('#cus_delete_btn').on('click', () => {
        var customerId = $('#cus_id').val();

        $.ajax({
            url: baseURL + '/' + customerId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (data) {
                console.log('Customer deleted successfully:', data);
                fetchCustomers();
                clear();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete customer:', status, error);
            }
        });
    });

    $('#cus_clear_btn').on('click', () =>{
        clear();
    });

    /* clear fields */
    function clear() {
        $('#cus_id').val('');
        $('#cus_nic').val('');
        $('#cus_name').val('');
        $('#cus_phoneNo').val('');
        $('.error').remove();
    }

    /* Load All Customers */
    $('#cus_getAll_btn').on('click', ()=>{
        console.log(customers);
    });
    fetchCustomers();

});

