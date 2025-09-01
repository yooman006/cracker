// services/pdfService.js
import { jsPDF } from 'jspdf';
import { formatDate } from '../utils/dateUtils';

export const pdfService = {
  generateReceipt(order) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const itemsPerPage = 15;
    const totalPages = Math.ceil(order.items.length / itemsPerPage);

    const addCommonElements = (pageNumber) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setDrawColor(0, 153, 255);
      doc.setLineWidth(1);
      doc.rect(5, 5, 200, 287);
      doc.setFontSize(16);
      doc.setTextColor(0, 51, 153);
      doc.setFont(undefined, 'bold');
      doc.text('ORDER RECEIPT', 105, 20, null, null, 'center');
      doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);

      if (pageNumber === 1) {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Order Date: ${formatDate(order.orderDate)}`, 180, 30, null, null, 'right');
        doc.text(`Order ID: ${order._id}`, 180, 36, null, null, 'right');
        doc.setFontSize(12);
        doc.setTextColor(0, 51, 153);
        doc.text('Customer Information:', 20, 55);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${order.customer.firstName}`, 25, 63);
        doc.text(`Email: ${order.customer.email}`, 25, 69);
        doc.text(`Phone: ${order.customer.phone}`, 25, 75);
        doc.text(`Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`, 25, 81);
      }
    };

    const addItemsTable = (items, startY, pageNumber) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 153);
      doc.text('Order Items:', 20, startY);
      doc.setFillColor(240, 240, 240);
      doc.rect(20, startY + 5, 170, 8, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('S.No', 25, startY + 10);
      doc.text('Item', 35, startY + 10);
      doc.text('Brand', 95, startY + 10);
      doc.text('Price', 140, startY + 10);
      doc.text('Qty', 160, startY + 10);
      doc.text('Total', 180, startY + 10);

      let yPos = startY + 15;
      items.forEach((item, index) => {
        const rowColor = index % 2 === 0 ? [255, 255, 255] : [245, 245, 245];
        doc.setFillColor(...rowColor);
        doc.rect(20, yPos - 3, 170, 6, 'F');
        doc.setTextColor(0, 0, 0);
        const serialNumber = (pageNumber - 1) * itemsPerPage + index + 1;
        doc.text(serialNumber.toString(), 25, yPos);
        const itemNameLines = doc.splitTextToSize(item.name, 55);
        const brandLines = doc.splitTextToSize(item.brand || '', 30);
        const linesNeeded = Math.max(itemNameLines.length, brandLines.length);
        doc.text(itemNameLines, 35, yPos);
        doc.text(brandLines, 95, yPos);
        doc.text(`${Math.round(item.price.toFixed(2))}`, 140, yPos);
        doc.text(item.quantity.toString(), 160, yPos);
        doc.text(`${Math.round((item.price * item.quantity).toFixed(2))}`, 180, yPos);
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
      doc.text('Subtotal:', 140, yPos + 18);
      doc.text(`${Math.round(order.totals.subtotal.toFixed(2))}`, 180, yPos + 18);

      if (order.totals.discountAmount > 0) {
        doc.text(`Discount:`, 140, yPos + 24);
        doc.text(`${order.totals.discountPercentage}%`, 180, yPos + 24);
        yPos += 6;
      }

      doc.setFont(undefined, 'bold');
      doc.text('Total Amount:', 140, yPos + 30);
      doc.text(`${Math.round(order.totals.total.toFixed(2))}`, 180, yPos + 30);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for your business', 105, yPos + 50, null, null, 'center');
    };

    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) doc.addPage();
      addCommonElements(page);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, order.items.length);
      const pageItems = order.items.slice(startIndex, endIndex);
      const startY = page === 1 ? 95 : 30;
      let yPos = addItemsTable(pageItems, startY, page);
      if (page === totalPages) addTotalsSection(yPos);
    }

    doc.save(`order_receipt_${order._id.slice(-8)}.pdf`);
  }
};