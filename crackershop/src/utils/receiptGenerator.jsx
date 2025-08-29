import { jsPDF } from 'jspdf';

export const generateReceipt = (orderData) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const itemsPerPage = 15;
  const totalPages = Math.ceil(orderData.items.length / itemsPerPage);

  const addCommonElements = (pageNumber) => {
    doc.setLineWidth(5);
    doc.roundedRect(5, 5, 200, 287, 3, 3);

    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204);
    doc.setFont(undefined, 'bold');
    doc.text('KavithaCrackers ', 105, 30, null, null, 'center');

    if (pageNumber === 1) {
      // Contact Info
      doc.setFontSize(12);
      doc.setTextColor(51, 153, 255);
      doc.text('Sivakasi - 626123', 105, 40, null, null, 'center');
      doc.text('Phone: +91 8903623517 | Email: seshakavitha30@gmail.com', 105, 46, null, null, 'center');
      
      // Divider
      doc.setDrawColor(0, 153, 255);
      doc.setLineWidth(1);
      doc.line(30, 55, 180, 55);
      
      // Order Header
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text('ORDER RECEIPT', 105, 65, null, null, 'center');

      // Order Info
      doc.setFontSize(10);
      doc.setTextColor(0, 102, 204);
      doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 180, 75, null, null, 'right');
      doc.text(`Order ID: ${orderData._id}`, 180, 81, null, null, 'right');
      
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 153);
      doc.text('Customer Information:', 20, 85);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${orderData.customer.firstName} ${orderData.customer.lastName}`, 25, 93);
      doc.text(`Email: ${orderData.customer.email}`, 25, 101);
      doc.text(`Phone: ${orderData.customer.phone}`, 25, 109);
      doc.text(`Address: ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`, 25, 117);
    }

    // Page number
    doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);
  };

  const addItemsTable = (items, startY, pageNumber) => {
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153);
    doc.text('Order Items:', 20, startY);

    const brandsOnPage = [...new Set(items.map(item => item.brand || 'No Brand'))];
    
    let brandY = startY + 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 204);
    doc.text(`Brands: ${brandsOnPage.join(', ')}`, 20, brandY);

    // Header row
    doc.setFillColor(0, 153, 255);
    doc.rect(20, brandY + 5, 170, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('S.No', 25, brandY + 10);
    doc.text('Item', 40, brandY + 10);
    doc.text('Price', 140, brandY + 10);
    doc.text('Qty', 160, brandY + 10);
    doc.text('Total', 180, brandY + 10);

    // Table rows
    let yPos = brandY + 15;
    items.forEach((item, index) => {
      const rowColor = index % 2 === 0 ? [245, 250, 255] : [230, 240, 255];
      doc.setFillColor(...rowColor);
      doc.rect(20, yPos - 3, 180, 6, 'F');

      doc.setTextColor(0, 0, 0);

      const serialNumber = (pageNumber - 1) * itemsPerPage + index + 1;
      doc.text(serialNumber.toString(), 25, yPos);

      const itemNameLines = doc.splitTextToSize(item.name, 70);
      const linesNeeded = itemNameLines.length;

      doc.text(itemNameLines, 40, yPos);
      doc.text(`${Math.round(item.price.toFixed(2))}`, 140, yPos);
      doc.text(item.quantity.toString(), 160, yPos);
      doc.text(`${Math.round(item.price * item.quantity).toFixed(2)}`, 180, yPos);

      yPos += 6 * linesNeeded;
    });

    return yPos;
  };

  const addTotalsSection = (yPos) => {
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153);
    doc.text('Order Summary:', 20, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Subtotal', 140, yPos + 18);
    doc.text(`: ${Math.round(orderData.totals.subtotal.toFixed(2))}`, 180, yPos + 18);

    if (orderData.totals.discountAmount > 0) {
      doc.text(`Discount `, 140, yPos + 24);
      doc.text(`: -${orderData.totals.discountPercentage}%`, 180, yPos + 24);
      yPos += 6;
    }

    doc.setFont(undefined, 'bold');
    doc.text('Total Amount', 140, yPos + 28);
    doc.text(`: ${Math.round(orderData.totals.total.toFixed(2))}`, 180, yPos + 28);

    // Footer
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 204);
    doc.text('Thank you for your purchase!', 105, yPos + 50, null, null, 'center');
    doc.setTextColor(0, 0, 0);
    doc.text('For any queries, contact us at seshkavitha30@gmail.com', 105, yPos + 56, null, null, 'center');

    // Dragon Ball Stars
    doc.setFillColor(255, 204, 0);
    for (let i = 1; i <= 4; i++) {
      doc.circle(30 + (i * 30), yPos + 65, 3, 'F');
    }
  };

  // Generate each page
  for (let page = 1; page <= totalPages; page++) {
    if (page > 1) {
      doc.addPage();
    }

    addCommonElements(page);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, orderData.items.length);
    const pageItems = orderData.items.slice(startIndex, endIndex);

    const startY = page === 1 ? 135 : 30;
    let yPos = addItemsTable(pageItems, startY, page);

    if (page === totalPages) {
      addTotalsSection(yPos);
    }
  }

  doc.save(`order_receipt_${orderData._id}.pdf`);
};
