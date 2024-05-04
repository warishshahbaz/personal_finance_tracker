import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
// import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const LoginComp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    console.log("Received values:", values);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setInputData(user);
        console.log(user, "------------------------");
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login success");
        // ...
      })
      .catch((error) => {
        toast.error(error.message ?? "login failed");
        setLoading(false);
      });

    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading delay
  };

  console.log(inputData);

  return (
    <div className="w-full min-w-[400px] max-w-xs mx-auto mt-8 shadow-xl rounded-md p-5 ">
      <h3 className="text-center px-2 text-xl mb-2 ">
        Login on <span className="text-blue-400 font-[500] ">Financely</span>{" "}
      </h3>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input className="p-3 " placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 " placeholder="Password" />
        </Form.Item>

        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="ml-auto text-blue-600" href="/#">
            Forgot password?
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>

          <span className="text-gray-400 ">
            Or Have't An Account Already ?{" "}
            <spna
              className="text-blue-400 cursor-pointer "
              onClick={() => navigate("/")}
            >
              Click Here
            </spna>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComp;
