import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BookingHeader from "../component/BookingStep/BookingHeader";
import BannerService from "../component/Banner/bannerService";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import RegistrationForm from "../component/RegisterForm/RegisterForm";
import ClassSection from "../component/ClassSection/ClassSection"; // Import component ClassSection

function ServiceDetail() {
    const [serviceDetail, setServiceDetail] = useState({});
    const [pricingPlans, setPricingPlans] = useState([]); 
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceDetailById = async () => {
            try {
                const response = await fetch(`http://localhost:3002/service/getService/${id}`);
                const data = await response.json();
                setServiceDetail(data);
            } catch (error) {
                console.error("Error fetching service details:", error);
            }
        };

        const fetchPricingPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3002/gymPackage/getGymPackagesByService/${id}`);
                const data = await response.json();
                setPricingPlans(data);
            } catch (error) {
                console.error("Error fetching pricing plans:", error);
            }
        };
        fetchPricingPlans();
        fetchServiceDetailById();
    }, [id]);

   const handleEnrollNow = (planId, price, weeks, sessionsPerWeek, durationInMonths) => {
    navigate('/booking', { 
        state: { 
            planId, 
            price, 
            weeks, 
            sessionsPerWeek, 
            durationInMonths, 
            serviceId: id, 
            serviceName: serviceDetail.serviceName, 
            currentStep: 1, 
            type: serviceDetail.type // Truyền thêm type
        } 
    });
};


    const { image, serviceName, content, type } = serviceDetail; // Thêm type vào destructuring

    return (
        <div className="bg-custom text-white">
            <BannerService image={image} serviceName={serviceName} />
            <ServiceDetailFeature content={content} />
            {type === "CLASS_BASED" ? (
                <ClassSection serviceId={id} onEnrollNow={handleEnrollNow}/> // Hiển thị ClassSection khi type là CLASS_BASED
            ) : (
                <PricingSection pricingPlans={pricingPlans} onEnrollNow={handleEnrollNow} /> // Hiển thị PricingSection nếu không phải CLASS_BASED
            )}
            <RegistrationForm />
        </div>
    );
}

export default ServiceDetail;
