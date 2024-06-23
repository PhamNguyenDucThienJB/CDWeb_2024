import { useLocation, useNavigate } from "react-router-dom"
import Input from "@/components/Input/Input"
import { FIELD_EMPTY, REQUIRE_PHONE } from "../../constant/ErrorForm"
import useRegister from "@/hooks/useRegister"
import { useRef } from "react"



function FormInformation() {
    const refFunc = useRef([])
    const navigate = useNavigate()
    const register = useRegister()
    const location = useLocation()
    console.log(location)
    const configFirstName = {
        name: 'firstname',
        label: 'FirstName*',
        listError: [FIELD_EMPTY],
        index: 0,
        repeat: false,
        type: false,
        url: false
    }
    const configLastName = {
        name: 'lastname',
        label: 'LastName*',
        listError: [FIELD_EMPTY],
        index: 1,
        repeat: false,
        type: false,
        url: false
    }
    const configPhone = {
        name: 'phone',
        label: 'Phone*',
        listError: [REQUIRE_PHONE],
        index: 2,
        repeat: false,
        type: false,
        url: false

    }

    const sunmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let check = true

        refFunc.current.forEach((func: any) => {
            check = func() && check
        })

        if (check) {
            const formData = new FormData(event.currentTarget)
            const phone = formData.get("phone")?.toString() ?? '';
            const lastName = formData.get("lastname")?.toString() ?? '';
            const firstName = formData.get("firstname")?.toString() ?? '';
            const formInFor = true
            register.setForm({ phone, lastName, firstName, formInFor })
            navigate("/register/formEmail")

        }
    }

    return (
        <div className="container-form">
            <div className="form-register-infor">
                <div className="form-header">
                    <h1>Đăng kí tài khoản</h1>
                    <div className="display-step">
                        <span className="step">1</span>
                        <span className="text">Thông tin cá nhân</span>
                        <span className="line"></span>
                        <span className="step-none">2</span>
                        <span className="text">Nhập email</span>

                    </div>
                </div>
                <p> (*Bắt buộc)</p>
                <form onSubmit={sunmitForm}>
                    <div className="form-body">
                        <Input refFunc={refFunc} config={configFirstName as any}>
                            <i className="fa-solid fa-file-signature"></i>
                        </Input>
                        <Input refFunc={refFunc} config={configLastName as any}>
                            <i className="fa-solid fa-users"></i>
                        </Input>
                        <Input refFunc={refFunc} config={configPhone as any}>
                            <i className="fa-solid fa-phone"></i>
                        </Input>

                    </div>
                    <div className="form-btn">
                        <button className="submit-btn" type="submit">Tiếp tục</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default FormInformation