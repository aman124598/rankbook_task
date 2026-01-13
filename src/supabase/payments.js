// Test Payment - Simulated without external API

// Simulate payment processing
export async function createPaymentOrder(bookingId, amount, userId) {
  const orderId = `order_${Date.now()}${Math.random().toString(36).substr(2, 6)}`;
  
  return {
    orderId,
    amount,
    currency: 'INR',
    bookingId,
    userId
  };
}

// Simulate payment completion
export async function processTestPayment(amount, onProgress) {
  // Simulate payment steps
  const steps = [
    { message: 'Initiating payment...', delay: 500 },
    { message: 'Verifying details...', delay: 800 },
    { message: 'Processing payment...', delay: 1000 },
    { message: 'Confirming transaction...', delay: 700 },
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step.message);
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }

  // Generate mock payment details
  const paymentId = `pay_${Date.now()}${Math.random().toString(36).substr(2, 8)}`;
  const signature = `sig_${Math.random().toString(36).substr(2, 16)}`;

  return {
    success: true,
    paymentId,
    signature,
    amount
  };
}
