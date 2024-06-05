
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllTest = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allTests`);
            return res.data;
        }
    })

    return [tests, refetch]
};

export default useAllTest;