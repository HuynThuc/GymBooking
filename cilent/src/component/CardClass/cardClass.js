import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

const CardClass = () => {
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  
    const price = location.state?.price;
    const planId = location.state?.planId;
    const trainerName = location.state?.trainerName;
    const weeks = location.state?.weeks;
    const sessionsPerWeek = location.state?.sessionsPerWeek;
    const durationInMonths = location.state?.durationInMonths;
    const serviceName = location.state?.serviceName;
  const trainerId = location.state?.trainerId;
  const serviceId = location.state?.serviceId;
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // Trạng thái lưu lớp học đã chọn

  const prevWeek = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    const now = new Date();
    if (newDate >= now || newDate.toDateString() === now.toDateString()) {
      setDate(newDate);
    } else {
      toast.error('Không thể xem lịch của những tuần đã qua!');
    }
  };

  const nextWeek = () => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
  };

  const getWeekDays = (date) => {
    const startOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const currentWeekDate = new Date(date.getFullYear(), date.getMonth(), startOfWeek + i);
      return {
        date: currentWeekDate.getDate(),
        day: currentWeekDate.toLocaleDateString('vi-VN', { weekday: 'short' }),
        fullDate: currentWeekDate,
        isPastDate: currentWeekDate < now,
      };
    });
  };

  useEffect(() => {
    const fetchClassesByTrainerAndService = async () => {
      if (!trainerId || !serviceId) return; // Kiểm tra xem trainerId và serviceId có tồn tại không
      try {
        const response = await fetch(`http://localhost:3002/class/byTrainerAndService/${trainerId}/${serviceId}`);
        const data = await response.json();
        setClasses(data.data || []); // Cập nhật danh sách lớp học
      } catch (error) {
        console.error('Error fetching classes by trainer and service:', error);
      }
    };

    fetchClassesByTrainerAndService();
  }, [trainerId, serviceId]); // Thêm serviceId vào dependencies
  
  const weekDays = getWeekDays(date);

  const getClassesByDayAndTime = (day) => {
    return classes.filter((classItem) => {
      const classDate = new Date(classItem.classDate);
      return classDate.getDate() === day.date;
    }).sort((a, b) => {
      const timeA = new Date(a.classDate);
      const timeB = new Date(b.classDate);
      return timeA - timeB;
    });
  };

  const handleClassSelect = (classItem) => {
    if (selectedClass?.id === classItem.id) {
      setSelectedClass(null); // Hủy chọn lớp học nếu người dùng click vào lớp học đã chọn
    } else {
      setSelectedClass(classItem); // Chọn lớp học mới
    }
  };

  const formatSelectedSlots = () => {
    if (!selectedClass) return ''; // Nếu không có lớp học đã chọn, trả về chuỗi rỗng
  
    const classDate = selectedClass.classDate; // Lấy classDate từ selectedClass
    const startTime = selectedClass.startTime; // Lấy startTime từ selectedClass
  
    // Chuyển đổi classDate thành ngày với định dạng 'vi-VN'
    const formattedDate = new Date(classDate).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  
    // Kết hợp ngày và giờ
    const formattedSlot = `${formattedDate} ${startTime}`;
  
    return formattedSlot; // Trả về chuỗi đã định dạng
  };
  
  // Gán selectedTimesFormatted vào state hoặc chuyển tiếp
  const handleRegister = () => {
    if (!selectedClass) {
      toast.error('Vui lòng chọn lớp học!');
      return;
    }
  
    // Lấy formatted selectedTimesFormatted
    const selectedTimesFormatted = formatSelectedSlots();
  
    // Chuyển hướng tới trang thanh toán và truyền thông tin lớp học đã chọn
    navigate('/thanhtoan', {
      state: {
        selectedClass,
        selectedTimesFormatted,
        price,
        planId,
        trainerId,
        weeks,
        sessionsPerWeek,
        durationInMonths,
        trainerName,
        serviceName,
      }
    });
  };
  


  return (
    <div className="mt-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <button onClick={prevWeek} className="flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="w-5 h-5" />
          <span>TUẦN TRƯỚC</span>
        </button>

        <h2 className="text-lg font-medium text-black">
          {date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
        </h2>

        <button onClick={nextWeek} className="flex items-center text-gray-600 hover:text-gray-800">
          <span>TUẦN SAU</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="w-full border rounded-lg overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day, index) => (
            <div key={index} className="p-3 text-center border-r last:border-r-0 bg-gray-50">
              <div className="text-sm text-gray-500">{day.date}</div>
              <div className={`font-medium ${day.isPastDate ? 'text-gray-400' : 'text-gray-900'}`}>
                {day.day}
              </div>
            </div>
          ))}
        </div>

        {/* Class Listings */}
        <div className="grid grid-cols-7">
          {weekDays.map((day, dayIdx) => {
            const classesForDay = getClassesByDayAndTime(day);

            return (
              <div key={dayIdx} className="border-r last:border-r-0 min-h-[100px]">
                {classesForDay.length > 0 ? (
                  <div className="h-full">
                    {classesForDay.map((classItem, idx) => (
                      <div
                        key={idx}
                        className={`p-4 border-b last:border-b-0 cursor-pointer ${
                          selectedClass?.id === classItem.id ? 'bg-yellow-300' : 'hover:bg-yellow-100'
                        }`}
                        onClick={() => handleClassSelect(classItem)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{classItem.className}</span>
                          <span className="text-sm text-gray-600">{classItem.startTime} - {classItem.endTime}</span>
                          <span className="text-sm text-gray-600">
                            Slot: {classItem.currentParticipants}/{classItem.maxParticipants}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Không có lớp học nào
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Đăng ký button */}
      <button
        onClick={handleRegister} // Khi bấm đăng ký
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Đăng ký
      </button>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default CardClass;
