import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const loadPasswords = async () => {
    let req = await fetch('http://localhost:3000/')
    let passwords = await req.json()
    setpasswordArray(passwords)
    console.log(passwords)
  }


  useEffect(() => {
    loadPasswords()
  }, [])

  const copyText = (text) => {
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    navigator.clipboard.writeText(text)

  }

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/iconmonstr-eye-off-filled.svg")) {
      ref.current.src = "icons/iconmonstr-eye-3.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/iconmonstr-eye-off-filled.svg";
      passwordRef.current.type = "text";
    }
  };



  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    setform(passwordToEdit);
  }
  
  const savePassword = async () => {
    if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
      let newForm = form;
  
      if (form.id) {
      
        setpasswordArray(passwordArray.map(item => item.id === form.id ? form : item));
  
        await fetch(`http://localhost:3000/${form.id}`, {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newForm)
        });
      } else {
       
        newForm = { ...form, id: uuidv4() };
        setpasswordArray([...passwordArray, newForm]);
  
        
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newForm)
        });
      }
  
      setform({ site: "", username: "", password: "" });
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password Not Saved!");
    }
  }

  const deletePassword = async (id) => {
    console.log("deleting password with id ", id)
    let c = confirm("Do you want to delete this password ?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))

       await fetch("http://localhost:3000/", { method: "DELETE", headers:{ "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }
  }



  const handleChange = (e) => {

    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-80 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="p-3 max-w-4xl mx-auto font-bold">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-2">
          <span className="text-cyan-700">&lt;</span>
          Pass
          <span className="text-cyan-700">Hive/&gt;</span>
        </h1>
        <p className="text-black text-sm sm:text-base md:text-lg text-center mb-4">
          Your Own Password Manager
        </p>
        <div className="flex flex-col font-light text-black p-2 gap-2 mb-4 items-center">
  <input
    value={form.site}
    onChange={handleChange}
    placeholder="Enter Website URL..."
    className="rounded-lg border border-cyan-800 w-full p-2 text-sm"
    type="text"
    name="site"
    id="site"
  />
  <div className="flex w-full gap-2">
    <input
      value={form.username}
      onChange={handleChange}
      placeholder="Enter Username..."
      className="rounded-lg border border-cyan-800 w-2/3 p-2 text-sm"
      type="text"
      name="username"
      id="username"
    />
    <div className="relative w-1/3">
      <input
        ref={passwordRef}
        value={form.password}
        onChange={handleChange}
        placeholder="Enter Password..."
        className="rounded-lg border border-cyan-800 w-full p-2 pr-8 text-sm"
        type="password"
        name="password"
        id="password"
      />
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={showPassword}
      >
        <img
          ref={ref}
          className="w-5 h-5"
          src="icons\iconmonstr-eye-off-filled.svg"
          alt="eye"
        />
      </span>
    </div>
  </div>
  <button
    onClick={savePassword}
    className="font-bold my-2 justify-center flex items-center bg-cyan-600 w-full sm:w-auto rounded-full px-4 py-2 hover:bg-cyan-400 gap-2 border border-cyan-950 text-sm"
  >
    <lord-icon
      src="https://cdn.lordicon.com/pdsourfn.json"
      trigger="hover"
      stroke="bold"
      colors="primary:#121331,secondary:#16a9c7,tertiary:#ebe6ef"
      style={{ width: "20px", height: "20px" }}
    ></lord-icon>
    Save Password
  </button>
</div>

        <div className="passwords">
          <h2 className="py-4 font-bold text-xl sm:text-2xl">Your Passwords</h2>
          {passwordArray.length == 0 && <div className="text-center">No Passwords to Show</div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-10 text-sm">
                <thead className="bg-cyan-600 text-white">
                  <tr>
                    <th className="py-2 px-1 sm:px-2">Site</th>
                    <th className="py-2 px-1 sm:px-2">UserName</th>
                    <th className="py-2 px-1 sm:px-2">Password</th>
                    <th className="py-2 px-1 sm:px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-cyan-100">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-1 sm:px-2 border border-white">
                        <div className="flex items-center justify-between">
                          <a href={item.site} target="_blank" className="truncate max-w-[80px] sm:max-w-[120px]">
                            {item.site}
                          </a>
                          <div className="cursor-pointer" onClick={() => copyText(item.site)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              state="hover-unfold"
                              colors="primary:#0a4e5c,secondary:#30c9e8"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-1 sm:px-2 border border-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate max-w-[80px] sm:max-w-[120px]">{item.username}</span>
                          <div className="cursor-pointer" onClick={() => copyText(item.username)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              state="hover-unfold"
                              colors="primary:#0a4e5c,secondary:#30c9e8"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-1 sm:px-2 border border-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate max-w-[80px] sm:max-w-[120px]">{item.password}</span>
                          <div className="cursor-pointer" onClick={() => copyText(item.password)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              state="hover-unfold"
                              colors="primary:#0a4e5c,secondary:#30c9e8"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-1 sm:px-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/ylvuooxd.json"
                              trigger="hover"
                              state="hover-line"
                              colors="primary:#000000,secondary:#242424,tertiary:#16a9c7,quaternary:#000000"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                          <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/hjbrplwk.json"
                              trigger="morph"
                              state="morph-trash-in"
                              colors="primary:#000000,secondary:#16a9c7,tertiary:#ffffff,quaternary:#66d7ee"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;