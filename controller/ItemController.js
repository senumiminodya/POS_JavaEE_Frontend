import ItemModel from "../model/ItemModel.js";
import {items} from "../db/Db.js";

$(document).ready(function () {

    var recordIndex;

    /* Load items to the table */
    function loadTable() {

        $('#item-table-tbody').empty();

        items.map((item, index) => {
            console.log(item)
            let record = `<tr>
                <td class="item_code_value">${item.item_code}</td>
                <td class="item_name_value">${item.item_name}</td>
                <td class="item_price_value">${item.price}</td>
                <td class="item_quantity_value">${item.quantity}</td>
            </tr>`;
            $('#item-table-tbody').append(record);
        });
    }

    // Function to generate the next item ID in the format I-001, I-002, etc.
    function generateNextItemId() {
        if (items.length === 0) {
            return 'I-001';
        }
        const lastItemId = items[items.length - 1].item_code;
        const nextIdNumber = parseInt(lastItemId.split('-')[1]) + 1;
        return `I-${nextIdNumber.toString().padStart(3, '0')}`;
    }

    // Function to validate item fields
    function validateItemFields() {
        var isValid = true;
        $('.error').remove(); // Clear any previous error messages

        if ($('#item_code').val().trim() === '') {
            $('#item_code').after('<span class="error text-danger">Item Code is required</span>');
            isValid = false;
        } else if (!/^I-\d{3}$/.test($('#item_code').val().trim())) {
            $('#item_code').after('<span class="error text-danger">Item Code format is invalid. Expected format: I-001</span>');
            isValid = false;
        }

        if ($('#item_name').val().trim() === '') {
            $('#item_name').after('<span class="error text-danger">Item Name is required</span>');
            isValid = false;
        }

        if ($('#item_price').val().trim() === '') {
            $('#item_price').after('<span class="error text-danger">Item Price is required</span>');
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test($('#item_price').val().trim())) { // Example price validation
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
    // Real-time validation functions for each input field
    function validateItemCode() {
        $('.error-code').remove(); // Clear previous error messages
        if ($('#item_code').val().trim() === '') {
            $('#item_code').after('<span class="error text-danger error-code">Item Code is required</span>');
        }
    }

    function validateItemName() {
        $('.error-name').remove(); // Clear previous error messages
        if ($('#item_name').val().trim() === '') {
            $('#item_name').after('<span class="error text-danger error-name">Item Name is required</span>');
        }
    }

    function validateItemPrice() {
        $('.error-price').remove(); // Clear previous error messages
        const price = $('#item_price').val().trim();
        if (price === '') {
            $('#item_price').after('<span class="error text-danger error-price">Item Price is required</span>');
        } else if (!/^\d+(\.\d{1,2})?$/.test(price)) { // Example price validation
            $('#item_price').after('<span class="error text-danger error-price">Item Price format is invalid</span>');
        }
    }

    function validateItemQuantity() {
        $('.error-quantity').remove(); // Clear previous error messages
        const quantity = $('#item_quantity').val().trim();
        if (quantity === '') {
            $('#item_quantity').after('<span class="error text-danger error-quantity">Quantity is required</span>');
        } else if (!/^\d+$/.test(quantity)) { // Example quantity validation
            $('#item_quantity').after('<span class="error text-danger error-quantity">Quantity format is invalid</span>');
        }
    }

    // Bind the input event to trigger validation in real-time
    $('#item_code').on('input', validateItemCode);
    $('#item_name').on('input', validateItemName);
    $('#item_price').on('input', validateItemPrice);
    $('#item_quantity').on('input', validateItemQuantity);

    /* Search an item from table */
    $('#item-table-tbody').on('click', 'tr', function (){
        let index = $(this).index();
        recordIndex = index;
        console.log("index: ", index);

        let item_code = $(this).find(".item_code_value").text();
        let item_name = $(this).find(".item_name_value").text();
        let item_price = $(this).find(".item_price_value").text();
        let item_quantity = $(this).find(".item_quantity_value").text();

        $("#item_code").val(item_code);
        $("#item_name").val(item_name);
        $("#item_price").val(item_price);
        $("#item_quantity").val(item_quantity);
    });

    /* save item */
    $('#item_save_btn').on('click', () =>{
        let isValid = validateItemFields();
        if (isValid) {
            var item_code = generateNextItemId();
            var item_name = $('#item_name').val();
            var item_price = $('#item_price').val();
            var item_quantity = $('#item_quantity').val();

            var item = new ItemModel(item_code, item_name, item_price, item_quantity);

            items.push(item);
            loadTable();
            clear();
        } else {
            console.log("Invalid fields.");
        }
    });

    /* update item */
    $('#item_update_btn').on('click', () =>{
        var item_code = $('#item_code').val();
        var item_name = $('#item_name').val();
        var item_price = $('#item_price').val();
        var item_quantity = $('#item_quantity').val();

        let itemObject = items[recordIndex];
        itemObject.item_code = item_code;
        itemObject.item_name = item_name;
        itemObject.price = item_price;
        itemObject.quantity = item_quantity;

        loadTable();
        clear();
    });

    /* delete item */
    $("#item_delete_btn").on('click', () => {
        items.splice(recordIndex, 1);
        loadTable();
        clear();
    });

    $('#item_clear_btn').on('click', () =>{
        clear();
    });

    /* clear fields */
    function clear() {
        $('#item_code').val('');
        $('#item_name').val('');
        $('#item_price').val('');
        $('#item_quantity').val('');
    }
});