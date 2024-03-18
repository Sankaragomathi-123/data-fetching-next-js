import React from "react";

export default function uid(props) {
  return <div>{props.id}</div>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const uid = params.id;
  return {
    props: {
      id: "userID" + uid,
    },
  };
}
