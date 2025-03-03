import { QRCodeDTO } from "../dto/order.dto";
export const orderConfirmationTemplate = (orderDetails: any, qrCodes: QRCodeDTO[], isClassOrder: boolean) => {
    const groupedSessions = orderDetails.orderDetails.map((detail: any) => {
        return `${detail.sessionDate} vào lúc ${detail.sessionTime}`;
    }).join('<br>');

    const qrCodeImages = qrCodes.map((qrCode: any) => `<img src="${qrCode.qrCode}" alt="QR Code" />`).join('<br>');

    if (isClassOrder) {
        return `
        <h2>Xác nhận đặt lớp học thành công</h2>
        <p>Cảm ơn bạn đã đặt lịch học. Dưới đây là chi tiết lớp học của bạn:</p>

        <h3>Chi tiết lớp học:</h3>
        <p><strong>Tên lớp: </strong>${orderDetails.orderDetails[0]?.trainerClass?.className || 'Không xác định'}</p>
        <p><strong>Ngày và thời gian: </strong>${groupedSessions}</p>
        <p><strong>Huấn luyện viên: </strong>${orderDetails.orderDetails[0]?.trainer?.trainerName || 'Không xác định'}</p>
        <p><strong>Giá: </strong>${orderDetails.orderDetails[0]?.price || 'Không xác định'}</p>
        <p>Tổng số tiền: ${orderDetails.totalAmount || 'Không xác định'}</p>

        <h3>Mã QR:</h3>
        ${qrCodeImages}

        <p>Chúc bạn có buổi học vui vẻ!</p>
        `;
    }

    // Mặc định cho đơn hàng gym package
    return `
    <h2>Xác nhận đặt lịch tập gym thành công</h2>
    <p>Cảm ơn bạn đã đặt lịch tập. Dưới đây là chi tiết lịch tập của bạn:</p>

    <h3>Chi tiết đơn hàng:</h3>
    <p><strong>Gói tập: </strong>${orderDetails.orderDetails[0]?.gymPackage?.name || 'Không xác định'}</p>
    <p><strong>Ngày và thời gian: </strong>${groupedSessions}</p>
    <p><strong>Huấn luyện viên: </strong>${orderDetails.orderDetails[0]?.trainer?.trainerName || 'Không xác định'}</p>
    <p><strong>Giá: </strong>${orderDetails.orderDetails[0]?.price || 'Không xác định'}</p>
    <p>Tổng số tiền: ${orderDetails.totalAmount || 'Không xác định'}</p>

    <h3>Mã QR:</h3>
    ${qrCodeImages}

    <p>Chúc bạn tập luyện hiệu quả!</p>
    `;
};







export const welcomeEmailTemplate = (userName: string, discountCode: string) => {
    return `
    <h2>Chào mừng bạn đến với chúng tôi, ${userName}!</h2>
    <p>Cảm ơn bạn đã đăng ký tài khoản. Chúng tôi rất vui mừng chào đón bạn gia nhập cộng đồng của chúng tôi!</p>
    <p>Để chào mừng bạn, chúng tôi muốn gửi tặng bạn một mã giảm giá đặc biệt:</p>
    <h3>Mã giảm giá: ${discountCode}</h3>
    <p>Mã này giảm 10% cho lần mua hàng tiếp theo của bạn.</p>
    <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
    <p>Chúc bạn có trải nghiệm tuyệt vời với dịch vụ của chúng tôi!</p>
    `;
};

// src/utils/email.templates.ts

export const promotionEmailTemplate = (promotionCode: string) => `
    <h2>Chào bạn!</h2>
    <p>Chúng tôi rất vui thông báo bạn nhận được một mã giảm giá đặc biệt!</p>
    <p><strong>Mã giảm giá của bạn: ${promotionCode}</strong></p>
    <p>Hãy sử dụng mã này để nhận ưu đãi khi mua gói tập luyện tiếp theo.</p>
    <p>Chúc bạn một ngày tốt lành!</p>
`;


export const expirationReminderTemplate = (userName: string) => `
    <h2>Xin chào ${userName},</h2>
    <p>Bạn chỉ còn lại 1 buổi tập. Hãy nhanh chóng gia hạn gói tập của mình để không bị gián đoạn.</p>
    <p>Chúng tôi rất hân hạnh được phục vụ bạn. Chúc bạn tập luyện hiệu quả!</p>
`;

export function upcomingSessionTemplate(userName: string, sessionDateTime: Date) {
    const formattedDateTime = sessionDateTime.toLocaleString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    return `
        <p>Chào ${userName},</p>
        <p>Chúng tôi muốn nhắc bạn về buổi tập sắp tới vào ${formattedDateTime}.</p>
        <p>Trân trọng,</p>
        <p>Fitness Gym</p>
    `;
}




