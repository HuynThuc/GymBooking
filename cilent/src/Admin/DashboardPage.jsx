import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined, TeamOutlined, LineChartOutlined, PlusOutlined, GiftOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, UploadOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Typography, theme, Table, Modal, Form, Input, Button, Select, Upload, message, DatePicker, TimePicker, Row, Col, InputNumber } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomQuillEditor from './CustomReactQuill';
import { duration } from 'moment';
import RevenueChart from './RevenueChart';
import QR from './QR';
import QRCodeScanner from './QR';
import NotificationConfig from './NotificationConfig';





const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;


// Đây là danh sách các mục menu cho phần điều hướng bên trái của trang Dashboard. Mỗi mục có một key, icon, và label để xác định và hiển thị trong menu.
const items2 = [
    {
        key: 'sub4',
        icon: <LineChartOutlined />, // Có thể dùng biểu tượng khác nếu cần
        label: 'Quản lý Thống Kê', // Thêm mục quản lý thống kê
    },
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Quản lý Thành Viên', // Đặt mục quản lý thành viên ở đây
    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Quản lý Gói Tập và Dịch Vụ',
        children: [
            { key: 'sub2-1', label: 'Quản lý gói tập' },
            { key: 'sub2-2', label: 'Dịch vụ' },
        ],
    },
    {
        key: 'sub3',
        icon: <NotificationOutlined />,
        label: 'Quản lý Đơn Hàng', // Đặt mục quản lý đơn hàng ở đây
    },

    {
        key: 'sub5',
        icon: <TeamOutlined />, // Biểu tượng cho quản lý huấn luyện viên
        label: 'Quản lý Huấn Luyện Viên',
        children: [
            { key: 'sub5-1', label: 'Huấn luyện viên' },
            { key: 'sub5-2', label: 'Lớp học' },

        ],
    },
    {
        key: 'sub6',
        icon: <GiftOutlined />,
        label: 'Quản lý Khuyến Mãi',
        children: [
            { key: 'sub6-1', label: 'Danh sách khuyến mãi' },
        ],

    },
    {
        key: 'sub7',
        icon: <LineChartOutlined />, // Có thể dùng biểu tượng khác nếu cần
        label: 'Quét mã', // Thêm mục quản lý thống kê
    },
    {
        key: 'sub8',
        icon: <SettingOutlined />, // Biểu tượng bánh răng cho cài đặt
        label: 'Cài đặt', // Thêm mục quản lý thống kê
    }

];


// Sample data and columns for each subnav item






