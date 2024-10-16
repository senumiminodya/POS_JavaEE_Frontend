import {items} from "../db/Db.js";

$(document).ready(function () {
    var baseURL = "http://localhost:8080/api/v1/items";

    var recordIndex;

    var itemCode;

    /* Load items to the table */
    function loadTable() {

        $('#item-table-tbody').empty();

        console.log(items);
        items.forEach((item) => {
            const record = `<tr>
                <td class="item_code_value">${item.code}</td>
                <td class="item_name_value">${item.name}</td>
                <td class="item_price_value">${item.price}</td>
                <td class="item_quantity_value">${item.qty}</td>
            </tr>`;
            $('#item-table-tbody').append(record);
        });
    }

    function fetchItems() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Items retrieved successfully:', data);
                items.length = 0;
                items.push(...data);
                loadTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch items:', status, error);
            }
        });
    }

    // Function to validate item fields
    function validateItemFields() {
        let isValid = true;
        $('.error').remove();

        if ($('#item_name').val().trim() === '') {
            $('#item_name').after('<span class="error text-danger">Item Name is required</span>');
            isValid = false;
        }

        if ($('#item_price').val().trim() === '') {
            $('#item_price').after('<span class="error text-danger">Item Price is required</span>');
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test($('#item_price').val().trim())) {
            $('#item_price').after('<span class="error text-danger">Item Price format is invalid</span>');
            isValid = false;
        }

        if ($('#item_quantity').val().trim() === '') {
            $('#item_quantity').after('<span class="error text-danger">Quantity is required</span>');
            isValid = false;
        } else if (!/^\d+$/.test($('#item_quantity').val().trim())) { // Example quantity validation
            $('#item_quantity').after('<span class="error text-danger">Quantity format is invalid</span>');
            isValid = false;
        }

        return isValid;
    }

    function validateItemName() {
        $('.error-name').remove();
        if ($('#item_name').val().trim() === '') {
            $('#item_name').after('<span class="error text-danger error-name">Item Name is required</span>');
        }
    }

    function validateItemPrice() {
        $('.error-price').remove();
        const price = $('#item_price').val().trim();
        if (price === '') {
            $('#item_price').after('<span class="error text-danger error-price">Item Price is required</span>');
        } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            $('#item_price').after('<span class="error text-danger error-price">Item Price format is invalid</span>');
        }
    }

    function validateItemQuantity() {
        $('.error-quantity').remove();
        const quantity = $('#item_quantity').val().trim();
        if (quantity === '') {
            $('#item_quantity').after('<span class="error text-danger error-quantity">Quantity is required</span>');
        } else if (!/^\d+$/.test(quantity)) {
            $('#item_quantity').after('<span class="error text-danger error-quantity">Quantity format is invalid</span>');
        }
    }

    // Bind the input event to trigger validation in real-time
    $('#item_name').on('input', validateItemName);
    $('#item_price').on('input', validateItemPrice);
    $('#item_quantity').on('input', validateItemQuantity);

    /* Search an item from table */
    $('#item-table-tbody').on('click', 'tr', function (){
        recordIndex = $(this).index();
        console.log("index: ", recordIndex);

        itemCode = $(this).find(".item_code_value").text();
        let item_name = $(this).find(".item_name_value").text();
        let item_price = $(this).find(".item_price_value").text();
        let item_quantity = $(this).find(".item_quantity_value").text();

        //$("#item_code").val(item_code);
        $("#item_name").val(item_name);
        $("#item_price").val(item_price);
        $("#item_quantity").val(item_quantity);
    });

    /* save item */
    $('#item_save_btn').on('click', () =>{
        if (validateItemFields()) {
            const item = {
                name: $('#item_name').val().trim(),
                price: $('#item_price').val().trim(),
                qty: $('#item_quantity').val().trim()
            };

            $.ajax({
                url: baseURL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(item),
                success: function (data) {
                    console.log('Item created successfully:', data);
                    fetchItems();
                    clearForm();
                },
                error: function (xhr, status, error) {
                    console.error('Failed to save item:', status, error);
                }
            });
        } else {
            console.log("Invalid fields.");
        }
    });

    /* update item */
    $('#item_update_btn').on('click', () =>{
        if (validateItemFields()) {
            const item_Code = itemCode;
            const updatedItem = {
                code: item_Code,
                name: $('#item_name').val().trim(),
                price: $('#item_price').val().trim(),
                qty: $('#item_quantity').val().trim()
            };

            $.ajax({
                url: `${baseURL}/${itemCode}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedItem),
                success: function (data) {
                    console.log('Item updated successfully:', data);
                    fetchItems();
                    clearForm();
                },
                error: function (xhr, status, error) {
                    console.error('Failed to update item:', status, error);
                }
            });
        }
    });

    /* delete item */
    $("#item_delete_btn").on('click', () => {
        const item_Code = itemCode;

        if (item_Code) {
            $.ajax({
                url: `${baseURL}/${itemCode}`,
                type: 'DELETE',
                success: function (data) {
                    console.log('Item deleted successfully:', data);
                    fetchItems();
                    clearForm();
                },
                error: function (xhr, status, error) {
                    console.error('Failed to delete item:', status, error);
                }
            });
        } else {
            console.error("Item Code is required to delete an item.");
        }
    });

    $('#item_clear_btn').on('click', () =>{
        clearForm();
    });

    /* clear fields */
    function clearForm() {
        //$('#item_code').val('');
        $('#item_name').val('');
        $('#item_price').val('');
        $('#item_quantity').val('');
    }

    /* Load All Items */
    $('#item_getAll_btn').on('click', ()=>{
        console.log(items);
    });
    fetchItems();
});