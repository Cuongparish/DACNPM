import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import routes from "./routes";
import EmptyLayout from "./layouts/EmptyLayout";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withRoleCheck } from "./shared/services/authen/domain/withRoleCheck";
import { accountList } from "./shared/utils/constant";
import Spinner from "./pages/Spinner";


export const MyContext = createContext({});

function App() {
  return (
        <MyContext.Provider value={{ accountList: accountList }}>
          <Router>
            <div>
              <Routes>
                {routes.map((route, index) => {
                  const { isLoading } = useAuth0();
                  const Layout = route.layout || EmptyLayout;
                  const Page = route.component;
                  const role = route.role;
                  const Element = () => (
                    <Layout>
                      <Page />
                    </Layout>
                  );
                  const ElementWithRoleCheck = role
                    ? withRoleCheck(role, Element)
                    : Element;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        isLoading
                          ? <Spinner/>
                        : <ElementWithRoleCheck/>
                      }
                    />
                  );
                })}
                {/*  */}
                <Route path="*" element={<Navigate to="/" />} />
                {/* <Route path="*" element={<Navigate to="/error-path" />} /> */}
                {/* <Route path="*" element={<Navigate to="/quan-ly-cv" />} /> */}
              </Routes>
            </div>
          </Router>
        </MyContext.Provider>
  );
}

export default App;