const DashboardPage = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [selectTypeModalVisible, setSelectTypeVisible] = useState(false);
    const [addScheduleModalVisible, setAddScheduleModalVisible] = useState(false);

    const [period, setPeriod] = useState('weekly');


    const [selectedUserKeys, setSelectedUserKeys] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [selectedServiceIds, setSelectedServiceIds] = useState([]);


    const [selectedPromotionId, setSelectedPromotionId] = useState(null); // Trạng thái cho mã giảm giá

    const [scheduleModalVisible, setscheduleModalVisible] = useState(false);
    const [recordToSchedule, setRecordSchedule] = useState(null);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedMenuKey, setSelectedMenuKey] = useState('sub4');
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState([]);

    const [order, setOrder] = useState([]);


    const [trainerClass, settrainerClass] = useState([]);
    const [gymPackage, setGymPackage] = useState([]);
    const [service, setService] = useState([]);
    const [trainer, setTrainer] = useState([]);
    const [promotion, setPromotion] = useState([]);
    const [trainerSchedule, setTrainerSchedule] = useState([])
    const [selectedTrainerId, setSelectedTrainerId] = useState(null);


    const [orderDetail, setOrderDetail] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [selectedDay, setSelectedDay] = useState(null);
    const [sendType, setSendType] = useState(null); // Lưu loại gửi
    const [registeredBefore, setRegisteredBefore] = useState(""); // Lưu ngày cho user cũ
    const [selectedUserId, setSelectedUserId] = useState(null);



    //THỜI GIAN 
    const getDayOfWeekNumber = (dayNumber) => {
        // Trả về số tương ứng với ngày
        const days = {
            1: 2, // Thứ Hai
            2: 3, // Thứ Ba
            3: 4, // Thứ Tư
            4: 5, // Thứ Năm
            5: 6, // Thứ Sáu
            6: 7, // Thứ Bảy
            0: 8  // Chủ Nhật
        };
        return days[dayNumber];
    };
    //THỜI GIAN
    const getDayName = (dayNumber) => {
        // Trả về tên của ngày
        const dayNames = {
            0: "Chủ Nhật",
            1: "Thứ Hai",
            2: "Thứ Ba",
            3: "Thứ Tư",
            4: "Thứ Năm",
            5: "Thứ Sáu",
            6: "Thứ Bảy"
        };
        return dayNames[dayNumber];
    };
    //THỜI GIAN
    const handleDateChange = (date) => {
        if (date) {
            const dayNumber = date.day(); // Lấy số ngày trong tuần (0 = Chủ Nhật)
            const dayOfWeekNumber = getDayOfWeekNumber(dayNumber);
            const dayName = getDayName(dayNumber);

            setSelectedDay(dayName);// Lấy tên ngày tương ứng

            // Cập nhật giá trị vào form
            form.setFieldsValue({
                date: date,
                day_of_week: dayOfWeekNumber // Lưu số tương ứng
            });

            // Cập nhật tên thứ vào ô input
            form.setFieldsValue({
                day_of_week_display: dayName // Trường này sẽ hiển thị tên thứ
            });

            // In ra ngày và tên thứ
            console.log('Ngày:', date.format("YYYY-MM-DD"));
            console.log('Tên Thứ:', dayName);
        } else {
            // Nếu xóa ngày, clear cả 2 trường
            form.setFieldsValue({
                date: null,
                day_of_week: '',
                day_of_week_display: '' // Xóa tên thứ
            });
        }
    };




    const validatePrice = (_, value) => {
        if (value < 0) {
            return Promise.reject(new Error('Vui lòng nhập giá hợp lệ!'));
        }
        return Promise.resolve();
    };


    //Lấy dịch vụ
    const fetchService = async () => {

        try {
            const response = await fetch('http://localhost:3002/service/getAllServices');
            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            setService(data);
        } catch (error) {
            console.error("Error fetching gym packages:", error);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);

    //Lấy lịch trình theo trainerId
    useEffect(() => {
        const fetchTrainerSchedule = async () => {
            if (!selectedTrainerId) return; // Nếu chưa có trainerId thì không gọi API

            try {
                const response = await fetch(`http://localhost:3002/schedule/getschedulesbyTrainer/${selectedTrainerId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const schedules = await response.json();
                console.log("Trainer schedules:", schedules); // Kiểm tra dữ liệu trả về
                setTrainerSchedule(schedules); // Lưu lịch trình vào state
            } catch (error) {
                console.error("Error fetching trainer schedules:", error);
            }
        };

        fetchTrainerSchedule();
    }, [selectedTrainerId]); // Gọi lại mỗi khi selectedTrainerId thay đổi


    //Lấy package
    const fetchGymPackage = async () => {
        try {
            const response = await fetch('http://localhost:3002/gymPackage/getAllPackage');
            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            setGymPackage(data);
        } catch (error) {
            console.error("Error fetching gym packages:", error);
        }
    };

    useEffect(() => {
        fetchGymPackage();
    }, []);


    // Lấy danh sách order
    const fetchOrder = async () => {
        try {
            const response = await fetch('http://localhost:3002/order/getAllOrders');
            const data = await response.json(); // Parse JSON từ phản hồi
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về

            // Kiểm tra xem data.orders có phải là mảng không, nếu không thì set mặc định là mảng rỗng
            const orderData = Array.isArray(data.orders) ? data.orders : [];
            setOrder(orderData); // Đặt mảng orders vào state
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Gọi hàm fetchOrder khi component được render
    useEffect(() => {
        fetchOrder();
    }, []);



    // Hàm gọi API để lấy chi tiết order_detail
    const fetchOrderDetail = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3002/order/getOrderDetailsByOrderId/${orderId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const orderData = Array.isArray(data.orderDetails) ? data.orderDetails : [];
            setOrderDetail(orderData);
            setIsModalVisible(true); // Hiển thị modal sau khi có dữ liệu
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };
    console.log('ád', orderDetail)



    //Lấy user
    const fetchUser = async () => {
        console.log("Fetching user..."); // Kiểm tra xem đoạn code có chạy đến đây không

        try {
            const response = await fetch('http://localhost:3002/auth/users');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về

            // Nếu dữ liệu trả về là { users: [...] }, bạn cần lấy mảng users
            const userData = Array.isArray(data.users) ? data.users : []; // Kiểm tra kiểu dữ liệu

            setUser(userData); // Cập nhật state với mảng users
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    //Lấy khuyến mãi
    const fetchPromotion = async () => {
        console.log("Fetching user..."); // Kiểm tra xem đoạn code có chạy đến đây không

        try {
            const response = await fetch('http://localhost:3002/promotion/getAllPromotion');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về

            // Nếu dữ liệu trả về là { users: [...] }, bạn cần lấy mảng users
            const promotionData = Array.isArray(data.promotion) ? data.promotion : []; // Kiểm tra kiểu dữ liệu

            setPromotion(promotionData); // Cập nhật state với mảng users
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchPromotion();
    }, []);


    //Lấy trainer
    const fetchTrainer = async () => {
        try {
            const response = await fetch('http://localhost:3002/trainer/getAllTrainers');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            setTrainer(data);
        } catch (error) {
            console.error("Error fetching trainer:", error);
        }
    };

    useEffect(() => {
        fetchTrainer();
    }, []);


    //Lấy trainer
    const fetchClass = async () => {
        try {
            const response = await fetch('http://localhost:3002/class/getAllClass');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            settrainerClass(data);
        } catch (error) {
            console.error("Error fetching trainer:", error);
        }
    };

    useEffect(() => {
        fetchClass();
    }, []);

    console.log('id', selectedTrainerId)



    //Thêm loại sản phẩm
    const addService = async (serviceData) => {
        try {
            const response = await axios.post('http://localhost:3002/service/addService', serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
                }
            });
            message.success('Thêm dịch vụ thành công!');
            // Xử lý khi request thành công
            console.log('Thêm thành công:', response.data);
            fetchService();

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };


    //Thêm HLV
    const addTrainer = async (trainerData) => {
        try {
            const response = await axios.post('http://localhost:3002/trainer/addTrainer', trainerData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
                }
            });
            // Xử lý khi request thành công
            message.success('Thêm huấn luyện viên thành công!');
            fetchTrainer();

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };

    const handleAddSchedule = async () => {
        try {
            // Validate form và lấy giá trị nhập
            const values = await form.validateFields();

            // Chuẩn bị dữ liệu để gửi
            const scheduledData = {
                date: values.date ? values.date.format("YYYY-MM-DD") : null,
                start_time: values.start_time ? values.start_time.format("HH:mm") : null,
                end_time: values.end_time ? values.end_time.format("HH:mm") : null,
                day_of_week: values.day_of_week || null,
                trainerId: values.trainerId || null
            };

            // Gửi dữ liệu tới API
            const response = await axios.post(
                'http://localhost:3002/schedule/addTrainerSchedule',
                scheduledData,
                {
                    headers: {
                        'Content-Type': 'application/json', // Đảm bảo header JSON
                    },
                }
            );

            // Xử lý khi request thành công
            console.log('Thêm thành công:', response.data);
            message.success('Thêm lịch trình thành công!');

            // Đóng modal sau khi thêm thành công
            setAddScheduleModalVisible(false);
            form.resetFields();
        } catch (error) {
            // Xử lý lỗi form validation
            if (error?.name === 'ValidationError') {
                message.error('Vui lòng điền đầy đủ thông tin!');
            } else {
                // Xử lý lỗi khi gửi request
                message.error('Có lỗi xảy ra khi thêm lịch trình');
                console.error(error);
            }
        }
    };



    // Thêm gói tập
    const addGymPackage = async (gymPackageData) => {
        try {
            const response = await axios.post('http://localhost:3002/gymPackage/addGymPackage', gymPackageData, {
                headers: {
                    'Content-Type': 'application/json' // Đảm bảo header Content-Type là application/json khi gửi JSON
                }
            });
            // Xử lý khi request thành công
            message.success('Thêm gói tập thành công!');
            fetchGymPackage();

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };

    //thêm lớp
    const addClass = async (classData) => {
        try {
            const response = await axios.post('http://localhost:3002/class/create', classData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Xử lý khi request thành công
            message.success(response.data.message || 'Thêm gói tập thành công!');
            fetchGymPackage();
        } catch (error) {
            // Lấy thông báo lỗi từ server hoặc hiển thị thông báo chung
            const errorMessage =
                error.response?.data?.message || 'Đã xảy ra lỗi khi thêm lớp học. Vui lòng thử lại!';
            message.error(errorMessage);
    
            console.error('Lỗi khi thêm lớp học:', error);
        }
    };
    

    // Thêm gói tập
    const addPromotion = async (promotionData) => {
        try {
            const response = await axios.post('http://localhost:3002/promotion/createPromotion', promotionData, {
                headers: {
                    'Content-Type': 'application/json' // Đảm bảo header Content-Type là application/json khi gửi JSON
                }
            });
            // Xử lý khi request thành công
            console.log('Thêm thành công:', response.data);
            message.success('Thêm khuyến mãi thành công!');
            fetchPromotion();

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };

    //nút edit
    const handleEdit = (record) => {
        setRecordToEdit(record);
        form.setFieldsValue(record);
        setSelectedTrainerId(record.id);
        setEditModalVisible(true);
    };



    //nút xóa
    const handleDelete = (record) => {
        setRecordToDelete(record);
        setDeleteModalVisible(true);
    };

    const handleSchedule = (record) => {
        form.setFieldsValue(record);
        setSelectedTrainerId(record.id);
        setRecordSchedule(record);
        setscheduleModalVisible(true);
    };

    const handleOrder = (record) => {
        setSelectedOrderId(record.id);

    };




    //Hàm ok khi edit
    const handleEditModalOk = () => {
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-2') {
                const id = recordToEdit.id;
                const formData = new FormData();

                // Thêm các trường khác vào FormData
                formData.append('serviceName', values.serviceName);
                formData.append('description', values.description);
                formData.append('content', values.content);
                formData.append('layout', values.layout);

                // Kiểm tra và thêm file nếu người dùng đã tải lên
                if (values.file && values.file.fileList && values.file.fileList[0]) {
                    formData.append('image', values.file.fileList[0].originFileObj); // Lấy tệp thực tế
                }

                // Gửi yêu cầu PUT với FormData
                axios.put(`http://localhost:3002/service/updateService/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đặt header để hỗ trợ tải lên file
                    },
                })
                    .then(response => {
                        message.success('Cập nhật thành công!');
                        setEditModalVisible(false);
                        fetchService(); // Tải lại danh sách dịch vụ sau khi cập nhật
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra:', error);
                        message.error('Cập nhật thất bại. Vui lòng thử lại!');
                    });
            } else if (selectedMenuKey === 'sub5-1') {
                const id = recordToEdit.id;
                const formData = new FormData();

                // Thêm các trường khác vào FormData
                formData.append('trainerName', values.trainerName);
                formData.append('gender', values.gender);
                formData.append('experience_years', values.experience_years);
                formData.append('bio', values.bio);
                formData.append('serviceIds', values.serviceIds.join(','));

                // Kiểm tra và thêm file nếu người dùng đã tải lên
                if (values.file && values.file.fileList && values.file.fileList[0]) {
                    formData.append('image', values.file.fileList[0].originFileObj); // Lấy tệp thực tế
                }

                // Gửi yêu cầu PUT với FormData
                axios.put(`http://localhost:3002/trainer/updateTrainer/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đặt header để hỗ trợ tải lên file
                    },
                })
                    .then(response => {
                        message.success('Cập nhật thành công!');
                        setEditModalVisible(false);
                        fetchTrainer(); // Tải lại danh sách dịch vụ sau khi cập nhật
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra:', error);
                        message.error('Cập nhật thất bại. Vui lòng thử lại!');
                    });

            } else if (selectedMenuKey === 'sub2-1') {
                const id = recordToEdit.id;
                // Dữ liệu gói tập
                const gymPackageData = {
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    weeks: values.weeks,
                    sessionsPerWeek: values.sessionsPerWeek,
                    durationInMonths: values.durationInMonths,
                    serviceId: values.serviceId
                };

                // Gửi yêu cầu PUT với dữ liệu gói tập
                axios.put(`http://localhost:3002/gymPackage/updateGymPackage/${id}`, gymPackageData)
                    .then(response => {
                        message.success('Cập nhật gói tập thành công!');
                        setEditModalVisible(false);
                        fetchGymPackage(); // Tải lại danh sách gói tập sau khi cập nhật
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra:', error);
                        message.error('Cập nhật thất bại. Vui lòng thử lại!');
                    });
            }
            else if (selectedMenuKey === 'sub5-2') {
                const id = recordToEdit.id;
                // Dữ liệu gói tập
                const classData = {
                    className: values.className,
                    description: values.description,
                    maxParticipants: values.maxParticipants,
                    classDate: values.classDate.format("YYYY-MM-DD"),
                    startTime: values.startTime.format("HH:mm"),
                    endTime: values.endTime.format("HH:mm"),
                    price: values.price,
                    trainerId: values.trainerId,
                    serviceId: values.serviceId
                };

                // Gửi yêu cầu PUT với dữ liệu gói tập
                axios.put(`http://localhost:3002/class/update/${id}`, classData)
                    .then(response => {
                        message.success('Cập nhật gói tập thành công!');
                        setEditModalVisible(false);
                        fetchClass(); // Tải lại danh sách gói tập sau khi cập nhật
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra:', error);
                        message.error('Cập nhật thất bại. Vui lòng thử lại!');
                    });
            }

        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };



    //Hàm ok thì thêm mới
    const handleAddModalOk = () => {
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-1') {
                // Dữ liệu gói tập
                const gymPackageData = {
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    weeks: values.weeks,
                    sessionsPerWeek: values.sessionsPerWeek,
                    durationInMonths: values.durationInMonths,
                    serviceId: values.serviceId
                };

                // Thêm dữ liệu và cập nhật state trực tiếp
                addGymPackage(gymPackageData);
                setAddModalVisible(false);

            } else if (selectedMenuKey === 'sub2-2') {
                const serviceData = new FormData();
                serviceData.append('serviceName', values.serviceName);
                serviceData.append('description', values.description);
                serviceData.append('content', values.content);
                serviceData.append('layout', values.layout);
                serviceData.append('type', values.type);

                if (values.file && values.file.fileList && values.file.fileList.length > 0) {
                    serviceData.append('image', values.file.fileList[0].originFileObj);
                } else {
                    console.error('File không hợp lệ hoặc không tồn tại');
                    return;
                }
                addService(serviceData);
                setAddModalVisible(false);


            } else if (selectedMenuKey === 'sub5-1') {
                const trainerData = new FormData();
                trainerData.append('trainerName', values.trainerName);
                trainerData.append('gender', values.gender);
                trainerData.append('bio', values.bio);
                trainerData.append('experience_years', values.experience_years);
                // Thêm các serviceIds vào FormData
                trainerData.append('serviceIds', values.serviceIds.join(','));

                if (values.file && values.file.fileList && values.file.fileList.length > 0) {
                    trainerData.append('image', values.file.fileList[0].originFileObj);
                } else {
                    console.error('File không hợp lệ hoặc không tồn tại');
                    return;
                }

                addTrainer(trainerData);
                setAddModalVisible(false);
            } else if (selectedMenuKey === 'sub5-2') {

                const classData = {
                    className: values.className,
                    description: values.description,
                    maxParticipants: values.maxParticipants,
                    classDate: values.classDate.format("YYYY-MM-DD"),
                    startTime: values.startTime.format("HH:mm"),
                    endTime: values.endTime.format("HH:mm"),
                    price: values.price,
                    trainerId: values.trainerId,
                    serviceId: values.serviceId
                };

                // Thêm dữ liệu và cập nhật state trực tiếp
                addClass(classData);
                fetchClass();
                setAddModalVisible(false);

            } else if (selectedMenuKey === 'sub6-1') {
                //Khuyến mãi
                const promotionData = {
                    name: values.name,
                    description: values.description,
                    discountPercent: values.discountPercent,
                    code: values.code,
                    type: values.type,
                    startDate: values.startDate.format("YYYY-MM-DD"),
                    endDate: values.endDate.format("YYYY-MM-DD"),
                    gym_package_id: values.gym_package_id
                };

                // Thêm dữ liệu và cập nhật state trực tiếp
                addPromotion(promotionData);
                setAddModalVisible(false);

            }
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    //Nút ok khi xóa
    const handleDeleteModalOk = () => {
        if (recordToDelete) {
            try {
                // Xóa dữ liệu từ server
                switch (selectedMenuKey) {
                    case 'sub2-1':
                        // Xóa dịch vụ với ID tương ứng
                        axios.delete(`http://localhost:3002/gymPackage/deleteGymPackage/${recordToDelete.id}`)
                            .then(response => {
                                message.success('Xóa gói tập thành công!');
                                // Tải lại danh sách dịch vụ hoặc cập nhật state nếu cần
                                fetchGymPackage();
                            })
                            .catch(error => {
                                console.error('Lỗi khi xóa gói tập:', error);
                                message.error('Không thể xóa gói tập này do đang có đơn hàng hoặc mã giảm giá liên kết. Vui lòng kiểm tra trước khi thực hiện');
                            });
                        break;
                    case 'sub2-2':
                        // Xóa dịch vụ với ID tương ứng
                        axios.delete(`http://localhost:3002/service/deleteService/${recordToDelete.id}`)
                            .then(response => {
                                message.success('Xóa dịch vụ thành công!');
                                // Tải lại danh sách dịch vụ hoặc cập nhật state nếu cần
                                fetchService();
                            })
                            .catch(error => {
                                console.error('Lỗi khi xóa dịch vụ:', error);
                                message.error('Không thể xóa dịch vụ này do đang có gói tập hoặc huấn luyện viên liên kết. Vui lòng kiểm tra trước khi thực hiện');
                            });
                        // Xóa người dùng
                        break;
                    case 'sub5-1':
                        // Xóa dịch vụ với ID tương ứng
                        axios.delete(`http://localhost:3002/trainer/deleteTrainer/${recordToDelete.id}`)
                            .then(response => {
                                message.success('Xóa thành công!');
                                // Tải lại danh sách dịch vụ hoặc cập nhật state nếu cần
                                fetchTrainer();
                            })
                            .catch(error => {
                                console.error('Lỗi khi xóa dịch vụ:', error);
                                message.error('Không thể xóa huấn luyện viên vì còn lịch làm việc hoặc hóa đơn liên kết. Hãy xóa lịch làm việc hoặc hóa đơn liên quan');
                            });
                        // Xóa người dùng
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
            setDeleteModalVisible(false);

        }

    };
    //Nút cancel
    const handleModalCancel = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
        setSelectTypeVisible(false);
        setscheduleModalVisible(false)

    };


    const handleMenuClick = ({ key }) => {
        setSelectedMenuKey(key);
    };
    //Hàm lưu dữ liệu datasource
    useEffect(() => {
        switch (selectedMenuKey) {
            case 'sub1':
                setDataSource(user);
                break;
            case 'sub2-1':
                setDataSource(gymPackage);
                break;
            case 'sub2-2':
                setDataSource(service);
                break;
            case 'sub3':
                setDataSource(order);
                break;
            case 'sub5-1':
                setDataSource(trainer);
                break;
            case 'sub5-2':
                setDataSource(trainerClass);
                break;
            case 'sub6-1':
                setDataSource(promotion);
                break;
            default:
                break;
        }
    }, [selectedMenuKey, service, user, order, trainer, trainerClass, trainerSchedule, promotion]);

    const handleAddNewRecord = () => {
        setAddModalVisible(true);
        form.resetFields();
    };

    const handleOpenAddScheduleModal = () => {
        form.setFieldsValue({ trainerId: selectedTrainerId }); // Gán giá trị ID huấn luyện viên
        setAddScheduleModalVisible(true);
    };



    //nút xóa
    const handleSelectType = () => {
        setSelectTypeVisible(true);
    };

    const userColumns = [
        {
            title: 'Tên',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleDateString()
        },

        {
            title: 'Số ngày là thành viên',
            dataIndex: 'createdAt',
            render: (date) => {
                const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
                return `${days} ngày`;
            },
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const serviceColumns = [
        {
            title: 'Tên',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => {
                if (!record || !record.image) {
                    return <span>Đang tải...</span>;
                }
                return (
                    <img
                        src={`/images/${record.image}`}

                        style={{ maxWidth: '200px' }}
                    />
                );
            },
        },


        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const gymPackageColums = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (description) => {
                // Kiểm tra nếu description là chuỗi
                return typeof description === 'string' ? description.replace(/<[^>]+>/g, '') : 'Không có mô tả'; // Loại bỏ thẻ HTML
            },
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                // Kiểm tra xem price có phải là số không
                if (typeof price === 'string') {
                    // Nếu price là chuỗi (ví dụ: '500000.00'), chuyển đổi nó thành số
                    const priceNumber = parseFloat(price);
                    return priceNumber.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
                return price; // Trả về giá trị gốc nếu không phải là số hoặc chuỗi hợp lệ
            },
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service', // Sử dụng trường service
            key: 'service',
            render: (service) => service ? service.serviceName : 'Không có dịch vụ', // Hiển thị tên dịch vụ
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const trainerColumns = [
        {
            title: 'Tên HLV',
            dataIndex: 'trainerName',
            key: 'trainerName',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience_years',
            key: 'experience_years',
        },
        {
            title: 'Thông tin',
            dataIndex: 'bio', // Thay đổi để lấy thông tin từ trường bio
            key: 'bio',
            render: (bio) => {
                // Kiểm tra nếu bio là chuỗi
                return typeof bio === 'string' ? bio.replace(/<[^>]+>/g, '') : 'Không có thông tin'; // Loại bỏ thẻ HTML
            },
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => {
                if (!record || !record.image) {
                    return <span>Đang tải...</span>;
                }
                return (
                    <img
                        src={`/images/${record.image}`}
                        alt={record.packageName || 'Package Image'}
                        style={{ maxWidth: '200px' }}
                    />
                );
            },
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                    <Button type="link" icon={<CalendarOutlined />} onClick={() => handleSchedule(record)}>Date</Button>
                </span>
            ),
        },
    ];

    const trainerScheduleColumns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Thứ',
            dataIndex: 'day_of_week',
            key: 'day_of_week',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const promotionColumns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'promotionname',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Phần trăm giảm',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
        },
        {
            title: 'Mã giảm giá',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Sự kiện',
            dataIndex: 'type',
            key: 'type',
        },

        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const classColumns = [
        {
            title: 'Tên lớp học',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Số học viên tối đa',
            dataIndex: 'maxParticipants',
            key: 'maxParticipants',
        },
        {
            title: 'Ngày học',
            dataIndex: 'classDate',
            key: 'classDate',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        style={{ marginRight: 16 }}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];




    // Cột dữ liệu cho bảng Order
    // Cột dữ liệu cho bảng Order
    const OrderColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Người đặt hàng',
            dataIndex: 'user',
            key: 'user',
            render: (user) => <span>{user?.username || 'N/A'}</span>,
        },
        {
            title: 'Giá',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (totalAmount) => {
                if (typeof totalAmount === 'string') {
                    const priceNumber = parseFloat(totalAmount);
                    return priceNumber.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
                return totalAmount;
            },
        },
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },

        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => fetchOrderDetail(record.id)}>Xem</Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];


    // Cột dữ liệu cho bảng Order Detail
    const OrderDetailColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Trainer',
            dataIndex: 'trainer',
            key: 'trainer',
            render: (trainer) => trainer?.trainerName || 'N/A',
        },
        {
            title: 'Gói tập',
            dataIndex: 'gymPackage',
            key: 'gymPackage',
            render: (gymPackage) => gymPackage?.name || 'N/A',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        {
            title: 'Ngày',
            dataIndex: 'sessionDate',
            key: 'sessionDate',
            render: (text, record) => {
                // Kết hợp ngày và giờ lại với nhau
                const sessionDate = new Date(record.sessionDate);
                const sessionTime = record.sessionTime;

                // Định dạng lại ngày theo ý muốn
                const formattedDate = sessionDate.toLocaleDateString(); // Ví dụ: 'dd/mm/yyyy'

                return `${formattedDate} ${sessionTime}`; // Kết hợp ngày và giờ
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let displayStatus = '';
                let color = '';

                // Kiểm tra trạng thái và gán giá trị cho `displayStatus` và `color`
                if (status === 'pending') {
                    displayStatus = 'Chưa hoàn thành';
                    color = 'red';
                } else if (status === 'completed') {
                    displayStatus = 'Hoàn thành';
                    color = 'green';
                } else {
                    displayStatus = 'Không xác định';
                    color = 'gray';
                }

                return (
                    <span style={{ color, fontWeight: 'bold' }}>
                        {displayStatus}
                    </span>
                );
            },
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'promotion',
            key: 'promotion',
            render: (promotion) => promotion?.description || 'Không có',
        },
    ];

    const handleSelectionChange = (selectedRowKeys, selectedRows) => {
        setSelectedUserKeys(selectedRowKeys);
        setSelectedUsers(selectedRows);

    };




    //lấy bảng
    const getColumns = () => {
        switch (selectedMenuKey) {
            case 'sub1':
                return userColumns;
            case 'sub2-1':
                return gymPackageColums;
            case 'sub2-2':
                return serviceColumns;
            case 'sub3':
                return OrderColumns;
            case 'sub5-1':
                return trainerColumns;
            case 'sub5-2':
                return classColumns;
            case 'sub6-1':
                return promotionColumns;
            case 'sub6-2':
                return userColumns;
            default:
                return [];
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleOk = async () => {
        try {
            console.log('Selected send type:', sendType);
            console.log('Selected promotion ID:', selectedPromotionId);

            // Xử lý từng loại gửi
            if (sendType === "all") {
                console.log('Sending promotion to all users...');
                const response = await axios.post('http://localhost:3002/promotion/assign/all', {
                    sendType: "all",
                    promotionId: selectedPromotionId,
                });
                console.log('Response from server:', response.data);
            } else if (sendType === "old") {
                console.log(`Sending promotion to old users registered before ${registeredBefore} days...`);
                const response = await axios.post('http://localhost:3002/promotion/assign/old', {
                    sendType: "old",
                    promotionId: selectedPromotionId,
                    daysSinceRegistration: registeredBefore,
                });
                console.log('Response from server:', response.data);
            } else if (sendType === "individual") {
                console.log('Sending promotion to individual users:', selectedUsers);
                const response = await axios.post('http://localhost:3002/promotion/assign', {
                    userIds: selectedUsers.map(user => user.id),
                    promotionId: selectedPromotionId,
                });
                console.log('Response from server:', response.data);
            } else {
                console.error('Invalid send type selected.');
                return;
            }

            // Hiển thị thông báo thành công
            console.log('Promotion assigned successfully!');
            handleModalCancel(); // Đóng modal sau khi gửi thành công
        } catch (error) {
            console.error('Error sending promotion:', error);
            // Hiển thị thông báo lỗi nếu cần
        }
    };

    // Gọi lại mỗi khi selectedOrderId thay đổi


    return (
        <Layout className="min-h-screen bg-gray-900 text-white">
            {/* Modern Header */}
            <Header className="flex items-center justify-between px-6 h-16 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-6">
                    <img
                        src="/images/logo.png"
                        alt="Gym Logo"
                        className="h-8 brightness-0 invert"
                    />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        className="bg-transparent border-0 min-w-[400px] text-gray-300"
                    />
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700">
                    <Avatar
                        size={36}
                        icon={<UserOutlined />}
                        className="bg-gray-600"
                    />
                    <Text className="text-white font-semibold">
                        Trần Huỳnh Thưc
                    </Text>
                </div>
            </Header>

            {/* Main Content Area */}
            <Content className="p-6 bg-gray-900">
                <Breadcrumb className="mb-4 text-gray-400" />

                <Layout className="rounded-xl overflow-hidden shadow-lg bg-gray-800">
                    {/* Sidebar */}
                    <Sider className="bg-gray-800 p-4" width={280}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['sub4']}
                            defaultOpenKeys={['sub4']}
                            className="border-0 bg-transparent text-gray-300"
                            items={items2}
                            onClick={handleMenuClick}
                            theme="dark"
                        />
                    </Sider>

                    {/* Page Content */}
                    <Content className="p-8 bg-gray-900 text-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-4">
                                {/* Chỉ hiển thị nút "Add New" nếu không phải là sub6-2 */}
                                {selectedMenuKey !== 'sub6-2' && selectedMenuKey !== 'sub7' && selectedMenuKey !== 'sub8' && (
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={handleAddNewRecord}
                                        className="h-10 px-4 bg-blue-600 hover:bg-blue-500 font-medium flex items-center gap-2"
                                    >
                                        Add New
                                    </Button>
                                )}

                                {/* Chỉ hiển thị nút "Gửi mã" nếu đang ở sub6-2 */}
                                {selectedMenuKey === 'sub6-1' && (
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        onClick={handleSelectType}
                                        className="h-10 px-4 bg-blue-600 hover:bg-blue-500 font-medium flex items-center gap-2"
                                    >
                                        Gửi mã giảm giá
                                    </Button>
                                )}
                            </div>
                        </div>
                        {selectedMenuKey === 'sub7' ? (
                            <QRCodeScanner
                                onScan={(data) => {
                                    console.log('Quét mã thành công:', data);
                                    // Xử lý dữ liệu quét được tại đây
                                }}
                            />
                        ) : selectedMenuKey === 'sub4' ? (
                            <RevenueChart period={period} /> // Gọi component biểu đồ tại đây
                        ) : selectedMenuKey === 'sub8' ? (
                            <NotificationConfig /> // Gọi component biểu đồ tại đây
                        ) : (
                            <Table
                                dataSource={dataSource}
                                columns={getColumns()}
                                pagination={false}
                                rowSelection={{
                                    type: 'checkbox',
                                    selectedRowKeys: selectedUserKeys,
                                    onChange: handleSelectionChange,
                                    selections: [
                                        Table.SELECTION_ALL,
                                        Table.SELECTION_NONE,
                                    ],
                                }}
                                rowKey="id" // Đảm bảo dữ liệu người dùng có trường 'id'
                                className="shadow-sm rounded-lg overflow-hidden bg-gray-800 text-gray-200"
                            />
                        )}
                    </Content>
                </Layout>
            </Content>

            {/* Footer */}
            <Footer className="text-center text-gray-400 bg-gray-800 border-t border-gray-700">
                PTGAMING ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
            <Modal
                title="Chọn sự kiện và cách gửi"
                visible={selectTypeModalVisible}
                onCancel={handleModalCancel}
                onOk={handleOk}
            >
                {/* Loại gửi */}
                <Form.Item
                    name="sendType"
                    label="Hình thức gửi"
                    rules={[{ required: true, message: 'Vui lòng chọn hình thức gửi!' }]}
                >
                    <Select
                        placeholder="Chọn hình thức gửi"
                        onChange={(value) => setSendType(value)} // Lưu loại gửi được chọn
                    >
                        <Option value="all">Gửi cho tất cả user</Option>
                        <Option value="old">Gửi cho user cũ</Option>
                        <Option value="individual">Gửi cho từng user</Option>
                    </Select>
                </Form.Item>

                {/* Chọn mã giảm giá */}
                <Form.Item
                    name="promotion"
                    label="Mã giảm giá"
                    rules={[{ required: true, message: 'Vui lòng chọn mã giảm giá!' }]}
                >
                    <Select
                        placeholder="Chọn mã giảm giá"
                        onChange={(value) => setSelectedPromotionId(value)} // Lưu promotionId
                    >
                        {promotion.map((promo) => (
                            <Option key={promo.id} value={promo.promotionId}>
                                {promo.code}: {promo.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Tùy chọn gửi cho từng user */}
                {sendType === "individual" && (
                    <Form.Item
                        name="users"
                        label="Người dùng"
                        rules={[{ required: true, message: 'Vui lòng chọn user!' }]}
                    >
                        <Select
                            mode="multiple" // Bật chế độ chọn nhiều
                            placeholder="Chọn user"
                            onChange={(selectedIds) => {
                                // Lọc ra danh sách user đầy đủ dựa trên id được chọn
                                const selectedUserDetails = user.filter((u) => selectedIds.includes(u.id));
                                setSelectedUsers(selectedUserDetails); // Lưu danh sách user đầy đủ
                            }}
                        >
                            {user.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.username} ({user.email})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {/* Ô nhập số khi chọn old */}
                {sendType === "old" && (
                    <Form.Item
                        name="registeredBefore"
                        label="Số ngày đăng ký"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số ngày!' },
                            { type: 'number', min: 1, message: 'Số ngày phải lớn hơn 0' },
                        ]}
                    >
                        <InputNumber
                            placeholder="Nhập số ngày đăng ký"
                            min={1}
                            onChange={(value) => setRegisteredBefore(value)}
                        />
                    </Form.Item>
                )}
            </Modal>




            <Modal
                title="Chỉnh Sửa"
                visible={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleModalCancel}
                width={1000}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub1' && (
                        <>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item
                                name="name"
                                label="Tên gói"
                                rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <CustomQuillEditor
                                    placeholder="Mô tả sản phẩm"
                                />
                            </Form.Item>

                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá' },
                                    { validator: validatePrice }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item
                                name="weeks"
                                label="Số tuần"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="sessionsPerWeek"
                                label="Số buổi mỗi tuần"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="durationInMonths"
                                label="Thời gian gói tập (tháng)"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="serviceId"
                                label="Loại dịch vụ"
                            >
                                <Select
                                    placeholder="Chọn dịch vụ"
                                >
                                    <Option value={undefined}>Không chọn dịch vụ</Option> {/* Tùy chọn không chọn */}
                                    {service.map((serviceItem) => (
                                        <Option key={serviceItem.id} value={serviceItem.id}>
                                            {serviceItem.serviceName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <>
                            <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Please input the description!' }]}>
                                {/* Use ReactQuill for rich text editor */}
                                <CustomQuillEditor
                                    placeholder="Nội dung"
                                />
                            </Form.Item>
                            <Form.Item name="file" label="Ảnh">
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                name="layout"
                                label="Kiểu hiển thị"
                                rules={[{ required: true, message: 'Please select a layout!' }]}
                            >
                                <Select placeholder="Chọn kiểu hiển thị">
                                    <Option value="image-left">Hình bên trái</Option>
                                    <Option value="image-right">Hình bên phải</Option>
                                </Select>
                            </Form.Item>
                        </>
                    )}

                    {selectedMenuKey === 'sub3' && (
                        <>
                            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Please input the order ID!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: 'Please input the customer!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="total" label="Total" rules={[{ required: true, message: 'Please input the total!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub5-1' && (
                        <>

                            <Form.Item name="trainerName" label="Tên HLV" rules={[{ required: true, message: 'Vui lòng nhập tên HLV' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="bio" label="Thông tin" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                                <CustomQuillEditor placeholder="Nội dung" />
                            </Form.Item>
                            <Form.Item name="experience_years" label="Kinh nghiệm" rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng nhập giới tính' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="serviceIds" label="Dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn ít nhất một dịch vụ' }]}>
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn dịch vụ"
                                    onChange={(value) => form.setFieldsValue({ serviceIds: value })}
                                >
                                    {service.map((service) => (
                                        <Option key={service.id} value={service.serviceId}>
                                            {service.serviceName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload beforeUpload={() => false} listType="picture" onChange={(info) => form.setFieldsValue({ file: info })}>
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub5-2' && (
                        <>
                            <Form.Item
                                name="className"
                                label="Tên lớp học"
                                rules={[{ required: true, message: 'Vui lòng nhập tên lớp học!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả lớp học!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="maxParticipants"
                                label="Số học viên tối đa"
                                rules={[{ required: true, message: 'Vui lòng nhập số học viên tối đa!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item
                                name="classDate"
                                label="Ngày học"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày học!' }]}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item
                                name="start_time"
                                label="Thời gian bắt đầu"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={30}
                                />
                            </Form.Item>

                            <Form.Item
                                name="end_time"
                                label="Thời gian kết thúc"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={30}
                                />
                            </Form.Item>

                            <Form.Item
                                name="trainerId"
                                label="HLV"
                                rules={[{ required: true, message: 'Vui lòng chọn HLV!' }]}
                            >
                                <Select
                                    placeholder="Chọn HLV"
                                    className="w-full"
                                >
                                    {trainer.map((trainer) => (
                                        <Option key={trainer.id} value={trainer.trainerId}>
                                            {trainer.trainerName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="serviceId"
                                label="Dịch vụ"
                                rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                            >
                                <Select placeholder="Chọn dịch vụ" className="w-full">
                                    {service.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.serviceName}: {s.type === 'CLASS_BASED' ? 'Lớp học nhóm' : s.type === 'PERSONAL_TRAINING' ? 'Huấn luyện viên cá nhân' : s.type}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                        </>
                    )}


                </Form>
            </Modal>

            <Modal
                title="Xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleModalCancel}
            >
                <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
            </Modal>



            <Modal
                title="Thêm Mới"
                visible={addModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item
                                name="name"
                                label="Tên gói"
                                rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <CustomQuillEditor
                                    placeholder="Mô tả sản phẩm"
                                />
                            </Form.Item>

                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá' },
                                    { validator: validatePrice }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item
                                name="weeks"
                                label="Số tuần"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="sessionsPerWeek"
                                label="Số buổi mỗi tuần"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="durationInMonths"
                                label="Thời gian gói tập (tháng)"

                            >
                                <Input type="number" min={1} />
                            </Form.Item>

                            <Form.Item
                                name="serviceId"
                                label="Loại dịch vụ"
                            >
                                <Select
                                    placeholder="Chọn dịch vụ"
                                >
                                    <Option value={undefined}>Không chọn dịch vụ</Option> {/* Tùy chọn không chọn */}
                                    {service.map((serviceItem) => (
                                        <Option key={serviceItem.id} value={serviceItem.id}>
                                            {serviceItem.serviceName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <>
                            <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                                {/* Use ReactQuill for rich text editor */}
                                <CustomQuillEditor
                                    placeholder="Nội dung"
                                />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="Loại dịch vụ"
                                rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                            >
                                <Select placeholder="Chọn dịch vụ bạn muốn">
                                    <Option value="CLASS_BASED">Lớp học nhóm</Option>
                                    <Option value="PERSONAL_TRAINING">Huấn luyện viên cá nhân</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>

                            </Form.Item>
                            <Form.Item
                                name="layout"
                                label="Kiểu hiển thị"
                                rules={[{ required: true, message: 'Vui lòng chọn hiện thị' }]}
                            >
                                <Select placeholder="Chọn kiểu hiển thị">
                                    <Option value="image-left">Hình bên trái</Option>
                                    <Option value="image-right">Hình bên phải</Option>
                                </Select>
                            </Form.Item>
                        </>


                    )}
                    {selectedMenuKey === 'sub5-1' && (
                        <>
                            <Form.Item name="trainerName" label="Tên HLV" rules={[{ required: true, message: 'Vui lòng nhập tên HLV!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="bio" label="Thông tin" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
                                <CustomQuillEditor
                                    placeholder="Nội dung"
                                />
                            </Form.Item>
                            <Form.Item name="experience_years" label="Kinh nghiệm" rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng giới tính' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item
                                name="serviceIds"
                                label="Dịch vụ"
                                rules={[{ required: true, message: 'Vui lòng chọn ít nhất một dịch vụ' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn dịch vụ"
                                >
                                    {service.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.serviceName}: {s.type === 'CLASS_BASED' ? 'Lớp học nhóm' : s.type === 'PERSONAL_TRAINING' ? 'Huấn luyện viên cá nhân' : s.type}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>




                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>

                            </Form.Item>

                        </>


                    )}
                    {selectedMenuKey === 'sub5-2' && (
                        <>
                            <Form.Item
                                name="className"
                                label="Tên lớp học"
                                rules={[{ required: true, message: 'Vui lòng nhập tên lớp học!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả lớp học!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="maxParticipants"
                                label="Số học viên tối đa"
                                rules={[{ required: true, message: 'Vui lòng nhập số học viên tối đa!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá' },
                                    { validator: validatePrice }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item
                                name="classDate"
                                label="Ngày học"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày học!' }]}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateChange}
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item
                                name="startTime"
                                label="Thời gian bắt đầu"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}
                                help="Chọn thời gian bắt đầu trong khoảng 9:00 đến 22:00"
                            >
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={30}
                                    disabledHours={() => {
                                        const hours = [];
                                        for (let i = 0; i < 24; i++) {
                                            if (i < 9 || i > 21) hours.push(i);
                                        }
                                        return hours;
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="endTime"
                                label="Thời gian kết thúc"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}
                                help="Chọn thời gian kết thúc trong khoảng 9:00 đến 22:00"
                            >
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={30}
                                    disabledHours={() => {
                                        const hours = [];
                                        for (let i = 0; i < 24; i++) {
                                            if (i < 9 || i > 21) hours.push(i);
                                        }
                                        return hours;
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="trainerId"
                                label="HLV"
                                rules={[{ required: true, message: 'Vui lòng chọn HLV!' }]}
                            >
                                <Select
                                    placeholder="Chọn HLV"
                                    className="w-full"
                                >
                                    {trainer.map((trainer) => (
                                        <Option key={trainer.id} value={trainer.trainerId}>
                                            {trainer.trainerName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="serviceId"
                                label="Dịch vụ"
                                rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                            >
                                <Select placeholder="Chọn dịch vụ" className="w-full">
                                    {service.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.serviceName}: {s.type === 'CLASS_BASED' ? 'Lớp học nhóm' : s.type === 'PERSONAL_TRAINING' ? 'Huấn luyện viên cá nhân' : s.type}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                        </>
                    )}
                    {selectedMenuKey === 'sub6-1' && (
                        <>
                            <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}>
                                <Input />

                            </Form.Item>

                            <Form.Item
                                name="discountPercent" // Trường lưu số tương ứng
                                label="Phần trăm giảm giá"
                                rules={[{ required: true, message: 'Vui lòng phần trăm' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="code" // Trường lưu số tương ứng
                                label="Code giảm giá"
                                rules={[{ required: true, message: 'Vui lòng nhập code' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="startDate"
                                label="Thời gian bắt đầu"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}

                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateChange}
                                    className="w-full"
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="Thời gian kết thúc"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}

                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateChange}
                                    className="w-full"
                                />
                            </Form.Item>


                            <Form.Item
                                name="type"
                                label="Sự kiện"
                                rules={[{ required: true, message: 'Vui lòng chọn sự kiện!' }]}
                            >
                                <Select placeholder="Chọn kiểu hiển thị">
                                    <Option value="public">Tất cả user</Option>
                                    <Option value="special">Dịp lễ</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="gym_package_id"
                                label="Gói tập"
                            >
                                <Select
                                    placeholder="Chọn gói tập"
                                    className="w-full"
                                >
                                    {gymPackage.map((gymPackage) => (
                                        <Option key={gymPackage.id} value={gymPackage.gym_package_id}>
                                            {gymPackage.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </>



                    )}
                </Form>
            </Modal>

            <Modal
                title="Schedule"
                onOk={handleDeleteModalOk}
                visible={scheduleModalVisible}
                onCancel={handleModalCancel}
                // Không hiển thị các nút footer nếu không cần thiết
                width={1250} // Đặt chiều rộng của Modal nếu cần
            >
                <Table dataSource={trainerSchedule} columns={trainerScheduleColumns} rowKey="id" pagination={false} />
                <Button
                    type="dashed"
                    style={{ marginTop: 16 }}
                    icon={<PlusOutlined />}
                    onClick={handleOpenAddScheduleModal}
                // Mở modal thêm lịch trình
                >
                    Thêm lịch trình
                </Button>


            </Modal>
            <Modal
                title="Thêm lịch trình"
                visible={addScheduleModalVisible}
                onCancel={() => setAddScheduleModalVisible(false)} // Đóng modal khi nhấn Cancel
                onOk={() => form.submit()} // Submit form khi nhấn OK
            >
                <Form
                    form={form} // Liên kết với instance form để quản lý các trường
                    layout="vertical" // Tùy chọn layout của form
                    onFinish={handleAddSchedule} // Hàm xử lý khi form được submit
                >
                    <Form.Item
                        name="date"
                        label="Ngày"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            onChange={handleDateChange}
                            className="w-full"
                        />
                    </Form.Item>

                    <Form.Item
                        name="day_of_week_display" // Trường hiển thị tên thứ
                        label="Thứ"
                        rules={[{ required: true, message: 'Vui lòng nhập thứ!' }]}
                    >
                        <Input
                            readOnly
                            className="w-full bg-gray-50"
                            placeholder="Tự động điền khi chọn ngày"
                        />
                    </Form.Item>

                    <Form.Item
                        name="day_of_week" // Trường lưu số tương ứng
                        style={{ display: 'none' }} // Ẩn trường này khỏi giao diện
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="start_time"
                        label="Thời gian bắt đầu"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}
                        help="Chọn thời gian bắt đầu trong khoảng 9:00 đến 22:00"
                    >
                        <TimePicker
                            format="HH:mm"
                            minuteStep={30}
                            disabledHours={() => {
                                const hours = [];
                                for (let i = 0; i < 24; i++) {
                                    if (i < 9 || i > 21) hours.push(i);
                                }
                                return hours;
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="end_time"
                        label="Thời gian kết thúc"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}
                        help="Chọn thời gian kết thúc trong khoảng 9:00 đến 22:00"
                    >
                        <TimePicker
                            format="HH:mm"
                            minuteStep={30}
                            disabledHours={() => {
                                const hours = [];
                                for (let i = 0; i < 24; i++) {
                                    if (i < 9 || i > 21) hours.push(i);
                                }
                                return hours;
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="trainerId"
                        label="Huấn luyện viên"
                    >
                        <Input readOnly className="w-full bg-gray-50" />
                    </Form.Item>
                </Form>
                {/* Modal hiển thị chi tiết Order */}

            </Modal>
            <Modal
                title="Chi tiết đơn hàng"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null} // Ẩn footer của modal
                width={1000} // Tăng chiều rộng của Modal
            >
                <Table
                    dataSource={orderDetail}
                    columns={OrderDetailColumns}
                    rowKey="id"
                    pagination={false} // Ẩn phân trang trong modal
                />
            </Modal>



            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
            />


        </Layout>
    );
};



export default DashboardPage;