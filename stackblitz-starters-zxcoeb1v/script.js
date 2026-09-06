// =========================================
// DOSA FRESH INVOICE GENERATOR
// =========================================


// =========================================
// CUSTOMER
// =========================================

const customerName =
  document.getElementById("customerName");

const customerDisplay =
  document.getElementById("customerDisplay");

customerName.addEventListener("input", () => {
  customerDisplay.textContent =
    customerName.value;
});


// =========================================
// CUSTOMER ADDRESS
// =========================================

const customerAddress =
  document.getElementById("customerAddress");

const customerAddressDisplay =
  document.getElementById("customerAddressDisplay");

customerAddress.addEventListener("input", () => {
  customerAddressDisplay.textContent =
    customerAddress.value;
});


// =========================================
// INVOICE NUMBER
// =========================================

const invoiceNumber =
  document.getElementById("invoiceNumber");

const invoiceNumberDisplay =
  document.getElementById("invoiceNumberDisplay");

invoiceNumber.addEventListener("input", () => {
  invoiceNumberDisplay.textContent =
    invoiceNumber.value;
});


// =========================================
// INVOICE DATE
// =========================================

const invoiceDate =
  document.getElementById("invoiceDate");

const invoiceDateDisplay =
  document.getElementById("invoiceDateDisplay");

invoiceDate.addEventListener("input", () => {

  if (invoiceDate.value) {

    const parts =
      invoiceDate.value.split("-");

    invoiceDateDisplay.textContent =
      parts[2] +
      "/" +
      parts[1] +
      "/" +
      parts[0];

  }

});


// =========================================
// PRODUCT
// =========================================

const productName =
  document.getElementById("productName");

const productDisplay =
  document.getElementById("productDisplay");

productName.addEventListener("input", () => {

  productDisplay.textContent =
    productName.value;

});


// =========================================
// QUANTITY
// =========================================

const quantity =
  document.getElementById("quantity");

const quantityDisplay =
  document.getElementById("quantityDisplay");


// =========================================
// UNIT
// =========================================

const unit =
  document.getElementById("unit");


// =========================================
// PRICE
// =========================================

const unitPrice =
  document.getElementById("unitPrice");

const priceDisplay =
  document.getElementById("priceDisplay");


// =========================================
// VAT
// =========================================

const vatRate =
  document.getElementById("vatRate");


// =========================================
// TOTALS
// =========================================

const productTotal =
  document.getElementById("productTotal");

const subtotal =
  document.getElementById("subtotal");

const vatAmount =
  document.getElementById("vatAmount");

const grandTotal =
  document.getElementById("grandTotal");


// =========================================
// CALCULATE INVOICE
// =========================================

function calculateInvoice() {

  const qty =
    Number(quantity.value) || 0;

  const price =
    Number(unitPrice.value) || 0;

  const vat =
    Number(vatRate.value) || 0;


  const subtotalValue =
    qty * price;


  const vatValue =
    subtotalValue * (vat / 100);


  const totalValue =
    subtotalValue + vatValue;


  quantityDisplay.textContent =
    qty + " " + unit.value;


  priceDisplay.textContent =
    price.toFixed(2) + " PLN";


  productTotal.textContent =
    subtotalValue.toFixed(2) + " PLN";


  subtotal.textContent =
    subtotalValue.toFixed(2) + " PLN";


  vatAmount.textContent =
    vatValue.toFixed(2) + " PLN";


  grandTotal.textContent =
    totalValue.toFixed(2) + " PLN";

}


// =========================================
// WATCH FOR CHANGES
// =========================================

quantity.addEventListener(
  "input",
  calculateInvoice
);

unit.addEventListener(
  "input",
  calculateInvoice
);

unitPrice.addEventListener(
  "input",
  calculateInvoice
);

vatRate.addEventListener(
  "input",
  calculateInvoice
);


// =========================================
// PAYMENT TERMS
// =========================================

const paymentTerms =
  document.getElementById("paymentTerms");

const paymentDisplay =
  document.getElementById("paymentDisplay");

paymentTerms.addEventListener("input", () => {

  paymentDisplay.textContent =
    paymentTerms.value;

});


// =========================================
// NOTES
// =========================================

const notes =
  document.getElementById("notes");

const notesDisplay =
  document.getElementById("notesDisplay");

notes.addEventListener("input", () => {

  notesDisplay.textContent =
    notes.value;

});


// =========================================
// PRINT / SAVE PDF
// =========================================

const printButton =
  document.getElementById("printButton");


