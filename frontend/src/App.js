import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import HomeOpd from "./pages/home/HomeOpd";
import MasterOpd from "./pages/master-opd/masteropd";
import MasterPic from "./pages/master-pic/masterpic";
import MasterIndicator from "./pages/master-indikator/masterindicator";
import MasterDokumen from "./pages/master-dokumen/masterdokumen";
import Eviden from "./pages/eviden-spbe/Eviden";
import TambahOpd from "./pages/master-opd/TambahOpd";
import EditOpd from "./pages/master-opd/EditOpd";
import TambahPic from "./pages/master-pic/TambahPic";
import EditPic from "./pages/master-pic/EditPic";
import TambahIndikator from "./pages/master-indikator/TambahIndikator";
import EditIndikator from "./pages/master-indikator/EditIndikator";
import TambahDokumen from "./pages/master-dokumen/TambahDokumen";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />

            {/* dashbboard opd */}
            <Route path="/dashboard-opd">
              <Route index element={<HomeOpd />} />
            </Route>

            {/* master opd */}
            <Route path="/opd">
              <Route index element={<MasterOpd />} />
              <Route element={<TambahOpd />} path="add-item" />
              <Route element={<EditOpd />} path="edit" />
            </Route>

            {/* master pic */}
            <Route path="/pic">
              <Route index element={<MasterPic />} />
              <Route element={<TambahPic />} path="add-item" />
              <Route element={<EditPic />} path="edit" />
            </Route>

            {/* indikator */}
            <Route path="/indikator">
              <Route index element={<MasterIndicator />} />
              <Route path="add-item" element={<TambahIndikator />} />
              <Route path="edit" element={<EditIndikator />} />
            </Route>

            {/* dokumen */}
            <Route path="/dokumen">
              <Route index element={<MasterDokumen />} />
              <Route element={<TambahDokumen /> } path="add-item"/>
            </Route>

            {/* eviden spbe */}
            <Route path="/eviden-spbe">
              <Route index element={<Eviden />} />
            </Route>

            {/* /users */}
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            {/* /products */}
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>

            {/* /dashboard */}
            <Route path="dashboard">
              <Route index element={<HomeOpd />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
