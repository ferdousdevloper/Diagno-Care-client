import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBanner = () => {
    const axiosPublic = useAxiosPublic();
    const {data: banner = [], isPending: loading, refetch} = useQuery({
        queryKey: ['banner'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/banners');
            return res.data;
        }
    })
    return [banner, loading, refetch]
};

export default useBanner;