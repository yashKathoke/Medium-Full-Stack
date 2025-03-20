// import Auth from "../components/Auth";
import Quote from "../components/Quote";
import { SignupInput } from "@yashprojects/medium-common";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {LabelInput} from '../components/LabelInput'
import axios from "axios";
import {BACKEND_URL} from "../config"

export const Signup = () => {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
      });
      const navigate = useNavigate()
      async function sendRequest() {
        try {
          let response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
          const jwt = response.data.token
          localStorage.setItem("token", jwt)
          navigate('/blogs')
          
        } catch (error) {
          
        }
      }
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
        <div>
    <div className=" h-screen flex justify-center items-center flex-col">
      {/* {JSON.stringify(postInputs)} */}
      <div >
        <div className="px-10">
          <div className="text-3xl font-extrabold">Create an Account</div>
          <div className=" text-slate-400 text-center">
            {"Create an account. "}
            {<Link to="/signin" className="underline p-2">
              Sign In
            </Link>}
            

          </div>
        </div>


        <div className="flex flex-col gap-2 pt-6">
            <LabelInput
              label="Name"
              placeholder="Yash Kathoke"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
                // console.log(postInputs.email);
              }}
            />

        <LabelInput
          label="Email"
          placeholder="example@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />
        <LabelInput
          label="Password"
          type="password"
          placeholder="12345678"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
            // console.log(postInputs.email);
          }}
        />
        <button onClick={sendRequest} type="button" className=" mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{ "Sign Up"}</button>
        </div>
      </div>
    </div>
    </div>
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};
