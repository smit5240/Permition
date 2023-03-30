import React, { useEffect } from "react";
import Alldata from "./JSTest.json";

export default function Home() {
  let notFound = [];
  let access = [];
  let notAccess = [];
  let jsondata = {
    access_allowed: [],
    access_not_allowed: [],
    permission_not_found: [],
  };
  useEffect(() => {
    let Allpermition = Alldata.permissions.concat(
      Alldata.no_permission.not_allowed_user_id_list
    );
    Alldata.user_list.map((element) => {
      if (!Allpermition.includes(element.name_list.permissions)) {
        notFound.push(element);
      }
      if (Alldata.permissions.includes(element.name_list.permissions)) {
        access.push(element);
      }
      if (
        Alldata.no_permission.not_allowed_user_id_list.includes(
          element.name_list.permissions
        )
      ) {
        notAccess.push(element);
      }
    });
    access.map((item) => {
      let data = {
        department_name: "",
        user_name: [],
      };
      Alldata.department_names.map((ele) => {
        if (ele.d_id === item.department_id) {
          data.department_name = ele.department_name;
        }
      });
      Alldata.user_master.map((element) => {
        if (item.name_list.name.includes(element.user_code)) {
          data.user_name.push(element.user_name);
        }
      });
      //   console.log("data-->", data);
      jsondata.access_allowed.push(data);
    });
    notAccess.map((item) => {
      let data = {
        department_name: "",
        user_name: [],
        error_message: "",
      };
      Alldata.department_names.map((ele) => {
        if (ele.d_id === item.department_id) {
          data.department_name = ele.department_name;
        }
      });
      Alldata.user_master.map((element) => {
        if (item.name_list.name.includes(element.user_code)) {
          data.user_name.push(element.user_name);
        }
      });
      Alldata.error_message_department_wise.map((element) => {
        if (element.d_id === item.department_id) {
          data.error_message = element.error;
        }
      });
      //   console.log("data-->", data);
      jsondata.access_not_allowed.push(data);
    });
    notFound.map((item) => {
      let data = {
        id: "",
        error_message: "Permission ID not found in both list",
        department_name: "",
        user_name: [],
      };
      Alldata.department_names.map((ele) => {
        if (ele.d_id === item.department_id) {
          data.department_name = ele.department_name;
        }
      });
      Alldata.user_master.map((element) => {
        if (item.name_list.name.includes(element.user_code)) {
          data.user_name.push(element.user_name);
        }
        data.id = item.name_list.permissions;
      });
      jsondata.permission_not_found.push(data);
    });
    console.log("All json", jsondata);
  }, []);
  return (
    <div>
      <h1>Hello world </h1>
      <pre>{JSON.stringify(jsondata, null, 2)}</pre>
    </div>
  );
}
