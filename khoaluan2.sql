-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 28, 2024 lúc 09:51 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `khoaluan2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gym_package`
--

CREATE TABLE `gym_package` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `weeks` int(11) DEFAULT NULL,
  `sessionsPerWeek` int(11) DEFAULT NULL,
  `durationInMonths` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `gym_package`
--

INSERT INTO `gym_package` (`id`, `name`, `description`, `price`, `weeks`, `sessionsPerWeek`, `durationInMonths`, `service_id`) VALUES
(10, 'Basic Fitness', '<ul><li>1vs1 với huấn luyện viên cá nhân</li><li>Tư vấn chế độ dinh dưỡng</li><li>Gói tập cơ bản với 3 buổi/tuần</li></ul>', 500000.00, 1, 3, NULL, 13),
(11, 'Premium Fitness', '<p>Gói tập nâng cao với 4 buổi/tuần</p><p>&nbsp;PT 1vs1</p><p>Tư vấn chế độ tập luyện cá nhân hóa</p><p><br></p>', 700000.00, 1, 4, NULL, 13),
(12, 'Express Fitness', '<p>Gói tập nhanh chóng, dành cho người bận rộn.</p><p>Bao gồm PT 1vs1&nbsp;</p><p>&nbsp;Với 2 buổi/tuần, kéo dài 15 ngày</p>', 800000.00, 2, 2, NULL, 13),
(13, 'Classic', '<p>PT 1vs1</p><p>1 buổi/ 1 tuần </p>', 250000.00, 1, 1, NULL, 13),
(16, 'Body Bump', '<p>BodyPump</p>', 250000.00, 1, 1, NULL, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification_config`
--

CREATE TABLE `notification_config` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `value` int(11) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notification_config`
--

INSERT INTO `notification_config` (`id`, `type`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'remaining_sessions', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(2, 'before_session_time', 1, '0000-00-00 00:00:00.000000', '2024-12-26 02:18:38.200844');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `totalAmount`, `status`, `createdAt`, `updatedAt`, `user_id`) VALUES
(34, 500000.00, 'pending', '2024-12-25 21:23:50.443271', '2024-12-25 21:23:50.443271', 5),
(35, 700000.00, 'pending', '2024-12-25 21:50:13.018608', '2024-12-25 21:50:13.018608', 5),
(36, 500000.00, 'pending', '2024-12-24 22:06:24.700432', '2024-12-25 22:06:49.366706', 5),
(37, 500000.00, 'completed', '2024-12-23 22:07:57.136627', '2024-12-25 22:08:13.334062', 5),
(38, 500000.00, 'completed', '2024-12-25 22:08:40.591699', '2024-12-25 22:08:40.591699', 5),
(39, 500000.00, 'completed', '2024-12-25 22:08:46.987380', '2024-12-25 22:08:46.987380', 5),
(40, 500000.00, 'completed', '2024-12-22 22:09:01.227389', '2024-12-25 22:10:01.755744', 5),
(42, 700000.00, 'pending', '2024-12-26 01:45:38.360561', '2024-12-26 01:45:38.360561', 5),
(43, 250000.00, 'pending', '2024-12-26 03:44:59.390277', '2024-12-26 03:44:59.390277', 5),
(44, 250000.00, 'pending', '2024-12-28 07:57:07.089682', '2024-12-28 07:57:07.089682', 5),
(45, 250000.00, 'pending', '2024-12-28 07:58:59.088674', '2024-12-28 07:58:59.088674', 5),
(46, 250000.00, 'pending', '2024-12-28 08:02:11.262733', '2024-12-28 08:02:11.262733', 5),
(47, 250000.00, 'pending', '2024-12-28 08:08:44.595297', '2024-12-28 08:08:44.595297', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `order_id` int(11) DEFAULT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `sessionDate` date NOT NULL,
  `sessionTime` time NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `promotion_id` int(11) DEFAULT NULL,
  `trainer_class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `price`, `createdAt`, `updatedAt`, `order_id`, `trainer_id`, `package_id`, `sessionDate`, `sessionTime`, `status`, `promotion_id`, `trainer_class_id`) VALUES
(17, 700000.00, '2024-12-25 21:50:13.061684', '2024-12-25 22:00:34.000000', 35, 17, 11, '2024-12-26', '20:00:00', 'completed', NULL, NULL),
(18, 700000.00, '2024-12-25 21:50:13.062911', '2024-12-25 22:00:34.000000', 35, 17, 11, '2024-12-26', '18:00:00', 'completed', NULL, NULL),
(19, 700000.00, '2024-12-25 21:50:13.068751', '2024-12-25 22:00:34.000000', 35, 17, 11, '2024-12-26', '19:00:00', 'completed', NULL, NULL),
(20, 700000.00, '2024-12-25 21:50:13.075005', '2024-12-25 22:00:34.000000', 35, 17, 11, '2024-12-26', '17:00:00', 'completed', NULL, NULL),
(21, 500000.00, '2024-12-24 22:06:24.712313', '2024-12-25 22:06:42.057056', 36, 17, 10, '2024-12-27', '09:00:00', 'pending', NULL, NULL),
(22, 500000.00, '2024-12-23 22:07:57.158168', '2024-12-25 22:08:07.366789', 37, 17, 10, '2024-12-27', '12:00:00', 'completed', NULL, NULL),
(23, 500000.00, '2024-12-22 22:09:01.237611', '2024-12-25 22:09:55.752161', 40, 18, 10, '2024-12-27', '12:00:00', 'completed', NULL, NULL),
(25, 700000.00, '2024-12-26 01:45:38.376328', '2024-12-26 01:45:38.376328', 42, 17, 11, '2024-12-27', '20:00:00', 'pending', NULL, NULL),
(26, 700000.00, '2024-12-26 01:45:38.377410', '2024-12-26 01:45:38.377410', 42, 17, 11, '2024-12-27', '19:00:00', 'pending', NULL, NULL),
(27, 700000.00, '2024-12-26 01:45:38.378320', '2024-12-26 01:45:38.378320', 42, 17, 11, '2024-12-27', '18:00:00', 'pending', NULL, NULL),
(28, 700000.00, '2024-12-26 01:45:38.379068', '2024-12-26 01:45:38.379068', 42, 17, 11, '2024-12-27', '17:00:00', 'pending', NULL, NULL),
(29, 250000.00, '2024-12-26 03:44:59.410414', '2024-12-26 03:44:59.410414', 43, 17, 13, '2024-12-27', '10:00:00', 'pending', NULL, NULL),
(30, 250000.00, '2024-12-28 07:57:07.103798', '2024-12-28 07:57:07.103798', 44, 17, 13, '2024-12-29', '09:00:00', 'pending', NULL, NULL),
(31, 250000.00, '2024-12-28 07:58:59.104827', '2024-12-28 07:58:59.104827', 45, 17, 13, '2024-12-29', '10:00:00', 'pending', NULL, NULL),
(32, 250000.00, '2024-12-28 08:02:11.269994', '2024-12-28 08:02:11.269994', 46, 17, 13, '2024-12-29', '11:00:00', 'pending', NULL, NULL),
(33, 250000.00, '2024-12-28 08:08:44.611667', '2024-12-28 08:08:44.611667', 47, 18, 13, '2024-12-29', '09:00:00', 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  `discountPercent` decimal(5,2) NOT NULL,
  `type` enum('welcome','public','special','gymPackage') NOT NULL DEFAULT 'welcome',
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `gym_package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `description`, `code`, `discountPercent`, `type`, `startDate`, `endDate`, `createdAt`, `updatedAt`, `gym_package_id`) VALUES
(8, 'TẾT 2025', 'Tết 2025', 'TET2025', 20.00, 'public', '2024-12-25', '2024-12-31', '2024-12-25 20:31:45.821839', '2024-12-25 20:31:45.821839', NULL),
(9, 'NOEL 2025', 'NOEL', 'NOEL2025', 20.00, 'public', '2024-12-25', '2024-12-31', '2024-12-25 20:32:44.967234', '2024-12-25 20:32:44.967234', NULL),
(10, 'Welcome Discount', 'Mã giảm giá chào mừng thành viên mới', 'WELCOME630OER', 20.00, 'welcome', '2024-12-28', '2025-01-27', '2024-12-28 08:15:06.842845', '2024-12-28 08:15:06.842845', NULL),
(11, 'Welcome Discount', 'Mã giảm giá chào mừng thành viên mới', 'WELCOME73OALK', 20.00, 'welcome', '2024-12-28', '2025-01-27', '2024-12-28 08:16:48.801821', '2024-12-28 08:16:48.801821', NULL),
(12, 'Welcome Discount', 'Mã giảm giá chào mừng thành viên mới', 'WELCOME8RDQ1F', 20.00, 'welcome', '2024-12-28', '2025-01-27', '2024-12-28 08:19:09.919486', '2024-12-28 08:19:09.919486', NULL),
(13, 'TẾT 2026', 'TẾT 2026', 'TET2026', 20.00, 'special', '2024-12-01', '2024-12-31', '2024-12-28 08:25:11.648079', '2024-12-28 08:25:11.648079', NULL),
(14, 'Welcome Discount', 'Mã giảm giá chào mừng thành viên mới', 'WELCOME9IM94X', 20.00, 'welcome', '2024-12-28', '2025-01-27', '2024-12-28 08:48:42.970649', '2024-12-28 08:48:42.970649', NULL),
(15, 'Welcome Discount', 'Mã giảm giá chào mừng thành viên mới', 'WELCOME10K0SJ9', 20.00, 'welcome', '2024-12-28', '2025-01-27', '2024-12-28 08:49:27.713317', '2024-12-28 08:49:27.713317', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `serviceName` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `layout` varchar(50) DEFAULT NULL,
  `type` enum('PERSONAL_TRAINING','CLASS_BASED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `service`
--

INSERT INTO `service` (`id`, `serviceName`, `description`, `content`, `image`, `layout`, `type`) VALUES
(13, 'Fitness PT', 'PT là gì?Trước khi giải đáp tập gym có huấn luyện viên giá bao nhiêu thì bạn cần biết PT là gì. PT là viết tắt của Personal Trainer nghĩa là huấn luyện viên cá nhân. PT là người sẽ hỗ trợ trực tiếp cho mỗi cá nhân, học viên trong một nghề nghiệp nào đó.', '<p><strong>PT là gì?</strong><img src=\"https://cali.vn/storage/app/media/Editors/628e0127e1e95tap-gym-co-huan-luyen-vien-gia-bao-nhieu-1.jpg\"><em>PT là gì?</em>Trước khi giải đáp tập gym có huấn luyện viên giá bao nhiêu<strong>&nbsp;</strong>thì bạn cần biết PT là gì. PT là viết tắt của Personal Trainer nghĩa là huấn luyện viên cá nhân. PT là người sẽ hỗ trợ trực tiếp cho mỗi cá nhân, học viên trong một nghề nghiệp nào đó. Trong bộ môn gym, PT gym có nhiệm vụ đồng hành, hỗ trợ, hướng dẫn học viên tập luyện theo hình thức 1:1 để giúp họ đạt được mục tiêu trong thời gian sớm nhất.<strong>Có nên thuê huấn luyện viên cá nhân (PT) khi tập gym?</strong>Với những người mới hoặc ai đang có kế hoạch tập gym, họ luôn có rất nhiều thắc mắc và câu hỏi rất được quan tâm là có nên thuê huấn luyện viên cá nhân hay không? Thực tế, so với việc tự tập thì tập cùng huấn luyện viên cá nhân bạn cần bỏ thêm một khoản chi phí. Đổi lại, bạn sẽ không phải tự mày mò tập luyện mà sẽ được huấn luyện viên giúp đỡ, quá trình tập cũng sẽ trở nên đơn giản hơn, mang lại kết quả cao hơn. Nếu không được hướng dẫn, chỉnh dáng, bạn sẽ rất dễ tập sai, gây biến dạng cơ thể, tập sai vùng cơ, mất thời gian vô ích. Do đó, nếu là người mới tập gym thì bạn nên thuê huấn luyện viên cá nhân để được hướng dẫn tập luyện bài bản, khoa học nhất.<strong>Tiêu chí lựa chọn PT cho người mới</strong><img src=\"https://cali.vn/storage/app/media/Editors/628e014e3a6f9tap-gym-co-huan-luyen-vien-gia-bao-nhieu-2.png\"><em>Huấn luyện viên cá nhân chất lượng sẽ hỗ trợ bạn tập luyện hiệu quả nhất</em>Có thế thấy, thuê huấn luyện viên thể hình<strong>&nbsp;</strong>là rất cần thiết, đặc biệt là với những người mới làm quen với gym. Thế nhưng, làm thế nào để lựa chọn được PT tốt nhất? Rất đơn giản, bạn chỉ cần căn cứ vào một số tiêu chí sau:<strong>&nbsp;Có kiến thức chuyên môn và bằng cấp huấn luyện chính quy</strong>Bằng cấp và kiến thức chuyên sâu về bộ môn gym là yêu cầu đầu tiên mà các PT gym cần phải có. Kiến thức sâu rộng mà các PT cần học không chỉ liên quan đến bài tập mà còn liên quan đến cơ thể như cấu trúc, các chuyển động,… Một người mới tập gym thì kiến thức tập luyện không có nhiều nên cần được PT hướng dẫn, hỗ trợ. Hoặc dù bạn đã trang bị kiến thức tập, bạn vẫn nên tập luyện cùng PT vì&nbsp;cơ địa, sức khỏe, sức bền mỗi người khác nhau. Để có thể tìm được các PT có bằng cấp chính quy bạn cần lựa chọn các trung tâm thể hình uy tín.&nbsp;<strong>Kinh nghiệm, kết quả huấn luyện những người trước&nbsp;</strong>Một PT tốt chắc chắn đã hỗ trợ rất nhiều người thay đổi thể hình thành công. Vì thế, trước khi lựa chọn một PT nào đó, bạn nên tìm hiểu thông tin kỹ lưỡng, có thể hỏi thêm về những trường hợp đã được PT hỗ trợ tút dáng thành công. Qua đó, bạn sẽ có những đánh giá khách quan nhất về PT.<strong>Giới tính</strong>Khi lựa chọn PT, tốt nhất bạn nên chọn PT cùng giới. Bản thân người cùng giới sẽ hiểu được bạn cần gì và cần hỗ trợ như thế nào để bạn tập luyện một cách thoải mái nhất.<strong>Cá tính phù hợp</strong>Cá tính của PT và người tập cũng rất quan trọng. Việc lựa chọn PT có cá tính phù hợp với bạn sẽ dễ dàng trao đổi những vấn đề trong quá trình tập luyện, tránh phát sinh tranh cãi, mâu thuẫn.&nbsp;<strong>Tác phong chuyên nghiệp, có tính kỷ luật</strong>Tác phong chuyên nghiệp, ngữ điệu lịch thiệp, thái độ nhiệt tình, vui vẻ của PT sẽ giúp bạn thoải mái hơn trong quá trình tập luyện. Bên cạnh đó, tính kỷ luật của PT cũng cần được đề cao thông qua những biểu hiện trong quá trình huấn luyện như nghiêm túc và đúng giờ hẹn.<strong>Những lợi ích khi tập gym có huấn luyện viênThiết kế chương trình tập phù hợp với mỗi người, bài bản và khoa học</strong>Mỗi người sẽ có một thể trạng, một khả năng riêng. Vì thế, việc thiết lập một chương trình tập luyện khoa học, phù hợp sẽ giúp bạn tập luyện hiệu quả, dễ dàng hoàn thành mục tiêu, tránh nhàm chán.<strong>Chỉnh dáng, hạn chế chấn thương trong khi tập</strong>Với sự hướng dẫn của các huấn luyện viên cá nhân, bạn có thể tập luyện đúng các tư thế. Nhờ đó, quá trình tập luyện đạt kết quả tốt hơn, tránh những sự cố và các rủi ro nghiêm trọng như biến dạng cơ thể hoặc tập sai vùng cơ sau một thời gian.<strong>Giải đáp thắc mắc và cho lời khuyên</strong>Là một người mới, trong quá trình tập luyện chắc chắn bạn sẽ có rất nhiều vấn đề khó hiểu. Hơn ai hết, huấn luyện viên cá nhân là người đưa ra giải đáp, lời khuyên để bạn nhanh chóng cải thiện vóc dáng.<strong>Người bạn đồng hành truyền động lực tập luyện cho bạn</strong>Trong quá trình tập luyện, sẽ khó tránh khỏi những lúc bạn nản chí, muốn bỏ cuộc. Lúc này, huấn luyện viên sẽ mang đến cho bạn một nguồn động lực to lớn, kích thích bạn hành động, kiên trì hơn với lộ trình tập luyện.<strong>Thiết kế chế độ dinh dưỡng phù hợp</strong>Để đạt được mục tiêu tập luyện trong thời gian sớm nhất, ngoài chương trình tập luyện phù hợp thì chế độ dinh dưỡng cũng đóng vai trò rất quan trọng. Đây cũng là nhiệm vụ của huấn luyện viên, họ sẽ căn cứ vào thể trạng, mục tiêu của bạn mà tư vấn chế độ ăn uống phù hợp, đáp ứng nhu cầu dinh dưỡng mà cơ thể cần.</p>', '1735103006447_image_2024-12-25_120323594.png', 'image-left', 'PERSONAL_TRAINING'),
(14, 'KICKFIT', 'Kickfit là gì?Trên thực tế, kickfit là bộ môn kết hợp giữa kickboxing và fitness. Chính nhờ sự kết hợp giữa các bài tập như vậy, kickfit đã tác động rất lớn đến cơ thể người tập giúp đạt được tối đa hiệu quả tập luyện.', '<h2>Kickfit là gì?</h2><p>Trên thực tế, kickfit là bộ môn kết hợp giữa kickboxing và fitness. Chính nhờ sự kết hợp giữa các bài tập như vậy, kickfit đã tác động rất lớn đến cơ thể người tập giúp đạt được tối đa hiệu quả tập luyện.</p><p>Cụ thể, kickfit lấy cảm hứng từ nhiều môn võ khác nhau (trong đó có 3 môn võ chính là boxing, kickboxing và Muay Thái), có sự kết hợp của các động tác mạnh như đấm, đá, kỹ thuật tấn công,… Do cường độ vận động khá nhanh và mạnh nên kickfit có khả năng<a href=\"https://nhathuoclongchau.com.vn/bai-viet/tong-hop-cach-dot-calo-nhanh-nhat-ngay-tai-nha-56285.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">&nbsp;đốt cháy calo</a>&nbsp;và mỡ thừa rất cao, đặc biệt phù hợp với những người theo đuổi chế độ&nbsp;<a href=\"https://nhathuoclongchau.com.vn/bai-viet/thuc-don-giam-can-trong-1-thang-khoa-hoc-va-dam-bao-suc-khoe-66033.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">giảm cân</a>. Thậm chí, kickfit còn được sử dụng trong những trường hợp phòng thủ, bảo vệ bản thân.</p><p><img src=\"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kickfit_la_gi_tap_kickfitness_co_giup_tang_can_giam_can_khong_2_f811ced120.jpg\"><em>Kickfit là bộ môn kết hợp giữa kickboxing và fitness</em></p><h2>Lợi ích của Kickfit</h2><p>Bên cạnh kickfit là gì thì nhiều người muốn biết lợi ích của bộ môn này:</p><h3>Giảm cân và đốt mỡ</h3><p>Kickfit được coi là phương pháp giảm cân, đốt mỡ tuyệt vời cho những ai đang muốn cải thiện vóc dáng. Trong 1 giờ tập kickfit có thể đốt cháy 600 - 800 calo, tác động mạnh đến các nhóm cơ, làm săn chắc cơ và đốt cháy mỡ thừa rất hiệu quả. Kickfit có thể phù hợp cho cả nam và nữ.</p><p>Đối với nữ, Kickfit ngoài tác dụng tăng cường đốt cháy mỡ thừa, giảm cân còn có thể giúp cải thiện số đo vòng 1 và vòng 3, săn chắc cơ vòng 2. Đối với nam giới, bộ môn này như một phương pháp cải thiện các vùng cơ hiệu quả.</p><h3>Giúp giảm stress</h3><p>Theo nghiên cứu, kickfit giúp giải phóng những cảm xúc tiêu cực,&nbsp;<a href=\"https://nhathuoclongchau.com.vn/bai-viet/5-cach-tang-cuong-suc-khoe-than-kinh-giam-cang-thang-nhanh-chong-65266.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">giảm căng thẳng</a>. Vì vậy, chọn tập kickfit sau mỗi giờ học tập và làm việc sẽ giúp bạn đạt được 2 mục tiêu lớn là tăng cường sức khoẻ và thư giãn tinh thần.</p><h3>Rèn luyện tính kỷ luật</h3><p>Bất cứ môn thể thao nào cũng cần sự kiên trì và nghiêm túc trong tập luyện. Chưa kể kickfit là khởi nguồn của võ thuật nên sự kỷ luật lại cao hơn. Để có thể tập kickfit đúng cách và hiệu quả, bạn phải tuân thủ theo hướng dẫn của huấn luyện viên từ chế độ dinh dưỡng, chế độ tập luyện cho đến thời gian sinh hoạt. Về lâu dài, lối sống của bạn sẽ có sự thay đổi đáng kể, tạo nên lối sống lành mạnh và kỷ luật hơn.</p><h3>Nâng cao khả năng tự vệ</h3><p>Như đã nói ở trẻ, kickfit xuất thân từ nhóm các môn võ thuật với những đòn đánh nhanh và mạnh, cường độ tập luyện cao, đòi hỏi sự nhạy bén và phản xạ nhanh. Do đó, nếu tập kickfit đủ lâu, kiên trì tập luyện sẽ cải thiện khả năng phản xạ, tự vệ trong những tình huống nguy cấp.</p><h2>Những động tác cơ bản trong Kickfit mà bạn nên biết</h2><h3>Tư thế đứng thủ trong kickboxing</h3><p>Nếu thuận tay phải, bạn đứng ở tư thế đưa chân trái ra trước, chân phải ra sau và ngược lại với người thuận tay trái. Hai tay nắm chặt thành nắm đấm, giữ ngang cằm để che mặt và cổ.</p><h3>Đấm Jab hoặc Cross</h3><p>Đây là 2 kỹ thuật cơ bản phổ biến nhất trong boxing và kickboxing:</p><p>Jab là một cú đấm thẳng sử dụng tay không thuận của bạn để tung một cú đấm trực tiếp vào mặt đối thủ và Cross sử dụng tay thuận của bạn để tung một cú đấm theo đường chéo vào đối thủ.</p><p>Khi thực hiện động tác Cross, gót chân tạo khoảng 45 độ để hỗ trợ chuyển động tốt nhất. Bạn phải thực hiện Jab hoặc Cross liên tục để tạo ra những đòn tấn công liên tiếp.</p><p><img src=\"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kickfit_la_gi_tap_kickfitness_co_giup_tang_can_giam_can_khong_3_5dda4714fb.jpg\"><em>Kickfit giúp giảm cân, tự vệ, tăng sức bền,...</em></p><h3>Đấm Hook (Swing)</h3><p>Động tác này thực hiện một cú móc ngang bằng tay theo quỹ đạo cong, sử dụng lực mạnh để tấn công vào đầu hoặc thân của đối thủ.</p><h3>Đấm Uppercut</h3><p>Uppercut là một cú móc ngược vào cằm đối phương để đẩy đối phương ra sau và khiến họ mất thăng bằng. Để tạo thành các combo tấn công có thể liên tục kết hợp Uppercut với các kỹ thuật khác.</p><h3>Đá Roundhouse kick</h3><p>Đá Roundhouse kick được thực hiện bằng cách đá mu bàn chân vào trong. Khi thực hiện động tác này, bạn cần lấy đà để đưa chân thành đường bán nguyệt, tận dụng lực xoay để cú đá mạnh hơn.</p><h3>Đạp Front kick</h3><p>Cú đá trước là một cú đá ngắn, trực diện để tấn công trực tiếp vào mông hoặc cằm của đối phương giúp đẩy đối phương ra xa. Khi thực hiện động tác này bạn cần duỗi thẳng chân, di chuyển người về phía sau để đánh vào cơ hoành/ngực/đùi của đối phương.</p><h2>Các câu hỏi liên quan đến kickfit</h2><h3>Những ai nên luyện tập Kickfit?</h3><p>Kickfit phù hợp với người muốn&nbsp;<a href=\"https://nhathuoclongchau.com.vn/bai-viet/cach-tang-can-nhanh-khong-dung-thuoc-nguoi-gay-nen-biet-65764.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">tăng cân</a>&nbsp;hoặc giảm cân, người ít vận động, muốn học tự vệ,...</p><h3>Tập Kickfitness có giúp tăng cân hoặc giảm cân không?</h3><p>Kickfit có thể giúp tăng hoặc giảm cân tùy vào nhu cầu của học viên để huấn luyện viên xây dựng chương trình tập luyện phù hợp.</p><h3>Dụng cụ tập kickfit</h3><p>Khi đã tìm hiểu kickfit là gì và quyết định theo đuổi bộ môn này, bạn cần chuẩn bị một số dụng cụ cần thiết cho việc tập luyện:</p><ul><li>Găng tay là dụng cụ không thể thiếu trong kickfit. Găng tay giúp bạn hạn chế chấn thương khi tập luyện, giảm lực khi thực hiện các động tác trong lúc tập. Ngoài ra, găng tay còn được sử dụng như tấm chắn giúp bảo vệ toàn diện trong quá trình tập luyện. Bạn có thể thấy bao cát ở hầu hết các phòng tập nơi tổ chức các lớp kickfit.</li><li>Bao cát đóng vai trò hỗ trợ tập luyện, đặc biệt là đấm và đá. Với bao cát, bạn có thể chọn bao cát treo hoặc bao cát trụ đứng.</li><li>Băng quấn tay dùng để bảo vệ cổ tay của người tập khi thực hiện các động tác đấm. Nhờ có băng quấn tay, các khớp cổ tay và bàn tay được cố định, hạn chế chấn thương khi giao đấu. Đặc biệt khi bạn đánh mạnh vào bao cát thì vật dụng này thực sự cần thiết.</li><li>Dây nhảy là dụng cụ hỗ trợ thêm cho các bài tập&nbsp;<a href=\"https://nhathuoclongchau.com.vn/bai-viet/the-luc-la-gi-cach-tang-cuong-the-luc-cho-tung-nhom-doi-tuong-71965.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">tăng cường sức mạnh</a>, nâng cao hiệu quả của các bài tập kickfit. Ngoài ra, tập luyện với nhảy dây còn được cho là có tác dụng kích thích tuần hoàn máu, giúp tim khỏe hơn, tăng sự linh hoạt của các cử động tay chân.</li></ul><p><img src=\"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kickfit_la_gi_tap_kickfitness_co_giup_tang_can_giam_can_khong_1_e76b40c6f7.jpg\"><em>Trước khi tập kickfit cần chuẩn bị dụng cụ tập đầy đủ để bảo vệ bản thân</em></p><p>Trên đây là những thông tin về bộ môn kickfit mà bạn có thể tham khảo khi muốn thử sức với bộ môn này hoặc có nhu cầu giảm cân. Đối với những người mới bắt đầu học nên có hướng dẫn của huấn luận viên để thực hiện đúng kỹ thuật, tránh chấn thương và đạt được hiệu quả tốt nhất.</p>', '1735103103500_image_2024-12-25_120459269.png', 'image-left', 'PERSONAL_TRAINING'),
(15, 'SEXY DANCE', 'Sexy dance là gì? Sexy dance hay còn gọi là nhảy sexy là những điệu nhảy hiện đại quyến rũ, đầy chất trẻ, chủ yếu sử dụng sự linh động và mềm dẻo, làm nổi bật đường nét quyến rũ của cơ thể. Sexy dance có đặc điểm là làm nổi bật những vùng ngực, eo, bụng dưới, mông, đùi khi nhảy, vì vậy yêu cầu các nhóm cơ trên toàn bộ cơ thể đều phải vận động như cơ bụng, lưng, chân… ', '<p>Sexy dance là gì? Sexy dance hay còn gọi là nhảy sexy là những điệu nhảy hiện đại quyến rũ, đầy chất trẻ, chủ yếu sử dụng sự linh động và mềm dẻo, làm nổi bật đường nét quyến rũ của cơ thể. Sexy dance có đặc điểm là làm nổi bật những vùng ngực, eo, bụng dưới, mông,&nbsp;đùi khi nhảy, vì vậy yêu cầu các nhóm cơ trên toàn bộ cơ thể đều phải vận động như cơ bụng, lưng, chân…&nbsp;</p><p>Với sự hoạt động của toàn cơ thể, sexy dance giảm cân hiệu quả, mang lại dáng chuẩn, vòng eo thon gọn, vòng mông&nbsp;săn chắc, đồng thời giúp bạn bỏ hết những ưu phiền, căng thẳng,&nbsp;<a href=\"https://nhathuoclongchau.com.vn/benh/met-moi-659.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">mệt mỏi</a>&nbsp;trong công việc, cuộc sống hàng ngày và mang lại sự tự tin hơn.</p><h2>Tác dụng của sexy dance</h2><h3>Giảm cân siêu tốc&nbsp;</h3><p>Bạn có lẽ đã&nbsp;thắc mắc tập sexy dance có giúp giảm cân?&nbsp;Câu trả lời là có. Các bài tập sexy dance vận động&nbsp;liên tục khiến cơ thể chuyển động theo nhịp độ rất nhanh,&nbsp;có tác dụng&nbsp;đốt cháy từ 500-600 calo/giờ luyện tập. Các động tác nhảy sẽ tác động vào cơ ngực, bụng,&nbsp;lưng, mông, đùi để hoạt động&nbsp;hết công sức, từ đó giúp bạn giảm mỡ, tăng cường sự dẻo dai. Đặc biệt, nhảy sexy dance giúp bạn sở hữu thân hình nóng bỏng với đường cong lí tưởng.</p><h3>Mang đến vóc dáng chuẩn&nbsp;</h3><p>Sexy dance với những động tác linh hoạt,&nbsp;uyển chuyển&nbsp;giúp người tập thể hiện rõ những đường cong đẹp đẽ trên cơ thể. Khi nhảy sexy dance, bạn dần&nbsp;cải thiện được dáng đi đứng đúng chuẩn&nbsp;với tư thế lưng và vai thẳng, ngực vươn, hông lắc nhẹ với những bước đi tự tin, linh hoạt hơn. Thêm vào đó, bạn sẽ biết cách trình diễn từ biểu cảm ánh mắt, thần thái, cách di chuyển, từng bước nhảy theo bài bản đến cách làm chủ sân khấu.</p><h3>Tự tin trong các bữa tiệc</h3><p>Với những điệu nhảy gợi cảm, sôi động của bộ môn sexy dance, bạn có thể tự tin vào bản thân từ thân hình quyến rũ và khả năng trình diễn của mình. Nếu bạn thường xuyên tham dự các buổi tiệc, nhảy sexy dance sẽ giúp bạn&nbsp;tỏa sáng,&nbsp;hấp dẫn, thu hút&nbsp;mọi ánh nhìn. Nhảy giảm cân sexy dance rất thích hợp cho những ai có cá tính, muốn thể hiện mình và nổi bật giữa đám đông.</p><p class=\"ql-align-center\"><img src=\"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/download_23_a864dae5d6.jpg\"><em>Các điệu nhảy sexy dance giúp người tập giảm stress và tự tin</em></p><h3>Tăng cường trí nhớ</h3><p>Nghiên cứu khoa học đã chứng minh việc tập nhảy sexy dance thường xuyên sẽ có những tác động tích cực đến các dây thần kinh, đặc biệt là ngăn sự&nbsp;mất thể tích hồi hải mã, một bộ phận giữ vai trò quan trọng trong việc kiểm soát trí nhớ. Ngoài ra vận động theo nhịp điệu còn hỗ trợ&nbsp;quá trình bơm máu lên não, cải thiện tích cực đến các hoạt động của não cũng như đến trí nhớ dài hạn và ngắn hạn của con người.</p><p>Ngoài ra, động tác nhảy còn được xem là một biện pháp hỗ trợ rất tốt cho một số bệnh như bệnh&nbsp;<a href=\"https://nhathuoclongchau.com.vn/benh/parkinson-27.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">Parkinson</a>,&nbsp;<a href=\"https://nhathuoclongchau.com.vn/bai-viet/dot-quy-la-gi-nguyen-nhan-cach-dieu-tri-va-phong-ngua-dot-quy-51832.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">đột quỵ</a>&nbsp;và bại não.</p><h3>Giảm stress</h3><p>Thêm một lợi ích của sexy dance&nbsp;là giảm stress. Mọi người ai cũng gặp phải nhiều áp lực từ cuộc sống, quan trọng là chúng ta&nbsp;có những phương pháp gì để vượt qua&nbsp;hay không. Theo&nbsp;nhiều nghiên cứu khoa học,&nbsp;âm nhạc chính là liều thuốc hữu hiệu giúp cải thiện tâm trạng của bạn.&nbsp;</p><p>Sau một ngày dài làm việc mệt mỏi và bị&nbsp;<a href=\"https://nhathuoclongchau.com.vn/benh/stress-34.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--text-link-color);\">stress</a>, cơ thể được phiêu theo những giai điệu sôi động sẽ trở nên khỏe khoắn, thư giãn hơn. Ngoài ra, sexy dance vừa&nbsp;là bài tập cải thiện tinh thần vừa có&nbsp;sự kết nối cao, tạo&nbsp;cơ hội cho bạn giao lưu với nhiều bạn bè, đây cũng là một cách để giải tỏa căng thẳng.</p><h2>Lưu ý tránh khi tập sexy dance</h2><p>Luyện tập sexy dance không hề đơn giản, bạn hãy lưu ý tránh những điều sau đây:</p><h3>Không cảm nhận thông điệp&nbsp;của bài nhạc</h3><p>Khi nhảy theo nhạc, bạn cần&nbsp;cảm nhận về ý nghĩa, ca từ cũng như thông điệp mà bài nhạc&nbsp;muốn truyền tải, điều này sẽ làm cho điệu nhảy của bạn&nbsp;có sức sống và trở nên tinh tế. Mỗi một hợp âm phát ra mang theo rất nhiều tầng&nbsp;ý nghĩa và bạn có thể thể hiện chúng trong từng bước nhảy. Hãy để tâm đến những xúc cảm mà âm nhạc mang lại cho bạn để có thể phiêu theo từng ca từ và&nbsp;mang lại cho bạn&nbsp;những bước nhảy đầy sự thu hút và quyến rũ.&nbsp;</p><p class=\"ql-align-center\"><img src=\"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/sexy_dance_la_gi_mon_nhay_quyen_ru_nhung_giam_can_cuc_ky_hieu_qua_3_a9b2b8fc5e.png\"><em>Để nhảy sexy dance bạn cần cảm nhạc, bắt theo nhịp và chú trọng bước nhảy</em></p><h3>Không lắng nghe và bắt theo nhịp</h3><p>Bạn đừng bỏ qua giai đoạn cảm nhạc và bắt nhịp trước khi bắt đầu thực hiện các&nbsp;động tác.&nbsp;</p><p>Nếu bạn gặp khó khăn khi bắt nhịp, hãy nhờ bạn bè đếm nhịp hoặc&nbsp;bạn hãy tập làm quen với việc nghe giai đoạn mở đầu từ đó có thể cảm nhận được nhịp điệu. Hãy nghe thật nhiều những bài hát liên quan đến phong cách bạn&nbsp;chọn sau đó từ những động tác bắt nhịp ấy biến thành chính điệu nhảy của bạn. Hãy bắt đầu từ những bước nhảy cơ bản, nghe và cảm nhận bài nhạc&nbsp;thật nhiều sẽ khiến bạn tự tin và thoải mái hơn với âm nhạc và những động tác.</p><h3>Quá chú trọng đến các bước nhảy</h3><p>Hãy tránh&nbsp;việc nhìn chằm chằm vào chân khi nhảy vì&nbsp;sẽ làm động tác của bạn mất đi sự mềm mại&nbsp;và trở nên cứng đờ. Điều này thể hiện bạn trông kém tự tin cũng như kém sự quyến rũ khi đang nhạy&nbsp;vũ điệu sexy. Hãy cảm nhận cơ thể mình và âm nhạc khi nhảy thay vì chỉ nhìn tập trung vào một điểm.</p><p>Nếu bạn muốn theo đuổi môn nhảy sexy dance, bạn không chỉ chú trọng tập luyện các bài tập, động tác mà còn tập cách cảm nhạc, phiêu theo điệu nhạc để có được sự mềm mại, linh hoạt trong các điệu nhảy gợi cảm.</p>', '1735103592800_image_2024-12-25_121306062.png', 'image-right', 'CLASS_BASED'),
(16, 'YOGA', 'Yoga là một phương pháp luyện tập lâu đời có nguồn gốc từ Ấn Độ khoảng 5.000 năm trước. Người ta thường cho rằng tập yoga là tập những động tác, tư thế uốn éo kỳ lạ. Nhưng thật ra, yoga bao gồm các bài tập giúp cải thiện thể chất, tinh thần, tình cảm và cả tâm linh của người tập.', '<h2>Yoga là gì?</h2><p><br></p><p>Yoga là một phương pháp luyện tập lâu đời có nguồn gốc từ Ấn Độ khoảng 5.000 năm trước. Người ta thường cho rằng tập yoga là tập những động tác, tư thế uốn éo kỳ lạ. Nhưng thật ra, yoga bao gồm các bài tập giúp cải thiện thể chất, tinh thần, tình cảm và cả tâm linh của người tập.</p><p>Yoga nghĩa là gì? Từ “yoga” có nguồn gốc từ chữ “yuj” trong tiếng Phạn, có nghĩa là “thêm”, “tham gia”, “đoàn kết”, hoặc “đính kèm”. Bộ môn này được xây dựng dựa trên ý tưởng rằng tâm trí và cơ thể là một. Khi tập, bạn cần kết hợp các kỹ thuật thở, tư thế yoga (còn gọi là asana) và ngồi thiền. Để thực hiện được điều này, bạn cần phải có kỷ luật và phải luyện tập để thống nhất cơ thể, tâm trí và tâm hồn.</p><p>Nhiều người tập tin rằng bộ môn này&nbsp;có thể thay đổi thế giới quan, giúp bình tâm và giảm căng thẳng, nhờ đó sẽ giúp cải thiện sức khỏe của bạn.</p><h2>Các loại hình yoga</h2><p>Có rất nhiều loại hình yoga, như Ashtanga, Iyengar và Sivananda. Một số loại yoga có phong cách mạnh mẽ hơn, tư thế linh hoạt hơn hoặc yêu cầu kiểm soát hơi thở của bạn nhiều hơn, mỗi loại tập trung vào một khía cạnh khác nhau và có mức độ khó khác nhau. Tuy nhiên, tất cả đều hướng tới cùng một mục tiêu là giúp bạn cải thiện sức khỏe về mặt thể chất và tinh thần.</p><h3><a href=\"https://hellobacsi.com/the-duc-the-thao/hoat-dong-the-chat-khac/11-loi-ich-cua-hatha-yoga/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">Hatha Yoga</a></h3><p><br></p><p>Khi nói tới yoga, hầu hết mọi người thường nghĩ ngay đến Hatha Yoga. Loại yoga này kết hợp hai điều cơ bản nhất của yoga: phương pháp thở và tư thế (asana) giúp căng tất cả các cơ trên cơ thể. Bạn có thể thực hiện tư thế này khi đứng, nằm, hay thậm chí khi đang ngồi trong văn phòng hoặc khi đang “trồng chuối”. Kiểm soát hơi thở sẽ giúp bạn thư giãn cơ bắp, duy trì tư thế chuẩn, và tập trung suy nghĩ.</p><h3>Ashtanga Yoga</h3><p>Loại hình này yêu cầu bạn phải thực hiện liên tục một loạt các tư thế yoga (asana). Đây cũng là loại hình tập trung vào các kỹ thuật thở giúp tập trung tâm trí cũng như kiểm soát sự điều hòa hơi thở bằng cả cơ thể.</p><h3>Iyengar Yoga</h3><p>Loại yoga này khá chậm và chi tiết. Đây là một sự lựa chọn tốt cho những người mới bắt đầu đến với bộ môn yoga. Bạn có thể kết hợp thắt lưng, các bộ phận trên cơ thể, và gối ôm để chỉnh sửa tư thế cho chính xác nhất. Các kiểu yoga tương tự gồm có Anusara yoga và Viniyoga.</p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2016/11/yoga-la-gi_1033265092.jpg\"></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/11/D-Healthy-Fitness-0711.png\"></p><p>close</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3>Sivananda Yoga</h3><p>Sivananda Yoga được thiết kế bởi Swami Vishnu-devananda dựa trên 5 nguyên tắc cốt lõi bao gồm: Tập thể dục đúng cách, tập thở đúng cách, thư giãn đúng cách, chế độ ăn uống thích hợp, tư duy tích cực và thiền.</p><h3>Bikram Yoga</h3><p>Bộ môn này còn được gọi là “yoga nóng”. Khi tập Bikram yoga, bạn sẽ ngồi trong một phòng rất nóng, lên đến 40°C. Vì thế, bạn cần cân nhắc một số vấn đề bệnh lý của bản thân nếu muốn tập loại yoga này, ví dụ như tăng huyết áp hoặc tiểu đường, và nên tham khảo ý kiến bác sĩ trước khi luyện tập.</p><h3>Kundalini Yoga</h3><p>Kundalini là một loại hình thiên về luyện tập tinh thần. Nó tập trung vào thiền, hơi thở. Học thuyết chính của Kundalini yoga là quy luật cuộc sống, được cho là tập trung tại </p><p><a href=\"https://hellobacsi.com/benh-co-xuong-khop/van-de-xuong-khac/gu-cot-song/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">cột sống</a>. Bộ môn này giúp người tập sử dụng hơi thở và tư thế để giải phóng năng lượng trong cuộc sống.</p><h3>Power Yoga</h3><p>Đây là loại hình yoga khó tập, kết hợp giữa yoga và thể dục nhịp điệu. Người tập sẽ thực hiện một loạt các tư thế đồng thời phối hợp nhịp nhàng các động tác đó với từng hơi thở. Power yoga là một trong những thể loại đòi hỏi vận động nhiều nhất. Tùy vào sự hướng dẫn của huấn luyện viên và các tư thế tập luyện của bạn, bộ môn này có thể giúp bạn tăng cường sức mạnh cơ thể cũng như sự linh hoạt và khả năng thăng bằng.</p><h2>Tác dụng của việc tập yoga là gì?</h2><p>Dù vẫn còn cần rất nhiều nghiên cứu về những lợi ích và tầm ảnh hưởng của yoga lên cơ thể, đây&nbsp;vẫn là một phương pháp an toàn và hiệu quả giúp tăng cường các hoạt động thể chất, đặc biệt là thể lực, sự linh hoạt và khả năng thăng bằng.</p><p>Tác dụng của việc tập yoga rất hữu ích với những người bị đau nhức, chẳng hạn như những người bị viêm khớp hoặc <a href=\"https://hellobacsi.com/benh-co-xuong-khop/viem-khop/thoai-hoa-khop-vai/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">thoái hóa khớp</a>, vì những tư thế asana nhẹ nhàng có thể thúc đẩy sự linh hoạt và cải thiện thể lực. Nhiều người cảm nhận rằng yoga còn có tác dụng ổn định huyết áp, điều tiết lưu thông máu, giảm viêm, giảm các triệu chứng của <a href=\"https://hellobacsi.com/tam-ly-tam-than/tram-cam-roi-loan-cam-xuc/cach-chua-benh-tram-cam-nang/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">bệnh trầm cảm</a> và căng thẳng, <a href=\"https://hellobacsi.com/suc-khoe-phu-nu/chu-ky-kinh-nguyet/giam-met-moi-khi-hanh-kinh/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">giảm mệt mỏi</a>, và có thể giúp đỡ bệnh nhân hen suyễn hít thở dễ dàng hơn. Một nghiên cứu cũng cho thấy tác dụng của việc tập yoga có thể <a href=\"https://hellobacsi.com/giac-ngu/mat-ngu/chua-benh-mat-ngu-keo-dai-do-lo-au/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">cải thiện chứng mất ngủ</a> mà thậm chí không cần sử dụng thuốc ngủ.</p><p>Tuy nhiên, một vài động tác yoga không phù hợp với những người có một số rối loạn nhất định. Hãy tham vấn ý kiến bác sĩ hoặc <a href=\"https://hellobacsi.com/benh-co-xuong-khop/dau-co-xuong-khop/giam-dau-dau-goi-tu-5-bi-quyet-cua-nha-vat-ly-tri-lieu/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">nhà vật lý trị liệu</a> của bạn để tìm hiểu về những động tác tập luyện bạn nên tránh. Đồng thời bạn cũng nên tìm một huấn luyện viên hiểu rõ về <a href=\"https://hellobacsi.com/benh-co-xuong-khop/viem-khop/trieu-chung-benh-viem-khop-vay-nen/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">bệnh viêm khớp</a> và có thể thay đổi các động tác tập tùy theo nhu cầu của từng người, nhất là khi bạn đang phải sử dụng khớp nhân tạo.</p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2016/11/yoga-la-gi_324427688.jpg\"></p><h2>Những thứ cần chuẩn bị để bắt đầu tập yoga là gì?</h2><p>Yoga phù hợp với mọi người ở mọi lứa tuổi và là một hình thức tập thể dục mà bạn có thể thực hành từ lúc nhỏ cho đến khi trưởng thành.</p><p>Để tập, trước tiên bạn cần tìm một phòng tập yoga gần nhà và chuẩn bị một vài dụng cụ để tập. Dưới đây là tổng hợp những thứ cơ bản nhất bạn cần để tập yoga:</p><p><br></p><ul><li><strong>Phòng tập:</strong>&nbsp;Bạn nên tìm một trung tâm yoga trong khu vực gần nhà có mở nhiều lớp yoga khác nhau. Điều này sẽ cho bạn có nhiều lựa chọn hơn và bạn cũng có thể thay đổi lớp học để tìm xem loại hình nào là tốt nhất và phù hợp nhất với mình. Bạn nên chọn những nơi có huấn luyện viên yoga và phòng tập có những đạo cụ cơ bản để sử dụng nhằm giúp bạn tập trung tập luyện các tư thế một cách chuẩn xác.</li><li><strong>Quần áo thoải mái:</strong>&nbsp;Hãy nhớ rằng, có rất nhiều các động tác duỗi, căng khi tập yoga. Vì vậy, bạn sẽ muốn mặc một bộ quần áo thoải mái, thoáng khí. Khi tập một số bài tập đòi hỏi các tư thế chính xác, bạn phải mặc các loại trang phục thấy rõ được hình thể (chẳng hạn như leggings hay các bộ đồ liền bó sát) để các huấn luyện viên có thể dễ dàng điều chỉnh tư thế của bạn.</li><li><strong>Một chai nước:</strong>&nbsp;Đây là một trong những thứ quan trọng nhất cần mang theo khi tham gia bất kỳ bài tập nào và yoga cũng không ngoại lệ. Việc mất nước do&nbsp;<a href=\"https://hellobacsi.com/giac-ngu/roi-loan-giac-ngu/do-mo-hoi-dem/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">đổ mồ hôi</a>&nbsp;có thể khiến đầu óc bạn quay cuồng. Bạn thậm chí sẽ cảm thấy chóng mặt&nbsp;khi đang phải thăng bằng trên một chân và kiểm soát hơi thở cùng một lúc.&nbsp;<a href=\"https://hellobacsi.com/an-uong-lanh-manh/thong-tin-dinh-duong/cung-cap-nuoc-cho-co-the/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 135, 243);\">Cung cấp nước cho cơ thể</a>&nbsp;giúp bạn tập trung hơn, dù cho bạn có tham gia tập loại hình yoga nào đi nữa.</li><li><strong>Thảm tập riêng:</strong>&nbsp;Việc này tùy vào mỗi người vì nhiều phòng tập yoga cung cấp thảm tập cho học viên của họ. Nhưng sở hữu một tấm thảm riêng sẽ giúp bạn đảm bảo yếu tố vệ sinh.</li><li><strong>Khăn mặt<em>:&nbsp;</em></strong>Một chiếc khăn sẽ rất cần thiết nếu bạn luyện tập loại hình yoga phức tạp hơn hoặc yoga nóng. Bạn cần phải lau sạch mồ hôi để tránh mồ hôi khiến thảm tập bị trơn trượt gây nguy hiểm. Thêm vào đó bạn sẽ không cần lo lắng về việc mồ hôi rơi vào mắt khi bạn đang cố gắng tập trung và giữ thăng bằng.</li></ul><p><br></p>', '1735103746618_image_2024-12-25_121543124.png', 'image-right', 'CLASS_BASED'),
(21, 'Body Pump', 'BodyPump là 1 bộ môn tập cho toàn bộ nhóm cơ trên cơ thể kết hợp với tạ và âm nhạc. Sử dụng tạ nhẹ đến trung bình qua những động tác lặp lại nhiều lần, không cần tạ quá nặng mà chỉ cần tạ vừa sức nhưng bộ môn này vẫn tác động cực kì hiệu quả đến cơ thể. BodyPump là bài tập toàn thân, giúp cơ thể thon gọn, săn chắc và cân đối một cách nhanh chóng.', '<p>BodyPump là 1 bộ môn tập cho toàn bộ nhóm cơ trên cơ thể kết hợp với tạ và âm nhạc. Sử dụng tạ nhẹ đến trung bình qua những động tác lặp lại nhiều lần, không cần tạ quá nặng mà chỉ cần tạ vừa sức nhưng bộ môn này vẫn tác động cực kì hiệu quả đến cơ thể. BodyPump là bài tập toàn thân, giúp cơ thể thon gọn, săn chắc và cân đối một cách nhanh chóng.</p>', '1735374089093_bodypump.jpg', 'image-left', 'PERSONAL_TRAINING');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trainer`
--

CREATE TABLE `trainer` (
  `id` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `experience_years` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trainerName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `trainer`
--

INSERT INTO `trainer` (`id`, `gender`, `experience_years`, `bio`, `image`, `trainerName`) VALUES
(17, 'Nam', 5, '<p>Huấn luyện viên thể hình</p><p>Chuyên gia về sức bền và giảm cân.</p>', '1735373270861_1735150219800_image_2024-12-26_011018341.png', 'Nguyễn Văn A'),
(18, 'Nam', 3, '<p>Huấn luyện viên PT</p><p>Chuyên gia về thể hình và phục hồi chức năng.</p>', '1735150280701_image_2024-12-26_011119246.png', 'Trần Văn B'),
(19, 'Nữ', 5, '<p>Huấn luyện viên Yoga</p><p>Chuyên gia về thể lực và thả lỏng cơ thể</p>', '1735150347544_image_2024-12-26_011226134.png', 'Nguyễn Thị Thu Hà'),
(20, 'Nữ', 3, '<p>Huấn luyện viên Kickfit</p><p>Chuyên gia về nâng cao sức mạnh và tốc độ.</p>', '1735150419420_image_2024-12-26_011337381.png', 'Phan Thị Ngọc Mai'),
(21, 'Nam', 5, '<p>Huấn luyện viên Boxing và Kickboxing</p><p>chuyên gia về tự vệ và phát triển thể lực.</p>', '1735150482612_image_2024-12-26_011440900.png', 'Phạm Hồng Thái'),
(22, 'Nữ', 5, '<p>Huấn luyện viên Sexy Dance</p><p>Chuyên gia về biểu cảm cơ thể và phong cách vũ đạo quyến rũ.</p>', '1735150590914_image_2024-12-26_011539039.png', 'Trần Thị Mai Hương'),
(24, 'Nữ', 5, '<p>BodyPump </p>', '1735374150704_1729089403363_kickfit.jpg', 'Nguyễn Văn Huyền');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trainer_class`
--

CREATE TABLE `trainer_class` (
  `id` int(11) NOT NULL,
  `className` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `maxParticipants` int(11) NOT NULL,
  `currentParticipants` int(11) NOT NULL DEFAULT 0,
  `classDate` date NOT NULL,
  `isAvailable` tinyint(4) NOT NULL DEFAULT 1,
  `trainer_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `startTime` varchar(255) NOT NULL,
  `endTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `trainer_class`
--

INSERT INTO `trainer_class` (`id`, `className`, `description`, `maxParticipants`, `currentParticipants`, `classDate`, `isAvailable`, `trainer_id`, `service_id`, `price`, `startTime`, `endTime`) VALUES
(34, 'Yoga Dẻo Dai (Flex Yoga)', 'Yoga Dẻo Dai (Flex Yoga)', 5, 0, '2024-12-26', 1, 19, 16, 500000.00, '09:00', '10:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trainer_schedule`
--

CREATE TABLE `trainer_schedule` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `day_of_week` int(11) NOT NULL,
  `trainerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `trainer_schedule`
--

INSERT INTO `trainer_schedule` (`id`, `date`, `start_time`, `end_time`, `day_of_week`, `trainerId`) VALUES
(16, '2024-12-26', '09:00', '21:00', 5, 17),
(17, '2024-12-27', '09:00', '21:00', 6, 17),
(18, '2024-12-29', '09:00', '21:00', 8, 17),
(19, '2025-01-01', '09:00', '21:00', 4, 17),
(20, '2024-12-26', '09:00', '20:00', 5, 18),
(21, '2024-12-27', '09:00', '21:00', 6, 18),
(22, '2024-12-29', '09:00', '21:00', 8, 18),
(23, '2024-12-26', '09:00', '21:00', 5, 19),
(24, '2024-12-28', '09:00', '21:00', 7, 19),
(25, '2024-12-30', '09:00', '21:00', 2, 19),
(26, '2024-12-26', '09:00', '21:00', 5, 20),
(27, '2024-12-30', '09:00', '21:00', 2, 20),
(28, '2024-12-31', '09:00', '21:00', 3, 20),
(29, '2024-12-26', '09:00', '21:00', 5, 22),
(30, '2024-12-27', '09:00', '21:00', 6, 22),
(31, '2024-12-30', '09:00', '21:00', 2, 22),
(33, '2024-12-29', '09:00', '21:00', 8, 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trainer_services_service`
--

CREATE TABLE `trainer_services_service` (
  `trainerId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `trainer_services_service`
--

INSERT INTO `trainer_services_service` (`trainerId`, `serviceId`) VALUES
(17, 16),
(18, 13),
(19, 16),
(20, 14),
(21, 13),
(21, 14),
(22, 15),
(24, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `role_id` int(11) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`, `role_id`, `googleId`) VALUES
(5, 'Thức Trần Huỳnh', 'sieunhangao0985@gmail.com', '$2a$10$2SONJK2pnJK0So/lIlFCaOnb2V7zbCAMG3CMT2mPzJIhdYZRGwSe6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJUaOG7qWMgVHLhuqduIEh14buzbmgiLCJlbWFpbCI6InNpZXVuaGFuZ2FvMDk4NUBnbWFpbC5jb20iLCJyb2xlSWQiOjEsImlhdCI6MTczNTM3NTI3MSwiZXhwIjoxNzM1NDYxNjcxfQ.UDA26LWzhk7tExMI9cPisNy84q7efWo6HjcFSZsFfXs', '2024-12-25 04:57:54.193862', '2024-12-28 08:41:11.000000', 1, '107076472451619452342'),
(9, 'Thức Trần Huỳnh', '2100004146@nttu.edu.vn', '$2a$10$wu8iJsGhk7CnVMOT/l3QbeDRzGnU2IbFE/jGZaoAe.1AoT7QDiusG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJUaOG7qWMgVHLhuqduIEh14buzbmgiLCJlbWFpbCI6IjIxMDAwMDQxNDZAbnR0dS5lZHUudm4iLCJyb2xlSWQiOjIsImlhdCI6MTczNTM3NTc0MCwiZXhwIjoxNzM1NDYyMTQwfQ.Y7z6OXU_dACuTYwsx3RXfNRQeDe86Rs-vb4_PO27dKU', '2024-12-28 08:48:42.959749', '2024-12-28 08:49:00.000000', 2, NULL),
(10, 'Huỳnh Ninh', 'ninhhuynh1980@gmail.com', '$2a$10$O3o4eey8rysOnk3mOvrxPeR7.jZjejXxsfCo4rGNPFDHxtWah7e8q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoiSHXhu7NuaCBOaW5oIiwiZW1haWwiOiJuaW5oaHV5bmgxOTgwQGdtYWlsLmNvbSIsInJvbGVJZCI6MSwiaWF0IjoxNzM1Mzc1Nzk2LCJleHAiOjE3MzU0NjIxOTZ9.qsP-ZuBDXZFC4No1pgS7yG5SnWoTNkpmXIq606huBJc', '2024-12-28 08:49:27.703375', '2024-12-28 08:49:56.000000', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_gym_package`
--

CREATE TABLE `user_gym_package` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_promotions`
--

CREATE TABLE `user_promotions` (
  `id` int(11) NOT NULL,
  `isUsed` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_id` int(11) DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_promotions`
--

INSERT INTO `user_promotions` (`id`, `isUsed`, `createdAt`, `updatedAt`, `user_id`, `promotion_id`) VALUES
(2, 0, '2024-12-25 20:36:33.624149', '2024-12-25 20:36:33.624149', 5, 8),
(7, 0, '2024-12-28 08:48:42.975554', '2024-12-28 08:48:42.975554', 9, 14),
(8, 0, '2024-12-28 08:49:27.721942', '2024-12-28 08:49:27.721942', 10, 15);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `gym_package`
--
ALTER TABLE `gym_package`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7cda86497c47cbd6e8f66fca45a` (`service_id`);

--
-- Chỉ mục cho bảng `notification_config`
--
ALTER TABLE `notification_config`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a922b820eeef29ac1c6800e826a` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3ff3367344edec5de2355a562ee` (`order_id`),
  ADD KEY `FK_29241f89c9bacebef50048a8157` (`trainer_id`),
  ADD KEY `FK_1dcdc06bec733a43c18d099bda4` (`package_id`),
  ADD KEY `FK_6013b417c65dec13f6b6c752dff` (`trainer_class_id`),
  ADD KEY `FK_2c480836c4db466c96468fa1131` (`promotion_id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8ab10e580f70c3d2e2e4b31ebf` (`code`),
  ADD KEY `FK_adcfa65c0410c68efe7d3193a1d` (`gym_package_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7ed5659e7139fc8bc039198cc1f` (`userId`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `trainer_class`
--
ALTER TABLE `trainer_class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7264ab9576da91bcd5eab65aa43` (`trainer_id`),
  ADD KEY `FK_cae6f3bf31f3406cb3b19526b67` (`service_id`);

--
-- Chỉ mục cho bảng `trainer_schedule`
--
ALTER TABLE `trainer_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cdd8c6f9a7bc38ee251c0b4fddf` (`trainerId`);

--
-- Chỉ mục cho bảng `trainer_services_service`
--
ALTER TABLE `trainer_services_service`
  ADD PRIMARY KEY (`trainerId`,`serviceId`),
  ADD KEY `IDX_51ea76675af5c0c5e1716e3761` (`trainerId`),
  ADD KEY `IDX_c04c6a3f6bb19bbb261c517173` (`serviceId`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a2cecd1a3531c0b041e29ba46e1` (`role_id`);

--
-- Chỉ mục cho bảng `user_gym_package`
--
ALTER TABLE `user_gym_package`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_83fedcc629546065a874cf3c263` (`user_id`),
  ADD KEY `FK_ae7bf3c35fde002c3a2601335f4` (`service_id`);

--
-- Chỉ mục cho bảng `user_promotions`
--
ALTER TABLE `user_promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4dff6dac4b2c0a25bcd9b3c5138` (`user_id`),
  ADD KEY `FK_b6bee2301e43e312ed2c471a846` (`promotion_id`);

--
-- Chỉ mục cho bảng `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `gym_package`
--
ALTER TABLE `gym_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `notification_config`
--
ALTER TABLE `notification_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `trainer_class`
--
ALTER TABLE `trainer_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `trainer_schedule`
--
ALTER TABLE `trainer_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `user_gym_package`
--
ALTER TABLE `user_gym_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user_promotions`
--
ALTER TABLE `user_promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `gym_package`
--
ALTER TABLE `gym_package`
  ADD CONSTRAINT `FK_7cda86497c47cbd6e8f66fca45a` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FK_1dcdc06bec733a43c18d099bda4` FOREIGN KEY (`package_id`) REFERENCES `gym_package` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_29241f89c9bacebef50048a8157` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_2c480836c4db466c96468fa1131` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3ff3367344edec5de2355a562ee` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6013b417c65dec13f6b6c752dff` FOREIGN KEY (`trainer_class_id`) REFERENCES `trainer_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `FK_adcfa65c0410c68efe7d3193a1d` FOREIGN KEY (`gym_package_id`) REFERENCES `gym_package` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_7ed5659e7139fc8bc039198cc1f` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `trainer_class`
--
ALTER TABLE `trainer_class`
  ADD CONSTRAINT `FK_7264ab9576da91bcd5eab65aa43` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cae6f3bf31f3406cb3b19526b67` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `trainer_schedule`
--
ALTER TABLE `trainer_schedule`
  ADD CONSTRAINT `FK_cdd8c6f9a7bc38ee251c0b4fddf` FOREIGN KEY (`trainerId`) REFERENCES `trainer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `trainer_services_service`
--
ALTER TABLE `trainer_services_service`
  ADD CONSTRAINT `FK_51ea76675af5c0c5e1716e3761b` FOREIGN KEY (`trainerId`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_c04c6a3f6bb19bbb261c517173c` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `user_gym_package`
--
ALTER TABLE `user_gym_package`
  ADD CONSTRAINT `FK_83fedcc629546065a874cf3c263` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ae7bf3c35fde002c3a2601335f4` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `user_promotions`
--
ALTER TABLE `user_promotions`
  ADD CONSTRAINT `FK_4dff6dac4b2c0a25bcd9b3c5138` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b6bee2301e43e312ed2c471a846` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
