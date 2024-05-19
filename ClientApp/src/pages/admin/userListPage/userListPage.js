import React from "react";
import UserListComponent from "../../../components/userListComponent/userListComponent";
import AdminNavbarComponent from "../../../components/adminNavbarComponent/adminNavbarComponent";

const UserListPage = () => {
    return (
        <>
            <AdminNavbarComponent />
            <UserListComponent />
        </>
    );
};

export default UserListPage;
