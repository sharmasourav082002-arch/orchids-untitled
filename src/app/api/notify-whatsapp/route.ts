import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_NUMBER = '+447448071922';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface NotifyPayload {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NotifyPayload = await request.json();
    
    const itemsList = body.items.map(item => 
      `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const methodDisplay = body.paymentMethod === 'cash_on_delivery' ? '💵 Cash on Delivery' : '📱 WhatsApp Order';
    
    const message = `🛍️ *NEW LUXE MARKET ORDER*

━━━━━━━━━━━━━━━━━━━━
📦 *Order #${body.orderId.slice(0, 8).toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━

👤 *Customer:*
${body.customerName}
📧 ${body.customerEmail}
📞 ${body.customerPhone}

📍 *Delivery Address:*
${body.address}

🛒 *Items Ordered:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: $${body.total.toFixed(2)}*
${methodDisplay}
━━━━━━━━━━━━━━━━━━━━

⏰ ${new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`;

    const apiKey = process.env.CALLMEBOT_API_KEY;
    
    if (apiKey) {
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9+]/g, '');
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: { 'Accept': 'text/plain' }
      });
      
      if (!response.ok) {
        console.error('CallMeBot API error');
        return NextResponse.json({ 
          success: true, 
          method: 'manual',
          fallback: true 
        });
      }
      
      return NextResponse.json({ success: true, method: 'automatic' });
    }
    
    return NextResponse.json({ 
      success: true, 
      method: 'manual',
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    });
    
  } catch (error) {
    console.error('Error in notify-whatsapp:', error);
    return NextResponse.json({ 
      success: true, 
      method: 'manual',
      error: 'Fallback to manual notification'
    });
  }
}
