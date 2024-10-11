import {customers} from "../db/Db.js";

$(document).ready(function () {

    var baseURL = "http://localhost:8080/api/v1/customers";

    var recordIndex;

    var cusId;

    /* Load customers to the table */
    function loadTable() {

        $('#customer-table-tbody').empty();

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
    $('#cus_nic').on('input', validateCustomerNic);
    $('#cus_name').on('input', validateCustomerName);
    $('#cus_phoneNo').on('input', validateCustomerPhoneNo);

    /* Search a customer from table */
    $('#customer-table-tbody').on('click', 'tr', function (){
        let index = $(this).index();
        recordIndex = index;
        console.log("index: ", index);

        cusId = $(this).find(".customer_id_value").text();
        let cus_nic = $(this).find(".customer_nic_value").text();
        let cus_name = $(this).find(".customer_name_value").text();
        let cus_phoneNo = $(this).find(".customer_phoneNo_value").text();

        //$("#cus_id").val(cus_id);
        $("#cus_nic").val(cus_nic);
        $("#cus_name").val(cus_name);
        $("#cus_phoneNo").val(cus_phoneNo);
    });

    $('#cus_save_btn').on('click', () => {
        let isValid = validateCustomerFields();

        if (isValid) {
            fetchCustomers();

            const customer = {
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

    $('#cus_update_btn').on('click', () => {
        var customerId = cusId;
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

    $('#cus_delete_btn').on('click', () => {
        var customerId = cusId;

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
        //$('#cus_id').val('');
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

