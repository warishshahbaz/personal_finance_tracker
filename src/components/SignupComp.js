import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, doc, provider, setDoc } from "../firebase";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDoc } from "firebase/firestore";

const FormComponent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  console.log(
    inputData,
    "-------------------inputData-------------------------"
  );

  const onFinish = (values) => {
    setLoading(true);
    if (
      values.email !== "" &&
      values.password !== "" &&
      values.username !== ""
    ) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Successfully signed up");
          navigate("/dashboard");
          setInputData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          createDoc(user ?? {});
        })
        .catch((error) => {
          toast.error(error.message ?? "something went wrong");
        });
    }
    console.log("Received values:", values);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading delay
  };

  //  create a Doc
  async function createDoc(user) {
    // make sure that doc with the uid does't exist
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      //than create doc
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : "",
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createAt: new Date(),
        });
        toast.success("doc created successfully");
      } catch (error) {
        toast.error(error.message ?? "something went wrong");
      }
    } else {
      toast.error(" Doc Already exist");
    }
  }

  // Google Authenticated

  function getAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const user = result.user;
          createDoc(user);
          console.log(user);
          navigate("/dashboard");
          toast.success("user Authenticated");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          setLoading(false);
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(errorMessage);
          // ...
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-w-[400px] max-w-xs mx-auto mt-8 shadow-xl rounded-md p-5 ">
      <h3 className="text-center px-2 text-xl mb-2 ">
        SignUp on <span className="text-blue-400 font-[500] ">Financely</span>{" "}
      </h3>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="p-3"
            onChange={handleChange}
            name="name"
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            className="p-3 "
            onChange={handleChange}
            name="email"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="p-3 "
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password
            className="p-3 "
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirm Password"
          />
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
          <Button disabled={loading} htmlType="submit" block loading={loading}>
            {loading ? "Loading..." : " Sign Up"}
          </Button>
          <p className="text-center my-1 ">or</p>
          <Button type="primary" onClick={getAuth} block>
            SignUp with Google
          </Button>
          <span className="text-gray-400 ">
            Or Have An Account Already ?{" "}
            <spna
              className="text-blue-400 cursor-pointer "
              onClick={() => navigate("/login")}
            >
              Click Here
            </spna>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
