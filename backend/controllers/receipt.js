const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Function to generate PDF receipt
const generateReceipt = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const pdfPath = `./receipts/receipt-${order._id}.pdf`; // Adjust path as per your project structure

      doc.pipe(fs.createWriteStream(pdfPath));

      // Receipt header
      doc.fontSize(25).text('Transaction Receipt', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`Order ID: ${order._id}`, { align: 'left' });
      doc.text(`Buyer: ${order.buyer.name}`, { align: 'left' });
      doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, { align: 'left' });
      
      // Adding purchased products to receipt
      doc.moveDown();
      doc.fontSize(18).text('Items Purchased:', { align: 'left' });
      order.products.forEach((product, index) => {
        doc.text(`${index + 1}. ${product.name} - ${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`, { align: 'left' });
      });

      // Payment details
      doc.moveDown();
      doc.fontSize(18).text('Payment Details:', { align: 'left' });
      doc.text(`Transaction ID: ${order.payment.transaction.id}`, { align: 'left' });
      doc.text(`Amount: ${order.payment.transaction.amount} ${order.payment.transaction.currencyIsoCode}`, { align: 'left' });
      doc.text(`Payment Status: ${order.payment.transaction.processorResponseText}`, { align: 'left' });

      doc.end();

      resolve(pdfPath);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to send email with PDF receipt attachment
const sendReceiptEmail = async (req, res) => {
  try {
    // Fetch order details from your API
    const orderId = req.body; // Assuming you can get the orderId from request params
    const order = await fetchOrderDetails(orderId); // Implement this function to fetch order details

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // Generate PDF receipt
    const pdfPath = await generateReceipt(order);

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email with attachment
    const mailOptions = {
      from: process.env.EMAIL,
      to: order.buyer.email, // Assuming buyer's email is available in order details
      subject: 'Your Transaction Receipt',
      text: 'Please find attached your transaction receipt.',
      attachments: [
        {
          filename: `receipt-${order._id}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send email.' });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Receipt sent successfully.' });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to generate or send receipt.' });
  }
};

// Function to fetch order details from API (mock implementation)
const fetchOrderDetails = async (orderId) => {
  try {
    // Replace with your actual API call to fetch order details
    const response = await fetch(`http://localhost:8080/api/auth/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details.');
    }
    const order = await response.json();
    return order;
  } catch (error) {
    console.error('Error fetching order details:', error.message);
    return null;
  }
};

module.exports = {
  sendReceiptEmail,
};
