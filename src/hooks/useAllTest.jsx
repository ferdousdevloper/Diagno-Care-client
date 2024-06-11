
import { useQuery } from '@tanstack/react-query';
//import useAxiosSecure from './useAxiosSecure';
import useAxiosPublic from './useAxiosPublic';

const useAllTest = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/allTests`);
            return res.data;
        }
    })

    return [tests, refetch]
};

export default useAllTest;