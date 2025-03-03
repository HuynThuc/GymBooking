import React, { useState, useEffect } from 'react';
import { Bell, Video, Save } from 'lucide-react';

const NotificationConfig = () => {
  const [beforeSessionDays, setBeforeSessionDays] = useState(1); // Giá trị mặc định
  const [remainingSessions, setRemainingSessions] = useState(1); // Giá trị mặc định
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);  // State để lưu danh sách video
  const [loading, setLoading] = useState(true);  // State để kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null); // State lưu videoId hiện tại
  
  // Hàm cập nhật thông báo cho từng trường
  // Hàm cập nhật thông báo
  // Cập nhật từng trường riêng lẻ
  const handleUpdate = async () => {
    const updatePromises = []; // Mảng lưu các promise

    if (beforeSessionDays) {
      updatePromises.push(updateField('before_session_days', beforeSessionDays));
    }
    if (remainingSessions) {
      updatePromises.push(updateField('remaining_sessions', remainingSessions));
    }

    try {
      // Đợi tất cả các promise hoàn thành
      await Promise.all(updatePromises);
      // Nếu tất cả đều thành công, hiển thị một thông báo chung
      alert('Cập nhật thông báo thành công!');
    } catch (error) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      alert('Có lỗi xảy ra khi cập nhật thông báo.');
    }
  };

  // Hàm cập nhật riêng từng trường
  const updateField = async (type, value) => {
    try {
      const response = await fetch('http://localhost:3002/notification/update-value', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, value }), // Gửi riêng từng trường
      });

      if (!response.ok) {
        throw new Error(`Cập nhật ${type} thất bại.`);
      }

      const data = await response.json();
      console.log(`Cập nhật ${type} thành công:`, data);
    } catch (error) {
      console.error(`Lỗi khi cập nhật ${type}:`, error);
      throw error; // Ném lỗi để thông báo được hiển thị sau
    }
  };

  // Hàm fetch để lấy tất cả video
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3002/video/getAllVideos');
      if (!response.ok) {
        throw new Error('Có lỗi khi lấy danh sách video');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);  // [] nghĩa là chỉ gọi 1 lần khi component render lần đầu tiên

  console.log('ádsd', videos)

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile({
        file: file,
        preview: URL.createObjectURL(file)
      });
      setCurrentVideoId(null); // Khi chọn video mới thì set currentVideoId thành null
    }
  };

  console.log('video', currentVideoId)

  const handleUpdateVideo = async (videoId) => {
    if (!videoFile && !currentVideoId) {
      alert('Vui lòng chọn video');
      return;
    }
  
    const formData = new FormData();
    formData.append('url', videoFile ? videoFile.file : ''); // Thêm video vào form data nếu có

    try {
      const response = await fetch(`http://localhost:3002/video/updateVideo/${videoId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật video');
      }
  
      const data = await response.json();
      alert('Video đã được cập nhật thành công!');
      fetchVideos(); // Gọi lại hàm fetchVideos để cập nhật danh sách video mới nhất
    } catch (error) {
      console.error('Lỗi khi cập nhật video:', error);
      alert('Có lỗi xảy ra khi cập nhật video');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Phần Cài Đặt Thông Báo */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Bell className="mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Cài Đặt Thông Báo</h2>
          </div>

          {/* Phần Cài Đặt Thông Báo */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông báo sắp đến lịch tập
              </label>
              <input
                type="number"
                min="1"
                value={beforeSessionDays}
                onChange={(e) => setBeforeSessionDays(parseInt(e.target.value))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông báo gia hạn
              </label>
              <input
                type="number"
                min="1"
                value={remainingSessions}
                onChange={(e) => setRemainingSessions(parseInt(e.target.value))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center"
            >
              <Save className="mr-2" size={20} />
              Cập Nhật Cấu Hình
            </button>
          </div>
        </div>

        {/* Phần Tải Video */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Video className="mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Tải Video Banner</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn File Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0
                  file:text-sm file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700"
              />
            </div>

            {/* Bỏ phần điều kiện videoFile ở đây */}
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.id}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Video Hiện Tại:</h3>
                  <video
                    controls
                    src={`/images/${video.url}`}
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={() => setCurrentVideoId(video.id)} // Set videoId khi chọn video
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Chọn Video
                  </button>
                </div>
              ))
            ) : (
              <p>Chưa có video để hiển thị.</p>
            )}

            <button
              onClick={() => handleUpdateVideo(currentVideoId)} // Truyền currentVideoId vào khi click cập nhật
              disabled={!currentVideoId}  // Disable nếu không có videoId
              className={`w-full py-2 rounded-md transition flex items-center justify-center
                ${currentVideoId
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <Save className="mr-2" size={20} />
              Cập Nhật Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationConfig;
