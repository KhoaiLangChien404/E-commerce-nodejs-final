import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import Chart from 'chart.js/auto';

const Dashboard = ({ token }) => {
  const [usersCount, setUsersCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Lấy số liệu người dùng
        const userStatsResponse = await axios.get(`${backendUrl}/api/user/stats`, {
          headers: { token },
        });
        if (userStatsResponse.data.success) {
          setUsersCount(userStatsResponse.data.totalUsers);
          setNewUsersCount(userStatsResponse.data.newUsers);
        } else {
          toast.error(userStatsResponse.data.message);
        }

        // Lấy danh sách đơn hàng
        const ordersResponse = await axios.post(
          `${backendUrl}/api/order/list`,
          {},
          { headers: { token } }
        );
        if (ordersResponse.data.success) {
          const orders = ordersResponse.data.orders;
          setOrdersCount(orders.length);
          setTotalRevenue(orders.reduce((sum, order) => sum + order.amount, 0));
        } else {
          toast.error(ordersResponse.data.message);
        }

        // Lấy danh sách sản phẩm
        const productsResponse = await axios.get(`${backendUrl}/api/product/list`);
        if (productsResponse.data.success) {
          const bestSellers = productsResponse.data.products
            .filter(product => product.bestseller)
            .slice(0, 5);
          setBestSellingProducts(bestSellers);
        } else {
          toast.error(productsResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchDashboardData();
  }, [token]);

  useEffect(() => {
    if (bestSellingProducts.length > 0) {
      const ctx = document.getElementById('bestSellersChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bestSellingProducts.map(product => product.name),
          datasets: [
            {
              label: 'Units Sold',
              data: bestSellingProducts.map(product => product.sizes.length),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, [bestSellingProducts]);

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="stat bg-white shadow p-4 rounded">
          <h2>Total Users</h2>
          <p>{usersCount}</p>
        </div>
        <div className="stat bg-white shadow p-4 rounded">
          <h2>New Users</h2>
          <p>{newUsersCount}</p>
        </div>
        <div className="stat bg-white shadow p-4 rounded">
          <h2>Total Orders</h2>
          <p>{ordersCount}</p>
        </div>
        <div className="stat bg-white shadow p-4 rounded">
          <h2>Total Revenue</h2>
          <p>${totalRevenue}</p>
        </div>
      </div>
      <div className="chart">
        <h2>Best-Selling Products</h2>
        <canvas id="bestSellersChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
