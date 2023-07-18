import React from "react";
import Home from "./Components/Home/Home";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      {/* {console.log(import.meta.env.VITE_API_KEY)} */}
      <Home />
    </div>
  );
};

export default App;

// import React, { useState } from "react";

// function App() {
//   const userData = JSON.parse(localStorage.getItem("swipetory_user"));
//   const userId = userData.userid;
//   const [forms, setForms] = useState([
//     {
//       heading: "",
//       imageurl: "",
//       description: "",
//       category: "",
//       userId: userId,
//     },
//     {
//       heading: "",
//       imageurl: "",
//       description: "",
//       category: "",
//       userId: userId,
//     },
//     {
//       heading: "",
//       imageurl: "",
//       description: "",
//       category: "",
//       userId: userId,
//     },
//   ]);
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const updatedForms = [...forms];
//     updatedForms[index][name] = value;
//     setForms(updatedForms);
//   };

//   const addForm = () => {
//     setForms([...forms, { name: "", imageurl: "", message: "" }]);
//   };

//   const removeForm = (index) => {
//     const updatedForms = [...forms];
//     updatedForms.splice(index, 1);
//     setForms(updatedForms);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(forms);

//     try {
//       const response = await fetch(
//         `http://localhost:5000/story/create/${userId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ forms }),
//         }
//       );
//       console.log(response);
//       if (response.ok) {
//         console.log("Forms submitted successfully");
//         // Do something with the response
//       } else {
//         console.error("Error submitting forms:", response.status);
//         // Handle the error
//       }
//     } catch (error) {
//       console.error("Error submitting forms:", error);
//       // Handle the error
//     }
//   };

//   return (
//     <div>
//       <h1>Multiple Forms</h1>
//       <form onSubmit={handleSubmit}>
//         {forms.map((form, index) => (
//           <div key={index}>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={(event) => handleInputChange(event, index)}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="text"
//                 name="imageurl"
//                 value={form.imageurl}
//                 onChange={(event) => handleInputChange(event, index)}
//               />
//             </label>
//             <label>
//               Message:
//               <textarea
//                 name="message"
//                 value={form.message}
//                 onChange={(event) => handleInputChange(event, index)}
//               />
//             </label>
//             <button type="button" onClick={() => removeForm(index)}>
//               Remove Form
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={addForm}>
//           Add Form
//         </button>
//         <button type="submit">Submit Forms</button>
//       </form>
//     </div>
//   );
// }

// export default App;
