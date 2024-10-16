import { customers } from "../db/Db.js";
import { items } from "../db/Db.js";
import { orderTm } from "../db/Db.js";
import OrderTmModel from "../model/OrderTmModel.js";

$(document).ready(function () {

    var baseURL = "http://localhost:8080/api/v1/orders";
    var recordIndex;
    var orderDetailsList = [];
    var customerDetailsList = [];

    /* Search customer by ID */
    $('#customer-id').on('input', () => {
        let customer_id = $('#customer-id').val();

        $.ajax({
            url: `http://localhost:8080/api/v1/customers/${customer_id}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    $('#customer-name').val(data.name);
                    $('#phone-no').val(data.phoneNo);

                    // Store the customer details
                    let customerDetails = {
                        id: data.id,
                        nic: data.nic,
                        name: data.name,
                        phoneNo: data.phoneNo
                    };
                    customerDetailsList = [customerDetails]; // Only keep the current customer in the list
                } else {
                    clearCustomerFields();
                }
            },
            error: function () {
                clearCustomerFields();
            }
        });
    });

    /* Search item by ID */
    $('#item-code').on('input', () => {
        let item_code = $('#item-code').val();

        $.ajax({
            url: `http://localhost:8080/api/v1/items/${item_code}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    $('#item-name').val(data.name);
                    $('#price').val(data.price);
                    $('#qty-on-hand').val(data.qty);
                } else {
                    clearItemFields();
                }
            },
            error: function () {
                clearItemFields();
            }
        });
    });

    /* Add items to the table */
    $('#add-item-btn').on('click', () => {
        let itemCode = $('#item-code').val();
        // Check if itemCode is valid
        if (!itemCode || itemCode.trim() === "") {
            alert("Item code is required.");
            return;
        }
        let itemName = $('#item-name').val();
        let price = $('#price').val();
        let orderQty = $('#order-qty').val();

        let total = (+price) * (+orderQty);
        let orderTmObj = new OrderTmModel(itemCode, itemName, price, orderQty, total);
        console.log(orderTmObj);
        orderTm.push(orderTmObj);
        loadTable();
        clearItemFields(); // Clear item fields after adding
    });

    /* Load items into the table */
    function loadTable() {
        $('#order_table_tbody').empty();
        let total = 0;

        orderTm.forEach((item, index) => {
            let record = `
            <tr>
                <td class="itemCode_value">${item.itemCode}</td>
                <td class="itemName_value">${item.itemName}</td>
                <td class="price_value">${item.price}</td>
                <td class="orderQty_value">${item.qty}</td>
                <td class="total_value">${item.total}</td>
            </tr>`;
            $('#order_table_tbody').append(record);
            total += item.total;
        });
        $('#total').val(total);
    }

    /* Remove an item from the table */
    $('#order_table_tbody').on('click', 'tr', function () {
        let index = $(this).index();
        recordIndex = index;
    });

    $('#clear_btn').on('click', () => {
        if (typeof recordIndex !== 'undefined') {
            orderTm.splice(recordIndex, 1);
            loadTable();
            recordIndex = undefined; // Reset recordIndex after removing the item
        }
    });

    /* Purchase button logic */
    $('#purchase-btn').on('click', () => {
        let cash = parseFloat($('#cash').val());
        let total = parseFloat($('#total').val());
        let balance = cash - total;
        $('#balance').val(balance);
        orderDetailsList = [];
        orderDetailsList = getOrderDetails(); // Prepare order details for submission
        console.log(orderDetailsList);
        $.ajax({
            url: `${baseURL}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(orderDetailsList),
            success: function () {
                console.log('Order processed successfully.');
                clearFields();
                refreshItemTable();
            },
            error: function () {
                console.error('Failed to process order.');
            }
        });
    });

    function refreshItemTable() {
        // Assuming you are fetching all items again after order is processed
        $.ajax({
            url: `http://localhost:8080/api/v1/items`,
            type: 'GET',
            dataType: 'json',
            success: function (items) {
                // Clear the existing table body
                $('#item-table-tbody').empty();
                let total = 0;
                items.forEach((item) => {
                    // Append each item to the table
                    let record = `
                <tr>
                    <td class="itemCode_value">${item.code}</td>
                    <td class="itemName_value">${item.name}</td>
                    <td class="price_value">${item.price}</td>
                    <td class="qty_value">${item.qty}</td>
                </tr>`;
                    $('#item-table-tbody').append(record);
                });
            },
            error: function () {
                console.error('Failed to load items.');
            }
        });
    }

    /* Prepare order details for submission */
    function getOrderDetails() {
        let itemsArray = [];

        orderTm.forEach((item) => {
            console.log("getOrderDetails: "+item.itemCode+","+item.itemName+","+item.price+","+item.qty);
            itemsArray.push({
                code: item.itemCode,
                name: item.itemName,
                price: item.price,
                qty: item.qty
            });
        });

        console.log(itemsArray);

        return {
            orderDate: new Date().toISOString().split('T')[0], // Sets the current date as the order date
            total: parseFloat($('#total').val()),
            customer: customerDetailsList.length > 0 ? customerDetailsList[0] : null, // Ensure customer is added
            items: itemsArray // All items with their updated quantities
        };
    }

    /* Clear all fields */
    function clearFields() {
        $('#date').val('');
        $('#customer-id').val('');
        $('#customer-name').val('');
        $('#phone-no').val('');
        $('#cash').val('');
        orderTm.length = 0;
        loadTable(); // Clear the table
    }

    /* Clear customer fields */
    function clearCustomerFields() {
        $('#customer-name').val('');
        $('#phone-no').val('');
    }

    /* Clear item fields */
    function clearItemFields() {
        $('#item-code').val('');
        $('#item-name').val('');
        $('#price').val('');
        $('#order-qty').val('');
        $('#qty-on-hand').val('');
    }

});












