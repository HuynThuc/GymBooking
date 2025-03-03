import React from "react";
import { useLocation } from 'react-router-dom';
import BookingHeader from "../component/BookingStep/BookingHeader";
import BannerService from "../component/Banner/bannerService";
import WeeklySchedule from "../component/WeeklySchedule/WeeklySchedule";
import CardClass from "../component/CardClass/cardClass";

const bookingImage = '/images/booking.jpg'; // Hình ảnh mặc định cho trang đặt chỗ
function Booking() {
    const location = useLocation();
    console.log("Location state:", location.state); // Xem thông tin nhận được từ location.state
    const { trainerName, serviceId, serviceName, type } = location.state || {}; // Lấy tên huấn luyện viên và tên dịch vụ từ state

    // Kiểm tra nếu loại dịch vụ là CLASS_BASED hoặc điều kiện khác để hiển thị CardClass
    const isClassBased = type === "CLASS_BASED";
    console.log("uid", serviceId)

    return (
        <div className="bg-white text-white">
            <BannerService
                isBooking={true}
                serviceName="Booking"
                bookingImage={bookingImage} // Truyền hình ảnh đặt chỗ
            />
            <BookingHeader 
                currentStep={2} 
                selectedTrainer={trainerName} 
                serviceSubtitle={serviceName} 
            />
            {isClassBased ? (
                <CardClass trainerName={trainerName} serviceName={serviceName} /> // Hiển thị CardClass
            ) : (
                <WeeklySchedule /> // Hiển thị WeeklySchedule nếu không phải CLASS_BASED
            )}
        </div>
    );
}

export default Booking;
