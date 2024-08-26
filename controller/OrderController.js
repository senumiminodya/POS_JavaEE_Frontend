import {customers} from "../db/Db.js";
import {items} from "../db/Db.js";
import {orderTm} from "../db/Db.js";
import OrderTmModel from "../model/OrderTmModel.js";

var recordIndex;

initialize();
function initialize() {
    $('#order-id').val(1);
}

/* search customer by id */
$('#customer-id').on('input', () => {
    console.log("entered");
    let customer_id = $('#customer-id').val();
    let customerFound = false; // Flag to track if customer is found

    for (let i = 0; i < customers.length; i++) {
        if (customers[i].c_id === customer_id) {
            var cus_name = customers[i].name;
            var cus_phoneNo = customers[i].phoneNo;
            $('#customer-name').val(cus_name);
            $('#phone-no').val(cus_phoneNo);
            customerFound = true; // Set flag to true since customer is found
            break; // Exit the loop since customer is found
        }
    }

    if (!customerFound) {
        $('#customer-name').val('');
        $('#phone-no').val('');
    }
});

/* search item by id */
$('#item-code').on('input', ()=>{
    console.log("entered");
    let item_code = $('#item-code').val();
    let itemFound = false;

    for (let i = 0; i < items.length; i++) {
        if (items[i].item_code===item_code) {
            var item_name = items[i].item_name;
            var price = items[i].price;
            var quantity = items[i].quantity;
            $('#item-code').val(item_code);
            $('#item-name').val(item_name);
            $('#price').val(price);
            $('#qty-on-hand').val(quantity);
            itemFound = true;
            break;
        }
    }
    if (!itemFound) {
        $('#item-name').val('');
        $('#price').val('');
        $('#qty-on-hand').val('');
    }
});

/* Load items to the table */

function loadTable() {
    $('#order_table_tbody').empty();
    let total = 0;
    orderTm.map((item, index) => {
        console.log(item)
        let record = `<tr>
                <td class="itemCode_value">${item.itemCode}</td>
                <td class="itemName_value">${item.item_name}</td>
                <td class="price_value">${item.price}</td>
                <td class="orderQty_value">${item.qty}</td>
                <td class="total_value">${item.total}</td>
            </tr>`;
        $('#order_table_tbody').append(record);
        total += item.total;
    });
    $('#total').val(total);
}
$('#add-item-btn').on('click', () => {

    let itemCode = $('#item-code').val(); // Get the value of item code input field
    let itemName = $('#item-name').val(); // Get the value of item name input field
    let price = $('#price').val(); // Get the value of price input field
    let orderQty = $('#order-qty').val(); // Get the value of order quantity input field
    // Calculate total
    let total = (+price)*(+orderQty);

    var orderTmObj = new OrderTmModel(itemCode, itemName, price, orderQty, total);
    orderTm.push(orderTmObj);

    // Create a new table row with the item details
    loadTable();
    $('#item-code').val('');
    $('#item-name').val('');
    $('#price').val('');
    $('#order-qty').val('');
    $('#qty-on-hand').val('');
});

/* remove an item from the table */
$('#order_table_tbody').on('click', 'tr', function (){
    let index = $(this).index();
    recordIndex = index;
    console.log("index: ", index);
});

$('#clear_btn').on('click', () => {
    if (typeof recordIndex !== 'undefined') {
        orderTm.splice(recordIndex, 1);
        loadTable();
        recordIndex = undefined; // Reset recordIndex after removing the item
    }
});

$('#purchase-btn').on('click', ()=>{
    var cash = $('#cash').val();
    var total = $('#total').val();
    var balance = cash-total;
    $('#balance').val(balance);
    var orderId = parseInt($('#order-id').val());
    clearFields();
    let nextOrderId = +orderId +1;
    $('#order-id').val(nextOrderId);
});
/*$('#purchase-btn').on('click', () => {
    var cash = parseFloat($('#cash').val());
    var total = parseFloat($('#total').val());
    var balance = cash - total;
    $('#balance').val(balance);
    var orderId = parseInt($('#order-id').val());
    clearFields();
    let nextOrderId = orderId + 1;
    $('#order-id').val(nextOrderId);

});*/

// get quantity and id from orderTmModel array
function getFromOrderTm() {
    for (let i = 0; i < orderTm.length; i++) {
        let itemCode = orderTm[i].itemCode;
        var quantityTm = orderTm[i].qty;

        for (let j = 0; j < items.length; j++) {
            if (items[j].item_code===itemCode) {
                items[j].quantity -= quantityTm;
                break;
            }
        }
    }
}

function clearFields() {
    $('#order-id').val('');
    $('#date').val('');
    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#phone-no').val('');
    $('#cash').val('');
    orderTm.length = 0;
    loadTable();
}








