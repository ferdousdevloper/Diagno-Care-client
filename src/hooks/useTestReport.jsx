import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useTestReport = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isDelivered, isPending: isDeliveredLoading } = useQuery({
        queryKey: [user?.email, 'isdelivered'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/appointments/report/${user.email}`);
            console.log(res.data);
            return res.data?.delivered;
        }
    })
    return [isDelivered, isDeliveredLoading]
};

export default useTestReport;