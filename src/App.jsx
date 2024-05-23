import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./General/ProtectedRoute";

import UserRoutes from "./routes/UserRoute";
import EngineerRoute from "./routes/EngineerRoute";
import AdminRoute from "./routes/AdminRoute";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgetPassword from "./Components/ForgetPassword"
import PasswordReset from "./Components/PasswordReset"
import VerifyCode from "./Components/VerifyCode";
import UserService from "./Components/UserService";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
    
        <Routes>
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path= "/engineer/*" element={<EngineerRoute/>}/>
          <Route path="/admin/*" element={<AdminRoute />} />

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path= "/forgetPassword" element={<ForgetPassword/>}/>
          <Route path= "/resetPassword" element={ <> <PasswordReset/> </> }/>
          <Route path="/profile" element={ <>  <ProtectedRoute>    <Profile />  </ProtectedRoute> </>   } />
          <Route
            path="/userservice"
            element={
              <>
                <ProtectedRoute>
                  <UserService />
                </ProtectedRoute>
              </>
            }
          />
          <Route path="/verifyCode" element={
           <>
           <ProtectedRoute>
             <VerifyCode/>
           </ProtectedRoute>
         </>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
