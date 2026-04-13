import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 xl:pt-16'>

                {/* Heading */}
                <div className='my-6 sm:my-10'>
                    <h1 className='font-bold text-xl sm:text-2xl'>
                        Your Company Name
                    </h1>
                    <p className='text-gray-500 text-sm sm:text-base mt-1'>
                        What would you like to give your company name? you can change this later.
                    </p>
                </div>

                {/* Input */}
                <div>
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 w-full"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-2 my-6 sm:my-10'>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="w-full sm:w-auto"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default CompanyCreate