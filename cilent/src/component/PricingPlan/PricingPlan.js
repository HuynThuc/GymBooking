import React from "react";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const PricingSection = ({ pricingPlans, onEnrollNow }) => {
  return (
    <section className="bg-[#0a0a0a] py-16 mt-40 sm:mt-0">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-center mb-4">GÓI HỘI VIÊN</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Chúng tôi cung cấp các gói hội viên linh hoạt và phù hợp với nhiều đối tượng khách hàng. Bạn có thể lựa chọn giữa các gói tập theo thời gian (tháng, quý, năm) hoặc theo số buổi tập.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {Array.isArray(pricingPlans) && pricingPlans.length > 0 ? (
            pricingPlans.map((pack, index) => (
              <div
                key={index}
                className="bg-transparent transform -skew-y-6 w-[320px] border border-gray-700 text-center p-10 hover:bg-white hover:border-white relative flex flex-col justify-between transition-all duration-500 group"
              >
                <div className="flex-1">
                  {/* Tiêu đề gói tập */}
                  <h3 className="text-xl font-semibold mb-4 skew-y-6 text-white transition-colors duration-300 group-hover:text-black">
                    {pack.name}
                  </h3>
                  {/* Giá tiền */}
                  <div className="mb-6 skew-y-6">
                    <h2 className="text-xl font-semibold text-blue-600">
                      {Number(pack.price).toLocaleString('vi-VN', { style: 'decimal' })}đ
                    </h2>
                  </div>

                  {/* Mô tả gói tập */}
                    <ul className="text-gray-400 space-y-3 mb-10 skew-y-6 p-2">
                      {pack.description && pack.description.split('\n').map((feature, idx) => (
                        <li key={idx} className="text-gray-400 transition-colors duration-300 group-hover:text-black text-left flex items-center list-item">
                          {parse(feature)}
                        </li>
                      ))}
                    </ul>

                </div>
                <button
                  onClick={() => onEnrollNow(pack.id, pack.price, pack.weeks, pack.sessionsPerWeek, pack.durationInMonths)}
                  className="block w-full skew-y-6 bg-gray-700 text-white py-3 px-6 rounded hover:bg-blue-600 transition-all duration-300"
                >
                  ĐĂNG KÍ
                </button>
              </div>
            ))
          ) : (
            <p>Không có gói tập nào để hiển thị</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
