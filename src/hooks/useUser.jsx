import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isBlock, isPending: isBlockLoading } = useQuery({
        queryKey: [user?.email, 'isBlock'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/block/${user.email}`);
            console.log(res.data);
            return res.data?.block;
        }
    })
    return [isBlock, isBlockLoading]
};

export default useUser;