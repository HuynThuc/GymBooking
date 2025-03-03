import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Mail, Phone, Trophy, User } from 'lucide-react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';

const GymProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user } = useContext(AuthContext);
    const [orderDetails, setOrderDetails] = useState([]);
    const [stats, setStats] = useState([]);
    const [reviewInput, setReviewInput] = useState(''); // Lưu đánh giá tạm thời
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');// Lưu order đang được đánh giá

    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (reviewInput.rating === 0 || reviewInput.comment.trim() === '') {
            alert('Please select a rating and write a review');
            return;
        }

        try {
            setLoading(true);

            const reviewData = {
                rating: reviewInput.rating,
                comment: reviewInput.comment,
                userId: user.id,
            };

            const response = await axios.post('http://localhost:3002/review/reviews', reviewData);

            if (response.status === 201) {
                setIsReviewing(false);
                setReviewInput({ rating: 0, comment: '' });  // Reset review input
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch(`http://localhost:3002/order/getOrderDetailsByUser/${user.id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setOrderDetails(data.orderDetails || []);

                    // Tính toán dữ liệu stats từ orderDetails
                    const totalSessions = data.orderDetails.length;
                    const completedSessions = data.orderDetails.filter(order => order.status === 'completed').length;
                    const canceledSessions = data.orderDetails.filter(order => order.status === 'canceled').length;

                    // Số buổi còn lại bao gồm cả buổi bị hủy
                    const remainingSessions = totalSessions - completedSessions - canceledSessions;
                    const totalHours = completedSessions * 1; // Giả sử mỗi buổi tập là 1 giờ, bạn có thể điều chỉnh logic này.

                    const completionRate = totalSessions > 0
                        ? `${Math.round((completedSessions / totalSessions) * 100)}%`
                        : '0%';

                    // Cập nhật giá trị stats
                    setStats([
                        { value: remainingSessions.toString(), label: "Buổi tập còn lại" },
                        { value: completedSessions.toString(), label: "Tổng buổi đã tập" },
                        { value: completionRate, label: "Tỷ lệ hoàn thành" },
                        { value: totalHours.toString(), label: "Giờ tập" }
                    ]);

                } catch (error) {
                    console.error("Error fetching order details:", error);
                }
            }
        };
        fetchOrder();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate input fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }

        // Ensure user ID exists
        if (!user?.id) {
            setError('User not found. Please login again.');
            return;
        }

        try {
            // Gửi yêu cầu đổi mật khẩu đến API backend
            const response = await axios.put(`http://localhost:3002/auth/change-password/${user.id}`, {
                oldPassword,
                newPassword,
            });

            // Kiểm tra phản hồi từ API
            const { status, message } = response.data; // Đảm bảo lấy đúng trường JSON
            if (status === 'success') {
                setSuccess(message);
                // Reset form fields
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(message || 'An error occurred.');
            }
        } catch (err) {
            // Xử lý lỗi từ phía API hoặc mạng
            setError(err.response?.data?.message || 'An error occurred while changing password.');
        }
    };




    console.log('Order details:', orderDetails);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto pt-36 pb-10">
                {/* Profile Header */}
                {user ? (
                    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <div className="text-2xl font-bold mb-2">{user.username}</div>
                            <div className="text-gray-500 flex gap-6">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {user.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Đang tải thông tin người dùng...</div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-lg p-1 mb-6 flex gap-0.5">
                    {['overview', 'schedule', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 px-6 rounded-md font-medium ${activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                        >
                            {tab === 'overview' && 'Tổng quan'}
                            {tab === 'schedule' && 'Lịch tập'}
                            {tab === 'settings' && 'Cài đặt'}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                {activeTab === 'overview' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-gray-500 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                       
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div>
                        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                            <h2 className="text-xl font-semibold mb-4">Đặt lịch tập</h2>
                            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700">
                                Đặt lịch
                            </button>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Lịch đã đặt</h2>
                            <div className="divide-y">
                                {orderDetails.map((order, index) => (
                                    <div key={index} className="py-4 flex justify-between items-center">
                                        <div>
                                            {/* Hiển thị thông tin dựa trên loại order */}
                                            {order.trainerClass ? (
                                                <>
                                                    {order.sessionDate} - {order.sessionTime} - Lớp: {order.trainerClass?.className || 'Không xác định'} - HLV: {order.trainer?.trainerName || 'Không xác định'}
                                                </>
                                            ) : (
                                                <>
                                                    {order.sessionDate} - {order.sessionTime} - HLV: {order.trainer?.trainerName || 'Không xác định'} - Gói tập: {order.gymPackage?.name || 'Không xác định'}
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={`px-3 py-1 rounded-md text-sm 
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800'
                                                        : order.status === 'canceled' ? 'bg-red-100 text-red-800'
                                                            : 'bg-blue-100 text-blue-800'}`}
                                            >
                                                {order.status === 'completed' ? 'Đã hoàn thành'
                                                    : order.status === 'canceled' ? 'Đã hủy'
                                                        : 'Chưa sử dụng'}
                                            </span>

                                            {/* Hiển thị nút đánh giá nếu trạng thái là 'completed' */}
                                            {order.status === 'completed' && !order.review && (
                                                <button
                                                    onClick={() => setSelectedOrder(order.id)}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    Đánh giá
                                                </button>
                                            )}

                                            {/* Hiển thị đánh giá nếu đã tồn tại */}
                                            {order.review && (
                                                <div className="text-sm text-gray-600 italic">
                                                    Đánh giá: "{order.review}"
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>


                            {/* Form đánh giá */}
                            {selectedOrder && (
                                <form
                                    onSubmit={handleReviewSubmit}
                                    className="mt-4 border-t pt-6"
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    onClick={() => setReviewInput((prev) => ({ ...prev, rating: star }))}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={star <= (reviewInput.rating || 0) ? 'yellow' : 'none'}
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className={`w-6 h-6 cursor-pointer ${star <= (reviewInput.rating || 0)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <textarea
                                        value={reviewInput.comment || ''}
                                        onChange={(e) =>
                                            setReviewInput((prev) => ({ ...prev, comment: e.target.value }))
                                        }
                                        rows="4"
                                        placeholder="Viết đánh giá của bạn tại đây..."
                                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedOrder(null)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!reviewInput.rating || !reviewInput.comment}
                                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Gửi Đánh Giá
                                        </button>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                )}


                {activeTab === 'settings' && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Cài đặt tài khoản</h2>
                        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Các trường nhập liệu */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Họ tên</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    defaultValue={user.username}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    defaultValue={user.email}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    defaultValue={user.phone}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Mật khẩu hiện tại</label>
                                <input
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    type="password"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Mật khẩu mới</label>
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Xác nhận mật khẩu</label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700">
                                Cập nhật thông tin
                            </button>
                        </form>
                    </div>

                )}
            </div>
        </div>
    );
};

export default GymProfile;
