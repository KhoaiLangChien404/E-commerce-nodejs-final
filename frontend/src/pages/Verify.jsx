import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, setCartItems, backendUrl } = React.useContext(ShopContext);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const success = queryParams.get('success');
        const orderId = queryParams.get('orderId');

        // Gửi yêu cầu xác thực trạng thái thanh toán về backend
        if (success && orderId) {
            axios
                .post(
                    `${backendUrl}/api/order/verifyStripe`,
                    { orderId, success, userId: token },
                    { headers: { token } }
                )
                .then((response) => {
                    if (response.data.success) {
                        setCartItems({}); // Làm rỗng giỏ hàng
                        navigate('/orders'); // Điều hướng về trang Orders
                    } else {
                        toast.success('Paymet success');
                        navigate('/cart');
                    }
                })
                .catch((err) => {
                    console.error('Error verifying payment:', err);
                    toast.error('An error occurred. Please try again.');
                    navigate('/cart');
                });
        } else {
            toast.error('Invalid payment details.');
            navigate('/cart');
        }
    }, [location, navigate, token, setCartItems, backendUrl]);

    return <div>Processing your payment...</div>; // Hiển thị thông báo trong khi xử lý
};

export default Verify;
