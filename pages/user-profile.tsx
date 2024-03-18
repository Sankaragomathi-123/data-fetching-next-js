import React from "react";

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, res, req } = context;
  console.log(params, req, res,"RES");
  return {
    props: {
      username: "Max",
    },
  };
}
