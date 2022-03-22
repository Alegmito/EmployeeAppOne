import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { AddEdit } from "./AddEdit";
import EmployeeList from "./EmployeeList";

function Employee({match}) {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={path} component={EmployeeList} />
            <Route path={`${path}/add`} component={AddEdit} />
            <Route path={`${path}/:id`} component={AddEdit} />
        </Switch>
    )
}

export {Employee};