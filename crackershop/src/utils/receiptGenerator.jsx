import { jsPDF } from 'jspdf';

// Generate PDF and return both download and base64 for email
export const generateReceipt = (orderData) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const itemsPerPage = 15;
  const totalPages = Math.ceil(orderData.items.length / itemsPerPage);

  // Get discount percentage as decimal (convert from percentage if needed)
  const discountPercentage = orderData.totals.discountPercentage > 1 
    ? orderData.totals.discountPercentage / 100 
    : orderData.totals.discountPercentage;

  const addCommonElements = (pageNumber) => {
    doc.setLineWidth(5);
    doc.roundedRect(5, 5, 200, 287, 3, 3);

    // Header
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.setFont(undefined, 'bold');
    doc.text('Kavitha Crackers ', 105, 30, null, null, 'center');

    // Contact Info
    doc.setFontSize(12);
    doc.setTextColor(20, 184, 166);
    doc.text('Sivakasi - 626123', 105, 40, null, null, 'center');
    doc.text('Phone: +91 8903623517 | Email: seshakavitha30@gmail.com', 105, 46, null, null, 'center');
    
    // Divider
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.line(30, 55, 180, 55);
    
    if (pageNumber === 1) {
      // Order Header
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text('ORDER RECEIPT', 105, 65, null, null, 'center');

      // Order Info
      doc.setFontSize(10);
      doc.setTextColor(16, 185, 129);
      doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 180, 75, null, null, 'right');
      doc.text(`Order ID: ${orderData._id}`, 180, 81, null, null, 'right');
      doc.setFontSize(12);
      doc.setTextColor(6, 182, 212);
      doc.text('Customer Information:', 20, 85);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${orderData.customer.firstName} ${orderData.customer.lastName || ''}`, 25, 93);
      doc.text(`Email: ${orderData.customer.email}`, 25, 101);
      doc.text(`Phone: ${orderData.customer.phone}`, 25, 109);
      doc.text(`Address: ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`, 25, 117);
    }

    doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);
  };

  const addItemsTable = (items, startY, pageNumber) => {
    doc.setFontSize(12);
    doc.setTextColor(6, 182, 212);
    doc.text('Order Items:', 20, startY);

    // Updated header background to accommodate new column
    doc.setFillColor(16, 185, 129);
    doc.rect(20, startY + 5, 170, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('S.No', 25, startY + 10);
    doc.text('Item', 40, startY + 10);
    doc.text('Orig. Price', 110, startY + 10);
    doc.text('Disc. Price', 135, startY + 10);
    doc.text('Qty', 160, startY + 10);
    doc.text('Total', 180, startY + 10);

    let yPos = startY + 15;
    items.forEach((item, index) => {
      const rowColor = index % 2 === 0 ? [240, 253, 250] : [220, 252, 231];
      doc.setFillColor(...rowColor);
      doc.rect(20, yPos - 3, 170, 6, 'F');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      const serialNumber = (pageNumber - 1) * itemsPerPage + index + 1;

      const originalPrice = item.price;
      
      const isGiftBox = item.category === 'giftbox' || 
                       (item.name && (
                         item.name.includes('Items') || 
                         item.name.includes('Gift Box') ||
                         item.name.includes('Prize') ||
                         item.name.toLowerCase().includes('item')
                       )) ||
                       (item.brand && item.brand.includes('Gift Box'));

      const discountedPrice = isGiftBox ? originalPrice : (originalPrice - (originalPrice * discountPercentage));

      doc.text(serialNumber.toString(), 25, yPos);
      
      const itemNameLines = doc.splitTextToSize(item.name, 60);
      const linesNeeded = itemNameLines.length;
      doc.text(itemNameLines, 40, yPos);
      
      if (isGiftBox) {
        doc.setTextColor(0, 0, 0);
        doc.text(`${Math.round(originalPrice)}`, 110, yPos);
      } else {
        doc.setTextColor(128, 128, 128);
        doc.text(`${Math.round(originalPrice)}`, 110, yPos);
      }
      
      if (isGiftBox) {
        doc.setTextColor(0, 0, 0);
        doc.text(`${Math.round(discountedPrice)}`, 135, yPos);
      } else {
        doc.setTextColor(16, 185, 129);
        doc.text(`${Math.round(discountedPrice)}`, 135, yPos);
      }
      
      doc.setTextColor(0, 0, 0);
      doc.text(item.quantity.toString(), 160, yPos);
      doc.text(`${Math.round(discountedPrice * item.quantity)}`, 180, yPos);

      yPos += 6 * linesNeeded;
    });

    return yPos;
  };

  const addTotalsSection = (yPos) => {
    doc.setFontSize(12);
    doc.setTextColor(6, 182, 212);
    doc.text('Order Summary:', 20, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Calculate correct totals - only discount non-giftbox items
    let subtotal = 0;
    let discountAmount = 0;
    
    orderData.items.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      
      // Check if this is a Gift Box item
      const isGiftBox = item.category === 'giftbox' || 
                       (item.name && (
                         item.name.includes('Items') || 
                         item.name.includes('Gift Box') ||
                         item.name.includes('Prize') ||
                         item.name.toLowerCase().includes('item')
                       )) ||
                       (item.brand && item.brand.includes('Gift Box'));
      
      // Only add discount for non-giftbox items
      if (!isGiftBox) {
        discountAmount += itemSubtotal * discountPercentage;
      }
    });
    
    const finalTotal = subtotal - discountAmount;
    
    // Subtotal
    doc.setTextColor(128, 128, 128);
    doc.text('Subtotal:', 140, yPos + 18);
    doc.text(`${Math.round(subtotal)}`, 180, yPos + 18);

    if (discountAmount > 0) {
      doc.setTextColor(16, 185, 129);
      doc.text(`Discount (${Math.round(discountPercentage * 100)}%):`, 140, yPos + 24);
      doc.text(`-${Math.round(discountAmount)}`, 180, yPos + 24);
      yPos += 6;
    }

    doc.setFont(undefined, 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text('Final Total:', 140, yPos + 34);
    doc.text(`${Math.round(finalTotal)}`, 180, yPos + 34);

    // Footer
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text('Thank you for your purchase!', 105, yPos + 54, null, null, 'center');
    doc.setTextColor(0, 0, 0);
    doc.text('For any queries, contact us at seshakavitha30@gmail.com', 105, yPos + 60, null, null, 'center');
  };

  // Generate all pages
  for (let page = 1; page <= totalPages; page++) {
    if (page > 1) {
      doc.addPage();
    }

    addCommonElements(page);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, orderData.items.length);
    const pageItems = orderData.items.slice(startIndex, endIndex);

    const startY = page === 1 ? 135 : 70;
    let yPos = addItemsTable(pageItems, startY, page);

    if (page === totalPages) {
      addTotalsSection(yPos);
    }
  }

  // Download the PDF automatically
  doc.save(`order_receipt_${orderData._id}.pdf`);

  // Return base64 PDF data for email
  return doc.output('datauristring').split(',')[1]; // Remove data:application/pdf;filename=generated.pdf;base64, prefix
};

// Service function to send receipt via email - Updated API endpoint
export const sendReceiptEmail = async (orderData, pdfBase64) => {
  try {
    const response = await fetch('http://localhost:5000/api/orders/send-receipt-email', {  // Updated endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail: orderData.customer.email,
        customerName: `${orderData.customer.firstName} ${orderData.customer.lastName || ''}`,
        orderId: orderData._id,
        pdfBase64: pdfBase64,
        orderData: orderData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};