printButton.addEventListener("click", async () => {

  // Open print window immediately
  // so the browser does not block the popup.

  const printWindow =
    window.open("", "_blank");


  if (!printWindow) {

    alert(
      "Please allow pop-ups for StackBlitz."
    );

    return;

  }


  // Show temporary message

  printWindow.document.write(`
    <!DOCTYPE html>

    <html>

    <head>

      <title>Dosa Fresh Invoice</title>

    </head>

    <body>

      <p style="
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 100px;
      ">
        Preparing invoice for printing...
      </p>

    </body>

    </html>
  `);

  printWindow.document.close();


  try {

    // =====================================
    // GET THE ACTUAL CSS FILE
    // =====================================

    const cssURL =
      new URL(
        "styles.css",
        document.baseURI
      ).href;


    const cssResponse =
      await fetch(cssURL);


    if (!cssResponse.ok) {

      throw new Error(
        "Could not load styles.css"
      );

    }


    const css =
      await cssResponse.text();


    // =====================================
    // GET CURRENT INVOICE
    // =====================================

    const invoice =
      document.getElementById("invoice");


    // =====================================
    // CREATE FULL PRINT DOCUMENT
    // =====================================

    printWindow.document.open();


    printWindow.document.write(`

      <!DOCTYPE html>

      <html lang="en">

      <head>

        <meta charset="UTF-8">

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        >

        <title>Dosa Fresh Invoice</title>


        <style>

          ${css}


          /* =================================
             PRINT WINDOW OVERRIDES
          ================================= */

          html,
          body {

            margin: 0 !important;

            padding: 0 !important;

            background: #ffffff !important;

          }


          body {

            font-family:
              Arial,
              Helvetica,
              sans-serif;

          }


          .invoice {

            width: 100% !important;

            max-width: 900px !important;

            min-height: auto !important;

            margin: 0 auto !important;

            padding: 40px !important;

            background: #ffffff !important;

            border: 1px solid #e1e5e2 !important;

            box-shadow: none !important;

          }


          .company-header {

            display: flex !important;

            justify-content: space-between !important;

            align-items: flex-start !important;

            padding-bottom: 28px !important;

            border-bottom: 2px solid #075b2a !important;

          }


          .company-brand {

            display: flex !important;

          }


          .dosa-logo {

            width: 250px !important;

            height: auto !important;

            display: block !important;

          }


          .invoice-title {

            display: block !important;

            text-align: right !important;

          }


          .invoice-title h1 {

            color: #1f2933 !important;

            font-size: 38px !important;

          }


          .sample-warning {

            color: #b42318 !important;

          }


          .invoice-info {

            display: grid !important;

            grid-template-columns: 1fr 1fr !important;

            border: 1px solid #dfe7e1 !important;

          }


          .items table {

            width: 100% !important;

            border-collapse: collapse !important;

          }


          .items th {

            background: #075b2a !important;

            color: #ffffff !important;

            padding: 13px !important;

          }


          .items td {

            padding: 15px 13px !important;

            border-bottom: 1px solid #dfe5e1 !important;

          }


          .totals {

            width: 320px !important;

            margin-left: auto !important;

          }


          .totals .grand-total {

            border-top: 2px solid #075b2a !important;

            color: #075b2a !important;

          }


          .totals .grand-total strong {

            color: #075b2a !important;

          }


          .invoice-footer {

            border-top: 1px solid #dfe5e1 !important;

          }


          .invoice-footer strong {

            color: #075b2a !important;

          }


          .invoice-footnote {

            border-top: 1px solid #e1e5e2 !important;

          }


          /* Hide the editor */

          .page-header,
          .form-section,
          .preview-label {

            display: none !important;

          }


          .app {

            display: block !important;

            max-width: none !important;

            margin: 0 !important;

          }


          .preview-section {

            width: 100% !important;

          }


          @page {

            size: A4;

            margin: 12mm;

          }


          @media print {

            body {

              background: white !important;

            }


            .invoice {

              box-shadow: none !important;

            }

          }

        </style>

      </head>


      <body>


        ${invoice.outerHTML}


      </body>

      </html>

    `);


    printWindow.document.close();


    // =====================================
    // WAIT FOR RENDER
    // =====================================

    setTimeout(() => {

      printWindow.focus();

      printWindow.print();

    }, 800);


  } catch (error) {

    printWindow.close();

    alert(
      "There was a problem preparing the PDF. Please try again."
    );

    console.error(error);

  }

});


// =========================================
// INITIAL CALCULATION
// =========================================

calculateInvoice();