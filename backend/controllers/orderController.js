import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

import Stripe from 'stripe'

const currency = 'USD'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success: true, message: 'Order Placed'})
    } catch (error) {
        console.log(error)   
        res.json({success: false, message: error.message})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name

                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        })) 

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'

                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/cart`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true, session_url:session.url})
        
    } catch (error) {
        console.log(error)   
        res.json({success: false, message: error.message})
    }

}

//verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            // Đánh dấu thanh toán là thành công
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            // Làm rỗng giỏ hàng của người dùng
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({ success: true });
        } else {
            // Nếu thanh toán thất bại
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: 'Payment verification failed.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)   
        res.json({success: false, message: error.message})
    }
}

// User Order data for frontend
const userOrders = async (req, res) => {
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)   
        res.json({success: false, message: error.message})
    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})

    } catch (error) {
        console.log(error)   
        res.json({success: false, message: error.message})
    }
}
const getDashboardStats = async (req, res) => {
    try {
        const { period } = req.query; // `period` có thể là "month" hoặc "week"
        const now = new Date();

        let startDate;
        if (period === "month") {
            startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1); // 12 tháng trước
        } else {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 * 11); // 12 tuần trước
        }

        const orders = await orderModel.find({
            date: { $gte: startDate.getTime() }, // Lọc các đơn hàng từ startDate
        });

        const stats = Array(12).fill(0).map(() => ({
            revenue: 0,
            profit: 0,
            orders: 0,
        }));

        orders.forEach((order) => {
            const orderDate = new Date(order.date);

            let index;
            if (period === "month") {
                index = now.getMonth() - orderDate.getMonth() + (now.getFullYear() - orderDate.getFullYear()) * 12;
            } else {
                index = Math.floor((now - orderDate) / (7 * 24 * 60 * 60 * 1000));
            }

            if (index >= 0 && index < 12) {
                stats[index].revenue += order.amount;
                stats[index].profit += order.amount * 0.2; // Giả sử lợi nhuận là 20% doanh thu
                stats[index].orders += 1;
            }
        });

        res.json({ success: true, stats });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export {verifyStripe,placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, getDashboardStats}