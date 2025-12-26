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
    
    const methodDisplay = body.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'WhatsApp Order';
    
    const message = `🛍️ *New Order from AURA*

*Order ID:* ${body.orderId}

*Customer Details:*
Name: ${body.customerName}
Email: ${body.customerEmail}
Phone: ${body.customerPhone}

*Shipping Address:*
${body.address}

*Order Items:*
${itemsList}

*Total Amount:* $${body.total.toFixed(2)}

*Payment Method:* ${methodDisplay}`;

    // Get API key from environment or use CallMeBot
    const apiKey = process.env.CALLMEBOT_API_KEY;
    
    if (apiKey) {
      // Use CallMeBot API to send automatic WhatsApp notification
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9+]/g, '');
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
      
      const response = await fetch(url);
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error('CallMeBot API error:', responseText);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to send WhatsApp notification',
          fallback: true 
        }, { status: 200 });
      }
      
      return NextResponse.json({ success: true, method: 'automatic' });
    }
    
    // If no API key, return success but indicate manual fallback needed
    return NextResponse.json({ 
      success: true, 
      method: 'manual',
      message: 'No CallMeBot API key configured. Using manual WhatsApp redirect.'
    });
    
  } catch (error) {
    console.error('Error in notify-whatsapp:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
