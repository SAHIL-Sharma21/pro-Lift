//use product hoooks
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/app/lib/redux/store';


export const useProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error,  selectedProduct, currentPage, totalPage} = useSelector((state: RootState) => state.product);

}