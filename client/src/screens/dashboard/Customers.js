import {useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper"
import { useGetCustomersQuery } from "../../store/services/customerService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
const Customers = () => {
   let {page} = useParams();
   if(!page) {
      page = 1;
   }
   const {data = [], isFetching} = useGetCustomersQuery(page);
   console.log(data);
   const {success} = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();
    useEffect(() => {
     if(success) {
       toast.success(success);
     }
     return () => {
        dispatch(clearMessage())
     }
    }, [])
    return(
       <Wrapper>
         <ScreenHeader>
          <Toaster position="top-right" />
          </ScreenHeader>
          {!isFetching ? data?.customers?.length > 0 ? <div>
            <table className="w-full bg-gray-900 rounded-md">
            <thead>
                    <tr className="border-b border-gray-800 text-left">
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">ID</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Name</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Admin</th>
                    </tr>
                 </thead>
                 <tbody>
                  {data?.customers?.map(customer => (
                     <tr className="odd:bg-gray-800" key={customer._id}>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{customer._id}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{customer.name}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{customer.admin? "true" : "false"}</td>
                     </tr>
                  ))}
                 </tbody>
            </table>
            <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/customers" />
          </div> : 'No Customers!' : <Spinner />}
       </Wrapper>
    )
}
export default Customers;